import React from "react";

export default function GroupMetrics({ metrics }) {
  return (
    <section className="py-20 bg-[#111111] text-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="border border-white/10 p-6 rounded-2xl">
            <div className="text-3xl font-bold">{metric.value}</div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/50 mt-2">
              {metric.label}
            </div>
            <p className="text-sm text-white/70 mt-3">{metric.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
