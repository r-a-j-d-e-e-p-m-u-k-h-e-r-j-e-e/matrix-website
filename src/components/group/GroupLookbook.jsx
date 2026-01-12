import React from "react";

export default function GroupLookbook({ images }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-stone-400">
              Lookbook
            </p>
            <h2 className="text-3xl md:text-4xl font-black mt-3">
              A visual of three worlds in one house.
            </h2>
          </div>
          <p className="text-sm text-stone-500 max-w-md">
            From Matrix minimalism to American Club estates and Always Well India
            ease, each frame carries the Matrix signature.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className={`overflow-hidden rounded-3xl ${
                index === 1 ? "md:row-span-2" : ""
              }`}
            >
              <img
                src={image}
                alt="Lookbook"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
