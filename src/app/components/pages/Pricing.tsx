import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Discovery",
    price: "Free",
    description: "Ideal for early stage startups exploring their digital potential.",
    features: ["Project consultation", "Basic digital audit", "Competitor analysis", "Strategic roadmap"]
  },
  {
    name: "Growth",
    price: "$2,499",
    period: "/mo",
    popular: true,
    description: "Comprehensive support for growing brands ready for digital excellence.",
    features: ["Dedicated designer", "Weekly progress calls", "UI/UX updates", "Technical SEO", "Performance hosting"]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Scale-ready solutions for organizations with complex requirements.",
    features: ["Custom development", "Full brand system", "3D asset creation", "Multi-platform support", "24/7 Priority support"]
  }
];

export const Pricing = () => {
  return (
    <div className="pt-32 pb-20 px-6 md:px-20 min-h-screen">
      <div className="text-center mb-20">
        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-7xl md:text-[8vw] font-black uppercase tracking-tighter mb-4"
        >
          Investment
        </motion.h1>
        <p className="text-neutral-500 max-w-lg mx-auto text-lg">
          Transparent pricing for high-end results. No hidden fees, just pure craftsmanship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-8 rounded-2xl border transition-colors duration-500 ${
              plan.popular 
                ? "border-black dark:border-white bg-neutral-50 dark:bg-neutral-900" 
                : "border-neutral-200 dark:border-neutral-800"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Most Popular
              </span>
            )}
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-black">{plan.price}</span>
              {plan.period && <span className="text-neutral-500 text-sm">{plan.period}</span>}
            </div>
            <p className="text-neutral-500 mb-8 text-sm leading-relaxed">{plan.description}</p>
            
            <div className="space-y-4 mb-10">
              {plan.features.map(feature => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                    <Check className="w-3 h-3 text-neutral-500" />
                  </div>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">{feature}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all cursor-none clickable ${
              plan.popular 
                ? "bg-black dark:bg-white text-white dark:text-black hover:opacity-80" 
                : "border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900"
            }`}>
              Select Plan
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
