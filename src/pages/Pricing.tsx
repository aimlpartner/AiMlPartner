import React, { useEffect } from 'react';
import { Check, X, TrendingUp, PhoneCall, Shield, ArrowRight } from 'lucide-react';
import { BookCallWidget } from '../components/BookCallWidget';

export function Pricing() {
  useEffect(() => {
    window.scrollTo(0, 0);

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

    return () => observer.disconnect();
  }, []);

  const handleScrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white pt-40 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-screen pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)' }}></div>
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container-max relative z-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400 mb-4 block font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
            Transparent ROI
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Stop Paying for <br className="hidden md:block" /> Inefficiency.
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            Hiring more people to do robotic work is a losing game. Compare our automated systems to the real cost of human labor.
          </p>
        </div>

        {/* TOP ROW: 3 Equal Columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-[1400px] mx-auto mb-8 px-4 items-stretch">
          
          {/* Card 1: FREE CONSULTATION */}
          <div className="reveal relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col group hover:border-emerald-500/60 transition-colors h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
            
            <div className="mb-8">
              <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-full mb-4 inline-block">
                Start Here
              </span>
              <h3 className="text-2xl font-bold mb-2">Discovery & Blueprint</h3>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-5xl font-black">$0</span>
                <span className="text-gray-400 font-medium text-sm">/ 100% Free</span>
              </div>
              <p className="text-sm text-gray-400 mt-4 leading-relaxed">
                Let's map your operational bottlenecks and see exactly how much money automation can save you. Zero pressure.
              </p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm font-medium text-gray-300">
                <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>1-on-1 Strategy Call with an Expert</span>
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-gray-300">
                <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Custom Workflow Bottleneck Mapping</span>
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-gray-300">
                <Check size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Hard ROI & Cost-Savings Projection</span>
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-gray-500 italic mt-6 border-t border-white/10 pt-4">
                <Shield size={16} className="text-gray-500 shrink-0 mt-0.5" />
                <span>Includes free access to automated AI Scan tool.</span>
              </li>
            </ul>

            <button onClick={handleScrollToBooking} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-pointer mt-auto">
              <PhoneCall size={18} />
              Book Free Consultation
            </button>
          </div>

          {/* Card 2: DIGITAL WORKER POD */}
          <div className="reveal relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 flex flex-col hover:bg-white/10 transition-colors h-full" style={{ transitionDelay: '100ms' }}>
            <div className="mb-8">
              <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4 inline-block opacity-80">
                Most Popular
              </span>
              <h3 className="text-2xl font-bold mb-2">Digital Worker Pod</h3>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-sm text-gray-400 font-medium">From</span>
                <span className="text-5xl font-black">$1,500</span>
                <span className="text-gray-400 font-medium text-sm">/ mo</span>
              </div>
              <p className="text-sm text-gray-400 mt-4 leading-relaxed">
                A dedicated, customized AI agent integrated directly into your business tools to handle repetitive tasks 24/7.
              </p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm font-medium text-gray-300">
                <Check size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <span>24/7 Automated Workflows</span>
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-gray-300">
                <Check size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <span>Seamless CRM/SaaS Integration</span>
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-gray-300">
                <Check size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <span>Continuous Optimization & Updates</span>
              </li>
              <li className="flex items-start gap-3 text-sm font-medium text-gray-300">
                <Check size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <span>Dedicated Tech Support</span>
              </li>
            </ul>

            <button onClick={handleScrollToBooking} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-auto">
              Request Quote
            </button>
          </div>

          {/* Card 3: REALITY CHECK COMPARISON */}
          <div className="reveal relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl overflow-hidden shadow-2xl h-full flex flex-col md:col-span-2 lg:col-span-1" style={{ transitionDelay: '200ms' }}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full blur-[60px]"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px]"></div>
            
            <div className="mb-8 relative z-10 text-center lg:text-left">
              <h2 className="text-2xl font-bold mb-2">The Reality Check</h2>
              <p className="text-gray-400 text-sm font-medium">Cost of Software vs Humans</p>
            </div>

            <div className="flex flex-col gap-6 relative z-10 flex-1 justify-center">
              {/* The Old Way */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-lg font-bold text-gray-300">Human Hire</h3>
                  <span className="text-rose-400 font-mono font-bold text-sm">~$75,000/yr</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-gray-400 font-medium">
                    <X size={16} className="text-rose-400 shrink-0 mt-0.5" />
                    <span>Works exactly 40 hours per week</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-400 font-medium">
                    <X size={16} className="text-rose-400 shrink-0 mt-0.5" />
                    <span>Takes 3-6 months to onboard</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-400 font-medium">
                    <X size={16} className="text-rose-400 shrink-0 mt-0.5" />
                    <span>Requires benefits & HR overhead</span>
                  </li>
                </ul>
              </div>

              <div className="w-full h-px bg-white/10"></div>

              {/* The New Way */}
              <div className="space-y-4 relative">
                <div className="absolute -inset-4 bg-emerald-500/5 rounded-2xl -z-10 hidden lg:block"></div>
                <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
                  <h3 className="text-lg font-bold text-emerald-400">AI Worker</h3>
                  <span className="text-emerald-400 font-mono font-bold flex items-center gap-1 text-xs uppercase">
                    <TrendingUp size={14} /> ~70% Cheaper
                  </span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-gray-200 font-medium">
                    <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>Works 168 hours per week (24/7)</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-200 font-medium">
                    <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>Deployed in weeks, not months</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-200 font-medium">
                    <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>Zero sick days, flat monthly fee</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: ENTERPRISE BANNER */}
        <div className="max-w-[1400px] mx-auto mb-24 px-4">
          <div className="reveal relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/10 transition-colors" style={{ transitionDelay: '300ms' }}>
            <div className="flex-1 max-w-3xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest opacity-80">
                  Scale
                </span>
                <h3 className="text-xl font-bold">Enterprise Overhaul</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Complete operational transformation. Multiple interconnected AI agents replacing entire departments of manual labor. Includes legacy system migration and staff training.
              </p>
            </div>
            <div className="shrink-0 w-full md:w-auto flex flex-col items-center md:items-end gap-3">
              <span className="text-2xl font-black">Custom</span>
              <button onClick={handleScrollToBooking} className="w-full md:w-auto bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
                Discuss Enterprise
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BOOKING WIDGET */}
        <div id="booking-section" className="max-w-[800px] mx-auto reveal">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold mb-4">Let's look at your workflows.</h2>
            <p className="text-gray-400">Pick a time below for your free discovery call. No obligations.</p>
          </div>
          
          <div className="bg-white rounded-3xl p-2 md:p-4 text-slate-900 shadow-2xl">
            <BookCallWidget source="Pricing Page" />
          </div>
        </div>

      </div>
    </div>
  );
}
