import React from "react";
import { motion } from "framer-motion";

export const Marquee = () => {
  return (
    <div className="relative flex overflow-hidden bg-pine/40 border-y border-basil/40 py-10 transition-colors duration-500">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap select-none pointer-events-none"
      >
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="text-[8.5vw] font-black uppercase text-anti-flash-white mx-8 flex items-center gap-8 font-heading"
          >
            ARKAF EDGE{" "}
            <span className="w-7 h-7 border-2 border-caribbean-green rounded-full bg-caribbean-green/20" />
            STRATEGY WITH PURPOSE{" "}
            <span className="w-7 h-7 border-2 border-mountain-meadow rounded-full bg-mountain-meadow/20" />
            CREATIVITY WITH IMPACT{" "}
            <span className="w-7 h-7 border-2 border-caribbean-green rounded-full bg-caribbean-green/20" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};
