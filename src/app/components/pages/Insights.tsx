import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, X, Bookmark, Share2 } from "lucide-react";
import { insightsArticles } from "@/app/components/insights-section";

const fullArticles = [
  {
    ...insightsArticles[0],
    author: "ARKAF Edge Strategy Team",
    content: `
In an increasingly crowded and transparent market, consumers and enterprise buyers alike see through superficial brand promises. The brands that win today are those built on authentic foundations where strategy, internal culture, and external communication operate as one synchronized engine.

### The Problem With Superficial Brand Positioning
Many legacy organizations attempt to retrofit 'purpose' onto an unchanged business model. This generates brand cynicism. Purpose is not a tagline; it is a filter for every business decision, product release, and capital allocation.

### The 3 Laws of Modern Purpose
1. **Verifiable Alignment:** What you build and sell must directly reflect the values you communicate.
2. **Cultural Resonance:** Brands must participate meaningfully in conversations that matter to their community.
3. **Execution Velocity:** Strategy without rapid, high-craft creative execution is merely abstract theory.

When brands align these elements, they unlock unprecedented pricing power and durable customer loyalty.
    `
  },
  {
    ...insightsArticles[1],
    author: "ARKAF Edge Advisory",
    content: `
Market saturation is at an all-time high. Digital barriers to entry have fallen, resulting in an explosion of look-alike brands competing for the same finite attention.

### Why Incrementalism Fails
Doing what your competitors do—only slightly better or cheaper—is a race to the bottom. True strategy is not about beating rivals at their game; it is about choosing to play a completely different game.

### Finding Your Core Differentiation
- **Identify Market White-Space:** Uncover what the incumbents ignore or consider unimportant.
- **Relentless Focus:** Direct 80% of your resources toward your single most potent advantage.
- **Uncompromised Design:** Use aesthetic precision to signal authority and market leadership instantly.
    `
  },
  {
    ...insightsArticles[2],
    author: "ARKAF Edge Digital & Creative",
    content: `
Static brand guidelines and rigid templates belong to the past. Today's most influential brands exist as fluid, responsive systems that adapt across physical spaces, interactive 3D web environments, and spatial computing interfaces.

### The Fluid Identity Paradigm
A modern brand identity is alive. It responds to interaction, shifts with user context, and maintains coherence not through rigidity, but through clear conceptual rules and visual craft.

### The Digital Imperative
Every digital touchpoint is an opportunity to prove your brand's ethos. When performance, aesthetics, and interaction mechanics align, the digital platform becomes the brand itself.
    `
  }
];

export const InsightsPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

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
            <span className="font-mono text-xs text-caribbean-green font-bold tracking-widest">INSIGHTS & PERSPECTIVES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tighter uppercase leading-[0.95] mb-8">
            Ideas Worth <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-caribbean-green via-mountain-meadow to-pistachio">
              Thinking About.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-stone dark:text-pistachio/90 max-w-3xl leading-relaxed">
            Strategic commentary, market analysis, and creative perspectives from the ARKAF Edge advisory team.
          </p>
        </motion.div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fullArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedArticle(article)}
              className="group p-8 rounded-3xl bg-dark-green/30 border border-dark-green/80 hover:border-caribbean-green/50 transition-all duration-300 flex flex-col justify-between cursor-none clickable hover:-translate-y-1.5 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-pistachio/70 mb-6">
                  <span className="px-3 py-1 rounded-full bg-dark-green/60 text-caribbean-green border border-caribbean-green/20">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-stone">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-heading text-anti-flash-white group-hover:text-caribbean-green transition-colors leading-snug mb-4">
                  {article.title}
                </h3>

                <p className="text-stone dark:text-pistachio/80 text-sm leading-relaxed mb-6 font-normal">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-dark-green/60 flex items-center justify-between">
                <span className="text-xs font-mono text-stone">{article.date}</span>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-caribbean-green font-bold group-hover:translate-x-1 transition-transform">
                  Read Essay <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-rich-black/90 backdrop-blur-xl"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-dark-green/95 border border-caribbean-green/40 rounded-3xl p-8 sm:p-12 text-anti-flash-white shadow-[0_0_50px_rgba(0,223,129,0.25)]"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full border border-caribbean-green/40 flex items-center justify-center hover:bg-caribbean-green hover:text-rich-black transition-colors clickable cursor-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4 font-mono text-xs text-caribbean-green">
                <span className="px-3 py-1 rounded-full bg-caribbean-green/10 border border-caribbean-green/30">
                  {selectedArticle.category}
                </span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black font-heading text-anti-flash-white mb-4 leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center justify-between text-xs font-mono text-stone pb-6 border-b border-dark-green/60 mb-8">
                <span>By {selectedArticle.author}</span>
                <span>Published {selectedArticle.date}</span>
              </div>

              <div className="prose prose-invert max-w-none text-pistachio/90 space-y-4 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                {selectedArticle.content}
              </div>

              <div className="mt-10 pt-6 border-t border-dark-green/60 flex justify-between items-center">
                <div className="flex gap-2">
                  {selectedArticle.tags.map((t: string) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-rich-black/50 text-[10px] font-mono text-pistachio">
                      #{t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 rounded-full bg-caribbean-green text-rich-black font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_15px_rgba(0,223,129,0.5)] transition-all clickable cursor-none"
                >
                  Close Essay
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
