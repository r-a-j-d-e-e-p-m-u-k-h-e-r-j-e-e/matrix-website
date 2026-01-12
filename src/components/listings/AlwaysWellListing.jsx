import React from "react";
import { Heart } from "lucide-react";
import { formatPrice } from "../../utils/formatters";

export default function AlwaysWellListing({
  products,
  onSelect,
  onToggleSave,
  savedIds,
  currency,
  showPrice
}) {
  return (
    <div className="min-h-screen bg-[#eeedeb] text-stone-800 font-sans pt-24 px-6 animate-in fade-in duration-700">
      <div className="max-w-2xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-black tracking-tight mb-6 text-[#8c4b37]">
          ALWAYS WELL
        </h1>
        <p className="text-lg text-stone-500 font-medium">
          Curated finds for the spirited traveler.
        </p>
      </div>
      <div className="columns-1 md:columns-2 gap-8 max-w-5xl mx-auto space-y-8">
        {products.map((product) => {
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
              className="break-inside-avoid relative group cursor-pointer rounded-3xl overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-[#8c4b37]"
            >
              <img
                src={product.image}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={product.name}
              />
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleSave(product.id);
                }}
                className={`absolute top-4 right-4 z-20 p-2 rounded-full border transition-colors ${isSaved ? "bg-[#8c4b37] text-white" : "bg-white"}`}
                aria-label="Save to selection"
              >
                <Heart size={14} className={isSaved ? "fill-current" : ""} />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-white text-[10px] font-bold uppercase tracking-widest mb-2 bg-[#8c4b37] self-start px-2 py-1 rounded-full">
                  {product.details?.origin}
                </span>
                <h3 className="text-white text-2xl font-bold">
                  {product.name}
                </h3>
                <div className="mt-3 text-[10px] uppercase tracking-widest text-white/80">
                  {product.collection} - {product.tier}
                </div>
                <div className="mt-2 text-sm font-semibold text-white">
                  {showPrice ? formatPrice(product.price, currency) : product.tier}
                </div>
              </div>
              {product.isNew && (
                <span className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.3em] text-white/80">
                  New
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
