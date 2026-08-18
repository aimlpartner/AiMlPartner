import React, { useState } from 'react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  number: string;
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    number: '01',
    category: 'IP & CUSTODY',
    question: 'Who owns the IP, fine-tuned weights, and deployed agent code?',
    answer: 'You do. 100%. All custom weights, prompt pipelines, RAG architectures, and integration connectors are deployed directly inside your private cloud perimeter (AWS, Azure, GCP). You retain absolute custody with zero third-party vendor lock-in.'
  },
  {
    number: '02',
    category: 'POD STRUCTURE',
    question: 'How does AIML Partner differ from traditional software consultancies?',
    answer: 'Traditional consultancies deploy generalist teams who produce multi-month slide decks and bill open-ended hourly fees. We are applied AI engineers. We operate in fixed 2-week outcome-based sprints, shipping production-grade sovereign pods directly to your VPC.'
  },
  {
    number: '03',
    category: 'DATA PRIVACY',
    question: 'What data isolation and compliance standards do you enforce?',
    answer: 'We design SOC2, HIPAA, and GDPR-compliant architectures. Your proprietary data never leaves your VPC. We enforce zero-data-retention agreements with foundational model providers and support fully on-premise open-source LLM deployments (DeepSeek, Llama).'
  },
  {
    number: '04',
    category: 'TIMELINE',
    question: 'How quickly is our first production agent live in our environment?',
    answer: 'Following our initial 14-day architecture audit and opportunity mapping sprint, our first production-grade agent is typically live and handling real workflow traffic in your staging/production VPC within 3 to 4 weeks.'
  },
  {
    number: '05',
    category: 'INTEGRATIONS',
    question: 'Can you connect to our proprietary internal tools and databases?',
    answer: 'Yes. Our agents live where your organization operates—Salesforce, HubSpot, Slack, Microsoft Teams, Jira, Snowflake, Postgres, and custom internal REST or GraphQL APIs with deterministic error handling.'
  },
  {
    number: '06',
    category: 'COLLABORATION',
    question: 'How does our internal team collaborate with your AI pod?',
    answer: 'We operate as an embedded extension of your engineering leadership. We conduct weekly syncs, provide full architectural documentation, and run joint pair-programming sprints to ensure complete internal operational mastery.'
  },
  {
    number: '07',
    category: 'LOCAL PRESENCE',
    question: 'Where is your engineering team based, and can we meet in person?',
    answer: 'Our core engineering leadership is based in New Jersey. We conduct on-site architectural audits and executive whiteboarding workshops across Jersey City, Princeton, Newark, and the broader Tri-State corridor, while deploying pods for enterprises nationwide.'
  }
];

export function USFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 px-6 md:px-16 bg-black text-white border-b border-zinc-900 relative select-none">
      
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[500px] bg-[#FF5500]/5 rounded-full blur-[240px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* ========================================================================= */}
        {/* 2-COLUMN EDITORIAL CODEX */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          
          {/* Left Column: Editorial Manifesto & Direct Action */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-mono font-bold mb-4">
                COMMON INQUIRIES
              </p>

              <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.04] mb-6">
                Clear answers.{' '}
                <span className="text-[#FF5500]">Zero ambiguity.</span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed mb-10">
                Everything you need to know about our sovereign engineering pods, IP custody, security isolation, and production delivery timelines.
              </p>

              <div className="pt-6 border-t border-zinc-900">
                <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-2 font-bold">
                  HAVE A BESPOKE CONSTRAINT?
                </p>
                <p className="font-sans text-xs text-zinc-400 mb-6 leading-relaxed">
                  Speak directly with our founding engineering team in a confidential 30-minute technical briefing.
                </p>
                <a
                  href="#intake"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-us-pop"
                >
                  <span>Book Technical Briefing</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Accordion Inscriptions */}
          <div className="lg:col-span-7 divide-y divide-zinc-900 border-t border-b border-zinc-900">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.number}
                  className="py-8 transition-colors duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-start justify-between text-left gap-6 cursor-pointer group"
                  >
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] text-[#FF5500] uppercase tracking-widest font-bold">
                        {faq.category} // 0{idx + 1}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-[#FF5500] transition-colors duration-300">
                        {faq.question}
                      </h3>
                    </div>
                    
                    <div className={`p-2 rounded-full border border-zinc-800 text-zinc-400 group-hover:border-[#FF5500] group-hover:text-[#FF5500] transition-all duration-300 shrink-0 mt-1 ${
                      isOpen ? 'bg-[#FF5500]/10 border-[#FF5500] text-[#FF5500]' : ''
                    }`}>
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed pt-4 max-w-xl">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
