import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowUpRight, 
  Lock, 
  Terminal, 
  Server, 
  GitBranch,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { USIntakeCTA } from '../../components/us/USIntakeCTA';
import { SEO } from '../../components/SEO';

export function CustomEngineering() {
  const [activeArch, setActiveArch] = useState(0);

  const architectures = [
    {
      title: "Private Enterprise AI Models",
      scenario: "You handle sensitive data (like healthcare or finance) and can't use public AI tools.",
      steps: [
        "We install top-tier AI models directly onto your own private cloud servers",
        "We tune the servers so the AI runs lightning-fast, even when your whole team is using it",
        "Your company data never leaves your servers. We block all outside connections",
        "We set up strict security so you can see exactly who asked the AI what"
      ],
      impact: "Total data privacy and zero per-message API fees",
      techStack: ["AWS Bedrock / ECS", "vLLM / Kubernetes", "Terraform", "Private VPC"]
    },
    {
      title: "Company-Wide AI Search Engine",
      scenario: "You have thousands of PDFs, legal docs, or old files that are impossible to search.",
      steps: [
        "We connect the AI to all your scattered company files and databases",
        "We build a secure, lightning-fast search engine that actually understands what you mean",
        "We tune the search so the most relevant answers always pop up first",
        "We connect this search engine directly into the tools your team already uses"
      ],
      impact: "Find any answer hidden in your company files instantly",
      techStack: ["PostgreSQL", "FastAPI / Python", "Cohere", "Docker"]
    },
    {
      title: "Rent a Senior AI Engineering Team",
      scenario: "You need senior engineers to build a custom AI feature, but hiring takes too long.",
      steps: [
        "We drop two senior engineers directly into your company to start building immediately",
        "They push fresh, working code to your servers every single week",
        "When the project is done, you keep all the code and technical documentation",
        "We check in every two weeks to make sure the project is moving at breakneck speed"
      ],
      impact: "Launch custom AI software in weeks, not months",
      techStack: ["React / TypeScript", "Python", "PostgreSQL", "GitHub"]
    }
  ];

  const standards = [
    {
      title: "You Own the Code",
      desc: "We don't hold your software hostage. When we finish building, you own the entire codebase, forever. No monthly software traps."
    },
    {
      title: "Total Data Lockdown",
      desc: "We build the AI directly inside your company's own cloud. Your sensitive data never gets sent out to public servers."
    },
    {
      title: "Built to Last",
      desc: "We don't build messy prototypes. We write clean, automated code that your internal IT team can easily manage once we leave."
    },
    {
      title: "Talk Directly to the Builders",
      desc: "No annoying account managers passing messages back and forth. You talk directly with the senior developers writing your code."
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-black">
      <SEO 
        title="Custom AI Engineering" 
        description="Private AI software built entirely on your own servers. We build secure, custom AI tools for your business with zero data leaks."
        url="https://aimlpartner.com/services/custom-engineering"
      />
      {/* Cinematic AI Generated Atmospheric Backdrop */}
      <div className="absolute top-0 left-0 right-0 h-[600px] sm:h-[680px] overflow-hidden pointer-events-none z-0">
        <img
          src="/custom_engineering_hero.jpg"
          alt="Custom Engineering AI Infrastructure"
          className="w-full h-full object-cover object-center opacity-40 brightness-95 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/75 to-black pointer-events-none" />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF5500]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Breadcrumb & Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-[1200px] mx-auto text-center flex flex-col items-center z-10">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-zinc-400 mb-6 font-medium">
          <Link to="/services" className="hover:text-[#FF5500] transition-colors">Services</Link>
          <span>/</span>
          <span className="text-[#FF5500]">Custom AI Engineering</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl mx-auto flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-widest text-[#FF5500] font-mono font-bold block">
            // TECHNICAL & ENTERPRISE TRACK
          </span>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[3.6rem] font-black tracking-tight text-white leading-[1.1] max-w-5xl mx-auto">
            Private AI software built <br className="hidden md:inline" />
            <span className="text-[#FF5500]">entirely on your own servers.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            We build secure, custom AI tools for your business. No data leaks, no third-party APIs snooping on your data, and you own 100% of the code forever.
          </p>

          {/* Quick Metrics Bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-4 border-t border-zinc-800/80 max-w-3xl">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">100%</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-semibold">Code & IP Ownership</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#FF5500]">Private VPC</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-semibold">Zero Data Leakage</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">4–8 Wks</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-semibold">Sprint Delivery</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">Direct</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-semibold">Senior Engineers</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Architecture Demos */}
      <section className="py-16 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-zinc-900">
        <div className="text-left mb-10">
          <span className="text-xs uppercase tracking-widest text-[#FF5500] font-semibold block mb-2">Engineering Architectures</span>
          <h2 className="text-2xl md:text-4xl font-bold text-white">Enterprise AI build configurations</h2>
          <p className="text-zinc-400 text-sm md:text-base mt-2">Explore the technical architectures we deploy into your private cloud infrastructure.</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {architectures.map((arch, idx) => (
            <button
              key={idx}
              onClick={() => setActiveArch(idx)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeArch === idx 
                  ? 'bg-[#FF5500] text-black shadow-lg shadow-[#FF5500]/20 font-bold' 
                  : 'bg-zinc-900/80 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {arch.title}
            </button>
          ))}
        </div>

        {/* Active Architecture Card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-12 text-left relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-zinc-800">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF5500] uppercase tracking-wider mb-3">
                <Server size={14} />
                <span>Use Case Scenario</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {architectures[activeArch].scenario}
              </h3>
            </div>
            <div className="bg-zinc-900/90 border border-zinc-800 px-5 py-3 rounded-2xl flex items-center gap-3 shrink-0 self-start md:self-auto">
              <Lock size={18} className="text-emerald-400" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Security Level</div>
                <div className="text-sm font-bold text-white">{architectures[activeArch].impact}</div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="py-8 space-y-4">
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Engineering Blueprint & Technical Scope</div>
            {architectures[activeArch].steps.map((step, sIdx) => (
              <div key={sIdx} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
                <span className="w-6 h-6 rounded-full bg-[#FF5500]/20 border border-[#FF5500]/40 text-[#FF5500] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {sIdx + 1}
                </span>
                <span className="text-zinc-200 text-sm md:text-base leading-relaxed">{step}</span>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mr-2">Infrastructure & Stack:</span>
            {architectures[activeArch].techStack.map((tool, tIdx) => (
              <span key={tIdx} className="px-3 py-1 bg-zinc-900 border border-zinc-700/60 rounded-lg text-xs text-zinc-300 font-medium">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Standards */}
      <section className="py-16 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-zinc-900">
        <div className="text-left mb-12">
          <span className="text-xs uppercase tracking-widest text-[#FF5500] font-semibold block mb-2">Our Engineering Principles</span>
          <h2 className="text-2xl md:text-4xl font-bold text-white">How we build enterprise software</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {standards.map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
              <CheckCircle2 size={22} className="text-[#FF5500] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA / Booking Form */}
      <section id="intake" className="py-16 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Talk to a Senior Engineer.</h2>
          <p className="text-zinc-400 text-sm md:text-base">
            Book a 30-minute call. We'll look at what you want to build and give you a fixed-price roadmap to get it done.
          </p>
        </div>
        <USIntakeCTA />
      </section>
    </div>
  );
}
