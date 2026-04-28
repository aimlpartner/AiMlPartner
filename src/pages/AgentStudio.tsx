import React from 'react';
import { motion } from 'motion/react';
import { Bot, Zap, Shield, Workflow, Database, LineChart, Users, MessageSquare, Clock, Globe } from 'lucide-react';

export function AgentStudio() {
  const useCases = [
    { icon: <Bot />, title: "Automated SDR Agent", desc: "Qualify leads and book meetings 24/7." },
    { icon: <Zap />, title: "Instant Support Triage", desc: "Categorize and route tickets instantly." },
    { icon: <Shield />, title: "Compliance Checker", desc: "Review documents against regulatory standards." },
    { icon: <Workflow />, title: "Onboarding Assistant", desc: "Guide new hires through paperwork and setup." },
    { icon: <Database />, title: "Data Enrichment", desc: "Automatically pull and append CRM records." },
    { icon: <LineChart />, title: "Financial Analyst", desc: "Generate weekly performance reports." },
    { icon: <Users />, title: "HR Screener", desc: "Pre-screen resumes and schedule interviews." },
    { icon: <MessageSquare />, title: "Social Listener", desc: "Monitor brand mentions and draft responses." },
    { icon: <Clock />, title: "Meeting Summarizer", desc: "Transcribe and extract action items." },
    { icon: <Globe />, title: "Multi-lingual Translator", desc: "Translate support docs on the fly." }
  ];

  return (
    <main className="pt-32 pb-24 bg-gradient-to-br from-slate-50 to-sky-50/30 min-h-screen">
      <div className="container-max">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-200 text-xs font-mono text-slate-600 mb-8 tracking-tight uppercase bg-white">
            <span className="w-2 h-2 bg-slate-900" />
            Core Offering
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Agent Studio
          </h1>
          <p className="text-lg text-slate-600 font-light">
            A low-code platform for building custom AI agents tailored to your exact business logic.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-slate-200 p-6 hover:border-slate-300 transition-colors"
            >
              <div className="w-10 h-10 bg-slate-100 flex items-center justify-center mb-6 text-slate-900 border border-slate-200">
                {uc.icon}
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">{uc.title}</h3>
              <p className="text-slate-600 font-light text-sm">{uc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
