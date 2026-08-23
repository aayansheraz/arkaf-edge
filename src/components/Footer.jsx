import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="relative min-h-[90vh] bg-rich-black text-anti-flash-white flex flex-col justify-between items-center p-8 md:p-16 overflow-hidden">
      <div className="w-full max-w-7xl pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-mono uppercase text-pistachio tracking-widest border-b border-forest/20 pb-8">
        <div>ARKAF EDGE — DIGITAL CONSULTANCY</div>
        <div className="text-stone font-normal max-w-md text-left md:text-right">
          Strategic thinking. Creative solutions. Meaningful impact.
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 my-auto py-20"
      >
        <h2 className="text-[13vw] font-black tracking-tighter leading-none text-white/5 pointer-events-none select-none font-heading uppercase">
          ARKAF EDGE
        </h2>
        <a
          href="mailto:hello@arkafedge.com"
          className="absolute inset-0 flex items-center justify-center gap-4 text-3xl sm:text-6xl md:text-7xl font-black text-caribbean-green hover:text-white transition-all cursor-none clickable font-heading hover:scale-105"
        >
          <span>hello@arkafedge.com</span>
          <ArrowUpRight className="w-8 h-8 md:w-16 md:h-16 text-caribbean-green" />
        </a>
      </motion.div>

      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono uppercase text-pistachio/80 pt-8 border-t border-forest/20">
        <div>© 2026 ARKAF EDGE. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-6 sm:gap-8">
          <button
            onClick={() => onNavigate && onNavigate("home")}
            className="hover:text-caribbean-green transition-colors cursor-none clickable"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate && onNavigate("services")}
            className="hover:text-caribbean-green transition-colors cursor-none clickable"
          >
            Services
          </button>
          <button
            onClick={() => onNavigate && onNavigate("work")}
            className="hover:text-caribbean-green transition-colors cursor-none clickable"
          >
            Work
          </button>
          <a
            href="#"
            className="hover:text-caribbean-green transition-colors cursor-none clickable"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="hover:text-caribbean-green transition-colors cursor-none clickable"
          >
            Privacy Policy
          </a>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-caribbean-green/5 rounded-full blur-[180px] pointer-events-none" />
    </footer>
  );
};
