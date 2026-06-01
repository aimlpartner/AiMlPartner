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

  // Form handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (activeTab === 'url') {
      if (!url.trim()) {
        setError('Please enter a website URL.');
        return;
      }
      onAnalyze({ url: url.trim() });
    } else if (activeTab === 'description') {
      if (!description.trim() || description.trim().length < 20) {
        setError('Please enter a detailed description (at least 20 characters).');
        return;
      }
      onAnalyze({ description: description.trim() });
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
    <div className="w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!isLoading ? (
          <motion.div
            key="input-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-2xl rounded-3xl overflow-hidden p-8 md:p-12 relative"
          >
            {/* Ambient glows inside card */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/20 rounded-full filter blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100/20 rounded-full filter blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 border border-sky-100 text-sky-700 rounded-full text-xs font-mono mb-4">
                  <Sparkles size={12} className="text-sky-500" />
                  FREE AI DIAGNOSTIC SUITE
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
                  Discover Your Back-Office Automation Potential
                </h2>
                <p className="text-slate-500 mt-3 text-base md:text-lg font-light leading-relaxed">
                  Provide your business context using any channel below. Our constraints-driven auditor maps time leaks and builds an implementation roadmap in under 30 seconds.
                </p>
              </div>

              {/* Error Box */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl p-4 flex items-start gap-3"
                >
                  <AlertCircle size={18} className="text-rose-500 mt-0.5 shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </motion.div>
              )}

              {/* Tabs Headers */}
              <div className="flex border-b border-slate-100 mb-8 p-1 bg-slate-100/80 rounded-2xl md:max-w-xl md:mx-auto">
                <button
                  type="button"
                  onClick={() => { setActiveTab('url'); setError(''); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'url'
                      ? 'bg-white text-sky-600 shadow-md shadow-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Globe size={16} />
                  <span>Website URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('description'); setError(''); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'description'
                      ? 'bg-white text-sky-600 shadow-md shadow-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText size={16} />
                  <span>Description</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('file'); setError(''); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'file'
                      ? 'bg-white text-sky-600 shadow-md shadow-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UploadCloud size={16} />
                  <span>Upload Brief</span>
                </button>
              </div>

              {/* Active Tab Form Body */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {activeTab === 'url' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <label htmlFor="company-url" className="block text-sm font-medium text-slate-700">
                      Company Website
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-sky-500 transition-colors">
                        <Globe size={18} />
                      </div>
                      <input
                        id="company-url"
                        type="text"
                        placeholder="e.g. aimlpartner.com or acmecorp.net"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-sm transition-all text-base"
                      />
                    </div>
                    <p className="text-xs text-slate-400 font-light mt-1">
                      Our system securely scrapes visible web pages, stripping script and tags to fetch pure context up to 40,000 characters.
                    </p>
                  </motion.div>
                )}

                {activeTab === 'description' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <label htmlFor="company-desc" className="block text-sm font-medium text-slate-700">
                      Describe Your Business & Bottlenecks
                    </label>
                    <textarea
                      id="company-desc"
                      rows={6}
                      placeholder="Tell us about your team structure, manual tasks that waste hours (like sorting quotes, logging leads, copy-pasting customer records), and current CRM bottlenecks..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="block w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-sm transition-all text-base resize-none"
                    />
                    <p className="text-xs text-slate-400 font-light mt-1">
                      Minimum 20 characters. The more specific details you share about workflows, the higher the fidelity of the generated playbooks.
                    </p>
                  </motion.div>
                )}

                {activeTab === 'file' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-slate-700">
                      Upload Brief / Operational Manual
                    </label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all cursor-pointer ${
                        dragActive 
                          ? 'border-sky-500 bg-sky-50/50' 
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
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
                        <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center mx-auto shadow-md shadow-slate-200/50 mb-4 text-slate-400 group-hover:text-sky-500 transition-colors">
                          <UploadCloud size={28} className="text-sky-500" />
                        </div>
                        <span className="block text-slate-800 font-semibold text-base">
                          {fileName ? fileName : 'Drag & Drop brief here'}
                        </span>
                        <span className="block text-slate-400 text-xs mt-1.5 font-light">
                          Supports text briefs, operational manuals, markdown, and CSV formats.
                        </span>
                        {fileName && (
                          <span className="inline-block mt-3 bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1 rounded-full text-xs font-medium">
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
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-full px-10 py-4 font-semibold text-base hover:from-sky-600 hover:to-sky-700 transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 cursor-pointer"
                  >
                    <span>Run AI Operational Audit</span>
                    <ArrowRight size={18} />
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
            className="bg-slate-900 border border-slate-800 shadow-2xl rounded-3xl p-12 md:p-16 text-center text-white overflow-hidden relative min-h-[460px] flex flex-col justify-center items-center"
          >
            {/* Glowing neon shapes */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/20 rounded-full filter blur-[100px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-[100px] pointer-events-none animate-pulse" />

            <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
              {/* Spinning Loader */}
              <div className="relative mb-8 flex items-center justify-center">
                <div className="absolute inset-0 w-24 h-24 bg-sky-500/20 rounded-full filter blur-md animate-ping" />
                <div className="w-20 h-20 border-t-2 border-b-2 border-l-2 border-sky-400 rounded-full animate-spin flex items-center justify-center relative">
                  <Cpu size={28} className="text-sky-300 animate-pulse" />
                </div>
              </div>

              {/* Progress Title */}
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2">
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
                    className="text-sky-300/80 font-mono text-xs md:text-sm tracking-wide"
                  >
                    {ROTATING_MESSAGES[messageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Mock holographic UI visualization lines */}
              <div className="w-full bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 space-y-2 max-w-sm">
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>ANALYSIS STATUS</span>
                  <span className="text-sky-400">PROCESSING</span>
                </div>
                <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 30, ease: 'linear' }}
                    className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full" 
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
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
