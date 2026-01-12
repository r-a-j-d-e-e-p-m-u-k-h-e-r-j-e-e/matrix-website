import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") {
      return defaultValue;
    }

    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Ignore storage failures.
    }
  }, [key, value]);

  return [value, setValue];
}
