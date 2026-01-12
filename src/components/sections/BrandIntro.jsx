import React from "react";

const BRAND_BG = {
  matrix: "bg-white border-black",
  american_club: "club-canvas club-border",
  always_well: "bg-[#fffaf6] border-[#8c4b37]/20"
};

export default function BrandIntro({ brand, onBackToGroup }) {
  const isClub = brand.id === "american_club";

  return (
    <section className={`border-b ${BRAND_BG[brand.id] || "bg-white"}`}>
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p
              className={`text-xs uppercase tracking-[0.4em] ${
                isClub ? "club-muted font-club-body" : "text-stone-400"
              }`}
            >
              {brand.type}
            </p>
            <h2
              className={`text-3xl md:text-5xl mt-3 ${
                isClub ? "font-club-display font-semibold" : "font-black"
              }`}
            >
              {brand.name}
            </h2>
            <p
              className={`mt-4 text-lg max-w-xl ${
                isClub ? "club-muted font-club-body" : "text-stone-600"
              }`}
            >
              {brand.tagline}
            </p>
          </div>
          <div
            className={`text-sm max-w-sm ${
              isClub ? "club-muted font-club-body" : "text-stone-500"
            }`}
          >
            <p>{brand.summary}</p>
            <div
              className={`mt-4 text-xs uppercase tracking-widest ${
                isClub ? "club-muted" : "text-stone-400"
              }`}
            >
              {brand.segment}
            </div>
            {onBackToGroup && (
              <button
                type="button"
                onClick={onBackToGroup}
                className={`mt-4 text-xs uppercase tracking-widest underline underline-offset-4 ${
                  isClub ? "font-club-body" : ""
                }`}
              >
                Matrix Group
              </button>
            )}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {brand.signature.map((item) => (
            <span
              key={item}
              className={`text-[11px] px-3 py-1 rounded-full border ${
                isClub ? "club-pill font-club-body" : "border-black/10"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
