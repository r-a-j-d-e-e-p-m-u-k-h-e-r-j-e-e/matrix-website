import React, { useEffect, useMemo, useState } from "react";
import { Heart, X } from "lucide-react";
import BrandBadge from "../BrandBadge";
import { formatPrice } from "../../utils/formatters";

export default function SearchModal({
  open,
  onClose,
  products,
  t,
  onSelectProduct,
  savedIds,
  onToggleSave,
  currency,
  showPrice
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return products.slice(0, 3);
    }

    return products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(normalized);
      const descMatch = product.desc.toLowerCase().includes(normalized);
      const brandMatch = product.brand.toLowerCase().includes(normalized);
      const collectionMatch = product.collection
        .toLowerCase()
        .includes(normalized);
      const tagMatch = product.tags?.some((tag) =>
        tag.toLowerCase().includes(normalized)
      );
      return (
        nameMatch || descMatch || brandMatch || collectionMatch || tagMatch
      );
    });
  }, [products, query]);

  if (!open) {
    return null;
  }

  const hasQuery = query.trim().length > 0;
  const showEmpty = hasQuery && results.length === 0;

  return (
    <div
      className="fixed inset-0 z-[600] bg-black/95 backdrop-blur-xl pt-32 px-6 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={t.search}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-8 right-8 text-white hover:opacity-70"
        aria-label="Close"
      >
        <X size={32} />
      </button>
      <div className="max-w-2xl mx-auto">
        <input
          autoFocus
          className="w-full bg-transparent border-b border-white/20 text-3xl text-white py-4 focus:outline-none placeholder-white/30"
          placeholder={t.search_placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label={t.search}
        />
        <div className="mt-8 space-y-2">
          {showEmpty && (
            <div className="text-white/70 text-sm">{t.no_results}</div>
          )}
          {!showEmpty &&
            results.map((product) => {
              const isSaved = savedIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="w-full flex items-center gap-4 p-4 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="flex items-center gap-4 flex-1 text-left"
                  >
                    <img
                      src={product.image}
                      className="w-10 h-10 object-cover rounded-full"
                      alt=""
                    />
                    <div>
                      <span className="text-white text-lg font-medium">
                        {product.name}
                      </span>
                      <div className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/60">
                        <span>{product.collection}</span>
                        <span> - </span>
                        <span>
                          {showPrice || product.brand === "always_well"
                            ? formatPrice(product.price, currency)
                            : product.tier}
                        </span>
                      </div>
                      <div className="mt-2">
                        <BrandBadge brandId={product.brand} />
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleSave(product.id)}
                    className={`p-2 rounded-full border transition-colors ${isSaved ? "bg-white text-black" : "border-white/30 text-white"}`}
                    aria-label="Save"
                  >
                    <Heart size={14} className={isSaved ? "fill-current" : ""} />
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
