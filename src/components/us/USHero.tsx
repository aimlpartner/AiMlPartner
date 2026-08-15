import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface USHeroProps {
  onBookCallClick?: () => void;
  onExploreClick?: () => void;
}

export function USHero({ onBookCallClick }: USHeroProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[700px] max-h-[1080px] w-full flex flex-col justify-between pt-24 pb-12 px-6 md:px-16 bg-black text-white overflow-hidden select-none">
      
      {/* Subtle Warm Amber Ambient Vignette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FF5500]/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* 1. Center Stage: Towering Monolith Sculpture (Centered in Viewport) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[65vh] max-h-[580px] aspect-[3/4] flex items-center justify-center"
        >
          <img
            src="/hero_monolith.png"
            alt="Basalt Sovereign Monolith"
            className="h-full w-auto object-contain object-center drop-shadow-[0_20px_60px_rgba(255,85,0,0.18)]"
          />
        </motion.div>
      </div>

      {/* 2. Massive Editorial Headline (Spanning Across Center Stage) */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center z-10 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-extrabold tracking-tight text-white text-center leading-[0.95] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
        >
          Built for permanence.
        </motion.h1>
      </div>

      {/* 3. Bottom Editorial Command Anchor (Split Left & Right like Tenex) */}
      <div className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8 z-20 pt-4">
        
        {/* Bottom Left: Value Proposition with Blaze Orange Accent */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md text-left"
        >
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
            Your <span className="text-[#FF5500]">sovereign AI partner.</span>
          </h2>
          <p className="mt-1.5 font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
            We set & execute your enterprise AI roadmap at startup speed. Dedicated autonomous engineering pods deployed in 14 days.
          </p>
        </motion.div>

        {/* Bottom Right: Horizontal Lead Arrow + Solid Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end"
        >
          {/* Long Horizontal Line Arrow */}
          <div className="hidden lg:flex items-center gap-0 w-48 text-zinc-600">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-700 to-zinc-400" />
            <span className="text-zinc-400 -ml-1 text-sm">→</span>
          </div>

          {/* Primary Action Button */}
          <a
            href="#intake"
            onClick={(e) => {
              e.preventDefault();
              if (onBookCallClick) onBookCallClick();
              else scrollToSection('intake');
            }}
            className="px-8 py-3.5 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-us-pop hover:scale-105 active:scale-95 flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <span>Schedule Briefing</span>
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

      </div>

    </section>
  );
}
