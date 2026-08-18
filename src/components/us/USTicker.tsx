import React from 'react';

export function USTicker() {
  const items = [
    { label: 'PORT NEWARK & NJ TURNPIKE LOGISTICS', category: 'SUPPLY CHAIN' },
    { label: 'JERSEY CITY & PRINCETON CAPITAL MARKETS', category: 'FINANCIAL SERVICES' },
    { label: 'CENTRAL NJ CLINICAL & BIOPHARMA NETWORKS', category: 'HEALTHCARE' },
    { label: 'TRI-STATE COMMERCIAL TITLE & ESCROW', category: 'REAL ESTATE' },
    { label: 'ROUTE 1 CORRIDOR INDUSTRIAL AUTOMATION', category: 'MANUFACTURING' },
    { label: 'MULTI-ENTITY AP & INVOICING', category: 'ACCOUNTING' },
    { label: 'TRI-STATE CONTRACT AUDITING & DISCOVERY', category: 'LEGAL OPS' },
    { label: 'AUTONOMOUS LEAD DISPATCH', category: 'REVENUE OPS' },
    { label: '100% PRIVATE SOVEREIGN VPC DEPLOYMENT', category: 'SECURITY' },
  ];

  return (
    <div className="w-full bg-black border-y border-zinc-900 py-3.5 overflow-hidden select-none relative">
      {/* Left/Right Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="flex items-center">
        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-10 animate-marquee">
          {items.map((item, index) => (
            <a href="#intake" key={`m1-${index}`} className="flex items-center gap-10 cursor-pointer">
              <div className="flex items-center gap-2.5 group">
                <span className="text-[#FF5500] text-[10px] font-mono tracking-widest font-bold opacity-80 group-hover:opacity-100">
                  ✦ [{item.category}]
                </span>
                <span className="font-mono text-xs font-semibold tracking-wider text-zinc-300 group-hover:text-white group-hover:underline decoration-[#FF5500] underline-offset-4 transition-all uppercase">
                  {item.label}
                </span>
              </div>
              <span className="text-zinc-800 font-mono text-xs">/</span>
            </a>
          ))}
        </div>

        {/* Track 2 (Seamless loop) */}
        <div className="flex shrink-0 items-center gap-10 animate-marquee" aria-hidden="true">
          {items.map((item, index) => (
            <a href="#intake" key={`m2-${index}`} className="flex items-center gap-10 cursor-pointer">
              <div className="flex items-center gap-2.5 group">
                <span className="text-[#FF5500] text-[10px] font-mono tracking-widest font-bold opacity-80 group-hover:opacity-100">
                  ✦ [{item.category}]
                </span>
                <span className="font-mono text-xs font-semibold tracking-wider text-zinc-300 group-hover:text-white group-hover:underline decoration-[#FF5500] underline-offset-4 transition-all uppercase">
                  {item.label}
                </span>
              </div>
              <span className="text-zinc-800 font-mono text-xs">/</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
