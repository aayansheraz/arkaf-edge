import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { ImageWithFallback } from "./ImageWithFallback";

const horizontalItems = [
  {
    id: 1,
    title: "Strategic Insight",
    subtitle: "Understanding People & Markets",
    tag: "01 — INSIGHT",
    url: "https://images.unsplash.com/photo-1569259236307-94d33cdaafbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnV0YWxpc3QlMjBhcmNoaXRlY3R1cmUlMjBoaWdoJTIwY29udHJhc3QlMjBtaW5pbWFsfGVufDF8fHx8MTc2OTUzODMwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    title: "Creative Execution",
    subtitle: "Transforming Ideas into Impact",
    tag: "02 — CREATIVE",
    url: "https://images.unsplash.com/photo-1657632843433-e6a8b7451ac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMDNkJTIwcmVuZGVyJTIwZnV0dXJpc3RpYyUyMGRhcmt8ZW58MXx8fHwxNzY5NTM4MzA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    title: "Purposeful Marketing",
    subtitle: "Measurable Growth & Differentiation",
    tag: "03 — PURPOSE",
    url: "https://images.unsplash.com/photo-1761859310138-29797bf92d96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtdXNldW0lMjBpbnRlcmlvciUyMGxpZ2h0JTIwc2hhZG93fGVufDF8fHx8MTc2OTUzODMwOHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 4,
    title: "Meaningful Outcomes",
    subtitle: "Discovering Your Competitive Edge",
    tag: "04 — GROWTH",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1080&auto=format&fit=crop"
  }
];

export const HorizontalScrollSheet = forwardRef((props, ref) => {
  const trackRef = useRef(null);
  const wordmarkRef = useRef(null);

  useImperativeHandle(ref, () => ({
    updateProgress: (progress) => {
      const p = Math.max(0, Math.min(1, progress));
      const trackTranslateX = -p * 72;
      const wordmarkTranslateX = p * 25;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${trackTranslateX}%, 0, 0)`;
      }
      if (wordmarkRef.current) {
        wordmarkRef.current.style.transform = `translate3d(${wordmarkTranslateX}%, -50%, 0)`;
      }
    }
  }));

  return (
    <div className="relative h-screen w-full bg-[#F1F7F6] text-[#0B0F0E] overflow-hidden flex items-center select-none">
      {/* Giant Parallax Wordmark */}
      <div
        ref={wordmarkRef}
        style={{ transform: "translate3d(0%, -50%, 0)", willChange: "transform" }}
        className="absolute top-1/2 left-0 whitespace-nowrap text-[26vw] font-black uppercase text-[#0B0F0E]/10 font-heading pointer-events-none select-none z-0"
      >
        THE ARKAF EDGE THE ARKAF EDGE
      </div>

      {/* Carousel Track */}
      <div
        ref={trackRef}
        style={{ transform: "translate3d(0%, 0, 0)", willChange: "transform" }}
        className="flex gap-8 px-10 z-10"
      >
        {/* Lead Card */}
        <div className="flex h-[64vh] w-[85vw] md:w-[520px] shrink-0 flex-col justify-center px-10 sm:px-12 bg-[#0B0F0E] text-[#F1F7F6] border border-[#0B0F0E] rounded-3xl shadow-2xl relative overflow-hidden">
          <h2 className="text-4xl md:text-5xl font-black leading-none text-[#F1F7F6] font-heading uppercase mb-6 tracking-tight">
            Different thinking <br />
            creates <span className="text-[#00DF81]">different outcomes.</span>
          </h2>
          <p className="text-white/80 leading-relaxed text-sm md:text-base font-light font-sans">
            We look beyond conventional approaches to find the opportunities others overlook. By combining strategic insight, creative thinking, and a deep understanding of people and markets, we help brands discover their edge.
          </p>
        </div>

        {/* 4 Showcase Nature Cards with Bottom-Anchored Typography */}
        {horizontalItems.map((item) => (
          <div
            key={item.id}
            className="group relative h-[64vh] w-[85vw] md:w-[460px] shrink-0 overflow-hidden bg-[#0B0F0E] border border-[#E2E8E6] hover:border-[#00DF81] rounded-3xl transition-all duration-500 shadow-xl"
          >
            {/* Nature Photo Background */}
            <ImageWithFallback
              src={item.url}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 will-change-transform"
            />

            {/* Bottom-Anchored Typography & Gradient */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-8 sm:p-10 bg-gradient-to-t from-[#0B0F0E]/95 via-[#0B0F0E]/55 to-transparent flex flex-col justify-end text-left transition-all duration-300">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-[#00DF81] text-[#0B0F0E] font-mono text-[10px] uppercase font-bold tracking-widest mb-1 shadow-[0_0_15px_rgba(0,223,129,0.3)]">
                  {item.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-[#F1F7F6] font-heading leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  {item.title}
                </h3>
                <p className="font-mono text-xs uppercase tracking-widest text-[#00DF81] font-semibold drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                  {item.subtitle}
                </p>
              </div>
            </div>

            {/* Top-Left Step Index */}
            <div className="absolute top-6 left-6 z-20 px-3.5 py-1 rounded-full bg-[#0B0F0E]/90 backdrop-blur-md border border-white/20">
              <span className="font-mono text-xs text-[#00DF81] font-bold">
                0{item.id}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
