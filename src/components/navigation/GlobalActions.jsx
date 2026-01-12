import React from "react";
import { Calendar, Globe, Heart, Search, Sparkles } from "lucide-react";

const BRAND_STYLES = {
  matrix: {
    base: "bg-black text-white",
    accent: "bg-green-600 text-black"
  },
  american_club: {
    base: "club-action-base",
    accent: "club-action-accent"
  },
  always_well: {
    base: "bg-white text-stone-800",
    accent: "bg-[#8c4b37] text-white"
  }
};

export default function GlobalActions({
  brandId,
  onSearch,
  onAi,
  onGateway,
  onAppointment,
  onSelection,
  selectionCount,
  showGateway = true
}) {
  const styles = BRAND_STYLES[brandId] || BRAND_STYLES.matrix;
  const badgeClass =
    brandId === "american_club"
      ? "bg-[#002366] text-[#fcf9f1]"
      : "bg-black text-white";
  const neutralActionClass =
    brandId === "american_club" ? "club-action-base" : "bg-white text-black";

  return (
    <div className="fixed top-6 right-6 z-40 flex flex-col gap-3 items-end">
      <button
        type="button"
        onClick={onSearch}
        className={`p-3 rounded-full shadow-lg hover:scale-110 transition-transform ${styles.base}`}
        aria-label="Search"
      >
        <Search size={18} />
      </button>
      <button
        type="button"
        onClick={onAi}
        className={`p-3 rounded-full shadow-lg hover:scale-110 transition-transform ${styles.accent}`}
        aria-label="Concierge"
      >
        <Sparkles size={18} />
      </button>
      <button
        type="button"
        onClick={onAppointment}
        className={`p-3 rounded-full shadow-lg hover:scale-110 transition-transform ${neutralActionClass}`}
        aria-label="Book appointment"
      >
        <Calendar size={18} />
      </button>
      <button
        type="button"
        onClick={onSelection}
        className={`relative p-3 rounded-full shadow-lg hover:scale-110 transition-transform ${neutralActionClass}`}
        aria-label="Selection"
      >
        <Heart size={18} />
        {selectionCount > 0 && (
          <span
            className={`absolute -top-1 -right-1 text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-full ${badgeClass}`}
          >
            {selectionCount}
          </span>
        )}
      </button>
      {showGateway && (
        <button
          type="button"
          onClick={onGateway}
          className={`p-3 rounded-full shadow-lg hover:scale-110 transition-transform ${neutralActionClass}`}
          aria-label="Select world"
        >
          <Globe size={18} />
        </button>
      )}
    </div>
  );
}
