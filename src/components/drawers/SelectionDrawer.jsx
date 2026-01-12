import React from "react";
import { X } from "lucide-react";
import { formatPrice } from "../../utils/formatters";

export default function SelectionDrawer({
  open,
  onClose,
  items,
  currency,
  onRemove,
  onSelectProduct,
  onRequest
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[650]">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right-10"
        role="dialog"
        aria-modal="true"
        aria-label="Selection"
      >
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Your Selection</h2>
            <p className="text-xs text-gray-500">Curated pieces for inquiry.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 && (
            <div className="text-sm text-gray-500">No pieces saved yet.</div>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border rounded-2xl p-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-24 object-cover rounded-xl"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                    <p className="text-[11px] text-gray-500 uppercase tracking-widest">
                      {item.collection} - {item.tier}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="text-xs text-gray-400 hover:text-black"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-semibold">
                    {item.brand === "always_well"
                      ? formatPrice(item.price, currency)
                      : item.tier}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectProduct(item)}
                    className="text-xs uppercase tracking-widest border px-3 py-1 rounded-full hover:bg-black hover:text-white transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 border-t">
          <button
            type="button"
            onClick={onRequest}
            className="w-full bg-black text-white py-3 text-xs uppercase tracking-widest"
          >
            Request Concierge
          </button>
        </div>
      </div>
    </div>
  );
}
