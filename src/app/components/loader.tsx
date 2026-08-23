import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-rich-black text-anti-flash-white selection:bg-caribbean-green selection:text-rich-black overflow-hidden"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background ambient glow */}
      <div className="absolute w-[600px] h-[600px] bg-caribbean-green/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative overflow-hidden px-6 text-center z-10">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-caribbean-green mb-3"
        >
          Strategy • Creativity • Impact
        </motion.p>

        <motion.h1
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-heading"
        >
          ARKAF <span className="text-caribbean-green">EDGE</span>
        </motion.h1>
      </div>

      <div className="mt-12 w-64 h-[2px] bg-dark-green relative overflow-hidden rounded-full z-10">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-bangladesh-green via-mountain-meadow to-caribbean-green shadow-[0_0_12px_#00DF81]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 tabular-nums text-pistachio font-mono text-sm tracking-widest z-10">
        {Math.min(100, Math.floor(progress)).toString().padStart(3, "0")}%
      </div>

      <motion.div
        className="absolute bottom-10 text-[10px] font-mono uppercase tracking-[0.4em] text-stone z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Creating An Edge For Brands That Matter
      </motion.div>
    </motion.div>
  );
};
