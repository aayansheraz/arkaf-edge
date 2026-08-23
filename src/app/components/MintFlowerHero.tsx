import React, { useRef, useEffect } from "react";
import { ArrowLeft, Sparkles, ArrowRight, ArrowUpRight } from "lucide-react";

export const MintFlowerHero: React.FC<{ onBack?: () => void; isStandalone?: boolean }> = ({ onBack, isStandalone = false }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#021B1A] overflow-hidden select-none">
      {/* 3D Glass Mint Flower Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-90 will-change-transform"
      >
        <source src="/videos/mint_flower.webm" type="video/webm" />
        <source src="/videos/mint_flower.mp4" type="video/mp4" />
      </video>

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#021B1A]/80 via-transparent to-[#021B1A]/90 z-10 pointer-events-none" />

      {isStandalone && (
        <div className="absolute top-8 left-8 z-30 flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-full bg-rich-black/80 border border-caribbean-green/50 text-caribbean-green font-mono text-xs uppercase tracking-widest hover:bg-caribbean-green hover:text-rich-black transition-all flex items-center gap-2 backdrop-blur-md cursor-none clickable shadow-lg"
            >
              <ArrowLeft size={14} />
              <span>Back to Full Site</span>
            </button>
          )}

          <div className="px-4 py-2 rounded-full bg-pine/80 border border-basil text-xs font-mono text-anti-flash-white flex items-center gap-2 backdrop-blur-md">
            <Sparkles size={14} className="text-caribbean-green animate-pulse" />
            <span>3D Glass Mint Flower Hero Experience</span>
          </div>
        </div>
      )}

      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-20 flex flex-col justify-between pt-32 pb-16 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="px-4 py-1.5 rounded-full bg-rich-black/90 border border-caribbean-green/40 text-caribbean-green text-xs font-mono uppercase tracking-[0.25em] font-bold shadow-[0_0_20px_rgba(0,223,129,0.2)] flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-caribbean-green animate-pulse" />
            <span>01. THE ARKAF EDGE — STRATEGY • CREATIVITY • IMPACT</span>
          </div>
        </div>

        <div className="space-y-6 max-w-4xl">
          <h1 className="text-[12vw] sm:text-[9vw] md:text-[7.5vw] font-black uppercase font-heading tracking-tight leading-[0.88] text-anti-flash-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            STRATEGY<br />
            <span className="text-caribbean-green drop-shadow-[0_0_35px_rgba(0,223,129,0.6)]">CREATIVITY</span><br />
            IMPACT.
          </h1>

          <p className="text-pistachio max-w-xl text-base sm:text-lg md:text-xl font-light font-sans leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            We partner with visionary brands to design high-impact digital experiences, strategic identities, and scalable growth engines.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 pointer-events-auto">
            <button className="px-8 py-4 rounded-full bg-caribbean-green text-rich-black font-bold font-mono text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,223,129,0.5)] flex items-center gap-2 cursor-none clickable">
              <span>Explore Services</span>
              <ArrowRight size={14} />
            </button>
            <button className="px-8 py-4 rounded-full bg-rich-black/80 border border-caribbean-green/40 hover:border-caribbean-green text-anti-flash-white font-mono text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-none clickable backdrop-blur-md">
              <span>View Case Studies</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-mountain-meadow uppercase font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-caribbean-green animate-ping" />
          <span>SCROLL DOWN TO REVEAL WHO WE ARE</span>
        </div>
      </div>
    </div>
  );
};
