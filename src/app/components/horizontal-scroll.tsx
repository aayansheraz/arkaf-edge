import React, { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface HorizontalScrollProps {
  onViewAllWork?: () => void;
  onSelectProject?: (project: any) => void;
}

export const selectedWorkItems = [
  {
    id: "01",
    name: "AURA Mobility",
    title: "AURA Autonomous Systems",
    description: "Global brand repositioning and unified digital operating system for next-gen mobility.",
    tags: "Strategy • Branding • Digital",
    category: "Strategy / Branding / Digital",
    metrics: "+140% Brand Equity",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "02",
    name: "NEXUS Capital",
    title: "NEXUS Global Wealth",
    description: "Transformative digital experience and brand positioning for tier-one sustainable investments.",
    tags: "Marketing Strategy • Digital • Identity",
    category: "Marketing Strategy / Digital / Growth",
    metrics: "$2.4B Pipeline Enabled",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "03",
    name: "VORTEX Spatial",
    title: "VORTEX 3D Studio",
    description: "Immersive architectural digital platform featuring real-time spatial interaction systems.",
    tags: "Creative & Design • 3D • Web",
    category: "Creative & Design / Digital / 3D",
    metrics: "4.8x Engagement Lift",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "04",
    name: "LUMEN Living",
    title: "LUMEN Architecture",
    description: "Sustainable luxury identity system, tactile campaigns, and multi-channel content engine.",
    tags: "Brand Strategy • Content • Design",
    category: "Brand Strategy / Content / Design",
    metrics: "Top Design Award 2026",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
  },
];

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ onViewAllWork, onSelectProject }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section
      id="work"
      ref={targetRef}
      className="relative h-[220vh] bg-rich-black transition-colors duration-500 overflow-visible border-t border-dark-green/60"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-6 md:px-16 items-center">
          {/* Intro Box */}
          <div className="flex h-[56vh] w-[85vw] sm:w-[420px] md:w-[460px] flex-shrink-0 flex-col justify-center px-8 md:px-10 bg-dark-green/40 border border-dark-green rounded-3xl backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-caribbean-green font-bold tracking-widest">06 /</span>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-pistachio/70 font-semibold">SELECTED WORK</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading leading-[1.05] text-anti-flash-white uppercase tracking-tight">
              Ideas that <br />
              <span className="text-caribbean-green">make an impact.</span>
            </h2>

            <p className="mt-4 text-pistachio/80 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              Explore our curated portfolio of strategic identities, transformative campaigns, and digital experiences.
            </p>

            <div className="mt-6">
              <button
                onClick={onViewAllWork}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-caribbean-green text-rich-black font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_15px_rgba(0,223,129,0.4)] transition-all clickable cursor-none font-mono"
              >
                <span>View All Work</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Project Showcase Cards */}
          {selectedWorkItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProject ? onSelectProject(item) : (onViewAllWork ? onViewAllWork() : null)}
              className="group relative h-[56vh] w-[85vw] sm:w-[420px] md:w-[460px] flex-shrink-0 overflow-hidden bg-dark-green/40 border border-dark-green rounded-3xl cursor-none clickable hover:border-caribbean-green/50 transition-all duration-500 shadow-xl"
            >
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-65 group-hover:opacity-80"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-rich-black/50 to-transparent z-10" />

              <div className="absolute top-5 left-5 right-5 z-20 flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-rich-black bg-caribbean-green px-2.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(0,223,129,0.4)]">
                  {item.id}
                </span>
                <div className="w-8 h-8 rounded-full bg-rich-black/70 border border-caribbean-green/30 backdrop-blur-md flex items-center justify-center group-hover:bg-caribbean-green group-hover:text-rich-black text-caribbean-green transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-20 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-caribbean-green font-semibold block">
                  {item.category}
                </span>

                <h3 className="text-xl sm:text-2xl font-black font-heading text-anti-flash-white group-hover:text-caribbean-green transition-colors">
                  {item.name}
                </h3>

                <p className="text-xs text-pistachio/80 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-dark-green/60 text-[11px] font-mono text-stone">
                  <span>{item.tags}</span>
                  <span className="text-caribbean-green font-bold">{item.metrics}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
