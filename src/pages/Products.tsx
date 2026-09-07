import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  ArrowUpRight, 
  Film, 
  Camera, 
  Dumbbell, 
  Zap, 
  Share2, 
  CheckCircle2, 
  Terminal, 
  Database, 
  Sliders, 
  Globe, 
  Check, 
  Flame, 
  Target, 
  Radio, 
  Activity, 
  ChevronRight, 
  Lock, 
  FileText, 
  BarChart3,
  Calendar,
  Code2,
  Workflow
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { USIntakeCTA } from '../components/us/USIntakeCTA';

// ============================================================================
// DATA & TYPE DEFINITIONS FOR PROPRIETARY PLATFORMS
// ============================================================================

export interface ProductFeature {
  title: string;
  desc: string;
  codeSnippet?: string;
  metric?: string;
}

export interface ProductProfile {
  id: 'brandtopost' | 'knwn' | 'superherofs';
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  orbitalCode: string;
  category: string;
  status: 'PILOT DEPLOYMENT' | 'PRODUCTION LIVE' | 'COMMERCIAL FLEET';
  logoText: string;
  logoSrc: string;
  accentGlow: string;
  heroImage: string;
  videoPoster?: string;
  externalUrl?: string;
  overview: string;
  theProblem: string;
  theBreakthrough: string;
  metrics: { label: string; value: string; detail: string }[];
  techStack: { category: string; technologies: string[] }[];
  capabilities: ProductFeature[];
  interactiveTitle: string;
  interactiveSubtitle: string;
}

const PRODUCTS_CATALOG: ProductProfile[] = [
  // --------------------------------------------------------------------------
  // 1. BRANDTOPOST
  // --------------------------------------------------------------------------
  {
    id: 'brandtopost',
    title: 'BrandToPost',
    subtitle: 'Autonomous AI Brand Marketing, Content Engine & Multi-Channel Distribution',
    tagline: 'The Age of Business Context is Coming. Zero Human Latency Social Distribution.',
    badge: 'NODE 01 // SOCIAL INFRASTRUCTURE',
    orbitalCode: 'B2P-SATURN-ORBIT-7',
    category: 'Autonomous Content & Brand Intelligence',
    status: 'PILOT DEPLOYMENT',
    logoText: 'BRANDTOPOST',
    logoSrc: '/b2p_logo.png',
    accentGlow: '#FF5500',
    heroImage: '/stage1_blueprint.jpg',
    overview:
      'BrandToPost is an autonomous AI growth operating system that synthesizes a brand’s fundamental Product DNA—positioning, visual aesthetics, tone of voice, audience personas, and value drivers—and automatically architects, generates, formats, and publishes targeted content campaigns across LinkedIn, Instagram, Facebook, and Reddit without requiring agency retainers or human bottlenecks.',
    theProblem:
      'Modern brands spend upwards of $8,000/month on creative agencies and copywriters who struggle with domain knowledge, fail to capture deep technical nuance, and take 10–14 days to iterate on simple social campaigns. The manual overhead of coordinating design, copy, approvals, and multi-channel scheduling cripples go-to-market velocity.',
    theBreakthrough:
      'BrandToPost eliminates the marketing agency middleman with a single deterministic pipeline: Deep URL & Document Context Scraper → Product DNA Extractor → Multi-Turn Gemini Reasoning Engine → Deterministic Structured JSON Schema → Headless Cross-Platform Publisher.',
    metrics: [
      { label: 'Content Velocity', value: '14x', detail: 'Faster campaign turnaround from briefing to live multi-platform dispatch' },
      { label: 'Context Adherence', value: '99.4%', detail: 'Deterministic guardrails enforce zero brand hallucination or off-brand tone' },
      { label: 'Channels Synced', value: '4 Networks', detail: 'Native API distribution to LinkedIn, Instagram, Facebook, and Reddit' },
      { label: 'CAC Reduction', value: '68%', detail: 'Eliminates repetitive creative retainer overhead for venture and SMB operators' }
    ],
    techStack: [
      { category: 'AI Inference Engines', technologies: ['Google Gemini 2.0 Flash', 'Gemini Pro Context Engine', 'Structured JSON Schema'] },
      { category: 'Frontend & Architecture', technologies: ['React 19', 'TypeScript', 'Vite 6', 'Tailwind CSS', 'Motion'] },
      { category: 'Backend & Microservices', technologies: ['Node.js Express', 'TypeScript (TSX)', 'Cheerio Web Scraper', 'Cookie Session Auth'] },
      { category: 'Cloud & Database', technologies: ['Firebase Cloud Firestore', 'Firebase Service Accounts', 'Google Cloud Run'] },
      { category: 'Distribution APIs', technologies: ['LinkedIn Graph API v2', 'Meta Graph API (IG/FB)', 'Reddit OAuth REST API'] }
    ],
    capabilities: [
      {
        title: 'Deep Product DNA Extraction',
        desc: 'Ingests any website URL, pitch deck, or documentation. Extracts brand voice, color palettes, visual guidelines, competitive moats, and ICP personas into a structured immutable profile.',
        metric: 'Sub-60s extraction'
      },
      {
        title: 'Deterministic JSON Content Schemas',
        desc: 'Ensures zero markdown fluff or creative hallucinations by strictly piping LLM output through formal type-safe JSON schemas with custom canary tokens and refusal boundary checks.',
        metric: '100% strict JSON'
      },
      {
        title: 'Multi-Channel Creative Adaptation',
        desc: 'Automatically transforms a single product concept into a thoughtful long-form LinkedIn narrative, a punchy visual carousel copy for Instagram, a Facebook conversion post, and an authentic community-first Reddit discussion.',
        metric: '4 Native formats'
      },
      {
        title: 'Autonomous Multi-Turn Campaign Scheduler',
        desc: 'Calculates optimal algorithmic publishing time windows per network, maintains an active campaign calendar, and handles headless dispatch with automated token refreshes.',
        metric: 'Zero-touch queue'
      }
    ],
    interactiveTitle: 'Interactive Product DNA Simulator',
    interactiveSubtitle: 'Test how BrandToPost converts raw company attributes into multi-channel campaign architectures in real time.'
  },

  // --------------------------------------------------------------------------
  // 2. KNWN (weareknwn)
  // --------------------------------------------------------------------------
  {
    id: 'knwn',
    title: 'KNWN',
    subtitle: 'Elite Cinema & Commercial Production Crew Direct Marketplace & AI Team Planner',
    tagline: 'Bypass the Agency. Hire Elite Crew Direct.',
    badge: 'NODE 02 // MEDIA & ENTERTAINMENT',
    orbitalCode: 'KNWN-SATURN-ORBIT-3',
    category: 'Film & Media Marketplace / AI Operations',
    status: 'PRODUCTION LIVE',
    logoText: 'WEAREKNWN',
    logoSrc: '/weareknwn_logo.png',
    accentGlow: '#F47164',
    heroImage: '/saturn_case_titan.jpg',
    overview:
      'KNWN is a closed-network direct marketplace and intelligent production planner connecting commercial studios, production houses, and film directors directly with A24, HBO, Netflix, and Searchlight-caliber cinematographers, directors of photography (DPs), steadicam operators, and gaffers. Bypassing predatory 30% talent agency markups, KNWN features an automated AI Team Planner that translates film treatments into turnkey production crew manifests.',
    theProblem:
      'Commercial production houses lose weeks negotiating through talent agencies that charge exorbitant 25–35% commissions while obscuring talent availability, verified gear packages (ARRI Alexa 35, RED V-Raptor), and peer references. Crew coordination remains stuck in archaic paper call sheets and disjointed email threads.',
    theBreakthrough:
      'KNWN replaces agency bureaucracy with a high-trust digital network: Peer-Verified Crew Portfolios + Real-time Equipment Lockers + Automated AI Team Planner that analyzes scene breakdown parameters, budget constraints, and shooting locations to assemble turnkey, vetted camera crews in minutes.',
    metrics: [
      { label: 'Commission Savings', value: '25–30%', detail: 'Eliminates traditional agency booking fees, saving studios tens of thousands per shoot' },
      { label: 'Booking Time', value: '48 Hours', detail: 'From script breakdown to locked crew contracts vs 3 weeks through traditional agencies' },
      { label: 'Vetted Talent Pool', value: 'Top 5%', detail: 'Strict peer verification and portfolio review required for listing activation' },
      { label: 'Hardware Accuracy', value: '100%', detail: 'Verified camera, grip, and lens packages registered directly with operators' }
    ],
    techStack: [
      { category: 'AI Crew Planning Engine', technologies: ['Gemini 2.0 Pro', 'Cinematography Ontology Parser', 'Automated Call Sheet Engine'] },
      { category: 'Frontend Architecture', technologies: ['React 19', 'Vite 6', 'Tailwind CSS', 'Google Maps API v3', 'PWA Support'] },
      { category: 'Security & Auth', technologies: ['Firebase Phone SMS Auth (reCAPTCHA)', 'Google OAuth 2.0', 'Role-Based Access Control'] },
      { category: 'Real-Time Sync & Comms', technologies: ['Firestore Real-Time Listeners', 'Direct Studio Messaging Engine', 'Escrow Status Engine'] },
      { category: 'Production Systems', technologies: ['AITeamPlanner Module', 'Reference Verification Webhooks', 'Automated Budget Slicers'] }
    ],
    capabilities: [
      {
        title: 'AI Production Team Planner',
        desc: 'Input project type (Commercial, Feature, Music Video), filming location, shooting days, and aesthetic tone. The AI parses requirements and generates a complete, balanced crew roster with budget projections.',
        metric: 'Sub-30s manifests'
      },
      {
        title: 'Verified Hardware Registry',
        desc: 'Crew profiles feature verified camera packages (ARRI Alexa 35, RED V-Raptor XL, Tiffen M-2 Volt, Cookes/Atlas Anamorphics) eliminating third-party rental surprises.',
        metric: 'Zero gear ambiguity'
      },
      {
        title: 'Direct Peer Credential Verification',
        desc: 'Every crew member’s past credits (A24, HBO, Netflix, Neon, Warner Bros) are verified through cryptographic reference request tokens sent directly to past directors and producers.',
        metric: 'Cryptographic trust'
      },
      {
        title: 'Automated Call Sheets & Squads',
        desc: 'Organize verified crew into persistent ‘Squads’ for recurring studio production cycles with integrated budget tracking and automated daily call sheets.',
        metric: 'Turnkey workflow'
      }
    ],
    interactiveTitle: 'Interactive AI Crew Planner Simulator',
    interactiveSubtitle: 'Simulate how KNWN’s intelligent engine breaks down production parameters into an elite, verified crew manifest.'
  },

  // --------------------------------------------------------------------------
  // 3. SUPERHEROFS (SuperHero Fitness OS)
  // --------------------------------------------------------------------------
  {
    id: 'superherofs',
    title: 'SuperHero Fitness OS',
    subtitle: 'Intelligent Connected Gym Ecosystem, Pro Shop & 24/7 AI Athletic Coach',
    tagline: 'Physical Club Precision Synchronized with Autonomous Biomechanical AI.',
    badge: 'NODE 03 // PHYSICAL AI & HEALTH OS',
    orbitalCode: 'SHFS-SATURN-ORBIT-1',
    category: 'Connected Health / Gym Operating System',
    status: 'COMMERCIAL FLEET',
    logoText: 'SUPERHERO FITNESS OS',
    logoSrc: '/superherogym_logo.png',
    accentGlow: '#FF5500',
    heroImage: '/blueprint_sovereignty.jpg',
    overview:
      'SuperHero Fitness OS is India’s most comprehensive connected athletic ecosystem, unifying premium physical gym facilities, an automated Pro Shop supplement dispensary, artisanal protein shake bar operations, and "Superne"—an autonomous 24/7 AI athletic trainer delivering individualized biomechanical workout programming, progressive overload tracking, and macro meal nutrition intelligence.',
    theProblem:
      'Gym chains suffer from fragmented operations: isolated POS systems, untracked supplement inventories, disconnected cafeteria ordering, and personal trainers with high turnover who cannot deliver real-time data-driven progression or customized nutrition accountability to hundreds of members.',
    theBreakthrough:
      'SuperHero Fitness OS connects every physical touchpoint to a single unified digital brain: Instant QR Gate Check-ins + Pro Shop Supplement Inventory + Artisanal Cafe Order Queue + "Superne" AI Athletic Coach delivering daily progressive overload adjustments and precision macronutrient targets based on live workout logs.',
    metrics: [
      { label: 'Member Retention', value: '+42%', detail: 'Boosted through daily AI workout guidance, nutrition tracking, and habit reinforcement' },
      { label: 'Inventory Turnover', value: '3.4x', detail: 'Faster supplement and shake bar turnover via integrated digital ordering and stock alerts' },
      { label: 'Check-in Latency', value: '< 400ms', detail: 'Ultra-fast QR token validation at club turnstiles with offline fallback resilience' },
      { label: 'Active Clubs', value: 'Network Node', detail: 'Serving competitive lifters, athletes, and premium wellness members' }
    ],
    techStack: [
      { category: 'AI Athletic Intelligence', technologies: ['Superne Biomechanical Engine', 'Gemini 2.0 Flash', 'Macro Optimization Algorithms'] },
      { category: 'App Architecture', technologies: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'PWA Offline Cache'] },
      { category: 'Mobile & Hardware Sync', technologies: ['Installable PWA Manifest', 'Web Cam QR Scanner API', 'Hardware Turnstile Webhooks'] },
      { category: 'Club Operations & POS', technologies: ['Firebase Firestore Real-time DB', 'Cart & Order Pipeline', 'Multi-tenant Staff Admin'] },
      { category: 'Nutrition Engine', technologies: ['Nutrient Profile Matrix', 'Artisanal Cafe Order Dispatch', 'Lab-Certified Supplement Store'] }
    ],
    capabilities: [
      {
        title: '"Superne" 24/7 AI Athletic Coach',
        desc: 'An always-available conversational AI coach trained on biomechanics, muscle hypertrophy, and powerlifting science. Evaluates member training logs, calculates RPE, and adjusts load/rep prescriptions dynamically.',
        metric: 'Adaptive daily loads'
      },
      {
        title: 'Integrated Pro Shop & Shake Bar',
        desc: 'In-app ordering for lab-certified supplements (creatine, whey isolate, pre-workout) and made-to-order artisanal protein shakes ready at the club bar upon workout completion.',
        metric: 'Zero-wait pickup'
      },
      {
        title: 'Turnstile QR Check-in System',
        desc: 'Encrypted, rotating QR membership passes valid for club access, eliminating plastic cards and preventing fraudulent membership sharing across clubs.',
        metric: 'Cryptographic entry'
      },
      {
        title: 'Progressive Overload Telemetry',
        desc: 'Visualizes volume load, set-by-set velocity ratings, and personal record timelines across bench press, squat, deadlift, and auxiliary athletic movements.',
        metric: 'Precision metrics'
      }
    ],
    interactiveTitle: 'Interactive "Superne" AI Coach Simulator',
    interactiveSubtitle: 'Experience how Superne configures biomechanically sound training programs and macro splits in real time.'
  }
];

// ============================================================================
// MAIN PRODUCTS PAGE COMPONENT
// ============================================================================

export function Products() {
  const [activeProductId, setActiveProductId] = useState<'brandtopost' | 'knwn' | 'superherofs'>('brandtopost');
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'simulator' | 'specs'>('overview');

  // Interactive Simulator States
  // 1. BrandToPost Simulator
  const [b2pIndustry, setB2pIndustry] = useState('B2B AI Software');
  const [b2pTone, setB2pTone] = useState('Architectural & High Conviction');
  const [b2pGenerating, setB2pGenerating] = useState(false);
  const [b2pOutput, setB2pOutput] = useState<{
    linkedin: string;
    instagram: string;
    reddit: string;
    targetAngle: string;
  } | null>({
    targetAngle: 'The Shift from Human Retainers to Deterministic Autonomous Marketing Pipelines',
    linkedin: 'Most corporate marketing teams are still burning $10K/mo on agency retainers that deliver generic carousel posts two weeks late.\n\nThe future is zero-latency context ingestion. When your product updates, your marketing engine should re-architect its campaigns in 60 seconds.',
    instagram: 'SLIDE 1: Why your marketing agency is slower than your engineering team.\nSLIDE 2: The 5 bottlenecks of human campaign management.\nSLIDE 3: How autonomous Product DNA pipelines publish on autopilot.',
    reddit: 'Discussion for r/SaaS: We completely stopped using external marketing agencies and switched to an internal LLM pipeline with strict JSON guardrails. Here are our exact metrics after 90 days.'
  });

  // 2. KNWN Simulator
  const [knwnGenre, setKnwnGenre] = useState('Commercial Tech Spec');
  const [knwnBudget, setKnwnBudget] = useState('$35,000');
  const [knwnCamPackage, setKnwnCamPackage] = useState('ARRI Alexa 35 + Master Anamorphics');
  const [knwnGenerating, setKnwnGenerating] = useState(false);
  const [knwnOutput, setKnwnOutput] = useState<{
    dp: string;
    steadicam: string;
    gaffer: string;
    savings: string;
    callSheetTime: string;
  } | null>({
    dp: 'Elena Rostova (Credits: A24 / Neon Commercials) — $2,100/day',
    steadicam: 'James Thorne (Tiffen M-2 Volt Package) — $1,800/day',
    gaffer: 'Marcus Vance (ARRI SkyPanel + Litepanels Kit) — $1,450/day',
    savings: '$7,850 in bypassed agency markups',
    callSheetTime: '06:00 Call Time // Hudson River Studios, NYC'
  });

  // 3. Superherofs Simulator
  const [shGoal, setShGoal] = useState<'Hypertrophy' | 'Strength / Powerlifting' | 'Recomposition'>('Hypertrophy');
  const [shExperience, setShExperience] = useState('Advanced (4+ Years)');
  const [shDays, setShDays] = useState('5 Days / Week');
  const [shGenerating, setShGenerating] = useState(false);
  const [shOutput, setShOutput] = useState<{
    split: string;
    focusExercise: string;
    overloadLogic: string;
    macroTarget: string;
    postWorkoutShake: string;
  } | null>({
    split: 'Torso / Limbs High Frequency Microcycle',
    focusExercise: 'Incline Dumbbell Press (3x 8-10 reps @ RPE 8.5) -> Rest-Pause on Final Set',
    overloadLogic: '+2.5kg increment once top set reaches 10 reps with strict 2-second eccentric',
    macroTarget: '210g Protein | 340g Carbs | 65g Fats (2,785 kcal)',
    postWorkoutShake: 'Artisanal Club Bar: Double Isolate Whey + 5g Pure Creatine + Tart Cherry'
  });

  const activeProduct = PRODUCTS_CATALOG.find((p) => p.id === activeProductId)!;

  // Handlers for interactive simulation
  const handleGenerateB2P = () => {
    setB2pGenerating(true);
    setTimeout(() => {
      setB2pOutput({
        targetAngle: `Autonomous Positioning for ${b2pIndustry} with ${b2pTone} Tone`,
        linkedin: `In ${b2pIndustry}, speed of market education is the single differentiator. If your competitor ships an update and you take two weeks to write a blog post, you have lost the conversation.\n\nBrandToPost turns technical releases into validated social distribution in sub-60 seconds.`,
        instagram: `CAROUSEL DECK // ${b2pIndustry.toUpperCase()}\n1. The old playbook: Waiting 14 days for copy revisions.\n2. The new playbook: Instant Product DNA extraction.\n3. Result: 14x faster distribution with zero tone drift.`,
        reddit: `Post to r/startups: How we automated our entire ${b2pIndustry} distribution schedule without sacrificing quality or brand voice. Breakdowns & architecture inside.`
      });
      setB2pGenerating(false);
    }, 600);
  };

  const handleGenerateKNWN = () => {
    setKnwnGenerating(true);
    setTimeout(() => {
      setKnwnOutput({
        dp: `Elena Rostova (Package: ${knwnCamPackage}) — Locked`,
        steadicam: 'James Thorne (A-Cam Steadicam Operator) — Confirmed',
        gaffer: 'Marcus Vance (Chief Lighting Technician) — Confirmed',
        savings: `$9,200 saved on standard agency commissions for ${knwnBudget} budget`,
        callSheetTime: `Call Sheet Generated: 06:30 Call // 10-Hour Commercial Shoot for ${knwnGenre}`
      });
      setKnwnGenerating(false);
    }, 600);
  };

  const handleGenerateSH = () => {
    setShGenerating(true);
    setTimeout(() => {
      setShOutput({
        split: `${shGoal} Optimized: ${shDays} Periodized Block (${shExperience})`,
        focusExercise: shGoal === 'Strength / Powerlifting' 
          ? 'Competition Squat (4x 3 reps @ RPE 8.0) -> Bar Speed Metric Target: 0.55 m/s' 
          : 'Deficit Romanian Deadlift + Cable Lateral Raises (Myo-Rep Match)',
        overloadLogic: 'Auto-regulated based on previous session RPE and bar path velocity.',
        macroTarget: shGoal === 'Hypertrophy' 
          ? '215g Protein | 360g Carbs | 60g Fats (2,840 kcal)' 
          : '230g Protein | 250g Carbs | 55g Fats (2,415 kcal)',
        postWorkoutShake: 'Pro Shop Bar: Cold Brew Isolate + 5g Creapure Creatine + Hydrolyzed Oats'
      });
      setShGenerating(false);
    }, 600);
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#FF5500] selection:text-black relative overflow-hidden">
      <SEO
        title="Proprietary AI Products: BrandToPost, KNWN & Superherofs | AIMLPartner"
        description="Explore AIMLPartner's proprietary software platforms built, owned, and operated in-house: BrandToPost (autonomous AI marketing), KNWN (cinema crew direct booking & AI planner), and SuperHero Fitness OS (connected gym & AI coach)."
        url="https://aimlpartner.com/products"
      />

      {/* ========================================================================= */}
      {/* 1. SATURN CINEMATIC ATMOSPHERE (VIDEO & AMBIENT RING OVERLAYS) */}
      {/* ========================================================================= */}
      <div className="absolute top-0 left-0 right-0 h-[85vh] z-0 overflow-hidden pointer-events-none select-none">
        <video
          src="/saturn_loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center opacity-70 brightness-95 contrast-110"
        />
        {/* Soft edge vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black z-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#FF5500]/12 rounded-full blur-[180px] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-us-grid opacity-30 z-10" />
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION & ORBITAL HEADER */}
      {/* ========================================================================= */}
      <section className="pt-32 sm:pt-40 pb-16 px-6 md:px-16 max-w-7xl mx-auto relative z-20 text-center">
        {/* Telemetry Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl mb-6 shadow-2xl"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse"></span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-300">
            PROPRIETARY INTELLECTUAL PROPERTY // 100% IN-HOUSE BUILT
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[1.04] mb-6 drop-shadow-2xl"
        >
          We Don't Just Advise on AI. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#FF5500]">
            We Build, Own &amp; Operate It.
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed max-w-3xl mx-auto text-balance font-medium mb-12"
        >
          Explore the sovereign platforms engineered and operated directly by the AIMLPartner engineering team. From autonomous multi-channel marketing to cinema crew marketplaces and connected gym operating systems—these are live production platforms serving real users every single day.
        </motion.p>

        {/* Macro Telemetry Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16 text-left"
        >
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">Production Fleet</div>
            <div className="text-2xl font-bold font-display text-white">3 Flagship Platforms</div>
            <div className="text-[11px] text-zinc-400 mt-1">Autonomous, Cinema &amp; Health</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">IP Sovereignty</div>
            <div className="text-2xl font-bold font-display text-[#FF5500]">100% In-House</div>
            <div className="text-[11px] text-zinc-400 mt-1">Zero third-party code forks</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">AI Inference Stack</div>
            <div className="text-2xl font-bold font-display text-white">Gemini + Cloud</div>
            <div className="text-[11px] text-zinc-400 mt-1">Deterministic JSON pipelines</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">Global Latency</div>
            <div className="text-2xl font-bold font-display text-emerald-400">&lt; 400ms</div>
            <div className="text-[11px] text-zinc-400 mt-1">Edge optimized response loops</div>
          </div>
        </motion.div>

        {/* ===================================================================== */}
        {/* ORBITAL PRODUCT SELECTOR DOCK */}
        {/* ===================================================================== */}
        <div className="max-w-4xl mx-auto">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center justify-center gap-2">
            <Sliders size={14} className="text-[#FF5500]" />
            <span>Select Proprietary Platform to Inspect</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-2 bg-zinc-950/90 border border-zinc-800 rounded-3xl backdrop-blur-2xl shadow-2xl">
            {PRODUCTS_CATALOG.map((p) => {
              const isActive = activeProductId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setActiveProductId(p.id);
                  }}
                  className={`relative px-5 py-4 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 border border-[#FF5500] shadow-[0_0_25px_rgba(255,85,0,0.2)]'
                      : 'hover:bg-zinc-900/60 border border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                      {p.orbitalCode}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#FF5500]/20 text-[#FF5500] font-bold border border-[#FF5500]/40'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-black/60 border border-zinc-800 p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src={p.logoSrc}
                        alt={`${p.title} Official Logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className={`text-base font-bold font-display block leading-tight ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                        {p.title}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">
                        Official Fleet Node
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                    {p.category}
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeDockIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#FF5500] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ACTIVE PRODUCT DEEP DIVE SHOWCASE (SATURN HUD CARD) */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto relative z-20 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-zinc-950/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 md:p-12 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative overflow-hidden"
          >
            {/* Top Product Header Row with Official Logo */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 border-b border-zinc-800/80 gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                {/* Official Product Logo Frame */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/80 border border-zinc-800 p-3 flex items-center justify-center shrink-0 shadow-2xl relative">
                  <img
                    src={activeProduct.logoSrc}
                    alt={`${activeProduct.title} Official Logo`}
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#FF5500] border-2 border-black animate-pulse" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#FF5500] bg-[#FF5500]/10 border border-[#FF5500]/30 px-3 py-1 rounded-full uppercase">
                      {activeProduct.badge}
                    </span>
                    <span className="text-xs font-mono tracking-widest text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full uppercase border border-zinc-800">
                      STATUS: {activeProduct.status}
                    </span>
                    <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                      ID: {activeProduct.orbitalCode}
                    </span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
                    {activeProduct.title}
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-medium">
                    {activeProduct.subtitle}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="#intake"
                  className="bg-[#FF5500] hover:bg-[#FF6E26] text-black text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-us-pop hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                >
                  <span>Request Platform License</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Navigation Tabs within Product Detail */}
            <div className="flex flex-wrap gap-2 pt-6 pb-8 border-b border-zinc-800/60">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-white text-black'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                01 // System Overview &amp; Thesis
              </button>
              <button
                onClick={() => setActiveTab('architecture')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'architecture'
                    ? 'bg-white text-black'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                02 // Core Architecture &amp; Capabilities
              </button>
              <button
                onClick={() => setActiveTab('simulator')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'simulator'
                    ? 'bg-[#FF5500] text-black'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-[#FF5500] hover:bg-zinc-800'
                }`}
              >
                <Zap size={13} />
                <span>03 // Interactive Live Simulator</span>
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'specs'
                    ? 'bg-white text-black'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                04 // Full Tech Stack &amp; Telemetry
              </button>
            </div>

            {/* TAB CONTENT 1: OVERVIEW & THESIS */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="pt-8 space-y-10"
              >
                {/* Hero Summary & Tagline */}
                <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 sm:p-8">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#FF5500] mb-2 font-bold">
                    MISSION STATEMENT
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
                    "{activeProduct.tagline}"
                  </div>
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    {activeProduct.overview}
                  </p>
                </div>

                {/* Problem vs Breakthrough Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-zinc-900/30 border border-red-950/40">
                    <div className="text-xs font-mono uppercase tracking-widest text-red-400 mb-2 font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                      The Legacy Friction We Killed
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {activeProduct.theProblem}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-zinc-900/30 border border-emerald-950/40">
                    <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      The Proprietary Engineering Breakthrough
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {activeProduct.theBreakthrough}
                    </p>
                  </div>
                </div>

                {/* Quantitative Impact Metrics */}
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4 font-bold">
                    PRODUCTION PERFORMANCE BENCHMARKS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {activeProduct.metrics.map((m, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                        <div className="text-3xl font-black font-display text-white mb-1">
                          {m.value}
                        </div>
                        <div className="text-xs font-bold font-mono uppercase tracking-wider text-[#FF5500] mb-1">
                          {m.label}
                        </div>
                        <div className="text-xs text-zinc-400 leading-normal">
                          {m.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB CONTENT 2: CORE ARCHITECTURE & CAPABILITIES */}
            {activeTab === 'architecture' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="pt-8 space-y-8"
              >
                <div className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
                  Every capability in {activeProduct.title} was built from scratch without external SaaS wrappers. The following subsystems form the core operational engine:
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeProduct.capabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-[#FF5500]/50 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-zinc-800/80 border border-zinc-700 text-[#FF5500]">
                          <Cpu size={16} />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                          {cap.metric}
                        </span>
                      </div>
                      <h3 className="text-base font-bold font-display text-white group-hover:text-[#FF5500] transition-colors mb-2">
                        {cap.title}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB CONTENT 3: INTERACTIVE LIVE SIMULATOR */}
            {activeTab === 'simulator' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="pt-8 space-y-6"
              >
                <div className="bg-zinc-900/70 border border-[#FF5500]/40 rounded-2xl p-6 relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-[#FF5500] font-bold">
                    <Radio size={14} className="animate-pulse" />
                    <span>LIVE PIPELINE SIMULATOR</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mb-1">
                    {activeProduct.interactiveTitle}
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-2xl mb-6">
                    {activeProduct.interactiveSubtitle}
                  </p>

                  {/* -------------------------------------------------------- */}
                  {/* BRANDTOPOST SIMULATOR */}
                  {/* -------------------------------------------------------- */}
                  {activeProduct.id === 'brandtopost' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                            Industry / Vertical Focus
                          </label>
                          <select
                            value={b2pIndustry}
                            onChange={(e) => setB2pIndustry(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:border-[#FF5500] focus:outline-none"
                          >
                            <option value="B2B AI Software">B2B AI Software &amp; Developer Tools</option>
                            <option value="High-Ticket Health Clinic">High-Ticket Health &amp; Longevity Clinic</option>
                            <option value="Private Equity & Real Estate">Private Equity &amp; Real Estate Syndication</option>
                            <option value="Supply Chain & Freight Tech">Supply Chain &amp; Freight Technology</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                            Brand Voice &amp; Tone Strategy
                          </label>
                          <select
                            value={b2pTone}
                            onChange={(e) => setB2pTone(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:border-[#FF5500] focus:outline-none"
                          >
                            <option value="Architectural & High Conviction">Architectural &amp; High Conviction</option>
                            <option value="Technical Engineering Depth">Technical Engineering Depth</option>
                            <option value="Executive Institutional Authority">Executive Institutional Authority</option>
                            <option value="Provocative Contrarian Angle">Provocative Contrarian Angle</option>
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={handleGenerateB2P}
                        disabled={b2pGenerating}
                        className="w-full bg-[#FF5500] hover:bg-[#FF6E26] text-black text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {b2pGenerating ? (
                          <>
                            <Zap size={14} className="animate-spin" />
                            <span>Extracting Product DNA &amp; Synthesizing Channels...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles size={14} />
                            <span>Run Autonomous Campaign Pipeline</span>
                          </>
                        )}
                      </button>

                      {b2pOutput && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
                          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-left flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">
                                  LINKEDIN // B2B NARRATIVE
                                </span>
                                <span className="text-[9px] text-zinc-500">OPTIMAL 08:30 AM</span>
                              </div>
                              <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed">
                                {b2pOutput.linkedin}
                              </p>
                            </div>
                            <div className="mt-3 pt-2 border-t border-zinc-900 text-[10px] text-zinc-500 font-mono">
                              Format: Long-form narrative + CTA
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-left flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-mono text-pink-400 font-bold uppercase tracking-widest">
                                  INSTAGRAM // CAROUSEL COPY
                                </span>
                                <span className="text-[9px] text-zinc-500">OPTIMAL 12:15 PM</span>
                              </div>
                              <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed">
                                {b2pOutput.instagram}
                              </p>
                            </div>
                            <div className="mt-3 pt-2 border-t border-zinc-900 text-[10px] text-zinc-500 font-mono">
                              Format: 3-Slide Swiper Blueprint
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-left flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-widest">
                                  REDDIT // COMMUNITY THREAD
                                </span>
                                <span className="text-[9px] text-zinc-500">SUBREDDIT TARGETED</span>
                              </div>
                              <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed">
                                {b2pOutput.reddit}
                              </p>
                            </div>
                            <div className="mt-3 pt-2 border-t border-zinc-900 text-[10px] text-zinc-500 font-mono">
                              Format: Value-first discussion prompt
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* -------------------------------------------------------- */}
                  {/* KNWN SIMULATOR */}
                  {/* -------------------------------------------------------- */}
                  {activeProduct.id === 'knwn' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                            Production Genre / Treatment
                          </label>
                          <select
                            value={knwnGenre}
                            onChange={(e) => setKnwnGenre(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:border-[#FF5500] focus:outline-none"
                          >
                            <option value="Commercial Tech Spec">Commercial Tech Spec (3 Shoot Days)</option>
                            <option value="Narrative Feature Short">Narrative Feature Short (5 Shoot Days)</option>
                            <option value="Luxury Fashion Campaign">Luxury Fashion Campaign (2 Shoot Days)</option>
                            <option value="High-Stakes Music Video">High-Stakes Music Video (1 Shoot Day)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                            Camera &amp; Lens Requirement
                          </label>
                          <select
                            value={knwnCamPackage}
                            onChange={(e) => setKnwnCamPackage(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:border-[#FF5500] focus:outline-none"
                          >
                            <option value="ARRI Alexa 35 + Master Anamorphics">ARRI Alexa 35 + Master Anamorphics</option>
                            <option value="RED V-Raptor XL + Cooke S4/i Primes">RED V-Raptor XL + Cooke S4/i Primes</option>
                            <option value="Sony Venice 2 + Tiffen Steadicam M-2">Sony Venice 2 + Tiffen Steadicam M-2</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                            Production Budget Cap
                          </label>
                          <select
                            value={knwnBudget}
                            onChange={(e) => setKnwnBudget(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:border-[#FF5500] focus:outline-none"
                          >
                            <option value="$20,000">$20,000 Total Camera Dept</option>
                            <option value="$35,000">$35,000 Total Camera Dept</option>
                            <option value="$75,000">$75,000 Full Unit Roster</option>
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={handleGenerateKNWN}
                        disabled={knwnGenerating}
                        className="w-full bg-[#FF5500] hover:bg-[#FF6E26] text-black text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {knwnGenerating ? (
                          <>
                            <Zap size={14} className="animate-spin" />
                            <span>Parsing Hardware Registry &amp; Assembling Squad...</span>
                          </>
                        ) : (
                          <>
                            <Film size={14} />
                            <span>Run AI Team Planner Manifest</span>
                          </>
                        )}
                      </button>

                      {knwnOutput && (
                        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 text-left space-y-4">
                          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-zinc-900 gap-2">
                            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                              <CheckCircle2 size={14} />
                              <span>{knwnOutput.savings}</span>
                            </span>
                            <span className="text-xs font-mono text-zinc-400">
                              {knwnOutput.callSheetTime}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                              <div className="text-[10px] font-mono text-zinc-500 uppercase">DIRECTOR OF PHOTOGRAPHY</div>
                              <div className="text-xs font-bold text-white mt-1">{knwnOutput.dp}</div>
                            </div>
                            <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                              <div className="text-[10px] font-mono text-zinc-500 uppercase">A-CAM STEADICAM OP</div>
                              <div className="text-xs font-bold text-white mt-1">{knwnOutput.steadicam}</div>
                            </div>
                            <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                              <div className="text-[10px] font-mono text-zinc-500 uppercase">CHIEF LIGHTING TECH / GAFFER</div>
                              <div className="text-xs font-bold text-white mt-1">{knwnOutput.gaffer}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* -------------------------------------------------------- */}
                  {/* SUPERHEROFS SIMULATOR */}
                  {/* -------------------------------------------------------- */}
                  {activeProduct.id === 'superherofs' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                            Athletic Primary Objective
                          </label>
                          <select
                            value={shGoal}
                            onChange={(e) => setShGoal(e.target.value as any)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:border-[#FF5500] focus:outline-none"
                          >
                            <option value="Hypertrophy">Hypertrophy (Maximum Muscle Growth)</option>
                            <option value="Strength / Powerlifting">Strength / Powerlifting Peak</option>
                            <option value="Recomposition">Body Recomposition &amp; Fat Loss</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                            Lifting Experience Level
                          </label>
                          <select
                            value={shExperience}
                            onChange={(e) => setShExperience(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:border-[#FF5500] focus:outline-none"
                          >
                            <option value="Intermediate (1–3 Years)">Intermediate (1–3 Years Consistent)</option>
                            <option value="Advanced (4+ Years)">Advanced (4+ Years Heavy Training)</option>
                            <option value="Competitive Athlete">Competitive Powerlifter / Bodybuilder</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                            Weekly Training Split
                          </label>
                          <select
                            value={shDays}
                            onChange={(e) => setShDays(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:border-[#FF5500] focus:outline-none"
                          >
                            <option value="4 Days / Week">4 Days / Week (Upper / Lower)</option>
                            <option value="5 Days / Week">5 Days / Week (Torso / Limbs)</option>
                            <option value="6 Days / Week">6 Days / Week (Push / Pull / Legs)</option>
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={handleGenerateSH}
                        disabled={shGenerating}
                        className="w-full bg-[#FF5500] hover:bg-[#FF6E26] text-black text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {shGenerating ? (
                          <>
                            <Zap size={14} className="animate-spin" />
                            <span>Computing Biomechanical Loads &amp; Macro Targets...</span>
                          </>
                        ) : (
                          <>
                            <Dumbbell size={14} />
                            <span>Generate "Superne" Coaching Telemetry</span>
                          </>
                        )}
                      </button>

                      {shOutput && (
                        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 text-left space-y-4">
                          <div className="pb-3 border-b border-zinc-900 flex items-center justify-between">
                            <span className="text-xs font-mono text-[#FF5500] font-bold uppercase tracking-widest">
                              {shOutput.split}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500 uppercase">
                              AUTONOMOUS COACH // SUPERNE 2.0
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                              <div className="text-[10px] font-mono text-zinc-500 uppercase">DAY 1 KEY LIFTS &amp; RPE</div>
                              <div className="text-xs font-bold text-white mt-1 leading-relaxed">
                                {shOutput.focusExercise}
                              </div>
                              <div className="text-[11px] text-zinc-400 mt-1">
                                {shOutput.overloadLogic}
                              </div>
                            </div>

                            <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                              <div className="text-[10px] font-mono text-zinc-500 uppercase">CALCULATED MACRO SPLIT &amp; CAFE</div>
                              <div className="text-xs font-bold text-white mt-1 leading-relaxed">
                                {shOutput.macroTarget}
                              </div>
                              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                                <Check size={12} />
                                <span>{shOutput.postWorkoutShake}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB CONTENT 4: FULL TECH STACK & TELEMETRY */}
            {activeTab === 'specs' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="pt-8 space-y-8"
              >
                <div className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
                  Engineered with zero technical compromises. The full production architecture of {activeProduct.title} is composed of the following validated infrastructure stack:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeProduct.techStack.map((stack, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF5500] mb-3 flex items-center gap-2">
                        <Terminal size={14} />
                        <span>{stack.category}</span>
                      </div>
                      <ul className="space-y-2">
                        {stack.technologies.map((t, tidx) => (
                          <li key={tidx} className="text-xs text-zinc-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ========================================================================= */}
      {/* 4. PROPRIETARY THESIS: "WHY WE BUILD WHAT WE OWN" */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto relative z-20 py-16 border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono uppercase tracking-widest text-[#FF5500] font-bold mb-4">
            THE AIMLPARTNER PHILOSOPHY
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Why We Build What We Own.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-medium">
            The AI consulting market is filled with agencies who have never deployed a line of production code in their lives. We reject theory in favor of empirical operational proof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 relative">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">PILLAR 01</div>
            <h3 className="text-xl font-bold font-display text-white mb-3">
              Zero Theoretical Fluff
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              When we recommend an AI architecture, a vector caching scheme, or an LLM guardrail to an enterprise client, it is because we have already deployed, stress-tested, and debugged that exact pattern in our own proprietary software fleet.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 relative">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">PILLAR 02</div>
            <h3 className="text-xl font-bold font-display text-[#FF5500] mb-3">
              100% Intellectual Property Sovereignty
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We do not resell white-labeled SaaS templates or rely on fragile no-code glue. Every platform in our portfolio was architected from raw code repositories with complete control over inference latencies, data privacy, and security boundaries.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 relative">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">PILLAR 03</div>
            <h3 className="text-xl font-bold font-display text-white mb-3">
              Continuous Production Validation
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Our products process thousands of real user transactions, call-sheets, check-ins, and automated social dispatches. This live operational telemetry directly feeds into our client engineering sprints.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CROSS-PRODUCT ENGINEERING COMPARISON MATRIX */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-16 max-w-7xl mx-auto relative z-20 pb-20">
        <div className="p-6 sm:p-10 rounded-3xl bg-zinc-950/90 border border-zinc-800 overflow-x-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2 font-bold">
            CROSS-FLEET TELEMETRY MATRIX
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-6">
            Engineering Specifications at a Glance
          </h3>

          <table className="w-full text-left text-xs border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 font-mono uppercase text-[10px]">
                <th className="py-3 px-4">System Spec</th>
                <th className="py-3 px-4 text-white">
                  <div className="flex items-center gap-2">
                    <img src="/b2p_logo.png" alt="BrandToPost Logo" className="w-5 h-5 object-contain" />
                    <span>BrandToPost</span>
                  </div>
                </th>
                <th className="py-3 px-4 text-white">
                  <div className="flex items-center gap-2">
                    <img src="/weareknwn_logo.png" alt="KNWN Logo" className="w-5 h-5 object-contain" />
                    <span>KNWN (weareknwn)</span>
                  </div>
                </th>
                <th className="py-3 px-4 text-white">
                  <div className="flex items-center gap-2">
                    <img src="/superherogym_logo.png" alt="SuperHero Logo" className="w-5 h-5 object-contain" />
                    <span>SuperHero Fitness OS</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 font-sans text-zinc-300">
              <tr>
                <td className="py-3.5 px-4 font-mono text-zinc-500 font-bold">Primary Target</td>
                <td className="py-3.5 px-4">B2B SaaS, Brands &amp; Operators</td>
                <td className="py-3.5 px-4">Film Studios, DPs &amp; Producers</td>
                <td className="py-3.5 px-4">Clubs, Athletes &amp; Lifters</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-mono text-zinc-500 font-bold">Inference Engine</td>
                <td className="py-3.5 px-4">Gemini 2.0 Flash + Pro Structured</td>
                <td className="py-3.5 px-4">Gemini 2.0 + Call Sheet Parser</td>
                <td className="py-3.5 px-4">Superne Biomechanical Engine</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-mono text-zinc-500 font-bold">Latency SLA</td>
                <td className="py-3.5 px-4">&lt; 1,200ms (Full Campaign)</td>
                <td className="py-3.5 px-4">&lt; 850ms (Crew Manifest)</td>
                <td className="py-3.5 px-4">&lt; 350ms (Turnstile QR / Log)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-mono text-zinc-500 font-bold">Hardware Sync</td>
                <td className="py-3.5 px-4">Cloud Headless API Workers</td>
                <td className="py-3.5 px-4">ARRI / RED Registry Matcher</td>
                <td className="py-3.5 px-4">QR Gate Scanner + Pro Shop POS</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-mono text-zinc-500 font-bold">Platform State</td>
                <td className="py-3.5 px-4 text-[#FF5500] font-mono font-bold">PILOT NODES LIVE</td>
                <td className="py-3.5 px-4 text-[#FF5500] font-mono font-bold">PRODUCTION LIVE</td>
                <td className="py-3.5 px-4 text-[#FF5500] font-mono font-bold">COMMERCIAL FLEET</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ENTERPRISE INTAKE CTA (PARTNER / LICENSE) */}
      {/* ========================================================================= */}
      <div id="intake">
        <USIntakeCTA />
      </div>
    </div>
  );
}

export default Products;
