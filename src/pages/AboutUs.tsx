import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function AboutUs() {
  const team = [
    {
      name: "Robert Molnar",
      initials: "RM",
      role: "Business Operations & Revenue",
      bio: "Builds the business engine behind every AI system we deploy. Figures out where you're bleeding money, then designs the revenue model that actually scales.",
      specialties: ["Revenue Strategy", "Go-to-Market", "Unit Economics"]
    },
    {
      name: "Rich Miró",
      initials: "RI",
      role: "Brand & Product Media",
      bio: "Makes complex AI systems look simple and compelling. Turns technical capabilities into stories that executives, investors, and customers actually understand.",
      specialties: ["Product Media", "Brand Strategy", "Executive Comms"]
    },
    {
      name: "Deepak Porwal",
      initials: "DP",
      role: "Strategy & Go-to-Market",
      bio: "Finds your ideal customer, designs the offer, and runs fast experiments to prove it works. Connects your real business problems to the AI solutions that solve them.",
      specialties: ["Customer Research", "Offer Design", "Sprint Planning"]
    },
    {
      name: "Anand M",
      initials: "AM",
      role: "CRM & Enterprise AI",
      bio: "Connects AI directly into your Salesforce, HubSpot, or custom CRM — without breaking your existing setup or exposing customer data.",
      specialties: ["CRM Integration", "Salesforce / HubSpot", "Data Security"]
    },
    {
      name: "Manu Singh",
      initials: "MS",
      role: "AI Engineering & Infrastructure",
      bio: "Builds the AI brains — the agents, the knowledge bases, the infrastructure that runs on your own servers. Everything stays private, everything works reliably.",
      specialties: ["AI Agents", "Private Infrastructure", "Knowledge Systems"]
    },
    {
      name: "Garvit Bansal",
      initials: "GB",
      role: "Product Engineering & Automation",
      bio: "Builds the tools your team actually uses every day. Connects your databases, automates your workflows, and ships fast without cutting corners.",
      specialties: ["Workflow Automation", "Internal Tools", "Rapid Deployment"]
    }
  ];

  const principles = [
    {
      title: "Built to Last",
      desc: "We don't build demos. We build AI systems that run reliably in production for years — not things that break the moment a consultant leaves."
    },
    {
      title: "You Own Everything",
      desc: "Every AI model, every piece of code, every dataset — it all lives on your servers. You own 100% of it. No vendor lock-in, no third-party data risks."
    },
    {
      title: "Fast, Not Rushed",
      desc: "No 6-month consulting projects that go nowhere. We work in focused 14-day sprints. You see real, measurable results from the first cycle."
    },
    {
      title: "Talk to the Builders",
      desc: "You work directly with the engineers who design and build your systems. No account managers, no junior analysts, no middlemen."
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#FF5500] selection:text-black relative overflow-hidden">
      
      {/* Cinematic Saturn Atmospheric Backdrop */}
      <div className="absolute top-0 left-0 right-0 h-[600px] sm:h-[700px] overflow-hidden pointer-events-none z-0">
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

      {/* Deep Space Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#FF5500]/10 rounded-full blur-[280px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* SECTION 1: WHY WE EXIST */}
      {/* ========================================================================= */}
      <section className="pt-36 sm:pt-48 pb-32 px-6 md:px-16 max-w-7xl mx-auto border-b border-zinc-900/80 relative z-10">
        
        {/* Subtle Category */}
        <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-semibold mb-4">
          // WHY WE EXIST
        </p>

        {/* Monumental Headline */}
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-black tracking-tight text-white leading-[1.08] mb-16 max-w-5xl text-balance">
          Most companies pay for AI <span className="text-[#FF5500]">and get nothing back.</span>
        </h1>

        {/* 3-Column Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-28">
          
          {/* Column 1 */}
          <div className="flex flex-col justify-between pt-8 border-t border-zinc-900">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-3">
                The Consulting Trap
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-300 tracking-tight mb-4">
                Expensive Slide Decks
              </h2>
              <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
                Big firms charge six figures for a roadmap that sits in a drawer. Months of meetings, zero working software, and a bill that keeps growing.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-900/80 text-xs text-zinc-500 space-y-1.5">
              <p><span className="text-zinc-600">Timeline:</span> 4 to 6 Months</p>
              <p><span className="text-zinc-600">What You Get:</span> A PDF Report</p>
              <p><span className="text-zinc-600">Real ROI:</span> $0</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col justify-between pt-8 border-t border-zinc-900">
            <div>
              <p className="text-xs text-amber-500/80 uppercase tracking-wider font-semibold mb-3">
                The SaaS Trap
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-300 tracking-tight mb-4">
                Generic AI Tools
              </h2>
              <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
                Off-the-shelf AI tools that look good in a demo but crumble under real workload. Your data goes to their servers. You never truly own anything.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-900/80 text-xs text-zinc-500 space-y-1.5">
              <p><span className="text-zinc-600">Your Data:</span> On Someone Else's Server</p>
              <p><span className="text-zinc-600">Customization:</span> Very Limited</p>
              <p><span className="text-zinc-600">Ownership:</span> 0% (Vendor Controls It)</p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col justify-between pt-8 border-t border-[#FF5500]/40">
            <div>
              <p className="text-xs text-[#FF5500] uppercase tracking-wider font-bold mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
                The AIML Partner Way
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                Custom AI, Built for You
              </h2>
              <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                Senior engineers build AI systems directly inside your business. Custom-fit to how you actually work. Runs on your own servers. You own everything.
              </p>
            </div>
            <div className="pt-4 border-t border-[#FF5500]/20 text-xs text-zinc-300 space-y-1.5 font-medium">
              <p><span className="text-zinc-500">Timeline:</span> <span className="text-[#FF5500]">14-Day Sprints</span></p>
              <p><span className="text-zinc-500">Your Data:</span> Stays on Your Servers</p>
              <p><span className="text-zinc-500">Ownership:</span> <span className="text-[#FF5500]">100% Yours</span></p>
            </div>
          </div>

        </div>

        {/* Section 1 CTA */}
        <div className="pt-16 border-t border-zinc-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF5500] font-semibold">
              New Jersey & Nationwide
            </p>
            <p className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
              "If your AI can't prove ROI in 30 days, something is wrong."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
            <Link
              to="/#intake"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-us-pop hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Talk to Our Team</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: THE TEAM */}
      {/* ========================================================================= */}
      <section id="crew" className="py-32 px-6 md:px-16 max-w-7xl mx-auto border-b border-zinc-900/80">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-semibold mb-3">
              The Team
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.05]">
              Senior builders only. <br />
              <span className="text-[#FF5500]">No filler.</span>
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
            You work directly with the people who actually build your AI systems. No account managers passing messages. No junior staff learning on your dime.
          </p>
        </div>

        {/* 2-Column Team Roster */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="pt-8 border-t border-zinc-900 group flex flex-col justify-between"
            >
              <div>
                {/* Header: Initials Avatar, Name & Role */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#FF5500] to-[#CC4400] border-2 border-[#FF5500]/30 shrink-0 flex items-center justify-center group-hover:border-[#FF5500]/70 transition-colors shadow-lg shadow-[#FF5500]/10">
                    <span className="text-black font-display font-black text-lg tracking-tight select-none">
                      {member.initials}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white tracking-tight group-hover:text-[#FF5500] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider font-medium mt-0.5">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              {/* Specialties */}
              <div className="pt-4 border-t border-zinc-900/60 flex flex-wrap items-center gap-2">
                {member.specialties.map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs text-zinc-500 font-medium"
                  >
                    {spec} {sIdx < member.specialties.length - 1 && '•'}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Section 2 CTA */}
        <div className="mt-24 pt-16 border-t border-zinc-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF5500] font-semibold mb-2">
              In-Person or Remote
            </p>
            <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Want to meet the team and talk specifics?
            </h4>
          </div>

          <Link
            to="/#intake"
            className="px-8 py-4 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-us-pop hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Book a Call</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: OPERATING PRINCIPLES */}
      {/* ========================================================================= */}
      <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-semibold mb-3">
              How We Work
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.05]">
              Rules we never <br />
              <span className="text-[#FF5500]">break.</span>
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
            These aren't marketing promises. They're the non-negotiable standards behind every project we take on.
          </p>
        </div>

        {/* 4-Column Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-28">
          {principles.map((p, idx) => (
            <div key={idx} className="pt-8 border-t border-zinc-900 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#FF5500] font-mono font-semibold mb-4">
                  0{idx + 1}
                </p>
                <h3 className="font-display text-xl font-bold text-white tracking-tight mb-3">
                  {p.title}
                </h3>
                <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="pt-16 border-t border-zinc-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF5500] font-semibold">
              New Jersey HQ · Serving Clients Nationwide
            </p>
            <h4 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Let's talk about what AI can actually do for your business.
            </h4>
            <p className="font-sans text-sm text-zinc-400 leading-relaxed">
              We meet in person across the Tri-State area and work remotely with teams anywhere in the US.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
            <Link
              to="/#intake"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-us-pop hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule a Call</span>
              <ArrowUpRight size={15} />
            </Link>
            <a
              href="mailto:info@aimlpartner.com"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Email Us</span>
            </a>
          </div>
        </div>

      </section>

    </div>
  );
}
