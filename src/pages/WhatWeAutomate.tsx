import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  X,
  ArrowRight
} from 'lucide-react';
import { smbSolutions } from '../data/smbSolutions';
import { USIntakeCTA } from '../components/us/USIntakeCTA';
import { SEO } from '../components/SEO';

export function WhatWeAutomate() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Healthcare', 'Professional', 'Field & Trades', 'Industrial', 'Consumer'];

  const filteredSolutions = useMemo(() => {
    return smbSolutions.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bottleneck.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.solutions.some(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.tools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FF5500] selection:text-black pt-28 pb-20 relative overflow-hidden">
      <SEO
        title="What We Automate : 15 Industries We Work With"
        description="Find your industry and see exactly how we can help. Simple AI solutions for real business problems."
        url="https://aimlpartner.com/what-we-automate"
      />

      {/* Majestic Saturn Hero Backdrop */}
      <div className="absolute top-0 inset-x-0 h-[720px] sm:h-[800px] lg:h-[880px] pointer-events-none overflow-hidden z-0">
        <img
          src="/saturn_automate_hero.jpg"
          alt="Saturn and Golden Rings Exploration"
          className="w-full h-full object-cover object-center opacity-85 brightness-105 contrast-110 filter saturate-[1.05]"
        />

        {/* Top Edge Fade for Navbar Readability */}
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-black via-black/50 to-transparent" />

        {/* Solar Flare Ambient Glow matching the left sun */}
        <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-[#FF5500]/15 rounded-full blur-[150px]" />

        {/* Central Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#FF5500]/10 rounded-full blur-[160px]" />

        {/* Soft Radial Scrim for Pristine Text & Search Bar Readability */}
        <div className="absolute inset-0 bg-radial from-black/30 via-black/60 to-black/90" />

        {/* Seamless Bottom Gradient Fade into Solution Grid */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-black/85 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 pt-4">
          <span className="text-xs font-display font-bold uppercase tracking-widest text-[#FF5500] block mb-3">
            Industry Automation Blueprints
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight mb-4">
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-orange-400 to-amber-300">Automate</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto font-sans leading-relaxed">
            Find your industry below and see exactly what we can take off your plate. Click any card to learn more.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mb-12 space-y-4 max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FF5500]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by industry or software you use (e.g. 'QuickBooks', 'dental', 'HVAC')..."
              className="w-full pl-12 pr-10 py-3.5 bg-zinc-950/80 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-2xl text-sm font-sans text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500]/50 transition-all shadow-2xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-display font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FF5500] text-black font-bold shadow-[0_0_20px_-2px_rgba(255,85,0,0.45)] scale-[1.02]'
                    : 'bg-zinc-950/70 backdrop-blur-sm text-zinc-400 hover:text-white hover:bg-zinc-900 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Industry Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSolutions.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={`/what-we-automate/${item.id}`}
                className="group relative bg-zinc-950/80 border border-white/[0.08] hover:border-[#FF5500]/60 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_12px_40px_-10px_rgba(255,85,0,0.22)] hover:-translate-y-1"
              >
                {/* Subtle top rim light */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 group-hover:via-[#FF5500]/70 to-transparent rounded-t-2xl transition-colors duration-300" />

                <div>
                  {/* Top Row: Icon */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-[#FF5500]/40 group-hover:bg-[#FF5500]/10 transition-all duration-300 shrink-0">
                      <Icon className="w-6 h-6 text-[#FF5500] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Name & Category */}
                  <div className="mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 group-hover:text-[#FF5500] transition-colors">
                      {item.category}
                    </span>
                    <h2 className="text-xl font-bold text-white tracking-tight group-hover:text-white transition-colors">
                      {item.name}
                    </h2>
                  </div>

                  {/* Tagline */}
                  <p className="text-sm text-[#FF5500] font-medium leading-snug mb-3">
                    {item.tagline}
                  </p>

                  {/* Problem preview */}
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {item.bottleneck}
                  </p>
                </div>

                {/* Footer: Action Link */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between mt-auto">
                  <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors flex items-center gap-1">
                    See How We Help
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/[0.04] group-hover:bg-[#FF5500] group-hover:text-black border border-white/[0.08] group-hover:border-[#FF5500] flex items-center justify-center transition-all duration-200">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Global CTA */}
        <div className="mt-20" id="intake">
          <USIntakeCTA />
        </div>
      </div>
    </div>
  );
}
