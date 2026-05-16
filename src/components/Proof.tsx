import React from 'react';
import { motion } from 'motion/react';

export function Proof() {
  const caseStudies = [
    {
      headline: "3x qualified leads in 8 weeks",
      description: "Automated lead enrichment and personalized outreach via intelligent agents.",
      metric: "300% pipeline growth",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=300"
    },
    {
      headline: "40% lower manual effort",
      description: "Custom low-code portal for internal approvals and data surfacing.",
      metric: "30% faster ops",
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=400&h=300"
    },
    {
      headline: "75% less manual work",
      description: "Salesforce Agentforce blueprint implemented for enterprise compliance.",
      metric: "Enterprise-grade scale",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400&h=300"
    }
  ];

  return (
    <section id="proof" className="py-24 bg-white border-b border-slate-200">
      <div className="container-max">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-6">
            Real results, real systems
          </h2>
          <p className="text-lg text-slate-600 font-light">
            We don't sell hype. We build systems that deliver measurable efficiency and growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {caseStudies.map((study, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col"
            >
              <div className="h-48 overflow-hidden bg-slate-50 mb-6 border border-slate-200 relative group-hover:bg-sky-50/30 transition-colors duration-700">
                <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-700">
                  {i === 0 && (
                     <div className="flex items-end gap-3 h-24 w-3/4 pb-4 border-b border-slate-200 justify-between relative">
                       <div className="w-full h-px border-t border-dashed border-slate-200 absolute bottom-12 left-0"></div>
                       <div className="w-full h-px border-t border-dashed border-slate-200 absolute bottom-20 left-0"></div>
                       <div className="w-1/4 h-1/4 bg-slate-200 group-hover:bg-slate-300 transition-colors relative z-10 rounded-t-sm"></div>
                       <div className="w-1/4 h-2/4 bg-sky-200 group-hover:bg-sky-300 transition-colors relative z-10 rounded-t-sm"></div>
                       <div className="w-1/4 h-full bg-sky-400 group-hover:bg-sky-500 transition-colors relative z-10 rounded-t-sm">
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-sky-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">300%</div>
                       </div>
                     </div>
                  )}
                  {i === 1 && (
                     <div className="flex flex-col gap-3 w-3/4">
                       <div className="flex items-center gap-3 w-full bg-white p-3 border border-slate-200 shadow-sm transition-transform duration-500 group-hover:translate-x-4">
                         <div className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center shrink-0">
                           <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                         </div>
                         <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
                       </div>
                       <div className="flex items-center gap-3 w-full bg-white p-3 border border-slate-200 shadow-sm transition-transform duration-500 delay-75 group-hover:translate-x-2">
                         <div className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center shrink-0">
                           <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                         </div>
                         <div className="h-2 w-3/4 bg-slate-200 rounded"></div>
                       </div>
                       <div className="flex items-center gap-3 w-full bg-white p-3 border border-slate-200 shadow-sm transition-transform duration-500 delay-150 group-hover:translate-x-6">
                         <div className="w-4 h-4 rounded-full bg-sky-100 border border-sky-300 shrink-0 relative group-hover:animate-pulse">
                            <svg className="w-2.5 h-2.5 text-sky-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                         </div>
                         <div className="h-2 w-1/3 bg-slate-200 rounded"></div>
                       </div>
                     </div>
                  )}
                  {i === 2 && (
                     <div className="relative w-3/4 h-2/3 flex items-center justify-center pt-8">
                       <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M50% 20% L25% 70% M50% 20% L50% 70% M50% 20% L75% 70%" stroke="#e2e8f0" strokeWidth="2" fill="none" strokeDasharray="4 2" />
                          <path d="M50% 20% L25% 70% M50% 20% L50% 70% M50% 20% L75% 70%" stroke="#bae6fd" strokeWidth="2" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                       </svg>
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-800 rounded flex items-center justify-center shadow-md group-hover:bg-sky-600 transition-colors duration-500 z-10">
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                       </div>
                       
                       <div className="absolute bottom-4 left-1/4 -translate-x-1/2 w-10 h-10 bg-white border border-slate-200 rounded flex flex-col items-center justify-center gap-1 shadow-sm group-hover:border-sky-300 transition-all duration-500 group-hover:-translate-y-2 z-10">
                          <div className="w-4 h-1 bg-slate-200 rounded"></div>
                          <div className="w-2 h-1 bg-emerald-400 rounded"></div>
                       </div>
                       
                       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-white border border-slate-200 rounded flex flex-col items-center justify-center gap-1 shadow-sm group-hover:border-sky-300 transition-all duration-500 delay-75 group-hover:-translate-y-2 z-10">
                          <div className="w-4 h-1 bg-slate-200 rounded"></div>
                          <div className="w-2 h-1 bg-emerald-400 rounded"></div>
                       </div>
                       
                       <div className="absolute bottom-4 left-3/4 -translate-x-1/2 w-10 h-10 bg-white border border-slate-200 rounded flex flex-col items-center justify-center gap-1 shadow-sm group-hover:border-sky-300 transition-all duration-500 delay-150 group-hover:-translate-y-2 z-10">
                          <div className="w-4 h-1 bg-slate-200 rounded"></div>
                          <div className="w-2 h-1 bg-emerald-400 rounded"></div>
                       </div>
                     </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <div className="font-mono text-xs text-slate-900 mb-3 uppercase tracking-widest">
                  {study.metric}
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-3 leading-tight tracking-tight">
                  {study.headline}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  {study.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
