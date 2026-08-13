import React, { useEffect } from 'react';
import { Check, X, TrendingUp, PhoneCall, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
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

        {/* PRICING COMPARISON TABLE (Like Blaze) */}
        <div className="w-full max-w-[1100px] mx-auto overflow-x-auto pb-12 reveal px-4">
          <div className="min-w-[800px]">
            
            {/* Table Header */}
            <div className="grid grid-cols-5 items-end mb-4">
              <div className="col-span-1"></div>
              
              <div className="col-span-1 text-center pb-4">
                <span className="text-gray-400 font-medium text-lg">Human Hire</span>
              </div>
              
              <div className="col-span-1 text-center pb-4">
                <span className="text-gray-400 font-medium text-lg">Traditional Agency</span>
              </div>

              <div className="col-span-2 bg-white/5 border border-white/10 border-b-0 rounded-t-2xl relative pt-6 pb-4">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-2xl"></div>
                <div className="grid grid-cols-2">
                  <div className="text-center border-r border-white/5">
                    <h3 className="text-lg font-bold text-white">Discovery</h3>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white">Worker Pod</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="flex flex-col">
              {[
                {
                  title: "Monthly cost",
                  human: "~$6,250/mo",
                  agency: "~$4,000/mo",
                  free: "$0",
                  pod: "$1,500",
                  isPrice: true
                },
                {
                  title: "Working hours",
                  human: "40 hrs/week",
                  agency: "Varies",
                  free: "—",
                  pod: "24/7 (168 hrs)",
                },
                {
                  title: "Time to value",
                  human: "3-6 months",
                  agency: "1-3 months",
                  free: "Immediate",
                  pod: "2-4 weeks",
                },
                {
                  title: "Custom Workflow Mapping",
                  human: "No",
                  agency: "Sometimes",
                  free: "check",
                  pod: "check",
                },
                {
                  title: "Hard ROI Projection",
                  human: "Manual",
                  agency: "Extra cost",
                  free: "check",
                  pod: "check",
                },
                {
                  title: "SaaS / CRM Integration",
                  human: "Slow",
                  agency: "Extra cost",
                  free: "—",
                  pod: "check",
                },
                {
                  title: "Contract required",
                  human: "Full-time hire",
                  agency: "6 months min",
                  free: "None",
                  pod: "None",
                }
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-5 items-center border-b border-white/10 group hover:bg-white/[0.02] transition-colors relative">
                  <div className="col-span-1 py-5 pr-4 font-bold text-white text-base">{row.title}</div>
                  <div className="col-span-1 py-5 text-center text-gray-400 text-sm">{row.human}</div>
                  <div className="col-span-1 py-5 text-center text-gray-400 text-sm">{row.agency}</div>
                  
                  <div className="col-span-2 bg-white/5 border-x border-white/10 grid grid-cols-2 h-full">
                    <div className="py-5 text-center flex items-center justify-center border-r border-white/5">
                      {row.isPrice ? (
                        <span className="text-3xl font-black text-white">{row.free}<span className="text-sm text-gray-400 font-normal">/mo</span></span>
                      ) : row.free === 'check' ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center"><Check size={14} className="text-emerald-400" /></div>
                      ) : row.free === '—' ? (
                        <span className="text-gray-500 font-normal">—</span>
                      ) : (
                        <span className="text-gray-200 font-medium text-sm">{row.free}</span>
                      )}
                    </div>
                    <div className="py-5 text-center flex items-center justify-center">
                      {row.isPrice ? (
                        <span className="text-3xl font-black text-white">{row.pod}<span className="text-sm text-gray-400 font-normal">/mo</span></span>
                      ) : row.pod === 'check' ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center"><Check size={14} className="text-emerald-400" /></div>
                      ) : row.pod === '—' ? (
                        <span className="text-gray-500 font-normal">—</span>
                      ) : (
                        <span className="text-gray-200 font-medium text-sm">{row.pod}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* CTA Row */}
              <div className="grid grid-cols-5 items-center">
                <div className="col-span-3"></div>
                <div className="col-span-2 bg-white/5 border-x border-b border-white/10 rounded-b-2xl grid grid-cols-2 p-6 gap-4">
                  <button onClick={handleScrollToBooking} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold py-3 rounded-xl transition-all text-center flex items-center justify-center gap-2">
                    <PhoneCall size={16} /> Book Consult
                  </button>
                  <button onClick={handleScrollToBooking} className="w-full bg-white/10 hover:bg-white/20 text-white text-sm font-bold py-3 rounded-xl transition-all text-center">
                    Request Quote
                  </button>
                </div>
              </div>
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
