import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Bot, Zap, Shield, Workflow, Database, LineChart, Users, MessageSquare, Clock, Globe, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AgentStudio() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredAgents = [
    {
      icon: <Bot className="text-[#FF5500]" size={24} />,
      title: "AI Sales & Qualification Agent",
      desc: "Qualify inbound prospects in under 60 seconds, enrich CRM lead records, and automatically draft tailored follow-up messages 24/7.",
      colSpan: "md:col-span-8",
      friction: "Sales reps spend 12+ hours weekly manually researching and entering leads",
      architecture: "Inbound Lead -> Automated CRM Enrichment -> Instant Sub-60s Text/Email Response",
      link: "/services/sales-ai"
    },
    {
      icon: <Zap className="text-emerald-400" size={24} />,
      title: "24/7 Support Agent",
      desc: "Answer customer questions instantly from your private documents, check live order statuses, and route complex edge cases straight to your human team.",
      colSpan: "md:col-span-4",
      friction: "Support ticket backlogs causing delayed customer replies",
      architecture: "Private Docs RAG -> Zero-Hallucination Answers",
      link: "/services/customer-agents"
    },
    {
      icon: <Shield className="text-[#FF5500]" size={24} />,
      title: "Back-Office Workflow Coordinator",
      desc: "Extract data from incoming invoices, match packing slips, update databases, and notify accounting with zero human copy-pasting.",
      colSpan: "md:col-span-12",
      friction: "Teams spend hours manually transcribing invoices and spreadsheets",
      architecture: "Document OCR -> Validation Logic -> Instant Multi-Database Sync",
      link: "/services/operations-automation"
    }
  ];

  const directoryAgents = [
    { num: "01/", icon: <Workflow size={18} />, title: "Private Knowledge Search", desc: "Instantly scan internal SOPs, contracts, and wikis with zero data hallucinations.", link: "/services/customer-agents" },
    { num: "02/", icon: <Database size={18} />, title: "Invoice & Billing Extractor", desc: "Automate invoice OCR, line-item matching, and QuickBooks/Xero ledger sync.", link: "/services/operations-automation" },
    { num: "03/", icon: <LineChart size={18} />, title: "CRM Enrichment Worker", desc: "Auto-fill missing company data, revenue estimates, and decision-maker contacts.", link: "/services/sales-ai" },
    { num: "04/", icon: <Users size={18} />, title: "Client Onboarding Assistant", desc: "Guide new accounts through intake forms, send automated checklist nudges, and set up workspaces.", link: "/services/operations-automation" },
    { num: "05/", icon: <MessageSquare size={18} />, title: "Proposal & Quote Builder", desc: "Generate custom, brand-compliant pricing proposals from sales call transcripts in 1 click.", link: "/services/sales-ai" },
    { num: "06/", icon: <Globe size={18} />, title: "Private Cloud Custom LLM", desc: "Host open-source models inside your secure VPC with 100% data ownership.", link: "/services/custom-engineering" }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-black font-sans">
      {/* Ambient Cosmic Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#FF5500]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-[1200px] mx-auto text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl mx-auto flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-widest text-[#FF5500] font-mono font-bold block">
            // PRE-BUILT AGENT BLUEPRINTS
          </span>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.05]">
            Custom AI agents <br className="hidden sm:inline" />
            <span className="text-[#FF5500]">engineered for real work.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Explore our library of production-tested AI worker blueprints. We customize, integrate, and deploy these systems directly into your existing software tools with 100% code ownership.
          </p>
        </motion.div>
      </section>

      {/* Featured Blueprints Bento Grid */}
      <section className="py-16 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold text-[#FF5500] uppercase tracking-widest block mb-2">
            // CORE WORKER BLUEPRINTS
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white">Production-Ready Templates</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {featuredAgents.map((agent, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${agent.colSpan} bg-zinc-950 border border-zinc-800 hover:border-[#FF5500]/50 rounded-3xl p-8 md:p-10 flex flex-col justify-between transition-all duration-300 relative overflow-hidden text-left`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-black border border-zinc-800 rounded-xl">
                    {agent.icon}
                  </div>
                  <Link
                    to={agent.link}
                    className="text-xs font-mono text-[#FF5500] hover:text-white flex items-center gap-1 font-bold"
                  >
                    <span>View Track</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white">{agent.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mt-2">{agent.desc}</p>
                </div>

                <div className="pt-4 border-t border-zinc-900 space-y-2 text-xs font-mono">
                  <div className="text-zinc-500">
                    <span className="text-red-400 font-bold">Bottleneck:</span> {agent.friction}
                  </div>
                  <div className="text-zinc-500">
                    <span className="text-[#FF5500] font-bold">Pipeline:</span> {agent.architecture}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-between items-center">
                <Link
                  to={agent.link}
                  className="bg-[#FF5500] hover:bg-[#FF6E26] text-black text-xs font-extrabold uppercase tracking-wider py-3 px-6 rounded-xl shadow-us-pop hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span>Explore Blueprint</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Directory of Additional Blueprints */}
      <section className="py-20 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold text-[#FF5500] uppercase tracking-widest block mb-2">
            // SPECIALIZED WORKERS
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white">Full Blueprint Directory</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {directoryAgents.map((agent, i) => (
            <Link
              key={i}
              to={agent.link}
              className="bg-zinc-950 border border-zinc-800 hover:border-[#FF5500]/50 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between text-left group"
            >
              <div>
                <div className="flex items-center justify-between text-zinc-500 text-xs font-mono mb-4">
                  <span>{agent.num}</span>
                  <div className="text-[#FF5500]">{agent.icon}</div>
                </div>
                <h4 className="text-lg font-black text-white group-hover:text-[#FF5500] transition-colors">
                  {agent.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mt-2">{agent.desc}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-semibold text-[#FF5500]">
                <span>Deploy with Pod</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 md:px-12 max-w-[1000px] mx-auto text-center border-t border-zinc-900">
        <span className="text-xs font-mono font-bold text-[#FF5500] uppercase tracking-widest block mb-4">
          // NEED A CUSTOM SPEC?
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
          Have a unique workflow bottleneck?
        </h2>
        <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          We build custom workflows from scratch for your exact database, CRM, and internal tools in 2-week milestones.
        </p>
        <div className="flex justify-center">
          <Link
            to="/services"
            className="bg-[#FF5500] hover:bg-[#FF6E26] text-black font-extrabold text-xs uppercase tracking-wider py-4 px-8 rounded-xl shadow-us-pop hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>View All Services</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
