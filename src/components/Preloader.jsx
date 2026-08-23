import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const criticalAssets = [
  // High-res Nature Showcase Cards
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1080&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1080&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1080&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1080&auto=format&fit=crop",
  // Featured Work Projects
  "https://images.unsplash.com/photo-1569259236307-94d33cdaafbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnV0YWxpc3QlMjBhcmNoaXRlY3R1cmUlMjBoaWdoJTIwY29udHJhc3QlMjBtaW5pbWFsfGVufDF8fHx8MTc2OTUzODMwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1657632843433-e6a8b7451ac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMDNkJTIwcmVuZGVyJTIwZnV0dXJpc3RpYyUyMGRhcmt8ZW58MXx8fHwxNzY5NTM4MzA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1761859310138-29797bf92d96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtdXNldW0lMjBpbnRlcmlvciUyMGxpZ2h0JTIwc2hhZG93fGVufDF8fHx8MTc2OTUzODMwOHww&ixlib=rb-4.1.0&q=80&w=1080"
];

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalItems = criticalAssets.length + 3;

    const tick = () => {
      loadedCount++;
      const currentPct = Math.min(95, Math.floor((loadedCount / totalItems) * 95));
      setProgress((prev) => Math.max(prev, currentPct));
    };

    // Preload Fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(tick).catch(tick);
    } else {
      tick();
    }

    // Preload Video
    const video = document.createElement("video");
    video.src = "/videos/mint_flower.mp4";
    video.preload = "auto";
    video.muted = true;
    video.oncanplaythrough = tick;
    video.onerror = tick;
    video.load();

    // Preload High-Res Images into GPU memory
    criticalAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.decode) {
        img.decode().then(tick).catch(tick);
      } else {
        img.onload = tick;
        img.onerror = tick;
      }
    });

    setTimeout(tick, 300);

    // Smooth counter progression 0 -> 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        if (loadedCount >= totalItems) {
          return Math.min(100, prev + 3);
        }
        return Math.min(92, prev + 2);
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setIsDone(true);
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  if (isDone) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[99999] bg-[#080d0b] text-white flex flex-col justify-between items-center py-16 px-6 select-none"
    >
      {/* Top Spacer */}
      <div />

      {/* Center Facebook/Meta-Style Intro Branding & 0-100 Loading */}
      <div className="flex flex-col items-center justify-center space-y-8 max-w-sm w-full">
        {/* Glowing Brand Icon Emblem */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex items-center justify-center"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#0B0F0E] border-2 border-caribbean-green/40 flex items-center justify-center shadow-[0_0_40px_rgba(0,223,129,0.3)]">
            <span className="font-heading font-black text-4xl sm:text-5xl text-caribbean-green drop-shadow-[0_0_15px_#00DF81]">
              A
            </span>
          </div>
        </motion.div>

        {/* Brand Name */}
        <div className="text-center space-y-1.5">
          <h1 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
            ARKAF <span className="text-caribbean-green">EDGE.</span>
          </h1>
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-pistachio/70 font-semibold">
            Strategy • Creativity • Impact
          </p>
        </div>

        {/* Minimalist 0 to 100 Counter & Progress Bar */}
        <div className="w-full max-w-[240px] space-y-2 pt-4">
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="text-pistachio/60 tracking-wider uppercase text-[10px]">Loading Experience</span>
            <span className="text-caribbean-green font-bold text-sm tracking-wider">{progress}%</span>
          </div>

          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-caribbean-green rounded-full shadow-[0_0_10px_#00DF81]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Classic Facebook/Meta-Style 'from ARKAF' Tag */}
      <div className="flex flex-col items-center justify-center space-y-1">
        <span className="font-mono text-[11px] uppercase tracking-widest text-pistachio/50">
          from
        </span>
        <span className="font-heading font-black text-sm tracking-[0.35em] text-white/90 uppercase drop-shadow-[0_0_10px_rgba(0,223,129,0.3)]">
          ARKAF
        </span>
      </div>
    </motion.div>
  );
};
