import React from "react";
import { motion } from "framer-motion";

export const Marquee = () => {
  return (
    <div className="relative flex overflow-hidden bg-rich-black border-y border-forest/20 py-8">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...Array(6)].map((_, index) => (
          <span
            key={index}
            className="text-[7vw] font-black uppercase text-white/10 mx-8 flex items-center gap-8 font-heading select-none"
          >
            ARKAF EDGE{" "}
            <span className="w-5 h-5 border-2 border-caribbean-green rounded-full bg-caribbean-green/20" />
            STRATEGY WITH PURPOSE{" "}
            <span className="w-5 h-5 border-2 border-mountain-meadow rounded-full bg-mountain-meadow/20" />
            CREATIVITY WITH IMPACT{" "}
            <span className="w-5 h-5 border-2 border-caribbean-green rounded-full bg-caribbean-green/20" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};
