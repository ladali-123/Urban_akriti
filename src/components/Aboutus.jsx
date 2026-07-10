import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import buildingImg from "../assets/buil.avif";
import gradImg from "../assets/grad.avif";

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, visible];
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Home", "About", "Services", "Projects", "Contact"];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FBF9F5]/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(20,24,31,0.06)] py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="font-[Playfair_Display] tracking-[0.15em] text-lg text-[#14181F]"
        >
          INFINITY
        </a>

        <ul className="hidden md:flex items-center gap-10 font-[Inter] text-[13px] tracking-[0.08em] uppercase text-[#14181F]">
          {links.map((l) => (
            <li key={l} className="relative group cursor-pointer">
              <span className="transition-colors group-hover:text-[#B4894F]">
                {l}
              </span>
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#B4894F] transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-[#14181F]"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-[#101826]/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#FBF9F5] shadow-2xl px-8 py-8 transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={() => setOpen(false)}
            className="mb-10 text-[#14181F]"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
          <ul className="flex flex-col gap-6 font-[Inter] uppercase tracking-[0.08em] text-sm text-[#14181F]">
            {links.map((l) => (
              <li key={l} className="hover:text-[#B4894F] transition-colors">
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------- */
/*        Urbankriti Feature Card      */
/* ---------------------------------- */
function CityFeatureSection() {
  const [buildingRef, buildingVisible] = useReveal(0.25);
  const [cardRef, cardVisible] = useReveal(0.25);
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  // Scroll-driven upward movement
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Calculate how much of the section has been scrolled past
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      // Move upward as scroll progresses (max 80px up)
      const translateY = -scrollProgress * 80;
      setOffset(translateY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-6 md:py-14 overflow-visible"
      style={{ zIndex: 10 }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div
          className="relative w-full max-w-[620px] mx-auto md:mx-0 md:ml-auto transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${offset}px)` }}
        >
          {/* Gradient card */}
          <div
            ref={cardRef}
            className={`relative z-20 w-full aspect-[16/10]
              rounded-none rounded-tr-[80px] overflow-hidden
              shadow-[0_30px_80px_-20px_rgba(20,24,31,0.35)]
              transition-all duration-[1100ms] ease-out delay-150
              ${cardVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}
          >
            <img
              src={gradImg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* wordmark — centered */}
            <div className="absolute inset-x-0 bottom-8 sm:bottom-10 flex justify-center">
              <span className="font-[Inter] font-semibold tracking-[0.25em] uppercase text-white text-base sm:text-xl">
                Urbankriti
              </span>
            </div>
          </div>

          {/* Building */}
          <img
            ref={buildingRef}
            src={buildingImg}
            alt=""
            className={`absolute z-30 left-[-38%] top-[55%] -translate-y-1/2
              w-[80%] h-auto
              pointer-events-none select-none
              transition-all duration-[1100ms] ease-out
              ${buildingVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}`}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/*             About Us                */
/* ---------------------------------- */
export default function AboutUs() {
  const [headingRef, headingVisible] = useReveal(0.3);
  const [listRef, listVisible] = useReveal(0.2);

  const points = [
    "A Privately held Investment Venture, Founded & Driven by Professionals",
    "Currently holding a consortium of Interlinked Group Companies, focused on the Real Estate sector",
    'Building Products, Services and Processes that bridge "Expectation" vs "Current Reality" gap',
    "Creating a Unified and Preferred platform for diverse and dynamic client requirements",
    "Guided by Ethics & focused on exceptional Value Creation for stakeholders across our operations",
  ];

  return (
    <>
      <section id="about" className="relative bg-white py-14 md:py-18">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <h2
            ref={headingRef}
            className={`font-sans font-medium text-[#14181F] leading-[1.1] tracking-tight
              text-5xl sm:text-6xl md:text-7xl
              transition-all duration-700 ease-out
              ${headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            Who we are?
          </h2>

          <div ref={listRef} className="mt-10 md:mt-12 space-y-5 md:space-y-6">
            {points.map((p, i) => (
              <p
                key={i}
                className={`font-sans text-base sm:text-xl text-[#565D6B] leading-relaxed
                  transition-all duration-700 ease-out
                  ${listVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                · {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <CityFeatureSection />
    </>
  );
}

/* ---------------------------------- */
/*  Example usage (remove if unused)   */
/* ---------------------------------- */
export function AboutPageDemo() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24">
        <AboutUs />
      </div>
    </div>
  );
}