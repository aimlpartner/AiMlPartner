import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Workflow, 
  TrendingUp, 
  Bot, 
  Cpu, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Users,
  Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { USIntakeCTA } from '../components/us/USIntakeCTA';
import { SEO } from '../components/SEO';

export function Services() {
  const [selectedPersona, setSelectedPersona] = useState<number | null>(null);

  const personas = [
    {
      role: "Operations & Admin",
      problem: "We waste hours every day doing manual data entry and copying info from one app to another.",
      recommendedTrack: "Operations & Workflow Automation",
      link: "/services/operations-automation",
      trackIndex: 0
    },
    {
      role: "Sales & Revenue",
      problem: "We lose deals because it takes us too long to reply to new leads and follow up.",
      recommendedTrack: "AI Lead Routing & Sales Acceleration",
      link: "/services/sales-ai",
      trackIndex: 1
    },
    {
      role: "Customer Support",
      problem: "Our team spends all day answering the exact same basic customer questions over and over.",
      recommendedTrack: "24/7 Custom Support Agents",
      link: "/services/customer-agents",
      trackIndex: 2
    },
    {
      role: "Engineering & IT",
      problem: "We need custom AI software, but we can't risk our sensitive company data leaking to public AI tools.",
      recommendedTrack: "Private Cloud & Custom Engineering",
      link: "/services/custom-engineering",
      trackIndex: 3
    }
  ];

  const serviceTracks = [
    {
      id: "operations",
      icon: <Workflow className="text-[#FF5500]" size={28} />,
      badge: "Track 01 // Operations & Admin",
      title: "Operations Automation",
      headline: "Stop typing the same things twice.",
      desc: "We build background automations that connect your inbox, CRM, and accounting software. They automatically read documents, extract data, and sync everything perfectly without a human ever touching it.",
      link: "/services/operations-automation",
      timeline: "2–4 Weeks Delivery",
      benefits: [
        "Automatic invoice and receipt processing",
        "Instant client onboarding setups",
        "Keep all your databases and apps perfectly synced",
        "Get instant alerts on Slack or Email when things happen"
      ],
      popularFor: "Law firms, accounting, real estate, logistics, and agencies."
    },
    {
      id: "sales",
      icon: <TrendingUp className="text-[#FF5500]" size={28} />,
      badge: "Track 02 // Sales & Revenue",
      title: "Sales AI & Lead Routing",
      headline: "Turn website visitors into booked calls instantly.",
      desc: "We build AI agents that text and email your leads the second they reach out. The AI asks qualifying questions and books them directly on your calendar, so you never miss a deal.",
      link: "/services/sales-ai",
      timeline: "2–3 Weeks Delivery",
      benefits: [
        "Respond to new leads in under 60 seconds",
        "Automatically filter out bad leads and tire-kickers",
        "Instantly generate custom proposals and quotes",
        "Syncs directly with your CRM and calendar"
      ],
      popularFor: "B2B sales teams, high-ticket consultants, clinics, and service businesses."
    },
    {
      id: "support",
      icon: <Bot className="text-[#FF5500]" size={28} />,
      badge: "Track 03 // Customer Experience",
      title: "Custom AI Support Agents",
      headline: "Answer repetitive customer questions instantly, 24/7.",
      desc: "We build customer support AI that is trained ONLY on your private company documents. It doesn't guess or make things up. If it doesn't know the exact answer, it politely hands the chat to a human.",
      link: "/services/customer-agents",
      timeline: "3–4 Weeks Delivery",
      benefits: [
        "Trained strictly on your PDFs and FAQs (zero made-up answers)",
        "Can check live order statuses and account details",
        "Smoothly transfers to human staff with a quick summary",
        "Works on your website chat, WhatsApp, SMS, or Zendesk"
      ],
      popularFor: "E-commerce brands, SaaS companies, property management, and clinics."
    },
    {
      id: "engineering",
      icon: <Cpu className="text-[#FF5500]" size={28} />,
      badge: "Track 04 // Enterprise & Technical",
      title: "Custom AI Engineering",
      headline: "Private AI software built entirely on your own servers.",
      desc: "For companies that handle sensitive data and can't use public AI tools. We build custom AI software directly on your own private servers so your data never leaves your company.",
      link: "/services/custom-engineering",
      timeline: "4–8 Weeks Delivery",
      benefits: [
        "You own 100% of the code and the software forever",
        "Total data privacy with zero leaks to outside servers",
        "Search instantly through millions of internal company documents",
        "Work directly with our senior software engineers"
      ],
      popularFor: "Healthcare, Finance, IT departments, and large enterprises."
    }
  ];

  const deliverySteps = [
    {
      step: "01",
      title: "14-Day Roadmap & Demo",
      desc: "We look at what's wasting the most time in your business, and we build a live test version of the AI for you to try before we do a full launch."
    },
    {
      step: "02",
      title: "Custom Build & Launch",
      desc: "Our engineers build the complete automation directly into the tools you already use (like HubSpot or QuickBooks) and train your staff on how to use it."
    },
    {
      step: "03",
      title: "30 Days Free Support",
      desc: "We stay with you for a full month after launch to fix any bugs, tweak the AI, and make sure it works exactly the way you want."
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-black">
      <SEO 
        title="AI Services & Solutions" 
        description="We build custom software that replaces manual human work. From operations automation to AI sales agents, see how we can help your business."
        url="https://aimlpartner.com/services"
      />
      {/* Cinematic Saturn Atmospheric Backdrop */}
      <div className="absolute top-0 left-0 right-0 h-[620px] sm:h-[700px] overflow-hidden pointer-events-none z-0">
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#FF5500]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-[1200px] mx-auto text-center flex flex-col items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl mx-auto flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-widest text-[#FF5500] font-mono font-bold block">
            // TAILORED APPLIED AI ENGINEERING TRACKS
          </span>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-black tracking-tight text-white leading-[1.12] max-w-5xl mx-auto">
            We build custom AI tools that <br className="hidden md:inline" />
            <span className="text-[#FF5500]">do the busywork for you.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            No confusing tech jargon. No monthly software traps. We build custom automations that plug directly into your business to save you time and make you more money.
          </p>
        </motion.div>

        {/* Persona Selector (Find your situation) */}
        <div className="w-full mt-14 pt-10 border-t border-zinc-800/80">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FF5500] mb-6">
            <Compass size={14} />
            <span>Select where your business is currently bleeding the most money:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {personas.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPersona(selectedPersona === idx ? null : idx)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                  selectedPersona === idx 
                    ? 'bg-[#FF5500]/15 border-[#FF5500] shadow-lg shadow-[#FF5500]/10' 
                    : 'bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                <div>
                  <div className="text-sm font-bold text-white mb-2">{p.role}</div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{p.problem}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-semibold text-[#FF5500]">
                  <span>Explore Track</span>
                  <ArrowRight size={13} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Core Service Tracks Showcase */}
      <section className="py-16 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-zinc-900">
        <div className="text-left mb-12">
          <span className="text-xs uppercase tracking-widest text-[#FF5500] font-semibold block mb-2">Our 4 Core Service Tracks</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Choose the right engine for your business</h2>
          <p className="text-zinc-400 text-sm md:text-base mt-2">Each track is delivered in structured, fixed-price milestones with 100% code and workflow ownership.</p>
        </div>

        <div className="space-y-8">
          {serviceTracks.map((track, idx) => {
            const isHighlighted = selectedPersona !== null && personas[selectedPersona]?.trackIndex === idx;

            return (
              <div
                key={track.id}
                className={`rounded-3xl p-8 md:p-12 text-left border transition-all duration-500 relative overflow-hidden ${
                  isHighlighted 
                    ? 'bg-zinc-950 border-[#FF5500] shadow-2xl shadow-[#FF5500]/15 ring-1 ring-[#FF5500]' 
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {isHighlighted && (
                  <div className="absolute top-6 right-8 text-[11px] font-bold uppercase tracking-widest text-[#FF5500]">
                    ✦ Recommended For You
                  </div>
                )}

                <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                  {/* Left Column */}
                  <div className="space-y-4 max-w-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/20 flex items-center justify-center">
                        {track.icon}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#FF5500] uppercase tracking-wider block">{track.badge}</span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mt-0.5">{track.title}</h3>
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-medium">
                      {track.headline}
                    </p>

                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                      {track.desc}
                    </p>

                    <div className="pt-2 text-xs text-zinc-400">
                      <span className="font-semibold text-zinc-300">Best fit for: </span>
                      {track.popularFor}
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Link
                        to={track.link}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF5500] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#FF6E26] hover:scale-105 transition-all cursor-pointer shadow-lg shadow-[#FF5500]/20"
                      >
                        <span>Explore {track.title.split('&')[0]} Subpage</span>
                        <ArrowUpRight size={14} />
                      </Link>

                      <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
                        <Clock size={14} className="text-[#FF5500]" />
                        <span>{track.timeline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Key Benefits Box */}
                  <div className="w-full lg:w-[420px] bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-6 space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">What We Deliver</div>
                    {track.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3 text-xs md:text-sm text-zinc-300">
                        <CheckCircle2 size={16} className="text-[#FF5500] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How We Deliver */}
      <section className="py-16 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-zinc-900">
        <div className="text-left mb-12">
          <span className="text-xs uppercase tracking-widest text-[#FF5500] font-semibold block mb-2">Our Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">How engagements work</h2>
          <p className="text-zinc-400 text-sm md:text-base mt-2">Zero ambiguity. We work in clear, rapid milestones so you see real working software fast.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {deliverySteps.map((s, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 relative flex flex-col justify-between">
              <div>
                <span className="text-2xl font-bold text-[#FF5500] font-mono block mb-4">{s.step}</span>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Booking CTA */}
      <section id="intake" className="py-16 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Not sure which track you need?</h2>
          <p className="text-zinc-400 text-sm md:text-base">
            Book a free 30-minute discovery call. We'll look at your existing software, map your bottlenecks, and give you honest advice on what to automate first.
          </p>
        </div>
        <USIntakeCTA />
      </section>
    </div>
  );
}
