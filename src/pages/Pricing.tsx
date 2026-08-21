import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { USIntakeCTA } from '../components/us/USIntakeCTA';

export function Pricing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tiers = [
    {
      kicker: "STEP 1 // 2-WEEK SPRINT",
      title: "AI Roadmap & Prototype",
      subtitle: "We find your biggest time-wasters, map out your systems, and build a working test prototype for your team.",
      highlight: "2 Weeks Flat",
      deliverables: [
        "Full review of your daily business workflows and bottlenecks",
        "Clear, step-by-step plan showing where AI will save you time and money",
        "Data security check so your company data stays 100% private and safe",
        "A working test prototype built specifically for your team to try out",
        "Simple roadmap with exact timelines and expected cost savings"
      ],
      ctaText: "Book Your 2-Week Sprint",
      isHero: false
    },
    {
      kicker: "STEP 2 // FULL BUILD & LAUNCH",
      title: "Custom AI Build & Launch",
      subtitle: "Our senior engineers build, test, and launch custom AI systems directly inside your company's private tools.",
      highlight: "Built in 2-Week Milestones",
      deliverables: [
        "Dedicated senior engineers working directly on your business (no juniors)",
        "Custom AI agents plugged directly into your CRM, Slack, database, and email",
        "Runs privately in your own cloud (AWS, Azure, GCP)—zero data leaks",
        "You own 100% of the code, data, and models forever (zero lock-in)",
        "24/7 monitoring, speed tuning, and automatic error fixes",
        "Full hands-on training so your team knows how to use it on day one"
      ],
      ctaText: "Start Your Custom Build",
      isHero: true
    }
  ];

  const realities = [
    {
      title: "Hiring In-House",
      cost: "$200,000+ / year per engineer",
      timeline: "3 to 6 months to hire",
      reality: "Expensive salaries, high recruiting fees, and long hiring delays before anyone writes a single line of code."
    },
    {
      title: "Big Consulting Agencies",
      cost: "$25,000+ / month retainers",
      timeline: "4 to 6 months of meetings",
      reality: "You pay junior analysts to make 200-page slide decks instead of actually building working software for you."
    },
    {
      title: "Working With Us",
      cost: "Clear 2-week sprints",
      timeline: "Working software in 14 days",
      reality: "Senior engineers build and launch real AI tools directly into your systems. You own all the code."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-36 sm:pt-44 pb-28 relative overflow-hidden font-sans selection:bg-[#FF5500] selection:text-black">
      
      {/* Cinematic Saturn Atmospheric Backdrop */}
      <div className="absolute top-0 left-0 right-0 h-[600px] sm:h-[680px] overflow-hidden pointer-events-none z-0">
        <video
          src="/saturn_loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center opacity-40 brightness-95 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/75 to-black pointer-events-none" />
      </div>

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-[#FF5500]/10 rounded-full blur-[280px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10 w-full">
        
        {/* ======================================================================= */}
        {/* 1. HERO: SIMPLE, PLAIN-ENGLISH PRICING */}
        {/* ======================================================================= */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-24">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF5500] font-bold mb-4">
            // SIMPLE, FIXED PRICING
          </p>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-black tracking-tight text-white leading-[1.12] max-w-5xl mx-auto mb-6">
            Custom AI software built in 2-week sprints. <br className="hidden md:inline" />
            <span className="text-[#FF5500]">You own 100% of the code.</span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg font-sans leading-relaxed max-w-2xl mx-auto">
            No endless hourly billing. No 50-page slide decks. We build, test, and launch working AI tools that solve real bottlenecks for your business.
          </p>
        </div>

        {/* ======================================================================= */}
        {/* 2. THE 2 SIMPLE ENGAGEMENT OPTIONS */}
        {/* ======================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-32">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`pt-10 border-t flex flex-col justify-between ${
                tier.isHero
                  ? 'border-[#FF5500]/80'
                  : 'border-zinc-800'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-mono text-xs uppercase tracking-widest font-bold ${
                    tier.isHero ? 'text-[#FF5500]' : 'text-zinc-500'
                  }`}>
                    {tier.kicker}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 font-mono text-[11px] text-zinc-300 font-semibold">
                    {tier.highlight}
                  </span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  {tier.title}
                </h2>

                <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed mb-8">
                  {tier.subtitle}
                </p>

                {/* Deliverables */}
                <div className="space-y-3.5 pt-6 border-t border-zinc-900/80 mb-10">
                  <p className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">
                    WHAT YOU GET
                  </p>
                  {tier.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                        tier.isHero ? 'bg-[#FF5500]' : 'bg-zinc-500'
                      }`} />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-zinc-900/80">
                <button
                  type="button"
                  onClick={() => document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`w-full py-4 rounded-full font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    tier.isHero
                      ? 'bg-[#FF5500] hover:bg-[#FF6E26] text-black shadow-us-pop hover:scale-[1.02] active:scale-98'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ======================================================================= */}
        {/* 3. COMPARISON: TRADITIONAL VS. AIML PARTNER */}
        {/* ======================================================================= */}
        <div className="mb-32">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs text-[#FF5500] uppercase tracking-widest font-bold block mb-3">
              // HONEST COMPARISON
            </span>
            <h3 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.08]">
              Why traditional ways to build AI don't work.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {realities.map((item, rIdx) => (
              <div key={rIdx} className="pt-6 border-t border-zinc-900 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[#FF5500] font-bold">
                      0{rIdx + 1}
                    </span>
                    <span className="font-mono text-xs text-zinc-400 font-semibold">
                      {item.cost}
                    </span>
                  </div>

                  <h4 className="font-display text-xl font-bold text-white tracking-tight mb-2">
                    {item.title}
                  </h4>

                  <p className="font-mono text-xs text-zinc-500 mb-4">
                    Timeline: {item.timeline}
                  </p>

                  <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                    {item.reality}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 4. DIRECT INTAKE & SCHEDULING WIDGET */}
        {/* ======================================================================= */}
        <div id="intake" className="pt-24 border-t border-zinc-900">
          <USIntakeCTA source="Pricing Page" />
        </div>

      </div>
    </div>
  );
}
