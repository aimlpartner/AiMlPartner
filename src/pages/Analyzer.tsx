import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnalyzerInput } from '../components/AnalyzerInput';
import { AnalyzerDashboard } from '../components/AnalyzerDashboard';
import { BookCallWidget } from '../components/BookCallWidget';
import { SEO } from '../components/SEO';
import { Sparkles, Brain, Cpu, Lock, ArrowRight, Loader2, X, ShieldAlert } from 'lucide-react';
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

  // Handle incoming audit requests passed via router state from homepage search bar
  useEffect(() => {
    const navState = location.state as { url?: string; description?: string } | null;
    if (navState && (navState.url || navState.description) && !result && !isLoading) {
      navigate('/analyzer', { replace: true, state: null });
      handleAnalyze({
        url: navState.url,
        description: navState.description
      });
    }
  }, [location.state]);

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

      // Log audit details to Firestore 'audits' collection
      try {
        const auditPayload: any = {
          businessName: data.businessName || "Your Business",
          promptTokens: Number(data.tokenUsage?.promptTokens) || 0,
          completionTokens: Number(data.tokenUsage?.completionTokens) || 0,
          totalTokens: Number(data.tokenUsage?.totalTokens) || 0,
          groundingQueries: Number(data.tokenUsage?.groundingQueries) || 0,
          costUsd: Number(data.tokenUsage?.costUsd) || 0.0,
          createdAt: serverTimestamp()
        };
        if (payload.url) {
          auditPayload.url = payload.url;
        }
        if (payload.description) {
          auditPayload.description = payload.description.substring(0, 500);
        } else if (payload.fileContent) {
          auditPayload.description = 'Uploaded operational brief document';
        }

        await addDoc(collection(db, 'audits'), auditPayload);
        
        // Increment client counter
        localStorage.setItem('aiml_analyzer_run_count', (auditCount + 1).toString());
      } catch (logErr) {
        console.warn('[Analyzer Firestore Log]: Non-blocking error logging audit run:', logErr);
      }
    } catch (err: any) {
      console.error('[Analyzer Exception]:', err);
      setError(err.message || 'Failed to analyze business. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnlockError('');

    if (!leadForm.name.trim() || !leadForm.email.trim() || !leadForm.company.trim()) {
      setUnlockError('Please fill out all fields to unlock your audit.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadForm.email.trim())) {
      setUnlockError('Please enter a valid work email address.');
      return;
    }

    setIsUnlocking(true);

    try {
      // 1. Record lead to Firestore 'leads' collection
      const leadPayload: any = {
        name: leadForm.name.trim().substring(0, 100),
        email: leadForm.email.trim().toLowerCase(),
        company: (leadForm.company.trim() || result.businessName || 'N/A').substring(0, 100),
        source: 'AI Business Audit',
        createdAt: serverTimestamp(),
        quizAnswers: {
          businessName: result.businessName || 'Your Business',
          sector: result.sector || 'Services',
          readinessScore: result.readinessScore || 0,
          readinessTier: result.readinessTier || 'Exploring',
          annualReclaimedROI: result.annualReclaimedROI || 0,
          internalDragHours: result.internalDragHours || 0,
          currencyCode: selectedCurrency || 'USD'
        }
      };

      await addDoc(collection(db, 'leads'), leadPayload);

      // 2. Dispatch automated PDF and email report via backend
      fetch('/api/email-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: leadForm.email.trim().toLowerCase(),
          name: leadForm.name.trim(),
          company: leadForm.company.trim(),
          analysisResult: result,
          currencyCode: selectedCurrency
        })
      }).catch(mailErr => console.warn('[Email Report Dispatch Notice]:', mailErr));

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
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-[#FF5500] selection:text-black">
      <SEO 
        title="Free AI Business Audit" 
        description="Find out exactly how much money you can save with AI in 60 seconds. Our AI will analyze your business and tell you what to automate."
        url="https://aimlpartner.com/analyzer"
      />
      {/* Cinematic Saturn Atmospheric Backdrop */}
      <div className="absolute top-0 left-0 right-0 h-[600px] sm:h-[680px] overflow-hidden pointer-events-none z-0">
        <video
          src="/saturn_loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center opacity-40 brightness-95 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/75 to-black pointer-events-none" />
      </div>

      {/* Ambient Cosmic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#FF5500]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* STATE 1: NO RESULT - Show Hero and Input Forms */}
      {!result ? (
        <>
          {/* Hero Section */}
          <section className="relative pt-40 pb-16 px-6 md:px-12 max-w-[1200px] mx-auto text-center flex flex-col items-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 max-w-4xl mx-auto flex flex-col items-center"
            >
              <span className="text-xs uppercase tracking-widest text-[#FF5500] font-mono font-bold block">
                // FREE AI BUSINESS AUDIT
              </span>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-black tracking-tight text-white leading-[1.12] max-w-5xl mx-auto">
                Find out exactly how much money <br className="hidden md:inline" />
                <span className="text-[#FF5500]">you can save with AI in 60 seconds.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
                Enter your website or describe the annoying manual tasks your team hates doing. Our AI will instantly analyze your business and tell you exactly what to automate to save time and money.
              </p>
            </motion.div>
          </section>

          {/* Input Area */}
          <section className="py-12 px-6 relative z-10 min-h-[500px] max-w-4xl mx-auto">
            {limitExceeded ? (
              <div className="max-w-2xl mx-auto bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-[#FF5500]/10 border border-[#FF5500]/30 rounded-2xl flex items-center justify-center mx-auto text-[#FF5500] mb-4">
                    <Lock size={26} className="animate-pulse" />
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-mono text-[#FF5500] tracking-widest uppercase font-bold block mb-2">
                      // FREE AUDITS COMPLETED
                    </span>
                    <h2 className="text-3xl font-black tracking-tight text-white">
                      You've hit the limit for free scans.
                    </h2>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto">
                      To get a deeper look at how AI can save your business money, schedule a free 1-on-1 call with us. We'll build a custom automation roadmap for you.
                    </p>
                  </div>

                  <div className="pt-4 flex justify-center">
                    <button
                      onClick={() => setIsBookingModalOpen(true)}
                      className="bg-[#FF5500] hover:bg-[#FF6E26] text-black font-extrabold px-8 py-4 rounded-xl transition-all shadow-us-pop hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
                    >
                      <span>Book Your Free AI Strategy Call</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {error && (
                  <div className="max-w-4xl mx-auto mb-8 bg-red-950/60 border border-red-800/80 text-red-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                    <span className="text-sm font-semibold">{error}</span>
                    <button
                      onClick={() => setError('')}
                      className="text-red-400 hover:text-white text-xs font-bold px-3 py-1 rounded-lg border border-red-800/60 transition-colors cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
                <AnalyzerInput onAnalyze={handleAnalyze} isLoading={isLoading} />
              </>
            )}
          </section>
        </>
      ) : (
        <>
          {/* STATE 2: AUDIT COMPLETE - Show Dashboard Console */}
          {/* Header Banner */}
          <section className="relative pt-36 pb-12 text-white border-b border-zinc-900">
            <div className="max-w-[1200px] mx-auto px-6 text-center">
              <span className="text-xs font-mono text-[#FF5500] uppercase tracking-widest block font-bold mb-2">
                // AUDIT COMPLETE
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Your AI Automation Blueprint
              </h1>
            </div>
          </section>

          {/* The Dashboard */}
          <section className="py-12 relative z-10 text-white px-6 min-h-screen">
            <div className="max-w-7xl mx-auto relative">
              {/* Blurred when email is not captured */}
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

              {/* Lead Capture Lock Gate Overlay */}
              {!emailCaptured && (
                <div className="fixed inset-0 z-40 overflow-y-auto flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-xl bg-zinc-950 border border-zinc-800 shadow-2xl rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden text-center my-auto"
                  >
                    <div className="space-y-6">
                      <div className="w-16 h-16 bg-[#FF5500]/10 border border-[#FF5500]/30 rounded-2xl flex items-center justify-center mx-auto text-[#FF5500]">
                        <Lock size={26} className="animate-pulse" />
                      </div>

                      <div>
                        <span className="text-xs font-mono text-[#FF5500] uppercase tracking-widest block font-bold mb-1">
                          // YOUR REPORT IS READY
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
                          Unlock your custom AI blueprint.
                        </h3>
                        <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                          We found the biggest bottlenecks costing you money. Enter your email to unlock the dashboard instantly and get a PDF copy sent to your inbox.
                        </p>
                      </div>

                      {unlockError && (
                        <div className="bg-red-950/60 border border-red-800/80 text-red-200 text-xs py-2.5 px-4 rounded-xl font-medium text-left">
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
                              className="block w-full px-4 py-3.5 bg-black border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5500] text-sm"
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
                              className="block w-full px-4 py-3.5 bg-black border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5500] text-sm"
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
                              className="block w-full px-4 py-3.5 bg-black border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5500] text-sm"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isUnlocking}
                          className="w-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-extrabold py-4 rounded-xl shadow-us-pop hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-xs uppercase tracking-wider"
                        >
                          {isUnlocking ? (
                            <>
                              <Loader2 size={16} className="animate-spin text-black" />
                              <span>Building your report...</span>
                            </>
                          ) : (
                            <>
                              <span>Show Me My Report</span>
                              <ArrowRight size={16} />
                            </>
                          )}
                        </button>
                      </form>

                      <div className="pt-1 text-center text-[10px] text-zinc-500 font-mono">
                        100% Confidential • Instant Access • PDF Copy Emailed
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsBookingModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors z-20 cursor-pointer"
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
