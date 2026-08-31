import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Zap,
  CheckCircle2,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { smbSolutions, SMBSolution } from '../data/smbSolutions';
import { USIntakeCTA } from '../components/us/USIntakeCTA';
import { SEO } from '../components/SEO';

export function SMBSolutionDetail() {
  const { industryId } = useParams<{ industryId: string }>();
  const navigate = useNavigate();

  const currentSMB = smbSolutions.find((s) => s.id === industryId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [industryId]);

  if (!currentSMB) {
    return (
      <div className="min-h-screen bg-black text-white pt-36 pb-20 flex items-center justify-center">
        <div className="text-center p-8 max-w-md bg-zinc-950 border border-white/10 rounded-3xl">
          <Layers className="w-12 h-12 text-[#FF5500] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Industry Not Found</h1>
          <p className="text-sm text-zinc-400 mb-6">
            We couldn't find the industry you're looking for. It may have been moved.
          </p>
          <Link
            to="/what-we-automate"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF5500] text-black font-semibold text-sm hover:bg-orange-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Industries
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = smbSolutions.findIndex((s) => s.id === industryId);
  const nextSMB = smbSolutions[(currentIndex + 1) % smbSolutions.length];
  const prevSMB = smbSolutions[(currentIndex - 1 + smbSolutions.length) % smbSolutions.length];
  const Icon = currentSMB.icon;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-black pt-28 pb-20 relative overflow-hidden">
      <SEO
        title={`${currentSMB.name} — What We Automate`}
        description={`See 3 simple ways we automate everyday headaches for ${currentSMB.name}. ${currentSMB.tagline}`}
        url={`https://aimlpartner.com/what-we-automate/${currentSMB.id}`}
      />

      {/* Atmospheric Glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,85,0,0.12),transparent_70%)] blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-15%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,85,0,0.08),transparent_70%)] blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8 pt-2">
          <Link
            to="/what-we-automate"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-[#FF5500] transition-colors py-1.5 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Industries</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to={`/what-we-automate/${prevSMB.id}`}
              className="text-xs text-zinc-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors hidden sm:inline-flex items-center gap-1"
            >
              ← Prev
            </Link>
            <Link
              to={`/what-we-automate/${nextSMB.id}`}
              className="text-xs text-zinc-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors hidden sm:inline-flex items-center gap-1"
            >
              Next →
            </Link>
          </div>
        </div>

        {/* Hero Header Section */}
        <div className="relative bg-zinc-950/80 border border-white/[0.08] rounded-3xl p-6 sm:p-10 mb-10 shadow-2xl backdrop-blur-xl">
          {/* Subtle Top Gradient Line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF5500]/60 to-transparent rounded-t-3xl" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/30 shrink-0 shadow-inner">
                <Icon className="w-8 h-8 text-[#FF5500]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                    {currentSMB.category}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {currentSMB.name}
                </h1>
              </div>
            </div>

            <a
              href="#intake"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF5500] hover:bg-orange-500 text-black text-sm font-bold transition-all shadow-[0_0_30px_-5px_rgba(255,85,0,0.5)] shrink-0"
            >
              Let's Talk About This
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <p className="text-lg sm:text-xl font-semibold text-zinc-200 mb-6 leading-snug">
            {currentSMB.tagline}
          </p>

          {/* The Problem */}
          <div className="p-4 sm:p-5 rounded-2xl bg-red-950/25 border border-red-900/30 text-sm text-zinc-300">
            <span className="text-red-400 font-bold uppercase text-[11px] tracking-wider block mb-1.5">
              The Problem We Solve
            </span>
            <p className="leading-relaxed text-zinc-300">
              {currentSMB.bottleneck}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/[0.06]">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <Zap className="w-5 h-5 text-[#FF5500] shrink-0" />
              <div>
                <span className="text-[11px] text-zinc-400 block font-medium">What You Can Expect</span>
                <span className="text-sm font-bold text-white">{currentSMB.impact}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <ShieldCheck className="w-5 h-5 text-[#FF5500] shrink-0" />
              <div>
                <span className="text-[11px] text-zinc-400 block font-medium">Works With Software You Already Use</span>
                <div className="flex flex-wrap gap-1.5 mt-0.5">
                  {currentSMB.tools.map((tool, i) => (
                    <span key={i} className="text-xs font-mono text-zinc-300">
                      {tool}{i < currentSMB.tools.length - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Solutions */}
        <div className="mb-14 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Here's What We Set Up for You
            </h2>
          </div>

          <div className="space-y-6">
            {currentSMB.solutions.map((sol, index) => (
              <div
                key={index}
                className="group relative bg-zinc-950/80 border border-white/[0.08] hover:border-white/20 rounded-3xl p-6 sm:p-8 transition-all duration-200 shadow-xl"
              >
                {/* Number Badge + Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-9 h-9 rounded-2xl bg-[#FF5500] text-black font-extrabold text-sm flex items-center justify-center shrink-0 shadow-[0_0_20px_-3px_rgba(255,85,0,0.4)]">
                    {sol.number}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {sol.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed pl-0 sm:pl-13 mb-5">
                  {sol.description}
                </p>

                {/* What's Included */}
                {sol.deliverables && sol.deliverables.length > 0 && (
                  <div className="pl-0 sm:pl-13 pt-4 border-t border-white/[0.05] flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mr-1">
                      What's included:
                    </span>
                    {sol.deliverables.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5500]" />
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Other Industries Navigator */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-zinc-950/50 border border-white/[0.08]">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#FF5500]" />
            <span>See What We Do for Other Industries</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {smbSolutions.map((smb) => {
              const ItemIcon = smb.icon;
              const isCurrent = smb.id === currentSMB.id;
              return (
                <Link
                  key={smb.id}
                  to={`/what-we-automate/${smb.id}`}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                    isCurrent
                      ? 'bg-[#FF5500]/15 border-[#FF5500]/40 text-white'
                      : 'bg-white/[0.02] border-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <ItemIcon className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-[#FF5500]' : 'text-zinc-500'}`} />
                  <span className="text-xs font-semibold truncate">{smb.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Intake CTA */}
        <div id="intake">
          <USIntakeCTA />
        </div>
      </div>
    </div>
  );
}
