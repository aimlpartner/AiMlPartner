import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Search,
  X,
  ArrowRight,
  ArrowUpRight,
  Zap,
  Sparkles
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
        title="What We Automate - 15 SMB Industry Solutions"
        description="Select your industry to explore 3 tailored AI automation solutions built specifically for your SMB."
        url="https://aimlpartner.com/what-we-automate"
      />

      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,85,0,0.12),transparent_70%)] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,85,0,0.08),transparent_70%)] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 pt-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-orange-400 to-amber-300">Automate</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto">
            Choose your industry below to explore dedicated, step-by-step AI solutions built for your exact workflows.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mb-10 space-y-4 max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by industry, software, or bottleneck (e.g. 'Epic', 'Takeoff', 'COI', 'Dentrix')..."
              className="w-full pl-11 pr-10 py-3 bg-zinc-950/90 border border-white/10 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#FF5500] transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FF5500] text-black font-semibold shadow-[0_0_15px_-2px_rgba(255,85,0,0.4)]'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Clean, Simple Industry Card Grid Linking to Dedicated Page */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSolutions.map((item, index) => {
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
                  {/* Top Row: Icon + Number */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-[#FF5500]/40 group-hover:bg-[#FF5500]/10 transition-all duration-300 shrink-0">
                      <Icon className="w-6 h-6 text-[#FF5500] group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    <span className="text-[11px] font-mono text-zinc-500 bg-white/[0.02] px-2.5 py-1 rounded-md border border-white/[0.04]">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
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

                  {/* Bottleneck preview */}
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {item.bottleneck}
                  </p>
                </div>

                {/* Footer: Action Link */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between mt-auto">
                  <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors flex items-center gap-1">
                    View 3 Solutions
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
