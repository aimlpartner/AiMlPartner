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
import { SEO } from '../../components/SEO';

export function CustomerAgents() {
  const [activeAgent, setActiveAgent] = useState(0);

  const agents = [
    {
      title: "Private Customer Support Bot",
      trigger: "A customer asks a tricky question about your policies, tech, or onboarding.",
      steps: [
        "Instantly reads your private PDF guides, company Notion, and past support tickets",
        "Writes a crystal-clear answer based ONLY on your approved documents",
        "Links the customer directly to the right help center article",
        "If it doesn't know the answer, it hands the chat over to a human with a quick summary"
      ],
      impact: "Resolves up to 75% of basic support tickets instantly",
      techStack: ["Private Vector Database", "OpenAI", "Zendesk / Intercom", "Slack"]
    },
    {
      title: "Live Order & Account Checker",
      trigger: "A customer asks 'Where is my order?' or 'Can I update my billing?'",
      steps: [
        "Securely checks who the customer is so no data is leaked",
        "Checks your live database, Shopify store, or Stripe account",
        "Gives them their live tracking link or downloads their invoice instantly",
        "Closes the support ticket automatically so your team doesn't have to"
      ],
      impact: "Zero wait time for repetitive customer questions",
      techStack: ["Shopify / Stripe API", "PostgreSQL", "Custom Function Calling", "Twilio / Web Widget"]
    },
    {
      title: "24/7 After-Hours Support Guard",
      trigger: "A customer emails in on a Sunday night.",
      steps: [
        "Replies immediately and tries to fix the problem using your company docs",
        "Collects screenshots and account details if a human needs to look at it",
        "Decides if it's a normal issue or a 5-alarm emergency",
        "Writes a draft reply so your human team can just click 'Send' on Monday morning"
      ],
      impact: "Full weekend coverage without paying for overnight shifts",
      techStack: ["Email Webhooks", "OpenAI", "Freshdesk / HubSpot", "SMS Alerts"]
    }
  ];

  const safeguards = [
    {
      title: "It Won't Make Things Up",
      desc: "We lock the AI down so it only answers using your company docs. If the answer isn't there, it politely hands the chat to a human. No weird AI hallucinations."
    },
    {
      title: "Works Wherever Your Customers Are",
      desc: "Put the AI on your website chat, WhatsApp, text messages, or Zendesk. It works exactly the same everywhere."
    },
    {
      title: "Smooth Handoffs to Humans",
      desc: "If a customer just wants to talk to a person, the AI transfers them instantly. It gives your staff a quick summary so the customer doesn't have to repeat themselves."
    },
    {
      title: "You Can See What It's Doing",
      desc: "You get a dashboard showing exactly how many tickets the AI resolved, customer happiness scores, and which help docs need updating."
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-black">
      <SEO 
        title="Custom AI Support Agents" 
        description="Answer 70% of customer questions instantly, 24 hours a day with our custom AI support reps."
        url="https://aimlpartner.com/services/customer-agents"
      />
      {/* Cinematic AI Generated Atmospheric Backdrop */}
      <div className="absolute top-0 left-0 right-0 h-[600px] sm:h-[680px] overflow-hidden pointer-events-none z-0">
        <img
          src="/customer_agents_hero.jpg"
          alt="Customer Agents AI Infrastructure"
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
            Answer 70% of customer questions <br className="hidden md:inline" />
            <span className="text-[#FF5500]">instantly, 24 hours a day.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            We build custom AI support reps trained strictly on your private company docs. They are fast, polite, and completely accurate—with zero AI hallucinations.
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-zinc-800">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF5500] uppercase tracking-wider mb-3">
                <MessageSquareCode size={14} />
                <span>Customer Scenario</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {agents[activeAgent].trigger}
              </h3>
            </div>
            <div className="bg-zinc-900/90 border border-zinc-800 px-5 py-3 rounded-2xl flex items-center gap-3 shrink-0 self-start md:self-auto">
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Give your customers 24/7 support without hiring more staff.</h2>
          <p className="text-zinc-400 text-sm md:text-base">
            Book a 30-minute discovery call. Bring a PDF of your company FAQs, and we'll show you an AI answering questions from it live.
          </p>
        </div>
        <USIntakeCTA />
      </section>
    </div>
  );
}
