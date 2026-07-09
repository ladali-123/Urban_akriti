import { useEffect, useRef, useState } from "react";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";

export default function WhoWeWorkWith() {
  const logos = [logo1, logo2, logo3, logo4];
  const scrollingLogos = [...logos, ...logos];

  const trackRef = useRef(null);
  const positionRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frameId;
    const speed = 1.4; // px per frame, increase for faster scroll

    const step = () => {
      if (!isPaused) {
        positionRef.current -= speed;
        const halfWidth = track.scrollWidth / 2;

        if (Math.abs(positionRef.current) >= halfWidth) {
          positionRef.current = 0;
        }
        track.style.transform = `translateX(${positionRef.current}px)`;
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused]);

  const nudge = (dir) => {
    positionRef.current += dir * 160;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16 md:py-20">
      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-900 tracking-tight leading-[1.05]">
          Who we
          <br />
          work with?
        </h2>

        <p className="mt-6 sm:mt-8 max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
          We work with top-tier corporate and promoter-led businesses in the
          country, including Real estate, Aviation and IT, symbolizing our
          commitment to excellence across diverse industries. Our success and
          respect are a testament to the quality and ethics we bring to every
          relationship.
        </p>

        {/* Auto-scrolling logos, contained within the same width as the text */}
        <div
          className="relative mt-10 sm:mt-12 md:mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative overflow-hidden">
            {/* fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-white to-transparent z-10" />

            <div ref={trackRef} className="flex w-max gap-16 sm:gap-20 will-change-transform">
              {scrollingLogos.map((logo, i) => (
                <div key={i} className="flex items-center justify-center shrink-0">
                  <img
                    src={logo}
                    alt={`Partner logo ${(i % logos.length) + 1}`}
                    className="max-h-14 sm:max-h-16 md:max-h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Manual controls */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => nudge(1)}
              aria-label="Scroll logos left"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => nudge(-1)}
              aria-label="Scroll logos right"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}