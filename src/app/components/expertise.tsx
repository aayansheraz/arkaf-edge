import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Layers, TrendingUp, Sparkles, Globe } from "lucide-react";

interface ExpertiseProps {
  onExploreServices?: () => void;
  onSelectService?: (id: string) => void;
}

const services = [
  {
    id: "01",
    code: "brand-strategy",
    title: "Brand Strategy",
    description: "Building clear brand positioning, identities, and strategies that create lasting differentiation.",
    icon: Layers,
    tags: ["Positioning", "Brand Architecture", "Identity System"]
  },
  {
    id: "02",
    code: "marketing-strategy",
    title: "Marketing Strategy",
    description: "Turning business objectives into focused marketing strategies designed to create measurable impact.",
    icon: TrendingUp,
    tags: ["Go-To-Market", "Performance Growth", "Attribution"]
  },
  {
    id: "03",
    code: "creative-design",
    title: "Creative & Design",
    description: "Creating compelling visual identities, campaigns, digital experiences, and communications.",
    icon: Sparkles,
    tags: ["Visual Identity", "Campaigns", "Spatial & 3D"]
  },
  {
    id: "04",
    code: "digital-content",
    title: "Digital & Content",
    description: "Connecting brands with audiences through digital platforms, content, and meaningful experiences.",
    icon: Globe,
    tags: ["Digital Platforms", "Interactive Web", "Content Engines"]
  }
];

export const Expertise: React.FC<ExpertiseProps> = ({ onExploreServices, onSelectService }) => {
  const [activeHover, setActiveHover] = useState<string | null>(null);

  return (
    <section id="services" className="relative py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-rich-black border-t border-dark-green/60">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-caribbean-green font-bold tracking-widest">03 /</span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-pistachio/70 font-semibold">OUR EXPERTISE</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-heading text-anti-flash-white uppercase">
              From strategic thinking to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-caribbean-green to-mountain-meadow">
                meaningful execution.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={onExploreServices}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-caribbean-green/40 hover:border-caribbean-green bg-dark-green/30 hover:bg-caribbean-green/10 text-anti-flash-white font-bold text-xs uppercase tracking-widest transition-all duration-300 clickable cursor-none font-mono"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-3.5 h-3.5 text-caribbean-green transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = activeHover === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onMouseEnter={() => setActiveHover(service.id)}
                onMouseLeave={() => setActiveHover(null)}
                onClick={() => onSelectService ? onSelectService(service.code) : (onExploreServices ? onExploreServices() : null)}
                className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 cursor-none clickable border ${
                  isHovered
                    ? "bg-dark-green/70 border-caribbean-green/60 shadow-[0_0_25px_rgba(0,223,129,0.12)] -translate-y-1"
                    : "bg-dark-green/20 border-dark-green hover:border-caribbean-green/30"
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs text-caribbean-green font-bold px-2.5 py-1 rounded bg-caribbean-green/10 border border-caribbean-green/20">
                    {service.id}
                  </span>
                  <div className={`p-2.5 rounded-lg transition-all duration-300 ${isHovered ? "bg-caribbean-green text-rich-black" : "bg-dark-green/60 text-caribbean-green"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-heading text-anti-flash-white mb-2">
                  {service.title}
                </h3>
                <p className="text-pistachio/80 text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-dark-green/60">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-pistachio/80 bg-rich-black/50 border border-dark-green/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
