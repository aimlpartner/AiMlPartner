import React from 'react';
import { motion } from 'motion/react';
import { Cloud, ShieldCheck, Zap, Database, MessageSquare, LineChart, Target, Workflow, Users, Lightbulb, ArrowRight } from 'lucide-react';

export function AgentforceServices() {
  const featuredServices = [
    {
      icon: <ShieldCheck className="text-accent" size={24} />,
      title: "Salesforce AI Accelerator",
      desc: "Get your Salesforce setup optimized for AI in 3-5 weeks. Includes a comprehensive CRM pipeline review, complete data hygiene cleanup, custom Salesforce Flow automation setup, Agentforce planning, and custom AI agent designs. Price: $5,000 - $15,000.",
      colSpan: "md:col-span-8",
      auditDetails: "CRM Review • Flow Optimization • Custom AI Agents • User Training"
    },
    {
      icon: <Workflow className="text-success" size={24} />,
      title: "Advanced Agentforce Implementation",
      desc: "For complex systems looking for deep AI orchestration. Build Apex custom actions, configure secure MuleSoft integrations, set up Data Cloud syncs, and deploy context-grounded prompt templates. Price: $15,000 - $40,000.",
      colSpan: "md:col-span-4",
      bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: <Lightbulb className="text-alert" size={24} />,
      title: "User Adoption & SOP Training",
      desc: "AI is only as good as the team using it. We provide comprehensive team training, create clear Standard Operating Procedures (SOPs), and build custom interfaces that make it easy for your staff to adopt new workflows.",
      colSpan: "md:col-span-12"
    }
  ];

  const directoryServices = [
    { num: "01/", icon: <Database size={18} />, title: "CRM Optimization", desc: "Review objects, resolve duplicates, and clean up pipelines to ensure data quality and integrity before AI deployment." },
    { num: "02/", icon: <MessageSquare size={18} />, title: "Agentforce Implementation", desc: "Configure, verify, and deploy Agentforce agents directly in your Salesforce environment to automate interactions." },
    { num: "03/", icon: <LineChart size={18} />, title: "Custom AI Agents", desc: "Program custom agents to handle specific, high-fidelity operations like automated outreach enrichment and ticketing." },
    { num: "04/", icon: <Target size={18} />, title: "Salesforce Flows", desc: "Re-engineer legacy scripts and create modern Flows that automate task handoffs and trigger AI actions." },
    { num: "05/", icon: <Zap size={18} />, title: "Data Quality Improvements", desc: "Establish automated database cleaning listeners to maintain data hygiene and accuracy overhead-free." },
    { num: "06/", icon: <Cloud size={18} />, title: "User Adoption & SOPs", desc: "Conduct hands-on training sessions and build clear SOP documentation to drive high adoption rates among team members." },
    { num: "07/", icon: <Users size={18} />, title: "Trust Layer Setup", desc: "Mask PII, set rate limits, and establish strict compliance rules to comply with security requirements." }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-surface text-ink">
      {/* Texture Overlays */}
      <div className="grain-overlay"></div>

      {/* SECTION 1: IMMERSIVE SPACE HERO */}
      <section className="relative pt-40 pb-24 text-white overflow-hidden">
        {/* Deep Space Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 animate-[float-slow_30s_ease-in-out_infinite]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-90 transform scale-[1.15] origin-center"></div>
          </div>
          <div className="absolute inset-0 bg-space-gradient"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
        </div>

        <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none z-0"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono text-accent font-bold mb-8 tracking-wider uppercase rounded-md shadow-glow">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Specialized Service
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white mb-6 leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
              Make Salesforce Work <br />
              The Way Your Business Operates.
            </h1>
            <p className="text-lg text-white/70 font-medium leading-relaxed max-w-xl">
              Salesforce AI Accelerator. A dedicated service for businesses already using Salesforce. We clean data, optimize flows, implement custom AI agents, and ensure high user adoption.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: FEATURED SERVICES GRID (Light Alabaster Theme) */}
      <section className="bg-surface rounded-t-[3rem] -mt-10 py-24 relative z-10 text-ink border-t border-black/5 px-6">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <div className="text-left">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block font-bold">Salesforce Services</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ink tracking-tight">Dedicated service packages</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {featuredServices.map((agent, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`${agent.colSpan} bg-white border border-black/5 rounded-3xl p-8 md:p-10 flex flex-col justify-between tangible-card shadow-editorial hover:shadow-editorial-hover relative overflow-hidden text-left`}
              >
                {agent.bgImage && (
                  <>
                    <img src={agent.bgImage} className="absolute inset-0 w-full h-full object-cover opacity-5 mix-blend-multiply pointer-events-none" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                  </>
                )}

                <div className="relative z-10 flex-grow flex flex-col justify-between">
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-surface-alt border border-black/5 flex items-center justify-center mb-6 shadow-sm">
                      {agent.icon}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-ink mb-3 tracking-tight">{agent.title}</h3>
                    <p className="text-ink-light text-sm leading-relaxed">{agent.desc}</p>
                  </div>

                  {agent.auditDetails && (
                    <div className="pt-4 border-t border-black/5 text-xs font-mono text-accent font-semibold tracking-wider">
                      {agent.auditDetails}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: INTEGRATION ROW TIMELINE (Flowing Gradient Theme) */}
      <section className="flowing-gradient py-24 px-6 relative z-10 border-y border-black/5 text-ink">
        <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none z-0"></div>

        <div className="max-w-[1000px] mx-auto relative z-10 space-y-8">
          <div className="text-left max-w-xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block font-bold">Advisory & Setup</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ink tracking-tight">How we make Salesforce work</h2>
            <p className="text-ink-light text-sm mt-2 leading-relaxed font-medium">Unlock complete CRM automation capabilities with our structured implementation modules.</p>
          </div>

          <div className="space-y-4">
            {directoryServices.map((agent, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="offering-row block border border-black/10 bg-white/60 backdrop-blur-md rounded-2xl py-6 px-6 md:px-10 group cursor-pointer shadow-sm hover:shadow-md text-left"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-1 font-mono text-sm text-ink-lighter font-bold">{agent.num}</div>
                  <div className="md:col-span-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-black/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      {agent.icon}
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink group-hover:text-accent transition-colors duration-300 tracking-tight">
                      {agent.title}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-ink-light text-sm leading-relaxed group-hover:text-ink transition-colors duration-300 font-medium">
                      {agent.desc}
                    </p>
                  </div>
                  <div className="md:col-span-1 flex justify-start md:justify-end">
                    <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all shadow-sm bg-white/50">
                      <ArrowRight size={14} className="arrow-icon" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
