import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ShieldCheck, Sparkles, Terminal, Cpu, Radio, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/SEO';

export function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const team = [
    {
      name: "Robert Molnar",
      initials: "RM",
      image: "/team_robert.jpg",
      role: "Business Operations & Revenue",
      bio: "Builds the business engine behind every AI system we deploy. Figures out where you're bleeding money, then designs the revenue model that actually scales.",
      specialties: ["Revenue Strategy", "Go-to-Market", "Unit Economics"]
    },
    {
      name: "Rich Miró",
      initials: "RI",
      image: "/team_rich.jpg",
      role: "Brand & Product Media",
      bio: "Makes complex AI systems look simple and compelling. Turns technical capabilities into stories that executives, investors, and customers actually understand.",
      specialties: ["Product Media", "Brand Strategy", "Executive Comms"]
    },
    {
      name: "Deepak Porwal",
      initials: "DP",
      image: "/team_deepak.jpg",
      role: "Strategy & Go-to-Market",
      bio: "Finds your ideal customer, designs the offer, and runs fast experiments to prove it works. Connects your real business problems to the AI solutions that solve them.",
      specialties: ["Customer Research", "Offer Design", "Sprint Planning"]
    },
    {
      name: "Anand M",
      initials: "AM",
      image: "/team_anand.jpg",
      role: "CRM & Enterprise AI",
      bio: "Connects AI directly into your Salesforce, HubSpot, or custom CRM — without breaking your existing setup or exposing customer data.",
      specialties: ["CRM Integration", "Salesforce / HubSpot", "Data Security"]
    },
    {
      name: "Manu Singh",
      initials: "MS",
      image: "/team_manu.jpg",
      role: "AI Engineering & Infrastructure",
      bio: "Builds the AI brains — the agents, the knowledge bases, the infrastructure that runs on your own servers. Everything stays private, everything works reliably.",
      specialties: ["AI Agents", "Private Infrastructure", "Knowledge Systems"]
    },
    {
      name: "Garvit Bansal",
      initials: "GB",
      image: "/team_garvit.jpg",
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
      <SEO 
        title="About Us" 
        description="Meet the senior engineers behind AIMLPartner. We build custom AI software that replaces manual work, based in Bedminster, NJ."
        url="https://aimlpartner.com/about-us"
      />
      
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/90 to-black pointer-events-none" />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#FF5500]/5 rounded-full blur-[250px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* SECTION 1: WHAT WE ACTUALLY DO (THE SILENT SALESPERSON) */}
      {/* ========================================================================= */}
      <section className="pt-36 sm:pt-48 pb-24 px-6 md:px-16 max-w-7xl mx-auto relative z-10">
        <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-mono font-bold mb-6">
          WHAT WE ACTUALLY DO
        </p>
        <h1 className="font-display text-4xl sm:text-6xl md:text-[5rem] font-black tracking-tight text-white leading-[1.05] mb-10 max-w-5xl">
          We build custom software that <br className="hidden md:block" />
          <span className="text-[#FF5500]">replaces manual work.</span>
        </h1>
        <p className="font-sans text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-3xl mb-24 text-balance">
          We are a private AI engineering firm. We do not sell consulting retainers, and we do not sell generic SaaS subscriptions. We build tailored automation systems that plug directly into your existing business, saving your team dozens of hours a week.
        </p>

        {/* 3 Step Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 border-t border-zinc-900 pt-16">
          <div>
            <p className="font-mono text-xs text-[#FF5500] font-bold tracking-widest uppercase mb-5">01 // The Audit</p>
            <h3 className="font-display text-3xl font-bold text-white mb-4">Find the bleeding.</h3>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">We look at your operations to find exactly where your team is wasting time on data entry, repetitive emails, and manual copy-pasting. We calculate the exact dollar cost of that wasted time.</p>
          </div>
          <div>
            <p className="font-mono text-xs text-[#FF5500] font-bold tracking-widest uppercase mb-5">02 // The Build</p>
            <h3 className="font-display text-3xl font-bold text-white mb-4">Engineer the fix.</h3>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">Our senior engineers build a custom AI automation that handles that specific task. It connects directly to your existing CRM, inbox, and databases so it fits your exact workflow.</p>
          </div>
          <div>
            <p className="font-mono text-xs text-[#FF5500] font-bold tracking-widest uppercase mb-5">03 // The Handoff</p>
            <h3 className="font-display text-3xl font-bold text-white mb-4">You own it forever.</h3>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">We deploy the system on your own servers. You own 100% of the code. There are no monthly SaaS licenses to pay us. You simply stop paying for the manual labor.</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: THE TRAP (WHY WE EXIST) */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-zinc-900/80 relative z-10">
        
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-mono font-bold mb-4">
            WHY WE EXIST
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.08] max-w-4xl text-balance">
            Most companies pay for AI <br className="hidden sm:block" />
            <span className="text-zinc-500">and get nothing back.</span>
          </h2>
        </div>

        {/* 3-Column Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Column 1 */}
          <div className="flex flex-col justify-between pt-8 border-t border-zinc-900">
            <div>
              <p className="text-xs text-zinc-500 uppercase font-mono tracking-widest font-bold mb-4">
                The Consulting Trap
              </p>
              <h3 className="font-display text-2xl font-bold text-zinc-300 tracking-tight mb-4">
                Expensive Slide Decks
              </h3>
              <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-8">
                Big firms charge six figures for a roadmap that sits in a drawer. Months of meetings, zero working software, and a bill that keeps growing.
              </p>
            </div>
            <div className="pt-6 border-t border-zinc-900/80 text-xs text-zinc-500 space-y-2 font-mono">
              <p><span className="text-zinc-600">Timeline:</span> 4 to 6 Months</p>
              <p><span className="text-zinc-600">What You Get:</span> A PDF Report</p>
              <p><span className="text-zinc-600">Real ROI:</span> $0</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col justify-between pt-8 border-t border-zinc-900">
            <div>
              <p className="text-xs text-amber-500/80 uppercase font-mono tracking-widest font-bold mb-4">
                The SaaS Trap
              </p>
              <h3 className="font-display text-2xl font-bold text-zinc-300 tracking-tight mb-4">
                Generic AI Tools
              </h3>
              <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-8">
                Off-the-shelf AI tools that look good in a demo but crumble under real workload. Your data goes to their servers. You never truly own anything.
              </p>
            </div>
            <div className="pt-6 border-t border-zinc-900/80 text-xs text-zinc-500 space-y-2 font-mono">
              <p><span className="text-zinc-600">Your Data:</span> Exposed on 3rd-Party Server</p>
              <p><span className="text-zinc-600">Customization:</span> Very Limited</p>
              <p><span className="text-zinc-600">Ownership:</span> 0% (Vendor Controls It)</p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col justify-between pt-8 border-t border-[#FF5500]/40">
            <div>
              <p className="text-xs text-[#FF5500] uppercase font-mono tracking-widest font-bold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
                The AIML Partner Way
              </p>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight mb-4">
                Custom Built For You
              </h3>
              <p className="font-sans text-sm text-zinc-300 leading-relaxed mb-8">
                Senior engineers build AI systems directly inside your business. Custom-fit to how you actually work. Runs on your own servers. You own everything.
              </p>
            </div>
            <div className="pt-6 border-t border-[#FF5500]/20 text-xs text-zinc-300 space-y-2 font-mono font-medium">
              <p><span className="text-zinc-500">Timeline:</span> <span className="text-[#FF5500]">14-Day Sprints</span></p>
              <p><span className="text-zinc-500">Your Data:</span> Stays 100% on Your Servers</p>
              <p><span className="text-zinc-500">Ownership:</span> <span className="text-[#FF5500]">100% Yours Forever</span></p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: THE TEAM (THE BUILDERS - FUTURISTIC COCKPIT LIST CARDS) */}
      {/* ========================================================================= */}
      <section id="crew" className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-zinc-900/80">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-ping" />
              <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-mono font-bold">
                SYSTEM ROSTER // 06 SENIOR ARCHITECTS
              </p>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
              Senior builders only. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-600 to-zinc-700">No filler.</span>
            </h2>
          </div>

          <div className="max-w-md space-y-3">
            <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed">
              You work directly with the engineers who actually design, build, and deploy your custom AI infrastructure. No account reps. No middlemen.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 pt-2 border-t border-zinc-900">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <ShieldCheck size={14} className="text-[#FF5500]" /> 100% In-House Engineers
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Radio size={14} className="text-[#FF5500]" /> Bedminster, NJ HQ
              </span>
            </div>
          </div>
        </div>

        {/* The Sleek Minimal List Cards */}
        <div className="flex flex-col gap-4">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-[#FF5500]/40 backdrop-blur-2xl transition-all duration-500 overflow-hidden hover:shadow-[0_0_35px_rgba(255,85,0,0.12)] p-6 sm:p-7"
            >
              {/* Background Layer 1: Subtle Tech Dot Grid Matrix */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Background Layer 2: Saturn Ambient Glow Orb */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#FF5500]/[0.06] rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF5500]/[0.15] transition-all duration-700" />
              
              {/* Background Layer 3: Glass Sheen Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF5500]/[0.05] via-transparent to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Left Active Accent Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-transparent group-hover:bg-[#FF5500] transition-colors duration-300" />

              {/* Robust CSS Grid for Clean Alignment (No Overlaps) */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                
                {/* Column 1: Index + Portrait + Name + Role (5 cols) */}
                <div className="lg:col-span-5 flex items-center gap-5">
                  {/* Subtle Minimal Index */}
                  <span className="font-mono text-xs font-bold text-zinc-600 group-hover:text-[#FF5500] transition-colors shrink-0 w-7">
                    0{idx + 1}
                  </span>

                  {/* Clean Framed Avatar */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-zinc-900/90 overflow-hidden border border-white/10 group-hover:border-[#FF5500]/40 transition-all duration-500 shrink-0 shadow-lg relative">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
                  </div>

                  {/* Name & Role (Stacked neatly, never overflowing) */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#FF5500] transition-colors duration-300 truncate">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 group-hover:text-zinc-300 transition-colors mt-1 truncate">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Column 2: Bio (4 cols) */}
                <div className="lg:col-span-4">
                  <p className="font-sans text-sm text-zinc-400 group-hover:text-zinc-200 leading-relaxed transition-colors duration-300">
                    {member.bio}
                  </p>
                </div>

                {/* Column 3: Capabilities (3 cols) */}
                <div className="lg:col-span-3 flex flex-wrap lg:justify-end gap-2">
                  {member.specialties.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-200 font-semibold uppercase tracking-wider bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/[0.06] group-hover:border-[#FF5500]/30 transition-all duration-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>



      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: OPERATING PRINCIPLES */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-zinc-900">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-mono font-bold mb-4">
              HOW WE WORK
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.05]">
              Rules we never <br />
              <span className="text-[#FF5500]">break.</span>
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
            These aren't marketing promises. They're the non-negotiable standards behind every project we take on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-28">
          {principles.map((p, idx) => (
            <div key={idx} className="pt-8 border-t border-zinc-900 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#FF5500] font-mono font-bold mb-4">
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

        {/* BOTTOM CTA */}
        <div className="pt-16 border-t border-zinc-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-mono font-bold">
              Bedminster, NJ HQ · Serving Clients Nationwide
            </p>
            <h4 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight leading-snug">
              Let's talk about what AI can actually do for your business.
            </h4>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
            <Link
              to="/#intake"
              className="w-full sm:w-auto px-8 py-4 rounded-none bg-[#FF5500] hover:bg-white text-black font-display font-black text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              <span>Schedule a Call</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

      </section>

    </div>
  );
}
