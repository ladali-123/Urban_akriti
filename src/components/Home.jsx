import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
// Path apne folder structure ke hisaab se check kar lena
import pic1 from "../assets/pic1.png";
import pic2 from "../assets/pic2.png";
import pic3 from "../assets/pic3.png";
import pic4 from "../assets/pic4.png";

const images = [pic1, pic2, pic3, pic4];

/* ---------- Scroll-reveal hook (fade-up on scroll, infiventures jaisa) ---------- */
function useReveal(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- Line-mask reveal: har line neeche se maskke saath slide-up hoti hai (creative, agency-style) ---------- */
function MaskLine({ children, delay = 0, loaded }) {
  return (
    <span className="block overflow-hidden">
      <span
        className={`block transition-transform duration-[900ms] ease-out ${
          loaded ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </span>
    </span>
  );
}

export default function HomeHero() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative h-[90vh] min-h-[620px] w-full overflow-hidden flex items-center justify-center text-center">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Urban Kriti design ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
              i === current ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
            style={{ transitionProperty: "opacity, transform", transitionDuration: "1500ms, 6000ms" }}
          />
        ))}

        {/* Halka dark overlay poori image pe — chahe pic light ho ya dark, text/button hamesha readable rahega */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Sirf bottom ka thoda sa hissa halka merge karta hai maroon me — baaki poori image clear rehti hai */}
        <div className="absolute bottom-0 left-0 right-0 h-[18%] bg-gradient-to-b from-transparent to-[#3a1e1e]" />

        {/* Text ab vertically centered hai, thoda upar (translate) taaki bottom marquee/gradient se overlap na ho */}
        <div
          className={`relative z-10 max-w-2xl mx-auto px-6 -translate-y-6 md:-translate-y-10 transition-opacity duration-700 ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Reveal delay={0}>
            <p className="uppercase tracking-[0.35em] text-[11px] md:text-xs text-[#d9b98a] mb-5 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
              Architecture &amp; Interior Solutions
            </p>
          </Reveal>

          <h1 className="font-serif font-normal text-white text-[1.75rem] leading-[1.35] sm:text-4xl sm:leading-[1.3] md:text-[2.75rem] md:leading-[1.28] tracking-wide mb-8 [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
            <MaskLine delay={150} loaded={loaded}>
              Designing spaces that reflect
            </MaskLine>
            <MaskLine delay={300} loaded={loaded}>
              your dreams and elevate your lifestyle.
            </MaskLine>
          </h1>

          <Reveal delay={550}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 border border-white/80 bg-black/10 backdrop-blur-[2px] text-white text-xs md:text-sm px-7 py-3 tracking-[0.18em] font-medium hover:bg-white hover:text-[#1c1c1c] transition-colors duration-300"
            >
              BOOK FREE CONSULTATION
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? "w-8 bg-[#d9b98a]" : "w-3 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ---------------- MARQUEE STRIP (halka scrolling strap, infiventures jaisa) ---------------- */}
      <style>{`
        @keyframes uk-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .uk-marquee-track {
          animation: uk-marquee 28s linear infinite;
        }
      `}</style>
      <div className="relative z-10 bg-[#3a1e1e] border-y border-white/10 overflow-hidden py-2">
        <div className="flex w-max uk-marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0">
              {[
                "ARCHITECTURE",
                "INTERIOR DESIGN",
                "RESIDENTIAL & COMMERCIAL",
                "TURNKEY EXECUTION",
                "MATERIAL & LIGHTING",
              ].map((word) => (
                <span
                  key={word}
                  className="flex items-center text-[#d9b98a]/80 text-xs md:text-sm tracking-[0.3em] 
                  uppercase px-4 whitespace-nowrap"
                >
                  {word}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d9b98a]/50 ml-6" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- DARK TEXT SECTION BELOW HERO ---------------- */}
      <section className="bg-[#3a1e1e] pt-10 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="block w-10 h-[2px] bg-[#d9b98a] mx-auto mb-5" />
            <p className="text-lg md:text-2xl italic text-white/90 font-serif leading-relaxed max-w-3xl mx-auto">
              "Giving spaces a deeper purpose through inspired design and
              functional ingenuity — where every detail is considered, every
              material has intention, and every corner tells a story worth
              living in."
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}