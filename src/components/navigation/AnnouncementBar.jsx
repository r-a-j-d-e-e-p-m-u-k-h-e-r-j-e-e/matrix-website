import React from "react";

export default function AnnouncementBar({ message, actionLabel, onAction }) {
  return (
    <div className="w-full bg-black text-white text-[10px] uppercase tracking-[0.4em] text-center py-2">
      {message}
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="ml-4 underline underline-offset-4"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
