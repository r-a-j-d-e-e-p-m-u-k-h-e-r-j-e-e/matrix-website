import express from "express";
import dotenv from "dotenv";
import { google } from "googleapis";
import { DateTime, Interval } from "luxon";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT || 8787);
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";
const NOTIFY_EMAIL =
  process.env.APPOINTMENT_NOTIFICATION_EMAIL || "sumanapodder10@gmail.com";
const DEFAULT_TIMEZONE =
  process.env.APPOINTMENT_TIMEZONE || "America/New_York";
const START_HOUR = Number(process.env.APPOINTMENT_START_HOUR || 9);
const END_HOUR = Number(process.env.APPOINTMENT_END_HOUR || 18);
const DURATION_MIN = Number(process.env.APPOINTMENT_DURATION_MIN || 60);
const STEP_MIN = Number(process.env.APPOINTMENT_STEP_MIN || DURATION_MIN);
const SEND_EMAIL = process.env.APPOINTMENT_GMAIL_SEND === "true";

const ensureGoogleConfig = () => {
  return (
    Boolean(process.env.GOOGLE_CLIENT_ID) &&
    Boolean(process.env.GOOGLE_CLIENT_SECRET) &&
    Boolean(process.env.GOOGLE_REFRESH_TOKEN)
  );
};

const getAuthClient = () => {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });
  return client;
};

const getCalendarClient = () =>
  google.calendar({ version: "v3", auth: getAuthClient() });

const getGmailClient = () =>
  google.gmail({ version: "v1", auth: getAuthClient() });

const getCalendarBusy = async ({ timeMin, timeMax, timeZone }) => {
  const calendar = getCalendarClient();
  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      timeZone,
      items: [{ id: CALENDAR_ID }]
    }
  });
  const calendars = response.data?.calendars || {};
  const calendarKey = calendars[CALENDAR_ID] ? CALENDAR_ID : "primary";
  return calendars[calendarKey]?.busy || [];
};

const createSlotLabels = (slots, timeZone) => {
  return slots.map((slot) => ({
    start: slot.start.toISO(),
    end: slot.end.toISO(),
    label: slot.start.setZone(timeZone).toFormat("h:mm a")
  }));
};

const buildDayRange = (date, timeZone) => {
  const base = DateTime.fromISO(date, { zone: timeZone });
  if (!base.isValid) {
    throw new Error("Invalid date.");
  }
  const start = base.set({ hour: START_HOUR, minute: 0, second: 0, millisecond: 0 });
  const end = base.set({ hour: END_HOUR, minute: 0, second: 0, millisecond: 0 });
  return { start, end };
};

const formatAppointmentDescription = (payload) => {
  const details = [
    `Client: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    payload.brandName ? `Brand: ${payload.brandName}` : null,
    payload.location ? `Location: ${payload.location}` : null,
    payload.notes ? `Notes: ${payload.notes}` : null
  ].filter(Boolean);
  return details.join("\n");
};

const sendNotificationEmail = async ({ subject, body, to }) => {
  if (!SEND_EMAIL) {
    return;
  }
  const gmail = getGmailClient();
  const message = [
    `To: ${to}`,
    "Content-Type: text/plain; charset=UTF-8",
    "MIME-Version: 1.0",
    `Subject: ${subject}`,
    "",
    body
  ].join("\n");

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage
    }
  });
};

app.get("/api/availability", async (req, res) => {
  if (!ensureGoogleConfig()) {
    res.status(500).json({ message: "Google Calendar credentials missing." });
    return;
  }

  const date = req.query.date;
  const timeZone = req.query.timezone || DEFAULT_TIMEZONE;

  if (!date) {
    res.status(400).json({ message: "Missing date." });
    return;
  }

  try {
    const { start, end } = buildDayRange(date, timeZone);
    const busy = await getCalendarBusy({
      timeMin: start.toISO(),
      timeMax: end.toISO(),
      timeZone
    });

    const busyIntervals = busy.map((item) =>
      Interval.fromDateTimes(
        DateTime.fromISO(item.start, { zone: timeZone }),
        DateTime.fromISO(item.end, { zone: timeZone })
      )
    );

    const slots = [];
    let cursor = start;
    while (cursor.plus({ minutes: DURATION_MIN }) <= end) {
      const slotInterval = Interval.fromDateTimes(
        cursor,
        cursor.plus({ minutes: DURATION_MIN })
      );
      const overlaps = busyIntervals.some((interval) =>
        interval.overlaps(slotInterval)
      );
      if (!overlaps) {
        slots.push({
          start: slotInterval.start,
          end: slotInterval.end
        });
      }
      cursor = cursor.plus({ minutes: STEP_MIN });
    }

    res.json({
      date,
      timeZone,
      slots: createSlotLabels(slots, timeZone)
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to load slots." });
  }
});

app.post("/api/appointments", async (req, res) => {
  if (!ensureGoogleConfig()) {
    res.status(500).json({ message: "Google Calendar credentials missing." });
    return;
  }

  const {
    name,
    email,
    phone,
    notes,
    brandName,
    location,
    slotStart,
    slotEnd,
    timezone
  } = req.body || {};

  if (!name || !email || !slotStart || !slotEnd || !location) {
    res.status(400).json({ message: "Missing required booking details." });
    return;
  }

  const timeZone = timezone || DEFAULT_TIMEZONE;
  const start = DateTime.fromISO(slotStart, { zone: timeZone });
  const end = DateTime.fromISO(slotEnd, { zone: timeZone });

  if (!start.isValid || !end.isValid) {
    res.status(400).json({ message: "Invalid appointment time." });
    return;
  }

  try {
    const busy = await getCalendarBusy({
      timeMin: start.toISO(),
      timeMax: end.toISO(),
      timeZone
    });
    if (busy.length > 0) {
      res.status(409).json({ message: "Selected slot is no longer available." });
      return;
    }

    const calendar = getCalendarClient();
    const attendees = [
      { email: NOTIFY_EMAIL },
      ...(email !== NOTIFY_EMAIL ? [{ email }] : [])
    ];

    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      sendUpdates: "all",
      requestBody: {
        summary: `${brandName || "Matrix"} Appointment - ${location}`,
        location,
        description: formatAppointmentDescription({
          name,
          email,
          phone,
          notes,
          brandName,
          location
        }),
        start: {
          dateTime: start.toISO(),
          timeZone
        },
        end: {
          dateTime: end.toISO(),
          timeZone
        },
        attendees
      }
    });

    let emailNotice = null;
    try {
      await sendNotificationEmail({
        subject: `New appointment request - ${brandName || "Matrix"}`,
        to: NOTIFY_EMAIL,
        body: formatAppointmentDescription({
          name,
          email,
          phone,
          notes,
          brandName,
          location
        })
      });
    } catch (error) {
      emailNotice = "Email notification failed.";
    }

    res.json({
      ok: true,
      eventId: response.data?.id,
      emailNotice
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Booking failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Appointment server running on ${PORT}`);
});
