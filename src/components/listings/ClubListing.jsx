import React from "react";
import { Heart } from "lucide-react";
import { formatPrice } from "../../utils/formatters";

export default function ClubListing({
  products,
  onSelect,
  onToggleSave,
  savedIds,
  currency,
  showPrice
}) {
  return (
    <div className="min-h-screen club-canvas-royal club-frame font-club-body pt-32 pb-24 px-6 md:px-10 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto text-center mb-24">
        <div className="club-hero rounded-3xl px-8 md:px-12 py-14">
          <div className="inline-flex items-center gap-4 border-b border-white/30 pb-3 mb-6">
            <span className="text-[10px] uppercase tracking-[0.4em] club-hero-muted font-club-body">
              The American Club
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] club-hero-muted font-club-body">
              The Reserve
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-club-display italic text-[#fcf9f1]">
            The Reserve Collection
          </h1>
          <p className="mt-5 text-sm club-hero-muted max-w-xl mx-auto">
            A discreet edit of rare textiles and bespoke silhouettes reserved for the house circle.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mb-16">
        <div className="bg-[#fcf9f1] text-[#002366] border border-[#002366]/20 rounded-3xl p-8 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.3em] text-[#002366]/70">
              About The American Club
            </p>
            <h2 className="mt-4 text-2xl font-club-display club-ink">
              An invitation-only house for patrons of legacy.
            </h2>
            <p className="mt-4 text-sm text-[#002366]/70 leading-relaxed">
              The American Club curates bespoke wardrobes, rare textiles, and
              discreet acquisitions for a private circle. Each experience is
              managed by the house concierge, from consultation to aftercare,
              with absolute confidentiality.
            </p>
          </div>
          <div className="md:border-l border-t md:border-t-0 border-[#002366]/20 pt-6 md:pt-0 md:pl-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[#002366]/70">
              Contact
            </p>
            <div className="mt-4 text-sm text-[#002366]">
              concierge@matrix.house
            </div>
            <div className="mt-2 text-sm text-[#002366]">+1 (555) 012-8844</div>
            <div className="mt-4 text-xs uppercase tracking-[0.3em] text-[#002366]/70">
              By invitation only
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        {products.map((product, index) => {
          const isSaved = savedIds.includes(product.id);
          return (
            <div
              key={product.id}
              onClick={() => onSelect(product)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(product);
                }
              }}
              className={`group cursor-pointer flex flex-col items-center text-center outline-none focus-visible:ring-2 focus-visible:ring-[#fcf9f1] ${
                index % 2 !== 0 ? "md:mt-32" : ""
              }`}
            >
              <div className="relative club-panel p-6 transition-all duration-700 group-hover:shadow-[0_40px_70px_rgba(14,12,8,0.14)] group-hover:-translate-y-2">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleSave(product.id);
                  }}
                  className={`absolute top-4 right-4 z-20 p-2 rounded-full border transition-colors ${
                    isSaved
                      ? "club-button"
                      : "club-action-base"
                  }`}
                  aria-label="Save to selection"
                >
                  <Heart size={14} className={isSaved ? "fill-current" : ""} />
                </button>
                <div className="w-[300px] h-[400px] overflow-hidden relative">
                <div className="absolute inset-0 border border-[#fcf9f1] z-10 m-2 pointer-events-none" />
                  <img
                    src={product.image}
                    className="w-full h-full object-cover saturate-75 group-hover:saturate-100 transition-all duration-700"
                    alt={product.name}
                  />
                </div>
              </div>
              <div className="text-center mt-8">
                {product.isNew && (
                  <div className="text-[9px] uppercase tracking-[0.3em] club-ink mb-2">
                    New arrival
                  </div>
                )}
                <h3 className="text-2xl font-club-display italic mb-2">
                  {product.name}
                </h3>
                <p className="font-club-body text-[10px] uppercase tracking-widest club-muted">
                  Lot No. 00{product.id} - {product.collection}
                </p>
                <div className="mt-3 text-[10px] uppercase tracking-widest club-muted">
                  {showPrice ? formatPrice(product.price, currency) : product.tier}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
