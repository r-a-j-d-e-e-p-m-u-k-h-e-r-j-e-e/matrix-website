import React from "react";

export default function GroupServices({ services }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-stone-400">
              Services
            </p>
            <h2 className="text-3xl md:text-4xl font-black mt-3">
              Concierge, atelier, and global stewardship.
            </h2>
          </div>
          <p className="text-sm text-stone-500 max-w-md">
            Every service is designed to keep clients prepared, whether for
            private galas or everyday travel.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="border border-stone-200 rounded-3xl p-8"
            >
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="mt-4 text-sm text-stone-600 leading-relaxed">
                {service.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
