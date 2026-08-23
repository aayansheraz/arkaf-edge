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
  const [statusText, setStatusText] = useState("INITIALIZING 3D ENGINE...");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalItems = criticalAssets.length + 3; // Images + Video + Fonts + Shaders

    const updateItemLoaded = () => {
      loadedCount++;
      const currentPct = Math.min(95, Math.floor((loadedCount / totalItems) * 95));
      setProgress((prev) => Math.max(prev, currentPct));
    };

    // 1. Preload Fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateItemLoaded).catch(updateItemLoaded);
    } else {
      updateItemLoaded();
    }

    // 2. Preload Video
    const video = document.createElement("video");
    video.src = "/videos/mint_flower.mp4";
    video.preload = "auto";
    video.muted = true;
    video.oncanplaythrough = updateItemLoaded;
    video.onerror = updateItemLoaded;
    video.load();

    // 3. Preload High-Res Images into GPU memory
    criticalAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
      if (img.decode) {
        img.decode().then(updateItemLoaded).catch(updateItemLoaded);
      } else {
        img.onload = updateItemLoaded;
        img.onerror = updateItemLoaded;
      }
    });

    // 4. Three.js Engine warm up step
    setTimeout(updateItemLoaded, 400);

    // Smooth timer fallback to ensure progress reaches 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        if (loadedCount >= totalItems) {
          return Math.min(100, prev + 4);
        }
        return Math.min(95, prev + 2);
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 25) {
      setStatusText("INITIALIZING 3D SHADER ENGINE...");
    } else if (progress < 50) {
      setStatusText("PRELOADING CINEMATIC ASSETS...");
    } else if (progress < 75) {
      setStatusText("COMPILING HARDWARE COMPOSITOR...");
    } else if (progress < 99) {
      setStatusText("PRE-CACHING 4K MEDIA & FONTS...");
    } else {
      setStatusText("ARKAF EDGE EXPERIENCE READY");
      const timer = setTimeout(() => {
        setIsLoaded(true);
        if (onComplete) onComplete();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[99999] bg-[#080d0b] text-[#F1F7F6] flex flex-col justify-between p-8 sm:p-14 select-none overflow-hidden"
        >
          {/* Top Brand Tag */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-caribbean-green flex items-center justify-center text-rich-black font-black text-sm shadow-[0_0_15px_rgba(0,223,129,0.5)] font-heading">
                A
              </div>
              <span className="font-heading font-black text-lg tracking-tight uppercase">
                ARKAF <span className="text-caribbean-green">EDGE.</span>
              </span>
            </div>

            <div className="font-mono text-xs text-caribbean-green uppercase tracking-[0.25em] font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-caribbean-green shadow-[0_0_8px_#00DF81] animate-ping" />
              <span>DIGITAL AGENCY</span>
            </div>
          </div>

          {/* Center Glowing Kinetic Emblem */}
          <div className="flex flex-col items-center justify-center my-auto space-y-8">
            <div className="relative flex items-center justify-center">
              {/* Outer Pulsing Glow Ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-36 h-36 rounded-full border border-caribbean-green/30 shadow-[0_0_40px_rgba(0,223,129,0.3)]"
              />

              {/* Middle Rotating Dash Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-28 h-28 rounded-full border border-dashed border-caribbean-green/50"
              />

              {/* Center Monogram */}
              <div className="absolute font-heading font-black text-4xl text-white tracking-tighter drop-shadow-[0_0_20px_rgba(0,223,129,0.6)]">
                A
              </div>
            </div>

            {/* Micro Tagline */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black uppercase font-heading tracking-tight text-white">
                Strategy • <span className="text-caribbean-green">Creativity</span> • Impact
              </h2>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-pistachio/70">
                {statusText}
              </p>
            </div>
          </div>

          {/* Bottom Progress Bar & Percentage Counter */}
          <div className="w-full max-w-xl mx-auto space-y-3">
            <div className="flex justify-between items-baseline font-mono text-xs">
              <span className="text-pistachio/80 tracking-widest uppercase">System Loading</span>
              <span className="text-caribbean-green font-bold text-lg">{progress}%</span>
            </div>

            {/* Glowing Emerald Progress Track */}
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative shadow-inner">
              <motion.div
                className="h-full bg-caribbean-green rounded-full shadow-[0_0_15px_#00DF81]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-white/40 tracking-wider">
              <span>WARP ENGINE V2.4</span>
              <span>100% HARDWARE ACCELERATED</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
