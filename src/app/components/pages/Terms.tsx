import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, FileText } from "lucide-react";

export const Terms: React.FC = () => {
  return (
    <div className="pt-32 pb-28 px-6 md:px-16 lg:px-24 min-h-screen bg-rich-black text-anti-flash-white">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-caribbean-green font-bold tracking-widest">LEGAL & COMPLIANCE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tighter uppercase mb-6">
            Terms & <span className="text-caribbean-green">Privacy Policy</span>
          </h1>

          <p className="text-stone font-mono text-xs uppercase tracking-widest">
            Last Updated: August 2026 • ARKAF Edge Global
          </p>
        </motion.div>

        {/* Terms Section */}
        <div className="space-y-8 p-8 sm:p-10 rounded-3xl bg-dark-green/30 border border-dark-green/80">
          <div className="flex items-center gap-3 text-caribbean-green">
            <FileText className="w-6 h-6" />
            <h2 className="text-2xl font-bold font-heading text-anti-flash-white">
              Terms of Engagement
            </h2>
          </div>

          <div className="space-y-4 text-stone text-sm leading-relaxed font-normal">
            <h3 className="text-anti-flash-white font-semibold text-base font-heading">1. Strategic Advisory & Deliverables</h3>
            <p>
              ARKAF Edge delivers bespoke brand strategy, marketing architecture, creative design, and digital engineering services. All deliverables are subject to mutually agreed Statements of Work (SOW) defining milestones, timelines, and commercial terms.
            </p>

            <h3 className="text-anti-flash-white font-semibold text-base font-heading">2. Intellectual Property Rights</h3>
            <p>
              Upon full settlement of commercial compensation, all final approved visual identities, strategic blueprints, and custom digital platform code created specifically for the client become the exclusive intellectual property of the client, preserving ARKAF Edge's right to showcase the work in portfolio case studies.
            </p>

            <h3 className="text-anti-flash-white font-semibold text-base font-heading">3. Mutual Non-Disclosure</h3>
            <p>
              All proprietary commercial data, market analysis, unpublished release dates, and strategic materials shared during client engagements remain strictly confidential under perpetual non-disclosure obligations.
            </p>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="space-y-8 p-8 sm:p-10 rounded-3xl bg-dark-green/30 border border-dark-green/80">
          <div className="flex items-center gap-3 text-mountain-meadow">
            <Shield className="w-6 h-6" />
            <h2 className="text-2xl font-bold font-heading text-anti-flash-white">
              Privacy & Data Protection
            </h2>
          </div>

          <div className="space-y-4 text-stone text-sm leading-relaxed font-normal">
            <h3 className="text-anti-flash-white font-semibold text-base font-heading">1. Information Collection</h3>
            <p>
              We collect information provided directly by you when submitting an inquiry form, booking an exploratory session, or communicating with our partners. We do not sell, rent, or trade client or prospect data with third parties.
            </p>

            <h3 className="text-anti-flash-white font-semibold text-base font-heading">2. Data Security</h3>
            <p>
              We apply industry-standard cryptographic security protocols to protect all data transmissions and internal communications across our digital infrastructure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
