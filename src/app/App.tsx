import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";
import { CustomCursor } from "@/app/components/custom-cursor";
import { Loader } from "@/app/components/loader";

// 10 Section Components (Exact PDF Page Flow)
import { Hero } from "@/app/components/hero";
import { Introduction } from "@/app/components/introduction";
import { Expertise } from "@/app/components/expertise";
import { ArkafEdgeFeature } from "@/app/components/arkaf-edge-feature";
import { Approach } from "@/app/components/approach";
import { HorizontalScroll } from "@/app/components/horizontal-scroll";
import { ImpactNumbers } from "@/app/components/impact-numbers";
import { InsightsSection } from "@/app/components/insights-section";
import { FinalCta } from "@/app/components/final-cta";
import { Marquee, Footer } from "@/app/components/footer-elements";

// Sub-Pages
import { Services } from "@/app/components/pages/Services";
import { Work } from "@/app/components/pages/Work";
import { InsightsPage } from "@/app/components/pages/Insights";
import { Contact } from "@/app/components/pages/Contact";
import { Terms } from "@/app/components/pages/Terms";

export type View = "home" | "services" | "work" | "insights" | "contact" | "terms";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [currentView, setCurrentView] = useState<View>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    if (currentView !== "home") {
      setCurrentView("home");
      setIsMenuOpen(false);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 100);
    } else {
      setIsMenuOpen(false);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  // Only exact navigation items from the PDF
  const navLinks = [
    { label: "Home", action: () => scrollToSection("home") },
    { label: "About", action: () => scrollToSection("about") },
    { label: "Services", action: () => scrollToSection("services") },
    { label: "The Edge", action: () => scrollToSection("arkaf-edge") },
    { label: "Work", action: () => scrollToSection("work") },
    { label: "Insights", action: () => scrollToSection("insights") },
  ];

  return (
    <div className={`relative min-h-screen transition-colors duration-500 font-sans ${
      theme === "dark" ? "bg-rich-black text-anti-flash-white" : "bg-anti-flash-white text-rich-black"
    }`}>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Top Fixed Clean Navigation Bar */}
          <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-5 pointer-events-none backdrop-blur-md bg-rich-black/50 border-b border-dark-green/40">
            {/* Brand Logo */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2.5 pointer-events-auto cursor-none clickable group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-caribbean-green to-mountain-meadow flex items-center justify-center text-rich-black font-black text-base shadow-[0_0_15px_rgba(0,223,129,0.5)] group-hover:scale-105 transition-transform font-heading">
                A
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter uppercase font-heading text-anti-flash-white">
                ARKAF <span className="text-caribbean-green">EDGE</span>
              </span>
            </motion.div>

            {/* Desktop Center Links (Exact PDF Items) */}
            <div className="hidden lg:flex items-center gap-7 pointer-events-auto font-mono text-xs uppercase tracking-widest text-pistachio/80 font-medium">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="hover:text-caribbean-green transition-colors clickable cursor-none"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Utilities */}
            <div className="flex gap-3 items-center pointer-events-auto">
              <button
                onClick={() => navigateTo("contact")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-caribbean-green text-rich-black font-bold font-mono text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,223,129,0.5)] hover:scale-105 transition-all clickable cursor-none"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="w-9 h-9 rounded-full border border-caribbean-green/30 hover:border-caribbean-green flex items-center justify-center text-anti-flash-white hover:text-caribbean-green transition-all cursor-none clickable backdrop-blur-md bg-dark-green/40"
                title="Toggle Theme"
              >
                {theme === "light" ? <Moon size={15} /> : <Sun size={15} className="text-caribbean-green" />}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden w-9 h-9 rounded-full border border-caribbean-green/30 hover:border-caribbean-green flex items-center justify-center text-anti-flash-white hover:text-caribbean-green transition-all cursor-none clickable backdrop-blur-md bg-dark-green/40"
                title="Toggle Navigation Menu"
              >
                {isMenuOpen ? <X size={15} /> : <Menu size={15} />}
              </button>
            </div>
          </nav>

          {/* Full-Screen Mobile Drawer */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-100%" }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="fixed inset-0 z-[45] bg-rich-black text-anti-flash-white flex flex-col justify-center items-center px-6"
              >
                <div className="space-y-4 text-center relative z-10">
                  {navLinks.map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + idx * 0.04 }}
                    >
                      <button
                        onClick={item.action}
                        className="text-3xl sm:text-4xl font-black uppercase tracking-tighter hover:text-caribbean-green transition-all cursor-none clickable font-heading text-stone hover:italic"
                      >
                        {item.label}
                      </button>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4"
                  >
                    <button
                      onClick={() => navigateTo("contact")}
                      className="text-2xl font-bold font-mono text-caribbean-green uppercase tracking-widest cursor-none clickable"
                    >
                      Let’s Talk ↗
                    </button>
                  </motion.div>
                </div>

                <div className="absolute bottom-8 font-mono text-[11px] text-pistachio/60 tracking-widest uppercase">
                  ARKAF EDGE — STRATEGY • CREATIVITY • IMPACT
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <AnimatePresence mode="wait">
            <motion.main
              key={currentView}
              className="relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {currentView === "home" && (
                <>
                  {/* 01. HERO */}
                  <Hero
                    onExploreWork={() => scrollToSection("work")}
                    onContact={() => navigateTo("contact")}
                  />

                  {/* 02. INTRODUCTION (WHO WE ARE) */}
                  <Introduction onMoreAbout={() => navigateTo("services")} />

                  {/* 03. WHAT WE DO (OUR EXPERTISE) */}
                  <Expertise
                    onExploreServices={() => navigateTo("services")}
                    onSelectService={() => navigateTo("services")}
                  />

                  {/* 04. THE ARKAF EDGE */}
                  <ArkafEdgeFeature />

                  {/* 05. OUR APPROACH (HOW WE WORK) */}
                  <Approach />

                  {/* 06. SELECTED WORK (FEATURED WORK) */}
                  <HorizontalScroll onViewAllWork={() => navigateTo("work")} />

                  {/* 07. IMPACT / NUMBERS */}
                  <ImpactNumbers />

                  {/* 08. INSIGHTS */}
                  <InsightsSection
                    onExploreInsights={() => navigateTo("insights")}
                    onReadArticle={() => navigateTo("insights")}
                  />

                  {/* 09. FINAL CTA */}
                  <FinalCta
                    onStartConversation={() => navigateTo("contact")}
                    onExploreWork={() => navigateTo("work")}
                  />

                  {/* 10. FOOTER & MARQUEE */}
                  <Marquee />
                </>
              )}

              {currentView === "services" && <Services onStartProject={() => navigateTo("contact")} />}
              {currentView === "work" && <Work />}
              {currentView === "insights" && <InsightsPage />}
              {currentView === "contact" && <Contact />}
              {currentView === "terms" && <Terms />}

              {/* Footer displayed on all pages */}
              <Footer onNavigate={(v) => navigateTo(v as View)} />
            </motion.main>
          </AnimatePresence>
        </>
      )}

      {/* Subtle Noise Texture */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
}
