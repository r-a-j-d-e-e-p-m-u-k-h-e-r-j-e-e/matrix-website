import React from "react";
import { Heart } from "lucide-react";
import { formatPrice } from "../../utils/formatters";

export default function MatrixListing({
  products,
  onSelect,
  onToggleSave,
  savedIds,
  currency,
  showPrice
}) {
  return (
    <div className="min-h-screen bg-white text-black font-mono pt-20 animate-in fade-in duration-500">
      <div className="fixed top-0 left-0 bottom-0 w-16 border-r border-black flex flex-col items-center py-8 z-30 bg-white hidden md:flex">
        <div className="writing-mode-vertical rotate-180 text-[9px] font-bold tracking-widest">
          SYSTEM_V.26
        </div>
      </div>
      <div className="md:ml-16">
        <div className="border-b border-black p-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            MATRIX_ARCHIVE
          </h1>
          <p className="text-xs max-w-md text-gray-500">
            OPTIMIZED FOR URBAN UTILITY. REMOVING THE NON-ESSENTIAL.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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
              className="group border-r border-b border-black h-[520px] relative cursor-pointer hover:bg-gray-50 transition-colors p-6 flex flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-black overflow-hidden"
            >
              <div className="flex justify-between items-start text-[9px]">
                <span>ID_{product.id}</span>
                <span>[{product.availability.toUpperCase()}]</span>
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleSave(product.id);
                }}
                className={`absolute top-4 right-4 p-2 border rounded-full transition-colors ${isSaved ? "bg-black text-white" : "bg-white"}`}
                aria-label="Save to selection"
              >
                <Heart size={14} className={isSaved ? "fill-current" : ""} />
              </button>
              <div className="flex-1 flex items-center justify-center pointer-events-none py-6">
                <img
                  src={product.image}
                  className="w-3/4 h-3/4 object-contain group-hover:scale-105 transition-transform duration-500"
                  alt={product.name}
                />
              </div>
              <div>
                {product.isNew && (
                  <div className="text-[9px] uppercase tracking-[0.3em] text-green-700 mb-2">
                    New entry
                  </div>
                )}
                <h3 className="text-sm font-bold uppercase tracking-tight bg-white inline-block px-1 mb-1">
                  {product.name}
                </h3>
                <p className="text-[10px] text-gray-500 truncate">
                  {product.desc}
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-widest">
                  <span>{product.collection}</span>
                  <span>
                    {showPrice ? formatPrice(product.price, currency) : product.tier}
                  </span>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
}
