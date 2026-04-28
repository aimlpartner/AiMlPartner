import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function DistributionTeaser() {
  return (
    <section className="relative py-32 overflow-hidden bg-slate-900 text-slate-50 border-t border-slate-800">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000')] opacity-30 bg-cover bg-center mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="container-max relative z-10 text-center max-w-3xl mx-auto"
      >
        <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-6">Built-in Distribution</div>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8 leading-tight">
          Launch + accelerate: GTM that scales with your agents
        </h2>
        
        <p className="text-lg md:text-xl text-slate-400 font-light mb-12 leading-relaxed">
          Alongside agent builds, we run GTM pods and community-driven events that help you activate, test, and distribute your AI-driven workflows to real buyers.
        </p>
        
        <a 
          href="/events" 
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-slate-50 to-sky-50/30 text-slate-900 px-8 py-4 font-medium hover:bg-slate-200 transition-colors"
        >
          Explore /events
          <ArrowRight size={16} />
        </a>
      </motion.div>
    </section>
  );
}
