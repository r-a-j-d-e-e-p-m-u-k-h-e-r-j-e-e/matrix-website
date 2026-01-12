import React from "react";
import { X } from "lucide-react";

export default function ContactModal({ open, onClose, brandName, t, product }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="bg-white p-8 max-w-md w-full relative z-10 animate-in zoom-in-95 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label={t.contact}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-4">{t.contact}</h2>
        <p className="text-sm text-gray-500 mb-6">Concierge for {brandName}</p>
        {product && (
          <div className="mb-6 border rounded-xl p-3 text-xs text-gray-500">
            Inquiring about: <span className="font-semibold">{product.name}</span>
            <div className="text-[10px] uppercase tracking-widest mt-1">
              {product.collection} - {product.tier}
            </div>
          </div>
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            className="w-full border p-3 text-sm mb-3 outline-none focus:border-black transition-colors"
            placeholder="Full Name"
            aria-label="Full name"
          />
          <input
            className="w-full border p-3 text-sm mb-4 outline-none focus:border-black transition-colors"
            placeholder="Email"
            type="email"
            aria-label="Email"
          />
          <textarea
            className="w-full border p-3 text-sm mb-4 outline-none focus:border-black transition-colors h-24"
            placeholder="Tell us about your event, fit preferences, or delivery needs."
            aria-label="Message"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 text-sm font-bold uppercase hover:bg-gray-800 transition-colors"
          >
            {t.inquire}
          </button>
        </form>
      </div>
    </div>
  );
}
