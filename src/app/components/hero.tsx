import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface HeroProps {
  onExploreWork?: () => void;
  onContact?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onContact }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section id="home" className="relative min-h-[92vh] w-full flex flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden pt-28 pb-16">
      {/* Background Mint Flower Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none"
      >
        <source src="/videos/mint_flower.webm" type="video/webm" />
        <source src="/videos/mint_flower.mp4" type="video/mp4" />
      </video>

      {/* Ambient Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-rich-black/90 via-rich-black/70 to-rich-black z-0 pointer-events-none" />
      
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-caribbean-green/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl">
        {/* 01. Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-caribbean-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-caribbean-green"></span>
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-caribbean-green font-bold">
            01. STRATEGY • CREATIVITY • IMPACT
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight leading-[1.02] uppercase text-anti-flash-white">
            Creating an <span className="text-transparent bg-clip-text bg-gradient-to-r from-caribbean-green via-mountain-meadow to-pistachio">Edge</span> <br />
            for Brands That Matter.
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-pistachio/85 max-w-2xl font-normal leading-relaxed mb-10"
        >
          ARKAF Edge helps businesses build stronger brands through strategic thinking, creative execution, and purposeful marketing.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            onClick={onExploreWork}
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-caribbean-green text-rich-black font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,223,129,0.5)] hover:scale-105 transition-all duration-300 clickable cursor-none"
          >
            <span>Explore Our Work</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onContact}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-caribbean-green/40 hover:border-caribbean-green bg-rich-black/60 backdrop-blur-md text-anti-flash-white font-semibold text-xs uppercase tracking-widest hover:bg-caribbean-green/10 transition-all duration-300 clickable cursor-none"
          >
            <span>Let’s Talk</span>
            <ArrowUpRight className="w-4 h-4 text-caribbean-green" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
