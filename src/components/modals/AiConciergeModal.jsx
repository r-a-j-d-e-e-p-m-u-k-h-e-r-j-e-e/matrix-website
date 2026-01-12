import React, { useEffect, useRef, useState } from "react";
import { Loader2, Send, Sparkles, X } from "lucide-react";
import { AI_WELCOME_KEY_BY_BRAND } from "../../data/brands";
import { getConciergeResponse } from "../../services/concierge";

export default function AiConciergeModal({
  open,
  onClose,
  t,
  brandId,
  products
}) {
  const welcomeKey = AI_WELCOME_KEY_BY_BRAND[brandId] || "ai_welcome_matrix";
  const welcomeText = t[welcomeKey] || t.ai_welcome_matrix;
  const [messages, setMessages] = useState([
    { role: "assistant", text: welcomeText }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (open) {
      setMessages([{ role: "assistant", text: welcomeText }]);
      setInput("");
      setLoading(false);
    }
  }, [open, welcomeText]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  if (!open) {
    return null;
  }

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) {
      return;
    }

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const response = await getConciergeResponse(trimmed, brandId, products);
      setMessages((prev) => [...prev, { role: "assistant", text: response }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="bg-white w-full md:max-w-md h-[600px] flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 rounded-t-xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={t.concierge}
      >
        <div
          className={`p-4 border-b flex justify-between items-center ${
            brandId === "matrix" ? "bg-black text-white" : "bg-white"
          }`}
        >
          <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <Sparkles size={14} /> {brandId === "matrix" ? "SYS_AI" : t.concierge}
          </span>
          <button type="button" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div
          className="flex-1 p-6 bg-gray-50 overflow-y-auto"
          ref={scrollRef}
        >
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`mb-3 flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-4 rounded-lg shadow-sm text-sm leading-relaxed max-w-[90%] ${
                  message.role === "user"
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Loader2 size={14} className="animate-spin" /> {t.consulting}
            </div>
          )}
        </div>
        <div className="p-4 border-t bg-white flex gap-2">
          <input
            className="flex-1 bg-gray-100 px-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-black/5"
            placeholder="Type..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSend();
              }
            }}
            aria-label="Message"
          />
          <button
            type="button"
            onClick={handleSend}
            className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Send"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
