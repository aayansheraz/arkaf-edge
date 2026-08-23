import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Target, Lightbulb } from "lucide-react";

interface IntroductionProps {
  onMoreAbout?: () => void;
}

export const Introduction: React.FC<IntroductionProps> = ({ onMoreAbout }) => {
  return (
    <section id="about" className="relative py-20 md:py-28 px-6 md:px-16 lg:px-24 border-t border-dark-green/60 overflow-hidden bg-rich-black">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-caribbean-green font-bold tracking-widest">02 /</span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-pistachio/70 font-semibold">WHO WE ARE</span>
        </div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] font-heading text-anti-flash-white uppercase">
            Strategy with purpose. <br />
            <span className="text-caribbean-green italic font-normal">Creativity with impact.</span>
          </h2>
        </motion.div>

        {/* Narrative Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8 space-y-6"
          >
            <p className="text-base sm:text-lg text-pistachio/85 leading-relaxed font-normal">
              ARKAF Edge brings together strategy, creativity, and business thinking to help brands navigate an increasingly competitive world. We believe meaningful growth comes from understanding people, identifying opportunities, and creating ideas that move businesses forward.
            </p>

            <div className="pt-2">
              <button
                onClick={onMoreAbout}
                className="group inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider text-caribbean-green hover:text-mountain-meadow transition-all duration-300 clickable cursor-none font-mono"
              >
                <span>More About ARKAF Edge</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Quick Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 grid grid-cols-1 gap-3"
          >
            <div className="p-4 rounded-xl bg-dark-green/40 border border-dark-green hover:border-caribbean-green/30 transition-colors">
              <div className="flex items-center gap-2 text-caribbean-green mb-1">
                <Compass className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">Strategic Clarity</span>
              </div>
              <p className="text-xs text-stone leading-relaxed">Understanding markets to unlock untapped potential.</p>
            </div>

            <div className="p-4 rounded-xl bg-dark-green/40 border border-dark-green hover:border-caribbean-green/30 transition-colors">
              <div className="flex items-center gap-2 text-mountain-meadow mb-1">
                <Lightbulb className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">Creative Impact</span>
              </div>
              <p className="text-xs text-stone leading-relaxed">Crafting distinct visual identities that endure.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
