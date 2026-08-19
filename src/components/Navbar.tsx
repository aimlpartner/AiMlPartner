import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ArrowUpRight, ChevronDown, Workflow, TrendingUp, Bot, Cpu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const subServices = [
    {
      title: "Operations & Workflows",
      desc: "Invoicing, document ingestion & database sync",
      link: "/services/operations-automation",
      icon: <Workflow size={16} className="text-[#FF5500]" />
    },
    {
      title: "Sales AI & Lead Triage",
      desc: "Sub-60s response, qualification & custom proposals",
      link: "/services/sales-ai",
      icon: <TrendingUp size={16} className="text-[#FF5500]" />
    },
    {
      title: "24/7 Custom Support Agents",
      desc: "Private RAG knowledge search & authenticated lookups",
      link: "/services/customer-agents",
      icon: <Bot size={16} className="text-[#FF5500]" />
    },
    {
      title: "Private Cloud AI Engineering",
      desc: "Self-hosted LLMs, VPC security & 100% IP ownership",
      link: "/services/custom-engineering",
      icon: <Cpu size={16} className="text-[#FF5500]" />
    }
  ];

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 200);
  };

  const headerWrapperClass = isScrolled
    ? 'fixed top-4 left-0 right-0 z-50 flex justify-center px-4 md:px-8 transition-all duration-500'
    : 'fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500';

  const containerClass = isScrolled
    ? 'w-full max-w-[1200px] bg-black/85 backdrop-blur-xl border border-zinc-800 shadow-2xl rounded-full py-2.5 px-6 md:px-8 flex items-center justify-between text-white transition-all duration-500 relative'
    : 'w-full bg-black/40 backdrop-blur-md border-b border-zinc-900/80 py-5 px-6 md:px-12 flex items-center justify-between text-white transition-all duration-500 relative';

  const linkClass = 'text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/80 px-3 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1 cursor-pointer';

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
            {/* Services with Hover Flyout Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                to="/services" 
                className={`${linkClass} ${location.pathname.startsWith('/services') ? 'text-[#FF5500] bg-zinc-900/90' : ''}`}
              >
                <span>Services</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#FF5500]' : 'opacity-60'}`} />
              </Link>

              {/* Desktop Flyout Dropdown Menu */}
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-2 w-[340px] bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800/90 rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 text-left"
                  >
                    <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 px-3 py-1.5 border-b border-zinc-900 mb-1">
                      Specialized Service Tracks
                    </div>

                    <div className="space-y-1">
                      {subServices.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={sub.link}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-900/90 hover:border-zinc-700/60 border border-transparent transition-all group/item"
                        >
                          <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover/item:border-[#FF5500]/50 group-hover/item:bg-[#FF5500]/10 transition-colors mt-0.5">
                            {sub.icon}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white group-hover/item:text-[#FF5500] transition-colors flex items-center gap-1">
                              <span>{sub.title}</span>
                              <ArrowRight size={11} className="opacity-0 group-hover/item:opacity-100 transition-opacity -translate-x-1 group-hover/item:translate-x-0" />
                            </div>
                            <div className="text-[11px] text-zinc-400 leading-tight mt-0.5">{sub.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-1.5 pt-2 border-t border-zinc-900 px-2 flex justify-between items-center text-[11px]">
                      <Link 
                        to="/services" 
                        className="text-[#FF5500] hover:text-white font-bold transition-colors flex items-center gap-1 py-1"
                      >
                        <span>View All Services Hub</span>
                        <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/agent-studio" className={linkClass}>
              Studio
            </Link>
            <Link to="/pricing" className={linkClass}>
              Pricing
            </Link>
            <Link to="/about" className={linkClass}>
              About
            </Link>
            <Link to="/analyzer" className={linkClass}>
              AI Auditor
            </Link>
            <Link to="/partner-waitlist" className={linkClass}>
              Partners
            </Link>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a href="#intake" className={ctaClass}>
              <span>Book Call</span>
              <ArrowUpRight size={13} className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay (Hamburger Menu with Accordion Subpages) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed top-20 left-4 right-4 z-40 bg-zinc-950/98 backdrop-blur-2xl border border-zinc-800 rounded-3xl p-6 flex flex-col gap-2 shadow-2xl lg:hidden text-white max-h-[85vh] overflow-y-auto"
          >
            {/* Services with Sub-Links */}
            <div className="border-b border-zinc-800/80 pb-3">
              <div className="flex items-center justify-between py-2 text-sm font-bold text-white">
                <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FF5500]">
                  Services
                </Link>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <ChevronDown size={16} className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-[#FF5500]' : ''}`} />
                </button>
              </div>

              {mobileServicesOpen && (
                <div className="pl-3 mt-1 space-y-2 border-l border-zinc-800">
                  {subServices.map((sub, idx) => (
                    <Link
                      key={idx}
                      to={sub.link}
                      className="flex items-center gap-2.5 py-1.5 text-xs text-zinc-300 hover:text-[#FF5500] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sub.icon}
                      <span className="font-semibold">{sub.title}</span>
                    </Link>
                  ))}
                  <Link
                    to="/services"
                    className="flex items-center gap-1.5 py-1 text-xs text-[#FF5500] font-bold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Overview Hub</span>
                    <ArrowRight size={11} />
                  </Link>
                </div>
              )}
            </div>

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
              to="/about"
              className="text-sm font-semibold text-zinc-300 hover:text-white py-2 transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>About & Team</span>
              <ArrowRight size={14} className="opacity-40" />
            </Link>
            <Link
              to="/analyzer"
              className="text-sm font-semibold text-zinc-300 hover:text-white py-2 transition-colors flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>AI Business Auditor</span>
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
              className="mt-4 bg-[#FF5500] text-black text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl text-center shadow-us-pop hover:bg-[#FF6E26] transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
