import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnalyzerInput } from '../components/AnalyzerInput';
import { AnalyzerDashboard } from '../components/AnalyzerDashboard';
import { Sparkles, Brain, Cpu, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
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

  const location = useLocation();
  const navigate = useNavigate();

  const handleAnalyze = async (payload: { url?: string; description?: string; fileContent?: string }) => {
    // Strict client rate-limiting to maximum 2 diagnostic runs to prevent server/API abuse
    const auditCountStr = localStorage.getItem('aiml_analyzer_run_count');
    const auditCount = auditCountStr ? parseInt(auditCountStr, 10) : 0;
    if (auditCount >= 2) {
      setError('You have reached the maximum limit of 2 free diagnostics. Contact info@aimlpartner.com for a comprehensive enterprise AI audit.');
      return;
    }

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
      
      // Increment successful diagnostic audit run count
      localStorage.setItem('aiml_analyzer_run_count', String(auditCount + 1));
    } catch (err: any) {
      console.error('[Analyzer Client Error]:', err);
      setError(err.message || 'Diagnostic failed. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 1. Check navigation state
    if (location.state && (location.state.url || location.state.description)) {
      handleAnalyze({
        url: location.state.url,
        description: location.state.description
      });
      // Clear navigation state
      navigate(location.pathname, { replace: true, state: null });
      return;
    }

    // 2. Check query parameters
    const params = new URLSearchParams(location.search);
    const urlParam = params.get('url');
    const descParam = params.get('description');
    if (urlParam || descParam) {
      handleAnalyze({
        url: urlParam || undefined,
        description: descParam || undefined
      });
      // Clear query params from URL
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, location.search]);

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
    <div className="relative min-h-screen overflow-x-hidden bg-surface text-ink font-sans">
      {/* Texture Overlays */}
      <div className="grain-overlay"></div>

      {/* STATE 1: NO RESULT - Show Hero and Input Forms */}
      {!result ? (
        <>
          {/* SECTION 1: IMMERSIVE SPACE HERO */}
          <section className="relative pt-40 pb-24 text-white overflow-hidden">
            {/* Deep Space Background Overlay */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 animate-[float-slow_30s_ease-in-out_infinite]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-90 transform scale-[1.15] origin-center"></div>
              </div>
              <div className="absolute inset-0 bg-space-gradient"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
            </div>

            <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none z-0"></div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto space-y-6"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-accent rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-2 shadow-glow">
                  <Brain size={14} className="animate-pulse" />
                  <span>POWERED BY GEMINI PRO & GROUNDED SEARCH</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                  Enterprise AI <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-300">
                    Operational Analyzer
                  </span>
                </h1>
                <p className="text-white/70 font-medium text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                  Scan your domain, submit briefs, or describe bottleneck processes. Receive instant high-fidelity administrative diagnostics, time leak calculations, and tactical playbooks.
                </p>
              </motion.div>
            </div>
          </section>

          {/* SECTION 2: INPUT AREA (Flowing Gradient Background) */}
          <section className="flowing-gradient py-24 px-6 relative z-10 border-t border-black/5 text-ink rounded-t-[3rem] -mt-10 min-h-[500px]">
            <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none z-0"></div>
            <div className="max-w-4xl mx-auto relative z-10">
              {error && (
                <div className="max-w-4xl mx-auto mb-8 bg-alert/15 border border-alert/20 text-alert rounded-2xl p-5 flex items-center justify-between shadow-sm bg-white">
                  <span className="text-sm font-semibold">{error}</span>
                  <button 
                    onClick={() => setError('')} 
                    className="text-alert hover:text-ink text-xs font-bold px-3 py-1 rounded-full border border-alert/30 transition-colors cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}
              <AnalyzerInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>
          </section>
        </>
      ) : (
        <>
          {/* STATE 2: AUDIT COMPLETE - Show Dashboard Console */}
          {/* SECTION 1: HEADER CONTROLS BANNER (Space theme) */}
          <section className="relative pt-32 pb-16 text-white overflow-hidden bg-surface-dark">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-30"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-slate-950"></div>
            </div>
            <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
              <span className="text-xs font-mono text-accent uppercase tracking-widest block font-bold mb-2">AUDIT SYSTEM ACTIVE</span>
              <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">Interactive Diagnostic Console</h1>
            </div>
          </section>

          {/* SECTION 2: THE DASHBOARD (Light Alabaster theme wrapper) */}
          <section className="bg-surface rounded-t-[3rem] -mt-10 py-16 relative z-10 text-ink border-t border-black/5 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto relative">
              {/* The dashboard is rendered behind, blurred and disabled until email is captured */}
              <div className={!emailCaptured ? "filter blur-md pointer-events-none select-none" : ""}>
                <AnalyzerDashboard 
                  data={result} 
                  onReset={handleReset} 
                  leadEmail={leadForm.email}
                  leadName={leadForm.name}
                  leadCompany={leadForm.company}
                />
              </div>

              {/* Immersive Lead Capture Lock Gate Overlay */}
              {!emailCaptured && (
                <div className="fixed inset-0 z-40 overflow-y-auto flex items-center justify-center bg-black/60 backdrop-blur-[4px] p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-2xl bg-slate-950/95 border border-white/10 shadow-glass rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden text-center my-auto backdrop-blur-2xl"
                  >
                    <div className="absolute top-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full filter blur-[80px] pointer-events-none animate-pulse-slow" />
                    
                    <div className="relative z-10 max-w-md mx-auto space-y-6">
                      <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto text-accent shadow-lg shadow-accent/5 mb-4">
                        <Lock size={26} className="animate-pulse" />
                      </div>
                      
                      <div>
                        <span className="text-[10px] font-mono text-accent uppercase tracking-widest block font-bold mb-1">ANALYSIS COMPLETE</span>
                        <h3 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-white leading-tight">
                          Unlock Your Custom AI Audit Dashboard
                        </h3>
                        <p className="text-white/60 font-medium text-sm mt-3 leading-relaxed">
                          Your customized diagnostic playbooks and ROI roadmaps are fully compiled in the background! Supply your details to unlock full access.
                        </p>
                      </div>

                      {unlockError && (
                        <div className="bg-alert/15 border border-alert/20 text-alert-soft text-xs py-2.5 px-4 rounded-xl font-medium text-left">
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
                              className="block w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-accent shadow-inner text-sm"
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
                              className="block w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-accent shadow-inner text-sm"
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
                              className="block w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-accent shadow-inner text-sm"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isUnlocking}
                          className="w-full bg-white text-ink font-bold py-3.5 rounded-full hover:bg-surface-alt transition-all flex items-center justify-center gap-2 group/btn shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isUnlocking ? (
                            <>
                              <Loader2 size={16} className="animate-spin text-ink" />
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

                      <div className="pt-2 text-center text-[10px] text-white/40 font-mono">
                        Secure SSL processing • Free for business owners • Instant unlock
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
