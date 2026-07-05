import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

/**
 * ABOUT US — sticky navbar + split reveal section
 * ------------------------------------------------
 * Design tokens
 *  Ivory bg   : #FBF9F5
 *  Ink        : #14181F
 *  Deep navy  : #101826
 *  Bronze     : #B4894F   (accent)
 *  Slate      : #8A93A3   (secondary text)
 *
 * Fonts (add these to your index.html <head> or _document):
 *  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
 *
 * TAILWIND CONVERSION NOTES:
 *  - All custom `.animate-*` CSS classes (bounce-float, bounce-float-delayed,
 *    bubble-float, drift, drift-slow, drift-slower) have been removed and
 *    replaced with Tailwind's arbitrary-value `animate-[...]` utility, e.g.
 *    `animate-[bounce-float_3.5s_ease-in-out_infinite]`.
 *  - The only CSS left in the <style> tag is the raw `@keyframes` definitions
 *    themselves — Tailwind has no utility that can *author* a keyframe, it
 *    can only *reference* one by name, so this part can't be removed without
 *    a Tailwind config file (not available in this environment).
 *  - Per-bubble duration/delay still come through inline `style`, since those
 *    values are computed per-item in JS — inline styles simply override the
 *    class's default timing, same cascade behavior as before.
 *  - Layout, spacing, color and structure are untouched — pixel-for-pixel
 *    the same as the original.
 */

/* ---------------------------------- */
/*  Small hook: fade/slide an element  */
/*  in once it enters the viewport     */
/* ---------------------------------- */
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

/* ---------------------------------- */
/*               Navbar                */
/* ---------------------------------- */
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
/*          Ambient background         */
/* ---------------------------------- */
function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#B4894F]/10 blur-3xl motion-reduce:animate-none animate-[drift-slow_9s_ease-in-out_infinite]" />
      <div className="absolute top-1/3 -right-32 w-[380px] h-[380px] rounded-full bg-[#101826]/[0.05] blur-3xl motion-reduce:animate-none animate-[drift-slower_11s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-[#B4894F]/[0.07] blur-3xl motion-reduce:animate-none animate-[drift_7s_ease-in-out_infinite]" />

      {/* subtle diagonal crosshatch / diamond grid, tiled across the whole section */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern
            id="diamond-grid"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="56" stroke="#B4894F" strokeOpacity="0.1" strokeWidth="1" />
            <line x1="0" y1="0" x2="56" y2="0" stroke="#B4894F" strokeOpacity="0.1" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diamond-grid)" />
      </svg>
    </div>
  );
}

/* ---------------------------------- */
/*   Bubbles floating around the img   */
/* ---------------------------------- */
function ImageBubbles() {
  // spread bubbles all around the image, varying size/position/speed/delay
  const bubbles = [
    { size: 70, top: "-8%", left: "-10%", delay: "0s", dur: "7s", opacity: 0.14 },
    { size: 40, top: "5%", left: "88%", delay: "0.8s", dur: "6s", opacity: 0.18 },
    { size: 26, top: "40%", left: "-14%", delay: "1.4s", dur: "5.5s", opacity: 0.2 },
    { size: 55, top: "78%", left: "92%", delay: "0.4s", dur: "8s", opacity: 0.15 },
    { size: 18, top: "92%", left: "10%", delay: "2s", dur: "5s", opacity: 0.22 },
    { size: 34, top: "18%", left: "102%", delay: "1.1s", dur: "6.5s", opacity: 0.16 },
    { size: 22, top: "60%", left: "-18%", delay: "0.2s", dur: "7.5s", opacity: 0.2 },
    { size: 48, top: "-12%", left: "60%", delay: "1.7s", dur: "6.8s", opacity: 0.12 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#B4894F] motion-reduce:animate-none animate-[bubble-float_ease-in-out_infinite]"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            opacity: b.opacity,
            animationDelay: b.delay,
            animationDuration: b.dur,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------------------------- */
/*             About Us                */
/* ---------------------------------- */
export default function AboutUs() {
  const [imgRef, imgVisible] = useReveal(0.25);
  const [textRef, textVisible] = useReveal(0.25);
  const [statsRef, statsVisible] = useReveal(0.4);

  const paragraphs = [
    "We are a privately held venture, founded and driven by professionals who believe great outcomes start with disciplined thinking.",
    "Across every vertical we operate in, our focus stays the same — closing the gap between what people expect and what they actually experience.",
    "Guided by transparency and an obsession with quality, we build products, spaces and partnerships that are made to last.",
  ];

  const stats = [
    { value: "12+", label: "Years of trust" },
    { value: "40+", label: "Projects delivered" },
    { value: "4", label: "Business verticals" },
  ];

  return (
    <section
      id="about"
      className="relative bg-[#FBF9F5] py-14 md:py-14 overflow-hidden"
    >
      <AmbientBackground />

      {/* section label, centered at the top */}
      <div className="relative flex justify-center mb-10 md:mb-10">
        <span className="inline-flex items-center gap-3 font-[Inter] text-2xl tracking-[0.2em] uppercase 
        font-semibold text-[#B4894F]">
          <span className="w-8 h-px bg-[#B4894F]" />
          About Us
          <span className="w-8 h-px bg-[#B4894F]" />
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* ---------- Image side ---------- */}
        <div
          ref={imgRef}
          className={`relative transition-all duration-[1100ms] ease-out ${
            imgVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-12"
          }`}
        >
          {/* bubbles sit behind/around the image, spanning a bit beyond its box */}
          <ImageBubbles />

          {/* creative corner-bracket accents instead of a plain frame/ring —
              two open "L" brackets that bounce a beat behind the photo */}
          <svg
            className={`absolute -top-6 -left-6 w-16 h-16 text-[#B4894F] motion-reduce:animate-none ${
              imgVisible
                ? "animate-[bounce-float_3.5s_ease-in-out_infinite]"
                : ""
            }`}
            style={imgVisible ? { animationDelay: "0.3s" } : undefined}
            viewBox="0 0 64 64"
            fill="none"
          >
            <path
              d="M2 22V6a4 4 0 0 1 4-4h16"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <svg
            className={`absolute -bottom-6 -right-6 w-16 h-16 text-[#B4894F] motion-reduce:animate-none ${
              imgVisible
                ? "animate-[bounce-float_3.5s_ease-in-out_infinite]"
                : ""
            }`}
            style={imgVisible ? { animationDelay: "0.3s" } : undefined}
            viewBox="0 0 64 64"
            fill="none"
          >
            <path
              d="M62 42v16a4 4 0 0 1-4 4H42"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* small solid accent dot, offset from the corner bracket */}
          <span
            className={`absolute -top-3 left-14 w-3 h-3 rounded-full bg-[#B4894F] motion-reduce:animate-none ${
              imgVisible ? "animate-[bounce-float_3.5s_ease-in-out_infinite]" : ""
            }`}
          />

          <div
            className={`relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(20,24,31,0.25)] motion-reduce:animate-none ${
              imgVisible ? "animate-[bounce-float_3.5s_ease-in-out_infinite]" : ""
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
              alt="Our team at work"
              className="w-full h-full object-cover scale-[1.03] hover:scale-100 transition-transform duration-[1400ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101826]/30 via-transparent to-transparent" />
          </div>
        </div>

        {/* ---------- Text side ---------- */}
        <div
          ref={textRef}
          className={`transition-all duration-[1100ms] ease-out delay-150 ${
            textVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-12"
          }`}
        >
          <h2 className="font-[Playfair_Display] text-3xl md:text-4xl leading-[1.15] text-[#3A1E1E]">
            Deciphering opportunities,
            <br />
            building lasting trust.
          </h2>

          <div className="mt-8 space-y-5">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={`font-[Inter] text-[#3a3f49] leading-relaxed transition-all duration-700 ease-out text-lg text-justify${
                  textVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* stats row */}
          <div
            ref={statsRef}
            className="mt-14 grid grid-cols-3 gap-6 border-t border-[#14181F]/10 pt-8"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`transition-all duration-700 ease-out ${
                  statsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <p className="font-[Playfair_Display] text-3xl text-[#14181F]">
                  {s.value}
                </p>
                <p className="font-[Inter] text-xs text-[#8A93A3] mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Only raw @keyframes remain here — Tailwind utilities (animate-[...])
          reference these by name above, but Tailwind itself can't author a
          keyframe as a class without a config file, so this bit of plain CSS
          is unavoidable in a config-less setup. */}
      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.08); }
        }
        @keyframes drift-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 25px) scale(1.05); }
        }
        @keyframes drift-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 30px) scale(1.1); }
        }
        @keyframes bounce-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes bubble-float {
          0%   { transform: translate(0, 0) scale(1); }
          25%  { transform: translate(6px, -14px) scale(1.06); }
          50%  { transform: translate(-4px, -22px) scale(0.96); }
          75%  { transform: translate(-8px, -8px) scale(1.03); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>
    </section>
  );
}

/* ---------------------------------- */
/*  Example usage (remove if unused)   */
/* ---------------------------------- */
export function AboutPageDemo() {
  return (
    <div className="min-h-screen bg-[#FBF9F5]">
      <Navbar />
      <div className="pt-24">
        <AboutUs />
      </div>
    </div>
  );
}