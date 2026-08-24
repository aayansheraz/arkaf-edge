import React, { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLenis } from "./hooks/useLenis";
import { CustomCursor } from "./components/CustomCursor";
import { CinematicHeroStage } from "./components/CinematicHeroStage";
import { ArkafFlowImpact } from "./components/ArkafFlowImpact";
import { WorkInsightsCTA } from "./components/WorkInsightsCTA";
import { Marquee } from "./components/Marquee";
import { Footer } from "./components/Footer";
import { Preloader } from "./components/Preloader";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useLenis(isMenuOpen);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    document.documentElement.classList.remove("lenis-stopped");
    document.body.classList.remove("lenis-stopped");
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (id === "home") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }, 50);
  };

  const navMenuItems = [
    { label: "Home", view: "home" },
    { label: "Services", view: "services" },
    { label: "Work & Insights", view: "work" },
  ];

  return (
    <div className="relative min-h-screen bg-rich-black text-anti-flash-white font-sans">
      <Preloader onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100]"
            style={{ scaleX, backgroundColor: "#149C77", boxShadow: "0 0 15px rgba(20, 156, 119, 0.6)" }}
          />

          <CustomCursor />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 pointer-events-none">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-2 pointer-events-auto cursor-none clickable group"
          onClick={() => scrollToSection("home")}
        >
          <div
            style={{
              backgroundColor: "#074239",
              border: "1.5px solid #149C77",
              boxShadow: "0 0 15px rgba(20, 156, 119, 0.4)",
              color: "#FFFFFF"
            }}
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-lg group-hover:scale-105 transition-transform font-heading"
          >
            A
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tight uppercase font-heading text-white">
            ARKAF <span style={{ color: "#149C77", textShadow: "0 0 15px rgba(20, 156, 119, 0.4)" }}>EDGE.</span>
          </span>
        </motion.div>

        <div className="flex gap-4 items-center pointer-events-auto">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 rounded-full border border-white/20 hover:border-caribbean-green flex items-center justify-center bg-rich-black/80 text-white transition-all cursor-none clickable backdrop-blur-md"
            title="Toggle Navigation Menu"
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Fullscreen Drawer Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[45] bg-rich-black text-anti-flash-white flex flex-col justify-center items-center px-6"
        >
          <div className="space-y-8 text-center">
            {navMenuItems.map((item, idx) => (
              <motion.div
                key={item.view}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.08 }}
                className="overflow-hidden"
              >
                <button
                  onClick={() => scrollToSection(item.view)}
                  className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight transition-all cursor-none clickable font-heading text-white hover:text-caribbean-green hover:italic"
                >
                  {item.label}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="absolute bottom-12 font-mono text-xs text-caribbean-green tracking-widest uppercase">
            ARKAF EDGE — STRATEGY • CREATIVITY • IMPACT
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="relative">
        <section id="home">
          <CinematicHeroStage onNavigate={scrollToSection} />
        </section>

        <section id="approach">
          <ArkafFlowImpact />
        </section>

        <section id="work">
          <WorkInsightsCTA />
        </section>

        <Marquee />

        <Footer onNavigate={scrollToSection} />
      </main>

      {/* Subtle Noise Texture */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        </motion.div>
      )}
    </div>
  );
}
