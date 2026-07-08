import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnalyzerInput } from '../components/AnalyzerInput';
import { AnalyzerDashboard } from '../components/AnalyzerDashboard';
import { BookCallWidget } from '../components/BookCallWidget';
import { Sparkles, Brain, Cpu, Lock, ArrowRight, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { detectCurrency } from '../lib/currencies';

export function Analyzer() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(detectCurrency());

  // Lead-capture gating state
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', company: '' });
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState('');

  // Limit Gate & Booking Modal State
  const [limitExceeded, setLimitExceeded] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const auditCountStr = localStorage.getItem('aiml_analyzer_run_count');
    const auditCount = auditCountStr ? parseInt(auditCountStr, 10) : 0;
    if (auditCount >= 5) {
      setLimitExceeded(true);
    }
  }, []);

  const handleAnalyze = async (payload: { url?: string; description?: string; fileContent?: string }) => {
    // Strict client rate-limiting to maximum 5 diagnostic runs to prevent server/API abuse
    const auditCountStr = localStorage.getItem('aiml_analyzer_run_count');
    const auditCount = auditCountStr ? parseInt(auditCountStr, 10) : 0;
    if (auditCount >= 5) {
      setLimitExceeded(true);
      setError('You have reached the maximum limit of 5 free diagnostics. Schedule a free AI strategy call to get a comprehensive enterprise audit.');
      return;
    }

    setIsLoading(true);
    setError('');
    setEmailCaptured(false); // Reset unlock state for new analysis

    console.log('[Analyzer] Sending payload:', JSON.stringify(payload));

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('[Analyzer] Response status:', response.status, response.statusText);

      if (!response.ok) {
        let errorMessage = `Server error (${response.status}). Please try again.`;
        try {
          const errData = await response.json();
          if (errData && errData.error) {
            errorMessage = errData.error;
          }
        } catch (parseErr) {
          const errorText = await response.text().catch(() => '');
          if (errorText) {
            errorMessage += ` Details: ${errorText}`;
          }
        }
        console.error('[Analyzer] Server error response:', errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('[Analyzer] Received analysis for:', data.businessName);
      setResult(data);

      // Log audit details to Firestore
      try {
        const auditPayload: any = {
          businessName: data.businessName || "Your Business",
          promptTokens: data.tokenUsage?.promptTokens || 0,
          completionTokens: data.tokenUsage?.completionTokens || 0,
          totalTokens: data.tokenUsage?.totalTokens || 0,
          groundingQueries: data.tokenUsage?.groundingQueries || 0,
          costUsd: data.tokenUsage?.costUsd || 0.0,
          createdAt: serverTimestamp()
        };
        if (payload.url) {
          auditPayload.url = payload.url;
        }
        if (payload.description) {
          auditPayload.description = payload.description;
        } else if (payload.fileContent) {
          auditPayload.description = `Uploaded document: ${payload.fileContent.substring(0, 150)}...`;
        }
        await addDoc(collection(db, 'audits'), auditPayload);
        console.log('[Analyzer] Audit logged successfully in Firestore.');
      } catch (dbErr) {
        console.error('[Analyzer] Failed to write audit log to Firestore:', dbErr);
      }

      // Increment successful diagnostic audit run count
      localStorage.setItem('aiml_analyzer_run_count', String(auditCount + 1));
    } catch (err: any) {
      console.error('[Analyzer Client Error]:', err);
      if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        setError('Unable to connect. Please check your network connection and try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
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
          analysisResult: result,
          currencyCode: selectedCurrency
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
    <div className="relative min-h-screen bg-surface text-ink font-sans">
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
              {limitExceeded ? (
                <div className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden backdrop-blur-md">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-[80px] pointer-events-none" />
                  
                  <div className="relative z-10 space-y-6">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto text-amber-400 shadow-lg mb-4">
                      <Lock size={26} className="animate-pulse" />
                    </div>

                    <div className="space-y-3">
                      <span className="text-[10px] font-mono text-amber-400 tracking-widest uppercase font-semibold block mb-2">
                        FREE DIAGNOSTIC LIMIT REACHED
                      </span>
                      <h2 className="text-3xl font-display font-extrabold tracking-tight text-white leading-tight">
                        You've Completed Your 5 Audits
                      </h2>
                      <p className="text-slate-300 font-medium text-sm leading-relaxed max-w-md mx-auto">
                        To unlock deeper business automation opportunities, custom low-code tools, and structured ROI maps, schedule a free 1-on-1 strategy call with our expert systems engineers.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => setIsBookingModalOpen(true)}
                        className="bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white font-semibold px-8 py-3.5 rounded-full transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer text-sm"
                      >
                        <span>Book Free 1-on-1 Consultation</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
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
                </>
              )}
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
                  selectedCurrency={selectedCurrency}
                  setSelectedCurrency={setSelectedCurrency}
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

      {/* Consultation Booking Modal popup */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setIsBookingModalOpen(false)}
            />
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 transition-colors z-20 cursor-pointer"
              >
                <X size={20} />
              </button>
              <BookCallWidget source="Analyzer Limit Overlay" onSuccess={() => setIsBookingModalOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
