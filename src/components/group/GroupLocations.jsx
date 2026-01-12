import React from "react";

export default function GroupLocations({ locations }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-stone-400">
              Locations
            </p>
            <h2 className="text-3xl md:text-4xl font-black mt-3">
              Global presence, local precision.
            </h2>
          </div>
          <p className="text-sm text-stone-500 max-w-md">
            Each city is supported by Matrix standard training, local artisans,
            and private appointments.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {locations.map((location) => (
            <div
              key={location.city}
              className="border border-stone-200 rounded-3xl p-6"
            >
              <h3 className="text-xl font-bold">{location.city}</h3>
              <p className="mt-3 text-sm text-stone-600">{location.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
