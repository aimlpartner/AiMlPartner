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
import { SEO } from '../../components/SEO';

export function OperationsAutomation() {
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  const workflows = [
    {
      title: "Automated Invoicing & Billing",
      trigger: "A vendor emails a PDF invoice to your billing inbox.",
      steps: [
        "AI reads the PDF and instantly extracts the invoice number, line items, and total amount",
        "It checks your database to make sure the purchase order matches",
        "It automatically drafts the bill in QuickBooks or Xero",
        "It pings the manager on Slack for a simple 1-click approval"
      ],
      timeSaved: "15-20 hours / week per accounting clerk",
      techStack: ["Make.com", "OpenAI Vision", "QuickBooks / Xero", "Slack"]
    },
    {
      title: "Zero-Touch Client Onboarding",
      trigger: "A new client signs a contract in your CRM.",
      steps: [
        "Automatically creates a custom onboarding checklist and secure upload folder",
        "Scans and verifies client IDs and compliance documents instantly",
        "Creates dedicated Google Drive or OneDrive folders for the client",
        "Sends a warm welcome email and schedules the kickoff meeting on your calendar"
      ],
      timeSaved: "4-6 hours per new client onboarded",
      techStack: ["HubSpot / Salesforce", "DocuSign", "Google Workspace", "Stripe"]
    },
    {
      title: "Messy Database Cleanup & Sync",
      trigger: "A customer updates their info, or inventory changes in one app.",
      steps: [
        "Instantly catches the update the second it happens",
        "Cleans up the formatting (e.g., standardizing phone numbers or addresses)",
        "Updates your CRM, billing software, and warehouse database all at exactly the same time",
        "Logs a record of the change and alerts an admin if something looks wrong"
      ],
      timeSaved: "100% elimination of manual double-data entry",
      techStack: ["PostgreSQL / Airtable", "Shopify / ERP", "Webhooks", "Make.com"]
    }
  ];

  const deliverables = [
    {
      title: "100% Custom Automation Built for You",
      desc: "We look at exactly how you run your business today, and we build custom automations that do the busywork for you in the background."
    },
    {
      title: "Smart Error Handling (No Silent Fails)",
      desc: "If the AI sees a weird document format it doesn't understand, it won't just crash. It gently notifies your team on Slack to take a look."
    },
    {
      title: "Step-by-Step Team Training",
      desc: "Clear, plain-English video tutorials and written guides so your existing team feels fully supported and knows exactly how to use the new tools."
    },
    {
      title: "30 Days of Free Tweaks & Support",
      desc: "We stay in your corner for a full month after launch to fine-tune the AI, fix any bugs, and guarantee it works exactly the way you want."
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-black">
      <SEO 
        title="Operations Automation & Workflows" 
        description="Stop paying humans to do robot work. We build custom AI automations that connect your inboxes, spreadsheets, and CRMs."
        url="https://aimlpartner.com/services/operations-automation"
      />
      {/* Cinematic AI Generated Atmospheric Backdrop */}
      <div className="absolute top-0 left-0 right-0 h-[600px] sm:h-[680px] overflow-hidden pointer-events-none z-0">
        <img
          src="/operations_hero.jpg"
          alt="Operations Automation AI Infrastructure"
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
            Stop paying humans to do <br className="hidden md:inline" />
            <span className="text-[#FF5500]">robot work.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            We build custom AI automations that connect your inboxes, spreadsheets, and CRMs. We make them talk to each other so your team never has to copy-paste data again.
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-zinc-800">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF5500] uppercase tracking-wider mb-3">
                <Zap size={14} />
                <span>Trigger Event</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {workflows[activeWorkflow].trigger}
              </h3>
            </div>
            <div className="bg-zinc-900/90 border border-zinc-800 px-5 py-3 rounded-2xl flex items-center gap-3 shrink-0 self-start md:self-auto">
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
