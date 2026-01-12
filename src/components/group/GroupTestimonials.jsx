import React from "react";

export default function GroupTestimonials({ testimonials }) {
  return (
    <section className="py-24 bg-[#f8f6f2]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.4em] text-stone-400">
          Voices
        </p>
        <h2 className="text-3xl md:text-4xl font-black mt-3">
          Clients across the Matrix umbrella.
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-3xl p-8 shadow-sm"
            >
              <p className="text-sm text-stone-600 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="mt-6 text-xs uppercase tracking-widest text-stone-400">
                {testimonial.name}
              </div>
              <div className="text-xs text-stone-500">{testimonial.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
