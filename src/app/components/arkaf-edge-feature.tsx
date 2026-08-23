import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, Compass } from "lucide-react";

export const ArkafEdgeFeature: React.FC = () => {
  return (
    <section
      id="arkaf-edge"
      className="relative py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-rich-black border-t border-dark-green/60 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-caribbean-green/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-caribbean-green font-bold tracking-widest">04 /</span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-pistachio/70 font-semibold">THE ARKAF EDGE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Text Statement */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight leading-[1.08] text-anti-flash-white uppercase">
                Different thinking creates <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-caribbean-green via-mountain-meadow to-pistachio">
                  different outcomes.
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg text-pistachio/85 leading-relaxed font-normal"
            >
              We look beyond conventional approaches to find the opportunities others overlook. By combining strategic insight, creative thinking, and a deep understanding of people and markets, we help brands discover their edge — and turn it into meaningful growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-3 pt-2"
            >
              <div className="p-3.5 rounded-xl bg-dark-green/30 border border-dark-green">
                <div className="font-mono text-caribbean-green text-[10px] uppercase tracking-widest font-bold mb-1">01 / UNCONVENTIONAL</div>
                <div className="text-xs font-semibold text-anti-flash-white">Strategic Opportunity</div>
              </div>
              <div className="p-3.5 rounded-xl bg-dark-green/30 border border-dark-green">
                <div className="font-mono text-mountain-meadow text-[10px] uppercase tracking-widest font-bold mb-1">02 / UNCOMPROMISED</div>
                <div className="text-xs font-semibold text-anti-flash-white">Creative Execution</div>
              </div>
            </motion.div>
          </div>

          {/* Visual Box / Geometric Edge */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl border border-caribbean-green/40 bg-gradient-to-br from-dark-green/50 to-rich-black/90 p-6 flex flex-col justify-center items-center text-center shadow-[0_0_40px_rgba(0,223,129,0.15)]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-caribbean-green mb-2">SIGNATURE</span>
              <span className="text-4xl sm:text-5xl font-black font-heading tracking-tighter text-anti-flash-white">
                EDGE<span className="text-caribbean-green">.</span>
              </span>
              <span className="mt-3 text-[10px] font-mono text-pistachio/70 uppercase tracking-widest">
                Precision in Motion
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
