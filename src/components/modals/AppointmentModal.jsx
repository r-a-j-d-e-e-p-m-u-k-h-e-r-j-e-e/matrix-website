import React, { useEffect, useMemo, useState } from "react";
import { Loader2, X } from "lucide-react";
import { bookAppointment, fetchAvailability } from "../../services/appointments";

const DEFAULT_TIMEZONE = "America/New_York";

const getTodayISO = () => new Date().toLocaleDateString("en-CA");

export default function AppointmentModal({
  open,
  onClose,
  t,
  brands,
  locations,
  defaultBrand
}) {
  const [selectedBrand, setSelectedBrand] = useState("MATRIX");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(getTodayISO());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState("");
  const [booking, setBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const locationOptions = useMemo(() => {
    return locations.map((location) => location.city);
  }, [locations]);

  const selectedLocationMeta = useMemo(() => {
    return locations.find((location) => location.city === selectedLocation);
  }, [locations, selectedLocation]);

  const timezone = selectedLocationMeta?.timezone || DEFAULT_TIMEZONE;

  useEffect(() => {
    if (!open) {
      return;
    }

    setSelectedBrand(defaultBrand || "MATRIX");
    setSelectedLocation("");
    setSelectedDate(getTodayISO());
    setSelectedSlot(null);
    setAvailableSlots([]);
    setSlotError("");
    setBooking(false);
    setBookingError("");
    setBookingSuccess("");
    setFullName("");
    setEmail("");
    setPhone("");
    setNotes("");
  }, [open, defaultBrand]);

  useEffect(() => {
    if (!open || !selectedDate || !selectedLocation) {
      setAvailableSlots([]);
      setSelectedSlot(null);
      return;
    }

    let canceled = false;
    setLoadingSlots(true);
    setSlotError("");
    setSelectedSlot(null);

    fetchAvailability({ date: selectedDate, timezone })
      .then((data) => {
        if (canceled) {
          return;
        }
        const slots = data?.slots || [];
        setAvailableSlots(slots);
        if (slots.length === 0) {
          setSlotError("No available slots for this date.");
        }
      })
      .catch((error) => {
        if (canceled) {
          return;
        }
        setAvailableSlots([]);
        setSlotError(error.message || "Unable to load availability.");
      })
      .finally(() => {
        if (!canceled) {
          setLoadingSlots(false);
        }
      });

    return () => {
      canceled = true;
    };
  }, [open, selectedDate, selectedLocation, timezone]);

  const handleBook = async () => {
    if (booking || !selectedSlot) {
      return;
    }

    const brand = brands[selectedBrand];
    setBooking(true);
    setBookingError("");
    setBookingSuccess("");

    try {
      await bookAppointment({
        name: fullName,
        email,
        phone,
        notes,
        brandKey: selectedBrand,
        brandName: brand?.name || selectedBrand,
        brandId: brand?.id,
        location: selectedLocation,
        date: selectedDate,
        slotStart: selectedSlot.start,
        slotEnd: selectedSlot.end,
        timezone
      });
      setBookingSuccess("Appointment confirmed. A concierge will follow up shortly.");
    } catch (error) {
      setBookingError(error.message || "Unable to book appointment.");
    } finally {
      setBooking(false);
    }
  };

  const canBook =
    Boolean(selectedLocation) &&
    Boolean(selectedDate) &&
    Boolean(selectedSlot) &&
    Boolean(fullName.trim()) &&
    Boolean(email.trim()) &&
    !booking;

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[620] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-8 relative"
        role="dialog"
        aria-modal="true"
        aria-label={t.book}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <h2 className="text-2xl font-bold mb-2">{t.book}</h2>
        <p className="text-sm text-gray-500 mb-6">
          Reserve a private session with the Matrix concierge team.
        </p>
        <div className="grid gap-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Brand
            </label>
            <select
              className="w-full border rounded-xl px-4 py-3 text-sm mt-2"
              value={selectedBrand}
              onChange={(event) => setSelectedBrand(event.target.value)}
            >
              {Object.entries(brands).map(([key, brand]) => (
                <option key={key} value={key}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Location
            </label>
            <select
              className="w-full border rounded-xl px-4 py-3 text-sm mt-2"
              value={selectedLocation}
              onChange={(event) => setSelectedLocation(event.target.value)}
            >
              <option value="">Select a location</option>
              {locationOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
              </option>
            ))}
          </select>
        </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Date
            </label>
            <input
              type="date"
              min={getTodayISO()}
              className="w-full border rounded-xl px-4 py-3 text-sm mt-2"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Time slot
            </label>
            <div className="mt-3">
              {!selectedLocation && (
                <p className="text-xs text-gray-400">
                  Select a location to view availability.
                </p>
              )}
              {loadingSlots && (
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Loader2 size={14} className="animate-spin" /> Checking
                  availability...
                </div>
              )}
              {slotError && !loadingSlots && (
                <p className="text-xs text-red-500">{slotError}</p>
              )}
              {!loadingSlots && availableSlots.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.start}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest border transition-colors ${
                        selectedSlot?.start === slot.start
                          ? "bg-black text-white"
                          : "hover:bg-black hover:text-white"
                      }`}
                    >
                      {slot.label || slot.start}
                    </button>
                  ))}
                </div>
              )}
              {selectedLocation && (
                <p className="text-[11px] text-gray-400 mt-2">
                  Times shown in {timezone}.
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400">
                Full name
              </label>
              <input
                className="w-full border rounded-xl px-4 py-3 text-sm mt-2"
                placeholder="Full name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-400">
                Email
              </label>
              <input
                type="email"
                className="w-full border rounded-xl px-4 py-3 text-sm mt-2"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Phone
            </label>
            <input
              className="w-full border rounded-xl px-4 py-3 text-sm mt-2"
              placeholder="Phone number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Notes
            </label>
            <textarea
              className="w-full border rounded-xl px-4 py-3 text-sm mt-2 h-24"
              placeholder="Tell us about your occasion, sizing, or requests."
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </div>
        </div>
        {bookingError && (
          <p className="mt-4 text-xs text-red-500">{bookingError}</p>
        )}
        {bookingSuccess && (
          <p className="mt-4 text-xs text-green-600">{bookingSuccess}</p>
        )}
        <button
          type="button"
          className="w-full mt-6 bg-black text-white py-3 text-xs uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={handleBook}
          disabled={!canBook}
        >
          {booking ? "Booking..." : "Confirm appointment"}
        </button>
      </div>
    </div>
  );
}
