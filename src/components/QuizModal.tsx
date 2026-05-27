import React, { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export function QuizModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const [answers, setAnswers] = useState({
    teamSize: '',
    stack: '',
    goals: ''
  });

  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStep(1);
      setSubmitted(false);
      setSubmitError('');
      setFormData({ name: '', email: '', company: '' });
      setAnswers({ teamSize: '', stack: '', goals: '' });
      setDirection(1);
    };
    
    document.addEventListener('open-quiz', handleOpen);
    return () => document.removeEventListener('open-quiz', handleOpen);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.name && formData.company) {
      setIsSubmitting(true);
      setSubmitError('');
      
      // Map quiz answers to clear, condensed text strings
      const teamMap: Record<string, string> = {
        '1-10 (Founder-led)': '1-10',
        '11-50 (Scaling SMB)': '11-50',
        '51-200 (Mid-market)': '51-200',
        '200+ (Enterprise)': '200+'
      };
      const stackMap: Record<string, string> = {
        'Enterprise CRM Platforms': 'CRM',
        'Custom Internal Tools': 'Custom',
        'Spreadsheets & Basic Automation': 'Sheets',
        'No established stack yet': 'None'
      };
      const goalsMap: Record<string, string> = {
        'Scale outbound & lead gen': 'Outbound',
        'Automate internal approvals': 'Approvals',
        'Connect fragmented data': 'Data',
        'Reduce operational headcount': 'Efficiency'
      };

      const t = teamMap[answers.teamSize] || 'N/A';
      const s = stackMap[answers.stack] || 'N/A';
      const g = goalsMap[answers.goals] || 'N/A';

      // Keep under the 100 character rule limit
      const sourceString = `Quiz: Size:${t}, Stack:${s}, Goal:${g}`.substring(0, 100);

      try {
        await addDoc(collection(db, 'leads'), {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          source: sourceString,
          createdAt: serverTimestamp()
        });
        setSubmitted(true);
      } catch (error) {
        console.error("Firestore Error submitting quiz:", error);
        setSubmitError("Failed to submit form. Please check your network or try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => setIsOpen(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0
    })
  };

  const navigate = (newStep: number) => {
    setDirection(newStep > step ? 1 : -1);
    setStep(newStep);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white w-full max-w-lg overflow-hidden shadow-2xl"
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors z-20"
        >
          <X size={20} />
        </button>

        {/* Progress Bar */}
        {!submitted && (
          <div className="h-1 w-full bg-slate-100 absolute top-0 left-0 z-10">
            <motion.div 
              className="h-full bg-slate-900"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        )}

        <div className="p-10 sm:p-12 min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            {!submitted ? (
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex-grow flex flex-col"
              >
                <div className="mb-8">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">
                    {step < 4 ? `Step 0${step} / 03` : "Final Step"}
                  </div>
                  <h2 className="text-2xl font-medium text-slate-900 mb-2 tracking-tight">
                    {step === 1 && "What's your team size?"}
                    {step === 2 && "What's your current stack?"}
                    {step === 3 && "What's your primary goal?"}
                    {step === 4 && "Book Your Consultation"}
                  </h2>
                </div>

                {step === 1 && (
                  <div className="space-y-3 flex-grow">
                    {['1-10 (Founder-led)', '11-50 (Scaling SMB)', '51-200 (Mid-market)', '200+ (Enterprise)'].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setAnswers({...answers, teamSize: option});
                          navigate(2);
                        }}
                        className="w-full text-left px-6 py-4 border border-slate-200 hover:border-slate-900 hover:bg-gradient-to-br from-slate-50 to-sky-50/30 transition-colors font-light text-slate-700 text-sm"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-3 flex-grow">
                    {['Enterprise CRM Platforms', 'Custom Internal Tools', 'Spreadsheets & Basic Automation', 'No established stack yet'].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setAnswers({...answers, stack: option});
                          navigate(3);
                        }}
                        className="w-full text-left px-6 py-4 border border-slate-200 hover:border-slate-900 hover:bg-gradient-to-br from-slate-50 to-sky-50/30 transition-colors font-light text-slate-700 text-sm"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-3 flex-grow">
                    {['Scale outbound & lead gen', 'Automate internal approvals', 'Connect fragmented data', 'Reduce operational headcount'].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setAnswers({...answers, goals: option});
                          navigate(4);
                        }}
                        className="w-full text-left px-6 py-4 border border-slate-200 hover:border-slate-900 hover:bg-gradient-to-br from-slate-50 to-sky-50/30 transition-colors font-light text-slate-700 text-sm"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {step === 4 && (
                  <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col">
                    <p className="text-slate-600 font-light text-sm mb-4">
                      We've analyzed your inputs. Enter your details below to schedule a free consultation with our architects.
                    </p>
                    <div className="space-y-3 flex-grow">
                      <div>
                        <label htmlFor="quiz-name" className="sr-only">Full Name</label>
                        <input
                          type="text"
                          id="quiz-name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                          placeholder="Full Name"
                          className="w-full px-4 py-3 bg-gradient-to-br from-slate-50 to-sky-50/30 border border-slate-200 focus:outline-none focus:border-slate-400 transition-colors font-light text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="quiz-email" className="sr-only">Work Email</label>
                        <input
                          type="email"
                          id="quiz-email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                          placeholder="Work Email"
                          className="w-full px-4 py-3 bg-gradient-to-br from-slate-50 to-sky-50/30 border border-slate-200 focus:outline-none focus:border-slate-400 transition-colors font-light text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="quiz-company" className="sr-only">Company Name</label>
                        <input
                          type="text"
                          id="quiz-company"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          required
                          placeholder="Company Name"
                          className="w-full px-4 py-3 bg-gradient-to-br from-slate-50 to-sky-50/30 border border-slate-200 focus:outline-none focus:border-slate-400 transition-colors font-light text-sm"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-sky-400 to-sky-600 text-white rounded-full shadow-md shadow-sky-500/20 px-6 py-4 font-medium hover:from-sky-500 hover:to-sky-700 transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Requesting...' : 'Request Consultation'}
                      <ArrowRight size={16} />
                    </button>
                    {submitError && (
                      <p className="text-red-500 text-xs font-light text-center mt-2">{submitError}</p>
                    )}
                  </form>
                )}

                {step > 1 && step < 4 && (
                  <button 
                    onClick={() => navigate(step - 1)}
                    className="mt-8 text-xs font-mono text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest text-left"
                  >
                    ← Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center text-center py-8 flex-grow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-sky-50/30 flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} className="text-slate-900" />
                </div>
                <h2 className="text-2xl font-medium text-slate-900 mb-4 tracking-tight">
                  Request Received
                </h2>
                <p className="text-slate-600 font-light text-sm mb-8 max-w-sm leading-relaxed">
                  Thank you, {formData.name}. Our team will review your inputs and reach out to {formData.email} shortly to schedule your consultation.
                </p>
                
                <button 
                  onClick={handleClose}
                  className="mt-4 text-xs font-mono text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
