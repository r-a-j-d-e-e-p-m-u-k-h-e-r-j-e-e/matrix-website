import React from "react";

export default function GroupHero({ onEnter, onExplore }) {
  return (
    <section className="relative overflow-hidden bg-[#f5f4f0]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#d9e8dc,transparent_55%),radial-gradient(circle_at_20%_80%,#f7efe7,transparent_45%)]" />
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-black/5 rounded-full blur-2xl" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
            Matrix Group
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mt-4">
            A house of three worlds, unified under Matrix.
          </h1>
          <p className="mt-6 text-lg text-stone-600 leading-relaxed">
            Matrix sets the design code. The American Club crafts ultra luxury
            moments. Always Well India elevates everyday wear. One umbrella,
            three distinct client journeys.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onEnter}
              className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest"
            >
              Enter the worlds
            </button>
            <button
              type="button"
              onClick={onExplore}
              className="px-6 py-3 border border-black text-xs uppercase tracking-widest"
            >
              Explore the houses
            </button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs uppercase tracking-[0.3em] text-stone-400">
            <span>Matrix</span>
            <span>American Club</span>
            <span>Always Well India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
