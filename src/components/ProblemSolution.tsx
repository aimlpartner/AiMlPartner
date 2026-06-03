import React from 'react';
import { motion } from 'motion/react';

export function ProblemSolution() {
  const problems = [
    {
      pain: "Manual lead research & profile copy-pasting",
      painDesc: "SDRs waste 12+ hours a week copy-pasting LinkedIn profiles, corporate news, and drafting personalized icebreakers.",
      solution: "Autonomous Context Enrichment",
      solutionDesc: "AI agents auto-enrich accounts upon lead creation, drafting contextual sequence messages directly within Salesforce/Outreach."
    },
    {
      pain: "Slow lead routing & manual ticket triage",
      painDesc: "Inbound requests sit in shared inboxes for hours, leading to delayed response times and lost sales pipeline opportunities.",
      solution: "NLP-Driven Triaging & Live Routing",
      solutionDesc: "Our support agents parse incoming queries in seconds, categorize intent, and route high-value accounts straight to Slack or WhatsApp."
    },
    {
      pain: "Siloed CRMs & manual database syncs",
      painDesc: "Reps manually update client records across CRM systems and internal SQL databases, leading to double reach-outs and stale data.",
      solution: "Real-Time Agentic Synchronization",
      solutionDesc: "Vetted database listeners update records automatically, cleaning data fields and maintaining compliance logs without human overhead."
    }
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Text & Cards */}
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16 text-left"
            >
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-3">
                Core Operations Bottlenecks
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-6 leading-tight">
                Where manual workflows are holding you back
              </h2>
              <p className="text-lg text-slate-600 font-light max-w-md">
                We replace brittle, human-dependent processes with resilient agentic systems that run in the background.
              </p>
            </motion.div>

            <div className="flex flex-col gap-6">
              {problems.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row sm:items-start bg-gradient-to-br from-slate-50 to-sky-50/30 p-6 border border-slate-200 gap-6 text-left"
                >
                  <div className="flex-1 space-y-1">
                    <span className="text-[9px] font-mono text-rose-500 uppercase tracking-widest block font-semibold">The Friction</span>
                    <h3 className="text-base font-semibold text-slate-900 leading-tight">
                      {item.pain}
                    </h3>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      {item.painDesc}
                    </p>
                  </div>
                  
                  <div className="hidden sm:block w-px h-20 bg-slate-200 self-center" />
                  <div className="sm:hidden w-full h-px bg-slate-200" />
                  
                  <div className="flex-1 space-y-1">
                    <span className="text-[9px] font-mono text-emerald-600 uppercase tracking-widest block font-semibold">The Architecture</span>
                    <h4 className="text-base font-semibold text-slate-900 leading-tight">
                      {item.solution}
                    </h4>
                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      {item.solutionDesc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Nature Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)] min-h-[600px] w-full border border-slate-200 overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 bg-slate-950/20 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=1600" 
              alt="Operational Analytics"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Technical overlay elements */}
            <div className="absolute top-6 left-6 z-20 font-mono text-[10px] text-white tracking-widest uppercase bg-slate-950/60 px-3 py-1 border border-white/10 rounded">
              Operational_Observation // 01
            </div>
            <div className="absolute bottom-6 right-6 z-20 flex gap-1">
              <div className="w-1.5 h-4 bg-sky-400" />
              <div className="w-1.5 h-6 bg-sky-300" />
              <div className="w-1.5 h-3 bg-sky-200" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
