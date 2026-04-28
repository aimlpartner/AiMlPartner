import React from 'react';
import { motion } from 'motion/react';

export function Team() {
  const team = [
    {
      name: "Deepak Porwal",
      role: "Studio / GTM Architect",
      imageId: "1573164713988-8665fc963095", // Leaves
      points: [
        "Owns narrative, ICP selection, offer design, pricing, and GTM experiments.",
        "Leads sales and discovery calls, turns client pain into concrete agent + workflow projects."
      ]
    },
    {
      name: "Manu Singh",
      role: "AI & Automation Architect / Fullstack",
      imageId: "1534528741775-53994a69daeb", // Water
      points: [
        "Designs agent workflows on n8n and/or orchestration frameworks (LangChain / CrewAI where needed).",
        "Owns infra choices, security, observability, and templates for common use cases (RAG, SDR, support, ops)."
      ]
    },
    {
      name: "Garvit Bansal",
      role: "Low-Code & Product Fullstack AI Engineer",
      imageId: "1507003211169-0a1dd7228f2d", // Sand
      points: [
        "Builds app UIs, internal tools, and bridges between agents and business systems using low-code platforms.",
        "Glues n8n/agents with databases, dashboards, and any custom code needed for robustness."
      ]
    },
    {
      name: "Anand M",
      role: "Salesforce / Agentforce Architect",
      imageId: "1519085360753-af0119f7cbe7", // Stone
      points: [
        "Designs Agentforce use-cases, data model touchpoints, and integration with Salesforce clouds.",
        "Coaches internal/existing client Salesforce teams to adopt Agentforce safely."
      ]
    }
  ];

  return (
    <section id="team" className="py-24 bg-gradient-to-br from-slate-50 to-sky-50/30 border-b border-slate-200">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-6">
            Core roles & operators
          </h2>
          <p className="text-lg text-slate-600 font-light">
            A lean, senior team of architects and engineers. No junior bloat, just deep expertise in AI, automation, and GTM.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-slate-200 p-8 flex flex-col group hover:border-slate-300 transition-colors"
            >
              <div className="mb-6 pb-6 border-b border-slate-200 flex items-center gap-6">
                <div className="w-16 h-16 shrink-0 rounded-full border border-slate-200 overflow-hidden bg-sky-50">
                  <img 
                    src={`https://api.dicebear.com/8.x/notionists/svg?seed=${member.name}&backgroundColor=transparent`}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">{member.name}</h3>
                  <div className="text-xs font-mono text-slate-600 uppercase tracking-widest">{member.role}</div>
                </div>
              </div>
              <ul className="space-y-4 flex-grow">
                {member.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed font-light">
                    <span className="text-slate-300 mt-2 w-1.5 h-1.5 bg-slate-300 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
