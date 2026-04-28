import React from 'react';
import { motion } from 'motion/react';
import { Cloud, ShieldCheck, Zap, Database, MessageSquare, LineChart, Target, Workflow, Users, Lightbulb } from 'lucide-react';

export function AgentforceServices() {
  const useCases = [
    { icon: <ShieldCheck />, title: "Agentforce Readiness Audit", desc: "Assess your org's data and security posture for AI." },
    { icon: <Workflow />, title: "Custom Copilot Actions", desc: "Build bespoke actions for your unique business processes." },
    { icon: <Lightbulb />, title: "Prompt Builder Templates", desc: "Design grounded, effective prompts for your teams." },
    { icon: <Database />, title: "Data Cloud Integration", desc: "Unify your data to power intelligent Agentforce insights." },
    { icon: <MessageSquare />, title: "Service Cloud Autonomous Agents", desc: "Deploy agents to resolve tier-1 support tickets instantly." },
    { icon: <LineChart />, title: "Sales Cloud Deal Summaries", desc: "Auto-generate deal briefs and next steps for reps." },
    { icon: <Target />, title: "Marketing Cloud Personalization", desc: "Create hyper-personalized campaigns using AI." },
    { icon: <Zap />, title: "Apex & Flow AI Integration", desc: "Embed Agentforce capabilities directly into existing flows." },
    { icon: <Cloud />, title: "Security & Trust Layer Setup", desc: "Configure masking and auditing for enterprise compliance." },
    { icon: <Users />, title: "Agentforce Training & Adoption", desc: "Upskill your team to maximize ROI on Salesforce AI." }
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
            Salesforce Agentforce Services
          </h1>
          <p className="text-lg text-slate-600 font-light">
            Expert advisory and implementation services to help you deploy secure, compliant, and highly effective AI agents within your Salesforce ecosystem.
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
