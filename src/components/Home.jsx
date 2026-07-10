import { useEffect, useRef, useState } from "react";
import pic1 from "../assets/pic1.png";

/* ---------- Line (no animation, stays in place) ---------- */
function MaskLine({ children }) {
    return (
        <span className="block overflow-hidden">
            <span className="block">
                {children}
            </span>
        </span>
    );
}

/* ---------- Custom Social Icons ---------- */
function LinkedinIcon({ size = 22, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

function InstagramIcon({ size = 22, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    );
}

function FacebookIcon({ size = 22, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );
}

/* ---------- Decorative Golden Infinity Rings ---------- */
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
    const [scrollY, setScrollY] = useState(0);
    const [showBottom, setShowBottom] = useState(false);
    const tickingRef = useRef(false);

    // Scroll handler for hero movement
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

    // Entrance animation for bottom section
    useEffect(() => {
        const timer = setTimeout(() => setShowBottom(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const heroTranslate = Math.min(scrollY * 0.5, 260);

    return (
        <section className="relative w-full h-[180vh] overflow-hidden">
            {/* Background Image */}
            <img
                src={pic1}
                alt="Infinity"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 z-0"></div>

            {/* Hero Content – text + gold rings move together */}
            <div
                className="relative z-10 flex items-start h-full px-6 sm:px-10 md:px-24 lg:px-36 pt-48 sm:pt-72 md:pt-80"
                style={{
                    transform: `translateY(-${heroTranslate}px)`,
                }}
            >
                <GoldRings />

                <div className="max-w-4xl">
                    <h1 className="font-sans font-medium not-italic text-white leading-[1.05] tracking-tight 
                        text-4xl sm:text-6xl md:text-7xl lg:text-[7rem]">
                        <MaskLine>Believable</MaskLine>
                        <MaskLine>Ethos</MaskLine>
                        <MaskLine>Unbelievable</MaskLine>
                        <MaskLine>Ambition</MaskLine>
                    </h1>
                </div>
            </div>

            {/* Bottom Section – static, with slide-up animation */}
            <div
                className="absolute z-20 bottom-20 sm:bottom-32 md:bottom-40 left-0 w-full flex items-center 
                justify-between px-6 sm:px-10 md:px-24 lg:px-36"
                style={{
                    opacity: showBottom ? 1 : 0,
                    transform: showBottom ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
            >
                {/* Left text – और ऊपर (मोबाइल पर extra) */}
                <div className="flex flex-col gap-1 -translate-y-6 sm:-translate-y-3">
                    <p className="text-white font-sans font-medium text-base sm:text-lg">
                        Deciphering Opportunities
                    </p>
                    <p className="text-white font-sans font-medium text-base sm:text-lg">
                        Fuelling Excellence
                    </p>
                    <p className="text-white font-sans font-medium text-base sm:text-lg">
                        Building Trust
                    </p>
                </div>

                {/* Right social icons – थोड़ा नीचे (मोबाइल पर) */}
                <div className="flex items-center gap-3 sm:gap-6 translate-y-2 sm:translate-y-0">
                    <a
                        href="#"
                        aria-label="LinkedIn"
                        className="text-white hover:text-[#D9A857] transition-colors"
                    >
                        <LinkedinIcon size={16} className="sm:w-[22px] sm:h-[22px]" />
                    </a>
                    <a
                        href="#"
                        aria-label="Instagram"
                        className="text-white hover:text-[#D9A857] transition-colors"
                    >
                        <InstagramIcon size={16} className="sm:w-[22px] sm:h-[22px]" />
                    </a>
                    <a
                        href="#"
                        aria-label="Facebook"
                        className="text-white hover:text-[#D9A857] transition-colors"
                    >
                        <FacebookIcon size={16} className="sm:w-[22px] sm:h-[22px]" />
                    </a>
                </div>
            </div>
        </section>
    );
}