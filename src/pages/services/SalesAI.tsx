import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  MessageSquare, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ArrowUpRight, 
  Clock, 
  Zap, 
  Target, 
  Send,
  PhoneCall
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { USIntakeCTA } from '../../components/us/USIntakeCTA';

export function SalesAI() {
  const [activePlay, setActivePlay] = useState(0);

  const plays = [
    {
      title: "60-Second Inbound Lead Text-Back & Triage",
      trigger: "Prospect submits form on your website or sends a DM",
      steps: [
        "Instant SMS & email dispatched within 45 seconds",
        "AI asks 2-3 key qualifying questions (budget, timeline, project scope)",
        "Scores lead quality and verifies contact information",
        "Provides direct link to book a meeting on your sales calendar"
      ],
      result: "Boosts lead-to-meeting conversion by 30–50%",
      techStack: ["Twilio / SMS Gateway", "Gemini / OpenAI", "HubSpot / Salesforce", "Google Calendar"]
    },
    {
      title: "Automated Lead Scoring & VIP Escalation",
      trigger: "High-value enterprise contact enters your pipeline",
      steps: [
        "AI scans company website, headcount, and LinkedIn profile live",
        "Enriches CRM with verified company size, tech stack, and industry",
        "Flags high-priority leads with custom badges in your CRM",
        "Directly alerts senior account executives via SMS / Slack"
      ],
      result: "Zero delay on six-figure opportunities",
      techStack: ["Clearbit / Clay", "OpenAI / Claude", "Slack Webhooks", "Salesforce"]
    },
    {
      title: "1-Click Custom Proposal & Pitch Deck Drafter",
      trigger: "Discovery call concludes with prospective client",
      steps: [
        "Takes bullet-point notes or meeting transcript",
        "Drafts customized scope of work and 3-tier pricing table",
        "Generates branded PDF proposal ready for founder sign-off",
        "Pre-populates follow-up email and calendar check-in"
      ],
      result: "Cuts proposal turnaround from 48 hours to 10 minutes",
      techStack: ["PandaDoc / DocuSign", "Gemini 2.5 Flash", "Google Docs / PDF Engine"]
    }
  ];

  const features = [
    {
      title: "Instant Response Engine",
      desc: "Never let an inbound prospect wait hours or days. We deploy conversational responders that qualify and book calls 24/7."
    },
    {
      title: "Natural, Human Tone Matching",
      desc: "No robotic buzzwords. We train the AI to write in the exact, professional, friendly voice of your best sales rep."
    },
    {
      title: "Direct CRM & Calendar Sync",
      desc: "Every answer, qualification score, and booked slot syncs straight into your HubSpot, Salesforce, Pipedrive, or Cal.com."
    },
    {
      title: "Zero Lead Leakage Safeguards",
      desc: "If a lead doesn't reply or drops off mid-conversation, automated gentle follow-ups keep the pipeline warm."
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-black">
      {/* Cinematic AI Generated Atmospheric Backdrop */}
      <div className="absolute top-0 left-0 right-0 h-[600px] sm:h-[680px] overflow-hidden pointer-events-none z-0">
        <img
          src="/sales_ai_hero.jpg"
          alt="Sales AI Infrastructure"
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
          <span className="text-[#FF5500]">Sales AI & Lead Routing</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl mx-auto flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-widest text-[#FF5500] font-mono font-bold block">
            // REVENUE & GROWTH TRACK
          </span>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[3.6rem] font-black tracking-tight text-white leading-[1.1] max-w-5xl mx-auto">
            Turn website visitors into <br className="hidden md:inline" />
            <span className="text-[#FF5500]">booked sales calls in 60 seconds.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            Most businesses lose half their inbound leads because they take hours to respond. We build smart AI response and qualification pipelines that engage prospects instantly and book meetings 24/7.
          </p>

          {/* Quick Metrics Bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-4 border-t border-zinc-800/80 max-w-3xl">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">&lt; 60 Sec</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-semibold">Response Time</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#FF5500]">+35%</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-semibold">More Booked Calls</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">24 / 7</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-semibold">Live Qualification</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">2 Weeks</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1 font-semibold">Setup to Launch</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Sales Demos */}
      <section className="py-16 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-zinc-900">
        <div className="text-left mb-10">
          <span className="text-xs uppercase tracking-widest text-[#FF5500] font-semibold block mb-2">Sales Playbooks</span>
          <h2 className="text-2xl md:text-4xl font-bold text-white">Choose a sales acceleration engine</h2>
          <p className="text-zinc-400 text-sm md:text-base mt-2">See how we automate the messy parts of prospecting, qualification, and follow-up.</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {plays.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setActivePlay(idx)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activePlay === idx 
                  ? 'bg-[#FF5500] text-black shadow-lg shadow-[#FF5500]/20 font-bold' 
                  : 'bg-zinc-900/80 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Active Play Card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-12 text-left relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-zinc-800">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF5500] uppercase tracking-wider mb-3">
                <Send size={14} />
                <span>Trigger Event</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {plays[activePlay].trigger}
              </h3>
            </div>
            <div className="bg-zinc-900/90 border border-zinc-800 px-5 py-3 rounded-2xl flex items-center gap-3 shrink-0 self-start md:self-auto">
              <Target size={18} className="text-emerald-400" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Expected Outcome</div>
                <div className="text-sm font-bold text-white">{plays[activePlay].result}</div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="py-8 space-y-4">
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Autonomous Sales Execution Flow</div>
            {plays[activePlay].steps.map((step, sIdx) => (
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
            <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mr-2">Integrated Tech Stack:</span>
            {plays[activePlay].techStack.map((tool, tIdx) => (
              <span key={tIdx} className="px-3 py-1 bg-zinc-900 border border-zinc-700/60 rounded-lg text-xs text-zinc-300 font-medium">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Grid */}
      <section className="py-16 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-zinc-900">
        <div className="text-left mb-12">
          <span className="text-xs uppercase tracking-widest text-[#FF5500] font-semibold block mb-2">What We Build</span>
          <h2 className="text-2xl md:text-4xl font-bold text-white">Full-funnel sales acceleration features</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {features.map((item, idx) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Never miss another qualified sales lead.</h2>
          <p className="text-zinc-400 text-sm md:text-base">
            Book a 30-minute discovery call. We'll audit your current lead response time and demonstrate a live qualification prototype.
          </p>
        </div>
        <USIntakeCTA />
      </section>
    </div>
  );
}
