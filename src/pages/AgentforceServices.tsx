import React from 'react';
import { motion } from 'motion/react';
import { Cloud, ShieldCheck, Zap, Database, MessageSquare, LineChart, Target, Workflow, Users, Lightbulb, ArrowRight } from 'lucide-react';

export function AgentforceServices() {
  const featuredServices = [
    {
      icon: <ShieldCheck className="text-accent" size={24} />,
      title: "Agentforce Readiness Audit",
      desc: "Assess your Salesforce organization's data models, sharing rules, object schemas, and compliance boundaries. We produce a detailed operational blueprint before any deployment.",
      colSpan: "md:col-span-8",
      auditDetails: "Data Readiness Score: Vetted • CRM Pipeline Audit • Security Risk Map"
    },
    {
      icon: <Workflow className="text-success" size={24} />,
      title: "Custom Copilot Actions",
      desc: "Build Apex, Flow, and MuleSoft custom actions triggered dynamically by user queries or database updates, bridging agent logic to external SaaS endpoints.",
      colSpan: "md:col-span-4",
      bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: <Lightbulb className="text-alert" size={24} />,
      title: "Prompt Builder Templates",
      desc: "Configure context-grounded prompt templates mapped directly to your Salesforce merge fields. Safe from injections, highly structured, and optimized for low LLM latency.",
      colSpan: "md:col-span-12"
    }
  ];

  const directoryServices = [
    { num: "04/", icon: <Database size={18} />, title: "Data Cloud Integration", desc: "Ingest and unify unstructured emails, PDF contracts, and database records to ground your AI agents in real time." },
    { num: "05/", icon: <MessageSquare size={18} />, title: "Service Cloud Autonomous Agents", desc: "Deploy tier-1 support agents capable of resolving password resets, status checks, and ticket triage without human overhead." },
    { num: "06/", icon: <LineChart size={18} />, title: "Sales Cloud Deal Summaries", desc: "Automatically draft deal reports, extract action items from calls, and compile sales briefs inside Salesforce record fields." },
    { num: "07/", icon: <Target size={18} />, title: "Marketing Cloud Personalization", desc: "Construct segmented, context-aware campaigns and trigger hyper-personalized outbound sequences via automated listeners." },
    { num: "08/", icon: <Zap size={18} />, title: "Apex & Flow AI Integration", desc: "Embed autonomous LLM decision loops directly inside standard Salesforce flows and legacy Apex scripts safely." },
    { num: "09/", icon: <Cloud size={18} />, title: "Security & Trust Layer Setup", desc: "Establish strict PII masking, configure audit logs, and establish rate limits to comply with enterprise security constraints." },
    { num: "10/", icon: <Users size={18} />, title: "Agentforce Training & Adoption", desc: "Up-skill sales and support staff to prompt efficiently, audit outputs, and manage human-in-the-loop control panels." }
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
              Consulting & Advisory
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white mb-6 leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
              Salesforce Agentforce <br />
              Services & Integration.
            </h1>
            <p className="text-lg text-white/70 font-medium leading-relaxed max-w-xl">
              Expert implementation and advisory to deploy secure, compliant, and highly functional AI agents within your Salesforce CRM environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: FEATURED SERVICES GRID (Light Alabaster Theme) */}
      <section className="bg-surface rounded-t-[3rem] -mt-10 py-24 relative z-10 text-ink border-t border-black/5 px-6">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <div className="text-left">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block font-bold">Deployment Core</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ink tracking-tight">Enterprise foundations</h2>
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
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block font-bold">Roadmap Offerings</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ink tracking-tight">Integration packages</h2>
            <p className="text-ink-light text-sm mt-2 leading-relaxed font-medium">Unlock complete CRM automation capabilities with our structured modules.</p>
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
