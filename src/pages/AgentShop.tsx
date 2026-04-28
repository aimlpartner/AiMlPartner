import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, LayoutTemplate, Copy, Rocket, Settings, Code, Lock, RefreshCw, Star, Zap } from 'lucide-react';

export function AgentShop() {
  const useCases = [
    { icon: <ShoppingCart />, title: "E-commerce Recommender", desc: "Pre-built agent for product suggestions." },
    { icon: <LayoutTemplate />, title: "Blog Generator", desc: "SEO-optimized content creation agent." },
    { icon: <Copy />, title: "Copywriting Assistant", desc: "Draft ad copy and social posts instantly." },
    { icon: <Rocket />, title: "Launch Coordinator", desc: "Manage product launch checklists." },
    { icon: <Settings />, title: "IT Helpdesk", desc: "Resolve common password and access issues." },
    { icon: <Code />, title: "Code Reviewer", desc: "Automated PR reviews for standard patterns." },
    { icon: <Lock />, title: "Security Scanner", desc: "Check configurations for vulnerabilities." },
    { icon: <RefreshCw />, title: "Inventory Sync", desc: "Keep stock levels updated across platforms." },
    { icon: <Star />, title: "Review Manager", desc: "Draft responses to customer reviews." },
    { icon: <Zap />, title: "Lead Scraper", desc: "Extract contact info from public directories." }
  ];

  return (
    <main className="pt-32 pb-24 bg-gradient-to-br from-slate-50 to-sky-50/30 min-h-screen">
      <div className="container-max">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-200 text-xs font-mono text-slate-600 mb-8 tracking-tight uppercase bg-white">
            <span className="w-2 h-2 bg-slate-900" />
            Core Offering
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Agent Shop
          </h1>
          <p className="text-lg text-slate-600 font-light">
            A marketplace for pre-built, production-ready agents that you can deploy in minutes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-slate-200 p-6 hover:border-slate-300 transition-colors"
            >
              <div className="w-10 h-10 bg-slate-100 flex items-center justify-center mb-6 text-slate-900 border border-slate-200">
                {uc.icon}
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">{uc.title}</h3>
              <p className="text-slate-600 font-light text-sm">{uc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
