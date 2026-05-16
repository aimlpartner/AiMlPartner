import React, { useState } from 'react';
import { Mail, MapPin, Twitter, Linkedin, Github, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, 'leads'), {
          email,
          source: 'Footer Waitlist',
          createdAt: serverTimestamp()
        });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setEmail('');
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, 'leads');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-24 border-t border-slate-800">
      <div className="container-max grid md:grid-cols-3 gap-16 md:gap-8">
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-3 text-slate-50">
            <div className="h-16 w-auto flex items-center">
              <img 
                src="https://darkgray-finch-838850.hostingersite.com/wp-content/uploads/2026/04/WhatsApp_Image_2026-04-28_at_12.18.40_AM-removebg-preview.png" 
                alt="AIMLPartner Logo"
                className="h-full w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <p className="text-sm font-light leading-relaxed max-w-xs text-slate-600">
            Founder-led studio building revenue-focused AI agent systems for startups, SMBs, and enterprises.
          </p>
          
          <div className="flex flex-col gap-3 text-sm mt-4 font-mono">
            <a href="mailto:info@aimlpartner.com" className="flex items-center gap-3 hover:text-slate-50 transition-colors w-fit">
              <span className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center shrink-0">
                <Mail size={14} className="text-slate-400" />
              </span>
              info@aimlpartner.com
            </a>
            <div className="flex items-center gap-3">
              <MapPin size={14} />
              San Francisco, CA
            </div>
          </div>
        </motion.div>

        {/* Center Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 md:items-center text-left md:text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-700 text-xs font-mono text-slate-400 tracking-widest uppercase w-fit">
            Built by operators
          </div>
          
          <p className="text-sm font-light leading-relaxed max-w-xs text-slate-600">
            We don't just build software; we build systems that drive measurable efficiency and growth. Human oversight ensures systems scale reliably.
          </p>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 md:items-end text-left md:text-right"
        >
          <h4 className="text-slate-50 font-medium tracking-tight">Join Waitlist</h4>
          
          {submitted ? (
            <div className="text-sm text-slate-300 bg-slate-800 px-4 py-3 border border-slate-700 w-full max-w-xs md:ml-auto text-center font-light">
              Added to waitlist. We'll be in touch.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full max-w-xs md:ml-auto">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address" 
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 focus:outline-none focus:border-slate-500 text-sm text-slate-50 placeholder-slate-500 font-light transition-colors"
              />
              <button 
                type="submit"
                className="bg-gradient-to-br from-slate-50 to-sky-50/30 text-slate-900 px-4 py-3 hover:bg-slate-200 transition-colors flex items-center justify-center"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          )}
          
          <div className="flex items-center gap-6 mt-4">
            <a href="#" className="text-slate-600 hover:text-slate-50 transition-colors">
              <Twitter size={18} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-50 transition-colors">
              <Linkedin size={18} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-50 transition-colors">
              <Github size={18} />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="container-max mt-24 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600 uppercase tracking-widest"
      >
        <p>&copy; {new Date().getFullYear()} AIMLPartner.</p>
        <div className="flex items-center gap-8">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
        </div>
      </motion.div>
    </footer>
  );
}
