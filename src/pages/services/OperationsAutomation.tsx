import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Workflow, 
  FileText, 
  Database, 
  CheckCircle2, 
  ArrowRight, 
  ArrowUpRight, 
  Clock, 
  Zap, 
  Layers, 
  ShieldCheck, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { USIntakeCTA } from '../../components/us/USIntakeCTA';

export function OperationsAutomation() {
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  const workflows = [
    {
      title: "Invoice & Receipt Auto-Ingestion",
      trigger: "Vendor emails invoice PDF to billing inbox",
      steps: [
        "AI OCR extracts invoice number, line items, tax, and total",
        "Cross-references against purchase order in database",
        "Creates draft bill in QuickBooks / Xero automatically",
        "Sends 1-click approval notification to manager on Slack"
      ],
      timeSaved: "15-20 hours / week per accounting clerk",
      techStack: ["Make.com / n8n", "OpenAI Vision / Gemini", "QuickBooks / Xero", "Slack"]
    },
    {
      title: "Client Onboarding & Document Pipeline",
      trigger: "New client signs agreement in CRM",
      steps: [
        "Generates customized onboarding checklist and secure upload portal",
        "Automatically validates client ID and required compliance docs",
        "Creates dedicated folders in Google Drive / OneDrive",
        "Sends welcoming intro package and schedules kickoff meeting"
      ],
      timeSaved: "4-6 hours per new client onboarded",
      techStack: ["HubSpot / Salesforce", "DocuSign / PandaDoc", "Google Workspace", "Stripe"]
    },
    {
      title: "Multi-System Database & Inventory Sync",
      trigger: "Stock change, booking, or customer update in one app",
      steps: [
        "Catches live webhook trigger with zero polling latency",
        "Validates and standardizes data format across systems",
        "Updates CRM, ERP, warehouse database, and billing in parallel",
        "Logs audit record and flags any sync discrepancy to admin"
      ],
      timeSaved: "100% elimination of manual double-data entry",
      techStack: ["PostgreSQL / Airtable", "Shopify / ERP", "Webhooks", "Make.com"]
    }
  ];

  const deliverables = [
    {
      title: "Custom End-to-End Workflow Architecture",
      desc: "We map every step of your manual data flow and build custom, unbreakable automations that run silently in the background."
    },
    {
      title: "Bulletproof Error Handling & Alerts",
      desc: "If an unexpected document format or edge case occurs, the system gently notifies your team instead of silently failing."
    },
    {
      title: "Staff Video Walkthroughs & SOP Guides",
      desc: "Clear, plain-English video tutorials and written standard operating procedures so your existing team feels fully supported."
    },
    {
      title: "30-Day Post-Launch Warranty",
      desc: "We stay in your corner for 30 days after launch to fine-tune prompts, adjust field mappings, and guarantee zero downtime."
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

      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF5500]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Breadcrumb & Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-[1200px] mx-auto text-center flex flex-col items-center z-10">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-zinc-400 mb-6 font-medium">
          <Link to="/services" className="hover:text-[#FF5500] transition-colors">Services</Link>
          <span>/</span>
          <span className="text-[#FF5500]">Operations & Workflows</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl mx-auto flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-widest text-[#FF5500] font-mono font-bold block">
            // OPERATIONAL AUTOMATION TRACK
          </span>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[3.6rem] font-black tracking-tight text-white leading-[1.1] max-w-5xl mx-auto">
            Stop wasting hours on <br className="hidden md:inline" />
            <span className="text-[#FF5500]">manual copy-pasting.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            We connect your inboxes, spreadsheets, and databases with smart automations that handle billing, document ingestion, and client handoffs 24/7 with zero human errors.
          </p>

          {/* Quick Metrics Bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-4 border-t border-zinc-800/80 max-w-3xl">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">2–4 Wks</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-semibold">Typical Delivery</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#FF5500]">15–30 Hrs</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-semibold">Weekly Time Saved</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">100%</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-semibold">Code Ownership</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">Zero</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-semibold">Staff Disruption</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Workflow Demos */}
      <section className="py-16 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-zinc-900">
        <div className="text-left mb-10">
          <span className="text-xs uppercase tracking-widest text-[#FF5500] font-semibold block mb-2">Live Blueprints</span>
          <h2 className="text-2xl md:text-4xl font-bold text-white">How these automations actually work</h2>
          <p className="text-zinc-400 text-sm md:text-base mt-2">Click below to see the exact trigger-to-action flow we build for your business.</p>
        </div>

        {/* Workflow Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {workflows.map((wf, idx) => (
            <button
              key={idx}
              onClick={() => setActiveWorkflow(idx)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeWorkflow === idx 
                  ? 'bg-[#FF5500] text-black shadow-lg shadow-[#FF5500]/20 font-bold' 
                  : 'bg-zinc-900/80 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {wf.title}
            </button>
          ))}
        </div>

        {/* Active Workflow Card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-12 text-left relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between gap-6 pb-8 border-b border-zinc-800">
            <div>
              <div className="text-xs font-semibold text-[#FF5500] uppercase tracking-wider mb-2">Trigger Event</div>
              <div className="text-xl font-bold text-white flex items-center gap-2">
                <Zap size={18} className="text-[#FF5500]" />
                {workflows[activeWorkflow].trigger}
              </div>
            </div>
            <div className="bg-zinc-900/90 border border-zinc-800 px-5 py-3 rounded-2xl flex items-center gap-3">
              <Clock size={18} className="text-emerald-400" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Impact</div>
                <div className="text-sm font-bold text-white">{workflows[activeWorkflow].timeSaved}</div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="py-8 space-y-4">
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Step-by-Step AI Execution</div>
            {workflows[activeWorkflow].steps.map((step, sIdx) => (
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
            <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mr-2">Integrates with:</span>
            {workflows[activeWorkflow].techStack.map((tool, tIdx) => (
              <span key={tIdx} className="px-3 py-1 bg-zinc-900 border border-zinc-700/60 rounded-lg text-xs text-zinc-300 font-medium">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables List */}
      <section className="py-16 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-zinc-900">
        <div className="text-left mb-12">
          <span className="text-xs uppercase tracking-widest text-[#FF5500] font-semibold block mb-2">What You Get</span>
          <h2 className="text-2xl md:text-4xl font-bold text-white">Everything included in this track</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {deliverables.map((item, idx) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Ready to automate your back office?</h2>
          <p className="text-zinc-400 text-sm md:text-base">
            Book a 30-minute discovery call. We'll map your repetitive tasks live and tell you exactly what can be automated in 2 weeks.
          </p>
        </div>
        <USIntakeCTA />
      </section>
    </div>
  );
}
