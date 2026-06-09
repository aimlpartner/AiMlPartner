import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, User, Mail, Building, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookCallWidgetProps {
  source?: string;
  onSuccess?: (details: { name: string; email: string; company: string; date: string; time: string }) => void;
}

export function BookCallWidget({ source = 'Website', onSuccess }: BookCallWidgetProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 'success'>(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Generate next 30 weekday/Saturday booking dates (skipping Sundays)
  const bookingDates = useMemo(() => {
    const dates = [];
    const current = new Date();
    // Start booking from tomorrow
    current.setDate(current.getDate() + 1);
    
    while (dates.length < 30) {
      // 0 = Sunday
      if (current.getDay() !== 0) {
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }, []);

  const TIME_SLOTS = [
    "09:00 AM", "09:30 AM",
    "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM"
  ];

  const formatDateValue = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
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
      setError('Please fill in all fields.');
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
          selectedDate,
          selectedTime,
          source
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking. Please try again.');
      }

      setStep('success');
      if (onSuccess) {
        onSuccess({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          date: selectedDate,
          time: selectedTime
        });
      }
    } catch (err: any) {
      console.error('[Call Booking Form Error]:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step indicator fraction mapping
  const getStepProgressWidth = () => {
    if (step === 'success') return '100%';
    if (step === 1) return '33.3%';
    if (step === 2) return '66.6%';
    return '100%';
  };

  return (
    <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Progress bar */}
      {step !== 'success' && (
        <div className="h-1.5 w-full bg-slate-100 absolute top-0 left-0">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 to-indigo-500"
            initial={{ width: '0%' }}
            animate={{ width: getStepProgressWidth() }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
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
              <span className="text-[10px] font-mono text-indigo-600 tracking-widest uppercase font-bold block mb-1">
                STEP 1 OF 3 • DATE SELECTION
              </span>
              <h3 className="text-xl font-bold text-slate-900 leading-snug tracking-tight">
                Select Consultation Date
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light mt-1">
                Choose a date from the next 30 days (excluding Sundays).
              </p>
            </div>

            {error && (
              <p className="text-rose-600 text-xs font-semibold bg-rose-50 border border-rose-100 rounded-xl px-4 py-2">{error}</p>
            )}

            {/* Date Grid */}
            <div className="space-y-2">
              <div className="grid grid-cols-5 gap-2 max-h-[240px] overflow-y-auto pr-1">
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
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-slate-950 text-white shadow-md'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-[8px] font-mono uppercase tracking-wider opacity-65">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                      <span className="text-base font-extrabold my-0.5">{date.getDate()}</span>
                      <span className="text-[8px] font-mono uppercase tracking-wider opacity-65">
                        {date.toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleNextToTime}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full py-3.5 font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Next: Select Time Slot</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}

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
                onClick={handleBackToDates}
                className="text-xs font-mono text-slate-400 hover:text-slate-800 transition-colors uppercase tracking-widest mb-3 cursor-pointer"
              >
                ← Back to Dates
              </button>
              <span className="text-[10px] font-mono text-indigo-600 tracking-widest uppercase font-bold block mb-1">
                STEP 2 OF 3 • TIME SELECTION
              </span>
              <h3 className="text-xl font-bold text-slate-900 leading-snug tracking-tight">
                Select Time Slot
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light mt-1">
                Date: <span className="font-semibold text-slate-800">{selectedDate}</span>. Pick a 30-minute slot.
              </p>
            </div>

            {error && (
              <p className="text-rose-600 text-xs font-semibold bg-rose-50 border border-rose-100 rounded-xl px-4 py-2">{error}</p>
            )}

            {/* Time Slot Grid */}
            <div className="space-y-2">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[200px] overflow-y-auto pr-1">
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
                      className={`py-2 px-1 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-700 text-white shadow-md'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
              <p className="text-[9px] text-slate-400 font-mono text-center mt-2">
                🕒 Time slots are in your local timezone.
              </p>
            </div>

            <button
              onClick={handleNextToDetails}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full py-3.5 font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Next: Enter Contact Info</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}

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
                onClick={handleBackToTime}
                className="text-xs font-mono text-slate-400 hover:text-slate-800 transition-colors uppercase tracking-widest mb-3 cursor-pointer"
              >
                ← Back to Time Slots
              </button>
              <span className="text-[10px] font-mono text-indigo-600 tracking-widest uppercase font-bold block mb-1">
                STEP 3 OF 3 • CONTACT INFORMATION
              </span>
              <h3 className="text-xl font-bold text-slate-900 leading-snug tracking-tight">
                Enter Your Details
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light mt-1">
                Confirming booking for: <span className="font-semibold text-slate-800">{selectedDate}</span> at <span className="font-semibold text-slate-800">{selectedTime}</span>.
              </p>
            </div>

            {error && (
              <p className="text-rose-600 text-xs font-semibold bg-rose-50 border border-rose-100 rounded-xl px-4 py-2">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="email"
                    required
                    placeholder="Work Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                  />
                </div>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    required
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-full py-3.5 font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-white" />
                    <span>Reserving Session...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Call Booking</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center text-center py-6 space-y-5"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-sky-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-500 shadow-md">
              <CheckCircle size={28} className="text-emerald-500" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                AI Strategy Session Reserved!
              </h3>
              <p className="text-slate-500 text-xs md:text-sm font-light leading-relaxed max-w-sm mx-auto">
                We have scheduled your 1-on-1 AI Strategy consultation. A confirmation email with details has been sent.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left w-full max-w-xs mx-auto text-xs space-y-1">
              <span className="text-[9px] font-mono text-indigo-600 block tracking-wider uppercase font-bold mb-1">🗓️ CONFIRMATION</span>
              <p className="text-slate-800 font-semibold">Date: <span className="font-normal text-slate-600">{selectedDate}</span></p>
              <p className="text-slate-800 font-semibold">Time: <span className="font-normal text-slate-600">{selectedTime}</span></p>
              <p className="text-slate-800 font-semibold">
                Google Meet: <a href="https://meet.google.com/msi-aiml-demo" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Join Live GMeet</a>
              </p>
            </div>

            <p className="text-slate-400 text-[10px] leading-relaxed max-w-xs mx-auto">
              Please check your inbox <span className="font-semibold text-slate-500">{formData.email}</span> for calendar invitation files.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
