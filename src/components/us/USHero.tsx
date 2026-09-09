import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const COMPANY_LOGOS = [
  { name: "MINIM", src: "/MINIM-logo-primary.png" },
  { name: "BRANDTOPOST", src: "/b2p_logo.png" },
  { name: "LOHIA TRADERS", src: "/lohiatraderslogo.png" },
  { name: "EQUESTRIAN", src: "/equestrianlogo.png" },
  { name: "GVRG INDUSTRIES", src: "/gvrgindustrieslogo.png" },
  { name: "SUPERHERO GYM", src: "/superherologo.png" },
  { name: "WEAREKNWN", src: "/weareknwn_logo.png" },
  { name: "AVENOIR", src: "/avenoirlogo.png" },
];

interface USHeroProps {
  onBookCallClick?: () => void;
  onExploreClick?: () => void;
}

export function USHero({ onBookCallClick }: USHeroProps) {
  const navigate = useNavigate();
  const [inputMode, setInputMode] = useState<'url' | 'description'>('url');
  const [inputValue, setInputValue] = useState('');

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputValue.trim();
    if (!val) return;

    // Smart detection: check if input looks like a domain/URL or was submitted in website mode
    const isDomain = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/i.test(val);

    if (inputMode === 'url' || (isDomain && !val.includes(' '))) {
      let cleaned = val.toLowerCase();
      cleaned = cleaned.replace(/^https?:\/\//i, '');
      cleaned = cleaned.replace(/^www\./i, '');
      cleaned = cleaned.split('/')[0];
      cleaned = cleaned.split('?')[0];
      cleaned = cleaned.split('#')[0];
      navigate(`/analyzer?url=${encodeURIComponent(cleaned)}`, {
        state: { url: cleaned }
      });
    } else {
      navigate(`/analyzer?description=${encodeURIComponent(val)}`, {
        state: { description: val }
      });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center pt-24 pb-12 px-6 md:px-12 bg-black text-white overflow-hidden select-none">
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC SATURN ROTATION (NATIVE HARDWARE 60FPS FORWARD + REVERSE PING-PONG) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          src="/saturn_loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center opacity-95 brightness-100 contrast-105 will-change-transform"
        />
        
        {/* Soft edge ambient vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. CENTER STAGE: MONUMENTAL EDITORIAL HEADLINE & CLEAN LUXURY ANALYZER */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center text-center my-auto py-2 sm:py-4">
        
        {/* Monumental Centered Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.65rem] xl:text-[4.15rem] font-black tracking-tight text-white leading-[1.08] drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)] max-w-5xl mx-auto"
        >
          Automate the Work <br className="hidden sm:inline" />
          <span className="text-[#FF5500]">That Holds Your Business Back.</span>
        </motion.h1>

        {/* Narrative Statement with High-Motivation Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-2xl mt-4 leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] mx-auto"
        >
          We design and deploy AI agents that handle repetitive operations across your business, so your team saves time, reduces overhead, and focuses on higher-value work.
        </motion.p>

        {/* ========================================================================= */}
        {/* 3. LUXURY MINIMALIST AI AUDIT INPUT (NON-TECHY, HIGH-ELEGANCE) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl mt-6 sm:mt-7"
        >
          {/* Interactive Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3.5 font-sans text-xs">
            <span className="text-zinc-400 font-medium">What would you like to automate?</span>
            <div className="inline-flex items-center gap-1.5 bg-black/70 border border-white/15 rounded-full p-1 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setInputMode('url')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  inputMode === 'url'
                    ? 'bg-[#FF5500] text-black shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                My company website
              </button>
              <button
                type="button"
                onClick={() => setInputMode('description')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  inputMode === 'description'
                    ? 'bg-[#FF5500] text-black shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                A repetitive task
              </button>
            </div>
          </div>

          {/* Clean Glass Input Pill */}
          <div className="p-1.5 sm:p-2 rounded-full bg-black/70 border border-white/15 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.8)] hover:border-white/25 transition-all duration-300">
            <form onSubmit={handleAuditSubmit} className="flex items-center gap-2">
              <div className="relative flex-1 pl-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter your website or describe a task…"
                  className="w-full bg-transparent text-white placeholder-zinc-400 font-sans text-xs sm:text-sm focus:outline-none py-2"
                />
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-us-pop hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Find My Automation</span>
                <ArrowRight size={14} />
              </button>
            </form>
          </div>

        </motion.div>

        {/* ========================================================================= */}
        {/* 4. TRUSTED COMPANY LOGOS CAROUSEL STRIP (From updated_b2p_prod) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mt-7 sm:mt-9 pt-5 sm:pt-6 border-t border-white/10 flex flex-col items-center select-none"
        >
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-3.5">
            COMPANIES WE HAVE AUTOMATED WORKFLOWS FOR
          </span>
          
          <div className="w-full relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex animate-marquee-fast items-center gap-12 sm:gap-16 lg:gap-20 shrink-0 py-2">
              {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((logo, idx) => (
                <div key={idx} className="flex-shrink-0 min-w-[120px] sm:min-w-[150px] h-8 sm:h-10 flex items-center justify-center px-3">
                  <img 
                    src={logo.src} 
                    alt={logo.name} 
                    className="h-6 sm:h-7 md:h-8 max-w-[130px] sm:max-w-[150px] w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-all duration-300" 
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
