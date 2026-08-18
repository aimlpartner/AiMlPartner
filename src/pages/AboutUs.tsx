import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function AboutUs() {
  const team = [
    {
      name: "Robert Molnar",
      role: "Business Operations & Revenue Architecture",
      seed: "RobertMolnarBoy",
      bio: "Architects operational systems, revenue modeling, and go-to-market scaling. Focuses on turning complex operational friction into streamlined, high-yield revenue infrastructure.",
      specialties: ["Revenue Modeling", "GTM Scaling", "Unit Economics"]
    },
    {
      name: "Rich Miró",
      role: "Brand & Product Media Architecture",
      seed: "RichMiro",
      bio: "Directs brand identity, high-fidelity product media, and architectural storytelling. Transforms complex autonomous engineering systems into clear, compelling executive narratives.",
      specialties: ["Product Media", "Brand Architecture", "Executive Comms"]
    },
    {
      name: "Deepak Porwal",
      role: "Studio & GTM Architecture",
      seed: "DeepakPorwal",
      bio: "Owns ICP discovery, narrative strategy, offer design, and rapid sprint experiments. Bridges client operational bottlenecks into tangible multi-agent workflows.",
      specialties: ["ICP Discovery", "Sprint Roadmapping", "Offer Design"]
    },
    {
      name: "Anand M",
      role: "Enterprise CRM & AI Architecture",
      seed: "AnandM",
      bio: "Architects enterprise data model touchpoints and deep integrations across Salesforce, HubSpot, and proprietary CRM platforms with zero data leakage.",
      specialties: ["CRM Data Models", "Salesforce / HubSpot", "SOC2 Pipelines"]
    },
    {
      name: "Manu Singh",
      role: "AI & Automation Architecture / Fullstack",
      seed: "ManuSingh",
      bio: "Designs autonomous multi-agent orchestration graphs, deterministic RAG pipelines, and private VPC infrastructure with strict error boundaries.",
      specialties: ["Multi-Agent Graphs", "Private VPC RAG", "Deterministic Pipelines"]
    },
    {
      name: "Garvit Bansal",
      role: "Low-Code & Product Fullstack AI Architecture",
      seed: "GarvitBansal",
      bio: "Builds low-code workflow pods, internal tooling bridges, and real-time database connectors, accelerating deployment cycles without sacrificing enterprise rigor.",
      specialties: ["n8n Workflow Pods", "Database Connectors", "Rapid Prototyping"]
    }
  ];

  const principles = [
    {
      title: "Permanence Over Hype",
      desc: "We don't build transient demos or marketing novelties. We engineer resilient autonomous infrastructure designed to execute predictably in high-stakes production for years."
    },
    {
      title: "Absolute IP Sovereignty",
      desc: "Every fine-tuned model weight, vector pipeline, and line of code is deployed directly inside your private VPC. You own 100% of the intellectual property with zero third-party data retention."
    },
    {
      title: "Speed as a Discipline",
      desc: "We reject open-ended 6-month consulting engagements. Our work is delivered in focused 14-day outcome sprints with measurable production benchmarks from day one."
    },
    {
      title: "Direct Engineer Access",
      desc: "You will never be managed through junior analysts or account managers. You collaborate directly with the senior architects who design, code, and secure your systems."
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#FF5500] selection:text-black relative overflow-hidden">
      
      {/* Deep Space Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#FF5500]/5 rounded-full blur-[280px] pointer-events-none -z-10" />
      <div className="absolute top-[1200px] right-0 w-[600px] h-[600px] bg-amber-600/4 rounded-full blur-[260px] pointer-events-none -z-10" />
      <div className="absolute top-[2400px] left-0 w-[500px] h-[500px] bg-[#FF5500]/4 rounded-full blur-[240px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* SECTION 1: THE FOUNDING ESSAY (NATURAL & HUMAN EDITORIAL) */}
      {/* ========================================================================= */}
      <section className="pt-36 sm:pt-48 pb-32 px-6 md:px-16 max-w-7xl mx-auto border-b border-zinc-900/80">
        
        {/* Subtle Category */}
        <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-semibold mb-6">
          THE FOUNDING ESSAY
        </p>

        {/* Monumental Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.98] mb-24 max-w-5xl">
          We got tired of watching AI get sold as <span className="text-[#FF5500]">theater.</span>
        </h1>

        {/* 3-Column Pure Editorial Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-28">
          
          {/* Column 1 */}
          <div className="flex flex-col justify-between pt-8 border-t border-zinc-900">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-3">
                The Consultancy Model
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-300 tracking-tight mb-4">
                The Slide Deck Mirage
              </h2>
              <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
                Enterprise leaders are billed hundreds of thousands for multi-month roadmaps produced by junior analysts who have never shipped production software.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-900/80 text-xs text-zinc-500 space-y-1.5">
              <p><span className="text-zinc-600">Timeline:</span> 4 to 6 Months</p>
              <p><span className="text-zinc-600">Delivery:</span> Static PDF (Zero Code)</p>
              <p><span className="text-zinc-600">Outcome:</span> $0 Realized ROI</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col justify-between pt-8 border-t border-zinc-900">
            <div>
              <p className="text-xs text-amber-500/80 uppercase tracking-wider font-semibold mb-3">
                The SaaS Wrapper
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-300 tracking-tight mb-4">
                Leaky Third-Party Clouds
              </h2>
              <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed mb-6">
                Generic API wrappers and closed clouds that collapse under real customer volume—exposing sensitive company data to third-party servers with zero IP custody.
              </p>
            </div>
            <div className="pt-4 border-t border-zinc-900/80 text-xs text-zinc-500 space-y-1.5">
              <p><span className="text-zinc-600">Data Privacy:</span> External Cloud Risk</p>
              <p><span className="text-zinc-600">Architecture:</span> Fragile Generic APIs</p>
              <p><span className="text-zinc-600">IP Custody:</span> 0% (Vendor Locked)</p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col justify-between pt-8 border-t border-[#FF5500]/40">
            <div>
              <p className="text-xs text-[#FF5500] uppercase tracking-wider font-bold mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
                The Sovereign Pod
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                Private Cloud Engineering
              </h2>
              <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                Senior applied architects embedded directly in your organization. We engineer deterministic multi-agent graphs and fine-tuned models live in your private VPC.
              </p>
            </div>
            <div className="pt-4 border-t border-[#FF5500]/20 text-xs text-zinc-300 space-y-1.5 font-medium">
              <p><span className="text-zinc-500">Sprint Cadence:</span> <span className="text-[#FF5500]">14-Day Delivery</span></p>
              <p><span className="text-zinc-500">Security Perimeter:</span> 100% Private VPC</p>
              <p><span className="text-zinc-500">IP & Weights:</span> <span className="text-[#FF5500]">100% Client Ownership</span></p>
            </div>
          </div>

        </div>

        {/* Section 1 Directive & Action */}
        <div className="pt-16 border-t border-zinc-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF5500] font-semibold">
              New Jersey & Tri-State Corridor
            </p>
            <p className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
              "If an AI system cannot prove measurable ROI in production within 30 days, it has no place in your enterprise."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
            <Link
              to="/#intake"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-us-pop hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Scope Your AI Pod</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: THE OPERATORS & ARCHITECTS (WITH NATURAL AVATARS) */}
      {/* ========================================================================= */}
      <section id="crew" className="py-32 px-6 md:px-16 max-w-7xl mx-auto border-b border-zinc-900/80">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-semibold mb-3">
              The Engineering Team
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.05]">
              Senior architects. <br />
              <span className="text-[#FF5500]">Zero junior bloat.</span>
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
            You collaborate directly with the engineers who write the algorithms, orchestrate the multi-agent graphs, and secure the VPC perimeter. No account managers. No middle layers.
          </p>
        </div>

        {/* 2-Column Clean Editorial Roster with Real Avatars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="pt-8 border-t border-zinc-900 group flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name & Role */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-900/80 border border-zinc-800 shrink-0 p-1 group-hover:border-[#FF5500]/50 transition-colors">
                    <img
                      src={`https://api.dicebear.com/8.x/notionists/svg?seed=${member.seed}&backgroundColor=transparent`}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
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

                {/* Bio Narrative */}
                <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              {/* Specialties List */}
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

        {/* Section 2 Direct Whiteboard CTA */}
        <div className="mt-24 pt-16 border-t border-zinc-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF5500] font-semibold mb-2">
              On-Site & Virtual Discovery
            </p>
            <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to whiteboard your private architecture?
            </h4>
          </div>

          <Link
            to="/#intake"
            className="px-8 py-4 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-us-pop hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Book Technical Briefing</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: OPERATING PRINCIPLES & LOCAL PRESENCE (100% CARDLESS) */}
      {/* ========================================================================= */}
      <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-semibold mb-3">
              Operating Principles
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.05]">
              The standards we refuse <br />
              <span className="text-[#FF5500]">to compromise.</span>
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
            We founded AIML Partner with non-negotiable architectural convictions. These govern every line of code we write and every private VPC we secure.
          </p>
        </div>

        {/* 4-Column Editorial Principles */}
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

        {/* Localized Presence & Executive Booking Banner */}
        <div className="pt-16 border-t border-zinc-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#FF5500] font-semibold">
              New Jersey Headquarters & Nationwide Deployments
            </p>
            <h4 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Direct architectural collaboration. In person or virtual.
            </h4>
            <p className="font-sans text-sm text-zinc-400 leading-relaxed">
              We conduct on-site whiteboarding sessions across Princeton, Jersey City, Newark, and the broader Tri-State corridor, while deploying sovereign AI pods for enterprises nationwide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
            <Link
              to="/#intake"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-us-pop hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule Technical Briefing</span>
              <ArrowUpRight size={15} />
            </Link>
            <a
              href="mailto:info@aimlpartner.com"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Email Founders</span>
            </a>
          </div>
        </div>

      </section>

    </div>
  );
}
