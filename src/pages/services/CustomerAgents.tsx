import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bot, 
  Headphones, 
  Database, 
  CheckCircle2, 
  ArrowRight, 
  ArrowUpRight, 
  Clock, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles,
  MessageSquareCode
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { USIntakeCTA } from '../../components/us/USIntakeCTA';

export function CustomerAgents() {
  const [activeAgent, setActiveAgent] = useState(0);

  const agents = [
    {
      title: "Private Knowledge Base Support Agent",
      trigger: "Customer asks complex policy, technical, or onboarding question",
      steps: [
        "Searches your private PDF guides, SOPs, Notion, and Zendesk tickets via vector search",
        "Formulates a crystal-clear, accurate answer grounded ONLY in verified facts",
        "Includes direct reference links to your help center articles",
        "If unsure, cleanly escalates to human agent with complete customer context"
      ],
      impact: "Resolves 60–75% of tier-1 support tickets instantly",
      techStack: ["Private Vector Database (Pinecone / pgvector)", "Gemini 2.5 Flash", "Zendesk / Intercom", "Slack"]
    },
    {
      title: "Live Account & Order Status Lookup Agent",
      trigger: "Customer asks: 'Where is my shipment?' or 'Update my billing plan'",
      steps: [
        "Securely verifies customer identity and account number",
        "Queries live database / Shopify / Stripe API via authenticated endpoints",
        "Returns live carrier tracking status or invoice download link",
        "Updates ticket status to 'Resolved' automatically"
      ],
      impact: "Zero wait time for repetitive transactional inquiries",
      techStack: ["Shopify / Stripe API", "PostgreSQL", "Custom Function Calling", "Twilio / Web Widget"]
    },
    {
      title: "Smart After-Hours & Weekend Responder",
      trigger: "Inbound ticket received outside of normal business hours",
      steps: [
        "Acknowledges customer inquiry immediately with accurate resolution",
        "Collects necessary screenshots, account details, and diagnostic info",
        "Categorizes urgency: normal vs. critical escalation",
        "Prepares a ready-to-review draft for the morning human support team"
      ],
      impact: "Guarantees 24/7/365 coverage without overnight shift costs",
      techStack: ["Email Webhooks", "OpenAI / Anthropic", "Freshdesk / HubSpot", "SMS Alerts"]
    }
  ];

  const safeguards = [
    {
      title: "Strict Zero-Hallucination Guardrails",
      desc: "Our agents only answer using information explicitly provided in your company documentation. If the answer isn't in your docs, the agent politely routes to a human."
    },
    {
      title: "Omnichannel Deployment",
      desc: "Deploy the same intelligent agent across your website chat widget, WhatsApp, SMS, Zendesk, Intercom, or internal team Slack channels."
    },
    {
      title: "Seamless Human Escalation",
      desc: "When a customer requests a person or the issue is high-touch, the agent transfers the chat with a concise 3-bullet summary so the customer never repeats themselves."
    },
    {
      title: "Continuous Accuracy Analytics",
      desc: "Access a live dashboard showing customer satisfaction scores, resolution percentages, and areas where documentation can be improved."
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
          <span className="text-[#FF5500]">Custom AI Support Agents</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl mx-auto flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-widest text-[#FF5500] font-mono font-bold block">
            // CUSTOMER EXPERIENCE TRACK
          </span>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[3.6rem] font-black tracking-tight text-white leading-[1.1] max-w-5xl mx-auto">
            Resolve 70% of support tickets <br className="hidden md:inline" />
            <span className="text-[#FF5500]">in seconds, 24 hours a day.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            Custom AI support agents trained strictly on your private documents, FAQs, and databases. Fast, polite, and completely accurate — with zero hallucinations.
          </p>

          {/* Quick Metrics Bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-4 border-t border-zinc-800/80 max-w-3xl">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">70%+</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-semibold">Resolution Rate</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#FF5500]">&lt; 5 Sec</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-semibold">First Response</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">24/7/365</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-semibold">Active Uptime</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">Zero</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-semibold">Hallucinations</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Agent Demos */}
      <section className="py-16 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-zinc-900">
        <div className="text-left mb-10">
          <span className="text-xs uppercase tracking-widest text-[#FF5500] font-semibold block mb-2">Agent Blueprints</span>
          <h2 className="text-2xl md:text-4xl font-bold text-white">Custom agents built for your stack</h2>
          <p className="text-zinc-400 text-sm md:text-base mt-2">See how our agents handle inquiries from standard knowledge queries to authenticated lookups.</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {agents.map((a, idx) => (
            <button
              key={idx}
              onClick={() => setActiveAgent(idx)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeAgent === idx 
                  ? 'bg-[#FF5500] text-black shadow-lg shadow-[#FF5500]/20 font-bold' 
                  : 'bg-zinc-900/80 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {a.title}
            </button>
          ))}
        </div>

        {/* Active Agent Card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-12 text-left relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between gap-6 pb-8 border-b border-zinc-800">
            <div>
              <div className="text-xs font-semibold text-[#FF5500] uppercase tracking-wider mb-2">Customer Scenario</div>
              <div className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquareCode size={18} className="text-[#FF5500]" />
                {agents[activeAgent].trigger}
              </div>
            </div>
            <div className="bg-zinc-900/90 border border-zinc-800 px-5 py-3 rounded-2xl flex items-center gap-3">
              <Sparkles size={18} className="text-emerald-400" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Business Impact</div>
                <div className="text-sm font-bold text-white">{agents[activeAgent].impact}</div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="py-8 space-y-4">
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Agentic Knowledge Search & Resolution</div>
            {agents[activeAgent].steps.map((step, sIdx) => (
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
            <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mr-2">Core Agent Components:</span>
            {agents[activeAgent].techStack.map((tool, tIdx) => (
              <span key={tIdx} className="px-3 py-1 bg-zinc-900 border border-zinc-700/60 rounded-lg text-xs text-zinc-300 font-medium">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Safeguards Grid */}
      <section className="py-16 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-zinc-900">
        <div className="text-left mb-12">
          <span className="text-xs uppercase tracking-widest text-[#FF5500] font-semibold block mb-2">Safety & Guardrails</span>
          <h2 className="text-2xl md:text-4xl font-bold text-white">Built for enterprise brand safety</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {safeguards.map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
              <ShieldCheck size={22} className="text-[#FF5500] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA / Booking Form */}
      <section id="intake" className="py-16 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Upgrade your support team with 24/7 AI.</h2>
          <p className="text-zinc-400 text-sm md:text-base">
            Book a 30-minute discovery call. We'll test an AI agent live on your own FAQ documents in real time.
          </p>
        </div>
        <USIntakeCTA />
      </section>
    </div>
  );
}
