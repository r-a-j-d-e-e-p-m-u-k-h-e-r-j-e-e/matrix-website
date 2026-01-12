import React from "react";

export default function BrandBadge({ brandId }) {
  if (brandId === "matrix") {
    return (
      <div className="border border-green-900 text-green-700 px-1 text-[8px] font-mono tracking-tighter bg-green-50 inline-block">
        SYS_MX
      </div>
    );
  }

  if (brandId === "american_club") {
    return (
      <div className="font-club-display text-[10px] tracking-[0.35em] club-badge px-2 py-[2px] inline-block">
        AC
      </div>
    );
  }

  return (
    <div className="bg-[#8c4b37] text-white rounded-full px-2 py-[2px] text-[8px] uppercase tracking-widest inline-block">
      AWI
    </div>
  );
}
