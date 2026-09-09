import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Compass, 
  Eye, 
  Layers, 
  ShieldCheck, 
  Maximize2 
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { USIntakeCTA } from '../components/us/USIntakeCTA';

interface ArtisticProduct {
  id: string;
  numeral: string;
  roman: string;
  title: string;
  subtitle: string;
  insignia: string;
  insigniaAlt: string;
  monolithImage: string;
  curatorCategory: string;
  manifestoLead: string;
  manifestoBody: string[];
  philosophicalQuote: string;
  quoteAuthor: string;
  exhibitionPlaque: {
    medium: string;
    origin: string;
    status: string;
    essence: string;
  };
  systemDossier: {
    engineCore: string;
    telemetryNodes: {
      label: string;
      value: string;
    }[];
    statusBeacon: string;
  };
  sculpturalAttributes: {
    name: string;
    definition: string;
  }[];
  externalLinkText?: string;
  externalLinkNote?: string;
}

const ARTISTIC_WORKS: ArtisticProduct[] = [
  // --------------------------------------------------------------------------
  // WORK I: BRANDTOPOST
  // --------------------------------------------------------------------------
  {
    id: 'brandtopost',
    numeral: '01',
    roman: 'WORK I',
    title: 'BrandToPost',
    subtitle: 'AI Brand Content & Social Automation',
    insignia: '/b2p_logo.png',
    insigniaAlt: 'BrandToPost Insignia',
    monolithImage: '/b2p_monolith.jpg',
    curatorCategory: 'AI CONTENT & SOCIAL AUTOMATION',
    manifestoLead: 'Your entire social pipeline on autopilot. Zero agency headaches.',
    manifestoBody: [
      'Traditional marketing agencies take weeks and hefty monthly retainers just to draft a handful of social posts. We got tired of waiting, so we built the solution.',
      'BrandToPost scans your website, product docs, and brand guidelines to understand your voice inside out. Then it writes, designs, and schedules high-quality content across LinkedIn, Instagram, X, and Reddit automatically.',
      'No endless email chains, revision delays, or forgotten post schedules. Just consistent, on-brand content published at scale.'
    ],
    philosophicalQuote: 'If you are building fast, your content pipeline has to keep up.',
    quoteAuthor: 'BRANDTOPOST FOUNDER PRINCIPLE',
    exhibitionPlaque: {
      medium: 'Gemini AI Engine + Multi-Channel Social APIs',
      origin: 'AIMLPartner Labs // Built In-House',
      status: 'Live Pilot with Growing Brands',
      essence: 'Hands-Free Brand Content at Scale'
    },
    systemDossier: {
      engineCore: 'Gemini 2.0 Engine with Custom Brand Voice Tuning',
      telemetryNodes: [
        { label: 'INPUT SOURCES', value: 'Websites, Docs & Brand Guides' },
        { label: 'GENERATION SPEED', value: 'Instant Social Content Drafting' },
        { label: 'CHANNELS', value: 'LinkedIn, Instagram, X, Reddit' },
        { label: 'STATUS', value: 'Live in Production // Real Users' }
      ],
      statusBeacon: 'LIVE IN PRODUCTION'
    },
    sculpturalAttributes: [
      {
        name: 'Smart Context Ingestion',
        definition: 'Scans your website and product documentation to learn your exact tone, audience, and value proposition.'
      },
      {
        name: 'Guardrails & Accuracy',
        definition: 'Built-in review loops ensure every post is accurate, factual, and strictly aligned with your brand guidelines.'
      },
      {
        name: 'Tailored Channel Formats',
        definition: 'Automatically formats copy for professional LinkedIn discussions, visual Instagram carousels, and Reddit threads.'
      }
    ],
    externalLinkText: 'Explore BrandToPost',
    externalLinkNote: 'Live Beta // Request Early Access'
  },

  // --------------------------------------------------------------------------
  // WORK II: KNWN
  // --------------------------------------------------------------------------
  {
    id: 'knwn',
    numeral: '02',
    roman: 'WORK II',
    title: 'KNWN',
    subtitle: 'Direct Network for Elite Film & Commercial Crews',
    insignia: '/weareknwn_logo.png',
    insigniaAlt: 'WEAREKNWN Insignia',
    monolithImage: '/knwn_cinema_rig.jpg',
    curatorCategory: 'FILM PRODUCTION & CREW MARKETPLACE',
    manifestoLead: 'Book top-tier cinema crews directly. No agency markups.',
    manifestoBody: [
      'Hiring cinematographers and commercial crews has always been slowed down by talent agencies charging 30% markups and adding weeks of back-and-forth.',
      'KNWN connects commercial directors and production companies directly with vetted Directors of Photography, Steadicam operators, and gaffers who shoot for top brands and studios.',
      'Zero middlemen. Verified camera gear down to the lens package, and peer-reviewed credits you can trust on set.'
    ],
    philosophicalQuote: 'Great films get made when directors and camera crews connect directly.',
    quoteAuthor: 'THE KNWN PRINCIPLE',
    exhibitionPlaque: {
      medium: 'Verified Gear Registry + Direct Booking Platform',
      origin: 'AIMLPartner Labs // Built In-House',
      status: 'Active Crews in NY, LA & London',
      essence: 'Direct Crew Hiring with Zero Agency Fees'
    },
    systemDossier: {
      engineCore: 'Direct Booking Engine with Verified Gear & Credits',
      telemetryNodes: [
        { label: 'GEAR REGISTRY', value: 'ARRI Alexa 35, RED, Anamorphic Glass' },
        { label: 'VETTED ROSTER', value: 'Top Commercial & Film Crew' },
        { label: 'COMMISSION', value: '0% Agency Markups' },
        { label: 'KEY MARKETS', value: 'New York, Los Angeles, London' }
      ],
      statusBeacon: 'ACTIVE CREW NETWORK'
    },
    sculpturalAttributes: [
      {
        name: 'Verified Gear Registry',
        definition: 'Verified camera kits from ARRI Alexa 35 to Steadicams, confirmed directly with working operators.'
      },
      {
        name: 'Fast Crew Assembly',
        definition: 'Quickly find and assemble matching camera, lighting, and grip teams for any commercial or narrative shoot.'
      },
      {
        name: 'Direct Messaging & Booking',
        definition: 'Direct communication and transparent scheduling between directors, producers, and crew.'
      }
    ],
    externalLinkText: 'Explore KNWN',
    externalLinkNote: 'Vetted Community // By Invitation'
  },

  // --------------------------------------------------------------------------
  // WORK III: SUPERHERO FITNESS OS
  // --------------------------------------------------------------------------
  {
    id: 'superherofs',
    numeral: '03',
    roman: 'WORK III',
    title: 'SuperHero Fitness OS',
    subtitle: 'Modern All-in-One Operating System for Gyms',
    insignia: '/superherologo.png',
    insigniaAlt: 'SuperHero Fitness OS Emblem',
    monolithImage: '/superhero_gym_sanctuary.jpg',
    curatorCategory: 'GYM MANAGEMENT & FITNESS TECH',
    manifestoLead: 'Smart gym management meets AI workout coaching.',
    manifestoBody: [
      'Running a modern gym usually means juggling four separate tools: turnstiles, POS systems, spreadsheets, and trainer apps that do not talk to each other.',
      'SuperHero Fitness OS brings everything together: smart QR turnstiles, shake bar sales, member management, and an AI workout coach called Superne.',
      'Members get personalized progressive training and instant check-ins, while gym owners get a completely automated club operation.'
    ],
    philosophicalQuote: 'Real fitness progress happens when great coaching is powered by simple, reliable tech.',
    quoteAuthor: 'SUPERHERO FITNESS PRINCIPLE',
    exhibitionPlaque: {
      medium: 'Hardware Turnstile Webhooks + AI Coach + Club POS',
      origin: 'AIMLPartner Labs // Built In-House',
      status: 'Live in Active Gym Facilities',
      essence: 'All-In-One Gym Operations & Coaching'
    },
    systemDossier: {
      engineCore: 'Connected Gym OS with AI Coaching & Hardware Sync',
      telemetryNodes: [
        { label: 'CHECK-IN SPEED', value: 'Sub-300ms QR Turnstile Scan' },
        { label: 'AI COACH', value: 'Superne Progressive Workout Logic' },
        { label: 'IN-CLUB POS', value: 'Shake Bar & Supplement Checkout' },
        { label: 'DEPLOYMENT', value: 'Live in Active Gym Facilities' }
      ],
      statusBeacon: 'LIVE GYM DEPLOYMENT'
    },
    sculpturalAttributes: [
      {
        name: 'Fast QR Turnstile Access',
        definition: 'Instant, secure entry via rotating QR codes directly on members\' phones.'
      },
      {
        name: 'Superne AI Workout Coach',
        definition: 'Tracks workouts, sets, and weights to automatically suggest progressive overload.'
      },
      {
        name: 'Front Desk & Shake Bar POS',
        definition: 'Quick checkout for smoothies and supplements connected straight to member accounts.'
      }
    ],
    externalLinkText: 'Explore SuperHero OS',
    externalLinkNote: 'Live in Active Gyms // Request Demo'
  }
];

export function Products() {
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentWork = ARTISTIC_WORKS[activeWorkIndex];

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#FF5500] selection:text-black relative overflow-hidden">
      <SEO
        title="Our In-House Products: BrandToPost, KNWN & SuperHero Fitness OS | AIMLPartner"
        description="Explore three production platforms designed, built, and operated in-house by AIMLPartner: BrandToPost, KNWN, and SuperHero Fitness OS."
        url="https://aimlpartner.com/products"
      />

      {/* ========================================================================= */}
      {/* 1. CINEMATIC SATURN HERO ATMOSPHERE (BESPOKE HIGH-RES SATURN & RINGS) */}
      {/* ========================================================================= */}
      <div className="absolute top-0 left-0 right-0 h-[750px] sm:h-[880px] lg:h-[950px] pointer-events-none z-0 overflow-hidden select-none">
        {/* High-Resolution Majestic Saturn & Rings Hero Image */}
        <img
          src="/saturn_products_hero.jpg"
          alt="Saturn Cosmic Orbit"
          className="w-full h-full object-cover object-top lg:object-center opacity-85 brightness-105 contrast-110 filter saturate-[1.05]"
        />

        {/* Top Edge Fade for Navbar Readability */}
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-black via-black/50 to-transparent" />

        {/* Soft Radial Ambient Solar Flare */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-[#FF5500]/12 rounded-full blur-[160px]" />

        {/* Text Backdrop Scrim on the Left to Ensure Razor-Sharp Typographic Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

        {/* Seamless Bottom Gradient Fade into the Gallery Section */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* ========================================================================= */}
      {/* 2. HEADER OPENING */}
      {/* ========================================================================= */}
      <header className="relative z-10 pt-36 sm:pt-48 pb-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-zinc-900 pb-16">
          <div className="max-w-4xl">
            <h1 className="font-display text-4xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white leading-[0.98] uppercase mb-8">
              Products We <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-[#FF5500]">
                Built &amp; Own.
              </span>
            </h1>

            <p className="font-sans text-base sm:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed">
              We don't just build software for clients. We design, launch, and operate our own production platforms. Here are three products we created in-house from day one.
            </p>
          </div>

          {/* Product Stamp */}
          <div className="lg:text-right shrink-0 font-display text-xs text-zinc-500 space-y-1 border-l lg:border-l-0 lg:border-r border-zinc-800 pl-4 lg:pl-0 lg:pr-4">
            <div className="text-white font-bold tracking-wider uppercase">IN-HOUSE PRODUCTS</div>
            <div className="text-zinc-400">EST. 2026 // BEDMINSTER, NJ</div>
            <div className="text-[#FF5500] font-bold">100% PROPRIETARY IP</div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* PRODUCT SWITCHER DOCK */}
        {/* ===================================================================== */}
        <div className="pt-10 flex flex-wrap items-center justify-start gap-3 sm:gap-4">
          <span className="text-xs font-display uppercase tracking-wider text-zinc-500 font-bold mr-2">
            SELECT PRODUCT:
          </span>
          {ARTISTIC_WORKS.map((work, idx) => {
            const isSelected = activeWorkIndex === idx;
            return (
              <button
                key={work.id}
                onClick={() => setActiveWorkIndex(idx)}
                className={`group relative flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? 'bg-zinc-900 border-[#FF5500] text-white shadow-us-pop'
                    : 'bg-black/75 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-black/90 p-0.5 border border-zinc-800 shrink-0 flex items-center justify-center">
                  <img
                    src={work.insignia}
                    alt={work.insigniaAlt}
                    className="w-full h-full object-contain"
                  />
                </span>

                <span className="font-display text-xs font-bold tracking-wider uppercase">
                  {work.roman} // {work.title}
                </span>

                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. THE WORK MONOLITH (FOCUSED HIGH-FASHION SCULPTURAL SHOWCASE) */}
      {/* ========================================================================= */}
      <section className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto pb-32">
        <AnimatePresence mode="wait">
          <motion.article
            key={currentWork.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Massive Architectural Numeral Watermark */}
            <div className="absolute -top-16 -left-6 sm:-left-12 font-display text-[14rem] sm:text-[22rem] font-black text-white/[0.03] select-none pointer-events-none -z-10 leading-none">
              {currentWork.numeral}
            </div>

            {/* Header Identity Row with Official Insignia Stamp */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 pt-8">
              <div className="flex items-center gap-6">
                {/* Official Insignia Atelier Box */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-zinc-950/90 border border-zinc-800 p-4 shrink-0 shadow-2xl flex items-center justify-center relative group">
                  <img
                    src={currentWork.insignia}
                    alt={currentWork.insigniaAlt}
                    className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#FF5500] border-2 border-black" />
                </div>

                <div>
                  <div className="text-xs font-display tracking-wider uppercase text-[#FF5500] mb-1 font-bold">
                    {currentWork.curatorCategory}
                  </div>
                  <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
                    {currentWork.title}
                  </h2>
                  <p className="font-sans text-sm sm:text-base text-zinc-400 font-light italic mt-1">
                    {currentWork.subtitle}
                  </p>
                </div>
              </div>

              {/* Status Metadata */}
              <div className="font-display text-xs text-zinc-400 space-y-1 md:text-right border-l-2 md:border-l-0 md:border-r-2 border-[#FF5500] pl-4 md:pl-0 md:pr-4">
                <div className="text-zinc-500 uppercase tracking-wider font-semibold">STATUS // ORIGIN</div>
                <div className="text-white font-bold tracking-wider uppercase">{currentWork.exhibitionPlaque.status}</div>
                <div className="text-zinc-400 tracking-wider">{currentWork.exhibitionPlaque.origin}</div>
              </div>
            </div>

            {/* Sculptural Core: 2-Column Monolithic Composition */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* LEFT COLUMN: THE MONOLITH CANVAS & SYSTEM DOSSIER */}
              <div className="lg:col-span-6 flex flex-col space-y-6">
                {/* 1. Unobstructed Hero Artwork Slab */}
                <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[540px] rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-2xl group">
                  {/* High-Impact Image */}
                  <img
                    src={currentWork.monolithImage}
                    alt={`${currentWork.title} Architectural Monolith`}
                    className="w-full h-full object-cover object-center brightness-95 contrast-105 filter group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  
                  {/* Subtle Chiaroscuro Overlays that allow image details to shine */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                    <div className="text-[11px] font-display tracking-wider text-white uppercase bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-700/70 font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
                      <span>PRODUCT // {currentWork.numeral}</span>
                    </div>

                    <div className="text-[10px] font-display tracking-wider text-zinc-400 uppercase bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800">
                      IN-HOUSE SOFTWARE
                    </div>
                  </div>

                  {/* Bottom Minimalist Status Bar */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs font-display">
                    <span className="text-zinc-300 font-bold tracking-wider uppercase bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-zinc-800/80">
                      {currentWork.title}
                    </span>
                    <span className="text-[#FF5500] font-bold tracking-wider uppercase bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-zinc-800/80">
                      100% IN-HOUSE IP
                    </span>
                  </div>
                </div>

                {/* 2. Philosophical Manifesto Quote Card */}
                <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/90 shadow-xl backdrop-blur-md relative overflow-hidden group hover:border-[#FF5500]/50 transition-colors duration-300">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#FF5500]" />
                  <p className="font-serif italic text-base sm:text-lg text-zinc-100 leading-snug pl-2">
                    "{currentWork.philosophicalQuote}"
                  </p>
                  <p className="font-display text-xs tracking-wider text-[#FF5500] uppercase mt-3 font-bold pl-2">
                    // {currentWork.quoteAuthor}
                  </p>
                </div>

                {/* 3. Architectural Telemetry & Engine Specs Card (Eliminates empty space) */}
                <div className="p-6 rounded-3xl bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-md space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <span className="text-[11px] font-display tracking-wider uppercase text-zinc-500 font-bold">
                      SYSTEM SPECS &amp; ARCHITECTURE
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-display uppercase tracking-wider text-[#FF5500] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] animate-pulse" />
                      <span>{currentWork.systemDossier.statusBeacon}</span>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-400 font-sans leading-relaxed">
                    <span className="text-zinc-500 font-display uppercase text-[10px] tracking-wider font-bold block mb-1">
                      ENGINE CORE
                    </span>
                    <span className="text-zinc-200 font-medium font-sans">
                      {currentWork.systemDossier.engineCore}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentWork.systemDossier.telemetryNodes.map((node, nidx) => (
                      <div key={nidx} className="p-3 rounded-xl bg-black/60 border border-zinc-900">
                        <div className="text-[10px] font-display uppercase tracking-wider text-zinc-500 font-semibold mb-0.5">
                          {node.label}
                        </div>
                        <div className="text-xs text-zinc-200 font-medium font-sans truncate">
                          {node.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: THE MANIFESTO & SCULPTURAL ATTRIBUTES */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-10">
                
                {/* Manifesto Text */}
                <div className="space-y-6">
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    {currentWork.manifestoLead}
                  </h3>

                  <div className="space-y-4 text-zinc-300 font-light text-sm sm:text-base leading-relaxed">
                    {currentWork.manifestoBody.map((paragraph, pidx) => (
                      <p key={pidx}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Key Capabilities */}
                <div className="border-t border-zinc-900 pt-8 space-y-6">
                  <div className="text-xs font-display tracking-wider text-zinc-500 uppercase font-bold">
                    KEY CAPABILITIES
                  </div>

                  <div className="space-y-4">
                    {currentWork.sculpturalAttributes.map((attr, aidx) => (
                      <div
                        key={aidx}
                        className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-[#FF5500]/40 transition-colors"
                      >
                        <div className="text-xs font-bold font-display tracking-wider text-white uppercase mb-1 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#FF5500]" />
                          <span>{attr.name}</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                          {attr.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-zinc-900">
                  <a
                    href="#intake"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-us-pop hover:scale-105 active:scale-95 font-display"
                  >
                    <span>{currentWork.externalLinkText}</span>
                    <ArrowUpRight size={14} />
                  </a>

                  <span className="text-xs font-display tracking-wider text-zinc-500">
                    {currentWork.externalLinkNote}
                  </span>
                </div>
              </div>
            </div>

            {/* Lower Product Overview Plaque */}
            <div className="mt-16 p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              <div>
                <div className="text-[10px] font-display uppercase tracking-wider text-zinc-500 mb-1 font-bold">TECHNOLOGY</div>
                <div className="text-xs text-zinc-200 font-medium">{currentWork.exhibitionPlaque.medium}</div>
              </div>
              <div>
                <div className="text-[10px] font-display uppercase tracking-wider text-zinc-500 mb-1 font-bold">ORIGIN</div>
                <div className="text-xs text-zinc-200 font-medium">{currentWork.exhibitionPlaque.origin}</div>
              </div>
              <div>
                <div className="text-[10px] font-display uppercase tracking-wider text-zinc-500 mb-1 font-bold">DEPLOYMENT STATUS</div>
                <div className="text-xs text-[#FF5500] font-bold font-display uppercase tracking-wider">{currentWork.exhibitionPlaque.status}</div>
              </div>
              <div>
                <div className="text-[10px] font-display uppercase tracking-wider text-zinc-500 mb-1 font-bold">CORE BENEFIT</div>
                <div className="text-xs text-zinc-200 font-medium">{currentWork.exhibitionPlaque.essence}</div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </section>

      {/* ========================================================================= */}
      {/* 4. BUILDER PHILOSOPHY: PROVEN IN PRODUCTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto py-24 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-xs font-display uppercase tracking-wider text-[#FF5500] font-bold">
            OUR PHILOSOPHY // PROVEN IN PRODUCTION
          </p>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
            "We don't just talk about AI. <br />
            <span className="text-zinc-500">We build real software with it."</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
            Every product here is an active platform with real users, live infrastructure, and real traction. We test, break, and refine our technology in production before bringing those exact engineering standards to our client projects.
          </p>
        </div>

        {/* 3 Product Cards Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {ARTISTIC_WORKS.map((work, idx) => (
            <div
              key={work.id}
              onClick={() => {
                setActiveWorkIndex(idx);
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
              className="group p-8 rounded-3xl bg-zinc-950/60 border border-zinc-800/80 hover:border-[#FF5500]/60 transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[380px] relative overflow-hidden"
            >
              {/* Subtle Monolith Image Backdrop */}
              <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none">
                <img
                  src={work.monolithImage}
                  alt={work.title}
                  className="w-full h-full object-cover filter grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-xs font-bold text-[#FF5500] tracking-wider uppercase">
                    {work.roman}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-black/80 border border-zinc-800 p-1.5 flex items-center justify-center">
                    <img
                      src={work.insignia}
                      alt={work.insigniaAlt}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-white uppercase mb-2 group-hover:text-[#FF5500] transition-colors">
                  {work.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {work.manifestoLead}
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-zinc-900 flex items-center justify-between text-xs font-display font-bold tracking-wider text-zinc-500 group-hover:text-white transition-colors">
                <span>EXPLORE PRODUCT</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 text-[#FF5500] transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ATELIER DIRECT DESK INTAKE */}
      {/* ========================================================================= */}
      <div id="intake" className="relative z-10">
        <USIntakeCTA />
      </div>
    </div>
  );
}

export default Products;
