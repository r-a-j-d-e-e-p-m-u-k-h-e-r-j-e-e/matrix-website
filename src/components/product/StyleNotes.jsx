import React, { useEffect, useRef, useState } from "react";
import { Loader2, Sparkles, Sun } from "lucide-react";
import { TRANSLATIONS } from "../../data/translations";

const DEFAULT_NOTES = [
  "Combine with structured outerwear for contrast.",
  "Keep accessories minimal.",
  "Best worn in urban environments."
];

export default function StyleNotes({ brandId, lang }) {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(null);
  const timerRef = useRef(null);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const generate = () => {
    if (loading || notes) {
      return;
    }

    setLoading(true);
    timerRef.current = setTimeout(() => {
      setNotes(DEFAULT_NOTES.join("\n"));
      setLoading(false);
    }, 1500);
  };

  if (brandId === "matrix") {
    return (
      <div className="border border-black p-4 mt-8 bg-gray-50">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[9px] font-bold font-mono">
            /// STYLIST_ALGORITHM
          </span>
          {!notes && (
            <button
              type="button"
              onClick={generate}
              className="text-[9px] bg-black text-white px-2 py-1 hover:opacity-80"
            >
              {loading ? "COMPUTING..." : "RUN_ANALYSIS"}
            </button>
          )}
        </div>
        {notes && (
          <div className="text-[10px] font-mono whitespace-pre-line">
            {notes}
          </div>
        )}
      </div>
    );
  }

  if (brandId === "american_club") {
    return (
      <div className="border-t border-b border-double club-border py-6 mt-8 text-center">
        {!notes ? (
          <button
            type="button"
            onClick={generate}
            className="text-xs font-club-display italic club-ink hover:opacity-70 flex items-center justify-center gap-2"
          >
            <Sparkles size={12} /> {t.generate_notes}
          </button>
        ) : (
          <div className="font-club-body italic text-sm club-muted leading-relaxed">
            {notes}
          </div>
        )}
        {loading && (
          <div className="text-xs font-club-body club-muted mt-2">
            {t.consulting}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 mt-8 shadow-sm">
      <div className="flex items-center gap-3 mb-4 text-[#8c4b37]">
        <Sun size={18} />
        <span className="text-xs font-bold uppercase tracking-widest">
          {t.stylist_notes}
        </span>
      </div>
      {!notes && !loading && (
        <button
          type="button"
          onClick={generate}
          className="text-xs font-bold text-stone-400 hover:text-[#8c4b37] transition-colors"
        >
          {t.generate_notes}
        </button>
      )}
      {loading && <Loader2 className="animate-spin text-[#8c4b37]" size={16} />}
      {notes && (
        <p className="text-sm text-stone-600 leading-relaxed">{notes}</p>
      )}
    </div>
  );
}
