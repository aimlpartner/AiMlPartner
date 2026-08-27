import React from 'react';
import {
  Stethoscope,
  Scale,
  Calculator,
  Wrench,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CaseStudyCard {
  id: string;
  industry: string;
  category: string;
  client: string;
  icon: LucideIcon;
  headline: string;
  statValue: string;
  statLabel: string;
  statSub: string;
  preview: string;
  highlights: string[];
  linkQuery: string;
  blueprintSlug: string;
}

export function USUseCasesSection() {
  const caseStudies: CaseStudyCard[] = [
    {
      id: 'healthcare',
      industry: 'Medical Clinics & Healthcare',
      category: 'Healthcare',
      client: 'Summit Medical Group (14 Providers)',
      icon: Stethoscope,
      headline: 'Giving Doctors Their Evenings Back & Capturing 100% of Patient Calls.',
      statValue: '2.5 hrs',
      statLabel: 'Doctor Time Saved Daily',
      statSub: '100% after-hours EHR notes eliminated',
      preview: 'Physicians spent 2–3 hours at home every night typing encounter notes, while busy phone lines caused 30% of calling patients to hang up.',
      highlights: [
        'Ambient HIPAA clinical notes drafted in 15 seconds',
        '24/7 zero-ring conversational phone scheduling',
        'Automated 48-hour insurance pre-verification'
      ],
      linkQuery: 'healthcare',
      blueprintSlug: 'medical-clinics'
    },
    {
      id: 'legal',
      industry: 'Law Firms & Legal Practices',
      category: 'Legal Practices',
      client: 'Sterling & Cole Commercial Litigation',
      icon: Scale,
      headline: 'Signing High-Retainer Clients in 60 Seconds & Contract Review AI.',
      statValue: '3.8x',
      statLabel: 'Retainer Sign-Up Rate',
      statSub: 'Sub-60s instant lead intake vs 3hr delays',
      preview: 'Inbound legal leads were lost to competitors due to 3-hour callback delays, while attorneys spent unbillable hours reviewing routine contracts.',
      highlights: [
        'Sub-60s DocuSign retainer dispatch on web/calls',
        '10x faster contract risk redlining & analysis',
        'Passive billable time capture synced to Clio'
      ],
      linkQuery: 'legal',
      blueprintSlug: 'law-practices'
    },
    {
      id: 'accounting',
      industry: 'Accounting, CPAs & Wealth Advisory',
      category: 'Accounting & Wealth',
      client: 'Chen & Associates CPA Firm',
      icon: Calculator,
      headline: 'Slashing Month-End Close by 70% & Ending Tax Season Document Chasing.',
      statValue: '70%',
      statLabel: 'Faster Month-End Close',
      statSub: 'Zero manual data entry to general ledger',
      preview: 'Accountants were buried in shoebox receipts and spent hundreds of hours sending follow-up emails for missing 1099s and W-2s.',
      highlights: [
        'Receipt & invoice OCR direct to QuickBooks feeds',
        '94% client tax document return rate within 7 days',
        '10-second quarterly review presentation builder'
      ],
      linkQuery: 'finance',
      blueprintSlug: 'accounting-cpas'
    },
    {
      id: 'field-services',
      industry: 'HVAC, Plumbing & Field Trades',
      category: 'Field Services',
      client: 'Apex Comfort Heating & Air (50 Trucks)',
      icon: Wrench,
      headline: 'Capturing $24,000/mo in Night Emergency Calls & Route Optimization.',
      statValue: '+$24k',
      statLabel: 'Monthly Night Revenue',
      statSub: '100% emergency repair call capture',
      preview: 'Emergency calls after 5 PM went to voicemail, losing $3,000+ system replacement jobs while technicians burned hours in crisscrossed traffic.',
      highlights: [
        '24/7 voice dispatcher booking into ServiceTitan',
        'Dynamic route clustering cutting windshield drive time',
        'Instant field mobile pay & 5-star Google review flow'
      ],
      linkQuery: 'field-services',
      blueprintSlug: 'hvac-field-services'
    }
  ];

  return (
    <section className="py-32 px-6 md:px-16 bg-black text-white border-b border-zinc-900 relative select-none font-sans">
      
      {/* Ambient Radial Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FF5500]/5 rounded-full blur-[260px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* ========================================================================= */}
        {/* SECTION MANIFESTO HEADER (CLEAR CASE STUDIES IDENTITY) */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 pb-10 border-b border-zinc-900 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
              <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-mono font-bold">
                PROVEN CLIENT CASE STUDIES
              </p>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.04]">
              Real transformations.{' '}
              <span className="text-[#FF5500]">Real business impact.</span>
            </h2>
          </div>
          
          <div className="max-w-md flex flex-col items-start lg:items-end justify-between">
            <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed mb-4 lg:text-right">
              Explore how custom AI systems solved critical bottlenecks for fast-growing businesses. Click any card to read the complete case study.
            </p>
            <Link
              to="/use-cases"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold text-[#FF5500] hover:text-white transition-colors group"
            >
              <span>Explore All 4 Case Studies</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4 BEAUTIFULLY CRAFTED CASE STUDY CARDS (HIGH-VISIBILITY INDUSTRY BADGES) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study, idx) => {
            const Icon = study.icon;
            return (
              <div
                key={study.id}
                className="group relative bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-black border border-white/[0.1] hover:border-[#FF5500]/70 rounded-3xl p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_20px_50px_-15px_rgba(255,85,0,0.3)] hover:-translate-y-1"
              >
                {/* Top Subtle Amber Rim Light */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF5500]/60 group-hover:via-[#FF5500] to-transparent rounded-t-3xl transition-colors duration-300" />

                <div>
                  {/* 1. LARGE, CRYSTAL-CLEAR INDUSTRY BANNER */}
                  <div className="mb-6 pb-6 border-b border-zinc-900 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.1] group-hover:border-[#FF5500]/60 group-hover:bg-[#FF5500]/15 flex items-center justify-center text-[#FF5500] transition-all duration-300 shrink-0 mt-0.5">
                        <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        {/* Prominent Industry Name */}
                        <h3 className="font-display text-lg sm:text-xl font-black text-white tracking-tight group-hover:text-white transition-colors">
                          {study.industry}
                        </h3>
                        {/* Client Name & Verification Tag */}
                        <p className="font-mono text-xs text-zinc-400 font-medium mt-1">
                          ✦ {study.client}
                        </p>
                      </div>
                    </div>

                    <span className="font-mono text-xs text-zinc-500 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/[0.06] shrink-0">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* 2. TRANSFORMATION HEADLINE */}
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-5">
                    "{study.headline}"
                  </h4>

                  {/* 3. HERO BIG METRIC BLOCK */}
                  <div className="my-6 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] group-hover:border-[#FF5500]/30 transition-all flex items-baseline gap-4">
                    <span className="font-display text-4xl sm:text-5xl font-black text-[#FF5500] leading-none tracking-tight">
                      {study.statValue}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white leading-tight">
                        {study.statLabel}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500 mt-0.5">
                        {study.statSub}
                      </div>
                    </div>
                  </div>

                  {/* 4. STORY PREVIEW */}
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                    {study.preview}
                  </p>

                  {/* 5. 3 CORE DEPLOYED CAPABILITIES */}
                  <div className="space-y-2.5 mb-8">
                    {study.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs text-zinc-300 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                        <span className="leading-snug">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. PROMINENT ACTIONS */}
                <div className="pt-6 border-t border-zinc-900 flex items-center justify-between gap-4">
                  <Link
                    to={`/use-cases?study=${study.linkQuery}`}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-white hover:bg-zinc-200 text-black font-sans font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md group-hover:bg-[#FF5500] group-hover:text-black cursor-pointer"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to={`/what-we-automate/${study.blueprintSlug}`}
                    title="View Technical Blueprint"
                    className="p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-zinc-400 hover:text-white transition-all shrink-0 cursor-pointer"
                  >
                    <span className="text-xs font-mono font-bold">Blueprint ↗</span>
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
