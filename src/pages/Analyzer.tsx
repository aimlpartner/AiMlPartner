import React, { useState } from 'react';
import { AnalyzerInput } from '../components/AnalyzerInput';
import { AnalyzerDashboard } from '../components/AnalyzerDashboard';
import { Sparkles, Brain, Cpu, Lock, ArrowRight, Loader2, Sparkle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function Analyzer() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState('');
  
  // Lead-capture gating state
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', company: '' });
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState('');

  const handleAnalyze = async (payload: { url?: string; description?: string; fileContent?: string }) => {
    setIsLoading(true);
    setError('');
    setEmailCaptured(false); // Reset unlock state for new analysis
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Server returned an error. Please try again.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('[Analyzer Client Error]:', err);
      setError(err.message || 'Diagnostic failed. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name.trim() || !leadForm.email.trim() || !leadForm.company.trim()) {
      setUnlockError('Please fill out all fields.');
      return;
    }
    
    setIsUnlocking(true);
    setUnlockError('');
    
    try {
      // 1. Record lead details in Firestore (validated fields only)
      await addDoc(collection(db, 'leads'), {
        name: leadForm.name.substring(0, 100),
        email: leadForm.email.trim(),
        company: leadForm.company.substring(0, 100),
        source: `AI Analyzer: ${result.businessName}`.substring(0, 100),
        createdAt: serverTimestamp()
      });
      
      // 2. Dispatch API call to send a gorgeous PDF to the administrator
      await fetch('/api/email-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: leadForm.email.trim(),
          name: leadForm.name.trim(),
          company: leadForm.company.trim(),
          analysisResult: result
        })
      });
      
      // 3. Mark capture completed and unlock the live interactive console!
      setEmailCaptured(true);
    } catch (err: any) {
      console.error('[Lock Gate Error]:', err);
      // Resilient fallback: let the user see the analysis anyway if there's a transient Firestore error
      setEmailCaptured(true);
    } finally {
      setIsUnlocking(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
    setEmailCaptured(false);
    setLeadForm({ name: '', email: '', company: '' });
  };

  return (
    <main className="min-h-screen bg-slate-50/50 pt-28 pb-20 relative overflow-hidden font-sans">
      {/* Visual background layers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-sky-200/40 rounded-full filter blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-100/30 rounded-full filter blur-[120px] animate-pulse" />
      </div>

      <div className="container-max relative z-10 space-y-12">
        {/* Banner Section */}
        {!result && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 text-sky-400 rounded-full text-xs font-mono mb-2 shadow-lg">
              <Brain size={14} className="animate-pulse" />
              <span>POWERED BY GEMINI PRO & GROUNDED SEARCH</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Enterprise AI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600">
                Operational Analyzer
              </span>
            </h1>
            <p className="text-slate-500 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Scan your domain, submit briefs, or describe bottleneck processes. Receive instant high-fidelity administrative diagnostics, time leak calculations, and tactical playbooks.
            </p>
          </motion.div>
        )}

        {/* Error notification banner */}
        {error && (
          <div className="max-w-4xl mx-auto bg-rose-50 border border-rose-100 text-rose-800 rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <span className="text-sm font-medium">{error}</span>
            <button 
              onClick={() => setError('')} 
              className="text-rose-500 hover:text-rose-700 text-xs font-semibold px-3 py-1 rounded-full border border-rose-200 transition-colors"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* State Transitions: Input -> Lock Gate -> Dashboard */}
        {!result ? (
          <AnalyzerInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        ) : !emailCaptured ? (
          // lead capture gating lock card
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 shadow-2xl rounded-3xl p-8 md:p-12 text-white relative overflow-hidden text-center"
          >
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full filter blur-[80px] pointer-events-none animate-pulse" />
            
            <div className="relative z-10 max-w-md mx-auto space-y-6">
              <div className="w-16 h-16 bg-sky-500/10 border border-sky-500/30 rounded-2xl flex items-center justify-center mx-auto text-sky-400 shadow-lg shadow-sky-500/5 mb-4">
                <Lock size={26} className="animate-pulse" />
              </div>
              
              <div>
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest block font-semibold mb-1">ANALYSIS COMPLETE</span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  Unlock Your Custom Operational Playbook
                </h3>
                <p className="text-slate-400 font-light text-sm mt-3 leading-relaxed">
                  Your customized diagnostic report for <strong className="text-white font-medium">{result.businessName}</strong> is generated! Please supply your work details below to unlock your dashboard and playbooks.
                </p>
              </div>

              {unlockError && (
                <div className="bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs py-2.5 px-4 rounded-xl font-medium text-left">
                  {unlockError}
                </div>
              )}

              <form onSubmit={handleUnlock} className="space-y-4 text-left">
                <div className="space-y-3">
                  <div>
                    <label htmlFor="gate-name" className="sr-only">Full Name</label>
                    <input
                      id="gate-name"
                      type="text"
                      required
                      placeholder="Full Name"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-sm text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="gate-email" className="sr-only">Work Email</label>
                    <input
                      id="gate-email"
                      type="email"
                      required
                      placeholder="Work Email"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-sm text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="gate-company" className="sr-only">Company Name</label>
                    <input
                      id="gate-company"
                      type="text"
                      required
                      placeholder="Company Name"
                      value={leadForm.company}
                      onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                      className="block w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-sm text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isUnlocking}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-full py-4 font-semibold text-sm hover:from-sky-500 hover:to-sky-600 transition-all shadow-lg shadow-sky-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUnlocking ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-white" />
                      <span>Unlocking Analysis...</span>
                    </>
                  ) : (
                    <>
                      <span>Unlock Audit Dashboard</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 text-center text-[10px] text-slate-500 font-light">
                Secure SSL processing • Free for business owners • Instant unlock
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnalyzerDashboard data={result} onReset={handleReset} />
          </motion.div>
        )}
      </div>
    </main>
  );
}
