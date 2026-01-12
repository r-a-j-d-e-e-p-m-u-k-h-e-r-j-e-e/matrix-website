import React from "react";

const BRAND_CLASSES = {
  matrix: "bg-white border-black text-black",
  american_club: "bg-[#fcf9f1] club-border club-ink",
  always_well: "bg-white border-[#8c4b37]/20 text-stone-800"
};

const INPUT_CLASSES = {
  matrix: "border rounded-full px-4 py-2 text-xs uppercase tracking-widest bg-white",
  american_club:
    "border rounded-full px-4 py-2 text-xs uppercase tracking-widest bg-[#fcf9f1] club-border club-ink font-club-body",
  always_well:
    "border rounded-full px-4 py-2 text-xs uppercase tracking-widest bg-white"
};

const RESET_CLASSES = {
  matrix:
    "border rounded-full px-4 py-2 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors",
  american_club:
    "club-button-outline rounded-full px-4 py-2 text-xs uppercase tracking-widest font-club-body hover:bg-[#002366] hover:text-[#fcf9f1] transition-colors",
  always_well:
    "border rounded-full px-4 py-2 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
};

const ACTIVE_CURRENCY_CLASS = {
  matrix: "bg-black text-white",
  american_club: "bg-[#002366] text-[#fcf9f1]",
  always_well: "bg-[#8c4b37] text-white"
};

export default function BrandFilterBar({
  brandId,
  filters,
  filterOptions,
  onChange,
  sortBy,
  onSortChange,
  onReset,
  resultCount,
  currency,
  onCurrencyChange,
  showCurrency
}) {
  const wrapperClass = BRAND_CLASSES[brandId] || BRAND_CLASSES.matrix;
  const inputClass = INPUT_CLASSES[brandId] || INPUT_CLASSES.matrix;
  const resetClass = RESET_CLASSES[brandId] || RESET_CLASSES.matrix;
  const activeCurrencyClass =
    ACTIVE_CURRENCY_CLASS[brandId] || ACTIVE_CURRENCY_CLASS.matrix;

  return (
    <div className={`sticky top-0 z-20 backdrop-blur border-b ${wrapperClass}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <select
            className={inputClass}
            value={filters.category}
            onChange={(event) => onChange({ category: event.target.value })}
            aria-label="Category"
          >
            {filterOptions.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            className={inputClass}
            value={filters.availability}
            onChange={(event) => onChange({ availability: event.target.value })}
            aria-label="Availability"
          >
            {filterOptions.availability.map((availability) => (
              <option key={availability} value={availability}>
                {availability}
              </option>
            ))}
          </select>
          <select
            className={inputClass}
            value={filters.tier}
            onChange={(event) => onChange({ tier: event.target.value })}
            aria-label="Tier"
          >
            {filterOptions.tiers.map((tier) => (
              <option key={tier} value={tier}>
                {tier}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <span
            className={`text-xs uppercase tracking-[0.3em] ${
              brandId === "american_club"
                ? "club-muted font-club-body"
                : "text-stone-400"
            }`}
          >
            {resultCount} pieces
          </span>
          {showCurrency && (
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest">
              <button
                type="button"
                onClick={() => onCurrencyChange("INR")}
                className={`px-3 py-2 rounded-full border ${
                  currency === "INR" ? activeCurrencyClass : ""
                }`}
              >
                INR
              </button>
              <button
                type="button"
                onClick={() => onCurrencyChange("USD")}
                className={`px-3 py-2 rounded-full border ${
                  currency === "USD" ? activeCurrencyClass : ""
                }`}
              >
                USD
              </button>
            </div>
          )}
          <select
            className={inputClass}
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            aria-label="Sort"
          >
            <option value="featured">Featured</option>
            <option value="new">New arrivals</option>
            <option value="price-desc">Price high to low</option>
            <option value="price-asc">Price low to high</option>
            <option value="name">Name</option>
          </select>
          <button
            type="button"
            onClick={onReset}
            className={resetClass}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
