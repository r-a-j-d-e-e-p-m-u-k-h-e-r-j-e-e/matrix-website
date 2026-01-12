import React from "react";

export default function NewsletterSection() {
  return (
    <section className="py-20 bg-[#1a1a1a] text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">
          Matrix Dispatch
        </p>
        <h2 className="text-3xl md:text-4xl font-black mt-3">
          Receive private previews, capsule drops, and concierge updates.
        </h2>
        <p className="mt-4 text-sm text-white/70 max-w-2xl mx-auto">
          Subscribe for early access to each house. Always curated, never loud.
        </p>
        <div className="mt-8 flex flex-col md:flex-row gap-3 justify-center">
          <input
            className="px-4 py-3 rounded-full text-sm text-black w-full md:w-80"
            placeholder="Email address"
            type="email"
            aria-label="Email"
          />
          <button
            type="button"
            className="px-6 py-3 rounded-full bg-white text-black text-xs uppercase tracking-widest"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
