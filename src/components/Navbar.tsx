import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine navbar styles based on scroll
  const headerWrapperClass = isScrolled
    ? 'fixed top-4 left-0 right-0 z-50 flex justify-center px-4 md:px-8 transition-all duration-500'
    : 'fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500';

  const containerClass = isScrolled
    ? 'w-full max-w-[1200px] bg-black/85 backdrop-blur-xl border border-zinc-800 shadow-2xl rounded-full py-2.5 px-6 md:px-8 flex items-center justify-between text-white transition-all duration-500 relative'
    : 'w-full bg-black/40 backdrop-blur-md border-b border-zinc-900/80 py-5 px-6 md:px-12 flex items-center justify-between text-white transition-all duration-500 relative';

  const linkClass = 'text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/80 px-3 py-1.5 rounded-full transition-all duration-300';

  const ctaClass = 'bg-[#FF5500] text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-us-pop hover:bg-[#FF6E26] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 group/cta cursor-pointer';

  return (
    <>
      <header className={headerWrapperClass}>
        <div className={containerClass}>
          {/* Logo */}
          <Link to="/" className="flex items-center group cursor-pointer animate-fade-in" aria-label="AIMLPartner Home">
            <img
              src="/aimlpartner_logo.png"
              alt="AIMLPartner Logo"
              className="h-8 md:h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105 brightness-0 invert"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <a href="#pillars" className={linkClass}>
              Capabilities
            </a>
            <Link to="/agent-studio" className={linkClass}>
              Studio
            </Link>
            <Link to="/pricing" className={linkClass}>
              Pricing
            </Link>
            <Link to="/low-code-pods" className={linkClass}>
              Services
            </Link>
            <Link to="/team" className={linkClass}>
              Team
            </Link>
            <Link to="/partner-waitlist" className={linkClass}>
              Partners
            </Link>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a href="#intake" className={ctaClass}>
              <span>Book Call</span>
              <ArrowUpRight size={14} className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full transition-colors text-white hover:bg-zinc-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
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
            className="fixed inset-x-4 top-24 z-40 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-3xl p-6 flex flex-col gap-3 shadow-2xl lg:hidden text-white"
          >
            <div className="pb-3 border-b border-zinc-800 mb-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF5500] font-bold">
                Directory
              </span>
            </div>

            <a
              href="#pillars"
              className="text-sm font-semibold text-zinc-300 hover:text-white py-2 transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Capabilities & Pods</span>
              <ArrowRight size={14} className="opacity-40" />
            </a>
            <Link
              to="/agent-studio"
              className="text-sm font-semibold text-zinc-300 hover:text-white py-2 transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Agent Studio</span>
              <ArrowRight size={14} className="opacity-40" />
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-semibold text-zinc-300 hover:text-white py-2 transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Outcome Pricing</span>
              <ArrowRight size={14} className="opacity-40" />
            </Link>
            <Link
              to="/low-code-pods"
              className="text-sm font-semibold text-zinc-300 hover:text-white py-2 transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Services</span>
              <ArrowRight size={14} className="opacity-40" />
            </Link>
            <Link
              to="/team"
              className="text-sm font-semibold text-zinc-300 hover:text-white py-2 transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Team & Experts</span>
              <ArrowRight size={14} className="opacity-40" />
            </Link>
            <Link
              to="/partner-waitlist"
              className="text-sm font-semibold text-zinc-300 hover:text-white py-2 transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Partner Program</span>
              <ArrowRight size={14} className="opacity-40" />
            </Link>
            <a
              href="#intake"
              className="mt-4 bg-[#FF5500] text-black text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl text-center shadow-us-pop hover:bg-[#FF6E26] transition-colors flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Book Discovery Call</span>
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
