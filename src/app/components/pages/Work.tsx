import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Filter, X, ArrowRight, Check } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

const allWork = [
  {
    id: "01",
    name: "AURA Mobility",
    client: "AURA Technologies",
    year: "2026",
    category: "Strategy",
    type: "Strategy / Branding / Digital",
    headline: "Autonomous Mobility Ecosystem Repositioning",
    description: "Comprehensive global brand repositioning, bespoke design architecture, and unified digital operating system for autonomous transportation.",
    impact: "+140% Brand Equity Growth, $1.2B Enterprise Valuation",
    deliverables: ["Brand Strategy", "Design System", "3D Web Platform", "Investor Narrative"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "02",
    name: "NEXUS Capital",
    client: "Nexus Global Wealth",
    year: "2026",
    category: "Marketing",
    type: "Marketing Strategy / Digital / Growth",
    headline: "Institutional Growth Architecture & Digital Hub",
    description: "Transformative digital experience and brand positioning for tier-one sustainable investments, unlocking record institutional inflow.",
    impact: "$2.4B Pipeline Enabled, 310% Inbound Lead Growth",
    deliverables: ["GTM Roadmap", "Portal Architecture", "Conversion Funnels", "Brand Assets"],
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "03",
    name: "VORTEX Spatial",
    client: "VORTEX Studio",
    year: "2025",
    category: "Creative",
    type: "Creative & Design / Digital / 3D",
    headline: "Spatial Interaction Platform & Visual Identity",
    description: "Immersive architectural digital platform featuring real-time spatial interaction systems and fluid 3D experiences.",
    impact: "4.8x Engagement Lift, Awwwards Site of the Month",
    deliverables: ["Visual Identity", "Interactive 3D", "WebGL Engine", "Spatial UI"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "04",
    name: "LUMEN Living",
    client: "LUMEN Architecture",
    year: "2025",
    category: "Branding",
    type: "Brand Strategy / Content / Design",
    headline: "Sustainable Luxury Brand Identity & Campaign",
    description: "Sustainable luxury identity system, tactile print communications, and multi-channel editorial content engine.",
    impact: "100% Units Sold Pre-Launch, Top Design Award 2026",
    deliverables: ["Brand Identity", "Print Collateral", "Editorial Film", "Campaign Strategy"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "05",
    name: "KINETIX Sports",
    client: "Kinetix Performance",
    year: "2026",
    category: "Digital",
    type: "Digital & Content / Marketing / Web",
    headline: "High-Cadence Athlete Performance Community",
    description: "Direct-to-consumer digital platform combining predictive telemetry, community coaching, and dynamic video content.",
    impact: "+220% Subscription Retention, 1.8M Active Athletes",
    deliverables: ["Mobile Application", "Content Pipeline", "Brand Strategy", "Community Design"],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "06",
    name: "CYPHER Security",
    client: "Cypher Cloud Corp",
    year: "2025",
    category: "Strategy",
    type: "Strategy / Creative / Digital",
    headline: "Post-Quantum Cryptography Enterprise Narrative",
    description: "Simplifying deep technical cryptography into a commanding enterprise brand narrative that captured Fortune 500 accounts.",
    impact: "40+ Enterprise Contracts Secured in Q1",
    deliverables: ["Positioning Framework", "Enterprise Web Platform", "Sales Enablement", "Campaign"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
  }
];

const categories = ["All", "Strategy", "Marketing", "Creative", "Branding", "Digital"];

export const Work: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const filteredWork = activeCategory === "All"
    ? allWork
    : allWork.filter(w => w.category === activeCategory || w.type.includes(activeCategory));

  return (
    <div className="pt-32 pb-28 px-6 md:px-16 lg:px-24 min-h-screen bg-rich-black text-anti-flash-white">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-caribbean-green font-bold tracking-widest">SELECTED WORK</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tighter uppercase leading-[0.95] mb-8">
            Ideas That <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-caribbean-green via-mountain-meadow to-pistachio">
              Make An Impact.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-stone dark:text-pistachio/90 max-w-3xl leading-relaxed">
            A selection of case studies across brand strategy, marketing architecture, creative design, and digital experiences that generated lasting commercial velocity.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-12 border-b border-dark-green/60 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all clickable cursor-none flex-shrink-0 ${
                activeCategory === cat
                  ? "bg-caribbean-green text-rich-black font-bold shadow-[0_0_15px_rgba(0,223,129,0.4)]"
                  : "bg-dark-green/30 text-stone hover:text-anti-flash-white border border-dark-green/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Work */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredWork.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-3xl overflow-hidden bg-dark-green/30 border border-dark-green/80 hover:border-caribbean-green/50 transition-all duration-500 cursor-none clickable flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-rich-black">
                <ImageWithFallback
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-green/90 via-transparent to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="font-mono text-xs font-bold text-rich-black bg-caribbean-green px-3 py-1 rounded-full">
                    {project.id}
                  </span>
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-rich-black/80 border border-caribbean-green/30 backdrop-blur-md flex items-center justify-center text-caribbean-green group-hover:bg-caribbean-green group-hover:text-rich-black transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Content Box */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-caribbean-green font-semibold block mb-2">
                    {project.type}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-anti-flash-white group-hover:text-caribbean-green transition-colors mb-3">
                    {project.name}
                  </h3>

                  <p className="text-stone dark:text-pistachio/80 text-sm leading-relaxed mb-6 font-normal">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-dark-green/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-stone">{project.client}</span>
                  <span className="text-caribbean-green font-bold">{project.impact}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-rich-black/90 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-green/90 border border-caribbean-green/40 rounded-3xl p-8 sm:p-12 text-anti-flash-white shadow-[0_0_50px_rgba(0,223,129,0.2)]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full border border-caribbean-green/40 flex items-center justify-center hover:bg-caribbean-green hover:text-rich-black transition-colors clickable cursor-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-caribbean-green font-bold">{selectedProject.id} /</span>
                <span className="font-mono text-xs uppercase tracking-widest text-pistachio/70">{selectedProject.type}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black font-heading text-anti-flash-white mb-4">
                {selectedProject.name}
              </h2>

              <p className="text-xl text-caribbean-green font-medium mb-8">
                {selectedProject.headline}
              </p>

              <div className="h-64 sm:h-96 rounded-2xl overflow-hidden mb-8 border border-dark-green/80">
                <ImageWithFallback
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-caribbean-green font-bold mb-3">Project Narrative</h4>
                  <p className="text-stone dark:text-pistachio/90 text-sm sm:text-base leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-caribbean-green font-bold mb-3">Key Deliverables</h4>
                  <div className="space-y-2">
                    {selectedProject.deliverables.map((del: string) => (
                      <div key={del} className="flex items-center gap-2 text-sm text-anti-flash-white font-mono">
                        <Check className="w-4 h-4 text-caribbean-green" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-rich-black/70 border border-dark-green/80 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-stone block">Verified Result:</span>
                  <span className="text-xl font-bold text-caribbean-green font-heading">{selectedProject.impact}</span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 rounded-full bg-caribbean-green text-rich-black font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_15px_rgba(0,223,129,0.5)] transition-all clickable cursor-none"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
