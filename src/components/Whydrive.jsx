import { useEffect, useRef, useState } from 'react';
import Silk from './Silk';
import kitchenVideo from '../assets/Kitchen.mp4';

function Whychoose() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const paragraphs = [
    'The founding tenet behind Infinity is fundamentally based on the core values of Professionalism, Integrity and Efficiency.',
    'Our commitment towards consistently meeting and exceeding customer needs is the major driving force across the group.',
    'Guided by the basic principles of Speed, Transparency and Quality, we strive to professionally manage our operations and promote Inclusive growth.',
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-[520px] md:overflow-hidden overflow-visible pb-10 md:pb-0"
    >
      {/* Background Silk layer */}
      <div className="absolute inset-0 z-0" style={{ bottom: '80px' }}>
        <Silk speed={5} scale={1} color="#7C8FA3" noiseIntensity={0.8} rotation={0} />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 py-12">
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-normal mb-8 md:mb-14">
          What Drive us?
        </h2>

        {/* Mobile: simple stacked column. Desktop (md+): original absolute layout */}
        <div className="relative w-full flex flex-col gap-6 md:block md:min-h-[560px]">
          <video
            src={kitchenVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[260px] sm:h-[340px] rounded-tl-[60px] rounded-tr-xl rounded-bl-xl rounded-br-xl md:absolute md:top-0 md:left-0 md:w-full md:max-w-[640px] md:h-[420px] object-cover block"
          />

          <div className="flex flex-col gap-5 md:absolute md:gap-7 md:top-[190px] md:left-1/2 md:right-0 md:w-auto">
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className={`text-white text-[15px] sm:text-base md:text-[17px] leading-relaxed m-0 transition-all duration-700 ease-out ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 0.25}s` }}
              >
                {text}
              </p>
            ))}
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-white underline mb-6 font-semibold tracking-wider text-sm md:absolute md:top-[460px] md:left-0"
          >
            KNOW MORE ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default Whychoose;