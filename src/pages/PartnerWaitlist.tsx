import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Check, ArrowRight, Loader2, Sparkles, Shield, Compass, Linkedin, Mail, User } from 'lucide-react';

const PARTNER_CATEGORIES = [
  'AI Consultants',
  'ML Engineers',
  'Agent Builders',
  'Automation Specialists',
  'Industry Experts',
  'AI Trainers',
  'Solution Providers'
];

export function PartnerWaitlist() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [specialty, setSpecialty] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim()) {
      setError('Please fill in your name and email address.');
      return;
    }

    setIsLoading(true);

    try {
      // Create lead entry in leads collection
      await addDoc(collection(db, 'leads'), {
        name: name.substring(0, 100),
        email: email.trim(),
        company: specialty || 'AI/ML Partner Applicant',
        source: 'Partner Waitlist',
        createdAt: serverTimestamp(),
        quizAnswers: {
          roles: specialty ? [specialty] : [],
          linkedin: linkedin.trim().substring(0, 200)
        }
      });

      setIsSuccess(true);
    } catch (err: any) {
      console.error('[Waitlist Registration Error]:', err);
      setError('Failed to submit application. Please check your network and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-surface-dark text-white pt-40 pb-24 font-sans flex flex-col items-center justify-center">
      {/* Immersive Space Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-20 transform scale-105"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-slate-950/95 to-black"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full filter blur-[150px] pointer-events-none"></div>
      </div>
      
      <div className="grain-overlay"></div>
      <div className="absolute inset-0 bg-architectural-grid opacity-10 pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Side: Header & Specialties */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tighter text-white leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]">
                Become a Verified <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-300">
                  AI/ML Partner
                </span>
              </h1>
              <p className="text-white/40 text-xs max-w-sm leading-normal">
                Join the exclusive network of verified AI practitioners.
              </p>
            </div>

            {/* Onboarding roles cloud (Minimal badges) */}
            <div className="space-y-3">
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/45 block">Currently Onboarding Specialists In:</span>
              <div className="flex flex-wrap gap-2 max-w-xl">
                {PARTNER_CATEGORIES.map((cat) => (
                  <span
                    key={cat}
                    className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-white/80 shadow-sm backdrop-blur-md transition-colors hover:border-accent/40"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Values / Features */}
            <div className="flex gap-8 text-xs font-mono tracking-wider text-white/50 pt-4 uppercase">
              <span className="flex items-center gap-2">
                <Shield size={12} className="text-accent" /> Build Trust
              </span>
              <span className="flex items-center gap-2">
                <Compass size={12} className="text-accent" /> Get Discovered
              </span>
            </div>
          </div>

          {/* Right Side: Interactive Form or Success Card */}
          <div className="lg:col-span-5 w-full max-w-md lg:ml-auto">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="waitlist-form-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <form onSubmit={handleRegister} className="space-y-4">
                    {error && (
                      <div className="bg-alert/15 border border-alert/20 text-alert-soft rounded-2xl p-4 text-xs font-semibold text-center">
                        {error}
                      </div>
                    )}

                    {/* Custom animated glowing wrapper */}
                    <div className="gemini-search-container p-[1.5px] rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.15)]">
                      <div className="bg-[#0c0d12]/95 rounded-3xl p-6 md:p-8 space-y-4 backdrop-blur-2xl">
                        
                        {/* Name input */}
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30 group-focus-within:text-accent transition-colors">
                            <User size={16} />
                          </div>
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-accent shadow-inner text-sm transition-colors"
                          />
                        </div>

                        {/* Email input */}
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30 group-focus-within:text-accent transition-colors">
                            <Mail size={16} />
                          </div>
                          <input
                            type="email"
                            required
                            placeholder="Work Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-accent shadow-inner text-sm transition-colors"
                          />
                        </div>

                        {/* LinkedIn input */}
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30 group-focus-within:text-accent transition-colors">
                            <Linkedin size={16} />
                          </div>
                          <input
                            type="url"
                            placeholder="LinkedIn Profile URL (Optional)"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            className="block w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-accent shadow-inner text-sm transition-colors"
                          />
                        </div>

                        {/* Speciality dropdown */}
                        <div className="relative group">
                          <select
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            className="block w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white/80 placeholder:text-white/30 focus:outline-none focus:border-accent shadow-inner text-sm transition-colors appearance-none cursor-pointer"
                          >
                            <option value="" className="bg-slate-950 text-white/60">Primary Specialty (Optional)</option>
                            {PARTNER_CATEGORIES.map(cat => (
                              <option key={cat} value={cat} className="bg-slate-950 text-white">{cat}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-white/30">
                            <i className="ph ph-caret-down text-xs"></i>
                          </div>
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-white text-ink font-bold py-3.5 rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2 group/btn cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_12px_rgba(255,255,255,0.1)] font-display text-sm"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 size={16} className="animate-spin text-ink" />
                              <span>Joining Waitlist...</span>
                            </>
                          ) : (
                            <>
                              <span>Join Partner Waitlist</span>
                              <ArrowRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="waitlist-success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full bg-[#0c0d12]/95 border border-white/10 shadow-glass rounded-3xl p-6 md:p-8 text-center space-y-6 backdrop-blur-2xl"
                >
                  <div className="w-14 h-14 bg-success/10 border border-success/20 rounded-full flex items-center justify-center mx-auto text-success shadow-lg shadow-success/5 mb-2 animate-bounce">
                    <Check size={24} strokeWidth={3} />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-success uppercase tracking-widest block font-bold mb-1">
                      REGISTRATION COMPLETED
                    </span>
                    <h2 className="text-2xl font-display font-extrabold tracking-tight text-white leading-tight">
                      You're on the Partner List!
                    </h2>
                    <p className="text-white/60 font-medium text-xs leading-relaxed text-left">
                      Thanks for applying, <strong>{name}</strong>. We've logged your specialty details. We will contact you at <strong>{email}</strong> once we begin onboarding our initial verified {specialty || 'specialist'} partners.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={() => navigate('/')}
                      className="w-full bg-white text-ink font-bold py-3 rounded-xl hover:bg-white/90 transition-all text-xs shadow-sm cursor-pointer"
                    >
                      Return Home
                    </button>
                    <button
                      onClick={() => navigate('/analyzer')}
                      className="w-full bg-white/5 border border-white/10 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-all text-xs cursor-pointer"
                    >
                      AI Diagnostic Console
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
