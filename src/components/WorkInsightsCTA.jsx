import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, Send } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

const projects = [
  {
    id: 1,
    name: "Nexus Vantage",
    category: "Strategy • Branding • Digital",
    description: "Repositioning a global technology firm with a purpose-driven brand identity and high-impact digital platform.",
    image: "https://images.unsplash.com/photo-1569259236307-94d33cdaafbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnV0YWxpc3QlMjBhcmNoaXRlY3R1cmUlMjBoaWdoJTIwY29udHJhc3QlMjBtaW5pbWFsfGVufDF8fHx8MTc2OTUzODMwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2026"
  },
  {
    id: 2,
    name: "Aura Lumina",
    category: "Marketing Strategy • Creative",
    description: "Designing a comprehensive go-to-market campaign that expanded reach across 8 international markets.",
    image: "https://images.unsplash.com/photo-1657632843433-e6a8b7451ac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMDNkJTIwcmVuZGVyJTIwZnV0dXJpc3RpYyUyMGRhcmt8ZW58MXx8fHwxNzY5NTM4MzA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2025"
  },
  {
    id: 3,
    name: "Vanguard Studio",
    category: "Digital & Content • Brand Strategy",
    description: "Crafting an immersive digital content engine that drove 140% growth in qualified brand engagement.",
    image: "https://images.unsplash.com/photo-1761859310138-29797bf92d96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtdXNldW0lMjBpbnRlcmlvciUyMGxpZ2h0JTIwc2hhZG93fGVufDF8fHx8MTc2OTUzODMwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2025"
  }
];

const insights = [
  {
    id: "01",
    title: "The Future of Purpose-Driven Brands",
    category: "Brand Strategy",
    readTime: "5 min read",
    summary: "How modern consumers evaluate authenticity and why purpose-led messaging drives long-term customer loyalty."
  },
  {
    id: "02",
    title: "Why Strategy Matters More Than Ever",
    category: "Market Insights",
    readTime: "4 min read",
    summary: "Navigating competitive disruption with clear positioning and agile strategic execution."
  },
  {
    id: "03",
    title: "Building Brands for a Changing World",
    category: "Creative Execution",
    readTime: "6 min read",
    summary: "Blending human-centered design with modern digital platforms to create lasting audience connections."
  }
];

export const WorkInsightsCTA = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-36 pb-32 px-6 md:px-20 min-h-screen max-w-7xl mx-auto bg-rich-black text-anti-flash-white">
      {/* 06. FEATURED WORK */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-32"
      >
        <div className="inline-block px-4 py-1.5 rounded-full bg-rich-black border border-caribbean-green/40 text-caribbean-green text-xs font-mono uppercase tracking-[0.25em] font-bold mb-8 shadow-[0_0_20px_rgba(0,223,129,0.2)]">
          06. FEATURED WORK — SELECTED WORK
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <h1 className="text-[11vw] md:text-[6vw] font-black tracking-tight leading-none uppercase font-heading text-white">
            Ideas That Make <br />
            <span className="text-caribbean-green drop-shadow-[0_0_30px_rgba(0,223,129,0.3)]">
              An Impact.
            </span>
          </h1>
          <p className="text-pistachio max-w-md text-base md:text-lg font-light">
            A selection of projects where strategic insight and creative execution combined to build competitive edge.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[#032221] border border-caribbean-green/20 hover:border-caribbean-green/60 rounded-3xl overflow-hidden transition-all duration-500 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 h-[400px] lg:h-[500px] relative overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-6 left-6 px-3.5 py-1 rounded-full bg-rich-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-caribbean-green font-bold">
                    {project.year}
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-[#032221]">
                  <div>
                    <div className="font-mono text-xs text-caribbean-green uppercase tracking-widest font-semibold mb-3">
                      {project.category}
                    </div>
                    <h3 className="text-3xl sm:text-5xl font-black uppercase font-heading text-white group-hover:text-caribbean-green transition-colors mb-4 flex items-center justify-between">
                      <span>{project.name}</span>
                      <ArrowUpRight className="w-6 h-6 text-caribbean-green opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-pistachio/80 text-sm sm:text-base leading-relaxed font-light mb-8">
                      {project.description}
                    </p>
                  </div>

                  <button className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-white hover:text-caribbean-green transition-colors cursor-none clickable self-start">
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 text-caribbean-green" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 08. INSIGHTS */}
      <div className="py-28 border-t border-forest/20 mb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div>
            <div className="inline-block px-3.5 py-1 rounded bg-[#a2e8bc] text-[#080d0b] text-[11px] font-mono font-bold tracking-[0.25em] uppercase mb-4 shadow-[0_0_15px_rgba(162,232,188,0.4)]">
              08. INSIGHTS
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase font-heading text-white">
              Ideas Worth <span className="text-caribbean-green">Thinking About.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-[#032221] border border-caribbean-green/20 hover:border-caribbean-green/50 transition-all duration-300 group cursor-none clickable shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center font-mono text-xs text-caribbean-green mb-6">
                  <span>{insight.category}</span>
                  <span className="text-stone">{insight.readTime}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-caribbean-green transition-colors mb-4 leading-snug">
                  {insight.title}
                </h3>
                <p className="text-pistachio/80 text-sm font-light leading-relaxed mb-6">
                  {insight.summary}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-caribbean-green font-bold">
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 09. FINAL CTA */}
      <div className="p-10 md:p-20 rounded-3xl bg-[#032221] border border-caribbean-green/25 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-caribbean-green/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rich-black border border-caribbean-green/40 text-caribbean-green text-xs font-mono uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>09. FINAL CTA</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black uppercase font-heading text-white leading-tight">
              Ready to find <br />
              <span className="text-caribbean-green drop-shadow-[0_0_20px_rgba(0,223,129,0.3)]">
                your edge?
              </span>
            </h2>

            <p className="text-pistachio text-base md:text-lg font-light leading-relaxed">
              Let's explore what's possible when strategy, creativity, and purpose come together.
            </p>

            <div className="pt-4 border-t border-white/10 space-y-2 font-mono text-xs text-caribbean-green">
              <div>EMAIL: hello@arkafedge.com</div>
              <div>LOCATION: Global Strategy & Design Consultancy</div>
            </div>
          </div>

          <div className="lg:col-span-6">
            {submitted ? (
              <div className="p-8 rounded-2xl bg-forest/20 border border-caribbean-green text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-caribbean-green text-rich-black mx-auto flex items-center justify-center font-bold text-lg">
                  ✓
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Message Received!
                </h3>
                <p className="text-pistachio text-sm font-light">
                  Thank you for reaching out to ARKAF Edge. Our strategy team will be in touch shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="p-8 rounded-2xl bg-rich-black/90 border border-white/10 space-y-4 shadow-2xl"
              >
                <h3 className="text-xl font-bold font-heading text-white">
                  Start a Conversation
                </h3>
                <div>
                  <label className="text-xs font-mono uppercase text-pistachio block mb-2 font-medium">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-[#06302B] border border-caribbean-green/20 p-3.5 rounded-xl text-white focus:outline-none focus:border-caribbean-green text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-pistachio block mb-2 font-medium">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    className="w-full bg-[#06302B] border border-caribbean-green/20 p-3.5 rounded-xl text-white focus:outline-none focus:border-caribbean-green text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-pistachio block mb-2 font-medium">
                    Project Brief
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us about your brand goals..."
                    className="w-full bg-[#06302B] border border-caribbean-green/20 p-3.5 rounded-xl text-white focus:outline-none focus:border-caribbean-green text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-caribbean-green text-rich-black font-bold text-xs uppercase font-mono tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(0,223,129,0.35)] flex items-center justify-center gap-2 cursor-none clickable"
                >
                  <span>Start a Conversation</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
