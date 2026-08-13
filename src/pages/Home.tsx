import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkflowSimulator } from '../components/WorkflowSimulator';
import { BookCallWidget } from '../components/BookCallWidget';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
export function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'website' | 'workflow'>('website');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Scroll Reveal registration
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const cleanDomain = (str: string): string => {
    let cleaned = str.trim().toLowerCase();
    cleaned = cleaned.replace(/^https?:\/\//i, '');
    cleaned = cleaned.replace(/^www\./i, '');
    cleaned = cleaned.split('/')[0];
    cleaned = cleaned.split('?')[0];
    cleaned = cleaned.split('#')[0];
    return cleaned;
  };

  const isValidDomain = (str: string): boolean => {
    if (/<script|javascript:|data:|vbscript:|<|>|'|"|`|\{|\}|\[|\]|\\|\^|\%/i.test(str)) {
      return false;
    }
    const domainRegex = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:\d+)?$/;
    return domainRegex.test(str);
  };

  const handleWebsiteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const cleaned = cleanDomain(url);
    if (!cleaned) {
      setError('Please enter a website.');
      return;
    }
    if (!isValidDomain(cleaned)) {
      setError('Please enter a valid website domain name (e.g. company.com). Do not include https:// or www.');
      return;
    }
    navigate('/analyzer', { state: { url: cleaned } });
  };

  const handleWorkflowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmedDesc = description.trim();
    if (!trimmedDesc || trimmedDesc.length < 20) {
      setError('Please enter a description (at least 20 characters).');
      return;
    }
    if (trimmedDesc.length > 2000) {
      setError('Description is too long.');
      return;
    }
    navigate('/analyzer', { state: { description: trimmedDesc } });
  };

  return (
    <div className="relative min-h-screen">
      {/* Texture Overlays */}
      <div className="grain-overlay"></div>
      <div className="absolute inset-0 bg-architectural-grid opacity-50 pointer-events-none -z-10 h-full"></div>

      {/* SECTION 1: IMMERSIVE SPACE HERO */}
      <section id="audit" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
        {/* Hero Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          {/* Deep Space / Nebula Background representing the "Universe of Data" */}
          <div className="absolute inset-0 animate-[float-slow_30s_ease-in-out_infinite]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-90 transform scale-[1.15] origin-center"></div>
          </div>
          {/* Gradient Overlays for readability and smooth transition to next section */}
          <div className="absolute inset-0 bg-space-gradient"></div>
          {/* Accent glow in the center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-accent/30 md:bg-accent/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
        </div>

        <div className="max-w-[900px] mx-auto text-center relative z-10 flex flex-col items-center justify-center">
          {/* Main Content: Centered Typography & Search Bar */}
          <div className="reveal flex flex-col items-center w-full">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-extrabold tracking-tighter leading-[1.05] text-white mb-6 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
              Your Team Is Busy. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-300 italic font-medium pr-2">
                Your Systems
              </span>{' '}
              Shouldn’t Be.
            </h1>

            <p className="text-xs md:text-sm text-white/50 max-w-lg font-medium leading-relaxed mb-6">
              Automate repetitive work, improve customer experience, and build practical AI workflows.
            </p>

            {/* Pill Tab Switcher */}
            <div className="flex bg-black/50 border border-white/10 rounded-full p-1 mb-6 w-fit mx-auto shadow-inner backdrop-blur-md">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('website');
                  setError('');
                }}
                className={`flex items-center gap-1.5 px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer ${
                  activeTab === 'website'
                    ? 'bg-white text-ink shadow-md font-extrabold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <i className="ph-bold ph-globe"></i>
                <span>Website Scan</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('workflow');
                  setError('');
                }}
                className={`flex items-center gap-1.5 px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer ${
                  activeTab === 'workflow'
                    ? 'bg-white text-ink shadow-md font-extrabold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <i className="ph-bold ph-text-align-left"></i>
                <span>Manual Workflow</span>
              </button>
            </div>

            {/* Centered Gemini-style Search Bar Container */}
            <div className="w-full max-w-2xl px-4 min-h-[80px] flex justify-center">
              <form onSubmit={activeTab === 'website' ? handleWebsiteSubmit : handleWorkflowSubmit} className="relative w-full">
                {/* Flowing animated gradient border wrapper with dynamic rounding */}
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                  className={`gemini-search-container p-[1.5px] overflow-hidden ${
                    activeTab === 'website' ? 'rounded-full' : 'rounded-3xl'
                  }`}
                >
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                    className={`flex bg-zinc-900/85 backdrop-blur-md px-5 border border-white/10 ${
                      activeTab === 'website' 
                        ? 'rounded-full items-center py-2.5 md:py-3.5' 
                        : 'rounded-3xl flex-col items-stretch py-4 gap-3'
                    }`}
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      {activeTab === 'website' ? (
                        <motion.div
                          key="website-form"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center w-full"
                        >
                          {/* Left Globe Icon */}
                          <i className="ph-bold ph-globe text-white/50 text-xl mr-3 animate-pulse"></i>
                          
                          {/* Input Field */}
                          <input
                            type="text"
                            placeholder="Analyze your company website (e.g. company.com)..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-1 bg-transparent border-none text-white placeholder-white/40 focus:outline-none focus:ring-0 text-base md:text-lg outline-none pr-2"
                          />

                          {/* Right Action Button */}
                          <button
                            type="submit"
                            className="bg-white text-ink font-bold px-5 py-2 md:px-7 md:py-2.5 rounded-full hover:bg-white/90 transition-all flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer text-sm shrink-0 font-display"
                          >
                            <span>Analyze</span>
                            <i className="ph-bold ph-arrow-right text-xs"></i>
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="workflow-form"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col gap-3 w-full"
                        >
                          {/* Top Line: Icon and Textarea */}
                          <div className="flex items-start">
                            <i className="ph-bold ph-text-align-left text-white/50 text-xl mr-3 mt-1.5 animate-pulse"></i>
                            <textarea
                              rows={2}
                              placeholder="Describe your manual workflow bottleneck (e.g., We spend 10 hours a week copying files and records to HubSpot...)"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="flex-1 bg-transparent border-none text-white placeholder-white/40 focus:outline-none focus:ring-0 text-base outline-none resize-none pt-1"
                              autoFocus
                            />
                          </div>

                          {/* Bottom Line: Submit Button right-aligned */}
                          <div className="flex justify-between items-center border-t border-white/10 pt-3 mt-1">
                            <span className="text-[10px] font-mono text-white/40">Min. 20 characters</span>
                            <button
                              type="submit"
                              className="bg-white text-ink font-bold px-5 py-2 rounded-full hover:bg-white/90 transition-all flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer text-sm font-display self-end"
                            >
                              <span>Analyze Workflow</span>
                              <i className="ph-bold ph-arrow-right text-xs"></i>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </form>
            </div>

            {/* Error Notice */}
            <div className="h-10 mt-4 flex items-center justify-center w-full">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-alert/20 border border-alert/30 text-alert-soft text-xs py-2.5 px-4 rounded-xl text-center shadow-md w-full max-w-md"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.5: SMB TICKER */}
      <section className="py-8 bg-surface-alt border-y border-black/5 overflow-hidden relative z-20 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
        <style>{`
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee-scroll 40s linear infinite;
            display: inline-flex;
            white-space: nowrap;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
        
        <div className="max-w-[1400px] mx-auto px-6 mb-5 flex justify-center text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-light font-bold">
            We build automation systems for
          </span>
        </div>

        {/* Ticker Container */}
        <div className="relative w-full overflow-hidden flex">
          {/* Gradient masks for smooth fading on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface-alt to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface-alt to-transparent z-10 pointer-events-none"></div>
          
          {/* Marquee Track (Double content for seamless loop) */}
          <div className="animate-marquee flex items-center gap-4 pl-4 text-ink font-display font-semibold text-sm md:text-base">
            {/* Set 1 */}
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-default"><i className="ph-fill ph-house text-blue-500 text-lg"></i> Roofers</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-cyan-200 transition-all cursor-default"><i className="ph-fill ph-drop text-cyan-500 text-lg"></i> Plumbers</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-yellow-200 transition-all cursor-default"><i className="ph-fill ph-lightning text-yellow-500 text-lg"></i> Electricians</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-red-200 transition-all cursor-default"><i className="ph-fill ph-car text-red-500 text-lg"></i> Auto Repair</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-green-200 transition-all cursor-default"><i className="ph-fill ph-plant text-green-500 text-lg"></i> Landscapers</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-default"><i className="ph-fill ph-broom text-purple-500 text-lg"></i> Cleaning Services</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-default"><i className="ph-fill ph-bug text-orange-500 text-lg"></i> Pest Control</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-stone-200 transition-all cursor-default"><i className="ph-fill ph-hammer text-stone-500 text-lg"></i> Contractors</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-teal-200 transition-all cursor-default"><i className="ph-fill ph-tooth text-teal-500 text-lg"></i> Dentists</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-default"><i className="ph-fill ph-truck text-indigo-500 text-lg"></i> Movers</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-default"><i className="ph-fill ph-buildings text-slate-500 text-lg"></i> Property Managers</div>
            
            {/* Set 2 (Exact Duplicate for Loop) */}
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-default"><i className="ph-fill ph-house text-blue-500 text-lg"></i> Roofers</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-cyan-200 transition-all cursor-default"><i className="ph-fill ph-drop text-cyan-500 text-lg"></i> Plumbers</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-yellow-200 transition-all cursor-default"><i className="ph-fill ph-lightning text-yellow-500 text-lg"></i> Electricians</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-red-200 transition-all cursor-default"><i className="ph-fill ph-car text-red-500 text-lg"></i> Auto Repair</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-green-200 transition-all cursor-default"><i className="ph-fill ph-plant text-green-500 text-lg"></i> Landscapers</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-default"><i className="ph-fill ph-broom text-purple-500 text-lg"></i> Cleaning Services</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-default"><i className="ph-fill ph-bug text-orange-500 text-lg"></i> Pest Control</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-stone-200 transition-all cursor-default"><i className="ph-fill ph-hammer text-stone-500 text-lg"></i> Contractors</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-teal-200 transition-all cursor-default"><i className="ph-fill ph-tooth text-teal-500 text-lg"></i> Dentists</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-default"><i className="ph-fill ph-truck text-indigo-500 text-lg"></i> Movers</div>
            <div className="flex items-center gap-2 bg-white border border-black/5 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-default"><i className="ph-fill ph-buildings text-slate-500 text-lg"></i> Property Managers</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROBLEM & SOLUTION (Asymmetric Bento Grid - Light Theme) */}
      <section id="bottlenecks" className="py-24 md:py-32 px-6 relative z-10 -mt-10 bg-surface rounded-t-[3rem]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal pt-10">
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block font-bold">
                Why We Exist
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-ink leading-[1.1] text-balance">
                Running a business is hard. Your systems shouldn't be.
              </h2>
            </div>
            <p className="text-ink-light max-w-md font-medium leading-relaxed pb-2">
              You don't need another consultant handing you a 50-page report. You need solutions that work. We help businesses automate repetitive tasks, save time, and increase profits—without needing an IT degree.
            </p>
          </div>

          {/* Simple 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Leads */}
            <div className="bg-white border border-black/5 rounded-3xl p-8 tangible-card reveal shadow-editorial flex flex-col h-full">
              {/* Problem */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-alert font-bold mb-4 bg-alert-soft px-2.5 py-1.5 rounded-md border border-alert-border/50">
                  <i className="ph-fill ph-warning-circle text-sm"></i> The Problem
                </div>
                <h3 className="font-display text-xl font-bold mb-3 tracking-tight text-ink">
                  Leads go cold & inquiries pile up
                </h3>
                <p className="text-ink-light text-sm leading-relaxed">
                  New customer inquiries sit in your inbox for hours while your team is busy. By the time you reply, they've already gone to a competitor.
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-black/5 my-4"></div>

              {/* Solution */}
              <div className="mt-auto pt-4">
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-success font-bold mb-4 bg-success-soft px-2.5 py-1.5 rounded-md border border-success-border/50">
                  <i className="ph-fill ph-cpu text-sm"></i> How We Fix It
                </div>
                <h3 className="font-display text-xl font-bold mb-3 tracking-tight text-ink">
                  Instant, intelligent replies
                </h3>
                <p className="text-ink-light text-sm leading-relaxed">
                  We set up AI agents that instantly answer questions, qualify leads, and book meetings on your calendar—24/7, without any human effort.
                </p>
              </div>
            </div>

            {/* Card 2: Manual Tasks */}
            <div
              className="bg-white border border-black/5 rounded-3xl p-8 tangible-card reveal shadow-editorial flex flex-col h-full"
              style={{ transitionDelay: '100ms' }}
            >
              {/* Problem */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-alert font-bold mb-4 bg-alert-soft px-2.5 py-1.5 rounded-md border border-alert-border/50">
                  <i className="ph-fill ph-warning-circle text-sm"></i> The Problem
                </div>
                <h3 className="font-display text-xl font-bold mb-3 tracking-tight text-ink">
                  Your team is stuck doing manual data entry
                </h3>
                <p className="text-ink-light text-sm leading-relaxed">
                  Your employees waste countless hours copy-pasting information from emails into spreadsheets or your CRM, slowing down real work.
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-black/5 my-4"></div>

              {/* Solution */}
              <div className="mt-auto pt-4">
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-success font-bold mb-4 bg-success-soft px-2.5 py-1.5 rounded-md border border-success-border/50">
                  <i className="ph-fill ph-lightning text-sm"></i> How We Fix It
                </div>
                <h3 className="font-display text-xl font-bold mb-3 tracking-tight text-ink">
                  We automate the busywork
                </h3>
                <p className="text-ink-light text-sm leading-relaxed">
                  Invoices, data entry, and email sorting happen instantly in the background so your team can focus on client-facing tasks.
                </p>
              </div>
            </div>

            {/* Card 3: Messy Data */}
            <div
              className="bg-white border border-black/5 rounded-3xl p-8 tangible-card reveal shadow-editorial flex flex-col h-full"
              style={{ transitionDelay: '200ms' }}
            >
              {/* Problem */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-alert font-bold mb-4 bg-alert-soft px-2.5 py-1.5 rounded-md border border-alert-border/50">
                  <i className="ph-fill ph-warning-circle text-sm"></i> The Problem
                </div>
                <h3 className="font-display text-xl font-bold mb-3 tracking-tight text-ink">
                  Your information is messy and scattered
                </h3>
                <p className="text-ink-light text-sm leading-relaxed">
                  Customer details are in emails, spreadsheets, and different apps. Nobody knows what the most up-to-date information is, leading to mistakes.
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-black/5 my-4"></div>

              {/* Solution */}
              <div className="mt-auto pt-4">
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-success font-bold mb-4 bg-success-soft px-2.5 py-1.5 rounded-md border border-success-border/50">
                  <i className="ph-fill ph-arrows-clockwise text-sm"></i> How We Fix It
                </div>
                <h3 className="font-display text-xl font-bold mb-3 tracking-tight text-ink">
                  Everything connected, automatically
                </h3>
                <p className="text-ink-light text-sm leading-relaxed">
                  We link your tools together. When an email comes in, your CRM is updated. When a deal closes, the invoice is sent. Zero human error.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SHOWCASE (Visual Workflow) */}
      <section id="showcase" className="py-16 md:py-20 px-6 border-y border-black/5 relative overflow-hidden bg-white">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 reveal">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold mb-4 block">
              See It In Action
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-6 text-ink tracking-tight text-balance">
              Watch your busywork disappear.
            </h2>
            <p className="text-ink-light text-lg leading-relaxed font-medium text-balance">
              We take messy emails, PDFs, and scattered notes and automatically turn them into clean data inside your CRM and spreadsheets.
            </p>
          </div>

          {/* The Visual Diagram (Interactive Simulation Console) */}
          <div className="reveal">
            <WorkflowSimulator />
          </div>

          <div className="mt-8 text-center">
            <a
              href="#audit"
              className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-surface font-semibold text-sm hover:bg-accent hover:text-white transition-all duration-300 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Find out what you can automate <i className="ph-bold ph-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3: OFFERINGS (Space/Nebula Theme) */}
      <section id="offerings" className="py-24 md:py-32 px-6 bg-black relative overflow-hidden border-y border-white/10">
        {/* Galaxy/Nebula Background Effects */}
        <div className="absolute inset-0 z-0">
          {/* Deep Space Background (Different from Hero) */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-70"></div>
          {/* Gradient Overlays for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="mb-20 reveal text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-400 mb-4 block font-bold">
              What We Do
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
              How We Help You Save Time
            </h2>
            <p className="text-white/70 mt-6 max-w-2xl mx-auto font-medium text-lg">
              We build digital systems that handle your busywork, so you can get back to running your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10" id="offering-grid">
            {/* Card 01 */}
            <div className="group bg-white border border-black/5 rounded-[2rem] p-8 md:p-10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-default reveal">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-[100px] -z-10 transition-transform duration-500 group-hover:scale-125"></div>
              <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mb-8 text-accent border border-black/5 group-hover:bg-accent group-hover:text-white group-hover:-translate-y-1 transition-all duration-300">
                <i className="ph-fill ph-database text-3xl"></i>
              </div>
              <h3 className="font-display text-2xl font-bold text-ink mb-4 tracking-tight">
                Sales & CRM Automation
              </h3>
              <p className="text-ink-light leading-relaxed font-medium">
                Stop copying and pasting. We automate lead data entry, keep your CRM clean, and update your spreadsheets instantly.
              </p>
            </div>

            {/* Card 02 */}
            <div className="group bg-white border border-black/5 rounded-[2rem] p-8 md:p-10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-default reveal" style={{ transitionDelay: '50ms' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-bl-[100px] -z-10 transition-transform duration-500 group-hover:scale-125"></div>
              <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mb-8 text-success border border-black/5 group-hover:bg-success group-hover:text-white group-hover:-translate-y-1 transition-all duration-300">
                <i className="ph-fill ph-lightning text-3xl"></i>
              </div>
              <h3 className="font-display text-2xl font-bold text-ink mb-4 tracking-tight">
                Instant Lead Follow-ups
              </h3>
              <p className="text-ink-light leading-relaxed font-medium">
                Reply to leads in seconds, not hours. We set up automated emails, instant proposals, and smart follow-ups that win deals.
              </p>
            </div>

            {/* Card 03 */}
            <div className="group bg-white border border-black/5 rounded-[2rem] p-8 md:p-10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-default reveal" style={{ transitionDelay: '100ms' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-alert/5 rounded-bl-[100px] -z-10 transition-transform duration-500 group-hover:scale-125"></div>
              <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mb-8 text-alert border border-black/5 group-hover:bg-alert group-hover:text-white group-hover:-translate-y-1 transition-all duration-300">
                <i className="ph-fill ph-star text-3xl"></i>
              </div>
              <h3 className="font-display text-2xl font-bold text-ink mb-4 tracking-tight">
                Better Customer Experience
              </h3>
              <p className="text-ink-light leading-relaxed font-medium">
                Give clients a 5-star experience. We automate onboarding, schedule reminders, and provide 24/7 AI support for common questions.
              </p>
            </div>

            {/* Card 04 */}
            <div className="group bg-white border border-black/5 rounded-[2rem] p-8 md:p-10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-default reveal" style={{ transitionDelay: '150ms' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-[100px] -z-10 transition-transform duration-500 group-hover:scale-125"></div>
              <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mb-8 text-purple-500 border border-black/5 group-hover:bg-purple-500 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300">
                <i className="ph-fill ph-robot text-3xl"></i>
              </div>
              <h3 className="font-display text-2xl font-bold text-ink mb-4 tracking-tight">
                Back-Office Autopilot
              </h3>
              <p className="text-ink-light leading-relaxed font-medium">
                Run operations on autopilot. We automate your daily reports, sort invoices, and handle the repetitive tasks that slow you down.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR PROCESS (How it works) */}
      <section id="process" className="py-16 md:py-24 px-6 bg-white relative border-y border-black/5 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-16 reveal">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block font-bold">
              How We Work
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-6">
              AI Where You Need It. <br className="hidden md:block"/> Human Where It Counts.
            </h2>
            <p className="text-ink-light max-w-2xl mx-auto font-medium text-lg">
              We don't just blindly throw AI at every problem. We use our proprietary scanner to find your bottlenecks, then sit down with you to build what actually helps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative z-10">
            {/* Step 1 */}
            <div className="reveal relative bg-surface p-10 rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-300 text-left overflow-hidden group cursor-default">
              {/* Massive Watermark */}
              <div className="absolute -bottom-8 -right-4 text-[140px] font-black text-black/[0.03] leading-none z-0 group-hover:scale-110 group-hover:text-accent/[0.05] transition-all duration-500 font-display">
                1
              </div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white shadow-sm border border-black/5 rounded-2xl flex items-center justify-center mb-8 text-2xl text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <i className="ph-fill ph-magnifying-glass"></i>
                </div>
                <h3 className="font-display text-2xl font-bold text-ink mb-4 tracking-tight group-hover:text-accent transition-colors">The AI Scan</h3>
                <p className="text-ink-light text-sm font-medium leading-relaxed mb-4">
                  You tell the AI what software you use and what your daily tasks look like. 
                </p>
                <p className="text-ink-light text-sm font-medium leading-relaxed">
                  Our system maps your workflow, calculates exactly how many hours you lose to manual data entry, and spits out a custom roadmap highlighting <strong>only</strong> the areas that actually need automation.
                </p>
              </div>
            </div>

            {/* Step 2 (Offset for zig-zag) */}
            <div className="reveal relative bg-surface p-10 rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-300 text-left overflow-hidden group cursor-default md:mt-12" style={{ transitionDelay: '100ms' }}>
              {/* Massive Watermark */}
              <div className="absolute -bottom-8 -right-4 text-[140px] font-black text-black/[0.03] leading-none z-0 group-hover:scale-110 group-hover:text-success/[0.05] transition-all duration-500 font-display">
                2
              </div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white shadow-sm border border-black/5 rounded-2xl flex items-center justify-center mb-8 text-2xl text-success group-hover:bg-success group-hover:text-white transition-colors duration-300">
                  <i className="ph-fill ph-users"></i>
                </div>
                <h3 className="font-display text-2xl font-bold text-ink mb-4 tracking-tight group-hover:text-success transition-colors">Human Strategy</h3>
                <p className="text-ink-light text-sm font-medium leading-relaxed">
                  We review the scan results together in a proper human-to-human meeting. We listen to your goals and decide what makes sense for your specific team.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="reveal relative bg-surface p-10 rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-300 text-left overflow-hidden group cursor-default md:mt-24" style={{ transitionDelay: '200ms' }}>
              {/* Massive Watermark */}
              <div className="absolute -bottom-8 -right-4 text-[140px] font-black text-black/[0.03] leading-none z-0 group-hover:scale-110 group-hover:text-alert/[0.05] transition-all duration-500 font-display">
                3
              </div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white shadow-sm border border-black/5 rounded-2xl flex items-center justify-center mb-8 text-2xl text-alert group-hover:bg-alert group-hover:text-white transition-colors duration-300">
                  <i className="ph-fill ph-crosshair"></i>
                </div>
                <h3 className="font-display text-2xl font-bold text-ink mb-4 tracking-tight group-hover:text-alert transition-colors">Precision Build</h3>
                <p className="text-ink-light text-sm font-medium leading-relaxed">
                  No unnecessary hype. We only build and integrate AI where it is actually required to help you out, ensuring you get maximum ROI without the fluff.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PROOF (Massive Metrics & Trust) */}
      <section id="proof" className="py-20 md:py-28 px-6 bg-[#030014] relative overflow-hidden border-y border-white/10">
        {/* Galaxy Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#030014] via-transparent to-[#030014]"></div>
          {/* Glowing Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none"></div>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-16 reveal">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400 mb-4 block font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
              The Bottom Line
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
              We Turn Operational Chaos into Pure Profit.
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto font-medium text-lg">
              Forget the tech jargon. We don't just sell software—we build automated profit engines. Here is exactly how our systems will increase your revenue.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-8 border-t border-white/10 pt-16">
            {/* Stat 1 */}
            <div className="reveal relative bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] text-left hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]"></div>
              
              <div className="font-display text-5xl lg:text-[5.5rem] font-black text-white leading-none tracking-tighter mb-6 group-hover:scale-105 origin-left transition-transform duration-500">
                -30<span className="text-emerald-400">%</span>
              </div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
                Slash Payroll Waste
              </div>
              <p className="text-gray-300 text-sm font-medium leading-relaxed relative z-10">
                Stop paying employees to do robotic data entry. Save thousands of dollars in payroll every single month by letting AI do the heavy lifting.
              </p>
            </div>

            {/* Stat 2 */}
            <div
              className="reveal relative bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] text-left hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 group"
              style={{ transitionDelay: '100ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]"></div>
              
              <div className="font-display text-5xl lg:text-[5.5rem] font-black text-white leading-none tracking-tighter mb-6 group-hover:scale-105 origin-left transition-transform duration-500">
                3X
              </div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
                More Closed Deals
              </div>
              <p className="text-gray-300 text-sm font-medium leading-relaxed relative z-10">
                Never lose a paying customer to a slow reply again. Instant, automated follow-ups mean you book more calls, close more deals, and cash more checks.
              </p>
            </div>

            {/* Stat 3 */}
            <div
              className="reveal relative bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] text-left hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 group"
              style={{ transitionDelay: '200ms' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]"></div>

              <div className="font-display text-5xl lg:text-[5.5rem] font-black text-white leading-none tracking-tighter mb-6 group-hover:scale-105 origin-left transition-transform duration-500">
                +40<span className="text-indigo-400">%</span>
              </div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">
                Profit Margins
              </div>
              <p className="text-gray-300 text-sm font-medium leading-relaxed relative z-10">
                When you slash operational costs and scale your output without hiring more staff, your profit margins skyrocket. We put cash directly back into your pocket.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - WALL OF LOVE (Modern Marquee) */}
      <section className="py-24 md:py-32 bg-[#030014] relative overflow-hidden border-t border-white/5">
        <div className="max-w-[1200px] mx-auto reveal relative z-10 px-6 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-emerald-400 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-6 shadow-sm">
              <Sparkles size={12} className="text-emerald-400 animate-pulse" />
              Real World Results
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">Don't just take our word for it.</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">See how we're transforming back-office operations and unlocking hours of weekly bandwidth for our partners.</p>
          </div>
        </div>

        {/* Scrolling Marquees */}
        <div 
          className="relative w-full flex flex-col gap-6" 
          style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
        >
          {/* Row 1 (Scrolling Left) */}
          <div className="flex w-max animate-marquee pause-on-hover hover:z-20 relative">
            {[
              { quote: "They took our 15-hour weekly manual data entry process and reduced it to zero. Immediate ROI.", author: "Sarah Jenkins", role: "Ops Director, LogiCorp", img: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
              { quote: "Our AI agent handles 80% of tier-1 support tickets perfectly. It's insane.", author: "Mike T.", role: "VP Success, SendIt", img: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
              { quote: "Constraints-driven integration meant we got ROI in week one.", author: "Elena R.", role: "Partner, LegalTech", img: "https://i.pravatar.cc/150?u=a04258114e29026702d" },
              { quote: "Best operational decision we've made this year. Period.", author: "David C.", role: "CEO, Nexa", img: "https://i.pravatar.cc/150?u=a048581f4e29026701d" },
              { quote: "Saved us $40k/mo in payroll waste.", author: "Amanda Lee", role: "CFO, TechFlow", img: "https://i.pravatar.cc/150?u=a042581f4e29026703d" },
              // Duplicate for infinite scroll
              { quote: "They took our 15-hour weekly manual data entry process and reduced it to zero. Immediate ROI.", author: "Sarah Jenkins", role: "Ops Director, LogiCorp", img: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
              { quote: "Our AI agent handles 80% of tier-1 support tickets perfectly. It's insane.", author: "Mike T.", role: "VP Success, SendIt", img: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
              { quote: "Constraints-driven integration meant we got ROI in week one.", author: "Elena R.", role: "Partner, LegalTech", img: "https://i.pravatar.cc/150?u=a04258114e29026702d" },
              { quote: "Best operational decision we've made this year. Period.", author: "David C.", role: "CEO, Nexa", img: "https://i.pravatar.cc/150?u=a048581f4e29026701d" },
              { quote: "Saved us $40k/mo in payroll waste.", author: "Amanda Lee", role: "CFO, TechFlow", img: "https://i.pravatar.cc/150?u=a042581f4e29026703d" },
            ].map((testimonial, i) => (
              <div
                key={`r1-${i}`}
                className="mx-3 w-[320px] md:w-[400px] shrink-0 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] cursor-default"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-gray-200 text-[15px] leading-relaxed mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.img} alt={testimonial.author} className="w-10 h-10 rounded-full border border-white/20 object-cover" />
                  <div>
                    <div className="text-white font-bold text-sm">{testimonial.author}</div>
                    <div className="text-gray-500 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 (Scrolling Right) */}
          <div className="flex w-max animate-marquee-reverse pause-on-hover hover:z-20 relative">
            {[
              { quote: "We scale without hiring more admin staff. The margins are incredible.", author: "Chris P.", role: "Founder, ScaleUp", img: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
              { quote: "Finally, an AI agency that actually understands business operations.", author: "Rachel K.", role: "COO, RetailPro", img: "https://i.pravatar.cc/150?u=a042581f4e29026706d" },
              { quote: "Lead follow-up is instant. Close rate jumped 30%.", author: "James B.", role: "Head of Sales, Grow", img: "https://i.pravatar.cc/150?u=a042581f4e29026707d" },
              { quote: "The workflow simulator blew my mind. The actual product is even better.", author: "Sophia W.", role: "Director, Media", img: "https://i.pravatar.cc/150?u=a042581f4e29026708d" },
              { quote: "Our CRM is finally clean. We literally do nothing now.", author: "Tom H.", role: "Sales Ops, CloudSy", img: "https://i.pravatar.cc/150?u=a042581f4e29026709d" },
              // Duplicate for infinite scroll
              { quote: "We scale without hiring more admin staff. The margins are incredible.", author: "Chris P.", role: "Founder, ScaleUp", img: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
              { quote: "Finally, an AI agency that actually understands business operations.", author: "Rachel K.", role: "COO, RetailPro", img: "https://i.pravatar.cc/150?u=a042581f4e29026706d" },
              { quote: "Lead follow-up is instant. Close rate jumped 30%.", author: "James B.", role: "Head of Sales, Grow", img: "https://i.pravatar.cc/150?u=a042581f4e29026707d" },
              { quote: "The workflow simulator blew my mind. The actual product is even better.", author: "Sophia W.", role: "Director, Media", img: "https://i.pravatar.cc/150?u=a042581f4e29026708d" },
              { quote: "Our CRM is finally clean. We literally do nothing now.", author: "Tom H.", role: "Sales Ops, CloudSy", img: "https://i.pravatar.cc/150?u=a042581f4e29026709d" },
            ].map((testimonial, i) => (
              <div
                key={`r2-${i}`}
                className="mx-3 w-[320px] md:w-[400px] shrink-0 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] cursor-default"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-gray-200 text-[15px] leading-relaxed mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.img} alt={testimonial.author} className="w-10 h-10 rounded-full border border-white/20 object-cover" />
                  <div>
                    <div className="text-white font-bold text-sm">{testimonial.author}</div>
                    <div className="text-gray-500 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6.5: HOMEPAGE CALL BOOKING */}
      <section className="py-24 md:py-32 px-6 bg-slate-50 border-t border-black/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none z-0"></div>
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left Column - Benefits Pitch */}
          <div className="lg:col-span-6 reveal text-left space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-indigo-600 block font-bold">
              ZERO PRESSURE. 100% FREE.
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-tight">
              Let's see if we're a good fit. <br className="hidden md:block" />
              <span className="text-3xl md:text-4xl text-ink-light font-bold">You have nothing to lose.</span>
            </h2>
            <p className="text-ink-light text-base md:text-lg font-medium leading-relaxed max-w-xl">
              We aren't here to aggressively sell you software you don't need. Book a casual, completely free chat. If nothing else, you'll walk away knowing exactly where your business is bleeding money.
            </p>

            <ul className="space-y-4 pt-4">
              <li className="flex items-start gap-3 text-sm text-ink-light font-medium">
                <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                <span><strong>No pushy sales tactics.</strong> Just an honest look at your workflows.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-ink-light font-medium">
                <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                <span><strong>Free bottleneck mapping.</strong> We'll tell you exactly what's slowing you down.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-ink-light font-medium">
                <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                <span><strong>Total transparency.</strong> If we can't make you money, we will tell you upfront.</span>
              </li>
            </ul>
          </div>

          {/* Right Column - Inline Custom Calendar Booking Card */}
          <div className="lg:col-span-6 reveal w-full" style={{ transitionDelay: '150ms' }}>
            <BookCallWidget source="Homepage Inline Booking" />
          </div>
        </div>
      </section>

      {/* SECTION 7: TRUST BUILDING (Tight & Sleek) */}
      <section className="py-8 bg-slate-950 px-6 border-t border-white/5 relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
        
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 shrink-0 reveal">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white font-bold">
              The Partner Guarantee
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center lg:justify-end gap-x-6 md:gap-x-10 gap-y-3 reveal" style={{ transitionDelay: '100ms' }}>
            {[
              "Fixed Pricing",
              "No Long-Term Contracts",
              "Clear Timelines",
              "Documented Workflows",
              "Total Code Ownership"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 group cursor-default">
                <span className="text-emerald-400 font-bold group-hover:scale-125 transition-transform">✓</span>
                <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
