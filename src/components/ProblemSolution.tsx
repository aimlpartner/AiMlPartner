import React from 'react';
import { motion } from 'motion/react';

export function ProblemSolution() {
  const problems = [
    {
      pain: "Manual workflows kill velocity",
      solution: "Agent-driven workflows in n8n"
    },
    {
      pain: "Human-driven ops don't scale",
      solution: "Low-code portals that surface the right data"
    },
    {
      pain: "Disconnected tools create blind spots",
      solution: "Salesforce Agentforce architectures"
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
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                Where manual workflows are holding you back
              </h2>
              <p className="text-lg text-slate-600 font-light max-w-md">
                We replace brittle, human-dependent processes with resilient agentic systems that scale naturally.
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
                  className="flex flex-col sm:flex-row sm:items-center bg-gradient-to-br from-slate-50 to-sky-50/30 p-6 border border-slate-200 gap-6"
                >
                  <div className="flex-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">The Pain</span>
                    <h3 className="text-base font-medium text-slate-900 leading-tight">
                      {item.pain}
                    </h3>
                  </div>
                  
                  <div className="hidden sm:block w-px h-12 bg-slate-200" />
                  <div className="sm:hidden w-full h-px bg-slate-200" />
                  
                  <div className="flex-1">
                    <span className="text-[10px] font-mono text-slate-900 uppercase tracking-widest block mb-2">The Solution</span>
                    <p className="text-slate-600 text-sm font-medium leading-tight">
                      {item.solution}
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
            className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)] min-h-[600px] w-full border border-slate-200 overflow-hidden"
          >
            <div className="absolute inset-0 bg-slate-900/10 z-10 mix-blend-multiply" />
            <img 
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200&h=1600" 
              alt="System Architecture Vertical"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Technical overlay elements */}
            <div className="absolute top-6 left-6 z-20 font-mono text-[10px] text-white tracking-widest uppercase mix-blend-difference">
              System_Architecture // 01
            </div>
            <div className="absolute bottom-6 right-6 z-20 flex gap-1">
              <div className="w-1 h-4 bg-white/80" />
              <div className="w-1 h-6 bg-white/80" />
              <div className="w-1 h-3 bg-white/80" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
