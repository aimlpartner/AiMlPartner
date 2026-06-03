import React from 'react';
import { ArrowRight, Globe, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function LeadMagnets() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-sky-50/30 border-b border-slate-200 text-left">
      <div className="container-max">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16 text-slate-900"
        >
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-3">
            Audit Channels
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
            Get Your Custom Automation Blueprint
          </h2>
          <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
            Choose the method that fits your context and launch your operational report in under 30 seconds.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Option 1: URL Scanner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-10 border border-slate-200 flex flex-col items-start h-full rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
          >
            <div className="w-10 h-10 mb-6 bg-sky-50 border border-sky-100 rounded-lg flex items-center justify-center text-sky-500">
              <Globe size={20} className="text-sky-500" />
            </div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">Website Scan</div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
              Analyze Public Domain
            </h3>
            <p className="text-slate-600 font-light mb-8 text-sm leading-relaxed flex-grow">
              Provide your business website address. Our system crawls public facing details, strips style boilerplate, and builds a CRM synchronization diagnostic report.
            </p>
            <Link 
              to="/analyzer"
              className="inline-flex items-center justify-center gap-2 bg-slate-950 text-white rounded-full px-6 py-3 font-semibold text-sm hover:bg-slate-800 transition-colors w-full sm:w-auto"
            >
              <span>Scan Your Domain</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Option 2: Bottleneck Audit */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-10 border border-slate-200 flex flex-col items-start h-full rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
          >
            <div className="w-10 h-10 mb-6 bg-sky-50 border border-sky-100 rounded-lg flex items-center justify-center text-sky-500">
              <FileText size={20} className="text-sky-500" />
            </div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">Text Audit</div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
              Outline A Bottleneck
            </h3>
            <p className="text-slate-600 font-light mb-8 text-sm leading-relaxed flex-grow">
              Describe your current software systems and operational delays. Get a tailored prompt loop roadmap, low-disruption integration checklist, and tool stack recommendation.
            </p>
            <Link 
              to="/analyzer"
              className="inline-flex items-center justify-center gap-2 bg-slate-950 text-white rounded-full px-6 py-3 font-semibold text-sm hover:bg-slate-800 transition-colors w-full sm:w-auto"
            >
              <span>Audit Your Workflow</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
