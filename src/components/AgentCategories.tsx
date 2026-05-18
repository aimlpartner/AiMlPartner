import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Settings, HeartHandshake, Users, Factory, Shield } from 'lucide-react';

export function AgentCategories() {
  const categories = [
    {
      title: "Revenue Agents",
      icon: <Briefcase size={20} className="text-slate-900" />,
      description: "AI SDR, outbound personalization, proposal generation, CRM intelligence, pipeline forecasting"
    },
    {
      title: "Operations Agents",
      icon: <Settings size={20} className="text-slate-900" />,
      description: "Workflow automation, SOP generation, internal support, project management intelligence"
    },
    {
      title: "Customer Support Agents",
      icon: <HeartHandshake size={20} className="text-slate-900" />,
      description: "Ticket triage, multilingual support, knowledge retrieval, escalation systems"
    },
    {
      title: "Hiring Agents",
      icon: <Users size={20} className="text-slate-900" />,
      description: "Resume screening, interview coordination, onboarding, training copilots"
    },
    {
      title: "Industry-Specific Agents",
      icon: <Factory size={20} className="text-slate-900" />,
      description: "Logistics, real estate, healthcare scheduling, restaurant ops, manufacturing, legal"
    },
    {
      title: "Governance Agents",
      icon: <Shield size={20} className="text-slate-900" />,
      description: "Compliance monitoring, AI policy governance, usage tracking, hallucination auditing"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-sky-50/30 border-b border-slate-200">
      <div className="container-max">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-6">
            Expert Agents For Every Part of Your Business
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white border border-slate-200 p-6 flex flex-col hover:border-slate-300 transition-colors"
            >
              <div className="w-10 h-10 mb-4 bg-sky-50 border border-sky-100 flex items-center justify-center">
                {cat.icon}
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-2 tracking-tight">
                {cat.title}
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                {cat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
