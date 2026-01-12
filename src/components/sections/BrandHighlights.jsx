import React from "react";

export default function BrandHighlights({ brand }) {
  const isClub = brand.id === "american_club";
  const cardClass = isClub ? "club-panel" : "border";

  return (
    <section className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className={`${cardClass} rounded-2xl p-6`}>
        <p
          className={`text-xs uppercase tracking-widest ${
            isClub ? "club-muted font-club-body" : "text-stone-400"
          }`}
        >
          Audience
        </p>
        <p
          className={`mt-3 text-sm ${
            isClub ? "club-muted font-club-body" : "text-stone-600"
          }`}
        >
          {brand.audience}
        </p>
      </div>
      <div className={`${cardClass} rounded-2xl p-6`}>
        <p
          className={`text-xs uppercase tracking-widest ${
            isClub ? "club-muted font-club-body" : "text-stone-400"
          }`}
        >
          Regions
        </p>
        <p
          className={`mt-3 text-sm ${
            isClub ? "club-muted font-club-body" : "text-stone-600"
          }`}
        >
          {brand.regions.join(" - ")}
        </p>
      </div>
      <div className={`${cardClass} rounded-2xl p-6`}>
        <p
          className={`text-xs uppercase tracking-widest ${
            isClub ? "club-muted font-club-body" : "text-stone-400"
          }`}
        >
          Pricing
        </p>
        <p
          className={`mt-3 text-sm ${
            isClub ? "club-muted font-club-body" : "text-stone-600"
          }`}
        >
          {brand.priceGuide}
        </p>
      </div>
    </section>
  );
}
