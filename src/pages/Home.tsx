import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkflowSimulator } from '../components/WorkflowSimulator';

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

  const isValidDomainOrUrl = (str: string): boolean => {
    if (/<script|javascript:|data:|vbscript:|<|>|'|"|`|\{|\}|\[|\]|\\|\^|\%/i.test(str)) {
      return false;
    }
    const cleaned = str.trim().replace(/^https?:\/\//i, '');
    const domainRegex = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:\d+)?(\/.*)?$/;
    return domainRegex.test(cleaned);
  };

  const handleWebsiteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError('Please enter a website URL.');
      return;
    }
    if (!isValidDomainOrUrl(trimmedUrl)) {
      setError('Please enter a valid website URL or domain name (e.g. company.com).');
      return;
    }
    navigate('/analyzer', { state: { url: trimmedUrl } });
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
                Operational Audit Engine
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-extrabold tracking-tighter leading-[1.05] text-white mb-8 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
              Quantify your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-300 italic font-medium pr-2">
                AI agent
              </span>{' '}
              ROI.
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-xl font-medium leading-relaxed">
              Figure it out in under 30 seconds. Scan your site or outline an operational bottleneck to
              generate your diagnostic blueprint.
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
                    Target Architecture URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourcompany.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 md:py-4 text-base md:text-lg font-display text-white placeholder-white/30 mb-4 focus:border-accent focus:bg-black/50 transition-all shadow-inner outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-ink font-bold py-3 md:py-4 rounded-xl hover:bg-surface-alt transition-all flex items-center justify-center gap-2 group/btn shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
                  >
                    Launch Diagnostic{' '}
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
                    Analyze Workflow{' '}
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
                Core Operations
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.1]">
                Where manual workflows <br className="hidden md:block" />
                hold you back.
              </h2>
            </div>
            <p className="text-ink-light max-w-md font-medium leading-relaxed pb-2">
              We replace brittle, human-dependent processes with resilient agentic systems that run
              continuously in the background.
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
                      Manual lead research & profiling
                    </h3>
                    <p className="text-ink-light text-sm leading-relaxed">
                      SDRs waste 12+ hours a week copy-pasting LinkedIn profiles, corporate news, and drafting
                      personalized icebreakers. Highly prone to human error.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-between relative">
                  <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent -ml-4"></div>
                  <div className="pt-6 md:pt-0">
                    <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-success font-bold mb-6 bg-success-soft px-2.5 py-1.5 rounded-md border border-success-border/50">
                      <i className="ph-fill ph-cpu text-sm"></i> The Architecture
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-4 tracking-tight">
                      Autonomous Context Enrichment
                    </h3>
                    <p className="text-ink-light text-sm leading-relaxed">
                      AI agents auto-enrich accounts upon lead creation, drafting contextual sequence messages
                      directly within Salesforce or Outreach in seconds.
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
                  Triage Bottleneck
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 leading-tight text-white tracking-tight">
                  Slow lead routing & manual ticket sorting
                </h3>
                <p className="text-surface-alt/70 text-sm leading-relaxed">
                  Inbound requests sit in shared inboxes for hours, drastically reducing response rates and
                  losing pipeline.
                </p>
              </div>

              <div className="relative z-10 bg-white/10 rounded-xl p-5 border border-white/10 backdrop-blur-md mt-auto shadow-inner">
                <div className="flex items-center gap-2 text-success bg-white w-fit px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider mb-3 rounded shadow-sm">
                  <i className="ph-fill ph-lightning"></i> AI Resolution
                </div>
                <p className="text-sm text-white/90 font-medium leading-relaxed">
                  NLP agents parse queries instantly, routing high-value accounts straight to Slack with full
                  context.
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
                  Siloed CRMs & manual database syncs
                </h3>
                <p className="text-ink-light text-sm leading-relaxed">
                  Reps manually update client records across CRM systems and internal SQL databases, leading to
                  double reach-outs and stale, fractured data.
                </p>
              </div>

              <div className="hidden md:flex w-12 h-12 rounded-full bg-surface-alt shadow-inner border border-black/5 items-center justify-center shrink-0 z-10 relative">
                <i className="ph-bold ph-arrow-right text-ink-light text-lg"></i>
                <div className="absolute w-24 h-px bg-gradient-to-r from-transparent to-black/10 right-full top-1/2"></div>
                <div className="absolute w-24 h-px bg-gradient-to-l from-transparent to-black/10 left-full top-1/2"></div>
              </div>

              <div className="md:w-[45%]">
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-success font-bold mb-4 bg-success-soft px-2.5 py-1.5 rounded-md border border-success-border/50">
                  <i className="ph-fill ph-arrows-clockwise text-sm"></i> The Architecture
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 tracking-tight">
                  Real-Time Agentic Sync
                </h3>
                <p className="text-ink-light text-sm leading-relaxed">
                  Vetted database listeners update records automatically, cleaning data fields and maintaining
                  compliance logs overhead-free.
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
              Core Offerings
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink">
              How we partner.
            </h2>
            <p className="text-ink-light mt-6 max-w-2xl mx-auto font-medium text-lg">
              We build custom, production-ready AI systems directly integrated into your operational stack.
            </p>
          </div>

          <div className="relative z-10 space-y-4" id="offering-list">
            {/* Row 01 */}
            <div className="offering-row block border border-black/10 bg-white/60 backdrop-blur-md rounded-2xl py-8 px-6 md:px-10 reveal group cursor-pointer shadow-sm hover:shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center text-left">
                <div className="md:col-span-1 font-mono text-sm text-ink-lighter font-bold">01/</div>
                <div className="md:col-span-3">
                  <h3 className="font-display text-2xl font-bold text-ink group-hover:text-accent transition-colors tracking-tight">
                    Strategy & Audit
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-ink-light text-sm leading-relaxed font-medium group-hover:text-ink transition-colors">
                    Map bottlenecks. We analyze team structure, SaaS overhead, and friction to generate a
                    detailed roadmap.
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
                    Agent Engineering
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-ink-light text-sm leading-relaxed font-medium group-hover:text-ink transition-colors">
                    Replace repetitive work. We design AI agents built to handle specific business processes
                    flawlessly, 24/7.
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
                  <h3 class="font-display text-2xl font-bold text-ink group-hover:text-accent transition-colors tracking-tight">
                    Low-Code Portals
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-ink-light text-sm leading-relaxed font-medium group-hover:text-ink transition-colors">
                    Keep humans in the loop. Custom dashboards to let staff review outputs, approve reports,
                    and monitor safely.
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
                    Enterprise Sync
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-ink-light text-sm leading-relaxed font-medium group-hover:text-ink transition-colors">
                    Bridge CRM triggers directly with LLM pipelines. We set up robust observability logs and
                    security standards.
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
              System Performance
            </span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-ink">
              Production-grade results.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 border-t border-black/5 pt-16">
            {/* Stat 1 */}
            <div className="reveal relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white shadow-editorial tangible-card text-left">
              <div className="font-display text-6xl lg:text-[6rem] font-black text-ink leading-none tracking-tighter mb-6">
                320<span className="text-accent">%</span>
              </div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent mb-3">
                Qualified Pipeline
              </div>
              <p className="text-ink-light text-sm font-medium leading-relaxed">
                Account Enrichment & Acceleration. AI extracts LinkedIn context and drafts sequences in 90
                seconds flat.
              </p>
            </div>

            {/* Stat 2 */}
            <div
              className="reveal relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white shadow-editorial tangible-card text-left"
              style={{ transitionDelay: '100ms' }}
            >
              <div className="font-display text-6xl lg:text-[6rem] font-black text-ink leading-none tracking-tighter mb-6">
                $14<span className="text-accent text-5xl">k</span>
              </div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent mb-3">
                Overhead Reclaimed
              </div>
              <p className="text-ink-light text-sm font-medium leading-relaxed">
                Automated Support Triaging. NLP parses queries instantly and routes high-priority tickets to
                specific channels.
              </p>
            </div>

            {/* Stat 3 */}
            <div
              className="reveal relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white shadow-editorial tangible-card text-left"
              style={{ transitionDelay: '200ms' }}
            >
              <div className="font-display text-6xl lg:text-[6rem] font-black text-ink leading-none tracking-tighter mb-6">
                99<span className="text-accent">
                  .8<span className="text-4xl">%</span>
                </span>
              </div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent mb-3">
                Accuracy Vetted
              </div>
              <p className="text-ink-light text-sm font-medium leading-relaxed">
                Enterprise Syncing. Secure listeners clean and perfectly sync records across multiple SQL
                databases.
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
              Delivery Framework
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink max-w-2xl">
              How we ship systems that drive growth.
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
                    Diagnostics & ROI Modeling
                  </h3>
                  <p className="text-ink-light font-medium leading-relaxed text-sm">
                    We audit your CRM pipelines, team sizes, and manual entry points to compile a detailed ROI
                    forecast and operational blueprint before writing any code.
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
                    Orchestration & Agent Engineering
                  </h3>
                  <p className="text-ink-light font-medium leading-relaxed text-sm">
                    We design custom agent loops, configure vector stores for context grounding, and write
                    custom tool-calling schemas tailored strictly to your business rules.
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
                    Human-in-the-Loop Portals
                  </h3>
                  <p className="text-ink-light font-medium leading-relaxed text-sm">
                    We build intuitive low-code control panels that let your operations team monitor agent
                    tasks, edit drafted responses, and approve outbound actions safely.
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
                    CRM & Enterprise Syncing
                  </h3>
                  <p className="text-ink-light font-medium leading-relaxed text-sm">
                    We bridge agent webhooks directly with Salesforce Agentforce, HubSpot, or SQL backends,
                    deploying continuous observability logs and API rate limits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
