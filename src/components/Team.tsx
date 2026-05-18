import React from 'react';
import { motion } from 'motion/react';

export function Team() {
  const team = [
    {
      name: "Robert Molnar",
      role: "Business Ops & Rev Architect",
      seed: "RobertMolnarBoy", // Custom seed to ensure male avatar
      points: [
        "Drives business operations, revenue modeling, and strategic growth initiatives.",
        "Aligns operational processes with revenue targets and scales go-to-market strategies."
      ]
    },
    {
      name: "Rich Miró",
      role: "Brand & Product Media Architect",
      points: [
        "Leads brand strategy, visual identity, and product media development.",
        "Crafts compelling narratives and media assets to elevate product positioning."
      ]
    },
    {
      name: "Deepak Porwal",
      role: "Studio / GTM Architect",
      points: [
        "Owns narrative, ICP selection, offer design, pricing, and GTM experiments.",
        "Leads sales and discovery calls, turns client pain into concrete agent + workflow projects."
      ]
    },
    {
      name: "Anand M",
      role: "Enterprise CRM & AI Architect",
      points: [
        "Designs enterprise AI use-cases, data model touchpoints, and integration with leading CRM platforms.",
        "Coaches internal and client CRM teams to adopt AI solutions safely."
      ]
    },
    {
      name: "Manu Singh",
      role: "AI & Automation Architect / Fullstack",
      points: [
        "Designs agent workflows using modern orchestration frameworks.",
        "Owns infra choices, security, observability, and templates for common use cases (RAG, SDR, support, ops)."
      ]
    },
    {
      name: "Garvit Bansal",
      role: "Low-Code & Product Fullstack AI Architect",
      points: [
        "Builds app UIs, internal tools, and bridges between agents and business systems using low-code platforms.",
        "Glues AI agents with databases, dashboards, and any custom code needed for robustness."
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
                    src={`https://api.dicebear.com/8.x/notionists/svg?seed=${member.seed || member.name}&backgroundColor=transparent`}
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
