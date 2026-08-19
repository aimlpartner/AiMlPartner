import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Check, ArrowRight, Loader2, Shield, Compass, Linkedin, Mail, User } from 'lucide-react';

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
      setError('Something went wrong. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white pt-40 pb-24 font-sans flex flex-col items-center justify-center selection:bg-[#FF5500] selection:text-black">
      {/* Ambient Cosmic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#FF5500]/10 rounded-full filter blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Side: Header & Specialties */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#FF5500] font-mono font-bold block">
                // PARTNER ECOSYSTEM
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Become a Verified <br className="hidden sm:block" />
                <span className="text-[#FF5500]">AI/ML Partner.</span>
              </h1>
              <p className="text-zinc-400 text-base max-w-lg leading-relaxed">
                Join our private network of verified AI consultants, automators, and machine learning engineers deploying sovereign AI pods for SMB and enterprise clients.
              </p>
            </div>

            {/* Specialties Badges */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block font-bold">
                Specializations We Onboard:
              </span>
              <div className="flex flex-wrap gap-2 max-w-xl">
                {PARTNER_CATEGORIES.map((cat) => (
                  <span
                    key={cat}
                    className="px-3.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-semibold text-zinc-300"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust Points */}
            <div className="flex gap-8 text-xs font-mono tracking-wider text-zinc-400 pt-4 uppercase">
              <span className="flex items-center gap-2">
                <Shield size={14} className="text-[#FF5500]" /> Real Client Deal Flow
              </span>
              <span className="flex items-center gap-2">
                <Compass size={14} className="text-[#FF5500]" /> Verified Pod Placement
              </span>
            </div>
          </div>

          {/* Right Side: Form / Success Card */}
          <div className="lg:col-span-5 w-full max-w-md lg:ml-auto">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="waitlist-form-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <form onSubmit={handleRegister} className="space-y-4">
                    {error && (
                      <div className="bg-red-950/60 border border-red-800/80 text-red-200 rounded-xl p-4 text-xs font-semibold text-center">
                        {error}
                      </div>
                    )}

                    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-4 shadow-2xl">
                      <div className="text-xs font-mono text-[#FF5500] uppercase tracking-widest font-bold mb-1">
                        // JOIN THE ROSTER
                      </div>

                      {/* Name input */}
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#FF5500] transition-colors">
                          <User size={16} />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full pl-11 pr-4 py-3.5 bg-black border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5500] text-sm transition-colors"
                        />
                      </div>

                      {/* Email input */}
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#FF5500] transition-colors">
                          <Mail size={16} />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="Work Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full pl-11 pr-4 py-3.5 bg-black border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5500] text-sm transition-colors"
                        />
                      </div>

                      {/* LinkedIn input */}
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#FF5500] transition-colors">
                          <Linkedin size={16} />
                        </div>
                        <input
                          type="url"
                          placeholder="LinkedIn Profile URL (Optional)"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          className="block w-full pl-11 pr-4 py-3.5 bg-black border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5500] text-sm transition-colors"
                        />
                      </div>

                      {/* Specialty dropdown */}
                      <div className="relative group">
                        <select
                          value={specialty}
                          onChange={(e) => setSpecialty(e.target.value)}
                          className="block w-full px-4 py-3.5 bg-black border border-zinc-800 rounded-xl text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5500] text-sm transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-black text-zinc-500">Primary Specialty (Optional)</option>
                          {PARTNER_CATEGORIES.map(cat => (
                            <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                          ))}
                        </select>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-extrabold py-4 rounded-xl shadow-us-pop hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-xs uppercase tracking-wider"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={16} className="animate-spin text-black" />
                            <span>Joining Waitlist...</span>
                          </>
                        ) : (
                          <>
                            <span>Join Partner Waitlist</span>
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
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
                  className="w-full bg-zinc-950 border border-zinc-800 shadow-2xl rounded-3xl p-8 text-center space-y-6"
                >
                  <div className="w-14 h-14 bg-[#FF5500]/10 border border-[#FF5500]/30 rounded-2xl flex items-center justify-center mx-auto text-[#FF5500]">
                    <Check size={24} strokeWidth={3} />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#FF5500] uppercase tracking-widest block font-bold">
                      // REGISTRATION LOGGED
                    </span>
                    <h2 className="text-2xl font-black text-white">
                      You're on the Partner List!
                    </h2>
                    <p className="text-zinc-400 text-xs leading-relaxed text-center">
                      Thanks for applying, <strong>{name}</strong>. We've logged your specialty details and will reach out to <strong>{email}</strong> when onboarding next batch of verified partners.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={() => navigate('/')}
                      className="w-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-extrabold py-3.5 rounded-xl shadow-us-pop text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Return Home
                    </button>
                    <button
                      onClick={() => navigate('/analyzer')}
                      className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold py-3.5 rounded-xl hover:bg-zinc-800 text-xs uppercase tracking-wider cursor-pointer"
                    >
                      AI Business Auditor
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
