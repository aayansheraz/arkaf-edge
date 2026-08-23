import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowUpRight } from "lucide-react";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "$25k - $50k",
    services: [] as string[],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const budgetOptions = ["< $25k", "$25k - $50k", "$50k - $100k", "$100k+"];
  const serviceOptions = [
    "Brand Strategy",
    "Marketing Strategy",
    "Creative & Design",
    "Digital & Content",
    "Full Enterprise Transformation"
  ];

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <span className="font-mono text-xs text-caribbean-green font-bold tracking-widest">START A CONVERSATION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tighter uppercase leading-[0.95] mb-8">
            Ready to Find <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-caribbean-green via-mountain-meadow to-pistachio">
              Your Edge?
            </span>
          </h1>

          <p className="text-lg md:text-xl text-stone dark:text-pistachio/90 max-w-3xl leading-relaxed">
            Tell us about your brand challenge, strategic ambitions, or upcoming launch. We will assemble the ideal team to explore what's possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Direct Contact Info Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-dark-green/30 border border-dark-green/80 space-y-6">
              <h3 className="text-xl font-bold font-heading text-anti-flash-white">
                Direct Inquiries
              </h3>

              <div className="space-y-4 text-sm text-stone">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-dark-green/60 flex items-center justify-center text-caribbean-green">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-pistachio/60">Email</div>
                    <a href="mailto:hello@arkafedge.com" className="text-anti-flash-white hover:text-caribbean-green transition-colors font-medium">
                      hello@arkafedge.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-dark-green/60 flex items-center justify-center text-mountain-meadow">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-pistachio/60">Phone</div>
                    <a href="tel:+15550192834" className="text-anti-flash-white hover:text-caribbean-green transition-colors font-mono">
                      +1 (555) 019-2834
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-dark-green/60 flex items-center justify-center text-pistachio">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-pistachio/60">Headquarters</div>
                    <div className="text-anti-flash-white">London, UK / Global Deployments</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-dark-green/40 to-rich-black border border-caribbean-green/30 space-y-4">
              <div className="font-mono text-xs text-caribbean-green font-bold uppercase tracking-widest">
                Our Guarantee
              </div>
              <p className="text-sm text-stone leading-relaxed">
                Every consultation is handled under strict mutual NDA. We provide a preliminary strategic perspective within 48 business hours.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 rounded-3xl bg-dark-green/40 border border-caribbean-green/50 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-caribbean-green/20 text-caribbean-green flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,223,129,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold font-heading text-anti-flash-white">
                  Message Received
                </h3>
                <p className="text-stone dark:text-pistachio/80 max-w-md mx-auto text-base">
                  Thank you for reaching out. An ARKAF Edge partner will review your inquiry and connect with you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-full border border-caribbean-green text-caribbean-green text-xs font-mono uppercase tracking-wider hover:bg-caribbean-green hover:text-rich-black transition-colors clickable cursor-none"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl bg-dark-green/30 border border-dark-green/80 space-y-8">
                {/* Services needed */}
                <div className="space-y-3">
                  <label className="block font-mono text-xs uppercase tracking-widest text-caribbean-green font-semibold">
                    Capabilities Required
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((srv) => {
                      const isSelected = formData.services.includes(srv);
                      return (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => handleServiceToggle(srv)}
                          className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all clickable cursor-none ${
                            isSelected
                              ? "bg-caribbean-green text-rich-black font-bold shadow-[0_0_12px_rgba(0,223,129,0.4)]"
                              : "bg-rich-black/50 text-stone border border-dark-green/70 hover:border-caribbean-green/40"
                          }`}
                        >
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-widest text-stone">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3.5 rounded-xl bg-rich-black/70 border border-dark-green/80 text-anti-flash-white placeholder-stone/50 focus:outline-none focus:border-caribbean-green transition-colors font-sans text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-widest text-stone">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-rich-black/70 border border-dark-green/80 text-anti-flash-white placeholder-stone/50 focus:outline-none focus:border-caribbean-green transition-colors font-sans text-sm"
                    />
                  </div>
                </div>

                {/* Company & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-widest text-stone">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Corp"
                      className="w-full px-4 py-3.5 rounded-xl bg-rich-black/70 border border-dark-green/80 text-anti-flash-white placeholder-stone/50 focus:outline-none focus:border-caribbean-green transition-colors font-sans text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-widest text-stone">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-rich-black/70 border border-dark-green/80 text-anti-flash-white focus:outline-none focus:border-caribbean-green transition-colors font-sans text-sm"
                    >
                      {budgetOptions.map((b) => (
                        <option key={b} value={b} className="bg-rich-black text-anti-flash-white">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block font-mono text-xs uppercase tracking-widest text-stone">
                    Project Scope & Ambitions *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you are aiming to achieve, target milestones, and desired outcomes..."
                    className="w-full px-4 py-3.5 rounded-xl bg-rich-black/70 border border-dark-green/80 text-anti-flash-white placeholder-stone/50 focus:outline-none focus:border-caribbean-green transition-colors font-sans text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-3 py-4 rounded-full bg-caribbean-green text-rich-black font-extrabold text-sm uppercase tracking-widest hover:shadow-[0_0_25px_rgba(0,223,129,0.5)] transition-all clickable cursor-none"
                >
                  <span>Send Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
