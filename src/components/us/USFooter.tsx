import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function USFooter() {
  const navLinks = [
    { label: 'Capabilities', href: '#pillars' },
    { label: 'Studio', to: '/agent-studio' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Services', to: '/low-code-pods' },
    { label: 'About', to: '/about' },
    { label: 'Direct Desk', href: '#intake' }
  ];

  return (
    <footer className="relative bg-black text-white pt-24 pb-12 px-6 md:px-16 font-sans overflow-hidden select-none">
      
      {/* Cinematic Saturn Horizon Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/footer_bg.jpg"
          alt="Saturn Cosmic Horizon"
          className="w-full h-full object-cover object-bottom opacity-85 brightness-105 contrast-110"
        />
        {/* Subtle top edge fade for seamless blend into previous section */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-black/60 to-transparent" />
        {/* Subtle bottom edge fade */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-between min-h-[520px]">
        
        {/* ========================================================================= */}
        {/* TOP ROW: LOGO & MINIMALIST HIGH-FASHION NAV LINKS */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-10 border-b border-white/10 gap-8 backdrop-blur-xs">
          
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <img
              src="/aimlpartner_logo.png"
              alt="AIML Partner"
              className="h-7 w-auto brightness-0 invert group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
            />
          </Link>

          {/* Clean Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono uppercase tracking-widest text-zinc-300">
            {navLinks.map((link, idx) => (
              link.to ? (
                <Link
                  key={idx}
                  to={link.to}
                  className="hover:text-[#FF5500] transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={idx}
                  href={link.href}
                  className="hover:text-[#FF5500] transition-colors"
                >
                  {link.label}
                </a>
              )
            ))}
            <a
              href="mailto:info@aimlpartner.com"
              className="text-[#FF5500] hover:text-white transition-colors flex items-center gap-1 font-bold"
            >
              <span>info@aimlpartner.com</span>
              <ArrowUpRight size={12} />
            </a>
          </nav>

        </div>

        {/* ========================================================================= */}
        {/* CENTERPIECE: SINGLE-LINE LUMINOUS "AIML PARTNER" */}
        {/* ========================================================================= */}
        <div className="my-auto py-12 flex items-center justify-center overflow-hidden">
          <div className="w-full text-center">
            <h1 className="whitespace-nowrap font-display font-black text-[7.5vw] lg:text-[8.5vw] tracking-tighter leading-none uppercase select-none transition-all duration-500 bg-gradient-to-b from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] hover:drop-shadow-[0_0_60px_rgba(255,85,0,0.8)]">
              AIML PARTNER
            </h1>
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#FF5500] font-extrabold mt-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              // SOVEREIGN AI ARCHITECTURE • APPLIED ENTERPRISE ENGINEERING
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM ROW: SECURITY PROTOCOLS & COPYRIGHT */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-zinc-400 backdrop-blur-xs">
          
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#FF5500]/40 text-[10px] text-[#FF5500] font-bold">
              ✦ NEW JERSEY HQ
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-zinc-200">
              ✦ SOC2 TYPE II
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-zinc-200">
              ✦ HIPAA SOVEREIGN
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-zinc-200">
              ✦ ZERO RETENTION
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#FF5500]/50 text-[10px] text-zinc-200 font-bold">
              ✦ 100% PRIVATE VPC
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <p>© {new Date().getFullYear()} AIML PARTNER INC. NEW JERSEY, USA.</p>
            <span className="text-zinc-600">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">Security Protocol</span>
            <span className="hover:text-white transition-colors cursor-pointer">Custody Terms</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
