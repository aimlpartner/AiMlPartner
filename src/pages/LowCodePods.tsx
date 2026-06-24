import React from 'react';
import { motion } from 'motion/react';
import { Layers, Smartphone, Monitor, Cpu, Database, Cloud, ShieldCheck, Activity, Users, Zap, ArrowRight } from 'lucide-react';

export function LowCodePods() {
  const featuredPods = [
    {
      icon: <Layers className="text-accent" size={24} />,
      title: "AI Quick Win Sprint (Most Popular)",
      desc: "Solve one painful workflow in 2-4 weeks. Ideal for lead follow-up automation, customer onboarding, appointment reminders, proposal generation, CRM cleanup, email triage, or internal knowledge assistants. Price: $3,500 - $7,500. Includes Discovery, Design, Implementation, Team Training, and full documentation.",
      colSpan: "md:col-span-8",
      mockUi: true
    },
    {
      icon: <Smartphone className="text-success" size={24} />,
      title: "AI Business Clarity Session",
      desc: "Our low-risk entry point. A 90-minute workshop to review sales, service, operations, marketing, and workflows. Price: $495. You receive an AI Opportunity Report, Priority Scorecard, and 90-Day Roadmap.",
      colSpan: "md:col-span-4",
      bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: <Monitor className="text-alert" size={24} />,
      title: "AI Workforce Launch (Complete Transformation)",
      desc: "Our complete transformation package for growing businesses. A 6-10 week deep engagement. Includes complete business assessment, AI roadmap, multiple custom automations, CRM optimization, internal knowledge base, custom AI agents, comprehensive team training, and 90-day post-launch support. Price: $12,000 - $25,000.",
      colSpan: "md:col-span-12"
    }
  ];

  const directoryPods = [
    { num: "01/", icon: <Cpu size={18} />, title: "Monthly Optimization", desc: "We continuously refine prompting, model configurations, and operational flows as AI technology evolves." },
    { num: "02/", icon: <Database size={18} />, title: "New Automations", desc: "Build and deploy new triggers, handlers, and workflow scripts overhead-free as your operational needs scale." },
    { num: "03/", icon: <Cloud size={18} />, title: "System Support & Maintenance", desc: "Access dedicated support channels for instant bug fixes, API updates, and server maintenance." },
    { num: "04/", icon: <ShieldCheck size={18} />, title: "AI Executive Coaching", desc: "Ongoing consultation sessions to keep your leadership team aligned on AI capabilities and emerging solutions." },
    { num: "05/", icon: <Activity size={18} />, title: "Team Training & Workshops", desc: "Regular training sessions and interactive documentation updates to ensure high adoption rates among new staff." },
    { num: "06/", icon: <Users size={18} />, title: "Performance & ROI Reporting", desc: "Receive detailed monthly analytics tracking time saved, execution logs, and system accuracy metrics." },
    { num: "07/", icon: <Zap size={18} />, title: "100% Ownership of Deliverables", desc: "You maintain full intellectual property, accounts, and clean codebase ownership for everything we implement." }
  ];

  return (
    <div className="relative min-h-screen bg-surface text-ink">
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
              Our Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white mb-6 leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
              Simple, Practical <br />
              AI Services.
            </h1>
            <p className="text-lg text-white/70 font-medium leading-relaxed max-w-xl">
              Three simple offers. Nothing more. We help small and mid-sized businesses implement practical AI, automation, and digital workforce solutions that scale teams without adding headcount.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: FEATURED PODS (Light Alabaster Theme) */}
      <section className="bg-surface rounded-t-[3rem] -mt-10 py-24 relative z-10 text-ink border-t border-black/5 px-6">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <div className="text-left">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block font-bold">Our Core Offers</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ink tracking-tight">Three simple offers. Nothing more.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {featuredPods.map((pod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`${pod.colSpan} bg-white border border-black/5 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 justify-between tangible-card shadow-editorial hover:shadow-editorial-hover relative overflow-hidden text-left`}
              >
                {pod.bgImage && (
                  <>
                    <img src={pod.bgImage} className="absolute inset-0 w-full h-full object-cover opacity-5 mix-blend-multiply pointer-events-none" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                  </>
                )}

                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-alt border border-black/5 flex items-center justify-center mb-6 shadow-sm">
                      {pod.icon}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-ink mb-3 tracking-tight">{pod.title}</h3>
                    <p className="text-ink-light text-sm leading-relaxed">{pod.desc}</p>
                  </div>
                </div>

                {/* Mock UI layout styled for Alabaster grid */}
                {pod.mockUi && (
                  <div className="relative z-10 flex-1 bg-surface-alt border border-black/10 rounded-2xl p-4 flex flex-col justify-between shadow-inner h-48 md:h-auto min-w-[280px]">
                    <div className="flex items-center justify-between pb-2 border-b border-black/5 mb-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-alert/75" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/75" />
                        <div className="w-2 h-2 rounded-full bg-success/75" />
                      </div>
                      <span className="font-mono text-[8px] text-ink-light">ADMIN_PORTAL.EXE</span>
                    </div>
                    <div className="space-y-2 flex-grow text-[9px] font-mono text-ink-light">
                      <div className="flex justify-between border-b border-black/5 pb-1">
                        <span>Agent_Status:</span>
                        <span className="text-success font-bold">RUNNING</span>
                      </div>
                      <div className="flex justify-between border-b border-black/5 pb-1">
                        <span>Active_Users:</span>
                        <span className="text-accent font-bold">12 Operators</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sync_Lag:</span>
                        <span className="text-ink">0.04s</span>
                      </div>
                    </div>
                    <div className="bg-ink rounded p-1.5 text-center text-[8px] font-bold uppercase tracking-wider text-white border border-black/5 mt-4 hover:bg-accent transition-colors duration-300">
                      Verify System Actions
                    </div>
                  </div>
                )}
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
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block font-bold">Monthly Program</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-ink tracking-tight">AI Workforce Partner</h2>
            <p className="text-ink-light text-sm mt-2 leading-relaxed font-medium">Ongoing monthly optimization and support program after implementation.</p>
          </div>

          <div className="space-y-4">
            {directoryPods.map((agent, i) => (
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

      {/* SECTION 4: TRUST BUILDING */}
      <section className="py-20 bg-surface-alt/40 border-t border-black/5 px-6 text-center">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8 font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
            Built for Trust & Transparency
          </div>
          <div className="flex flex-wrap justify-center gap-y-4 gap-x-8 md:gap-x-12 text-sm font-semibold text-ink-light">
            <span className="flex items-center gap-2">✓ Fixed pricing</span>
            <span className="flex items-center gap-2">✓ Clear timelines</span>
            <span className="flex items-center gap-2">✓ No long-term contracts</span>
            <span className="flex items-center gap-2">✓ Human support</span>
            <span className="flex items-center gap-2">✓ Documented workflows</span>
            <span className="flex items-center gap-2">✓ Team training included</span>
            <span className="flex items-center gap-2">✓ Ownership of deliverables</span>
          </div>
        </div>
      </section>
    </div>
  );
}
