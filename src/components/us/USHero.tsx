import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

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
    if (!inputValue.trim()) return;

    if (inputMode === 'url') {
      let cleaned = inputValue.trim().toLowerCase();
      cleaned = cleaned.replace(/^https?:\/\//i, '');
      cleaned = cleaned.replace(/^www\./i, '');
      cleaned = cleaned.split('/')[0];
      navigate(`/analyzer?url=${encodeURIComponent(cleaned)}`);
    } else {
      navigate(`/analyzer?description=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <section className="relative min-h-[850px] lg:min-h-screen w-full flex flex-col justify-center items-center pt-28 pb-16 px-6 md:px-16 bg-black text-white overflow-hidden select-none">
      
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
      <div className="relative z-10 w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center text-center my-auto py-6">
        
        {/* Location & Sovereign Regional Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 flex items-center justify-center gap-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5500] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest font-semibold">
            CUSTOM AI ENGINEERING // 2-WEEK SPRINT DELIVERY
          </span>
        </motion.div>

        {/* Monumental Centered Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight text-white leading-[1.02] drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)] max-w-4xl mx-auto"
        >
          Custom AI built for <br />
          <span className="text-[#FF5500]">your business.</span>
        </motion.h1>

        {/* Narrative Statement with Local Trust Anchor */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mt-5 leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] mx-auto"
        >
          We build custom AI automations and private software that save your team dozens of hours every week. Delivered in 2-week milestones with 100% code ownership.
        </motion.p>

        {/* ========================================================================= */}
        {/* 3. LUXURY MINIMALIST AI AUDIT INPUT (NON-TECHY, HIGH-ELEGANCE) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl mt-10"
        >
          {/* Elegant Mode Switcher */}
          <div className="flex items-center justify-center gap-6 mb-3 font-sans text-xs text-zinc-400">
            <button
              type="button"
              onClick={() => { setInputMode('url'); setInputValue(''); }}
              className={`pb-1 transition-all cursor-pointer ${
                inputMode === 'url'
                  ? 'text-white font-bold border-b-2 border-[#FF5500]'
                  : 'hover:text-white border-b-2 border-transparent'
              }`}
            >
              Website Domain
            </button>
            <span className="text-zinc-600">•</span>
            <button
              type="button"
              onClick={() => { setInputMode('description'); setInputValue(''); }}
              className={`pb-1 transition-all cursor-pointer ${
                inputMode === 'description'
                  ? 'text-white font-bold border-b-2 border-[#FF5500]'
                  : 'hover:text-white border-b-2 border-transparent'
              }`}
            >
              Workflow Challenge
            </button>
          </div>

          {/* Clean Glass Input Pill */}
          <div className="p-1.5 sm:p-2 rounded-full bg-black/70 border border-white/15 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.8)] hover:border-white/25 transition-all duration-300">
            <form onSubmit={handleAuditSubmit} className="flex items-center gap-2">
              <div className="relative flex-1 pl-4">
                {inputMode === 'url' ? (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter company website (e.g. stripe.com)..."
                    className="w-full bg-transparent text-white placeholder-zinc-400 font-sans text-xs sm:text-sm focus:outline-none py-2"
                  />
                ) : (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Describe your manual operational bottleneck..."
                    className="w-full bg-transparent text-white placeholder-zinc-400 font-sans text-xs sm:text-sm focus:outline-none py-2"
                  />
                )}
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-us-pop hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Audit</span>
                <ArrowRight size={14} />
              </button>
            </form>
          </div>

        </motion.div>

      </div>

    </section>
  );
}
