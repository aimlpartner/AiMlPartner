import React from 'react';
import { motion } from 'motion/react';
import { Search, Link as LinkIcon, Rocket } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      title: "Discover",
      icon: <Search size={20} className="text-slate-900" />,
      description: "Answer a few questions about your business. Our AI analyzes your operations and surfaces the highest-ROI opportunities."
    },
    {
      title: "Match",
      icon: <LinkIcon size={20} className="text-slate-900" />,
      description: "Get matched to expert AI agents built specifically for your use case — not generic AI, but purpose-trained systems."
    },
    {
      title: "Implement",
      icon: <Rocket size={20} className="text-slate-900" />,
      description: "Deploy with confidence. We validate every solution and support your team through onboarding."
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="container-max">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-6">
            How It Works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-slate-50 border border-slate-200 p-8 flex flex-col h-full hover:border-slate-300 transition-colors"
            >
              <div className="w-12 h-12 mb-6 bg-white border border-slate-200 shadow-sm flex items-center justify-center text-sky-500">
                {step.icon}
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-4 tracking-tight">
                {step.title}
              </h3>
              <p className="text-slate-600 font-light leading-relaxed flex-grow">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
