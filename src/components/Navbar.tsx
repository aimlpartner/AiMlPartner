import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine navbar styles based on scroll & route page
  const headerWrapperClass = isScrolled
    ? 'fixed top-4 left-0 right-0 z-50 flex justify-center px-4 md:px-8 transition-all duration-500'
    : 'fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500';

  const containerClass = isScrolled
    ? 'w-full max-w-[1200px] bg-surface-dark/85 backdrop-blur-xl border border-white/10 shadow-glass rounded-full py-2.5 px-6 md:px-8 flex items-center justify-between text-white transition-all duration-500 relative'
    : isHome
      ? 'w-full bg-transparent border-b border-transparent py-6 px-6 md:px-12 flex items-center justify-between text-white transition-all duration-500 relative'
      : 'w-full bg-white/80 backdrop-blur-md border-b border-black/5 py-5 px-6 md:px-12 flex items-center justify-between text-ink transition-all duration-500 relative';

  const linkClass = isScrolled
    ? 'text-xs uppercase tracking-wider font-semibold text-white/70 hover:text-white hover:bg-white/5 px-3 py-1.5 rounded-full transition-all duration-300'
    : isHome
      ? 'text-xs uppercase tracking-wider font-semibold text-white/85 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-full transition-all duration-300'
      : 'text-xs uppercase tracking-wider font-semibold text-ink-light hover:text-ink hover:bg-black/5 px-3 py-1.5 rounded-full transition-all duration-300';

  const ctaClass = isScrolled
    ? 'bg-white text-ink text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-sm hover:bg-accent hover:text-white hover:shadow-glow transition-all duration-300 flex items-center gap-1.5 group/cta'
    : isHome
      ? 'bg-white text-ink text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-sm hover:bg-accent hover:text-white hover:shadow-glow transition-all duration-300 flex items-center gap-1.5 group/cta'
      : 'bg-ink text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-sm hover:bg-accent hover:text-white hover:shadow-glow transition-all duration-300 flex items-center gap-1.5 group/cta';

  const logoTextClass = isScrolled
    ? 'font-display font-extrabold text-lg tracking-tight text-white transition-colors duration-500'
    : isHome
      ? 'font-display font-extrabold text-xl tracking-tight text-white transition-colors duration-500'
      : 'font-display font-extrabold text-xl tracking-tight text-ink transition-colors duration-500';

  return (
    <>
      <header className={headerWrapperClass}>
        <div className={containerClass}>
          {/* Logo */}
          <Link to="/" className="flex items-center group cursor-pointer animate-fade-in" aria-label="AIMLPartner Home">
            <img
              src="/aimlpartner_logo.png"
              alt="AIMLPartner Logo"
              className={`h-9 md:h-11 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                isScrolled || isHome ? 'brightness-0 invert' : 'brightness-0'
              }`}
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <Link to="/agent-studio" className={linkClass}>
              Studio
            </Link>
            <Link to="/agent-shop" className={linkClass}>
              Shop
            </Link>
            <Link to="/low-code-pods" className={linkClass}>
              Services
            </Link>
            <Link to="/agentforce-services" className={linkClass}>
              Salesforce
            </Link>
            <Link to="/team" className={linkClass}>
              Team
            </Link>
            <Link to="/events" className={linkClass}>
              Events
            </Link>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link to="/partner-waitlist" className={ctaClass}>
              <span>Join Waitlist</span>
              <ArrowRight size={13} className="group-hover/cta:translate-x-0.5 transition-transform" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full transition-colors ${
                isScrolled
                  ? 'text-white hover:bg-white/10'
                  : isHome
                    ? 'text-white hover:bg-white/10'
                    : 'text-ink hover:bg-black/5'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Hanging Poppy Sticky Label */}
          <Link 
            to="/partner-waitlist"
            className="absolute -bottom-[21px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 via-purple-600 to-orange-500 text-white text-[9px] font-black uppercase tracking-[0.25em] px-4 py-1 rounded-b-xl border-x border-b border-white/20 shadow-[0_4px_12px_rgba(236,72,153,0.3)] hover:shadow-[0_4px_20px_rgba(236,72,153,0.6)] animate-pulse hover:scale-105 transition-all duration-300 z-30 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            <span>Become a Verified AI/ML Partner →</span>
          </Link>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-x-4 top-24 z-40 bg-surface-dark/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex flex-col gap-3 shadow-glass lg:hidden"
          >
            <div className="flex items-center gap-2 pb-4 border-b border-white/10 mb-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-accent font-bold">
                Navigation Directory
              </span>
            </div>
            <Link
              to="/agent-studio"
              className="text-sm font-semibold text-white/80 hover:text-white py-2 transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Agent Studio</span>
              <ArrowRight size={14} className="opacity-40" />
            </Link>
            <Link
              to="/agent-shop"
              className="text-sm font-semibold text-white/80 hover:text-white py-2 transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Agent Shop</span>
              <ArrowRight size={14} className="opacity-40" />
            </Link>
            <Link
              to="/low-code-pods"
              className="text-sm font-semibold text-white/80 hover:text-white py-2 transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Services</span>
              <ArrowRight size={14} className="opacity-40" />
            </Link>
            <Link
              to="/agentforce-services"
              className="text-sm font-semibold text-white/80 hover:text-white py-2 transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Salesforce Services</span>
              <ArrowRight size={14} className="opacity-40" />
            </Link>
            <Link
              to="/team"
              className="text-sm font-semibold text-white/80 hover:text-white py-2 transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Team & Experts</span>
              <ArrowRight size={14} className="opacity-40" />
            </Link>
            <Link
              to="/events"
              className="text-sm font-semibold text-white/80 hover:text-white py-2 transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Events & Webinars</span>
              <ArrowRight size={14} className="opacity-40" />
            </Link>
            <Link
              to="/partner-waitlist"
              className="mt-4 bg-accent text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl text-center shadow-glow hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Join Waitlist</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
