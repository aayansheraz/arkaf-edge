import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface FinalCtaProps {
  onStartConversation?: () => void;
  onExploreWork?: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onStartConversation, onExploreWork }) => {
  return (
    <section id="final-cta" className="relative py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-rich-black border-t border-dark-green/60 overflow-hidden text-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-caribbean-green/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-dark-green/60 border border-caribbean-green/30 text-caribbean-green font-mono text-[11px] uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" />
            <span>09 / FINAL CTA</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight text-anti-flash-white uppercase leading-[1.05] mb-6">
            Ready to find <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-caribbean-green via-mountain-meadow to-pistachio">
              your edge?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-pistachio/85 font-normal leading-relaxed max-w-xl mx-auto mb-10">
            Let's explore what's possible when strategy, creativity, and purpose come together.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartConversation}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-caribbean-green text-rich-black font-extrabold text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(0,223,129,0.4)] hover:shadow-[0_0_35px_rgba(0,223,129,0.6)] hover:scale-105 transition-all duration-300 clickable cursor-none font-mono"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onExploreWork}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-caribbean-green/40 hover:border-caribbean-green text-anti-flash-white font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-caribbean-green/10 transition-all duration-300 clickable cursor-none font-mono"
            >
              <span>Explore Our Work</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
