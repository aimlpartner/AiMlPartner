import React from 'react';
import {
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { smbSolutions, SMBSolution } from '../../data/smbSolutions';

export function USWhatWeAutomatePreview() {
  // Top 6 popular high-demand SMB industries
  const popularIds = [
    'medical-clinics',
    'law-practices',
    'accounting-cpas',
    'hvac-field-services',
    'real-estate-brokerages',
    'logistics-freight'
  ];

  const popularSMBs: SMBSolution[] = smbSolutions.filter((s) =>
    popularIds.includes(s.id)
  );

  return (
    <section className="relative py-24 bg-black text-white overflow-hidden border-b border-white/[0.08] select-none font-sans">
      
      {/* Background Ambient Radial Lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,85,0,0.08),transparent_70%)] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,85,0,0.05),transparent_70%)] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5500] block mb-2">
              Pick Your Industry
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-orange-400 to-amber-300">Automate</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-normal mt-3 leading-relaxed">
              Find your industry below and see exactly what we can take off your plate. Simple solutions for real business problems.
            </p>
          </div>

          <Link
            to="/what-we-automate"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white transition-all shrink-0 hover:border-[#FF5500]/50 group"
          >
            <span>See All 15 Industries</span>
            <ArrowRight className="w-4 h-4 text-[#FF5500] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 6 Popular Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {popularSMBs.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={`/what-we-automate/${item.id}`}
                className="group relative bg-zinc-950/80 border border-white/[0.08] hover:border-[#FF5500]/60 rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_12px_40px_-10px_rgba(255,85,0,0.22)] hover:-translate-y-1"
              >
                {/* Subtle top rim light */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 group-hover:via-[#FF5500]/70 to-transparent rounded-t-2xl transition-colors duration-300" />

                <div>
                  {/* Top Row: Icon */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-[#FF5500]/40 group-hover:bg-[#FF5500]/10 transition-all duration-300 shrink-0">
                      <Icon className="w-6 h-6 text-[#FF5500] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Category & Title */}
                  <div className="mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 group-hover:text-[#FF5500] transition-colors">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-white transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  {/* Tagline */}
                  <p className="text-sm text-[#FF5500] font-medium leading-snug mb-3">
                    {item.tagline}
                  </p>

                  {/* Problem preview */}
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-6">
                    {item.bottleneck}
                  </p>
                </div>

                {/* Footer: Action Link */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between mt-auto">
                  <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">
                    See How We Help →
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/[0.04] group-hover:bg-[#FF5500] group-hover:text-black border border-white/[0.08] group-hover:border-[#FF5500] flex items-center justify-center transition-all duration-200">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="text-center pt-2">
          <Link
            to="/what-we-automate"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
          >
            <span>See All 15 Industries We Work With</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
