import React, { useState, useEffect } from 'react';
import { X, BookOpen, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves the top of the viewport
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, 'leads'), {
          name,
          email,
          company,
          source: 'Exit Intent Popup',
          createdAt: serverTimestamp()
        });
        setSubmitted(true);
        setTimeout(() => setIsOpen(false), 3000);
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, 'leads');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white w-full max-w-md overflow-hidden shadow-2xl"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-10 sm:p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-sky-50/30 flex items-center justify-center mx-auto mb-8 border border-slate-200">
                <BookOpen size={24} className="text-slate-900" />
              </div>
              
              <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">Wait</div>
              <h2 className="text-2xl font-medium text-slate-900 mb-4 tracking-tight">
                Before you go...
              </h2>
              
              <p className="text-slate-600 font-light mb-8 text-sm leading-relaxed">
                Book a <span className="font-medium text-slate-900">Free Strategy Call</span>. Learn how top operators are cutting manual ops by 40% using agentic systems.
              </p>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gradient-to-br from-slate-50 to-sky-50/30 text-slate-900 p-4 border border-slate-200"
                >
                  <p className="font-medium text-sm">Request received! We'll be in touch.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    required
                    className="w-full px-4 py-3 bg-gradient-to-br from-slate-50 to-sky-50/30 border border-slate-200 focus:outline-none focus:border-slate-400 text-center font-light text-sm transition-colors"
                  />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company"
                    required
                    className="w-full px-4 py-3 bg-gradient-to-br from-slate-50 to-sky-50/30 border border-slate-200 focus:outline-none focus:border-slate-400 text-center font-light text-sm transition-colors"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    className="w-full px-4 py-3 bg-gradient-to-br from-slate-50 to-sky-50/30 border border-slate-200 focus:outline-none focus:border-slate-400 text-center font-light text-sm transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-sky-400 to-sky-600 text-white rounded-full shadow-md shadow-sky-500/20  px-6 py-3 font-medium hover:from-sky-500 hover:to-sky-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Request Consultation
                    <ArrowRight size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 text-xs font-mono text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
                  >
                    No thanks, I prefer manual work
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
