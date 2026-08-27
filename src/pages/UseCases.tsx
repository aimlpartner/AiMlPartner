import React, { useState } from 'react';
import {
  Stethoscope,
  Scale,
  Calculator,
  Wrench,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Clock,
  ShieldCheck,
  Zap,
  Quote,
  Layers,
  ChevronRight,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { USIntakeCTA } from '../components/us/USIntakeCTA';
import { SEO } from '../components/SEO';

interface CaseStudy {
  id: string;
  industry: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  headline: string;
  subheadline: string;
  clientContext: {
    type: string;
    challenge: string;
  };
  whatWeBuilt: string;
  coreSolutions: {
    title: string;
    description: string;
    impact: string;
  }[];
  transformation: {
    before: string;
    after: string;
  };
  metrics: {
    value: string;
    label: string;
    context: string;
  }[];
  clientQuote: {
    quote: string;
    author: string;
    role: string;
  };
  slug: string;
}

export function UseCases() {
  const [activeTab, setActiveTab] = useState<string>('healthcare');

  const caseStudies: CaseStudy[] = [
    {
      id: 'healthcare',
      industry: 'Healthcare & Medical Clinics',
      category: 'Clinical & Patient Operations',
      icon: Stethoscope,
      headline: 'Giving Doctors Their Evenings Back & Never Missing a Patient Call.',
      subheadline: 'How we helped multi-provider clinics eliminate 20+ hours of manual charting per week and capture 100% of after-hours appointments without hiring additional staff.',
      clientContext: {
        type: '14-Provider Outpatient & Specialty Clinic Group',
        challenge: 'Physicians were spending 2 to 3 hours every night at home finishing EHR encounter notes. Meanwhile, peak morning phone queues caused 30% of patients to hang up and book with competing health systems.'
      },
      whatWeBuilt: 'We deployed a HIPAA-compliant ambient AI scribe that listens during consultations and writes structured clinical notes ready for doctor sign-off. In parallel, a 24/7 conversational voice assistant answers the phone in zero rings to book patients directly into their practice calendar.',
      coreSolutions: [
        {
          title: 'Ambient Clinical Charting',
          description: 'Doctors speak naturally with patients. The AI automatically compiles history, physical exams, and treatment plans into perfect EHR charts in 15 seconds.',
          impact: '2.5 hours saved per physician daily'
        },
        {
          title: '24/7 Zero-Ring Phone Reception',
          description: 'Answers patient calls instantly day or night, answers clinic FAQs, verifies insurance eligibility, and schedules appointments directly into the calendar.',
          impact: '100% call answer rate with 0 hold time'
        },
        {
          title: 'Automated 48h Insurance Pre-Verification',
          description: 'Verifies coverage and deductibles before patients arrive, eliminating surprise billing and stopping claim rejections before they happen.',
          impact: '<1.2% claim rejection rate'
        }
      ],
      transformation: {
        before: 'Exhausted doctors typing notes until 9 PM, missed appointment calls, and front-desk staff overwhelmed by phone queues.',
        after: 'Same-day chart sign-offs before doctors leave the clinic, instant 24/7 patient booking, and happy, unburdened staff.'
      },
      metrics: [
        { value: '2.5 hrs', label: 'Doctor Time Saved', context: 'Every day per provider' },
        { value: '100%', label: 'Call Answer Rate', context: 'Zero patient hold abandonment' },
        { value: '+42%', label: 'After-Hours Bookings', context: 'Captured without extra headcount' }
      ],
      clientQuote: {
        quote: "For the first time in ten years, our physicians leave the office when the last patient leaves. The ambient notes are more thorough than what we typed manually.",
        author: "Dr. Marcus Vance",
        role: "Managing Partner, Summit Medical Group"
      },
      slug: 'medical-clinics'
    },
    {
      id: 'legal',
      industry: 'Law Practices & Legal Firms',
      category: 'Litigation & Retainer Acquisition',
      icon: Scale,
      headline: 'Signing High-Retainer Clients in 60 Seconds & Automating Contract Review.',
      subheadline: 'How we transformed client intake speed from hours to seconds and automated 100+ page contract risk redlining for boutique and high-stakes litigation firms.',
      clientContext: {
        type: 'Commercial Litigation & Corporate Practice',
        challenge: 'Prospects shopping for legal counsel signed with whoever answered first. The firm lost 6-figure retainers due to 3-hour callback delays and spent endless unbillable partner hours reviewing routine contract risk.'
      },
      whatWeBuilt: 'We built an instant sub-60s intake system that qualifies leads, runs automated conflict checks, and sends out engagement retainers via DocuSign in seconds. Alongside this, an AI risk analyzer scans 100+ page contracts against the firm’s playbook in minutes.',
      coreSolutions: [
        {
          title: 'Sub-60s Intake & Retainer Dispatch',
          description: 'Inbound web leads and calls are vetted against practice criteria, cleared for conflicts, and sent customized retainer agreements within 1 minute.',
          impact: '3.8x increase in signed client retainers'
        },
        {
          title: 'AI Contract Risk Redlining',
          description: 'Scans commercial leases, NDAs, and purchase agreements to flag uncapped indemnification, liability traps, and hidden renewal clauses.',
          impact: '10x faster review with zero missed risks'
        },
        {
          title: 'Automated Billable Time Capture',
          description: 'Passively monitors client communications and document drafts, preparing itemized time entries for 1-click approval into Clio.',
          impact: '+$18k recovered billable revenue per attorney/mo'
        }
      ],
      transformation: {
        before: 'Leads going cold before attorneys could call back, unbilled hours slipping through the cracks, and weekends spent reviewing contract boilerplate.',
        after: 'Clients e-signing retainers in under 2 minutes, every billable minute captured automatically, and instant contract risk summaries.'
      },
      metrics: [
        { value: '<30s', label: 'Lead Response Time', context: 'From web inquiry to e-retainer' },
        { value: '3.8x', label: 'Retainer Sign-Up Rate', context: 'Winning deals before competitors' },
        { value: '10x', label: 'Contract Review Speed', context: '100 pages analyzed in minutes' }
      ],
      clientQuote: {
        quote: "We used to lose deals because we called back 2 hours later. Now our AI qualifies the client, runs conflict checks, and sends the retainer before they even close their browser.",
        author: "Sarah Sterling",
        role: "Senior Partner, Sterling & Cole LLP"
      },
      slug: 'law-practices'
    },
    {
      id: 'finance',
      industry: 'Accounting, CPAs & Wealth Advisory',
      category: 'Tax & Advisory Operations',
      icon: Calculator,
      headline: 'Smooth Month-End Closes & Ending the Tax Season Document Chase.',
      subheadline: 'How we helped accounting and wealth advisory firms automate receipt categorization, chase missing client tax files, and generate quarterly client review decks in seconds.',
      clientContext: {
        type: 'Regional CPA Firm & Wealth Advisory Practice',
        challenge: 'Accountants were buried in manual data entry from shoe-box receipts and spent hundreds of hours sending follow-up emails for missing 1099s and W-2s during peak tax season.'
      },
      whatWeBuilt: 'We engineered a computer-vision document engine that classifies and reconciles receipts into QuickBooks with 99.8% precision, an autonomous SMS document chaser for clients, and an automated presentation deck builder for wealth reviews.',
      coreSolutions: [
        {
          title: 'Optical Receipt & Auto-GL Coding',
          description: 'Instantly reads receipts, vendor bills, and tax forms, matching line items to bank feeds and general ledger accounts automatically.',
          impact: 'Month-end close completed 70% faster'
        },
        {
          title: 'Autonomous Client Document Chaser',
          description: 'Monitors missing tax deliverables and sends friendly, automated SMS reminders with 1-click upload links until all files are collected.',
          impact: '94% of tax documents returned in 7 days'
        },
        {
          title: 'Quarterly Review Slide Deck Builder',
          description: 'Aggregates custodian returns from Schwab and Fidelity to generate personalized, branded client presentation slide decks in 10 seconds.',
          impact: 'Saved 4 hours of prep per client meeting'
        }
      ],
      transformation: {
        before: 'Stressful tax seasons, endless email tag for missing receipts, and manual slide deck preparation before every client review.',
        after: 'Clean books updated in real time, clients uploading tax files within hours via mobile SMS, and automated review decks ready on demand.'
      },
      metrics: [
        { value: '70%', label: 'Faster Month-End Close', context: 'Reconciled without manual typing' },
        { value: '94%', label: 'Document Return Rate', context: 'Within 7 days via automated SMS' },
        { value: '0 hrs', label: 'Data Entry Time', context: 'Direct sync into QuickBooks & Xero' }
      ],
      clientQuote: {
        quote: "Our last tax season was our calmest on record. We didn't have to hire seasonal data-entry temps because the AI handled all the receipt scanning and client follow-ups.",
        author: "David Chen, CPA",
        role: "Managing Director, Chen & Associates"
      },
      slug: 'accounting-cpas'
    },
    {
      id: 'field-services',
      industry: 'Field Services, HVAC & Trades',
      category: 'Emergency Dispatch & Field Ops',
      icon: Wrench,
      headline: 'Capturing High-Dollar Night Emergencies & Eliminating Wasted Drive Time.',
      subheadline: 'How we helped residential and commercial contractors capture 100% of after-hours emergency jobs and optimize daily service routes to boost completed repairs.',
      clientContext: {
        type: '50-Truck HVAC, Plumbing & Electrical Contractor',
        challenge: 'Emergency calls after 5 PM went to an answering service or voicemail, losing $3,000+ system replacement jobs to competitors. Technicians spent 30% of their workday stuck in traffic driving crisscrossed routes.'
      },
      whatWeBuilt: 'We deployed a 24/7 conversational voice dispatcher that books emergency repairs directly into ServiceTitan at night, paired with a geographic route clustering system and an automated 1-click Google review SMS engine upon job completion.',
      coreSolutions: [
        {
          title: '24/7 Voice Emergency Dispatcher',
          description: 'Answers night and weekend calls instantly, triages emergency urgency, notifies on-call technicians, and locks in priority dispatch slots.',
          impact: '+$24,000/mo in captured emergency jobs'
        },
        {
          title: 'Dynamic Route & Territory Clustering',
          description: 'Groups service appointments by neighborhood and route density, drastically cutting drive time and fuel burn.',
          impact: '+22% more jobs completed per technician/day'
        },
        {
          title: 'Instant Field Invoicing & 5-Star Reviews',
          description: 'Settles mobile card payments on job completion and immediately texts customers an automated 1-click Google review link.',
          impact: '4.5x surge in 5-star Google reviews'
        }
      ],
      transformation: {
        before: 'Missed night emergency calls, angry homeowners, technicians burning fuel stuck in traffic, and delayed customer payments.',
        after: 'Every night call booked instantly, technicians working clustered routes with minimal driving, and instant payment settlement.'
      },
      metrics: [
        { value: '100%', label: 'Emergency Call Capture', context: 'Zero lost night/weekend jobs' },
        { value: '+22%', label: 'Jobs Completed Per Day', context: 'Slashing windshield drive time' },
        { value: '4.5x', label: 'Google Review Growth', context: 'Automated same-day review engine' }
      ],
      clientQuote: {
        quote: "Our night emergency revenue jumped by $25,000 in the first month alone. The voice AI answers before the second ring and books the job right into our dispatch board.",
        author: "Brad Kowalski",
        role: "Owner, Apex Comfort Heating & Air"
      },
      slug: 'hvac-field-services'
    }
  ];

  const currentStudy = caseStudies.find((c) => c.id === activeTab) || caseStudies[0];
  const Icon = currentStudy.icon;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-black pt-28 pb-24 relative overflow-hidden font-sans">
      <SEO
        title="Real-World AI Use Cases & Case Studies - AIML Partner"
        description="See real-world AI deployment case studies in Healthcare, Law, Finance, and Field Services. Understand the challenges, the automated solutions, and the business impact."
        url="https://aimlpartner.com/use-cases"
      />

      {/* Atmospheric Ambient Lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,85,0,0.12),transparent_70%)] blur-[140px] pointer-events-none" />
      <div className="absolute top-[45%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,85,0,0.08),transparent_70%)] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 pt-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5500] block mb-3">
            Real Deployments · Measurable Outcomes
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            Proven AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-orange-400 to-amber-300">Use Cases</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl mx-auto">
            See exactly how we eliminate operational friction, automate high-value workflows, and drive measurable revenue for market leaders in four major industries.
          </p>
        </div>

        {/* Editorial Sector Selector */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {caseStudies.map((study) => {
              const StudyIcon = study.icon;
              const isActive = study.id === activeTab;
              return (
                <button
                  key={study.id}
                  onClick={() => setActiveTab(study.id)}
                  className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-zinc-900 border-[#FF5500] shadow-[0_0_35px_-8px_rgba(255,85,0,0.4)]'
                      : 'bg-zinc-950/70 border-white/[0.08] hover:border-white/20 hover:bg-zinc-900/40 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                      isActive ? 'bg-[#FF5500] text-black border-[#FF5500]' : 'bg-white/[0.04] text-zinc-400 border-white/[0.08]'
                    }`}>
                      <StudyIcon className="w-5 h-5" />
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
                    )}
                  </div>
                  <div>
                    <h3 className={`text-sm sm:text-base font-bold tracking-tight mb-0.5 ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                      {study.industry.split('&')[0]}
                    </h3>
                    <p className="text-[11px] text-zinc-500 font-medium line-clamp-1">
                      {study.category}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* THE MAIN EDITORIAL CASE STUDY SHOWCASE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStudy.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-10 mb-20"
          >
            
            {/* Main Headline & Context Card */}
            <div className="relative bg-zinc-950/90 border border-white/10 rounded-3xl p-7 sm:p-10 backdrop-blur-2xl shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/30 flex items-center justify-center text-[#FF5500]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF5500]">
                        {currentStudy.category}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {currentStudy.industry}
                      </h2>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                    {currentStudy.headline}
                  </h3>
                  <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                    {currentStudy.subheadline}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <Link
                    to={`/what-we-automate/${currentStudy.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white transition-all text-center"
                  >
                    <span>View SMB Blueprint</span>
                    <ArrowUpRight className="w-4 h-4 text-[#FF5500]" />
                  </Link>
                  <a
                    href="#intake"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF5500] hover:bg-orange-500 text-black text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_25px_-5px_rgba(255,85,0,0.5)] text-center"
                  >
                    <span>Deploy For Your Firm</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Verified Impact Metrics Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/[0.08]">
                {currentStudy.metrics.map((metric, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <span className="text-3xl sm:text-4xl font-black text-[#FF5500] tracking-tight block mb-1">
                      {metric.value}
                    </span>
                    <span className="text-sm font-bold text-white block mb-0.5">
                      {metric.label}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">
                      {metric.context}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* The Story: Challenge vs. What We Built */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left: The Challenge */}
              <div className="lg:col-span-5 bg-zinc-950/80 border border-white/[0.08] rounded-3xl p-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 block mb-2">
                    The Business Problem
                  </span>
                  <h4 className="text-xl font-bold text-white tracking-tight mb-4">
                    The Situation & Friction
                  </h4>
                  <div className="space-y-3 text-sm text-zinc-300 leading-relaxed mb-6">
                    <p className="font-semibold text-white">
                      Profile: {currentStudy.clientContext.type}
                    </p>
                    <p>
                      {currentStudy.clientContext.challenge}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-red-950/20 border border-red-900/30 text-xs text-zinc-300">
                  <span className="text-red-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                    Previous Bottleneck
                  </span>
                  <p className="leading-relaxed">
                    {currentStudy.transformation.before}
                  </p>
                </div>
              </div>

              {/* Right: What We Built & The Automated Reality */}
              <div className="lg:col-span-7 bg-zinc-950/80 border border-white/[0.08] rounded-3xl p-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF5500] block mb-2">
                    Our Automated Solution
                  </span>
                  <h4 className="text-xl font-bold text-white tracking-tight mb-4">
                    What We Built & Engineered
                  </h4>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                    {currentStudy.whatWeBuilt}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/25 text-xs text-zinc-200">
                  <span className="text-[#FF5500] font-bold uppercase tracking-wider text-[10px] block mb-1">
                    The New Reality
                  </span>
                  <p className="leading-relaxed font-medium">
                    {currentStudy.transformation.after}
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Concrete Capabilities We Deployed */}
            <div>
              <div className="mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF5500] block mb-1">
                  System Architecture
                </span>
                <h4 className="text-2xl font-bold text-white tracking-tight">
                  3 Core Automated Capabilities
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentStudy.coreSolutions.map((solution, idx) => (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 rounded-3xl bg-zinc-950/80 border border-white/[0.08] hover:border-[#FF5500]/40 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-xl bg-[#FF5500]/10 text-[#FF5500] font-mono text-xs font-bold flex items-center justify-center mb-4">
                        0{idx + 1}
                      </div>
                      <h5 className="text-lg font-bold text-white mb-2.5 group-hover:text-[#FF5500] transition-colors">
                        {solution.title}
                      </h5>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                        {solution.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-semibold text-[#FF5500]">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{solution.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Executive Verdict Quote */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-white/10 relative overflow-hidden shadow-2xl">
              <Quote className="w-12 h-12 text-[#FF5500]/20 absolute top-6 right-6 pointer-events-none" />
              
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-white italic leading-relaxed mb-6 max-w-3xl">
                "{currentStudy.clientQuote.quote}"
              </p>

              <div>
                <span className="text-base font-bold text-white block">
                  {currentStudy.clientQuote.author}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {currentStudy.clientQuote.role}
                </span>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Directory Bridge Banner */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-zinc-950/80 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF5500] block mb-1.5">
              15+ SMB Verticals Available
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              Looking for a different industry?
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              We engineer custom AI automation blueprints for Dental Clinics, Auto Dealerships, Construction Contractors, Freight Logistics, Machine Shops, and more.
            </p>
          </div>

          <Link
            to="/what-we-automate"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xl"
          >
            <span>Explore All 15 Industry Blueprints</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Global Intake Form CTA */}
        <div id="intake">
          <USIntakeCTA />
        </div>
      </div>
    </div>
  );
}
