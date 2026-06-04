import React from 'react';
import { motion } from 'motion/react';

export function Team() {
  const team = [
    {
      name: "Robert Molnar",
      role: "Business Ops & Rev Architect",
      seed: "RobertMolnarBoy", // Custom seed to ensure male avatar
      colSpan: "md:col-span-4",
      points: [
        "Drives business operations, revenue modeling, and strategic growth initiatives.",
        "Aligns operational processes with revenue targets and scales go-to-market strategies."
      ]
    },
    {
      name: "Rich Miró",
      role: "Brand & Product Media Architect",
      colSpan: "md:col-span-4",
      points: [
        "Leads brand strategy, visual identity, and product media development.",
        "Crafts compelling narratives and media assets to elevate product positioning."
      ]
    },
    {
      name: "Deepak Porwal",
      role: "Studio / GTM Architect",
      colSpan: "md:col-span-4",
      points: [
        "Owns narrative, ICP selection, offer design, pricing, and GTM experiments.",
        "Leads sales and discovery calls, turns client pain into concrete agent + workflow projects."
      ]
    },
    {
      name: "Anand M",
      role: "Enterprise CRM & AI Architect",
      colSpan: "md:col-span-4",
      points: [
        "Designs enterprise AI use-cases, data model touchpoints, and integration with leading CRM platforms.",
        "Coaches internal and client CRM teams to adopt AI solutions safely."
      ]
    },
    {
      name: "Manu Singh",
      role: "AI & Automation Architect / Fullstack",
      colSpan: "md:col-span-4",
      points: [
        "Designs agent workflows using modern orchestration frameworks.",
        "Owns infra choices, security, observability, and templates for common use cases (RAG, SDR, support, ops)."
      ]
    },
    {
      name: "Garvit Bansal",
      role: "Low-Code & Product Fullstack AI Architect",
      colSpan: "md:col-span-4",
      points: [
        "Builds app UIs, internal tools, and bridges between agents and business systems using low-code platforms.",
        "Glues AI agents with databases, dashboards, and any custom code needed for robustness."
      ]
    }
  ];

  return (
    <div className="relative w-full">
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
              Core Members
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white mb-6 leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
              Core roles & operators
            </h2>
            <p className="text-lg text-white/70 font-medium leading-relaxed max-w-xl">
              A lean, senior team of architects and engineers. No junior bloat, just deep expertise in AI, automation, and GTM.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: BENTO ROSTER (Light Alabaster Theme) */}
      <section className="bg-surface rounded-t-[3rem] -mt-10 py-24 relative z-10 text-ink border-t border-black/5 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`${member.colSpan} bg-white border border-black/5 p-8 flex flex-col justify-between group hover:border-accent/40 hover:shadow-editorial-hover transition-all duration-300 rounded-3xl shadow-editorial relative overflow-hidden`}
              >
                <div className="flex flex-col justify-between h-full">
                  <div className="mb-6 pb-6 border-b border-black/5 flex items-center gap-4">
                    <div className="w-14 h-14 shrink-0 rounded-2xl border border-black/5 overflow-hidden bg-surface-alt p-1">
                      <img
                        src={`https://api.dicebear.com/8.x/notionists/svg?seed=${member.seed || member.name}&backgroundColor=transparent`}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink mb-1 tracking-tight group-hover:text-accent transition-colors duration-300">{member.name}</h3>
                      <div className="text-[9px] font-mono text-ink-lighter uppercase tracking-widest font-semibold">{member.role}</div>
                    </div>
                  </div>
                  <ul className="space-y-4 flex-grow">
                    {member.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-3 text-ink-light text-xs leading-relaxed font-medium">
                        <span className="text-accent mt-1.5 w-1.2 h-1.2 bg-accent shrink-0 rounded-full" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
