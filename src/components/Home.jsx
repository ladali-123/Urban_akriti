import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
// Path apne folder structure ke hisaab se check kar lena
import pic1 from "../assets/pic1.png";

/* ---------- Line-mask reveal: har line neeche se maskke saath slide-up hoti hai ---------- */
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

/* ---------- Tiny gold mark, "infinity" logo jaisa but apna brand ke liye ---------- */
function BrandMark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle cx="9" cy="9" r="6.4" stroke="#d9b98a" strokeWidth="1.4" />
      <circle cx="17" cy="9" r="6.4" stroke="#d9b98a" strokeWidth="1.4" />
      <circle cx="13" cy="16.5" r="6.4" stroke="#d9b98a" strokeWidth="1.4" />
    </svg>
  );
}

export default function HomeHero() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Scroll par nav + text upar ki taraf move + fade ho jaate hain (parallax exit)
  useEffect(() => {
    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          tickingRef.current = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroTranslate = Math.min(scrollY * 0.5, 260); // upar move
  const heroOpacity = Math.max(1 - scrollY / 420, 0); // fade out

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* ---------------- BACKGROUND IMAGE (static, pic1) ---------------- */}
      <img
        src={pic1}
        alt="Urban Kriti interior design"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
          loaded ? "scale-105" : "scale-100"
        }`}
      />
      {/* Halka dark overlay poori image pe — text hamesha readable rahega */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute bottom-0 left-0 right-0 h-[18%] bg-gradient-to-b from-transparent to-black/40" />

      {/* ---------------- CONTENT (nav + hero text) — scroll par upar move + fade ---------------- */}
      <div
        className="relative z-10 flex h-full flex-col"
        style={{
          transform: `translateY(-${heroTranslate}px)`,
          opacity: heroOpacity,
        }}
      >
        {/* ---------------- NAVBAR ---------------- */}
        <nav
          className={`flex items-center justify-between px-6 md:px-12 pt-6 md:pt-8 transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <BrandMark />
            <span className="text-white font-sans font-semibold tracking-[0.3em] text-sm md:text-base">
              URBAN KRITI
            </span>
          </div>

          <ul className="hidden md:flex items-center gap-9 text-[13px] tracking-[0.18em] uppercase text-white/90 font-sans">
            <li>
              <a href="#home" className="hover:text-[#d9b98a] transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-[#d9b98a] transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-[#d9b98a] transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-[#d9b98a] transition-colors">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-[#d9b98a] transition-colors">
                Contact
              </a>
            </li>
          </ul>

          {/* Mobile: sirf brand ke saath ek simple CTA icon rakha, full menu chahiye toh drawer add kar lena */}
          <a
            href="#contact"
            className="md:hidden text-white/90 text-[11px] tracking-[0.18em] uppercase border border-white/40 px-3 py-1.5"
          >
            Menu
          </a>
        </nav>

        {/* ---------------- HERO TEXT ---------------- */}
        <div className="flex flex-1 items-center px-6 md:px-12">
          <div className="max-w-3xl">
            <h1 className="font-sans font-semibold text-white text-[2.6rem] leading-[1.05] sm:text-6xl sm:leading-[1.03] md:text-7xl md:leading-[1.02] lg:text-[5.5rem] tracking-tight [text-shadow:0_2px_16px_rgba(0,0,0,0.35)]">
              <MaskLine delay={150} loaded={loaded}>
                Inspired
              </MaskLine>
              <MaskLine delay={280} loaded={loaded}>
                Design
              </MaskLine>
              <MaskLine delay={410} loaded={loaded}>
                Timeless
              </MaskLine>
              <MaskLine delay={540} loaded={loaded}>
                Living
              </MaskLine>
            </h1>

            <div
              className={`transition-all duration-700 ease-out ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              <a
                href="#contact"
                className="group mt-9 inline-flex items-center gap-2 border border-white/80 bg-black/10 backdrop-blur-[2px] text-white text-xs md:text-sm px-7 py-3 tracking-[0.18em] font-medium hover:bg-white hover:text-[#1c1c1c] transition-colors duration-300"
              >
                BOOK FREE CONSULTATION
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}