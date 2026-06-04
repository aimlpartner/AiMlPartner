import React from 'react';

export function WorkflowSimulator() {
  return (
    <div className="w-full relative bg-zinc-950 text-white rounded-[2rem] border border-zinc-850 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden font-sans select-none">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[200px] h-[200px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Main Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-stretch relative z-10">
        
        {/* STEP 1: CAPTIVE DATA (Left 4 cols) */}
        <div className="md:col-span-4 flex flex-col justify-between bg-zinc-900/30 border border-zinc-850 hover:border-zinc-700/80 hover:bg-zinc-900/40 rounded-2xl p-5 min-h-[220px] transition-all duration-300 shadow-inner">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                <i className="ph-fill ph-file-text text-blue-500 text-sm"></i>
                01 / INGEST
              </span>
              <span className="text-[9px] font-mono bg-zinc-800/80 text-zinc-400 px-1.5 py-0.5 rounded uppercase tracking-wider">
                Unstructured
              </span>
            </div>
            
            <h4 className="text-sm font-bold text-white mb-2 tracking-tight">Capture Messy Inputs</h4>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              Connect your customer forms, emails, documents, or logs. Raw, unorganized data is ingested automatically.
            </p>
          </div>
          
          <div className="bg-zinc-950/80 border border-zinc-850 rounded-xl p-3 font-mono text-[11px] leading-relaxed text-zinc-300 italic">
            "Hey! We'd like to purchase 50 licenses of your software. Let's set up a call next Tuesday."
          </div>
        </div>

        {/* CONNECTOR 1 (1 col) */}
        <div className="md:col-span-1 flex items-center justify-center">
          <Connector />
        </div>

        {/* STEP 2: AGENT PROCESSING (Center 3 cols) */}
        <div className="md:col-span-3 flex flex-col justify-between bg-zinc-900/30 border border-zinc-850 hover:border-zinc-700/80 hover:bg-zinc-900/40 rounded-2xl p-5 min-h-[220px] transition-all duration-300 shadow-inner">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                <i className="ph-fill ph-cpu text-blue-500 text-sm"></i>
                02 / PROCESS
              </span>
              <span className="text-[9px] font-mono bg-zinc-800/80 text-zinc-400 px-1.5 py-0.5 rounded uppercase tracking-wider">
                AI Agent
              </span>
            </div>

            <h4 className="text-sm font-bold text-white mb-2 tracking-tight">Extract & Clean</h4>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              AI agents analyze intent, extract entities (e.g. quantity, dates), and map them to business schemas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
            <div className="bg-zinc-950 px-2 py-1.5 rounded-lg border border-zinc-850">
              <span className="text-zinc-500 uppercase block text-[8px] tracking-wider mb-0.5">Intent</span>
              <span className="text-white font-bold">Purchase</span>
            </div>
            <div className="bg-zinc-950 px-2 py-1.5 rounded-lg border border-zinc-850">
              <span className="text-zinc-500 uppercase block text-[8px] tracking-wider mb-0.5">Volume</span>
              <span className="text-emerald-400 font-bold">50 Seats</span>
            </div>
          </div>
        </div>

        {/* CONNECTOR 2 (1 col) */}
        <div className="md:col-span-1 flex items-center justify-center">
          <Connector />
        </div>

        {/* STEP 3: AUTOMATED ACTION (Right 4 cols) */}
        <div className="md:col-span-4 flex flex-col justify-between bg-zinc-900/30 border border-zinc-850 hover:border-zinc-700/80 hover:bg-zinc-900/40 rounded-2xl p-5 min-h-[220px] transition-all duration-300 shadow-inner">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                <i className="ph-fill ph-rocket text-blue-500 text-sm"></i>
                03 / ACTION
              </span>
              <span className="text-[9px] font-mono bg-zinc-800/80 text-zinc-400 px-1.5 py-0.5 rounded uppercase tracking-wider">
                Sync Out
              </span>
            </div>

            <h4 className="text-sm font-bold text-white mb-2 tracking-tight">Automate Routing</h4>
            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
              Sync database fields, update CRM records, and immediately dispatch notifications to your team.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
            <div className="bg-zinc-950 border border-zinc-850 rounded-lg p-2 flex items-center justify-between">
              <div className="flex items-center gap-1 text-white">
                <i className="ph-bold ph-slack-logo text-indigo-400"></i>
                Slack
              </div>
              <i className="ph-bold ph-check text-emerald-400"></i>
            </div>
            <div className="bg-zinc-950 border border-zinc-850 rounded-lg p-2 flex items-center justify-between">
              <div className="flex items-center gap-1 text-white">
                <i className="ph-bold ph-database text-blue-400"></i>
                CRM
              </div>
              <i className="ph-bold ph-check text-emerald-400"></i>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Simple directional connector arrow component
function Connector() {
  return (
    <div className="flex md:flex-col items-center justify-center py-2 md:py-0 md:px-2 shrink-0 opacity-40">
      <i className="ph-bold ph-arrow-right text-zinc-500 text-lg hidden md:block"></i>
      <i className="ph-bold ph-arrow-down text-zinc-500 text-lg block md:hidden"></i>
    </div>
  );
}
