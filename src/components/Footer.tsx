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
    <footer className="relative bg-[#030014] text-white/60 pt-24 pb-12 border-t border-white/10 overflow-hidden">
      {/* Cosmic Nebula ambient background glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-12 left-12 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container-max grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 relative z-10">
        {/* Left Column (Brand info) - spans 4 cols */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-4 flex flex-col gap-6 text-left"
        >
          <Link to="/" className="flex items-center group cursor-pointer" aria-label="AIMLPartner Home">
            <img
              src="/aimlpartner_logo.png"
              alt="AIMLPartner Logo"
              className="h-12 w-auto object-contain brightness-0 invert transition-all duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </Link>

          <p className="text-sm font-medium leading-relaxed max-w-sm text-white/50">
            We build automated profit engines. Stop bleeding cash on tasks a robot can do, and turn your operations into an unfair advantage.
          </p>

          <div className="flex flex-col gap-4 text-xs mt-2 font-mono text-white/40">
            <a
              href="mailto:info@aimlpartner.com"
              className="flex items-center gap-3 hover:text-white transition-colors w-fit group"
            >
              <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-blue-400/40 group-hover:bg-blue-400/10 transition-colors">
                <Mail size={12} className="text-white/60 group-hover:text-blue-400 transition-colors" />
              </span>
              info@aimlpartner.com
            </a>
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin size={12} className="text-white/60" />
              </span>
              <div className="flex flex-col gap-1 leading-normal pt-1.5">
                <div>San Francisco, CA</div>
                <div>New York</div>
                <div>Boulder, Colorado</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Center Column (Navigation Links) - spans 4 cols */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-4 flex flex-col gap-4 text-left md:items-center"
        >
          <div className="flex flex-col gap-3">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 mb-2 font-bold">Navigation</h4>
            <Link to="/agent-studio" className="text-sm font-semibold text-white/70 hover:text-white transition-colors w-fit">Agent Studio</Link>
            <Link to="/pricing" className="text-sm font-semibold text-white/70 hover:text-white transition-colors w-fit">Pricing</Link>
            <Link to="/low-code-pods" className="text-sm font-semibold text-white/70 hover:text-white transition-colors w-fit">Services</Link>
            <Link to="/team" className="text-sm font-semibold text-white/70 hover:text-white transition-colors w-fit">Team</Link>
            <Link to="/partner-waitlist" className="text-sm font-semibold text-white/70 hover:text-white transition-colors w-fit">Partners</Link>
          </div>
        </motion.div>

        {/* Right Column (Social & Philosophy) - spans 4 cols */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-4 flex flex-col gap-6 text-left md:items-end md:text-right"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 text-[9px] font-mono font-bold text-white/70 tracking-widest uppercase w-fit rounded-md">
            <ShieldCheck size={12} className="text-emerald-400" /> Built by operators
          </div>

          <p className="text-xs leading-relaxed text-white/40 font-medium max-w-xs md:max-w-sm">
            We don't just build software; we build systems that drive measurable efficiency and growth.
            Continuous validation ensures our setups scale reliably.
          </p>

          <div className="flex items-center gap-3 mt-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all shadow-sm"
            >
              <Twitter size={16} />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all shadow-sm"
            >
              <Linkedin size={16} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all shadow-sm"
            >
              <Github size={16} />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* MASSIVE BRAND NAME (Trending Footer Design) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full mt-24 relative z-10 flex flex-col items-center"
      >
        <div className="w-full overflow-hidden flex justify-center items-center border-t border-white/10 pt-12 pb-4">
          <span className="font-display font-black text-[13vw] sm:text-[14vw] leading-none tracking-tighter text-white opacity-90 select-none drop-shadow-2xl">
            AIMLPARTNER
          </span>
        </div>
        
        <div className="container-max w-full flex flex-col md:flex-row items-center justify-between gap-4 mt-6 text-[10px] font-mono text-white/30 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} AIMLPartner. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
