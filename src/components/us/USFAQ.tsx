import React from 'react';
import { ArrowUpRight, ShieldCheck, Lock, Clock, Users, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface FAQItem {
  number: string;
  question: string;
  answer: string;
  tag: string;
}

const FAQS: FAQItem[] = [
  {
    number: '01',
    tag: 'GOVERNANCE & IP',
    question: 'Who owns the IP, fine-tuned weights, and deployed agent graphs?',
    answer: 'You do. 100%. All custom weights, RAG architectures, prompt pipelines, and integration code are deployed directly inside your private cloud environment (AWS, Azure, GCP). You retain absolute custody with zero third-party platform lock-in.'
  },
  {
    number: '02',
    tag: 'POD STRUCTURE',
    question: 'How does AIML Partner differ from traditional management consultancies?',
    answer: 'Traditional consultancies deploy generalist teams who produce multi-month slide decks and bill open-ended hourly fees. We are applied AI engineers. We operate in fixed 2-week outcome-based sprints, shipping production-grade sovereign pods directly to your VPC.'
  },
  {
    number: '03',
    tag: 'SECURITY & ISOLATION',
    question: 'What data isolation and enterprise compliance protocols do you enforce?',
    answer: 'We design SOC2, HIPAA, and GDPR-compliant architectures. Your proprietary data never leaves your VPC. We implement zero-data-retention agreements with foundational model providers and support fully on-premise open-source LLM deployments.'
  },
  {
    number: '04',
    tag: 'TIMELINE & VELOCITY',
    question: 'How quickly is our first production agent live in our environment?',
    answer: 'Following our initial 14-day architecture audit and opportunity mapping sprint, our first production-grade agent is typically live and handling real workflow traffic in your staging/production VPC within 3 to 4 weeks.'
  },
  {
    number: '05',
    tag: 'SYSTEM INTEGRATION',
    question: 'Can you integrate agents into our proprietary internal tooling and databases?',
    answer: 'Yes. Our agents live where your organization operates—Salesforce, HubSpot, Slack, Microsoft Teams, Jira, Snowflake, Postgres, and custom internal REST or GraphQL APIs with deterministic error handling.'
  },
  {
    number: '06',
    tag: 'TEAM ALIGNMENT',
    question: 'How do our internal engineers collaborate with your dedicated AI pod?',
    answer: 'We operate as an embedded extension of your engineering leadership. We conduct weekly syncs, provide full architectural documentation, and run joint pair-programming sprints to ensure complete internal operational mastery.'
  }
];

export function USFAQ() {
  return (
    <section id="faq" className="py-36 px-6 md:px-16 bg-black text-white border-b border-zinc-900 relative select-none overflow-hidden">
      
      {/* Ambient Warm Glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#FF5500]/4 rounded-full blur-[240px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* ========================================================================= */}
        {/* 2-COLUMN ASYMMETRIC CODEX LAYOUT (ZERO CLICKS, EFFORTLESS EXECUTIVE READ) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          
          {/* Left Column: Fixed Manifesto & Visual Anchor (Spans 5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-zinc-950 border border-zinc-800">
                  EXECUTIVE INQUIRY // PRINCIPLES
                </span>
              </div>

              <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.05] mb-6">
                Clear answers.{' '}
                <span className="text-[#FF5500]">Zero ambiguity.</span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed mb-10">
                Everything you need to know about our sovereign engineering pods, IP custody, security isolation, and production timelines.
              </p>
            </div>

            {/* Floating Visual Sculpture Anchor */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="w-48 sm:w-60 aspect-square flex items-center justify-center my-6 relative group"
            >
              <img
                src="/hero_monolith.png"
                alt="Floating Sovereign Monolith Sculpture"
                className="max-h-full max-w-full object-contain drop-shadow-[0_25px_50px_rgba(255,85,0,0.2)] transform group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Direct Intake Card */}
            <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-900 mt-6">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-2 font-bold">
                HAVE A BESPOKE ARCHITECTURAL CONSTRAINT?
              </span>
              <p className="font-sans text-xs text-zinc-400 mb-6 leading-relaxed">
                Schedule a confidential 30-minute technical discovery call with our founding engineers.
              </p>
              <a
                href="#intake"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all shadow-us-pop hover:scale-105 active:scale-95 group cursor-pointer"
              >
                <span>Schedule Briefing</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column: The 6 Unfolded Inscriptions (Spans 7 cols, Zero Clicks) */}
          <div className="lg:col-span-7 space-y-12">
            {FAQS.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="pt-10 border-t border-zinc-900 group"
              >
                {/* Header Row: Numeral & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-widest">
                    {faq.tag}
                  </span>
                  <span className="font-mono text-xs text-zinc-600 font-bold">
                    {faq.number}
                  </span>
                </div>

                {/* Question */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight leading-snug group-hover:text-[#FF5500] transition-colors duration-300">
                  {faq.question}
                </h3>

                {/* Answer */}
                <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
