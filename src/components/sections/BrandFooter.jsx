import React from "react";
import { Mail, Phone } from "lucide-react";

export default function BrandFooter({ brand }) {
  const isClub = brand.id === "american_club";

  return (
    <footer
      className={`mt-16 border-t ${isClub ? "club-border" : "border-black/10"}`}
    >
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div
            className={`text-xs uppercase tracking-[0.4em] ${
              isClub ? "club-muted font-club-body" : "text-stone-400"
            }`}
          >
            A Matrix Group house
          </div>
          <h3
            className={`text-lg mt-2 ${
              isClub ? "font-club-display font-semibold" : "font-bold"
            }`}
          >
            {brand.name}
          </h3>
          <p
            className={`text-sm mt-2 max-w-md ${
              isClub ? "club-muted font-club-body" : "text-stone-500"
            }`}
          >
            {brand.summary}
          </p>
        </div>
        <div
          className={`text-sm ${
            isClub ? "club-muted font-club-body" : "text-stone-500"
          }`}
        >
          <div className="flex items-center gap-2">
            <Mail size={14} /> concierge@matrix.house
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Phone size={14} /> +1 (555) 012-8844
          </div>
        </div>
      </div>
    </footer>
  );
}
