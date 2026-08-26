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
    category: 'OWNERSHIP',
    question: 'Who owns the software and the code?',
    answer: 'You do. 100%. We build the automation for you, and once it is launched, you own all the intellectual property and code. No vendor lock-in, and absolutely no monthly per-user licenses.'
  },
  {
    number: '02',
    category: 'TECHNICAL SKILLS',
    question: 'Do I need a tech team to use this?',
    answer: 'Not at all. We handle all the technical setup, coding, and integrations. We build the automations to run quietly in the background so your team can just focus on their actual jobs.'
  },
  {
    number: '03',
    category: 'DATA PRIVACY',
    question: 'Is our company data secure?',
    answer: 'Yes. We launch the software directly into your own private and secure accounts. Your private business data never leaves your control, and we sign strict confidentiality agreements.'
  },
  {
    number: '04',
    category: 'TIMELINE',
    question: 'How long does it take to build?',
    answer: 'It depends on the complexity of your workflow, but we specialize in moving fast. Most of our custom automations are built, tested, and running in your business within a matter of weeks, not months.'
  },
  {
    number: '05',
    category: 'INTEGRATIONS',
    question: 'Will this work with the software we already use?',
    answer: 'Yes. We connect directly to the tools you already rely on—whether that is QuickBooks, Salesforce, HubSpot, Outlook, or industry-specific tools. You do not have to change how you work; we just automate the manual steps.'
  },
  {
    number: '06',
    category: 'PRICING',
    question: 'How much does it cost?',
    answer: 'We charge a flat, one-time fee for the build based on the scope of the project. There are no surprise hourly bills and no ongoing monthly seat taxes. You pay for the result, and then you own it.'
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
                QUESTIONS
              </p>

              <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.04] mb-6">
                Clear answers.{' '}
                <span className="text-[#FF5500]">No tech jargon.</span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed mb-10">
                Everything you need to know about how we build, deliver, and price our custom automations for your business.
              </p>

              <div className="pt-6 border-t border-zinc-900">
                <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-2 font-bold">
                  STILL HAVE QUESTIONS?
                </p>
                <p className="font-sans text-xs text-zinc-400 mb-6 leading-relaxed">
                  Book a quick 15-minute chat with us to see if custom automation makes sense for your business.
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
