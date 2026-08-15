import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export function USPillars() {
  return (
    <section id="pillars" className="py-32 px-6 md:px-16 bg-black text-white border-b border-zinc-900 relative select-none overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Manifesto Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-28 pb-12 border-b border-zinc-900 gap-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-medium mb-4">
              Our Practice // Framework
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.04]">
              How we engineer your <span className="text-[#FF5500]">AI capability.</span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
            A three-phase progression from initial diagnostic clarity to sovereign production pods. No billable fluff, no 200-page slide decks.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SPREAD 01: STRATEGY & AUDIT (Left-Aligned Visual) */}
        {/* ========================================================================= */}
        <div className="py-20 border-b border-zinc-900/80 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative">
          
          {/* Background Watermark Numeral */}
          <span className="absolute -top-6 left-0 font-display text-[12rem] font-extrabold text-zinc-900/30 select-none pointer-events-none -z-10 leading-none">
            01
          </span>

          {/* Left: Tactile Sculpture Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-xs aspect-square flex items-center justify-center">
              <img
                src="/pillar_audit.png"
                alt="Architectural Audit Prism"
                className="w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(255,85,0,0.12)]"
              />
            </div>
          </motion.div>

          {/* Right: Rich Editorial Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#FF5500] font-mono text-xs uppercase tracking-widest font-bold">
                Phase 01
              </span>
              <span className="text-zinc-600 text-xs">•</span>
              <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                14-Day Kickoff
              </span>
            </div>

            <h3 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              We audit the operational drag.{' '}
              <span className="text-zinc-400 font-normal">You get a mathematical roadmap.</span>
            </h3>

            <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mb-8">
              We embed directly into your data pipelines and workflows to pinpoint where your team loses hundreds of hours. We formulate high-conviction ROI models and calculate exact engineering sprint requirements before writing a single line of production code.
            </p>

            {/* Spec Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-900 text-left">
              <div>
                <p className="font-mono text-[11px] text-[#FF5500] font-bold uppercase tracking-wider mb-1">
                  Deliverable
                </p>
                <p className="font-sans text-xs text-zinc-300">
                  Full Data & Workflow Blueprint
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] text-[#FF5500] font-bold uppercase tracking-wider mb-1">
                  Timeline
                </p>
                <p className="font-sans text-xs text-zinc-300">
                  14 Business Days
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] text-[#FF5500] font-bold uppercase tracking-wider mb-1">
                  Outcome
                </p>
                <p className="font-sans text-xs text-zinc-300">
                  4-Week Clear ROI Target
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* SPREAD 02: DEDICATED ENGINEERING PODS (Inverted Offset Layout) */}
        {/* ========================================================================= */}
        <div className="py-24 border-b border-zinc-900/80 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative">
          
          {/* Background Watermark Numeral */}
          <span className="absolute -top-6 right-0 font-display text-[12rem] font-extrabold text-zinc-900/30 select-none pointer-events-none -z-10 leading-none">
            02
          </span>

          {/* Left: Rich Editorial Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#FF5500] font-mono text-xs uppercase tracking-widest font-bold">
                Phase 02
              </span>
              <span className="text-zinc-600 text-xs">•</span>
              <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                2-4 Week Rapid Sprints
              </span>
            </div>

            <h3 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              Dedicated AI pods.{' '}
              <span className="text-zinc-400 font-normal">Embedded directly in your sprint cycles.</span>
            </h3>

            <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mb-8">
              No junior contractors. You get seasoned full-stack AI engineers crafting custom reasoning loops, private fine-tuned LLMs (DeepSeek, Claude, Llama), and multi-agent tool pipelines with automated regression benchmarks.
            </p>

            {/* Spec Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-900 text-left">
              <div>
                <p className="font-mono text-[11px] text-[#FF5500] font-bold uppercase tracking-wider mb-1">
                  Architecture
                </p>
                <p className="font-sans text-xs text-zinc-300">
                  Custom Fine-Tuning & RAG
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] text-[#FF5500] font-bold uppercase tracking-wider mb-1">
                  Speed
                </p>
                <p className="font-sans text-xs text-zinc-300">
                  Bi-weekly Production Drops
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] text-[#FF5500] font-bold uppercase tracking-wider mb-1">
                  Efficiency
                </p>
                <p className="font-sans text-xs text-zinc-300">
                  68% Manual Overhead Cut
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Tactile Sculpture Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 order-1 lg:order-2 flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-xs aspect-square flex items-center justify-center">
              <img
                src="/pillar_engineering.png"
                alt="Engineering Pods Basalt Interlock"
                className="w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(255,85,0,0.14)]"
              />
            </div>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* SPREAD 03: PRODUCTION SCALE & SOVEREIGNTY (Panoramic Centerpiece) */}
        {/* ========================================================================= */}
        <div className="py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          
          {/* Background Watermark Numeral */}
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-display text-[12rem] font-extrabold text-zinc-900/25 select-none pointer-events-none -z-10 leading-none">
            03
          </span>

          {/* Left: Sculpture Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-xs aspect-square flex items-center justify-center">
              <img
                src="/pillar_scale.png"
                alt="Production Sovereignty Sphere"
                className="w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(255,85,0,0.16)]"
              />
            </div>
          </motion.div>

          {/* Right: Rich Editorial Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#FF5500] font-mono text-xs uppercase tracking-widest font-bold">
                Phase 03
              </span>
              <span className="text-zinc-600 text-xs">•</span>
              <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                Production Sovereignty
              </span>
            </div>

            <h3 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              Permanent capability.{' '}
              <span className="text-[#FF5500]">100% Client IP ownership.</span>
            </h3>

            <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mb-8">
              All models, agent graphs, pipelines, and training weights remain 100% your intellectual property. Deployed inside your private cloud (AWS, GCP, Azure, or on-prem) with zero data leakage and enterprise-grade telemetry.
            </p>

            {/* Spec Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-900 text-left">
              <div>
                <p className="font-mono text-[11px] text-[#FF5500] font-bold uppercase tracking-wider mb-1">
                  Security
                </p>
                <p className="font-sans text-xs text-zinc-300">
                  Zero Telemetry Leakage
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] text-[#FF5500] font-bold uppercase tracking-wider mb-1">
                  Integration
                </p>
                <p className="font-sans text-xs text-zinc-300">
                  Salesforce, ERP & Custom APIs
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] text-[#FF5500] font-bold uppercase tracking-wider mb-1">
                  Ownership
                </p>
                <p className="font-sans text-xs text-zinc-300">
                  100% Private Cloud IP
                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
