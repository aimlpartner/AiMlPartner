import React from 'react';
import { motion } from 'motion/react';
import { Layers, Smartphone, Monitor, Cpu, Database, Cloud, ShieldCheck, Activity, Users, Zap } from 'lucide-react';

export function LowCodePods() {
  const useCases = [
    { icon: <Layers />, title: "Internal Admin Panels", desc: "Custom dashboards for operations teams." },
    { icon: <Smartphone />, title: "Client Portals", desc: "Secure spaces for clients to view progress." },
    { icon: <Monitor />, title: "Inventory Trackers", desc: "Real-time stock management apps." },
    { icon: <Cpu />, title: "AI Wrappers", desc: "Turn your prompt into a SaaS product." },
    { icon: <Database />, title: "CRM Extensions", desc: "Custom views and actions for Salesforce/Hubspot." },
    { icon: <Cloud />, title: "Partner Portals", desc: "Manage affiliates and channel partners." },
    { icon: <ShieldCheck />, title: "Approval Workflows", desc: "Multi-step authorization apps." },
    { icon: <Activity />, title: "Analytics Dashboards", desc: "Unified views of disparate data sources." },
    { icon: <Users />, title: "Employee Directories", desc: "Interactive org charts and profiles." },
    { icon: <Zap />, title: "Event Management", desc: "Registration and check-in applications." }
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
            Low-Code Product Pods
          </h1>
          <p className="text-lg text-slate-600 font-light">
            Services to help founders build production-ready apps rapidly using low-code platforms.
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
