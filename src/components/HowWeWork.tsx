import React from 'react';
import { motion } from 'motion/react';
import { ClipboardList, Cpu, Layout, Link2 } from 'lucide-react';

export function HowWeWork() {
  const steps = [
    {
      title: "Diagnostics & ROI Modeling",
      lead: "Led by Robert & Deepak",
      icon: <ClipboardList size={20} className="text-slate-900" />,
      description: "We audit your CRM pipelines, team sizes, and manual entry points to compile a detailed ROI forecast and operational blueprint before writing any code."
    },
    {
      title: "Orchestration & Agent Engineering",
      lead: "Led by Manu",
      icon: <Cpu size={20} className="text-slate-900" />,
      description: "We design custom agent loops, configure vector stores for context grounding, and write custom tool-calling schemas tailored to your business rules."
    },
    {
      title: "Human-in-the-Loop Portals",
      lead: "Led by Garvit",
      icon: <Layout size={20} className="text-slate-900" />,
      description: "We build intuitive low-code control panels that let your operations team monitor agent tasks, edit drafted responses, and approve outbound actions safely."
    },
    {
      title: "CRM & Enterprise Syncing",
      lead: "Led by Anand",
      icon: <Link2 size={20} className="text-slate-900" />,
      description: "We bridge agent webhooks directly with Salesforce Agentforce, HubSpot, or SQL backends, deploying continuous observability logs and rate limits."
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
          className="max-w-3xl mx-auto text-center mb-16 text-slate-900"
        >
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-3">
            Our Delivery Framework
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
            How we ship agent systems that drive growth
          </h2>
          <p className="text-lg text-slate-600 font-light">
            A lean, founder-led process designed for velocity, security, and measurable business impact.
          </p>
        </motion.div>

        {/* Process Diagram Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-64 md:h-80 mb-20 border border-slate-200/60 rounded-2xl overflow-hidden relative group bg-slate-50"
        >
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity duration-700">
            {/* Background grid */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.3 }}></div>
            
            <div className="flex items-center gap-4 w-[200%] md:w-full px-8 opacity-90 transition-transform duration-1000 group-hover:scale-105">
              {/* Node 1 */}
              <div className="flex-1 h-32 bg-white border border-slate-200 rounded-xl flex items-center justify-center relative shadow-sm">
                <div className="w-16 h-16 border-2 border-slate-100 rounded-full border-t-sky-400 border-r-sky-300 animate-[spin_3s_linear_infinite]"></div>
                <div className="absolute w-8 h-px bg-slate-300 -right-4 top-1/2 -z-10"></div>
              </div>
              
              {/* Node 2 */}
              <div className="flex-[1.5] h-40 bg-sky-50 border border-sky-100 rounded-xl flex flex-col items-center justify-center relative shadow-sm p-4 gap-3">
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
              <div className="flex-1 h-32 bg-sky-500 border border-sky-600 rounded-xl flex items-center justify-center relative shadow-md overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-sky-600 to-sky-400"></div>
                 <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-[spin_2s_linear_infinite] relative z-10"></div>
                 <div className="absolute w-8 h-px bg-slate-300 -right-4 top-1/2 -z-10"></div>
              </div>
              
              {/* Node 4 */}
              <div className="flex-1 h-32 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-center relative overflow-hidden p-4 gap-2 shadow-lg">
                <div className="w-2/3 h-2 bg-slate-700 rounded-full"></div>
                <div className="w-full h-8 bg-slate-800 rounded-lg border border-slate-700 flex items-center px-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div className="w-1/2 h-1.5 bg-slate-600 ml-2 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 border border-slate-200 text-[10px] font-mono text-slate-900 uppercase tracking-widest shadow-sm rounded-lg">
            Execution_Flow // Continuous Integration
          </div>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start relative text-left bg-white p-6 border border-slate-200/80 rounded-2xl shadow-sm hover:border-slate-300 transition-colors"
            >
              <div className="w-10 h-10 mb-4 bg-sky-50 border border-sky-100 rounded-lg flex items-center justify-center text-sky-500">
                {step.icon}
              </div>
              
              <div className="text-[10px] font-mono text-slate-400 mb-1 uppercase tracking-widest">
                Phase 0{i + 1}
              </div>
              <h3 className="text-base font-semibold text-slate-900 tracking-tight">
                {step.title}
              </h3>
              <span className="text-[10px] font-mono text-sky-600 font-semibold block mb-3">
                {step.lead}
              </span>
              <p className="text-slate-600 font-light leading-relaxed text-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
