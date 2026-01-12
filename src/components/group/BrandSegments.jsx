import React from "react";

const CARD_STYLES = {
  matrix: "bg-white border-black",
  always_well: "bg-[#fffaf6] border-[#8c4b37]/20"
};

export default function BrandSegments({ brands, onSelect }) {
  return (
    <section id="brand-segments" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-stone-400">
              The Houses
            </p>
            <h2 className="text-3xl md:text-4xl font-black mt-3">
              Distinct segments, one Matrix standard.
            </h2>
          </div>
          <p className="text-sm text-stone-500 max-w-md">
            Each house serves a different customer journey while sharing a
            unified design code: precision, craft, and intention.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(brands).map((brand) => {
            const isClub = brand.id === "american_club";
            return (
              <div
                key={brand.id}
                className={`rounded-3xl p-6 flex flex-col ${
                  isClub
                    ? "club-panel club-ink"
                    : CARD_STYLES[brand.id] || "bg-white border border-stone-200"
                }`}
              >
              <div
                className={`text-xs uppercase tracking-[0.3em] ${
                  isClub ? "club-muted font-club-body" : "text-stone-400"
                }`}
              >
                {brand.segment}
              </div>
              <h3
                className={`text-2xl mt-4 ${
                  isClub ? "font-club-display font-semibold" : "font-bold"
                }`}
              >
                {brand.name}
              </h3>
              <p
                className={`mt-3 text-sm ${
                  isClub ? "club-muted font-club-body" : "text-stone-600"
                }`}
              >
                {brand.tagline}
              </p>
              <p
                className={`mt-4 text-sm leading-relaxed ${
                  isClub ? "club-muted font-club-body" : "text-stone-500"
                }`}
              >
                {brand.summary}
              </p>
              <div
                className={`mt-5 text-xs uppercase tracking-widest ${
                  isClub ? "club-muted font-club-body" : "text-stone-400"
                }`}
              >
                Audience
              </div>
              <p
                className={`text-sm mt-2 ${
                  isClub ? "club-muted font-club-body" : "text-stone-600"
                }`}
              >
                {brand.audience}
              </p>
              <div
                className={`mt-5 text-xs uppercase tracking-widest ${
                  isClub ? "club-muted font-club-body" : "text-stone-400"
                }`}
              >
                Signature
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
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
              <div className="mt-6 flex items-center justify-between">
                <span
                  className={`text-xs uppercase tracking-[0.3em] ${
                    isClub ? "club-muted font-club-body" : "text-stone-400"
                  }`}
                >
                  {brand.priceGuide}
                </span>
                <button
                  type="button"
                  onClick={() => onSelect(brand.id.toUpperCase())}
                  className={`text-xs uppercase tracking-widest border px-4 py-2 rounded-full transition-colors ${
                    isClub
                      ? "club-button-outline font-club-body hover:bg-[#002366] hover:text-[#fcf9f1]"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  Enter
                </button>
              </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
