import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FlowWaveCanvas } from "@/app/components/FlowWaveCanvas";
import { Compass, Lightbulb, TrendingUp } from "lucide-react";

const steps = [
  {
    id: "01",
    num: "01 — THINK",
    title: "THINK",
    headline: "Understand the business, audience, market, and opportunity.",
    desc: "We analyze the business, audience, and market opportunity to define a strategy that creates lasting differentiation and stakeholder alignment.",
    icon: Compass,
    side: "right",
  },
  {
    id: "02",
    num: "02 — CREATE",
    title: "CREATE",
    headline: "Turn insight into strategies, ideas, identities, and experiences.",
    desc: "We turn strategic insight into compelling visual identities, campaigns, digital experiences, and communications people trust and use.",
    icon: Lightbulb,
    side: "left",
  },
  {
    id: "03",
    num: "03 — TRANSFORM",
    title: "TRANSFORM",
    headline: "Launch, evolve, and create measurable impact.",
    desc: "We launch, evolve, and execute marketing systems for predictable, scalable, long-term business growth.",
    icon: TrendingUp,
    side: "right",
  },
];

const stats = [
  { value: "25+", label: "Projects Delivered", desc: "Across 8 Global Markets" },
  { value: "12+", label: "Brands Transformed", desc: "Category Leaders" },
  { value: "8", label: "Markets Reached", desc: "Global Footprint" },
  { value: "∞", label: "Ideas in Motion", desc: "Continuous Evolution" },
];

export const RevolvingApproach: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="approach" className="relative bg-rich-black text-anti-flash-white border-t border-dark-green/60 select-none">
      {/* 3D 320vh Pinned Stage */}
      <div ref={containerRef} className="relative h-[320vh] w-full">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
          
          {/* Background Flow Wave */}
          <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
            <FlowWaveCanvas />
          </div>

          {/* Header */}
          <div className="relative z-10 pt-28 px-6 md:px-20 max-w-7xl mx-auto w-full">
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-dark-green/90 border border-caribbean-green/40 text-caribbean-green text-xs font-mono uppercase tracking-[0.25em] mb-4 backdrop-blur-md">
              05. 3D REVOLVING APPROACH — THINK. CREATE. TRANSFORM.
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase font-heading text-anti-flash-white tracking-tight">
              Think. Create. <br />
              <span className="text-caribbean-green">Transform.</span>
            </h2>
            <div className="flex items-center gap-2 mt-2 text-pistachio text-sm sm:text-base font-normal">
              <span>Each essential. Each in</span>
              <span className="px-3 py-0.5 rounded-full border border-caribbean-green/70 text-anti-flash-white bg-rich-black/80 font-normal text-xs shadow-[0_0_12px_rgba(0,223,129,0.3)]">
                sync.
              </span>
            </div>
          </div>

          {/* Center Revolving Kinetic Word Transitions */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center pointer-events-none px-4">
            {steps.map((s, idx) => {
              const start = idx * 0.33;
              const end = (idx + 1) * 0.33;

              const opacity = useTransform(
                scrollYProgress,
                [Math.max(0, start - 0.08), start + 0.04, end - 0.04, Math.min(1, end + 0.08)],
                [0.15, 1, 1, 0.15]
              );
              const scale = useTransform(scrollYProgress, [start, (start + end) / 2, end], [0.92, 1.08, 0.92]);

              return (
                <motion.h2
                  key={s.id}
                  style={{ opacity, scale }}
                  className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-none my-1 text-anti-flash-white whitespace-nowrap text-center drop-shadow-[0_4px_40px_rgba(0,0,0,1)]"
                >
                  {s.title}
                </motion.h2>
              );
            })}
          </div>

          {/* Flanking Dynamic Step Overlay Cards */}
          <div className="relative z-10 pb-16 px-6 md:px-20 max-w-7xl mx-auto w-full pointer-events-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {steps.map((step, idx) => {
                const start = idx * 0.33;
                const end = (idx + 1) * 0.33;

                const opacity = useTransform(
                  scrollYProgress,
                  [Math.max(0, start - 0.05), start + 0.05, end - 0.05, Math.min(1, end + 0.05)],
                  [0, 1, 1, 0]
                );
                const y = useTransform(scrollYProgress, [start, end], [30, -30]);

                return (
                  <motion.div
                    key={step.id}
                    style={{ opacity, y }}
                    className={`p-6 sm:p-8 rounded-3xl bg-rich-black/90 border border-caribbean-green/40 backdrop-blur-xl pointer-events-auto shadow-2xl space-y-3 ${
                      step.side === "right" ? "md:col-start-2" : "md:col-start-1"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-caribbean-green tracking-widest font-bold">
                        {step.num}
                      </span>
                      <step.icon size={18} className="text-caribbean-green" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-anti-flash-white leading-snug uppercase">
                      {step.headline}
                    </h3>
                    <p className="text-pistachio text-xs sm:text-sm font-normal leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Impact & Numbers (07) */}
      <div id="impact" className="py-28 px-6 md:px-20 max-w-7xl mx-auto border-t border-dark-green/60">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div>
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-dark-green border border-caribbean-green/40 text-caribbean-green text-xs font-mono uppercase tracking-[0.25em] mb-4">
              07. IMPACT & NUMBERS
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase font-heading text-anti-flash-white tracking-tight">
              Measured by <span className="text-caribbean-green">Results.</span>
            </h2>
          </div>
          <p className="text-pistachio text-base sm:text-lg max-w-md font-normal">
            Every engagement is measured against concrete strategic outcomes and business growth.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-dark-green/40 border border-dark-green hover:border-caribbean-green transition-all duration-300 group shadow-xl text-center"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-caribbean-green mb-3 drop-shadow-[0_0_20px_rgba(0,223,129,0.25)]">
                {stat.value}
              </div>
              <div className="font-mono text-xs uppercase text-pistachio tracking-wider font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
