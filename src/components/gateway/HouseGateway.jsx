import React, { useState } from "react";
import { X } from "lucide-react";
import { BRANDS } from "../../data/brands";

export default function HouseGateway({ onSelectBrand, lang, setLang, t, onClose }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="fixed inset-0 z-[500] bg-[#eeedeb] text-stone-900 flex flex-col justify-between overflow-hidden">
      {Object.values(BRANDS).map((brand, index) => (
        <div
          key={brand.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
            hovered === brand.id ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={
              index === 0
                ? "image_b3599c.jpg"
                : index === 1
                ? "image_b356cf.jpg"
                : "image_b356d7.jpg"
            }
            className={`w-full h-full object-cover ${
              brand.id === "matrix"
                ? "grayscale contrast-125"
                : brand.id === "american_club"
                ? "sepia-[.2]"
                : "saturate-125"
            }`}
            alt=""
          />
          <div
            className={`absolute inset-0 ${
              brand.id === "matrix"
                ? "bg-black/70"
                : brand.id === "american_club"
                ? "bg-[#002366]/85"
                : "bg-black/10"
            }`}
          />
        </div>
      ))}

      <div className="relative z-10 flex justify-between items-start p-8 md:p-12">
        <div className="animate-in slide-in-from-top-4 duration-1000">
          <h1
            className={`text-sm font-bold tracking-[0.3em] uppercase mb-1 ${
              hovered === "american_club"
                ? "text-[#fcf9f1]"
                : hovered === "matrix" || hovered === "always_well"
                ? "text-white"
                : "text-stone-900"
            }`}
          >
            {t.house_title}
          </h1>
          <p
            className={`text-[9px] uppercase tracking-widest ${
              hovered === "matrix"
                ? "text-white/50"
                : hovered === "american_club"
                ? "text-[#fcf9f1]/60"
                : hovered === "always_well"
                ? "text-white/70"
                : "text-stone-400"
            }`}
          >
            {t.est}
          </p>
        </div>
        <div className="flex gap-4 z-20">
          {[
            { id: "en", label: "en" },
            { id: "hi", label: "hi" },
            { id: "bn", label: "bn" }
          ].map((language) => (
            <button
              key={language.id}
              type="button"
              onClick={() => setLang(language.id)}
              aria-pressed={lang === language.id}
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                lang === language.id
                  ? "underline decoration-1 underline-offset-4"
                  : "opacity-50"
              } ${
                hovered === "american_club"
                  ? "text-[#fcf9f1]"
                  : hovered === "matrix" || hovered === "always_well"
                  ? "text-white"
                  : "text-stone-900"
              }`}
            >
              {language.label}
            </button>
          ))}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={`absolute top-8 right-8 md:top-12 md:right-12 p-2 rounded-full border ${
              hovered === "american_club"
                ? "border-white/40 text-[#fcf9f1]"
                : hovered === "matrix" || hovered === "always_well"
                ? "border-white/40 text-white"
                : "border-black/20 text-stone-900"
            }`}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-12">
        {Object.values(BRANDS).map((brand) => (
          <button
            key={brand.id}
            type="button"
            onMouseEnter={() => setHovered(brand.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelectBrand(brand.id.toUpperCase())}
            className="group relative px-8 py-4"
          >
            <span
              className={`block text-5xl md:text-7xl transition-all duration-700 ${
                brand.id === "matrix"
                  ? "font-mono tracking-tighter font-bold"
                  : brand.id === "american_club"
                  ? "font-club-display italic tracking-wide"
                  : "font-sans font-black tracking-tight"
              } ${
                hovered && hovered !== brand.id
                  ? "opacity-20 blur-[2px] scale-90"
                  : "opacity-100 scale-100"
              } ${
                hovered === "matrix"
                  ? "text-white"
                : hovered === "american_club"
                  ? "text-[#fcf9f1]"
                  : hovered === "always_well"
                  ? "text-white"
                  : "text-stone-800"
              }`}
            >
              {brand.name}
            </span>
            <span
              className={`absolute left-1/2 -translate-x-1/2 bottom-0 text-[9px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-4 ${
                hovered === "matrix"
                  ? "text-green-400"
                  : hovered === "american_club"
                  ? "text-[#fcf9f1]"
                  : "text-white"
              }`}
            >
              {t.enter}
            </span>
          </button>
        ))}
      </div>

      <div className="relative z-10 p-8 text-center">
        <p
          className={`text-[9px] uppercase tracking-[0.2em] transition-colors ${
            hovered === "matrix"
              ? "text-white/30"
              : hovered === "american_club"
              ? "text-[#fcf9f1]/50"
              : hovered === "always_well"
              ? "text-white/50"
              : "text-stone-300"
          }`}
        >
          Multinational Luxury Group
        </p>
      </div>
    </div>
  );
}
