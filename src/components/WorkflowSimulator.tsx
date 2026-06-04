import React from 'react';

export function WorkflowSimulator() {
  return (
    <div className="w-full relative bg-zinc-950 text-white rounded-[2.5rem] border border-zinc-850 p-6 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden font-sans select-none">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[250px] h-[250px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Main Header explaining the Business Use Case */}
      <div className="max-w-3xl mb-10 relative z-10 text-left">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold mb-3 block">
          Real Business Impact
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-display mb-3 leading-tight">
          How AI agents transform daily operations
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
          Let’s look at a mainstream business example: handling a high-value customer inquiry. See how background agent automation translates directly into hours reclaimed, expenses saved, and revenue growth.
        </p>
      </div>

      {/* Relatable Scenario Card */}
      <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 mb-8 relative z-10 backdrop-blur-sm text-left">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">Typical Business Scenario: Inbound Sales Lead</span>
        </div>
        <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-4 font-mono text-xs leading-relaxed text-zinc-300">
          <span className="text-blue-400 font-bold">Incoming Customer Inquiry:</span> "Hey! I'm Sarah, Director of Ops at Stripe. We want to automate our CRM sync for a team of 150 members starting next month. Can we schedule a demo?"
        </div>
      </div>

      {/* 3 Pillars: Time, Money, Growth */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 text-left">
        
        {/* Card 1: Time */}
        <div className="bg-zinc-900/30 border border-zinc-850 hover:border-zinc-700/80 hover:bg-zinc-900/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-inner group">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                <i className="ph-fill ph-timer text-blue-500 text-sm"></i>
                Time Saved
              </span>
              <span className="text-base font-bold text-blue-400 group-hover:scale-105 transition-transform duration-300">-99% prep</span>
            </div>
            
            <h4 className="text-base font-bold text-white mb-2 tracking-tight">Instant Lead Readiness</h4>
            <p className="text-zinc-400 text-xs leading-relaxed mb-6">
              Instead of sales reps wasting hours manually digging up company stats, financial reports, and profiles before jumping on calls, the AI agent completes the research in seconds.
            </p>
          </div>
          
          <div className="space-y-2 border-t border-zinc-800/80 pt-4">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-zinc-500">Manual Process:</span>
              <span className="text-red-400 bg-red-950/20 border border-red-900/40 px-2 py-0.5 rounded font-mono">2 Hours research</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-zinc-500">Agentic Process:</span>
              <span className="text-emerald-400 bg-emerald-950/20 border border-emerald-900/40 px-2 py-0.5 rounded font-mono">45 Seconds flat</span>
            </div>
          </div>
        </div>

        {/* Card 2: Money */}
        <div className="bg-zinc-900/30 border border-zinc-850 hover:border-zinc-700/80 hover:bg-zinc-900/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-inner group">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                <i className="ph-fill ph-trend-down text-blue-500 text-sm"></i>
                Money Saved
              </span>
              <span className="text-base font-bold text-blue-400 group-hover:scale-105 transition-transform duration-300">75% cost cut</span>
            </div>
            
            <h4 className="text-base font-bold text-white mb-2 tracking-tight">Zero-Overhead Enrichment</h4>
            <p className="text-zinc-400 text-xs leading-relaxed mb-6">
              Skip hiring virtual assistants or outsourcing data-entry tasks to update CRM profiles. Continuous AI listener tasks maintain database hygiene and enrich contacts automatically.
            </p>
          </div>
          
          <div className="space-y-2 border-t border-zinc-800/80 pt-4">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-zinc-500">Manual Labor Cost:</span>
              <span className="text-red-400 bg-red-950/20 border border-red-900/40 px-2 py-0.5 rounded font-mono">$15.00 / lead</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-zinc-500">AI Agent Cost:</span>
              <span className="text-emerald-400 bg-emerald-950/20 border border-emerald-900/40 px-2 py-0.5 rounded font-mono">$0.04 / lead</span>
            </div>
          </div>
        </div>

        {/* Card 3: Growth */}
        <div className="bg-zinc-900/30 border border-zinc-850 hover:border-zinc-700/80 hover:bg-zinc-900/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-inner group">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                <i className="ph-fill ph-chart-line-up text-blue-500 text-sm"></i>
                Growth Accelerated
              </span>
              <span className="text-base font-bold text-blue-400 group-hover:scale-105 transition-transform duration-300">+42% bookings</span>
            </div>
            
            <h4 className="text-base font-bold text-white mb-2 tracking-tight">Instant Lead Response</h4>
            <p className="text-zinc-400 text-xs leading-relaxed mb-6">
              Response speed is the #1 factor in closing inbound sales. AI agents draft contextual, high-converting replies immediately, preventing leads from cooling off or going to competitors.
            </p>
          </div>
          
          <div className="space-y-2 border-t border-zinc-800/80 pt-4">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-zinc-500">Average Delay:</span>
              <span className="text-red-400 bg-red-950/20 border border-red-900/40 px-2 py-0.5 rounded font-mono">4.5 Hours delay</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-zinc-500">Agentic Response:</span>
              <span className="text-emerald-400 bg-emerald-950/20 border border-emerald-900/40 px-2 py-0.5 rounded font-mono">Real-time draft</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
