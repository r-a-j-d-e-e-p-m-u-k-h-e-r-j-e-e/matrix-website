const parseError = async (response) => {
  try {
    const data = await response.json();
    return data?.message || "Request failed.";
  } catch (error) {
    return "Request failed.";
  }
};

export const fetchAvailability = async ({ date, timezone }) => {
  const params = new URLSearchParams();
  if (date) {
    params.set("date", date);
  }
  if (timezone) {
    params.set("timezone", timezone);
  }

  const response = await fetch(`/api/availability?${params.toString()}`);
  if (!response.ok) {
    const message = await parseError(response);
    throw new Error(message);
  }

  return response.json();
};

export const bookAppointment = async (payload) => {
  const response = await fetch("/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const message = await parseError(response);
    throw new Error(message);
  }

  return response.json();
};
