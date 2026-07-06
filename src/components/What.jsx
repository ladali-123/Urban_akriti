import { useEffect, useRef, useState } from "react";
import { Building2, Sofa, KeyRound, Briefcase, ArrowRight } from "lucide-react";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import video3 from "../assets/video3.mp4";
import video4 from "../assets/video4.mp4";

/**
 * "What we do" section — Urbankriti
 * ----------------------------------------------------------------
 * Reference layout: heading + intro, then 4 separate full-bleed
 * sections, each with its own background video (video1–video4)
 * and a translucent card on top. Card alternates left/right on
 * each successive section.
 *
 * HOW TO USE
 * 1. npm i lucide-react   (icons — swap for your own if you prefer)
 * 2. Put video1.mp4, video2.mp4, video3.mp4, video4.mp4 in /public/assets/
 *    (or wherever your project serves static files from — update `video` below)
 * 3. Replace `poster` with a fallback image path (shows before video loads)
 * 4. Edit title / description / cta per vertical below
 * 5. Drop <WhatWeDo /> anywhere in your page
 */

const verticals = [
  {
    icon: Building2,
    title: "Urbankriti Developments",
    description:
      "A residential development studio creating aesthetic, efficient and liveable homes across the region.",
    cta: "Know more",
    href: "#",
    video: video1,
    poster: "/assets/video1-poster.jpg",
  },
  {
    icon: Sofa,
    title: "Urbankriti Interiors",
    description:
      "A design, build and furnish studio delivering exceptional residential, commercial, retail and hospitality spaces.",
    cta: "Know more",
    href: "#",
    video: video2,
    poster: "/assets/video2-poster.jpg",
  },
  {
    icon: KeyRound,
    title: "Urbankriti Realty",
    description:
      "An advisory and brokerage arm helping buyers and investors find the right property, at the right price.",
    cta: "Know more",
    href: "#",
    video: video3,
    poster: "/assets/video3-poster.jpg",
  },
  {
    icon: Briefcase,
    title: "Urbankriti Consulting",
    description:
      "A project advisory practice guiding developers and landowners from concept through to execution.",
    cta: "Know more",
    href: "#",
    video: video4,
    poster: "/assets/video4-poster.jpg",
  },
];

// Fades a block in once it scrolls into view, and only plays its
// videos while it's on screen (saves bandwidth + battery).
function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function FeatureBlock({ data, reversed }) {
  const [ref, inView] = useInView(0.3);
  const videoRef = useRef(null);
  const { icon: Icon, title, description, cta, href, video, poster } = data;

  // play/pause the actual video element as it scrolls in/out of view
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="relative w-full min-h-[480px] sm:min-h-[520px] md:min-h-[600px] bg-[#10171B] border-b-2 border-white"
    >
      {/* full-bleed background video for this section — overflow-hidden lives HERE,
          not on the outer wrapper, so the card is never clipped */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={video}
          poster={poster}
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* card, alternates left/right, flush against the vertical line */}
      <div
        className={[
          "absolute top-1/2 -translate-y-1/2 z-20 w-[88%] sm:w-[420px]",
          "left-1/2 -translate-x-1/2 md:translate-x-0",
          reversed ? "md:right-1/2 md:left-auto" : "md:left-1/2 md:right-auto",
          "transition-all duration-700 ease-out",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        ].join(" ")}
        style={{ transitionProperty: "opacity, transform" }}
      >
        <div
          className={[
            "bg-[#F7F4EC]/95 backdrop-blur-md px-7 py-8 shadow-xl",
            "rounded-2xl",
            reversed ? "md:rounded-tr-[3rem]" : "md:rounded-tl-[3rem]",
          ].join(" ")}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#10171B]">
              <Icon className="h-5 w-5 text-[#C79A56]" strokeWidth={1.75} />
            </span>
            <h3 className="text-xl font-semibold text-[#10171B] leading-tight">
              {title}
            </h3>
          </div>

          <p className="text-[#3B4147] text-[15px] leading-relaxed mb-6">
            {description}
          </p>

          <a
            href={href}
            className="inline-flex items-center gap-2 rounded-md bg-[#10171B] px-5 py-2.5 text-xs font-semibold tracking-wide text-[#F7F4EC] uppercase hover:bg-[#1c2830] transition-colors"
          >
            {cta}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function WhatWeDo() {
  return (
    <section className="w-full bg-white">
      {/* heading + intro */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-20 pb-14">
        <h2 className="text-5xl md:text-6xl font-bold text-[#10171B] mb-10">
          What we do?
        </h2>
        <div className="border-l-2 border-[#C79A56] pl-6 max-w-xl">
          <p className="text-[#3B4147] text-lg leading-relaxed">
            Urbankriti owns and operates business verticals that are seamlessly
            focused on providing a singular, trusted source for the diverse
            needs of our customers.
          </p>
        </div>
      </div>

      {/* alternating video + card blocks */}
      <div className="relative">
        {/* single vertical line running through all sections, unbroken by the white dividers */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#C79A56] z-10 pointer-events-none" />

        {verticals.map((v, i) => (
          <FeatureBlock key={v.title} data={v} reversed={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}