import React from "react";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function GroupFooter({ brands }) {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-lg font-bold">Matrix Group</h3>
          <p className="text-sm text-white/70 mt-3">
            Unified luxury and everyday excellence under the Matrix umbrella.
          </p>
          <div className="mt-6 flex gap-3 text-white/70">
            <Instagram size={16} />
            <Mail size={16} />
            <Phone size={16} />
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">
            Houses
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {Object.values(brands).map((brand) => (
              <li key={brand.id}>{brand.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">
            Concierge
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>Private appointments</li>
            <li>Wardrobe stewardship</li>
            <li>Global delivery</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50">
            Headquarters
          </p>
          <div className="mt-4 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              210 West 29th Street, New York
            </div>
            <div className="mt-3">concierge@matrix.house</div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-10 text-xs text-white/50">
        Copyright 2026 Matrix Group. All rights reserved.
      </div>
    </footer>
  );
}
