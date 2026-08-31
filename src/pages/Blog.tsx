import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SEO } from '../components/SEO';

export function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const posts = [
    {
      title: "How to Build Your Own Internal AI Tooling",
      date: "August 2026",
      category: "Engineering",
      excerpt: "Stop relying on SaaS that owns your data. Here is our step-by-step framework for deploying LLMs privately on your own VPC.",
      slug: "#",
      readTime: "6 min read"
    },
    {
      title: "The Death of the 6-Month Consulting Engagement",
      date: "July 2026",
      category: "Strategy",
      excerpt: "Why the traditional consulting model is broken for AI implementation, and why 14-day execution sprints are the only way forward.",
      slug: "#",
      readTime: "4 min read"
    },
    {
      title: "Automating Invoicing with High Accuracy",
      date: "June 2026",
      category: "Case Study",
      excerpt: "How we helped a logistics firm reduce manual data entry by 94% using custom vision models and database syncs.",
      slug: "#",
      readTime: "5 min read"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#FF5500] selection:text-black relative overflow-hidden">
      <SEO 
        title="Blog & Insights | AIMLPartner" 
        description="Read our latest engineering notes, case studies, and thoughts on the future of private enterprise AI."
        url="https://aimlpartner.com/blog"
      />
      
      {/* Background Hero Image */}
      <div className="absolute top-0 left-0 right-0 h-[60vh] z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{ backgroundImage: 'url("/blog_saturn_bg.jpg")' }}
        />
        {/* Gradient overlays to blend smoothly into black */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5500]/10 rounded-full blur-[150px] pointer-events-none z-10" />
      </div>

      {/* Header Section */}
      <section className="pt-28 sm:pt-36 pb-8 px-6 md:px-16 max-w-7xl mx-auto relative z-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
          <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse"></span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-300">Engineering Notes</span>
        </div>
        
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white leading-[1.1] mb-4 drop-shadow-2xl">
          We build things. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-500">Sometimes we write about it.</span>
        </h1>
        
        <p className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto text-balance font-medium">
          Thoughts on private AI infrastructure, killing manual workflows, and escaping the SaaS trap.
        </p>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <div 
              key={idx} 
              className="group relative overflow-hidden p-8 border border-white/10 bg-black/40 backdrop-blur-xl rounded-3xl hover:border-[#FF5500]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,85,0,0.15)] flex flex-col justify-between min-h-[320px]"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF5500]/0 via-[#FF5500]/5 to-[#FF5500]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="text-[10px] font-mono text-[#FF5500] bg-[#FF5500]/10 px-3 py-1.5 rounded-full font-bold tracking-widest uppercase border border-[#FF5500]/20">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-widest">
                    {post.date}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white tracking-tight mb-4 group-hover:text-[#FF5500] transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="font-sans text-sm text-zinc-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
              
              <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">{post.readTime}</span>
                <Link to={post.slug} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-[#FF5500] transition-colors cursor-pointer group/link">
                  <span>Read Post</span>
                  <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
