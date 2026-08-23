import React from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    phase: "Think",
    subtitle: "Understand & Strategize",
    description: "Understand the business, audience, market, and opportunity.",
    icon: Search,
    color: "from-caribbean-green/20 to-bangladesh-green/20",
    border: "border-caribbean-green/40",
  },
  {
    number: "02",
    phase: "Create",
    subtitle: "Design & Ideate",
    description: "Turn insight into strategies, ideas, identities, and experiences.",
    icon: PenTool,
    color: "from-mountain-meadow/20 to-dark-green/30",
    border: "border-mountain-meadow/40",
  },
  {
    number: "03",
    phase: "Transform",
    subtitle: "Launch & Accelerate",
    description: "Launch, evolve, and create measurable impact.",
    icon: Rocket,
    color: "from-caribbean-green/20 to-dark-green/40",
    border: "border-caribbean-green/50",
  }
];

export const Approach: React.FC = () => {
  return (
    <section id="approach" className="relative py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-rich-black border-t border-dark-green/60">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-caribbean-green font-bold tracking-widest">05 /</span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-pistachio/70 font-semibold">OUR APPROACH</span>
        </div>

        {/* Headline */}
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-anti-flash-white uppercase"
          >
            Think. Create. <span className="text-caribbean-green">Transform.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-pistachio/80 text-sm sm:text-base max-w-2xl font-normal"
          >
            A disciplined, three-stage methodology engineered to turn strategic clarity into unmatched creative impact.
          </motion.p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 sm:p-7 rounded-2xl bg-gradient-to-b ${step.color} border ${step.border} backdrop-blur-sm flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xl font-black text-caribbean-green">
                      {step.number}
                    </span>
                    <div className="p-2.5 rounded-lg bg-dark-green/60 border border-caribbean-green/20 text-caribbean-green group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-widest text-pistachio/70 block mb-1">
                    {step.subtitle}
                  </span>

                  <h3 className="text-2xl font-bold font-heading text-anti-flash-white mb-3">
                    {step.phase}
                  </h3>

                  <p className="text-pistachio/85 text-xs sm:text-sm leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
