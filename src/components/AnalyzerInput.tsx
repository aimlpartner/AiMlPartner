import React, { useState, useEffect } from 'react';
import { Globe, FileText, UploadCloud, Sparkles, Cpu, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AnalyzerInputProps {
  onAnalyze: (payload: { url?: string; description?: string; fileContent?: string }) => void;
  isLoading: boolean;
}

const ROTATING_MESSAGES = [
  "Connecting to root domain and discovering internal sitemaps...",
  "Crawling core sub-pages: About, Services, Solutions, and Pricing...",
  "Extracting operational workflows, software stack, and customer touchpoints...",
  "Searching Google in real-time for industry benchmarks & competitive context...",
  "Auditing back-office friction, manual handoffs, and customer response bottlenecks...",
  "Designing custom multi-agent automation playbooks for each department...",
  "Calculating realistic annual ROI, labor savings, and weekly time reclamation...",
  "Compiling comprehensive enterprise AI diagnostic report..."
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
        setError('Please enter a website domain.');
        return;
      }
      if (!isValidDomain(cleaned)) {
        setError('Please enter a valid domain (e.g. yourcompany.com). Do not include https:// or www.');
        return;
      }
      onAnalyze({ url: cleaned });
    } else if (activeTab === 'description') {
      const trimmedDesc = description.trim();
      if (!trimmedDesc || trimmedDesc.length < 20) {
        setError('Please enter at least 20 characters describing your business operations.');
        return;
      }
      if (trimmedDesc.length > 2000) {
        setError('Description exceeds the maximum limit of 2000 characters.');
        return;
      }
      onAnalyze({ description: trimmedDesc });
    } else if (activeTab === 'file') {
      if (!fileContent.trim()) {
        setError('Please upload a text brief or operational document first.');
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
    
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-3xl mx-auto z-10 relative">
      <AnimatePresence mode="wait">
        {!isLoading ? (
          <motion.div
            key="input-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-zinc-950/90 border border-zinc-800 shadow-2xl backdrop-blur-2xl text-white rounded-3xl p-6 sm:p-10 relative"
          >
            {/* Ambient amber glow inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5500]/5 rounded-full filter blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-mono font-bold text-[#FF5500] uppercase tracking-widest block mb-2">
                  // CHOOSE YOUR AUDIT INPUT METHOD
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Start Your Operational Diagnostic
                </h2>
              </div>

              {/* Error Box */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6 bg-red-950/60 border border-red-800/80 text-red-200 rounded-xl p-4 flex items-start gap-3 text-left"
                >
                  <AlertCircle size={18} className="text-red-400 mt-0.5 shrink-0" />
                  <p className="text-sm font-semibold">{error}</p>
                </motion.div>
              )}

              {/* Tabs Headers */}
              <div className="flex border border-zinc-800 mb-8 p-1.5 bg-black rounded-2xl md:max-w-md md:mx-auto">
                <button
                  type="button"
                  onClick={() => { setActiveTab('url'); setError(''); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                    activeTab === 'url'
                      ? 'bg-[#FF5500] text-black shadow-us-pop'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Globe size={14} className="shrink-0" />
                  <span>Website</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('description'); setError(''); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                    activeTab === 'description'
                      ? 'bg-[#FF5500] text-black shadow-us-pop'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <FileText size={14} className="shrink-0" />
                  <span>Description</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('file'); setError(''); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                    activeTab === 'file'
                      ? 'bg-[#FF5500] text-black shadow-us-pop'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
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
                    <label htmlFor="company-url" className="block text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                      Website Domain
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#FF5500] transition-colors">
                        <Globe size={18} />
                      </div>
                      <input
                        id="company-url"
                        type="text"
                        placeholder="e.g. company.com (no https:// or www)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 bg-black border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5500] transition-colors text-base"
                      />
                    </div>
                    <p className="text-xs text-zinc-500 font-mono mt-1">
                      Our system securely scrapes public pages to identify workflows and bottlenecks.
                    </p>
                  </motion.div>
                )}

                {activeTab === 'description' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <label htmlFor="company-desc" className="block text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                      Describe Your Team & Workflow Bottlenecks
                    </label>
                    <textarea
                      id="company-desc"
                      rows={5}
                      maxLength={2000}
                      placeholder="Tell us about your team size, manual tasks that waste time (e.g. manual invoicing, qualification emails, copy-pasting CRM data), and current bottlenecks..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="block w-full px-4 py-4 bg-black border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF5500] transition-colors text-base resize-none"
                    />
                    <div className="flex justify-between text-xs font-mono text-zinc-500 mt-1">
                      <span>Minimum 20 characters.</span>
                      <span className={description.length >= 2000 ? "text-[#FF5500] font-bold" : ""}>{description.length} / 2000</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'file' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                      Upload Brief / Operational Manual
                    </label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                        dragActive 
                          ? 'border-[#FF5500] bg-[#FF5500]/5' 
                          : 'border-zinc-800 hover:border-[#FF5500]/60 bg-black'
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
                        <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-3 text-zinc-400">
                          <UploadCloud size={22} className="text-[#FF5500]" />
                        </div>
                        <span className="block text-white font-bold text-sm">
                          {fileName ? fileName : 'Drag & Drop text brief here, or browse'}
                        </span>
                        <span className="block text-zinc-500 text-xs mt-1 font-mono">
                          Supports text, markdown, and CSV formats (Max 250KB)
                        </span>
                        {fileName && (
                          <span className="inline-block mt-3 bg-[#FF5500]/10 text-[#FF5500] border border-[#FF5500]/30 px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider font-mono">
                            Brief Loaded Successfully
                          </span>
                        )}
                      </label>
                    </div>
                  </motion.div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-extrabold py-4 rounded-xl transition-all shadow-us-pop hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
                  >
                    <span>Run AI Operational Audit</span>
                    <ArrowRight size={16} />
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
            className="bg-zinc-950 border border-zinc-800 shadow-2xl rounded-3xl p-10 md:p-14 text-center text-white overflow-hidden relative min-h-[420px] flex flex-col justify-center items-center"
          >
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#FF5500]/10 rounded-full filter blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
              {/* Spinner */}
              <div className="relative mb-6 flex items-center justify-center">
                <div className="absolute inset-0 w-20 h-20 bg-[#FF5500]/20 rounded-full filter blur-md animate-ping" />
                <div className="w-16 h-16 border-2 border-t-[#FF5500] border-r-transparent border-b-[#FF5500] border-l-transparent rounded-full animate-spin flex items-center justify-center relative">
                  <Cpu size={24} className="text-[#FF5500] animate-pulse" />
                </div>
              </div>

              {/* Progress Title */}
              <h3 className="text-2xl font-black text-white mb-3">
                Crawling & Auditing Workflows...
              </h3>
              
              <div className="h-10 overflow-hidden w-full relative mb-6 flex justify-center items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#FF5500] font-mono text-xs tracking-wide text-center"
                  >
                    {ROTATING_MESSAGES[messageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress visual */}
              <div className="w-full bg-black border border-zinc-800 rounded-xl p-4 max-w-sm text-left">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400 mb-2">
                  <span>AUDIT PROGRESS</span>
                  <span className="text-[#FF5500] font-bold">ANALYZING</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 30, ease: 'linear' }}
                    className="h-full bg-[#FF5500] rounded-full" 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
