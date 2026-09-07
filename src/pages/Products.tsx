import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Sparkles, 
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
    subtitle: 'The Monolith of Autonomous Voice',
    insignia: '/b2p_logo.png',
    insigniaAlt: 'BrandToPost Insignia',
    monolithImage: '/b2p_monolith.jpg',
    curatorCategory: 'AUTONOMOUS LANGUAGE ARCHITECTURE',
    manifestoLead: 'Language without latency. The elimination of the creative marketing cartel.',
    manifestoBody: [
      'For decades, corporate narrative was held hostage by agency retainers: armies of account managers who dilly-dallied for fourteen days over forty words of copy. We considered this an insult to engineering velocity.',
      'BrandToPost is an autonomous language monument. It ingests the raw, uncompromising truth of a company, spanning its architectural blueprints, founder conviction, and visual geometry, and synthesizes an uninterrupted stream of high-tension narrative across the global social web.',
      'No brainstorm sessions. No creative revisions. Only pure business context propagating at the speed of light.'
    ],
    philosophicalQuote: 'When your product moves at the frontier, your voice cannot wait for human consensus.',
    quoteAuthor: 'BRANDTOPOST ARCHITECTURAL MANIFESTO',
    exhibitionPlaque: {
      medium: 'Autonomous Generative Reasoners + Immutable JSON Geometries',
      origin: 'AIMLPartner Sovereign Atelier // Node 01',
      status: 'Active Global Pilot Fleet',
      essence: 'Zero-Latency Brand Context'
    },
    sculpturalAttributes: [
      {
        name: 'The Context Core',
        definition: 'Autonomous extraction of foundational product DNA, including tone, cadence, chromatic palette, and competitive moats from raw documentation.'
      },
      {
        name: 'Deterministic Flow',
        definition: 'Eliminates model hallucination by binding synthetic creativity to strict typographic schemas and refusal boundaries.'
      },
      {
        name: 'Polyphonic Distribution',
        definition: 'Simultaneously speaks the dialect of LinkedIn institutional prose, Instagram visual minimalism, and Reddit technical scrutiny.'
      }
    ],
    externalLinkText: 'Request Atelier Access',
    externalLinkNote: 'Private Beta // Selective Brand Intake'
  },

  // --------------------------------------------------------------------------
  // WORK II: KNWN
  // --------------------------------------------------------------------------
  {
    id: 'knwn',
    numeral: '02',
    roman: 'WORK II',
    title: 'KNWN',
    subtitle: 'The Monolith of Pure Cinema',
    insignia: '/weareknwn_logo.png',
    insigniaAlt: 'WEAREKNWN Insignia',
    monolithImage: '/knwn_cinema_rig.jpg',
    curatorCategory: 'CELLULOID & HUMAN MASTERY',
    manifestoLead: 'Bypass the agency. Reclaim the frame.',
    manifestoBody: [
      'The modern cinematic apparatus has been suffocated by commercial talent agencies, parasitic middlemen taking thirty-percent tariffs while obscuring the master craftsmen who actually light, frame, and capture moving light.',
      'KNWN is a closed sanctuary for elite cinema crew. It binds A24, HBO, Netflix, and Searchlight-caliber Directors of Photography, Steadicam operators, and gaffers directly to the visionary directors who commission them.',
      'No bureaucracy. No inflated markups. Every camera package verified down to the glass; every credit cryptographically validated through peer trust.'
    ],
    philosophicalQuote: 'The lens does not care about an agent’s commission. It only answers to light, optical truth, and human discipline.',
    quoteAuthor: 'KNWN CINEMATOGRAPHIC TREATISE',
    exhibitionPlaque: {
      medium: 'ARRI Large-Format Sensors + Peer-Verified Cryptographic Registry',
      origin: 'AIMLPartner Sovereign Atelier // Node 02',
      status: 'Live Production Fleet // NY, LA, London',
      essence: 'Disintermediated Optical Craft'
    },
    sculpturalAttributes: [
      {
        name: 'The Optical Locker',
        definition: 'Verified hardware provenance across ARRI Alexa 35, RED V-Raptor XL, Master Anamorphics, and Steadicam M-2 kits registered to the operator.'
      },
      {
        name: 'Algorithmic Call Sheets',
        definition: 'Scene-by-scene script breakdown translating atmospheric treatments into turnkey camera and lighting manifests in seconds.'
      },
      {
        name: 'Sovereign Squads',
        definition: 'Persistent collectives of camera, grip, and gaffer teams assembled for high-tension commercial and narrative masterworks.'
      }
    ],
    externalLinkText: 'Enter the Closed Network',
    externalLinkNote: 'Strict Vetted Membership // Top 5% Global Crew'
  },

  // --------------------------------------------------------------------------
  // WORK III: SUPERHERO FITNESS OS
  // --------------------------------------------------------------------------
  {
    id: 'superherofs',
    numeral: '03',
    roman: 'WORK III',
    title: 'SuperHero Fitness OS',
    subtitle: 'The Monolith of Iron & Biomechanics',
    insignia: '/superherologo.png',
    insigniaAlt: 'SuperHero Fitness OS Emblem',
    monolithImage: '/superhero_gym_sanctuary.jpg',
    curatorCategory: 'BIOMECHANICAL HEALTH & PHYSICAL OS',
    manifestoLead: 'The iron never lies. Physical temples synchronized with synthetic intelligence.',
    manifestoBody: [
      'Commercial wellness has degraded into chaotic spreadsheets, neglected gym floors, and bro-science marketing. Human physical transformation requires the rigor of an architectural discipline.',
      'SuperHero Fitness OS is a living physical-digital organism. It connects physical turnstile gates, pro shop performance dispensaries, and artisanal shake bars to "Superne", an autonomous biomechanical coach that measures human capacity and engineers its evolution.',
      'A sanctuary where cold knurled steel meets microsecond biometric precision. Every rep recorded, every macronutrient accounted for, every barrier dismantled.'
    ],
    philosophicalQuote: 'Strength is not an accident of genetics. It is a mathematical consequence of progressive mechanical overload.',
    quoteAuthor: 'SUPERHERO KINETIC MANIFESTO',
    exhibitionPlaque: {
      medium: 'Turnstile Hardware Webhooks + Autonomous Biomechanical Coach',
      origin: 'AIMLPartner Sovereign Atelier // Node 03',
      status: 'Commercial Fleet // Physical Gym Network',
      essence: 'Physical Transformation Architecture'
    },
    sculpturalAttributes: [
      {
        name: 'Superne AI Intelligence',
        definition: 'Autonomous daily programming that calibrates rate of perceived exertion (RPE), bar velocity, and eccentric tempo dynamically.'
      },
      {
        name: 'The Physical Sanctuary',
        definition: 'Encrypted rotating QR access passes eliminating plastic clutter and securing exclusive access for committed athletes.'
      },
      {
        name: 'Nutrient Dispensation',
        definition: 'Zero-latency ordering of cold-pressed whey isolate and laboratory-certified compounds ready at the club bar upon session completion.'
      }
    ],
    externalLinkText: 'Explore the Club Ecosystem',
    externalLinkNote: 'Physical Network Node // Live in Production'
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
        title="The Sovereign Atelier: BrandToPost, KNWN & SuperHero Fitness OS | AIMLPartner"
        description="An exhibition of three sovereign platforms built, owned, and operated in-house by AIMLPartner: BrandToPost, KNWN, and SuperHero Fitness OS."
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
      {/* 2. EXHIBITION PROLOGUE // CURATOR OPENING */}
      {/* ========================================================================= */}
      <header className="relative z-10 pt-36 sm:pt-48 pb-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-zinc-900 pb-16">
          <div className="max-w-4xl">
            <h1 className="font-display text-4xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white leading-[0.98] uppercase mb-8">
              What We <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-[#FF5500]">
                Birthed &amp; Own.
              </span>
            </h1>

            <p className="font-sans text-base sm:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed">
              We do not build toys for hire. In the privacy of our Bedminster atelier, we conceive, architect, and operate living software monoliths. Three sovereign works, each born from an obsession with autonomy, optical truth, and physical mastery.
            </p>
          </div>

          {/* Exhibition Stamp */}
          <div className="lg:text-right shrink-0 font-display text-xs text-zinc-500 space-y-1 border-l lg:border-l-0 lg:border-r border-zinc-800 pl-4 lg:pl-0 lg:pr-4">
            <div className="text-white font-bold tracking-wider uppercase">CURATORIAL CATALOG</div>
            <div className="text-zinc-400">EST. 2026 // BEDMINSTER, NJ</div>
            <div className="text-[#FF5500] font-bold">PERMANENT FLEET COLLECTION</div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* EXHIBITION GALLERY DOCK (MINIMALIST HAUTE-COUTURE SWITCHER) */}
        {/* ===================================================================== */}
        <div className="pt-10 flex flex-wrap items-center justify-start gap-3 sm:gap-4">
          <span className="text-xs font-display uppercase tracking-wider text-zinc-500 font-bold mr-2">
            GALLERY ROOMS:
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

              {/* Plaque Metadata */}
              <div className="font-display text-xs text-zinc-400 space-y-1 md:text-right border-l-2 md:border-l-0 md:border-r-2 border-[#FF5500] pl-4 md:pl-0 md:pr-4">
                <div className="text-zinc-500 uppercase tracking-wider font-semibold">PROVENANCE // STATUS</div>
                <div className="text-white font-bold tracking-wider uppercase">{currentWork.exhibitionPlaque.status}</div>
                <div className="text-zinc-400 tracking-wider">{currentWork.exhibitionPlaque.origin}</div>
              </div>
            </div>

            {/* Sculptural Core: 2-Column Monolithic Composition */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
              
              {/* LEFT COLUMN: THE MONOLITH CANVAS (ARTISTIC VISUAL SLAB) */}
              <div className="lg:col-span-6 relative flex flex-col justify-between group">
                <div className="relative w-full h-[450px] sm:h-[600px] rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-2xl">
                  {/* Textured Image Slab */}
                  <img
                    src={currentWork.monolithImage}
                    alt={`${currentWork.title} Architectural Monolith`}
                    className="w-full h-full object-cover object-center brightness-90 contrast-110 filter saturate-[0.85] group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  
                  {/* Dramatic Chiaroscuro Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85" />
                  <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80" />

                  {/* Corner Celestial Brackets */}
                  <div className="absolute top-6 left-6 text-[11px] font-display tracking-wider text-zinc-300 uppercase bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-800 font-bold">
                    SLAB REF // {currentWork.numeral}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10">
                    <p className="font-serif italic text-base sm:text-lg text-zinc-200 leading-snug">
                      "{currentWork.philosophicalQuote}"
                    </p>
                    <p className="font-display text-xs tracking-wider text-[#FF5500] uppercase mt-3 font-bold">
                      // {currentWork.quoteAuthor}
                    </p>
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

                {/* Sculptural Attributes (Museum Spec Plaque) */}
                <div className="border-t border-zinc-900 pt-8 space-y-6">
                  <div className="text-xs font-display tracking-wider text-zinc-500 uppercase font-bold">
                    ARCHITECTURAL ATTRIBUTES
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

            {/* Museum Exhibition Lower Specification Plaque */}
            <div className="mt-16 p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              <div>
                <div className="text-[10px] font-display uppercase tracking-wider text-zinc-500 mb-1 font-bold">MEDIUM</div>
                <div className="text-xs text-zinc-200 font-medium">{currentWork.exhibitionPlaque.medium}</div>
              </div>
              <div>
                <div className="text-[10px] font-display uppercase tracking-wider text-zinc-500 mb-1 font-bold">SOVEREIGN ORIGIN</div>
                <div className="text-xs text-zinc-200 font-medium">{currentWork.exhibitionPlaque.origin}</div>
              </div>
              <div>
                <div className="text-[10px] font-display uppercase tracking-wider text-zinc-500 mb-1 font-bold">DEPLOYMENT STATE</div>
                <div className="text-xs text-[#FF5500] font-bold font-display uppercase tracking-wider">{currentWork.exhibitionPlaque.status}</div>
              </div>
              <div>
                <div className="text-[10px] font-display uppercase tracking-wider text-zinc-500 mb-1 font-bold">PHILOSOPHICAL ESSENCE</div>
                <div className="text-xs text-zinc-200 font-medium">{currentWork.exhibitionPlaque.essence}</div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </section>

      {/* ========================================================================= */}
      {/* 4. CURATOR'S THESIS: THE SOVEREIGN CODE MANIFESTO */}
      {/* ========================================================================= */}
      <section className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto py-24 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-xs font-display uppercase tracking-wider text-[#FF5500] font-bold">
            CURATOR'S THESIS // THE THREE SOVEREIGN WORKS
          </p>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
            "We do not preach AI. <br />
            <span className="text-zinc-500">We forge its living manifestations."</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
            These three works are living proof of our core conviction: true engineering leadership is proven in public production, not in consulting PowerPoint decks. We own every line of code, every database schema, and every inference loop.
          </p>
        </div>

        {/* 3 Visual Artwork Cards Side-by-Side */}
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
                <span>VIEW MONOLITH</span>
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
