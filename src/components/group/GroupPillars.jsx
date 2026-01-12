import React from "react";

export default function GroupPillars({ pillars }) {
  return (
    <section className="py-24 bg-[#f8f6f2]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-stone-400">
              Matrix Code
            </p>
            <h2 className="text-3xl md:text-4xl font-black mt-3">
              Four pillars that guide every house.
            </h2>
          </div>
          <p className="text-sm text-stone-500 max-w-md">
            We design with intent, from the atelier to the everyday. These
            pillars align every touchpoint under the Matrix umbrella.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white rounded-3xl p-8 shadow-sm"
            >
              <h3 className="text-xl font-bold">{pillar.title}</h3>
              <p className="mt-4 text-sm text-stone-600 leading-relaxed">
                {pillar.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
