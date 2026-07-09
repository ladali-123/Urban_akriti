import { useState } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "I find Infinity People highly professional & productive. They are very passionate & strive for a quick turnaround. Their deep understanding of the business and challenges gives them a competitive edge",
      name: "Anurag Joneja,",
      title: "Head Corporate Human Resources at Central Park",
    },
    {
      quote:
        "Working with this team has been a genuinely smooth experience. They bring clarity to complex problems and always deliver on time, without compromising on quality.",
      name: "Priya Malhotra,",
      title: "VP Operations at Skyline Realty",
    },
    {
      quote:
        "Their attention to detail and ownership of every project stood out to us. It felt less like a vendor relationship and more like a true extension of our own team.",
      name: "Rohan Vij,",
      title: "Director Strategy at Aeroview Aviation",
    },
  ];

  const [index, setIndex] = useState(0);

  const goTo = (dir) => {
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const active = testimonials[index];

  return (
    <section className="w-full bg-white">
      {/* Heading */}
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-12 md:pb-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-900 tracking-tight leading-[1.05]">
          What People
          <br />
          say about us?
        </h2>
      </div>

      {/* Dark testimonial panel */}
      <div className="relative w-full bg-[#0e2a3f] overflow-hidden">
        {/* Subtle skyline illustration, bottom right */}
        <svg
          className="pointer-events-none absolute bottom-0 right-0 w-56 sm:w-72 md:w-96 opacity-[0.12]"
          viewBox="0 0 400 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="10" y="90" width="30" height="110" stroke="white" strokeWidth="1.5" />
          <rect x="50" y="60" width="26" height="140" stroke="white" strokeWidth="1.5" />
          <rect x="86" y="110" width="34" height="90" stroke="white" strokeWidth="1.5" />
          <rect x="130" y="40" width="28" height="160" stroke="white" strokeWidth="1.5" />
          <rect x="168" y="80" width="24" height="120" stroke="white" strokeWidth="1.5" />
          <rect x="202" y="20" width="30" height="180" stroke="white" strokeWidth="1.5" />
          <circle cx="217" cy="60" r="10" stroke="white" strokeWidth="1.5" />
          <rect x="242" y="70" width="26" height="130" stroke="white" strokeWidth="1.5" />
          <path d="M40 90 L86 60 L130 90" stroke="white" strokeWidth="1.5" />
          <rect x="278" y="100" width="20" height="100" stroke="white" strokeWidth="1.5" />
        </svg>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-14 sm:px-20 md:px-24 py-14 sm:py-16 md:py-20">
          {/* Arrows */}
          <button
            onClick={() => goTo(-1)}
            aria-label="Previous testimonial"
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-white/50 hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => goTo(1)}
            aria-label="Next testimonial"
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-white/50 hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Quote mark */}
          <span className="block text-6xl sm:text-7xl md:text-8xl font-serif text-amber-200/70 leading-none select-none">
            &ldquo;
          </span>

          {/* Quote text */}
          <p className="mt-2 sm:mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
            {active.quote}
          </p>

          {/* Author */}
          <div className="mt-8 sm:mt-10 md:mt-12">
            <p className="text-white font-semibold text-sm sm:text-base">{active.name}</p>
            <p className="text-white/60 text-sm sm:text-base">{active.title}</p>
          </div>
        </div>
      </div>
    </section>
  );
}