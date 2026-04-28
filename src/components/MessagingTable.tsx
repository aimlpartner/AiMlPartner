import React from 'react';
import { motion } from 'motion/react';

export function MessagingTable() {
  const rows = [
    {
      buyer: "Founders",
      message: "Lean agent systems that launch in weeks, handle GTM distribution.",
      pain: "Resource constraints.",
      outcome: "2x lead velocity."
    },
    {
      buyer: "SMBs",
      message: "Human-in-loop automation: n8n + low-code portals cut costs 40%.",
      pain: "Scaling without headcount.",
      outcome: "Efficiency, $ROI fast."
    },
    {
      buyer: "Enterprise",
      message: "Agentforce blueprints + audits for compliant agents.",
      pain: "Integration risks.",
      outcome: "75% less manual work."
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="container-max">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-6">
            Tailored for your scale
          </h2>
          <p className="text-lg text-slate-600 font-light">
            We build systems that fit your exact stage and operational needs.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-x-auto"
        >
          <table className="w-full max-w-5xl mx-auto border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-left">
                <th className="py-4 px-2 font-mono text-xs text-slate-400 uppercase tracking-widest font-normal w-1/4">Buyer</th>
                <th className="py-4 px-2 font-mono text-xs text-slate-400 uppercase tracking-widest font-normal w-2/5">Message</th>
                <th className="py-4 px-2 font-mono text-xs text-slate-400 uppercase tracking-widest font-normal w-1/5">Pain</th>
                <th className="py-4 px-2 font-mono text-xs text-slate-400 uppercase tracking-widest font-normal w-1/5">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-slate-200 last:border-0 hover:bg-gradient-to-br from-slate-50 to-sky-50/30 transition-colors">
                  <td className="py-6 px-2 align-top">
                    <span className="font-medium text-slate-900">{row.buyer}</span>
                  </td>
                  <td className="py-6 px-2 align-top text-slate-600 font-light leading-relaxed">
                    {row.message}
                  </td>
                  <td className="py-6 px-2 align-top text-slate-600 font-light">
                    {row.pain}
                  </td>
                  <td className="py-6 px-2 align-top font-mono text-sm text-slate-900">
                    {row.outcome}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
