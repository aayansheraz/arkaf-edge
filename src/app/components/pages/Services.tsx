import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Layers, TrendingUp, Sparkles, Globe, ChevronDown, ChevronUp } from "lucide-react";

interface ServicesPageProps {
  onStartProject?: () => void;
}

const detailedServices = [
  {
    id: "01",
    title: "Brand Strategy",
    headline: "Building clear brand positioning, identities, and strategies that create lasting differentiation.",
    icon: Layers,
    description: "In crowded markets, differentiation is survival. We extract your company's core truth, align it with market white-space, and formulate positioning architectures that command authority.",
    deliverables: [
      "Brand Positioning & Value Proposition Matrix",
      "Comprehensive Competitor & Market Intelligence",
      "Brand Architecture & Portfolio Structuring",
      "Tone of Voice & Narrative Messaging Frameworks",
      "Brand Guidelines & Identity Standards"
    ],
    impact: "Clarity of purpose that accelerates internal alignment and increases brand valuation."
  },
  {
    id: "02",
    title: "Marketing Strategy",
    headline: "Turning business objectives into focused marketing strategies designed to create measurable impact.",
    icon: TrendingUp,
    description: "Marketing without strategic clarity is noise. We map consumer journeys, design high-converting acquisition funnels, and build agile go-to-market roadmaps engineered for commercial acceleration.",
    deliverables: [
      "Omnichannel Go-To-Market (GTM) Strategy",
      "Customer Journey Mapping & Persona Synthesis",
      "Performance Marketing & Campaign Roadmaps",
      "Growth Telemetry & Attribution Modeling",
      "Conversion Rate & Retention Engineering"
    ],
    impact: "Predictable, scalable customer acquisition with maximum return on capital."
  },
  {
    id: "03",
    title: "Creative & Design",
    headline: "Creating compelling visual identities, campaigns, digital experiences, and communications.",
    icon: Sparkles,
    description: "We craft iconic design systems that evoke emotion and command respect. From bespoke typography and spatial 3D to cinematic campaigns, our design is engineered to captivate and endure.",
    deliverables: [
      "Comprehensive Visual Identity & Logo Systems",
      "Design Systems & Component Design Systems",
      "Spatial, 3D & Motion Direction",
      "High-Impact Global Campaign Creative",
      "Editorial, Packaging & Physical Touchpoints"
    ],
    impact: "Unforgettable aesthetic distinction that cements industry leadership."
  },
  {
    id: "04",
    title: "Digital & Content",
    headline: "Connecting brands with audiences through digital platforms, content, and meaningful experiences.",
    icon: Globe,
    description: "Digital presence is where brand meets reality. We architect blazing-fast interactive web platforms, fluid animations, and high-cadence content systems that convert audiences into loyal advocates.",
    deliverables: [
      "Bespoke Interactive Web Platforms & Apps",
      "Headless Architecture & High-Performance Engineering",
      "Content Engines & Editorial Production",
      "Interactive 3D WebGL / Framer Motion Experiences",
      "Continuous Optimization & Digital Evolution"
    ],
    impact: "Seamless digital ecosystems with unmatched speed, interactivity, and engagement."
  }
];

export const Services: React.FC<ServicesPageProps> = ({ onStartProject }) => {
  const [expandedService, setExpandedService] = useState<string | null>("01");

  return (
    <div className="pt-32 pb-28 px-6 md:px-16 lg:px-24 min-h-screen bg-rich-black text-anti-flash-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-caribbean-green font-bold tracking-widest">SERVICES & CAPABILITIES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tighter uppercase leading-[0.95] mb-8">
            From Strategic Thinking <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-caribbean-green via-mountain-meadow to-pistachio">
              to Meaningful Execution.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-stone dark:text-pistachio/90 max-w-3xl leading-relaxed">
            ARKAF Edge delivers integrated brand, marketing, creative, and digital solutions designed to help ambitious companies uncover their edge and scale decisively.
          </p>
        </motion.div>

        {/* Detailed Service Cards */}
        <div className="space-y-6">
          {detailedServices.map((service, idx) => {
            const Icon = service.icon;
            const isExpanded = expandedService === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? "bg-dark-green/40 border-caribbean-green/50 shadow-[0_0_30px_rgba(0,223,129,0.1)]"
                    : "bg-dark-green/20 border-dark-green/70 hover:border-caribbean-green/30"
                }`}
              >
                {/* Accordion Bar Header */}
                <div
                  onClick={() => setExpandedService(isExpanded ? null : service.id)}
                  className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-none clickable select-none"
                >
                  <div className="flex items-start md:items-center gap-6">
                    <span className="font-mono text-xl font-bold text-caribbean-green bg-dark-green/60 border border-caribbean-green/30 px-4 py-2 rounded-xl">
                      {service.id}
                    </span>
                    <div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-anti-flash-white">
                        {service.title}
                      </h2>
                      <p className="text-stone dark:text-pistachio/80 text-sm md:text-base mt-1 max-w-2xl">
                        {service.headline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-center">
                    <div className="w-10 h-10 rounded-full border border-dark-green/80 flex items-center justify-center text-caribbean-green">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Content Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="px-8 md:px-10 pb-10 pt-2 border-t border-dark-green/60"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6">
                        <div className="lg:col-span-6 space-y-6">
                          <h4 className="font-mono text-xs uppercase tracking-widest text-caribbean-green font-bold">
                            Overview & Philosophy
                          </h4>
                          <p className="text-stone dark:text-pistachio/90 leading-relaxed text-base">
                            {service.description}
                          </p>

                          <div className="p-4 rounded-xl bg-rich-black/60 border border-dark-green/80">
                            <span className="font-mono text-xs uppercase tracking-wider text-mountain-meadow font-semibold block mb-1">
                              Strategic Outcome:
                            </span>
                            <p className="text-xs text-stone font-mono">{service.impact}</p>
                          </div>
                        </div>

                        <div className="lg:col-span-6 space-y-4">
                          <h4 className="font-mono text-xs uppercase tracking-widest text-caribbean-green font-bold">
                            Key Deliverables
                          </h4>
                          <ul className="space-y-3">
                            {service.deliverables.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-anti-flash-white">
                                <CheckCircle2 className="w-4 h-4 text-caribbean-green flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Box */}
        <div className="mt-20 p-10 md:p-14 rounded-3xl bg-gradient-to-br from-dark-green/40 to-rich-black border border-caribbean-green/40 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-3xl font-bold font-heading text-anti-flash-white mb-2">
              Need a bespoke engagement?
            </h3>
            <p className="text-stone text-sm md:text-base max-w-lg">
              We tailor multi-disciplinary teams combining strategy, design, and technology to fit your organizational timeline.
            </p>
          </div>

          <button
            onClick={onStartProject}
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-caribbean-green text-rich-black font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(0,223,129,0.5)] transition-all clickable cursor-none"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
