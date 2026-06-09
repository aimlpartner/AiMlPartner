import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkflowSimulator } from '../components/WorkflowSimulator';
import { BookCallWidget } from '../components/BookCallWidget';

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
    <div className="relative overflow-x-hidden min-h-screen">
      {/* Texture Overlays */}
      <div className="grain-overlay"></div>
      <div className="absolute inset-0 bg-architectural-grid opacity-50 pointer-events-none -z-10 h-full"></div>

      {/* SECTION 1: IMMERSIVE SPACE HERO */}
      <section id="audit" className="relative pt-40 pb-32 lg:pt-56 lg:pb-48 px-6 overflow-hidden">
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

        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left Content: Typography over Dark Space */}
          <div className="lg:col-span-7 reveal">
            <div className="flex items-center gap-3 mb-8 bg-white/10 backdrop-blur-md w-fit px-3 py-1.5 rounded-full border border-white/20 shadow-glow">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse-slow"></div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white font-semibold">
                AI Workforce Partner
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-extrabold tracking-tighter leading-[1.05] text-white mb-8 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
              Your Team Is Busy. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-300 italic font-medium pr-2">
                Your Systems
              </span>{' '}
              Shouldn’t Be.
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-xl font-medium leading-relaxed">
              We help growing businesses automate repetitive work, improve customer experience, and build practical AI workflows that save time and increase productivity.
            </p>
          </div>

          {/* Right Content: The Glass Audit Tool floating in space */}
          <div className="lg:col-span-5 w-full reveal" style={{ transitionDelay: '200ms' }}>
            <div className="relative bg-surface-glassDark backdrop-blur-2xl p-2.5 rounded-3xl shadow-glass border border-white/20 animate-float-slow group overflow-hidden">
              {/* Decorative Application Header */}
              <div className="flex items-center px-4 pt-3 pb-3 mb-1 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-alert/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-success/80"></div>
                </div>
              </div>

              {/* Tabs Minimal (Dark Mode for Glass) */}
              <div className="flex p-1.5 bg-black/40 rounded-2xl mb-4 relative z-10 mx-2 mt-4 shadow-inner">
                <div
                  className={`absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] bg-white/10 rounded-xl shadow-sm transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) z-0 border border-white/10 backdrop-blur-md ${
                    activeTab === 'workflow' ? 'translate-x-[calc(100%+6px)]' : 'translate-x-0'
                  }`}
                ></div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('website');
                    setError('');
                  }}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider relative z-10 transition-colors duration-300 ${
                    activeTab === 'website' ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  Website Scan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('workflow');
                    setError('');
                  }}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider relative z-10 transition-colors duration-300 ${
                    activeTab === 'workflow' ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  Manual Workflow
                </button>
              </div>

              {/* Error Notice */}
              {error && (
                <div className="mx-2 mb-4 bg-alert/15 border border-alert/20 text-alert-soft text-xs py-2.5 px-4 rounded-xl">
                  {error}
                </div>
              )}

              {/* Input Area (Responsive Grid Stack) */}
              <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2 grid relative">
                {/* Website */}
                <form
                  onSubmit={handleWebsiteSubmit}
                  className={`col-start-1 row-start-1 transition-all duration-500 w-full ${
                    activeTab === 'website'
                      ? 'opacity-100 translate-x-0 z-10 pointer-events-auto'
                      : 'opacity-0 translate-x-[-20px] z-0 pointer-events-none'
                  }`}
                >
                  <label className="block font-mono text-[10px] uppercase text-white/60 mb-2 tracking-[0.2em] font-semibold">
                    Website Domain
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. company.com (no https or www)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 md:py-4 text-base md:text-lg font-display text-white placeholder-white/30 mb-4 focus:border-accent focus:bg-black/50 transition-all shadow-inner outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-ink font-bold py-3 md:py-4 rounded-xl hover:bg-surface-alt transition-all flex items-center justify-center gap-2 group/btn shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
                  >
                    Get Your AI Opportunity Report{' '}
                    <i className="ph-bold ph-arrow-right group-hover/btn:translate-x-1 transition-transform"></i>
                  </button>
                </form>

                {/* Workflow */}
                <form
                  onSubmit={handleWorkflowSubmit}
                  className={`col-start-1 row-start-1 transition-all duration-500 w-full ${
                    activeTab === 'workflow'
                      ? 'opacity-100 translate-x-0 z-10 pointer-events-auto'
                      : 'opacity-0 translate-x-[20px] z-0 pointer-events-none'
                  }`}
                >
                  <label className="block font-mono text-[10px] uppercase text-white/60 mb-2 tracking-[0.2em] font-semibold">
                    Friction Point Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g., We spend 10 hrs/week moving data from HubSpot..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-sm font-display text-white placeholder-white/30 resize-none mb-4 focus:border-accent focus:bg-black/50 transition-all shadow-inner outline-none"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-accent text-white font-bold py-3 md:py-4 rounded-xl hover:bg-accent-hover transition-all flex items-center justify-center gap-2 group/btn shadow-glow cursor-pointer"
                  >
                    Get Your AI Opportunity Report{' '}
                    <i className="ph-bold ph-arrow-right group-hover/btn:translate-x-1 transition-transform"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROBLEM & SOLUTION (Asymmetric Bento Grid - Light Theme) */}
      <section id="bottlenecks" className="py-24 md:py-32 px-6 relative z-10 -mt-10 bg-surface rounded-t-[3rem]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal pt-10">
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block font-bold">
                Common Business Problems
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.1]">
                Do any of these <br className="hidden md:block" />
                sound familiar?
              </h2>
            </div>
            <p className="text-ink-light max-w-md font-medium leading-relaxed pb-2">
              The market doesn't trust another AI consultant. We help growing businesses solve painful workflow problems directly, eliminate repetitive work, and build a digital workforce.
            </p>
          </div>

          {/* Bento Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Large Feature Card */}
            <div className="md:col-span-8 bg-white border border-black/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between tangible-card reveal shadow-editorial">
              <div className="grid md:grid-cols-2 gap-8 h-full">
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-alert font-bold mb-6 bg-alert-soft px-2.5 py-1.5 rounded-md border border-alert-border/50">
                      <i className="ph-fill ph-warning-circle text-sm"></i> The Friction
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-4 tracking-tight">
                      Leads go unanswered & customer inquiries pile up
                    </h3>
                    <p className="text-ink-light text-sm leading-relaxed">
                      Inquiries sit in shared inboxes or contact forms for hours, while team members are busy. Prospects move on to competitors before anyone responds.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-between relative">
                  <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent -ml-4"></div>
                  <div className="pt-6 md:pt-0">
                    <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-success font-bold mb-6 bg-success-soft px-2.5 py-1.5 rounded-md border border-success-border/50">
                      <i className="ph-fill ph-cpu text-sm"></i> The Solution
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-4 tracking-tight">
                      Instant Automated Response & Triage
                    </h3>
                    <p className="text-ink-light text-sm leading-relaxed">
                      AI workflows instantly qualify incoming leads, sync them with your database, and route high-value prospects to the right team members.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Card (Dark with Space overlay) */}
            <div
              className="md:col-span-4 bg-ink text-surface rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden tangible-card reveal shadow-editorial"
              style={{ transitionDelay: '100ms' }}
            >
              {/* Space Nebula Background */}
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
                className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen pointer-events-none"
                alt="Cosmic Data Infrastructure"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent pointer-events-none"></div>

              <div className="relative z-10 mb-12">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-4 block font-bold">
                  The Friction
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 leading-tight text-white tracking-tight">
                  Employees repeat the same manual tasks
                </h3>
                <p className="text-surface-alt/70 text-sm leading-relaxed">
                  Team members waste hours copy-pasting data, sending repetitive email templates, and performing routine data entry across multiple apps, causing inconsistent productivity.
                </p>
              </div>

              <div className="relative z-10 bg-white/10 rounded-xl p-5 border border-white/10 backdrop-blur-md mt-auto shadow-inner">
                <div className="flex items-center gap-2 text-success bg-white w-fit px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider mb-3 rounded shadow-sm">
                  <i className="ph-fill ph-lightning"></i> The Solution
                </div>
                <p className="text-sm text-white/90 font-medium leading-relaxed">
                  Automate document generation, email sorting, and task handoffs so your team can focus on client-facing work.
                </p>
              </div>
            </div>

            {/* Wide Horizontal Card */}
            <div
              className="md:col-span-12 bg-white border border-black/5 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 tangible-card reveal shadow-editorial"
              style={{ transitionDelay: '200ms' }}
            >
              <div className="md:w-[45%]">
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-alert font-bold mb-4 bg-alert-soft px-2.5 py-1.5 rounded-md border border-alert-border/50">
                  <i className="ph-fill ph-database text-sm"></i> The Friction
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 tracking-tight">
                  Information lives in multiple systems & CRM data is outdated
                </h3>
                <p className="text-ink-light text-sm leading-relaxed">
                  Customer info, operational data, and task lists are scattered across different platforms with no single source of truth, making processes depend entirely on specific employees.
                </p>
              </div>

              <div className="hidden md:flex w-12 h-12 rounded-full bg-surface-alt shadow-inner border border-black/5 items-center justify-center shrink-0 z-10 relative">
                <i className="ph-bold ph-arrow-right text-ink-light text-lg"></i>
                <div className="absolute w-24 h-px bg-gradient-to-r from-transparent to-black/10 right-full top-1/2"></div>
                <div className="absolute w-24 h-px bg-gradient-to-l from-transparent to-black/10 left-full top-1/2"></div>
              </div>

              <div className="md:w-[45%]">
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-success font-bold mb-4 bg-success-soft px-2.5 py-1.5 rounded-md border border-success-border/50">
                  <i className="ph-fill ph-arrows-clockwise text-sm"></i> The Solution
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 tracking-tight">
                  System-Wide Synchronization
                </h3>
                <p className="text-ink-light text-sm leading-relaxed">
                  Sync data automatically between your CRM, email, and internal databases so information is always clean, compliant, and up-to-date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SHOWCASE (Visual Workflow) */}
      <section id="showcase" className="py-24 md:py-32 px-6 border-y border-black/5 relative overflow-hidden bg-white">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 reveal">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold mb-4 block">
              Visualized Workflow
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-6 text-ink tracking-tight">
              See value extracted in real-time.
            </h2>
            <p className="text-ink-light text-lg leading-relaxed font-medium">
              AI doesn't have to be a black box. Our agents interpret messy, unstructured data and translate
              it into clean records automatically.
            </p>
          </div>

          {/* The Visual Diagram (Interactive Simulation Console) */}
          <div className="reveal">
            <WorkflowSimulator />
          </div>

          <div className="mt-12 text-center">
            <a
              href="#audit"
              className="inline-flex items-center gap-2 px-8 py-4 bg-ink text-surface font-semibold text-sm hover:bg-accent hover:text-white transition-all duration-300 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Design Your Agent Flow <i className="ph-bold ph-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 3: OFFERINGS (Interactive Gallery with Space/Tech imagery) */}
      <section id="offerings" className="py-24 md:py-32 px-6 flowing-gradient border-y border-black/5 relative">
        <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none z-0"></div>
        <div className="max-w-[1000px] mx-auto relative z-10">
          <div className="mb-16 reveal text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block font-bold">
              Capabilities
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink">
              What We Help Automate
            </h2>
            <p className="text-ink-light mt-6 max-w-2xl mx-auto font-medium text-lg">
              We help growing businesses eliminate repetitive work and build a digital workforce.
            </p>
          </div>

          <div className="relative z-10 space-y-4" id="offering-list">
            {/* Row 01 */}
            <div className="offering-row block border border-black/10 bg-white/60 backdrop-blur-md rounded-2xl py-8 px-6 md:px-10 reveal group cursor-pointer shadow-sm hover:shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center text-left">
                <div className="md:col-span-1 font-mono text-sm text-ink-lighter font-bold">01/</div>
                <div className="md:col-span-3">
                  <h3 className="font-display text-2xl font-bold text-ink group-hover:text-accent transition-colors tracking-tight">
                    Sales & CRM Workflows
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-ink-light text-sm leading-relaxed font-medium group-hover:text-ink transition-colors">
                    Automate lead research, data enrichment, CRM cleanup, and real-time database updates to eliminate manual entry.
                  </p>
                </div>
                <div className="md:col-span-1 flex justify-start md:justify-end mt-4 md:mt-0">
                  <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                    <i className="ph-bold ph-arrow-right arrow-icon"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 02 */}
            <div
              className="offering-row block border border-black/10 bg-white/60 backdrop-blur-md rounded-2xl py-8 px-6 md:px-10 reveal group cursor-pointer shadow-sm hover:shadow-md"
              style={{ transitionDelay: '50ms' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center text-left">
                <div className="md:col-span-1 font-mono text-sm text-ink-lighter font-bold">02/</div>
                <div className="md:col-span-3">
                  <h3 className="font-display text-2xl font-bold text-ink group-hover:text-accent transition-colors tracking-tight">
                    Marketing & Outreach
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-ink-light text-sm leading-relaxed font-medium group-hover:text-ink transition-colors">
                    Speed up lead responses with auto-generated proposals, email triage, and automated follow-up sequences.
                  </p>
                </div>
                <div className="md:col-span-1 flex justify-start md:justify-end mt-4 md:mt-0">
                  <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                    <i className="ph-bold ph-arrow-right arrow-icon"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 03 */}
            <div
              className="offering-row block border border-black/10 bg-white/60 backdrop-blur-md rounded-2xl py-8 px-6 md:px-10 reveal group cursor-pointer shadow-sm hover:shadow-md"
              style={{ transitionDelay: '100ms' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center text-left">
                <div className="md:col-span-1 font-mono text-sm text-ink-lighter font-bold">03/</div>
                <div className="md:col-span-3">
                  <h3 className="font-display text-2xl font-bold text-ink group-hover:text-accent transition-colors tracking-tight">
                    Customer Experience
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-ink-light text-sm leading-relaxed font-medium group-hover:text-ink transition-colors">
                    Streamline client onboarding, coordinate appointment reminders, and deploy interactive knowledge assistants.
                  </p>
                </div>
                <div className="md:col-span-1 flex justify-start md:justify-end mt-4 md:mt-0">
                  <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                    <i className="ph-bold ph-arrow-right arrow-icon"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 04 */}
            <div
              className="offering-row block border border-black/10 bg-white/60 backdrop-blur-md rounded-2xl py-8 px-6 md:px-10 reveal group cursor-pointer shadow-sm hover:shadow-md"
              style={{ transitionDelay: '150ms' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center text-left">
                <div className="md:col-span-1 font-mono text-sm text-ink-lighter font-bold">04/</div>
                <div className="md:col-span-3">
                  <h3 className="font-display text-2xl font-bold text-ink group-hover:text-accent transition-colors tracking-tight">
                    Operations & Support
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-ink-light text-sm leading-relaxed font-medium group-hover:text-ink transition-colors">
                    Automate reporting, structure internal knowledge bases, and coordinate repetitive back-office operations.
                  </p>
                </div>
                <div className="md:col-span-1 flex justify-start md:justify-end mt-4 md:mt-0">
                  <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                    <i className="ph-bold ph-arrow-right arrow-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PROOF (Massive Metrics) */}
      <section id="proof" className="py-24 md:py-32 px-6 bg-surface-alt/40 border-y border-black/5 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-20 reveal">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block font-bold">
              Typical Results
            </span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-ink">
              Practical, Measurable Outcomes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 border-t border-black/5 pt-16">
            {/* Stat 1 */}
            <div className="reveal relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white shadow-editorial tangible-card text-left">
              <div className="font-display text-6xl lg:text-[6rem] font-black text-ink leading-none tracking-tighter mb-6">
                20-40<span className="text-accent">%</span>
              </div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent mb-3">
                Repetitive Work Reduced
              </div>
              <p className="text-ink-light text-sm font-medium leading-relaxed">
                Free your team from tedious data copy-pasting, admin overhead, and manual follow-ups with standardized processes.
              </p>
            </div>

            {/* Stat 2 */}
            <div
              className="reveal relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white shadow-editorial tangible-card text-left"
              style={{ transitionDelay: '100ms' }}
            >
              <div className="font-display text-6xl lg:text-[6rem] font-black text-ink leading-none tracking-tighter mb-6">
                Instant
              </div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent mb-3">
                Lead Response & Routing
              </div>
              <p className="text-ink-light text-sm font-medium leading-relaxed">
                Respond to leads significantly faster. Auto-qualify contacts and route high-value accounts instantly.
              </p>
            </div>

            {/* Stat 3 */}
            <div
              className="reveal relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white shadow-editorial tangible-card text-left"
              style={{ transitionDelay: '200ms' }}
            >
              <div className="font-display text-6xl lg:text-[6rem] font-black text-ink leading-none tracking-tighter mb-6">
                100<span className="text-accent">%</span>
              </div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent mb-3">
                CRM Data & Adoption
              </div>
              <p className="text-ink-light text-sm font-medium leading-relaxed">
                Improve CRM accuracy and system hygiene. Minimize employee onboarding times and scale with digital systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: PROCESS (Architectural Timeline) */}
      <section id="process" className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 reveal text-left">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4 block font-bold">
              How It Works
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink max-w-2xl">
              Our Onboarding Process
            </h2>
          </div>

          <div className="relative">
            {/* The continuous line */}
            <div className="hidden lg:block absolute top-0 bottom-0 left-[27px] w-px bg-gradient-to-b from-black/10 via-black/10 to-transparent z-0"></div>

            <div className="space-y-12 lg:space-y-20 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start reveal group text-left">
                <div className="w-14 h-14 bg-ink text-white rounded-full font-display text-lg font-bold flex items-center justify-center shrink-0 shadow-md group-hover:bg-accent transition-all duration-500">
                  1
                </div>
                <div className="lg:pt-2 max-w-2xl">
                  <h3 className="font-display text-2xl font-bold mb-3 tracking-tight">
                    Business Assessment
                  </h3>
                  <p className="text-ink-light font-medium leading-relaxed text-sm">
                    Complete our 15-minute Intake Form. We analyze your company size, current tech stack, biggest challenges, and organizational goals to prepare our analysis.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start reveal group text-left">
                <div className="w-14 h-14 bg-white border border-black/10 rounded-full text-ink font-display text-lg font-bold flex items-center justify-center shrink-0 group-hover:border-accent group-hover:text-accent group-hover:shadow-md transition-all duration-500 bg-surface-glass backdrop-blur-sm">
                  2
                </div>
                <div className="lg:pt-2 max-w-2xl">
                  <h3 className="font-display text-2xl font-bold mb-3 tracking-tight">
                    Discovery Session
                  </h3>
                  <p className="text-ink-light font-medium leading-relaxed text-sm">
                    Join us for a 60-90 minute deep-dive. We map your current manual workflows, locate bottlenecks, and identify high-value automation opportunities.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start reveal group text-left">
                <div className="w-14 h-14 bg-white border border-black/10 rounded-full text-ink font-display text-lg font-bold flex items-center justify-center shrink-0 group-hover:border-accent group-hover:text-accent group-hover:shadow-md transition-all duration-500 bg-surface-glass backdrop-blur-sm">
                  3
                </div>
                <div className="lg:pt-2 max-w-2xl">
                  <h3 className="font-display text-2xl font-bold mb-3 tracking-tight">
                    Opportunity Report
                  </h3>
                  <p className="text-ink-light font-medium leading-relaxed text-sm">
                    Receive your priority scorecard and a recommended roadmap mapping out top opportunities, expected ROI, and implementation paths.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start reveal group text-left">
                <div className="w-14 h-14 bg-white border border-black/10 rounded-full text-ink font-display text-lg font-bold flex items-center justify-center shrink-0 group-hover:border-accent group-hover:text-accent group-hover:shadow-md transition-all duration-500 bg-surface-glass backdrop-blur-sm">
                  4
                </div>
                <div className="lg:pt-2 max-w-2xl">
                  <h3 className="font-display text-2xl font-bold mb-3 tracking-tight">
                    Implementation
                  </h3>
                  <p className="text-ink-light font-medium leading-relaxed text-sm">
                    We design and build workflows, check progress with weekly updates, compile system documentation, and run user training sessions.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start reveal group text-left">
                <div className="w-14 h-14 bg-white border border-black/10 rounded-full text-ink font-display text-lg font-bold flex items-center justify-center shrink-0 group-hover:border-accent group-hover:text-accent group-hover:shadow-md transition-all duration-500 bg-surface-glass backdrop-blur-sm">
                  5
                </div>
                <div className="lg:pt-2 max-w-2xl">
                  <h3 className="font-display text-2xl font-bold mb-3 tracking-tight">
                    Launch & Adoption
                  </h3>
                  <p className="text-ink-light font-medium leading-relaxed text-sm">
                    Train users on your new systems, establish clear SOPs, record interactive video walkthroughs, and monitor results in real-time.
                  </p>
                </div>
              </div>
            </div>
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
              1-ON-1 CONSULTATION
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-tight">
              Schedule Your Free <br className="hidden md:block" />
              AI Operational Audit
            </h2>
            <p className="text-ink-light text-base md:text-lg font-medium leading-relaxed max-w-xl">
              Meet our systems engineering team for a 30-minute workspace audit. We will analyze your bottlenecks and map a step-by-step roadmap to reclaim manual team hours.
            </p>

            <ul className="space-y-4 pt-4">
              <li className="flex items-start gap-3 text-sm text-ink-light font-medium">
                <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                <span>Map manual workflow bottlenecks and data silos in your business.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-ink-light font-medium">
                <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                <span>Evaluate low-code integrations (Make.com, webhooks) for immediate time savings.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-ink-light font-medium">
                <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                <span>Receive custom AI agent prompts and architectural blueprints.</span>
              </li>
            </ul>
          </div>

          {/* Right Column - Inline Custom Calendar Booking Card */}
          <div className="lg:col-span-6 reveal w-full" style={{ transitionDelay: '150ms' }}>
            <BookCallWidget source="Homepage Inline Booking" />
          </div>
        </div>
      </section>

      {/* SECTION 7: TRUST BUILDING */}
      <section className="py-20 bg-surface-alt/40 border-t border-black/5 px-6 text-center">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8 font-mono text-[10px] uppercase tracking-[0.25em] text-accent font-bold">
            Built for Trust & Transparency
          </div>
          <div className="flex flex-wrap justify-center gap-y-4 gap-x-8 md:gap-x-12 text-sm font-semibold text-ink-light">
            <span className="flex items-center gap-2">✓ Fixed pricing</span>
            <span className="flex items-center gap-2">✓ Clear timelines</span>
            <span className="flex items-center gap-2">✓ No long-term contracts</span>
            <span className="flex items-center gap-2">✓ Human support</span>
            <span className="flex items-center gap-2">✓ Documented workflows</span>
            <span className="flex items-center gap-2">✓ Team training included</span>
            <span className="flex items-center gap-2">✓ Ownership of deliverables</span>
          </div>
        </div>
      </section>
    </div>
  );
}
