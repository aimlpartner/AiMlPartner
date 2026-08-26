import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function AgentStudio() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredAutomations = [
    {
      id: '01',
      tag: 'SALES & GROWTH',
      title: 'Inbound Lead Qualification',
      subtitle: 'Respond to leads in <60s and book calls automatically.',
      desc: 'We capture inbound leads from your website, enrich their company data, and draft a personalized response instantly. Never lose a deal to slow follow-up again.',
      image: '/blueprint_sovereignty.jpg',
      link: '/services/sales-ai',
      specs: [
        { label: 'METRIC', val: 'Sub-60s Response' },
        { label: 'IMPACT', val: '15+ Hours Saved/Wk' },
        { label: 'TOOLS', val: 'HubSpot, Cal.com' }
      ]
    },
    {
      id: '02',
      tag: 'CUSTOMER EXPERIENCE',
      title: '24/7 Verified Support Agent',
      subtitle: 'Resolve repetitive tickets using your private documents.',
      desc: 'Cut customer wait times to zero. This agent answers questions accurately using strictly your SOPs and PDFs, routing tricky issues to human staff automatically.',
      image: '/blueprint_pods.jpg',
      link: '/services/customer-agents',
      specs: [
        { label: 'METRIC', val: '70% Ticket Deflection' },
        { label: 'IMPACT', val: 'Instant 24/7 Replies' },
        { label: 'TOOLS', val: 'Zendesk, Intercom' }
      ]
    },
    {
      id: '03',
      tag: 'BACK-OFFICE & ADMIN',
      title: 'Invoice Automation Pipeline',
      subtitle: 'Extract data and sync accounting with zero copy-pasting.',
      desc: 'Eliminate manual data entry. Invoices and receipts are automatically parsed, checked for discrepancies, and matched directly into your accounting software.',
      image: '/blueprint_audit.jpg',
      link: '/services/operations-automation',
      specs: [
        { label: 'METRIC', val: '100% Data Accuracy' },
        { label: 'IMPACT', val: '$4k+ Saved Monthly' },
        { label: 'TOOLS', val: 'QuickBooks, Xero' }
      ]
    }
  ];

  const directoryAgents = [
    { 
      num: "04", 
      title: "Internal Knowledge Search", 
      category: "Operations",
      desc: "Instantly search across your team's SOPs, employee handbooks, and internal wikis with pinpoint citations.", 
      link: "/services/customer-agents" 
    },
    { 
      num: "05", 
      title: "Invoice & Receipt Parsing", 
      category: "Finance",
      desc: "Extract line items, tax IDs, and totals from PDF invoices and sync directly to QuickBooks or Xero without typos.", 
      link: "/services/operations-automation" 
    },
    { 
      num: "06", 
      title: "Lead Intelligence & Scoring", 
      category: "Sales",
      desc: "Automatically look up company headcounts, estimated revenues, and LinkedIn profiles for every new signup.", 
      link: "/services/sales-ai" 
    },
    { 
      num: "07", 
      title: "Client Onboarding Coordinator", 
      category: "Client Success",
      desc: "Guide new clients through intake forms, send automated checklist reminders, and set up shared folders.", 
      link: "/services/operations-automation" 
    },
    { 
      num: "08", 
      title: "Proposal & Quote Generator", 
      category: "Sales",
      desc: "Turn notes or recorded call transcripts into branded, client-ready pricing proposals in under 2 minutes.", 
      link: "/services/sales-ai" 
    },
    { 
      num: "09", 
      title: "Custom Private AI System", 
      category: "Engineering",
      desc: "Tailored AI software built from scratch and deployed in your own private cloud account with 100% code ownership.", 
      link: "/services/custom-engineering" 
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-black font-sans">
      <SEO 
        title="Agent Studio" 
        description="Explore our pre-engineered AI automations and agents customized for your sales, customer experience, and back-office needs."
        url="https://aimlpartner.com/agent-studio"
      />
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 right-0 h-[640px] overflow-hidden pointer-events-none z-0">
        <video
          src="/saturn_loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center opacity-30 brightness-95 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/80 to-black pointer-events-none" />
      </div>

      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-[#FF5500]/5 rounded-full blur-[200px] pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-36 sm:pt-44 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col z-10 border-b border-zinc-900">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-mono font-bold block mb-6">
            PRE-BUILT AUTOMATIONS
          </span>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-8">
            Ready-to-use workflows <br className="hidden sm:inline" />
            <span className="text-[#FF5500]">customized for you.</span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed text-balance">
            Explore our pre-engineered automations. We connect them directly into your existing CRM, inbox, and accounting tools so you start saving time immediately. No empty promises.
          </p>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* FLAGSHIP AUTOMATIONS (EDITORIAL LEDGER STYLE - ZERO BOXES) */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-24">
          {featuredAutomations.map((item, idx) => (
            <div
              key={item.id}
              className="py-12 border-b border-zinc-900/60 last:border-b-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative"
            >
              {/* Background Watermark Numeral */}
              <span className="absolute -top-10 left-0 font-display text-[12rem] font-black text-zinc-900/20 select-none pointer-events-none -z-10 leading-none">
                {item.id}
              </span>

              {/* LEFT SIDE: FLOATING TRANSPARENT IMAGE (No Box, No Border) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 flex items-center justify-center relative"
              >
                <div className="relative w-full max-w-md flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(255,85,0,0.1)] transition-transform duration-700 hover:scale-105"
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
                    {item.tag}
                  </span>
                </div>

                {/* Main Headline */}
                <h3 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-3">
                  {item.title}
                </h3>

                {/* Subtitle */}
                <p className="font-sans text-base sm:text-lg text-[#FF5500] font-medium mb-6 leading-snug">
                  {item.subtitle}
                </p>

                {/* Detailed Description */}
                <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mb-8">
                  {item.desc}
                </p>

                {/* Specs Ledger */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-900 text-left mb-10">
                  {item.specs.map((spec, sIdx) => (
                    <div key={sIdx}>
                      <p className="font-mono text-[11px] text-[#FF5500] font-bold uppercase tracking-wider mb-1">
                        {spec.label}
                      </p>
                      <p className="font-sans text-sm text-zinc-200 font-semibold">
                        {spec.val}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <div>
                  <Link
                    to={item.link}
                    className="inline-flex items-center gap-2 text-[#FF5500] hover:text-white font-mono text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    <span>View Automation</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DIRECTORY LEDGER (CLEAN LIST - ZERO CARDS) */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-mono font-bold block mb-4">
            THE DIRECTORY
          </span>
        <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            More specialized workflows.
          </h2>
        </div>

        <div className="flex flex-col border-t border-zinc-900">
          {directoryAgents.map((agent, i) => (
            <Link
              key={i}
              to={agent.link}
              className="group py-8 border-b border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-zinc-950/50 transition-colors px-4 -mx-4 rounded-none"
            >
              <div className="flex items-start gap-8 md:w-2/3">
                <span className="text-sm font-mono text-zinc-600 font-bold hidden sm:block pt-1">
                  {agent.num}
                </span>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono text-[#FF5500] font-bold uppercase tracking-widest">
                      {agent.category}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-[#FF5500] transition-colors mb-2">
                    {agent.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
                    {agent.desc}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center text-[#FF5500] md:w-1/3 justify-end">
                <span className="text-xs font-mono font-bold uppercase tracking-widest group-hover:-translate-x-2 transition-transform">
                  Learn More
                </span>
                <ArrowUpRight size={16} className="ml-2 group-hover:scale-110 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* HIGH IMPACT DISCOVERY CTA (MINIMAL) */}
      {/* ========================================================================= */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-4xl mx-auto text-center border-t border-zinc-900">
        <span className="text-xs font-mono font-bold text-[#FF5500] uppercase tracking-[0.25em] block mb-6">
          BUILD YOUR OWN
        </span>
        <h2 className="text-4xl sm:text-6xl font-display font-black text-white mb-6 tracking-tight leading-[1.1]">
          Have a unique bottleneck?
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Tell us which manual task is eating up your team's time. We will design and build a custom automation that plugs directly into your existing stack.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/#intake"
            className="px-8 py-4 rounded-none bg-[#FF5500] hover:bg-white text-black font-extrabold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
          >
            <span>Book a Discovery Call</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}
