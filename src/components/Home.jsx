import { useEffect, useRef, useState } from "react";
import { Linkedin, Instagram, Facebook } from "lucide-react";
import pic1 from "../assets/pic1.png";

/* ---------- Line Reveal ---------- */
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

/* ---------- Decorative Golden Infinity Rings (smaller & centered) ---------- */
function GoldRings() {
    const circles = Array.from({ length: 8 }, (_, i) => 22 + i * 16);
    return (
        <svg
            viewBox="0 0 360 360"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] md:w-[340px] md:h-[340px] opacity-70 pointer-events-none select-none"
        >
            <g>
                {circles.map((r, i) => (
                    <circle
                        key={`l-${i}`}
                        cx="130"
                        cy="180"
                        r={r}
                        fill="none"
                        stroke="#D9A857"
                        strokeWidth="1"
                    />
                ))}
            </g>
            <g>
                {circles.map((r, i) => (
                    <circle
                        key={`r-${i}`}
                        cx="230"
                        cy="180"
                        r={r}
                        fill="none"
                        stroke="#D9A857"
                        strokeWidth="1"
                    />
                ))}
            </g>
        </svg>
    );
}

export default function HomeHero() {
    const [loaded, setLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const tickingRef = useRef(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 150);
        return () => clearTimeout(timer);
    }, []);

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

    const heroTranslate = Math.min(scrollY * 0.5, 260);
    const heroOpacity = Math.max(1 - scrollY / 420, 0);

    /* ---------- Second content block reveal (scroll-linked) ---------- */
    const revealStart = 250; // scroll px jahan se dikhna start hoga
    const revealEnd = 650; // scroll px jahan tak fully visible ho jayega
    const revealProgress = Math.min(
        Math.max((scrollY - revealStart) / (revealEnd - revealStart), 0),
        1
    );
    const secondOpacity = revealProgress;
    const secondTranslate = (1 - revealProgress) * 40; // 40px se 0px

    return (
        <section className="relative w-full h-[180vh] overflow-hidden">
            {/* Background Image */}
            <img
                src={pic1}
                alt="Infinity"
                className={`absolute inset-0 w-full h-full object-cover object-center
                   transition-transform 
                    duration-[6000ms] ease-out ${
                    loaded ? "scale-105" : "scale-100"
                }`}
            />

            {/* Dark overlay to make white text pop like in pic1 */}
            <div className="absolute inset-0  z-0"></div>

            {/* Decorative golden rings – centered & smaller */}
            <GoldRings />

            {/* Hero Content – left padding, moved down */}
            <div
                className="relative z-10 flex items-start h-full px-10 md:px-24 lg:px-36 pt-72 md:pt-80"
                style={{
                    transform: `translateY(-${heroTranslate}px)`,
                    opacity: heroOpacity,
                }}
            >
                <div className="max-w-4xl">
                    <h1 className="font-sans font-medium not-italic text-white leading-[1.05] tracking-tight 
                        text-[28px] sm:text-6xl md:text-7xl lg:text-[7rem]">
                        <MaskLine delay={150} loaded={loaded}>
                            Believable
                        </MaskLine>
                        <MaskLine delay={280} loaded={loaded}>
                            Ethos
                        </MaskLine>
                        <MaskLine delay={410} loaded={loaded}>
                            Unbelievable
                        </MaskLine>
                        <MaskLine delay={540} loaded={loaded}>
                            Ambition
                        </MaskLine>
                    </h1>
                </div>
            </div>

            {/* Second scroll-revealed section: text left + social icons right */}
            <div
                className="absolute z-20 top-[60vh] md:top-[65vh] left-0 w-full flex items-center justify-between px-10 md:px-24 lg:px-36"
                style={{
                    opacity: secondOpacity,
                    transform: `translateY(${secondTranslate}px)`,
                }}
            >
                {/* Left text */}
                <div className="flex flex-col gap-1">
                    <p className="text-white font-sans font-medium text-lg md:text-2xl lg:text-[1.75rem]">
                        Deciphering Opportunities
                    </p>
                    <p className="text-white font-sans font-medium text-lg md:text-2xl lg:text-[1.75rem]">
                        Fuelling Excellence
                    </p>
                    <p className="text-white font-sans font-medium text-lg md:text-2xl lg:text-[1.75rem]">
                        Building Trust
                    </p>
                </div>

                {/* Right social icons */}
                <div className="hidden md:flex items-center gap-6">
                    <a
                        href="#"
                        aria-label="LinkedIn"
                        className="text-white hover:text-[#D9A857] transition-colors"
                    >
                        <Linkedin size={22} strokeWidth={1.5} />
                    </a>
                    <a
                        href="#"
                        aria-label="Instagram"
                        className="text-white hover:text-[#D9A857] transition-colors"
                    >
                        <Instagram size={22} strokeWidth={1.5} />
                    </a>
                    <a
                        href="#"
                        aria-label="Facebook"
                        className="text-white hover:text-[#D9A857] transition-colors"
                    >
                        <Facebook size={22} strokeWidth={1.5} />
                    </a>
                </div>
            </div>
        </section>
    );
}