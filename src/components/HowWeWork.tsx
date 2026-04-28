import React from 'react';
import { motion } from 'motion/react';

export function HowWeWork() {
  const steps = [
    {
      title: "Assess",
      description: "Audit your current stack, goals, and GTM model."
    },
    {
      title: "Build",
      description: "Design and develop agent-driven workflows in n8n, low-code UI, and Salesforce configurations."
    },
    {
      title: "Launch + Distribute",
      description: "Go live with controlled rollouts and built-in distribution channels (email, chat, portals)."
    },
    {
      title: "Optimize",
      description: "Iterate using usage data, feedback, and A/B-tested agent logic."
    }
  ];

  return (
    <section id="process" className="py-24 bg-gradient-to-br from-slate-50 to-sky-50/30 border-b border-slate-200">
      <div className="container-max">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-6">
            How we ship agent systems that drive growth
          </h2>
          <p className="text-lg text-slate-600 font-light">
            A lean, founder-led process designed for velocity and measurable impact.
          </p>
        </motion.div>

        {/* Process Diagram Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-64 md:h-80 mb-20 border border-slate-200 overflow-hidden relative group bg-slate-50"
        >
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity duration-700">
            {/* Background grid */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.3 }}></div>
            
            <div className="flex items-center gap-4 w-[200%] md:w-full px-8 opacity-90 transition-transform duration-1000 group-hover:scale-105">
              {/* Node 1 */}
              <div className="flex-1 h-32 bg-white border border-slate-200 rounded flex items-center justify-center relative shadow-sm">
                <div className="w-16 h-16 border-2 border-slate-100 rounded-full border-t-sky-400 border-r-sky-300 animate-[spin_3s_linear_infinite]"></div>
                <div className="absolute w-8 h-px bg-slate-300 -right-4 top-1/2 -z-10"></div>
              </div>
              
              {/* Node 2 */}
              <div className="flex-[1.5] h-40 bg-sky-50 border border-sky-100 rounded flex flex-col items-center justify-center relative shadow-sm p-4 gap-3">
                 <div className="w-full flex justify-between gap-2">
                   <div className="h-2 flex-1 bg-sky-200 rounded-full animate-pulse"></div>
                   <div className="h-2 flex-1 bg-sky-300 rounded-full animate-pulse delay-75"></div>
                   <div className="h-2 w-4 bg-sky-400 rounded-full"></div>
                 </div>
                 <div className="w-full h-12 bg-white border border-sky-100 rounded relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-sky-400 opacity-20 w-3/4 animate-pulse"></div>
                 </div>
                 <div className="absolute w-8 h-px bg-slate-300 -right-4 top-1/2 -z-10"></div>
              </div>
              
              {/* Node 3 */}
              <div className="flex-1 h-32 bg-sky-500 border border-sky-600 rounded flex items-center justify-center relative shadow-md overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-sky-600 to-sky-400"></div>
                 <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-[spin_2s_linear_infinite] relative z-10"></div>
                 <div className="absolute w-8 h-px bg-slate-300 -right-4 top-1/2 -z-10"></div>
              </div>
              
              {/* Node 4 */}
              <div className="flex-1 h-32 bg-slate-900 border border-slate-800 rounded flex flex-col justify-center relative overflow-hidden p-4 gap-2 shadow-lg">
                <div className="w-2/3 h-2 bg-slate-700 rounded-full"></div>
                <div className="w-full h-8 bg-slate-800 rounded border border-slate-700 flex items-center px-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div className="w-1/2 h-1.5 bg-slate-600 ml-2 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 border border-slate-200 text-[10px] font-mono text-slate-900 uppercase tracking-widest shadow-sm">
            Execution_Flow // Autonomous
          </div>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start relative"
            >
              <div className="text-xs font-mono text-slate-400 mb-4 uppercase tracking-widest">
                Phase 0{i + 1}
              </div>
              <div className="w-full h-px bg-slate-200 mb-6" />
              
              <h3 className="text-lg font-medium text-slate-900 mb-3 tracking-tight">
                {step.title}
              </h3>
              
              <p className="text-slate-600 font-light leading-relaxed text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
