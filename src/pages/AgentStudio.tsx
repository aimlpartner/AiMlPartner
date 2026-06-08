import React from 'react';
import { motion } from 'motion/react';
import { Bot, Zap, Shield, Workflow, Database, LineChart, Users, MessageSquare, Clock, Globe, ArrowRight } from 'lucide-react';

export function AgentStudio() {
  const featuredAgents = [
    {
      icon: <Bot className="text-accent" size={24} />,
      title: "AI Sales Assistant",
      desc: "Qualify leads, enrich CRM contact data, and automate outreach follow-ups 24/7. Auto-enriches data from LinkedIn/Outreach to draft personalized icebreakers in seconds.",
      colSpan: "md:col-span-8",
      friction: "SDRs waste 12+ hrs copy-pasting profiles",
      architecture: "Lead Created -> LinkedIn Scraping -> CRM Sync & Draft"
    },
    {
      icon: <Zap className="text-success" size={24} />,
      title: "AI Customer Service Agent",
      desc: "Resolve repetitive customer inquiries, answer FAQs, manage appointment reminders, and route high-priority tickets straight to Slack with CRM context.",
      colSpan: "md:col-span-4",
      bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: <Shield className="text-alert" size={24} />,
      title: "AI Operations Coordinator",
      desc: "Sync inventory levels across warehousing databases, automate administrative compliance checking, and manage recurring task handoffs between teams.",
      colSpan: "md:col-span-12"
    }
  ];

  const directoryAgents = [
    { num: "04/", icon: <Workflow size={18} />, title: "AI Knowledge Assistant", desc: "Scan internal company wikis, SOP manuals, and team documents to answer operational questions instantly." },
    { num: "05/", icon: <Database size={18} />, title: "AI Recruiting Assistant", desc: "Pre-screen candidate resumes against custom job rules, matching profiles to schedule initial interviews." },
    { num: "06/", icon: <LineChart size={18} />, title: "AI Executive Assistant", desc: "Triage shared email inboxes, organize calendar schedules, and auto-summarize team meetings into action points." },
    { num: "07/", icon: <Users size={18} />, title: "HR Screener", desc: "Pre-screen candidates based on custom job rules, matching profiles to schedule initial interviews." },
    { num: "08/", icon: <MessageSquare size={18} />, title: "Social Listener", desc: "Track digital mentions across channels, summarizing sentiment and queueing drafted replies." },
    { num: "09/", icon: <Clock size={18} />, title: "Meeting Summarizer", desc: "Record audio streams, transcribe conversations, and extract action tables instantly." },
    { num: "10/", icon: <Globe size={18} />, title: "Multi-lingual Translator", desc: "Translate core support guides and user docs dynamically, adapting jargon per region." }
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
              Agent Studio
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white mb-6 leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
              Build Autonomous <br />
              Business Logic.
            </h1>
            <p className="text-lg text-white/70 font-medium leading-relaxed max-w-xl">
              Configure custom AI agents tailored strictly to your operations. Eliminate repetitive tasks with systems that query, decide, and act continuously.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: FEATURED BENTO GRID (Light Alabaster Theme) */}
      <section className="bg-surface rounded-t-[3rem] -mt-10 py-24 relative z-10 text-ink border-t border-black/5 px-6">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <div className="text-left">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block font-bold">Featured Templates</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ink tracking-tight">Production-ready pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {featuredAgents.map((agent, i) => (
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

                  {agent.friction && (
                    <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-black/5 text-xs text-ink-light font-medium">
                      <div>
                        <span className="font-mono text-[9px] text-alert font-bold uppercase tracking-wider block mb-1">Operational Loop</span>
                        <p className="text-ink leading-relaxed">{agent.friction}</p>
                      </div>
                      <div className="border-l border-black/5 pl-4">
                        <span className="font-mono text-[9px] text-success font-bold uppercase tracking-wider block mb-1">Architecture</span>
                        <p className="text-ink leading-relaxed">{agent.architecture}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: DIRECTORY (Flowing Gradient Theme) */}
      <section className="flowing-gradient py-24 px-6 relative z-10 border-y border-black/5 text-ink">
        <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none z-0"></div>

        <div className="max-w-[1000px] mx-auto relative z-10 space-y-8">
          <div className="text-left max-w-xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block font-bold">Specialized Directory</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ink tracking-tight">Explore agent capabilities</h2>
            <p className="text-ink-light text-sm mt-2 leading-relaxed font-medium">Hover over each role to inspect integration details and workflow triggers.</p>
          </div>

          <div className="space-y-4">
            {directoryAgents.map((agent, i) => (
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
