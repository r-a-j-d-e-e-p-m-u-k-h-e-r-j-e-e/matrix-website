import React from "react";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Palette,
  Package,
  Ruler,
  Scissors
} from "lucide-react";
import { formatList, formatPrice } from "../../utils/formatters";
import StyleNotes from "./StyleNotes";

const DetailItem = ({ label, value, icon, tone = "default" }) => {
  if (!value) {
    return null;
  }

  const isClub = tone === "club";
  const iconClass = isClub ? "club-muted" : "text-stone-400";
  const labelClass = isClub ? "club-muted" : "text-stone-400";
  const valueClass = isClub ? "club-ink" : "text-stone-700";

  return (
    <div className="flex items-start gap-3 text-sm">
      <span className={`mt-1 ${iconClass}`}>{icon}</span>
      <div>
        <div className={`text-[9px] uppercase tracking-widest ${labelClass}`}>
          {label}
        </div>
        <div className={`mt-1 text-sm ${valueClass}`}>{value}</div>
      </div>
    </div>
  );
};

export default function ProductPage({
  product,
  brandId,
  onBack,
  lang,
  onContact,
  currency,
  showPrice,
  onToggleSave,
  savedIds,
  relatedProducts,
  onSelectRelated
}) {
  const isSaved = savedIds.includes(product.id);
  const detailTone = brandId === "american_club" ? "club" : "default";
  const priceLabel = showPrice
    ? formatPrice(product.price, currency)
    : "By appointment";

  if (brandId === "matrix") {
    return (
      <div className="min-h-screen bg-white text-black font-mono pt-20 md:pl-16">
        <div className="fixed top-0 left-0 bottom-0 w-16 border-r border-black z-30 bg-white hidden md:flex flex-col items-center py-8">
          <button
            type="button"
            onClick={onBack}
            className="p-4 hover:bg-black hover:text-white transition-colors"
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="relative border-b lg:border-b-0 lg:border-r border-black p-12 flex items-center justify-center bg-gray-50">
            <div className="md:hidden absolute top-4 left-4 z-20">
              <button type="button" onClick={onBack} aria-label="Back">
                <ArrowLeft size={24} />
              </button>
            </div>
            <img
              src={product.image}
              className="w-3/4 object-contain mix-blend-multiply"
              alt={product.name}
            />
            <div className="absolute top-4 left-4 border border-black px-2 py-1 text-[9px] hidden md:block">
              FIG. {product.id}
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
              <div className="w-4 h-4 border border-black rounded-full" />
              <div className="w-4 h-4 bg-black rounded-full" />
            </div>
          </div>
          <div className="p-12 flex flex-col justify-center">
            <div className="mb-8">
              <div className="text-[9px] uppercase tracking-[0.3em] text-gray-400">
                {product.collection} - {product.tier}
              </div>
              <h1 className="text-4xl font-bold tracking-tighter mb-4">
                {product.name}
              </h1>
              <div className="w-12 h-1 bg-black mb-6" />
              <p className="text-sm leading-relaxed max-w-md">
                {product.details?.story}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-black pt-4 mb-6 text-sm">
              <div>
                <span className="block text-[9px] font-bold">SPEC</span>
                {product.details?.spec}
              </div>
              <div>
                <span className="block text-[9px] font-bold">MAT</span>
                {product.details?.material}
              </div>
              <div>
                <span className="block text-[9px] font-bold">AVAIL</span>
                {product.availability}
              </div>
              <div>
                <span className="block text-[9px] font-bold">PRICE</span>
                {priceLabel}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <DetailItem
                label="Fit"
                value={product.fit}
                icon={<Ruler size={14} />}
                tone={detailTone}
              />
              <DetailItem
                label="Colors"
                value={formatList(product.colors)}
                icon={<Palette size={14} />}
                tone={detailTone}
              />
              <DetailItem
                label="Composition"
                value={product.composition}
                icon={<Package size={14} />}
                tone={detailTone}
              />
              <DetailItem
                label="Sizes"
                value={formatList(product.sizes)}
                icon={<Ruler size={14} />}
                tone={detailTone}
              />
            </div>
            <StyleNotes brandId={brandId} lang={lang} />
            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={onContact}
                className="bg-black text-white w-full py-4 text-xs font-bold hover:bg-green-600 transition-colors text-center"
              >
                Initiate acquisition
              </button>
              <button
                type="button"
                onClick={() => onToggleSave(product.id)}
                className="w-full border border-black py-3 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Heart size={14} className={isSaved ? "fill-current" : ""} />
                {isSaved ? "Saved" : "Add to selection"}
              </button>
            </div>
          </div>
        </div>
        {relatedProducts.length > 0 && (
          <div className="border-t border-black p-12">
            <h2 className="text-lg font-bold uppercase tracking-widest mb-6">
              Related units
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectRelated(item)}
                  className="border border-black p-4 text-left"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <div className="text-xs uppercase tracking-widest">
                    {item.collection}
                  </div>
                  <div className="text-sm font-bold mt-2">{item.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (brandId === "american_club") {
    return (
      <div className="min-h-screen club-canvas club-frame font-club-body pt-28 pb-24 px-6 md:px-10">
        <button
          type="button"
          onClick={onBack}
          className="fixed top-8 left-8 z-50 font-club-body text-[10px] uppercase tracking-[0.35em] flex items-center gap-2 hover:opacity-70"
        >
          <ArrowLeft size={12} /> Return
        </button>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="club-panel p-8 shadow-2xl rotate-1">
              <img
                src={product.image}
                className="w-full h-auto object-cover"
                alt={product.name}
              />
            </div>
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="text-[10px] uppercase tracking-[0.4em] club-muted">
              {product.collection} - {product.tier}
            </div>
            <h1 className="text-5xl md:text-6xl font-club-display italic mb-6">
              {product.name}
            </h1>
            <p className="text-lg leading-relaxed club-muted mb-8">
              "{product.details?.story}"
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8 border-y club-border py-4 font-club-body text-[10px] uppercase tracking-widest">
              <div>
                <span className="block opacity-50 mb-1">Provenance</span>
                {product.details?.provenance}
              </div>
              <div>
                <span className="block opacity-50 mb-1">Craft</span>
                {product.details?.craft}
              </div>
              <div>
                <span className="block opacity-50 mb-1">Availability</span>
                {product.availability}
              </div>
              <div>
                <span className="block opacity-50 mb-1">Price</span>
                {priceLabel}
              </div>
            </div>
            <div className="grid gap-4 text-sm club-muted mb-6">
              <DetailItem
                label="Fit"
                value={product.fit}
                icon={<Ruler size={14} />}
                tone={detailTone}
              />
              <DetailItem
                label="Colors"
                value={formatList(product.colors)}
                icon={<Palette size={14} />}
                tone={detailTone}
              />
              <DetailItem
                label="Composition"
                value={product.composition}
                icon={<Package size={14} />}
                tone={detailTone}
              />
              <DetailItem
                label="Care"
                value={product.care}
                icon={<Package size={14} />}
                tone={detailTone}
              />
              <DetailItem
                label="Sizes"
                value={formatList(product.sizes)}
                icon={<Ruler size={14} />}
                tone={detailTone}
              />
            </div>
            <StyleNotes brandId={brandId} lang={lang} />
            <div className="mt-10 flex flex-col gap-3">
              <button
                type="button"
                onClick={onContact}
                className="club-button w-full py-4 text-sm uppercase tracking-widest transition-colors"
              >
                Request private viewing
              </button>
              <button
                type="button"
                onClick={() => onToggleSave(product.id)}
                className="w-full club-button-outline py-3 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Heart size={14} className={isSaved ? "fill-current" : ""} />
                {isSaved ? "Saved" : "Add to selection"}
              </button>
            </div>
          </div>
        </div>
        {relatedProducts.length > 0 && (
          <div className="max-w-6xl mx-auto mt-20">
            <h2 className="text-lg uppercase tracking-widest text-center font-club-body">
              Salon selection
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectRelated(item)}
                  className="club-panel p-4 text-left"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <div className="text-xs uppercase tracking-widest club-muted">
                    {item.collection}
                  </div>
                  <div className="text-sm font-club-display mt-2">
                    {item.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eeedeb] text-stone-800 font-sans pt-24 px-6">
      <button
        type="button"
        onClick={onBack}
        className="fixed top-6 left-6 z-50 bg-white p-3 rounded-full shadow-md hover:scale-110 transition-transform"
        aria-label="Back"
      >
        <ArrowLeft size={18} className="text-[#8c4b37]" />
      </button>
      <div className="max-w-5xl mx-auto bg-white rounded-[3rem] overflow-hidden shadow-xl flex flex-col md:flex-row">
        <div className="md:w-1/2 relative h-[50vh] md:h-auto">
          <img
            src={product.image}
            className="w-full h-full object-cover"
            alt={product.name}
          />
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <MapPin size={12} className="text-[#8c4b37]" />
            {product.details?.origin}
          </div>
          {product.isNew && (
            <div className="absolute top-6 right-6 bg-[#8c4b37] text-white text-[9px] uppercase tracking-[0.3em] px-3 py-2 rounded-full">
              New
            </div>
          )}
        </div>
        <div className="md:w-1/2 p-12 flex flex-col">
          <div className="text-[10px] uppercase tracking-[0.4em] text-stone-400">
            {product.collection} - {product.tier}
          </div>
          <h1 className="text-4xl font-black mb-6 text-[#8c4b37]">
            {product.name}
          </h1>
          <p className="text-lg text-stone-500 leading-relaxed mb-6">
            {product.details?.story}
          </p>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-[#eeedeb] px-4 py-2 rounded-lg text-xs font-bold text-stone-600 flex items-center gap-2">
              <Scissors size={14} /> {product.details?.artisan}
            </div>
            <div className="bg-[#eeedeb] px-4 py-2 rounded-lg text-xs font-bold text-stone-600 flex items-center gap-2">
              <Package size={14} /> {product.availability}
            </div>
          </div>
          <div className="grid gap-4 text-sm text-stone-600 mb-6">
            <DetailItem
              label="Fit"
              value={product.fit}
              icon={<Ruler size={14} />}
              tone={detailTone}
            />
            <DetailItem
              label="Colors"
              value={formatList(product.colors)}
              icon={<Palette size={14} />}
              tone={detailTone}
            />
            <DetailItem
              label="Composition"
              value={product.composition}
              icon={<Package size={14} />}
              tone={detailTone}
            />
            <DetailItem
              label="Care"
              value={product.care}
              icon={<Package size={14} />}
              tone={detailTone}
            />
            <DetailItem
              label="Sizes"
              value={formatList(product.sizes)}
              icon={<Ruler size={14} />}
              tone={detailTone}
            />
          </div>
          <div className="text-2xl font-semibold text-[#8c4b37] mb-6">
            {priceLabel}
          </div>
          <StyleNotes brandId={brandId} lang={lang} />
          <div className="mt-auto flex flex-col gap-3">
            <button
              type="button"
              onClick={onContact}
              className="bg-[#8c4b37] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              Check availability
            </button>
            <button
              type="button"
              onClick={() => onToggleSave(product.id)}
              className="border border-[#8c4b37]/40 py-3 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Heart size={14} className={isSaved ? "fill-current" : ""} />
              {isSaved ? "Saved" : "Add to selection"}
            </button>
          </div>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-lg uppercase tracking-widest text-[#8c4b37]">
            Everyday companions
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectRelated(item)}
                className="bg-white rounded-2xl overflow-hidden shadow-md text-left"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="text-xs uppercase tracking-widest text-stone-400">
                    {item.collection}
                  </div>
                  <div className="text-sm font-semibold mt-2">
                    {item.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
