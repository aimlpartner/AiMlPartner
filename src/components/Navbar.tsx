import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-1 shadow-sm' : 'bg-white/80 backdrop-blur-md py-2 border-b border-slate-100'
      }`}
    >
      <div className="container-max flex items-center justify-between relative z-50">
        <Link to="/" className="flex items-center transition-colors text-slate-900">
          <div className={`${isScrolled ? 'h-12' : 'h-16 md:h-20'} w-auto flex items-center transition-all duration-300`}>
            <img 
              src="https://darkgray-finch-838850.hostingersite.com/wp-content/uploads/2026/04/WhatsApp_Image_2026-04-28_at_12.18.40_AM-removebg-preview.png" 
              alt="AIMLPartner Logo"
              className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex items-center gap-6 text-sm font-medium transition-colors ${isScrolled ? 'text-slate-600' : 'text-slate-600'}`}>
          <Link to="/agent-studio" className="transition-colors hover:text-sky-600">Agent Studio</Link>
          <Link to="/agent-shop" className="transition-colors hover:text-sky-600">Agent Shop</Link>
          <Link to="/low-code-pods" className="transition-colors hover:text-sky-600">Low-Code Pods</Link>
          <Link to="/agentforce-services" className="transition-colors hover:text-sky-600">Agentforce</Link>
          <Link to="/team" className="transition-colors hover:text-sky-600">Team</Link>
          <Link to="/events" className="transition-colors hover:text-sky-600">Events</Link>
          <button 
            onClick={() => document.dispatchEvent(new CustomEvent('open-quiz'))}
            className="bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-full shadow-md shadow-sky-500/20 px-5 py-2.5 hover:from-sky-500 hover:to-sky-600 transition-colors ml-2"
          >
            Assess Readiness
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 text-slate-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-0 left-0 right-0 bg-white border-b border-slate-200 pt-24 pb-6 px-6 flex flex-col gap-4 shadow-xl z-40"
          >
            <Link to="/agent-studio" className="text-slate-600 hover:text-sky-600 transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Agent Studio</Link>
            <Link to="/agent-shop" className="text-slate-600 hover:text-sky-600 transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Agent Shop</Link>
            <Link to="/low-code-pods" className="text-slate-600 hover:text-sky-600 transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Low-Code Pods</Link>
            <Link to="/agentforce-services" className="text-slate-600 hover:text-sky-600 transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Agentforce Services</Link>
            <Link to="/team" className="text-slate-600 hover:text-sky-600 transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Team</Link>
            <Link to="/events" className="text-slate-600 hover:text-sky-600 transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Events</Link>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                document.dispatchEvent(new CustomEvent('open-quiz'));
              }}
              className="bg-gradient-to-r from-sky-400 to-sky-600 text-white rounded-full px-5 py-3 font-medium w-full mt-2 shadow-md shadow-sky-500/20 hover:from-sky-500 hover:to-sky-700 transition-colors"
            >
              Assess Readiness
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
