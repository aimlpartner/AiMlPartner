import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approx 600px)
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-br from-slate-50 to-sky-50/30/90 backdrop-blur-md border-t border-slate-200 py-4 px-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]"
        >
          <div className="container-max flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-medium text-slate-900 tracking-tight">Ready to scale your operations?</p>
              <p className="text-sm text-slate-600 font-light hidden md:block">Get a personalized operational diagnostic report instantly.</p>
            </div>
            <Link 
              to="/analyzer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-full shadow-md shadow-sky-500/20 px-6 py-2.5 font-medium hover:from-sky-500 hover:to-sky-600 transition-colors whitespace-nowrap w-full sm:w-auto"
            >
              Run AI Operational Audit
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
