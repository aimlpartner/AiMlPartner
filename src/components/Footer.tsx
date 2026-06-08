import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Twitter, Linkedin, Github, ArrowRight, ShieldCheck } from 'lucide-react';
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
    <footer className="relative bg-surface-dark text-white/60 py-24 border-t border-white/10 overflow-hidden">
      {/* Cosmic Nebula ambient background glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-12 left-12 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container-max grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 relative z-10">
        {/* Left Column (Brand info) - spans 5 cols */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5 flex flex-col gap-6 text-left"
        >
          <Link to="/" className="flex items-center group cursor-pointer" aria-label="AIMLPartner Home">
            <img
              src="https://darkgray-finch-838850.hostingersite.com/wp-content/uploads/2026/04/WhatsApp_Image_2026-04-28_at_12.18.40_AM-removebg-preview.png"
              alt="AIMLPartner Logo"
              className="h-11 md:h-13 w-auto object-contain brightness-0 invert transition-all duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </Link>

          <p className="text-sm font-medium leading-relaxed max-w-sm text-white/50">
            AI Workforce Partner for Growing Businesses. We help small and mid-sized businesses implement practical AI, automation, and digital workforce solutions that save time, improve customer experience, and help teams scale without adding headcount.
          </p>

          <div className="flex flex-col gap-3 text-xs mt-4 font-mono text-white/40">
            <a
              href="mailto:info@aimlpartner.com"
              className="flex items-center gap-3 hover:text-white transition-colors w-fit group"
            >
              <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-accent/40 group-hover:bg-accent/10 transition-colors">
                <Mail size={12} className="text-white/60" />
              </span>
              info@aimlpartner.com
            </a>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                <MapPin size={12} className="text-white/60" />
              </span>
              San Francisco, CA
            </div>
          </div>
        </motion.div>

        {/* Center Column (Philosophy & Badge) - spans 3 cols */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-3 flex flex-col gap-6 text-left border-l border-white/5 md:pl-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 text-[9px] font-mono font-bold text-white/70 tracking-widest uppercase w-fit rounded-md">
            <ShieldCheck size={12} className="text-success" /> Built by operators
          </div>

          <p className="text-xs leading-relaxed text-white/40 font-medium">
            We don't just build software; we build systems that drive measurable efficiency and growth.
            Continuous validation ensures our setups scale reliably.
          </p>
        </motion.div>

        {/* Right Column (Waitlist Form) - spans 4 cols */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-4 flex flex-col gap-6 text-left"
        >
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-accent font-bold">
              Stay Informed
            </span>
            <h4 className="text-white font-display text-lg font-bold tracking-tight">Join Waitlist</h4>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
            {submitted ? (
              <div className="text-xs text-success bg-success/10 border border-success/20 py-3 px-4 rounded-xl text-center font-semibold">
                Success! We'll keep you updated.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-accent focus:bg-black/60 text-xs text-white placeholder-white/30 transition-all outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white text-ink hover:bg-accent hover:text-white px-4 py-3 rounded-xl transition-colors duration-300 flex items-center justify-center shrink-0 shadow-sm cursor-pointer disabled:opacity-50"
                  aria-label="Submit Waitlist Email"
                >
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all shadow-sm"
            >
              <Twitter size={14} />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all shadow-sm"
            >
              <Linkedin size={14} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all shadow-sm"
            >
              <Github size={14} />
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
        className="container-max mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/30 uppercase tracking-widest text-left"
      >
        <p>&copy; {new Date().getFullYear()} AIMLPartner. All rights reserved.</p>
        <div className="flex items-center gap-8">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
