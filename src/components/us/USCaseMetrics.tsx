import React, { useRef, useState } from 'react';
import { ArrowUpRight, Zap, Shield, Check } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

// 3D Parallax Tilt Component for Floating Sculptures
function ParallaxSculpture({ src, alt, glowColor = '#FF5500' }: { src: string; alt: string; glowColor?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square flex items-center justify-center cursor-crosshair group"
    >
      {/* Dynamic Ambient Glow Behind Sculpture */}
      <div
        className="absolute inset-0 rounded-full blur-[100px] opacity-25 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: glowColor }}
      />

      {/* Floating Levitation Container */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full h-full flex items-center justify-center relative z-10"
      >
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full object-contain drop-shadow-[0_35px_60px_rgba(255,85,0,0.25)] transform group-hover:scale-105 transition-transform duration-500"
        />
      </motion.div>
    </motion.div>
  );
}

export function USCaseMetrics() {
  return (
    <section id="metrics" className="py-36 px-6 md:px-16 bg-black text-white border-b border-zinc-900 relative select-none overflow-hidden">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#FF5500]/4 rounded-full blur-[260px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* ========================================================================= */}
        {/* TOP MANIFESTO HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-36 pb-12 border-b border-zinc-900 gap-10">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-medium mb-4">
              The Ledger // Observable Return
            </p>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.02]">
              Quantified return.{' '}
              <span className="text-[#FF5500]">Engineered in production.</span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
            All outcomes are directly observable. We measure return in operational friction eliminated, latency crushed, and permanent IP retained.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SPREAD 01 // FINTECH (LEFT SCULPTURE + RIGHT TYPOGRAPHIC SURGE) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative pt-12 pb-24 border-t border-zinc-900 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Background Watermark */}
          <span className="absolute -top-10 right-4 font-display text-[14rem] sm:text-[18rem] font-extrabold text-zinc-900/15 select-none pointer-events-none -z-10 leading-none">
            01
          </span>

          {/* Left: 3D Interactive Parallax Sculpture */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-zinc-950 border border-zinc-800">
                01 // FINTECH & CAPITAL MARKETS
              </span>
            </div>

            <ParallaxSculpture
              src="/case_fintech.png"
              alt="Floating Obsidian Crystal Sculpture"
              glowColor="#FF5500"
            />
          </div>

          {/* Right: Monumental Typographic Headline & Flanking Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-display text-7xl sm:text-8xl md:text-9xl font-extrabold text-white tracking-tighter leading-none">
                84%
              </span>
              <span className="font-mono text-xs sm:text-sm text-[#FF5500] uppercase font-bold tracking-widest">
                Reduction In Review Time
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug mb-8">
              10,000+ monthly underwriting documents verified with zero analyst backlog.
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-2 font-bold">
                  The Operational Drag (Pre-AI)
                </span>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  A high-growth fintech was losing 420 human analyst hours weekly manually reconciling tax returns and KYC proof.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-[#FF5500]/30 shadow-[0_0_35px_rgba(255,85,0,0.08)]">
                <span className="font-mono text-[10px] text-[#FF5500] uppercase tracking-widest block mb-2 font-bold flex items-center gap-1.5">
                  <Zap size={13} />
                  Sovereign Engineering
                </span>
                <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
                  Deployed a dedicated multi-modal vision pod inside private AWS VPC, outputting credit memos in 1.2s.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-zinc-900">
              <div className="font-mono text-xs">
                <span className="text-zinc-500 uppercase block text-[10px]">Annual Impact</span>
                <span className="font-display text-lg font-extrabold text-white">$1.4M Saved Annually</span>
              </div>

              <a
                href="#intake"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-[#FF5500] text-zinc-300 hover:text-black font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-zinc-800 hover:border-[#FF5500] cursor-pointer"
              >
                <span>Request Blueprint</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SPREAD 02 // B2B SAAS (INVERTED: LEFT TYPOGRAPHIC SURGE + RIGHT SCULPTURE) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative pt-24 pb-24 border-t border-zinc-900 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Background Watermark */}
          <span className="absolute -top-10 left-4 font-display text-[14rem] sm:text-[18rem] font-extrabold text-zinc-900/15 select-none pointer-events-none -z-10 leading-none">
            02
          </span>

          {/* Left: Typographic Surge & Flanking Details */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-zinc-950 border border-zinc-800">
                02 // ENTERPRISE B2B SAAS
              </span>
            </div>

            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-display text-7xl sm:text-8xl md:text-9xl font-extrabold text-white tracking-tighter leading-none">
                50K+
              </span>
              <span className="font-mono text-xs sm:text-sm text-[#FF5500] uppercase font-bold tracking-widest">
                Organizations Scaled
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug mb-8">
              Scaled to 50,000 enterprise teams with zero support headcount additions.
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-2 font-bold">
                  The Operational Drag (Pre-AI)
                </span>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  Support and legal triage teams were overwhelmed with custom procurement RFPs and billing inquiries.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-[#FF5500]/30 shadow-[0_0_35px_rgba(255,85,0,0.08)]">
                <span className="font-mono text-[10px] text-[#FF5500] uppercase tracking-widest block mb-2 font-bold flex items-center gap-1.5">
                  <Zap size={13} />
                  Sovereign Engineering
                </span>
                <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
                  Deployed autonomous LangGraph agent network natively inside Slack and Salesforce with strict guardrails.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-zinc-900">
              <div className="font-mono text-xs">
                <span className="text-zinc-500 uppercase block text-[10px]">Annual Impact</span>
                <span className="font-display text-lg font-extrabold text-white">4-Minute Contract Turnaround</span>
              </div>

              <a
                href="#intake"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-[#FF5500] text-zinc-300 hover:text-black font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-zinc-800 hover:border-[#FF5500] cursor-pointer"
              >
                <span>Request Blueprint</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Right: 3D Interactive Parallax Basalt Torus */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end order-1 lg:order-2">
            <ParallaxSculpture
              src="/case_saas.png"
              alt="Floating Basalt Torus Sculpture"
              glowColor="#FF5500"
            />
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SPREAD 03 // HEALTHCARE (TRIUMPHAL CENTERSTAGE PYRAMID SCULPTURE) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative pt-24 pb-12 border-t border-zinc-900 flex flex-col items-center text-center"
        >
          {/* Background Watermark */}
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 font-display text-[14rem] sm:text-[18rem] font-extrabold text-zinc-900/15 select-none pointer-events-none -z-10 leading-none">
            03
          </span>

          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-zinc-950 border border-zinc-800">
              03 // HEALTHCARE & PAYERS
            </span>
          </div>

          {/* Monumental Stat & Centered Pyramid */}
          <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center my-4">
            <div className="font-display text-7xl sm:text-9xl md:text-[10rem] font-extrabold text-white tracking-tighter leading-none select-none pointer-events-none">
              92%
            </div>
            <span className="font-mono text-xs sm:text-sm text-[#FF5500] uppercase tracking-widest font-bold -mt-2 mb-6">
              First-Pass Claim Acceptance
            </span>

            <ParallaxSculpture
              src="/case_healthcare.png"
              alt="Floating Basalt Pyramid Octahedron"
              glowColor="#FF5500"
            />
          </div>

          <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.12] max-w-4xl mb-12">
            Compressed 72-hour claim validation backlog down to 9 seconds.
          </h3>

          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
            <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-900">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-2 font-bold">
                The Operational Drag (Pre-AI)
              </span>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Healthcare network faced severe claim rejection rates due to disparate legacy EHR formats and manual medical code mapping.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-[#FF5500]/30 shadow-[0_0_35px_rgba(255,85,0,0.08)]">
              <span className="font-mono text-[10px] text-[#FF5500] uppercase tracking-widest block mb-2 font-bold flex items-center gap-1.5">
                <Zap size={13} />
                Sovereign Engineering
              </span>
              <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
                Engineered fine-tuned model pod in Azure AI Foundry, standardizing clinician notes into clean FHIR/EDI claims.
              </p>
            </div>
          </div>

          <a
            href="#intake"
            className="px-8 py-3.5 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all shadow-us-pop hover:scale-105 active:scale-95 flex items-center gap-2 group cursor-pointer"
          >
            <span>Request Architecture Blueprint</span>
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* ========================================================================= */}
        {/* BOTTOM SPECIFICATION HORIZON */}
        {/* ========================================================================= */}
        <div className="mt-36 pt-12 border-t border-zinc-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex flex-wrap items-center gap-8 sm:gap-16 font-mono text-xs">
            <div>
              <span className="text-[#FF5500] font-bold block text-base">14 DAYS</span>
              <span className="text-zinc-500 text-[10px] uppercase">Sprint to Production</span>
            </div>
            <div>
              <span className="text-[#FF5500] font-bold block text-base">100% IP</span>
              <span className="text-zinc-500 text-[10px] uppercase">Client Cloud Custody</span>
            </div>
            <div>
              <span className="text-[#FF5500] font-bold block text-base">ZERO</span>
              <span className="text-zinc-500 text-[10px] uppercase">Telemetry Leakage</span>
            </div>
          </div>

          <a
            href="#intake"
            className="px-8 py-3.5 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-us-pop hover:scale-105 active:scale-95 flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <span>Schedule Architecture Review</span>
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
