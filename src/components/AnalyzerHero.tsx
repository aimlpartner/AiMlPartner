import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Globe, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AnalyzerHero() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'url' | 'description'>('url');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (activeTab === 'url') {
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
    } else {
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
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-slate-950 text-white">
      {/* Background Image: Deep Space / Starry Sky (Cinematic & Natural) */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80&w=2000" 
          alt="Cosmic Night Sky" 
          className="w-full h-full object-cover opacity-60" 
        />
        {/* Soft natural vignette/gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/20 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950" />
      </div>

      <div className="container-max relative z-10 w-full max-w-3xl mx-auto px-4 text-center space-y-12">
        
        {/* Centered Hook Text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <span className="text-xs font-mono text-slate-400 tracking-[0.25em] uppercase block">
            Operational Audit Engine
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-tight font-sans">
            Do you want to know how <br className="hidden sm:inline" />
            <span className="font-semibold text-sky-300">AI agents</span> can increase your business ROI?
          </h1>
          
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl mx-auto">
            You can figure it out in less than 30 seconds. Scan your site or outline a bottleneck below to run your diagnostic report.
          </p>
        </motion.div>

        {/* Minimalist Glassmorphic Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl mx-auto"
        >
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative">
            <div className="space-y-6">
              
              {/* Clean Text-based Tab Toggle */}
              <div className="flex justify-center border-b border-white/10 pb-1.5 gap-8">
                <button
                  type="button"
                  onClick={() => { setActiveTab('url'); setError(''); }}
                  className={`relative py-1 text-xs uppercase tracking-wider font-semibold transition-colors duration-200 ${
                    activeTab === 'url' ? 'text-sky-300' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Website Scan
                  {activeTab === 'url' && (
                    <motion.div 
                      layoutId="activeTabUnderline" 
                      className="absolute bottom-[-7px] left-0 right-0 h-[2px] bg-sky-300"
                    />
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => { setActiveTab('description'); setError(''); }}
                  className={`relative py-1 text-xs uppercase tracking-wider font-semibold transition-colors duration-200 ${
                    activeTab === 'description' ? 'text-sky-300' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Workflow Bottleneck
                  {activeTab === 'description' && (
                    <motion.div 
                      layoutId="activeTabUnderline" 
                      className="absolute bottom-[-7px] left-0 right-0 h-[2px] bg-sky-300"
                    />
                  )}
                </button>
              </div>

              {/* Error Notice */}
              {error && (
                <div className="bg-rose-950/30 border border-rose-500/20 text-rose-300 text-xs py-2 px-3 rounded-lg text-left">
                  {error}
                </div>
              )}

              {/* Input & Form */}
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <AnimatePresence mode="wait">
                  {activeTab === 'url' ? (
                    <motion.div
                      key="url-tab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-1.5"
                    >
                      <label htmlFor="url-input" className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                        Website Domain
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <Globe size={15} />
                        </div>
                        <input
                          id="url-input"
                          type="text"
                          placeholder="e.g. company.com (no https or www)"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="block w-full pl-10 pr-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-300 transition-colors text-sm"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="desc-tab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-1.5"
                    >
                      <label htmlFor="desc-input" className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                        Outline a Manual Process or Friction Point
                      </label>
                      <textarea
                        id="desc-input"
                        rows={3}
                        placeholder="e.g. Sales representatives manually search LinkedIn for lead data and sync records..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full px-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-300 transition-colors text-sm resize-none"
                      />
                      <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                        <span>Min 20 characters</span>
                        <span>{description.length}/2000</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white text-slate-950 font-semibold text-sm rounded-xl py-3.5 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span>Launch AI Audit</span>
                  <ArrowRight size={15} />
                </button>
              </form>

              <div className="flex items-center justify-center text-[10px] text-slate-500 font-mono">
                <span>Free Operational Analysis • Instant Diagnostic Report</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
