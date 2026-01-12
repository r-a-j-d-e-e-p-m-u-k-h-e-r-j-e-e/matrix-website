import React from "react";

export default function GroupTimeline({ timeline }) {
  return (
    <section className="py-24 bg-[#0f0f0f] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
          Timeline
        </p>
        <h2 className="text-3xl md:text-4xl font-black mt-3">
          A brief history of the Matrix umbrella.
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
          {timeline.map((item) => (
            <div
              key={item.year}
              className="border border-white/10 rounded-3xl p-6"
            >
              <div className="text-2xl font-bold">{item.year}</div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-white/70">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
