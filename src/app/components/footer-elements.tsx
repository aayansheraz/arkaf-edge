import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, ArrowUpRight } from "lucide-react";

interface FooterProps {
  onNavigate?: (view: string) => void;
}

export const Marquee: React.FC = () => {
  return (
    <div className="relative flex overflow-hidden bg-dark-green/20 border-y border-dark-green/60 py-6 transition-colors duration-500">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap select-none pointer-events-none"
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-pistachio/50 font-heading mx-5 flex items-center gap-5">
            STRATEGY <span className="w-2 h-2 rounded-full bg-caribbean-green" />
            CREATIVITY <span className="w-2 h-2 rounded-full bg-mountain-meadow" />
            IMPACT <span className="w-2 h-2 rounded-full bg-caribbean-green" />
            THE ARKAF EDGE <span className="w-2 h-2 rounded-full bg-mountain-meadow" />
            PURPOSEFUL MARKETING <span className="w-2 h-2 rounded-full bg-caribbean-green" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (v: string) => {
    if (onNavigate) {
      onNavigate(v);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      handleNav("home");
    }
  };

  return (
    <footer className="relative bg-rich-black text-anti-flash-white pt-20 pb-12 px-6 md:px-16 lg:px-24 border-t border-dark-green/80 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-dark-green/60">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div
              onClick={() => handleNav("home")}
              className="text-2xl font-black tracking-tighter uppercase font-heading text-anti-flash-white clickable cursor-none inline-block"
            >
              ARKAF <span className="text-caribbean-green">EDGE</span>
            </div>
            <p className="text-base font-semibold text-pistachio/90 leading-snug">
              Strategic thinking. Creative solutions. Meaningful impact.
            </p>
            <p className="text-xs text-stone max-w-sm leading-relaxed">
              Helping businesses discover their edge and turn it into meaningful, long-term commercial growth.
            </p>
          </div>

          {/* Navigation Col */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-caribbean-green font-bold mb-3">
              Navigation
            </div>
            <ul className="space-y-2 text-xs font-semibold">
              {[
                { label: "Home", action: () => handleNav("home") },
                { label: "About", action: () => scrollToSection("about") },
                { label: "Services", action: () => scrollToSection("services") },
                { label: "The Edge", action: () => scrollToSection("arkaf-edge") },
                { label: "Work", action: () => scrollToSection("work") },
                { label: "Insights", action: () => scrollToSection("insights") },
                { label: "Contact", action: () => handleNav("contact") },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={item.action}
                    className="text-stone hover:text-caribbean-green transition-colors clickable cursor-none uppercase tracking-wider"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-caribbean-green font-bold mb-3">
              Contact
            </div>
            <ul className="space-y-2.5 text-xs text-stone">
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-caribbean-green flex-shrink-0" />
                <a href="mailto:hello@arkafedge.com" className="hover:text-caribbean-green transition-colors clickable cursor-none font-mono">
                  hello@arkafedge.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-mountain-meadow flex-shrink-0" />
                <a href="tel:+15550192834" className="hover:text-caribbean-green transition-colors clickable cursor-none font-mono">
                  +1 (555) 019-2834
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-pistachio flex-shrink-0" />
                <span>London / Global</span>
              </li>
              <li className="flex items-center gap-2.5 pt-1">
                <Linkedin className="w-3.5 h-3.5 text-caribbean-green flex-shrink-0" />
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-caribbean-green transition-colors clickable cursor-none inline-flex items-center gap-1 font-mono text-[11px]"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] font-mono text-stone">
          <div>
            © 2026 ARKAF Edge. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav("terms")}
              className="hover:text-caribbean-green transition-colors clickable cursor-none"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => handleNav("terms")}
              className="hover:text-caribbean-green transition-colors clickable cursor-none"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
