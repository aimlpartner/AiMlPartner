import React, { useState, useEffect } from 'react';
import { Globe, FileText, UploadCloud, Sparkles, Cpu, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AnalyzerInputProps {
  onAnalyze: (payload: { url?: string; description?: string; fileContent?: string }) => void;
  isLoading: boolean;
}

const ROTATING_MESSAGES = [
  "Connecting to secure proxy scanner...",
  "Scraping public business text and stripping stylesheets...",
  "Formatting unstructured content and removing noise...",
  "Initializing Gemini AI Auditing Engine...",
  "Researching sector-specific competitors via Google Search...",
  "Auditing administrative & shadow operations (missed calls, lead leaks)...",
  "Formulating bespoke post-AI workflows and SaaS tool stacks...",
  "Simulating annual efficiency savings and ROI forecasters...",
  "Compiling corporate data readiness & step-by-step roadmap...",
  "Generating final high-fidelity diagnostic playbook dashboard..."
];

export function AnalyzerInput({ onAnalyze, isLoading }: AnalyzerInputProps) {
  const [activeTab, setActiveTab] = useState<'url' | 'description' | 'file'>('url');
  
  // Inputs state
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  
  // Loading status message rotations
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % ROTATING_MESSAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isLoading]);

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

  // Form handlers
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
      onAnalyze({ url: cleaned });
    } else if (activeTab === 'description') {
      const trimmedDesc = description.trim();
      if (!trimmedDesc || trimmedDesc.length < 20) {
        setError('Please enter a detailed description (at least 20 characters).');
        return;
      }
      if (trimmedDesc.length > 2000) {
        setError('Description exceeds the maximum limit of 2000 characters.');
        return;
      }
      onAnalyze({ description: trimmedDesc });
    } else if (activeTab === 'file') {
      if (!fileContent.trim()) {
        setError('Please upload a text brief or manual first.');
        return;
      }
      onAnalyze({ fileContent: fileContent.trim() });
    }
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError('');
    
    // Strict file size limit: 250 KB
    const MAX_FILE_SIZE = 250 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds the limit of 250 KB. Please upload a smaller text brief.');
      setFileName('');
      setFileContent('');
      return;
    }

    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        setFileContent(text);
      } else {
        setError('Could not parse file content. Please upload plain text, markdown, or CSV briefs.');
      }
    };
    reader.onerror = () => {
      setError('Error reading file. Please try again.');
    };
    
    // Read text/markdown/json files easily
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-4xl mx-auto z-10 relative">
      <AnimatePresence mode="wait">
        {!isLoading ? (
          <motion.div
            key="input-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/80 border border-black/10 shadow-editorial text-ink rounded-3xl overflow-hidden p-8 md:p-12 relative"
          >
            {/* Ambient glows inside card */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full filter blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/3 rounded-full filter blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-alt border border-black/5 text-accent rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-sm">
                  <Sparkles size={12} className="text-accent animate-pulse" />
                  FREE AI DIAGNOSTIC SUITE
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-ink leading-tight">
                  Discover Your Back-Office Automation Potential
                </h2>
                <p className="text-ink-light mt-3 text-base md:text-lg font-medium leading-relaxed">
                  Provide your business context using any channel below. Our constraints-driven auditor maps time leaks and builds an implementation roadmap in under 30 seconds.
                </p>
              </div>

              {/* Error Box */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6 bg-alert/15 border border-alert/20 text-alert rounded-xl p-4 flex items-start gap-3 text-left"
                >
                  <AlertCircle size={18} className="text-alert mt-0.5 shrink-0" />
                  <p className="text-sm font-semibold">{error}</p>
                </motion.div>
              )}

              {/* Tabs Headers */}
              <div className="flex border border-black/10 mb-8 p-1 bg-surface-alt rounded-2xl md:max-w-xl md:mx-auto shadow-inner">
                <button
                  type="button"
                  onClick={() => { setActiveTab('url'); setError(''); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-2 sm:px-4 rounded-xl text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                    activeTab === 'url'
                      ? 'bg-white text-ink border border-black/10 backdrop-blur-md shadow-sm'
                      : 'text-ink-light hover:text-ink'
                  }`}
                >
                  <Globe size={14} className="shrink-0" />
                  <span>Website</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('description'); setError(''); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-2 sm:px-4 rounded-xl text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                    activeTab === 'description'
                      ? 'bg-white text-ink border border-black/10 backdrop-blur-md shadow-sm'
                      : 'text-ink-light hover:text-ink'
                  }`}
                >
                  <FileText size={14} className="shrink-0" />
                  <span>Description</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('file'); setError(''); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-2 sm:px-4 rounded-xl text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                    activeTab === 'file'
                      ? 'bg-white text-ink border border-black/10 backdrop-blur-md shadow-sm'
                      : 'text-ink-light hover:text-ink'
                  }`}
                >
                  <UploadCloud size={14} className="shrink-0" />
                  <span>Upload Brief</span>
                </button>
              </div>

              {/* Active Tab Form Body */}
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                {activeTab === 'url' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <label htmlFor="company-url" className="block text-[10px] font-mono uppercase tracking-widest text-ink-light">
                      Website Domain
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-light group-focus-within:text-accent transition-colors">
                        <Globe size={18} />
                      </div>
                      <input
                        id="company-url"
                        type="text"
                        placeholder="e.g. company.com (no https or www)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 bg-white border border-black/10 rounded-2xl text-ink placeholder:text-ink-lighter focus:outline-none focus:border-accent shadow-inner transition-colors text-base"
                      />
                    </div>
                    <p className="text-xs text-ink-light font-mono mt-1 leading-relaxed">
                      Our system securely performs an operational audit based on your website domain name, using search grounding and scraping.
                    </p>
                  </motion.div>
                )}

                {activeTab === 'description' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <label htmlFor="company-desc" className="block text-[10px] font-mono uppercase tracking-widest text-ink-light">
                      Describe Your Business & Bottlenecks
                    </label>
                    <textarea
                      id="company-desc"
                      rows={6}
                      maxLength={2000}
                      placeholder="Tell us about your team structure, manual tasks that waste hours (like sorting quotes, logging leads, copy-pasting customer records), and current CRM bottlenecks..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="block w-full px-5 py-4 bg-white border border-black/10 rounded-2xl text-ink placeholder:text-ink-lighter focus:outline-none focus:border-accent shadow-inner transition-colors text-base resize-none"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-ink-light mt-1 leading-relaxed">
                      <span>Minimum 20 characters. Share workflow details to improve audit playbooks.</span>
                      <span className={description.length >= 2000 ? "text-alert font-bold" : ""}>{description.length} / 2000 characters</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'file' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-ink-light">
                      Upload Brief / Operational Manual
                    </label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all cursor-pointer ${
                        dragActive 
                          ? 'border-accent bg-accent/5' 
                          : 'border-black/20 hover:border-accent/40 bg-white'
                      }`}
                    >
                      <input
                        type="file"
                        id="file-upload"
                        onChange={handleFileChange}
                        accept=".txt,.md,.json,.csv,.rtf,.js,.ts"
                        className="hidden"
                      />
                      
                      <label htmlFor="file-upload" className="cursor-pointer block">
                        <div className="w-14 h-14 bg-surface-alt border border-black/10 rounded-2xl flex items-center justify-center mx-auto shadow-md mb-4 text-ink-light transition-colors">
                          <UploadCloud size={24} className="text-accent" />
                        </div>
                        <span className="block text-ink font-bold text-base">
                          {fileName ? fileName : 'Drag & Drop brief here'}
                        </span>
                        <span className="block text-ink-light text-xs mt-1.5 font-mono">
                          Supports text briefs, operational manuals, markdown, and CSV formats.
                        </span>
                        {fileName && (
                          <span className="inline-block mt-3 bg-accent/15 text-accent border border-accent/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-mono">
                            Brief Loaded Successfully
                          </span>
                        )}
                      </label>
                    </div>
                  </motion.div>
                )}

                <div className="pt-4 flex justify-center">
                  <button
                    type="submit"
                    className="w-full bg-ink text-white font-bold py-4 rounded-xl hover:bg-accent transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <span>Run AI Operational Audit</span>
                    <ArrowRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-surface-dark border border-white/10 shadow-glass rounded-3xl p-12 md:p-16 text-center text-white overflow-hidden relative min-h-[460px] flex flex-col justify-center items-center backdrop-blur-2xl"
          >
            {/* Glowing neon shapes */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-[100px] pointer-events-none animate-pulse-slow" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-[100px] pointer-events-none animate-pulse-slow" />

            <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
              {/* Spinning Loader */}
              <div className="relative mb-8 flex items-center justify-center">
                <div className="absolute inset-0 w-24 h-24 bg-accent/20 rounded-full filter blur-md animate-ping" />
                <div className="w-20 h-20 border-t-2 border-b-2 border-l-2 border-accent rounded-full animate-spin flex items-center justify-center relative">
                  <Cpu size={28} className="text-accent animate-pulse" />
                </div>
              </div>

              {/* Progress Title */}
              <h3 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-white mb-2">
                Running Operational Audit
              </h3>
              
              <div className="h-6 overflow-hidden w-full relative mb-8 flex justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="text-accent font-mono text-xs md:text-sm tracking-wide"
                  >
                    {ROTATING_MESSAGES[messageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Mock holographic UI visualization lines */}
              <div className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 shadow-inner max-w-sm text-left">
                <div className="flex justify-between text-[9px] font-mono text-white/40 mb-2">
                  <span>ANALYSIS STATUS</span>
                  <span className="text-accent font-bold">PROCESSING</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 30, ease: 'linear' }}
                    className="h-full bg-gradient-to-r from-accent to-blue-300 rounded-full" 
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-white/40">
                  <span>MEMORY FOOTPRINT</span>
                  <span>40,000 CHARS MAX</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
