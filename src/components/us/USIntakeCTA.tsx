import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, User, Mail, Building, CheckCircle2, Loader2, ArrowUpRight, ArrowRight, Shield, Zap, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface USIntakeCTAProps {
  source?: string;
  onSuccess?: (details: { name: string; email: string; company: string; date: string; time: string; scope: string }) => void;
}

export function USIntakeCTA({ source = 'US Flagship Landing Page', onSuccess }: USIntakeCTAProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 'success'>(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedScope, setSelectedScope] = useState<string>('Dedicated AI Engineering Pod');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', details: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Month navigation state
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate all valid booking dates for the entire viewed month
  const bookingDates = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      // Skip Sundays (0) and past dates
      if (d.getDay() !== 0 && d > today) {
        dates.push(d);
      }
    }
    return dates;
  }, [currentMonth]);

  const monthHeader = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const today = new Date();
    if (
      newMonth.getFullYear() < today.getFullYear() ||
      (newMonth.getFullYear() === today.getFullYear() && newMonth.getMonth() < today.getMonth())
    ) {
      return;
    }
    setCurrentMonth(newMonth);
  };

  const isPrevMonthDisabled = useMemo(() => {
    const today = new Date();
    return currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() === today.getMonth();
  }, [currentMonth]);

  const TIME_SLOTS = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const formatDateValue = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleNextToTime = () => {
    if (!selectedDate) {
      setError('Please select a date first.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleNextToDetails = () => {
    if (!selectedTime) {
      setError('Please select a time slot first.');
      return;
    }
    setError('');
    setStep(3);
  };

  const handleBackToDates = () => {
    setError('');
    setStep(1);
  };

  const handleBackToTime = () => {
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/book-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          scope: selectedScope,
          details: formData.details.trim(),
          selectedDate,
          selectedTime,
          source
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking.');
      }

      setStep('success');
      if (onSuccess) {
        onSuccess({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          date: selectedDate,
          time: selectedTime,
          scope: selectedScope
        });
      }
    } catch (err: any) {
      console.error('[Booking Submit Error]:', err);
      setStep('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const SCOPES = [
    'Dedicated AI Engineering Pod',
    'Enterprise AI Audit & Roadmap',
    'Custom Agentic Pipeline',
    'Fine-Tuning & Private VPC Cloud'
  ];

  return (
    <section id="intake" className="py-36 px-6 md:px-16 bg-black text-white relative select-none overflow-hidden">
      
      {/* Dynamic Ambient Background Illumination */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#FF5500]/6 rounded-full blur-[260px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* ========================================================================= */}
        {/* SECTION MANIFESTO (TOP) */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 pb-12 border-b border-zinc-900 gap-10">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-medium mb-4">
              Direct Technical Partner Access
            </p>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.02]">
              Let's build your <span className="text-[#FF5500]">automation.</span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
            Select a date and 30-minute window for a free discovery call. We'll map your bottlenecks and show you exactly what we can automate.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DIRECT TIME-BOOKING */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Conviction & Guarantees (Spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div>
              <span className="font-mono text-xs text-[#FF5500] font-bold uppercase tracking-widest block mb-3">
                // PARTNER COMMITMENT
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-4">
                Engineered for your business. Deployed in 14 days.
              </h3>
              <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                We work directly with founders and business owners. This 30-minute discovery call is 100% free with zero obligation.
              </p>
            </div>

            {/* 3 Executive Guarantees */}
            <div className="space-y-4 pt-6 border-t border-zinc-900">
              <div className="flex items-start gap-3.5">
                <div className="p-1 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 mt-0.5 shrink-0">
                  <Shield size={14} className="text-[#FF5500]" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-white block">Strict Mutual NDA First</span>
                  <span className="font-sans text-xs text-zinc-400">Zero data retention agreements across all model tiers.</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-1 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 mt-0.5 shrink-0">
                  <Zap size={14} className="text-[#FF5500]" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-white block">4-Hour Executive SLA</span>
                  <span className="font-sans text-xs text-zinc-400">Direct reply from an applied AI engineering lead.</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-1 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 mt-0.5 shrink-0">
                  <Lock size={14} className="text-[#FF5500]" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-white block">100% Client IP Custody</span>
                  <span className="font-sans text-xs text-zinc-400">All weights, code, and graphs deployed in your private cloud.</span>
                </div>
              </div>
            </div>

            {/* Direct Line */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
              <span className="text-zinc-500 uppercase tracking-wider shrink-0">Direct Desk:</span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:justify-end">
                <a href="mailto:info@aimlpartner.com" className="text-[#FF5500] hover:underline font-bold transition-colors">
                  info@aimlpartner.com ↗
                </a>
                <span className="text-zinc-700 hidden sm:inline">•</span>
                <a href="mailto:porwaldeepak22@gmail.com" className="text-zinc-300 hover:text-[#FF5500] hover:underline font-medium transition-colors">
                  porwaldeepak22@gmail.com ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Step Interactive Time Booking Salon (FULL MONTH, ZERO SCROLLBAR) */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-zinc-950/90 border border-zinc-850 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] relative overflow-hidden">
            
            {/* Top Step Progress Bar */}
            {step !== 'success' && (
              <div className="h-1 w-full bg-zinc-900 absolute top-0 left-0">
                <motion.div
                  className="h-full bg-[#FF5500] shadow-[0_0_10px_#FF5500]"
                  initial={{ width: '33.3%' }}
                  animate={{
                    width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}

            {error && (
              <p className="text-rose-400 text-xs font-mono bg-rose-950/30 border border-rose-900/50 rounded-xl px-4 py-2.5 mb-6">
                {error}
              </p>
            )}

            <AnimatePresence mode="wait">
              
              {/* ================================================================= */}
              {/* STEP 1: FULL MONTH DATE SELECTION (ZERO SCROLLBAR, FULL MONTH GRID) */}
              {/* ================================================================= */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-[10px] font-mono text-[#FF5500] tracking-widest uppercase font-bold block mb-1">
                      STEP 01 OF 03 // DISCOVERY DATE
                    </span>
                    <h3 className="text-2xl font-bold font-display text-white tracking-tight">
                      Select Consultation Date
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans mt-1">
                      Choose an executive discovery date with our founding engineering leads.
                    </p>
                  </div>

                  {/* Month Switcher Header */}
                  <div className="flex items-center justify-between bg-zinc-900/80 border border-zinc-800 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon size={16} className="text-[#FF5500]" />
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">{monthHeader}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        disabled={isPrevMonthDisabled}
                        className={`p-2 rounded-lg transition-colors ${
                          isPrevMonthDisabled ? 'text-zinc-700 cursor-not-allowed' : 'text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer'
                        }`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </button>
                    </div>
                  </div>

                  {/* Full Month Calendar Grid (7 columns: Mon to Sat + Sun, fits all 30/31 days naturally) */}
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {bookingDates.map((date) => {
                      const dateStr = formatDateValue(date);
                      const isSelected = selectedDate === dateStr;
                      return (
                        <button
                          key={date.toISOString()}
                          type="button"
                          onClick={() => {
                            setSelectedDate(dateStr);
                            setError('');
                          }}
                          className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#FF5500] border-[#FF5500] text-black font-bold shadow-us-pop scale-102'
                              : 'bg-black border-zinc-850 text-zinc-300 hover:border-zinc-700 hover:text-white'
                          }`}
                        >
                          <span className={`text-[8px] font-mono uppercase tracking-wider ${isSelected ? 'text-black/80 font-bold' : 'text-zinc-500'}`}>
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </span>
                          <span className="text-base font-extrabold my-0.5">{date.getDate()}</span>
                          <span className={`text-[8px] font-mono uppercase tracking-wider ${isSelected ? 'text-black/80 font-bold' : 'text-zinc-500'}`}>
                            {date.toLocaleDateString('en-US', { month: 'short' })}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Step Button */}
                  <button
                    type="button"
                    onClick={handleNextToTime}
                    className="w-full py-4 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-widest transition-all duration-300 shadow-us-pop hover:scale-102 flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Next: Select Time Window</span>
                    <ArrowRight size={15} />
                  </button>
                </motion.div>
              )}

              {/* ================================================================= */}
              {/* STEP 2: TIME SLOT SELECTION (ZERO SCROLLBAR) */}
              {/* ================================================================= */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <button
                      type="button"
                      onClick={handleBackToDates}
                      className="text-xs font-mono text-zinc-500 hover:text-[#FF5500] transition-colors uppercase tracking-widest mb-3 cursor-pointer"
                    >
                      ← Back to Date Selection
                    </button>
                    <span className="text-[10px] font-mono text-[#FF5500] tracking-widest uppercase font-bold block mb-1">
                      STEP 02 OF 03 // 30-MIN WINDOW
                    </span>
                    <h3 className="text-2xl font-bold font-display text-white tracking-tight">
                      Select Time Slot
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans mt-1">
                      Date: <b className="text-white">{selectedDate}</b>. Choose a dedicated 30-minute briefing window.
                    </p>
                  </div>

                  {/* Time Slot Grid (Clean 4x4, ZERO SCROLLBAR) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {TIME_SLOTS.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => {
                            setSelectedTime(time);
                            setError('');
                          }}
                          className={`py-3 px-2 rounded-xl border text-center text-xs font-mono transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#FF5500] border-[#FF5500] text-black font-bold shadow-us-pop'
                              : 'bg-black border-zinc-850 text-zinc-300 hover:border-zinc-700 hover:text-white'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[10px] text-zinc-500 font-mono text-center">
                    🕒 Time slots are displayed in your local device timezone.
                  </p>

                  {/* Next Step Button */}
                  <button
                    type="button"
                    onClick={handleNextToDetails}
                    className="w-full py-4 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-widest transition-all duration-300 shadow-us-pop hover:scale-102 flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Next: Executive Information</span>
                    <ArrowRight size={15} />
                  </button>
                </motion.div>
              )}

              {/* ================================================================= */}
              {/* STEP 3: CONTACT & SCOPE DETAILS */}
              {/* ================================================================= */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <button
                      type="button"
                      onClick={handleBackToTime}
                      className="text-xs font-mono text-zinc-500 hover:text-[#FF5500] transition-colors uppercase tracking-widest mb-3 cursor-pointer"
                    >
                      ← Back to Time Slots
                    </button>
                    <span className="text-[10px] font-mono text-[#FF5500] tracking-widest uppercase font-bold block mb-1">
                      STEP 03 OF 03 // EXECUTIVE BRIEFING INFO
                    </span>
                    <h3 className="text-2xl font-bold font-display text-white tracking-tight">
                      Confirm Discovery Details
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans mt-1">
                      Selected Slot: <b className="text-white">{selectedDate}</b> at <b className="text-[#FF5500]">{selectedTime}</b>.
                    </p>
                  </div>

                  {/* Scope Selector */}
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-bold">
                      Deployment Objective
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SCOPES.map((svc) => (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => setSelectedScope(svc)}
                          className={`p-2.5 rounded-xl font-mono text-[11px] text-left transition-all cursor-pointer ${
                            selectedScope === svc
                              ? 'bg-[#FF5500] text-black font-bold shadow-us-pop'
                              : 'bg-black border border-zinc-800 text-zinc-400 hover:text-white'
                          }`}
                        >
                          {svc}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
                        <input
                          type="text"
                          required
                          placeholder="Your Name *"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-black border border-zinc-800 text-white placeholder-zinc-600 text-sm font-sans focus:outline-none focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] transition-all"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
                        <input
                          type="email"
                          required
                          placeholder="Work Email *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-black border border-zinc-800 text-white placeholder-zinc-600 text-sm font-sans focus:outline-none focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] transition-all"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
                      <input
                        type="text"
                        required
                        placeholder="Company Name & Website *"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-black border border-zinc-800 text-white placeholder-zinc-600 text-sm font-sans focus:outline-none focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] transition-all"
                      />
                    </div>

                    <div>
                      <textarea
                        rows={2}
                        placeholder="Brief context on your AI bottleneck or stack (optional)..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 text-white placeholder-zinc-600 text-sm font-sans focus:outline-none focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-widest transition-all duration-300 shadow-us-pop hover:scale-102 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin text-black" />
                          <span>Reserving Briefing Window...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm Discovery Call Booking</span>
                          <ArrowUpRight size={16} />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* ================================================================= */}
              {/* SUCCESS CONFIRMATION STATE */}
              {/* ================================================================= */}
              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-10 text-center flex flex-col items-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-[#FF5500]/15 border border-[#FF5500]/40 text-[#FF5500] flex items-center justify-center shadow-[0_0_40px_rgba(255,85,0,0.2)]">
                    <CheckCircle2 size={36} />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      Discovery Briefing Reserved!
                    </h3>
                    <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
                      We have scheduled your 1-on-1 architecture discovery session. A calendar invite with private Google Meet details has been generated.
                    </p>
                  </div>

                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 text-left w-full max-w-sm mx-auto space-y-2 font-mono text-xs">
                    <span className="text-[10px] text-[#FF5500] block uppercase font-bold tracking-widest mb-1">
                      🗓️ CONFIRMED APPOINTMENT
                    </span>
                    <p className="text-zinc-300">Date: <b className="text-white">{selectedDate}</b></p>
                    <p className="text-zinc-300">Time: <b className="text-white">{selectedTime}</b></p>
                    <p className="text-zinc-300">Scope: <b className="text-[#FF5500]">{selectedScope}</b></p>
                    <p className="text-zinc-400 text-[11px] pt-1">
                      Meeting: <span className="text-zinc-300">Google Meet link sent to your inbox.</span>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setStep(1);
                      setSelectedDate('');
                      setSelectedTime('');
                    }}
                    className="font-mono text-xs text-[#FF5500] uppercase tracking-wider hover:underline cursor-pointer"
                  >
                    Schedule Another Session
                  </button>
                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
