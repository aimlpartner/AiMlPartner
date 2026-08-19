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

export function CustomEngineering() {
  const [activeArch, setActiveArch] = useState(0);

  const architectures = [
    {
      title: "Self-Hosted Private Cloud LLM Deployment",
      scenario: "Enterprises with strict data privacy / compliance rules (HIPAA, SOC2, FINRA)",
      steps: [
        "Deploy open weights models (Llama 3.3, Mistral, DeepSeek) inside your private AWS/GCP VPC",
        "Configure vLLM / Ollama high-throughput inference engines with auto-scaling GPU nodes",
        "Zero data transmission to third-party public AI APIs",
        "Enterprise role-based authentication and immutable query audit logs"
      ],
      impact: "100% data sovereignty & predictable fixed compute costs",
      techStack: ["AWS Bedrock / ECS", "vLLM / Kubernetes", "Terraform", "Private VPC"]
    },
    {
      title: "Custom Enterprise RAG & Vector Knowledge Base",
      scenario: "Search and query millions of technical documents, legal records, or engineering specs",
      steps: [
        "Ingest, chunk, and embed massive unstructured document repositories",
        "Store in private pgvector / Qdrant instance with hybrid semantic + keyword search",
        "Implement re-ranking pipelines to guarantee accurate context extraction",
        "Connect to internal tools via private REST / GraphQL APIs"
      ],
      impact: "Instant semantic retrieval across enterprise silos",
      techStack: ["PostgreSQL (pgvector)", "FastAPI / Python", "Cohere Re-rank", "Docker"]
    },
    {
      title: "Dedicated Full-Stack AI Engineering Pod",
      scenario: "Companies needing senior AI engineers to accelerate an existing product roadmap",
      steps: [
        "2 dedicated senior AI engineers embedded directly into your sprint cycle",
        "Weekly production deployments into your private GitHub repository",
        "Complete ownership of code, Dockerfiles, and architectural documentation",
        "Bi-weekly milestone check-ins with senior principal architects"
      ],
      impact: "Ship complex custom AI features in 4-6 weeks flat",
      techStack: ["React / TypeScript", "Python / LangGraph", "PostgreSQL", "GitHub Actions"]
    }
  ];

  const standards = [
    {
      title: "100% Code & IP Ownership",
      desc: "All source code, Docker images, Terraform scripts, and custom model weights belong entirely to your company. Zero proprietary runtime lock-in."
    },
    {
      title: "Air-Gapped & VPC Isolation",
      desc: "We build directly inside your cloud infrastructure (AWS, Azure, GCP, or bare metal). Your customer data never leaves your security perimeter."
    },
    {
      title: "Production Infrastructure as Code",
      desc: "Repeatable, automated CI/CD pipelines and infrastructure scripts that your in-house DevOps team can manage and scale with ease."
    },
    {
      title: "Direct Senior Engineer Access",
      desc: "No non-technical account managers or junior contractors. You communicate directly with the senior engineers building your codebase."
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-black">
      {/* Cinematic Saturn Atmospheric Backdrop */}
      <div className="absolute top-0 left-0 right-0 h-[600px] sm:h-[680px] overflow-hidden pointer-events-none z-0">
        <video
          src="/saturn_loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
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
            Private Cloud AI & <br className="hidden md:inline" />
            <span className="text-[#FF5500]">Custom Software Engineering.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            For technical leaders and enterprises that need private LLMs, custom vector search, and dedicated engineering pods built directly inside their secure cloud with 100% code ownership.
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
          <div className="flex flex-col md:flex-row justify-between gap-6 pb-8 border-b border-zinc-800">
            <div>
              <div className="text-xs font-semibold text-[#FF5500] uppercase tracking-wider mb-2">Use Case Context</div>
              <div className="text-xl font-bold text-white flex items-center gap-2">
                <Server size={18} className="text-[#FF5500]" />
                {architectures[activeArch].scenario}
              </div>
            </div>
            <div className="bg-zinc-900/90 border border-zinc-800 px-5 py-3 rounded-2xl flex items-center gap-3">
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Speak directly with a Senior AI Engineer.</h2>
          <p className="text-zinc-400 text-sm md:text-base">
            Book an architecture consultation. We'll review your current data infrastructure and provide a clean, fixed-price sprint blueprint.
          </p>
        </div>
        <USIntakeCTA />
      </section>
    </div>
  );
}
