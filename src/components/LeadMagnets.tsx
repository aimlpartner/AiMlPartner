import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export function LeadMagnets() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, 'leads'), {
          name,
          email,
          company,
          source: 'Strategy Call Form',
          createdAt: serverTimestamp()
        });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setEmail('');
        setName('');
        setCompany('');
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, 'leads');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-sky-50/30 border-b border-slate-200">
      <div className="container-max">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-6">
            Turn curiosity into your revenue edge
          </h2>
          <p className="text-lg text-slate-600 font-light">
            Discover how agentic systems can accelerate your GTM and cut operational bloat.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Quiz CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-10 border border-slate-200 flex flex-col items-start h-full"
          >
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-6">Assessment</div>
            <h3 className="text-2xl font-medium text-slate-900 mb-4 tracking-tight">
              Agent Readiness Quiz
            </h3>
            <p className="text-slate-600 font-light mb-8 leading-relaxed flex-grow">
              Take our 3-minute assessment to evaluate your current stack, team size, and goals. Get a personalized Readiness Score PDF instantly.
            </p>
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('open-quiz'))}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400 to-sky-600 text-white rounded-full shadow-md shadow-sky-500/20  px-6 py-3 font-medium hover:from-sky-500 hover:to-sky-700 transition-colors w-full sm:w-auto"
            >
              Assess Your Agent Readiness
              <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* Consultation Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-10 border border-slate-200 flex flex-col h-full"
          >
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-6">Consultation</div>
            <h3 className="text-2xl font-medium text-slate-900 mb-2 tracking-tight">
              Book a Free Strategy Call
            </h3>
            <p className="text-slate-600 font-light mb-8 text-sm leading-relaxed">
              Speak directly with our architects to map out how agentic systems can drive real ROI for your specific use case.
            </p>
            
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center animate-in fade-in duration-300">
                <h4 className="text-lg font-medium text-slate-900 mb-2">Request Received!</h4>
                <p className="text-slate-600 font-light text-sm">We'll be in touch shortly to schedule your call.</p>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit} 
                className="flex flex-col gap-4 flex-grow"
                name="consultation-lead"
                method="POST"
                data-netlify="true"
              >
                <input type="hidden" name="form-name" value="consultation-lead" />
                
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name" 
                    required
                    className="w-full px-4 py-2.5 bg-gradient-to-br from-slate-50 to-sky-50/30 border border-slate-200 focus:outline-none focus:border-slate-400 transition-colors text-sm font-light"
                  />
                  <input 
                    type="text" 
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company" 
                    required
                    className="w-full px-4 py-2.5 bg-gradient-to-br from-slate-50 to-sky-50/30 border border-slate-200 focus:outline-none focus:border-slate-400 transition-colors text-sm font-light"
                  />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Work Email" 
                  required
                  className="w-full px-4 py-2.5 bg-gradient-to-br from-slate-50 to-sky-50/30 border border-slate-200 focus:outline-none focus:border-slate-400 transition-colors text-sm font-light"
                />
                <button 
                  type="submit"
                  className="mt-auto inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-900 border border-slate-200 px-6 py-3 font-medium hover:bg-slate-200 transition-colors w-full"
                >
                  Request Consultation
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
