import { useEffect, useRef, useState } from 'react';
import Silk from './Silk';
import kitchenVideo from '../assets/kitchen.mp4';

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
    <div ref={sectionRef} className="relative w-full min-h-[520px] overflow-hidden">
      {/* Background Silk layer */}
      <div className="absolute inset-0 z-0" style={{ bottom: '80px' }}>
        <Silk speed={5} scale={1} color="#7C8FA3" noiseIntensity={0.8} rotation={0} />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 py-12">
        <h2 className="text-white text-4xl md:text-5xl font-normal mb-14">
          What Drive us?
        </h2>

        <div className="relative w-full" style={{ minHeight: '560px' }}>
          <video
            src={kitchenVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full max-w-[640px] h-[420px] object-cover rounded-tl-[60px] rounded-tr-xl rounded-bl-xl rounded-br-xl block"
          />

          <div
            className="absolute flex flex-col gap-7"
            style={{ top: '190px', left: '50%', right: '0', width: 'auto' }}
          >
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className={`text-white text-[17px] leading-relaxed m-0 transition-all duration-700 ease-out ${
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
            className="absolute inline-flex items-center gap-1.5 text-white underline font-semibold tracking-wider text-sm"
            style={{ top: '460px', left: '0' }}
          >
            KNOW MORE ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default Whychoose;