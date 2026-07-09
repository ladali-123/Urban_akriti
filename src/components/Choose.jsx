import stars from "../assets/stars.mp4";

export default function WhyChooseUs() {
  const points = [
    {
      title: "Built by professionals",
      text: "We are professionals besotted by the potential that exists to change things for the better. Driven by passion and purpose, we believe that the right guidance, knowledge, and dedication can transform lives",
    },
    {
      title: "Confident in our craft",
      text: "We are confident in our capabilities to be the change that needs to happen. With dedication, expertise, and a commitment to excellence, we work tirelessly to make a meaningful difference",
    },
    {
      title: "Customer at the core",
      text: "We are obsessed with keeping our customers' interests at the core of everything we do. Every decision we make is driven by our commitment to delivering the highest quality education.",
    },
  ];

  return (
    <section className="relative w-full min-h-[380px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[560px] overflow-hidden flex items-start">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover border-0 outline-none"
        src={stars}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Light overlay only for text readability, video stays sharp */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-10 pt-10 sm:pt-14 md:pt-32 pb-8 sm:pb-10 md:pb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight">
          Why Choose Us?
        </h2>

        <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {points.map((point, i) => (
            <div key={i} className="max-w-xs">
              <p className="text-white/90 text-sm sm:text-base md:text-base leading-relaxed text-justify">
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Us link, bottom right of the whole section */}
      <a
        href="#contact"
        className="absolute z-10 bottom-6 sm:bottom-8 md:bottom-10 right-5 sm:right-8 md:right-20 flex 
        items-center gap-1.5 text-white md:text-base sm:text-1xl tracking-wide uppercase hover:opacity-80 
        transition-opacity"
      >
        Contact Us
        <span className="text-base leading-none">↗</span>
      </a>
    </section>
  );
}