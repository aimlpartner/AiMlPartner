import React from 'react';
import { motion } from 'motion/react';

export function USPillars() {
  const stages = [
    {
      number: '01',
      stage: 'STEP 1 // AUDIT & PLAN',
      tag: 'LEARNING YOUR BUSINESS',
      title: 'We learn your business & create a clear plan.',
      subtitle: 'We map out your biggest time-wasters before writing code.',
      desc: 'We review your daily operations, identify where your team loses the most time and money, and deliver an exact implementation plan with a fixed price.',
      specs: [
        { label: 'DELIVERABLE', val: 'Clear Automation Roadmap' },
        { label: 'OUTCOME', val: 'Exact Scope & Fixed Price' },
        { label: 'GOAL', val: 'Find Your Biggest Bottlenecks' }
      ],
      image: '/scrolly_stage1.png',
      alt: 'Step 1: Audit & Plan'
    },
    {
      number: '02',
      stage: 'STEP 2 // BUILD & INTEGRATE',
      tag: 'CUSTOM DEVELOPMENT',
      title: 'We build your custom automations.',
      subtitle: 'We connect smart workflows directly to your existing tools.',
      desc: 'Our team builds automations that plug right into your current CRM, databases, and inboxes. We test everything with your real data so it works perfectly from day one.',
      specs: [
        { label: 'SYSTEMS', val: 'Custom Software & Automations' },
        { label: 'INTEGRATION', val: 'Connects to your current tools' },
        { label: 'EFFICIENCY', val: 'Dozens of hours saved weekly' }
      ],
      image: '/scrolly_stage2.png',
      alt: 'Step 2: Build & Integrate'
    },
    {
      number: '03',
      stage: 'STEP 3 // LAUNCH & OWN',
      tag: 'HANDOVER',
      title: 'We launch it. You own it forever.',
      subtitle: '100% intellectual property ownership. No monthly seat licenses.',
      desc: 'We launch the automation into your secure account. You own 100% of the code and intellectual property. No vendor lock-in, and no per-user fees ever.',
      specs: [
        { label: 'PRIVACY', val: '100% Secure & Private' },
        { label: 'OWNERSHIP', val: 'You own all the code' },
        { label: 'FEES', val: 'Zero monthly seat licenses' }
      ],
      image: '/scrolly_stage3.png',
      alt: 'Step 3: Launch & Own'
    }
  ];

  return (
    <section id="pillars" className="py-32 px-6 md:px-16 bg-black text-white border-b border-zinc-900 relative select-none overflow-hidden">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-us-grid opacity-20 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#FF5500]/5 rounded-full blur-[240px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 pb-10 border-b border-zinc-900 gap-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-mono font-bold mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5500] animate-pulse" />
              <span>THE 3-STEP PROCESS</span>
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.04]">
              How it <span className="text-[#FF5500]">works.</span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
            A simple, three-step process to automate your business. We handle the technical heavy lifting so you can focus on growing your company.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3 VISUAL STAGES (ALL IMAGES ON LEFT SIDE, ZERO BOX CONTAINERS) */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-28">
          {stages.map((stage) => (
            <div
              key={stage.number}
              className="py-12 border-b border-zinc-900/60 last:border-b-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative"
            >
              {/* Background Watermark Numeral */}
              <span className="absolute -top-10 left-0 font-display text-[12rem] font-black text-zinc-900/20 select-none pointer-events-none -z-10 leading-none">
                {stage.number}
              </span>

              {/* LEFT SIDE: FLOATING TRANSPARENT IMAGE (No Box, No Border) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 flex items-center justify-center relative"
              >
                <div className="relative w-full max-w-[320px] sm:max-w-md flex items-center justify-center">
                  <img
                    src={stage.image}
                    alt={stage.alt}
                    className="w-full h-auto max-h-[620px] object-contain filter drop-shadow-[0_20px_60px_rgba(255,85,0,0.15)] transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* RIGHT SIDE: EDITORIAL CONTENT */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 flex flex-col justify-center"
              >
                {/* Stage Tag */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[#FF5500] font-mono text-xs uppercase tracking-widest font-bold">
                    {stage.stage}
                  </span>
                  <span className="text-zinc-600 text-xs">•</span>
                  <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                    {stage.tag}
                  </span>
                </div>

                {/* Main Headline */}
                <h3 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-3">
                  {stage.title}
                </h3>

                {/* Subtitle */}
                <p className="font-sans text-base sm:text-lg text-[#FF5500] font-medium mb-6 leading-snug">
                  {stage.subtitle}
                </p>

                {/* Detailed Description */}
                <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mb-8">
                  {stage.desc}
                </p>

                {/* Specs Ledger */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-900 text-left">
                  {stage.specs.map((spec, sIdx) => (
                    <div key={sIdx}>
                      <p className="font-mono text-[11px] text-[#FF5500] font-bold uppercase tracking-wider mb-1">
                        {spec.label}
                      </p>
                      <p className="font-sans text-xs text-zinc-300 font-medium">
                        {spec.val}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* SECTION BOTTOM CTA */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 pt-12 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <span className="font-mono text-xs text-[#FF5500] uppercase tracking-widest font-bold block mb-2">
              ✦ SPRINT CADENCE: 14 DAYS TO PRODUCTION
            </span>
            <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to automate your operations?
            </h4>
          </div>

          <a
            href="#intake"
            className="px-8 py-4 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-us-pop hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Work With Us</span>
            <span className="text-sm">↗</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}

