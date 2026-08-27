import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface FooterNavLink {
  label: string;
  to?: string;
  href?: string;
}

export function USFooter() {
  const mainNavLinks: FooterNavLink[] = [
    { label: 'What We Automate', to: '/what-we-automate' },
    { label: 'Use Cases', to: '/use-cases' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Services', to: '/services' },
    { label: 'About', to: '/about' },
    { label: 'AI Auditor', to: '/analyzer' },
    { label: 'Direct Desk', to: '/#intake' }
  ];

  const serviceLinks: FooterNavLink[] = [
    { label: 'Operations', to: '/services/operations-automation' },
    { label: 'Sales AI', to: '/services/sales-ai' },
    { label: 'Support AI', to: '/services/customer-agents' },
    { label: 'Engineering', to: '/services/custom-engineering' },
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
        {/* Stronger bottom edge fade to ensure text readability */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent" />
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

          {/* Nav Links Container */}
          <div className="flex flex-col items-center sm:items-end gap-5">
            
            {/* Primary Nav Links */}
            <nav className="flex flex-wrap items-center justify-center sm:justify-end gap-6 sm:gap-8 text-xs font-mono uppercase tracking-widest text-zinc-300">
              {mainNavLinks.map((link, idx) => (
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
            </nav>

            {/* Secondary Highlighted Services Sub-Nav */}
            <nav className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 text-[10px] font-mono uppercase tracking-widest">
              <span className="text-zinc-500 font-bold hidden md:inline-block">SERVICES //</span>
              {serviceLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.to!}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-sm"
                >
                  {link.label}
                </Link>
              ))}
              <div className="hidden sm:block w-px h-4 bg-white/20 mx-2" />
              <a
                href="mailto:info@aimlpartner.com"
                className="text-[#FF5500] hover:text-[#FF6E26] transition-colors flex items-center gap-1 font-bold"
              >
                <span>info@aimlpartner.com</span>
                <ArrowUpRight size={12} />
              </a>
            </nav>
          </div>

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
              // CUSTOM AI AUTOMATION • APPLIED ENTERPRISE ENGINEERING
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM ROW: SECURITY PROTOCOLS & COPYRIGHT */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-zinc-300 drop-shadow-md backdrop-blur-xs">
          
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#FF5500]/40 text-[10px] text-[#FF5500] font-bold">
              ✦ BEDMINSTER, NJ HQ
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-zinc-200">
              ✦ SOC2 TYPE II
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-zinc-200">
              ✦ HIPAA COMPLIANT
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] text-zinc-200">
              ✦ ZERO RETENTION
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#FF5500]/50 text-[10px] text-zinc-200 font-bold">
              ✦ 100% PRIVATE VPC
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] bg-black/40 px-4 py-2 rounded-lg border border-white/5 backdrop-blur-sm">
            <p className="text-zinc-200">© {new Date().getFullYear()} AIML PARTNER INC. BEDMINSTER, NEW JERSEY, USA.</p>
            <span className="text-zinc-600">|</span>
            <span className="hover:text-white transition-colors cursor-pointer text-zinc-300">Security Protocol</span>
            <span className="hover:text-white transition-colors cursor-pointer text-zinc-300">Custody Terms</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
