import React from "react";
import { motion } from "framer-motion";

const stats = [
  {
    value: "25+",
    label: "Projects Delivered",
    description: "Across enterprise tech and commerce.",
    accent: "text-caribbean-green",
  },
  {
    value: "12+",
    label: "Brands Transformed",
    description: "Repositioned for category dominance.",
    accent: "text-mountain-meadow",
  },
  {
    value: "8",
    label: "Markets Reached",
    description: "Global impact across US, EU & APAC.",
    accent: "text-pistachio",
  },
  {
    value: "∞",
    label: "Ideas in Motion",
    description: "Continuous strategic invention.",
    accent: "text-caribbean-green",
  },
];

export const ImpactNumbers: React.FC = () => {
  return (
    <section id="impact" className="relative py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-rich-black border-t border-dark-green/60">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-caribbean-green font-bold tracking-widest">07 /</span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-pistachio/70 font-semibold">IMPACT / NUMBERS</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-anti-flash-white tracking-tight uppercase">
            Measurable results. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-caribbean-green via-mountain-meadow to-pistachio">
              Verified impact.
            </span>
          </h2>
        </motion.div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-6 rounded-2xl bg-dark-green/30 border border-dark-green hover:border-caribbean-green/40 transition-all duration-300 group text-center sm:text-left"
            >
              <div className={`text-4xl sm:text-5xl font-black font-heading ${stat.accent} tracking-tighter mb-2`}>
                {stat.value}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-anti-flash-white mb-1">
                {stat.label}
              </h3>
              <p className="text-[11px] text-stone leading-relaxed font-mono">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
