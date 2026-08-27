import React from 'react';
import { Network, LayoutDashboard, CloudCog, Cloud } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function Offerings() {
  const offerings = [
    {
      title: "AI Strategy & Operational Audit",
      icon: <Network size={20} className="text-slate-900" />,
      description: "Map your bottlenecks directly. Work with our business architects to analyze your team structure, SaaS overhead, and pipeline friction. Get a detailed implementation roadmap with realistic ROI projections.",
      cta: "Explore Use Cases",
      link: "/use-cases",
      i: 0
    },
    {
      title: "Custom Agent System Engineering",
      icon: <CloudCog size={20} className="text-slate-900" />,
      description: "Replace repetitive manual work. We design and program custom AI agents built to handle specific, high-fidelity business processes (like automated SDR outreach or live lead triaging) without human fatigue.",
      cta: "Browse Vetted Solutions",
      link: "/agent-shop",
      i: 1
    },
    {
      title: "Low-Code Operational Control Panels",
      icon: <LayoutDashboard size={20} className="text-slate-900" />,
      description: "Keep humans in the loop. We build custom, clean dashboards that let your administrative staff review agent outputs, approve automatically compiled reports, and monitor pipeline performance safely.",
      cta: "View Operational Portals",
      link: "/low-code-pods",
      i: 2
    }
  ];

  return (
    <section id="solutions" className="py-24 bg-gradient-to-br from-slate-50 to-sky-50/30 border-b border-slate-200">
      <div className="container-max">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16 text-slate-900"
        >
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-3">
            Core Service Offerings
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
            How We Partner With Your Business
          </h2>
          <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
            We build custom, production-ready AI systems directly integrated into your operational stack. No hype, just senior engineering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {offerings.map((offering, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white border border-slate-200 p-8 flex flex-col h-full hover:border-slate-300 hover:shadow-xl transition-all duration-300 rounded-2xl text-left"
            >
              <div className="w-full h-48 mb-8 overflow-hidden border border-slate-200/60 rounded-xl relative bg-slate-50 group-hover:bg-sky-50/30 transition-colors duration-700">
                <div className="absolute top-4 left-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center border border-slate-200 shadow-sm rounded-lg">
                  {offering.icon}
                </div>
                
                {/* Visual UI replacing the image */}
                <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                  {offering.i === 0 && (
                    <div className="relative w-full h-full">
                      <div className="absolute top-1/4 left-1/4 w-16 h-8 bg-sky-100 border border-sky-300 rounded shadow-sm transition-transform duration-500 group-hover:-translate-y-1"></div>
                      <div className="absolute top-1/2 left-1/2 w-24 h-10 bg-sky-400 border border-sky-500 rounded shadow-sm -mt-5 -ml-12 transition-transform duration-500 group-hover:scale-110"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-16 h-8 bg-slate-200 border border-slate-300 rounded shadow-sm transition-transform duration-500 group-hover:-translate-y-1"></div>
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="32%" y1="30%" x2="48%" y2="45%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="52%" y1="55%" x2="68%" y2="70%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 2" />
                      </svg>
                    </div>
                  )}
                  {offering.i === 1 && (
                    <div className="grid grid-cols-3 gap-2 w-3/4 p-4">
                      {[...Array(6)].map((_, j) => (
                        <div key={j} className={`h-12 border border-slate-200 shadow-sm rounded-lg transition-transform duration-500 ${j % 2 === 0 ? 'bg-sky-100 group-hover:-translate-y-1' : 'bg-white group-hover:translate-y-1'}`}></div>
                      ))}
                    </div>
                  )}
                  {offering.i === 2 && (
                    <div className="flex w-3/4 h-3/4 bg-white border border-slate-200 shadow-sm overflow-hidden rounded-lg transition-all duration-700 group-hover:shadow-md">
                      <div className="w-1/4 h-full bg-slate-100 border-r border-slate-200 flex flex-col gap-2 p-2">
                        <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                        <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                        <div className="w-3/4 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                      <div className="w-3/4 h-full bg-white p-3 flex flex-col gap-3">
                        <div className="w-1/2 h-4 bg-sky-200 rounded-sm"></div>
                        <div className="w-full h-12 bg-sky-50 border border-sky-100 rounded-sm relative overflow-hidden transition-transform duration-700 group-hover:scale-95">
                          <div className="absolute top-0 left-0 h-full bg-sky-400 opacity-20 w-3/4 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {offering.i === 3 && (
                    <div className="flex flex-col gap-3 items-center justify-center w-full">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="w-1/2 h-6 bg-white border border-slate-300 rounded shadow-sm flex items-center px-4 transition-transform duration-500" style={{ transform: `scale(${1 - j * 0.1})` }}>
                           <div className="w-3 h-1 bg-sky-400 rounded-full mr-2"></div>
                           <div className="w-12 h-1 bg-slate-200 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-4 tracking-tight">
                {offering.title}
              </h3>
              
              <p className="text-slate-600 font-light leading-relaxed mb-8 flex-grow text-sm">
                {offering.description}
              </p>
              
              <Link 
                to={offering.link} 
                className="inline-flex items-center text-xs font-mono text-slate-900 group-hover:text-slate-600 transition-colors mt-auto w-fit uppercase tracking-widest font-semibold"
              >
                {offering.cta}
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
