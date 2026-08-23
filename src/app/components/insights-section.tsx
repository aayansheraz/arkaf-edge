import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

interface InsightsProps {
  onExploreInsights?: () => void;
  onReadArticle?: (article: any) => void;
}

export const insightsArticles = [
  {
    id: "01",
    title: "The Future of Purpose-Driven Brands",
    category: "Brand Strategy",
    readTime: "5 min read",
    date: "Aug 2026",
    summary: "Why authentic values and cultural resonance outperform superficial marketing in an era of hyper-critical consumers.",
    tags: ["Purpose", "Culture", "Brand Equity"]
  },
  {
    id: "02",
    title: "Why Strategy Matters More Than Ever",
    category: "Marketing Strategy",
    readTime: "4 min read",
    date: "Jul 2026",
    summary: "Navigating market saturation with disciplined positioning, focused resource allocation, and differentiated value propositions.",
    tags: ["Differentiation", "Economics", "Growth"]
  },
  {
    id: "03",
    title: "Building Brands for a Changing World",
    category: "Digital Innovation",
    readTime: "6 min read",
    date: "Jun 2026",
    summary: "How modern organizations leverage spatial computing, fluid visual systems, and adaptive digital platforms to lead.",
    tags: ["Digital", "Experience", "Systems"]
  },
];

export const InsightsSection: React.FC<InsightsProps> = ({ onExploreInsights, onReadArticle }) => {
  return (
    <section id="insights" className="relative py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-rich-black border-t border-dark-green/60">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-caribbean-green font-bold tracking-widest">08 /</span>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-pistachio/70 font-semibold">INSIGHTS</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-anti-flash-white tracking-tight uppercase">
              Ideas worth <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-caribbean-green to-mountain-meadow">
                thinking about.
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
              onClick={onExploreInsights}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-caribbean-green/40 hover:border-caribbean-green text-anti-flash-white hover:bg-caribbean-green/10 font-bold text-xs uppercase tracking-widest transition-all duration-300 clickable cursor-none font-mono"
            >
              <span>Explore Insights</span>
              <ArrowRight className="w-3.5 h-3.5 text-caribbean-green transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insightsArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => onReadArticle ? onReadArticle(article) : (onExploreInsights ? onExploreInsights() : null)}
              className="group p-6 sm:p-7 rounded-2xl bg-dark-green/25 border border-dark-green hover:border-caribbean-green/50 transition-all duration-300 flex flex-col justify-between cursor-none clickable hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-pistachio/70 mb-5">
                  <span className="px-2.5 py-0.5 rounded-full bg-dark-green/60 text-caribbean-green border border-caribbean-green/20 text-[10px]">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-stone text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-heading text-anti-flash-white group-hover:text-caribbean-green transition-colors leading-snug mb-3">
                  {article.title}
                </h3>

                <p className="text-pistachio/80 text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                  {article.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-dark-green/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-stone">{article.date}</span>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-caribbean-green font-bold group-hover:translate-x-0.5 transition-transform">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
