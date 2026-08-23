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
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  if (isDone) return null;

  // Format 2 or 3 digit count (e.g. 00 -> 100)
  const formattedCount = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{
          y: "-100%",
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }}
        className="fixed inset-0 z-[99999] bg-[#080d0b] text-white flex flex-col justify-between p-8 sm:p-14 lg:p-20 select-none overflow-hidden"
      >
        {/* Subtle Cinematic Background Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-caribbean-green/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Header Row: Counter */}
        <div className="relative z-10 flex justify-between items-baseline w-full">
          <span className="font-mono text-xs text-caribbean-green uppercase tracking-[0.3em] font-bold">
            LOADING
          </span>
          <span className="font-mono text-4xl sm:text-6xl md:text-7xl font-black tabular-nums text-caribbean-green drop-shadow-[0_0_25px_rgba(0,223,129,0.5)]">
            {formattedCount}%
          </span>
        </div>

        {/* Center: Giant Cinematic Typography */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center my-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[13vw] font-black uppercase font-heading tracking-tighter leading-[0.88] text-white select-none"
          >
            ARKAF <span className="text-caribbean-green drop-shadow-[0_0_35px_rgba(0,223,129,0.45)]">EDGE.</span>
          </motion.h1>
        </div>

        {/* Bottom Minimalist Progress Bar */}
        <div className="relative z-10 w-full">
          <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-caribbean-green rounded-full shadow-[0_0_15px_#00DF81]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
