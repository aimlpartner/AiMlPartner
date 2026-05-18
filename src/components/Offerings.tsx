import React from 'react';
import { Network, LayoutDashboard, CloudCog, Cloud } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function Offerings() {
  const offerings = [
    {
      title: "AI Discovery Engine",
      icon: <Network size={20} className="text-slate-900" />,
      description: "The starting point. Tell us about your business and we'll identify your highest-value AI opportunities, estimate ROI, and create a clear implementation roadmap.",
      cta: "Explore Studio",
      link: "/agent-studio",
      imageId: "1498050108023-c5249f4df085" // Code/Computer
    },
    {
      title: "Expert Agent Network",
      icon: <CloudCog size={20} className="text-slate-900" />,
      description: "Get matched to specialized AI agents built for your exact use case — revenue, operations, customer support, hiring, and more. No generic outputs.",
      cta: "Browse Shop",
      link: "/agent-shop",
      imageId: "1542626991-cbc4e32524cc" // Business Dashboard
    },
    {
      title: "Validated Implementation",
      icon: <LayoutDashboard size={20} className="text-slate-900" />,
      description: "Every agent in our network is vetted, domain-trained, and ready to deploy. We support onboarding so your team hits the ground running.",
      cta: "View Pods",
      link: "/low-code-pods",
      imageId: "1531403009284-440f080d1e12" // Workflow/Planning
    },
    {
      title: "Agent Shop",
      icon: <Cloud size={20} className="text-slate-900" />,
      description: "Browse pre-built AI agents across revenue, operations, support, and hiring — ready to deploy for your business today.",
      cta: "View Services",
      link: "/agentforce-services",
      imageId: "1518770660439-4636190af475" // Server/Enterprise Tech
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
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-6">
            Core Offerings
          </h2>
          <p className="text-lg text-slate-600 font-light">
            We help startups and SMBs cut through the noise — identifying exactly where AI will move the needle for their business, then connecting them to purpose-built expert agents that get it done.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {offerings.map((offering, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white border border-slate-200 p-6 flex flex-col h-full hover:border-slate-300 transition-colors"
            >
              <div className="w-full h-48 mb-8 overflow-hidden border border-slate-200 relative bg-slate-50 group-hover:bg-sky-50/30 transition-colors duration-700">
                <div className="absolute top-4 left-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center border border-slate-200 shadow-sm">
                  {offering.icon}
                </div>
                
                {/* Visual UI replacing the image */}
                <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                  {i === 0 && (
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
                  {i === 1 && (
                    <div className="grid grid-cols-3 gap-2 w-3/4 p-4">
                      {[...Array(6)].map((_, j) => (
                        <div key={j} className={`h-12 border border-slate-200 shadow-sm rounded-sm transition-transform duration-500 ${j % 2 === 0 ? 'bg-sky-100 group-hover:-translate-y-1' : 'bg-white group-hover:translate-y-1'}`}></div>
                      ))}
                    </div>
                  )}
                  {i === 2 && (
                    <div className="flex w-3/4 h-3/4 bg-white border border-slate-200 shadow-sm overflow-hidden transition-all duration-700 group-hover:shadow-md">
                      <div className="w-1/4 h-full bg-slate-100 border-r border-slate-200 flex flex-col gap-2 p-2">
                        <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                        <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                        <div className="w-3/4 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                      <div className="w-3/4 h-full bg-white p-3 flex flex-col gap-3">
                        <div className="w-1/2 h-4 bg-sky-200 rounded-sm"></div>
                        <div className="w-full h-12 bg-sky-50 border border-sky-100 rounded-sm relative overflow-hidden transition-transform duration-700 group-hover:scale-95">
                          <div className="absolute top-0 left-0 h-1 bg-sky-400 w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {i === 3 && (
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
              
              <h3 className="text-xl font-medium text-slate-900 mb-4 tracking-tight">
                {offering.title}
              </h3>
              
              <p className="text-slate-600 font-light leading-relaxed mb-8 flex-grow">
                {offering.description}
              </p>
              
              <Link 
                to={offering.link} 
                className="inline-flex items-center text-sm font-mono text-slate-900 group-hover:text-slate-600 transition-colors mt-auto w-fit uppercase tracking-widest"
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
