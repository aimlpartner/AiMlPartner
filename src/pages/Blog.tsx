import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SEO } from '../components/SEO';
import { STARTER_BLOGS, BlogPostData } from '../data/starterBlogs';
import { 
  ArrowUpRight, 
  Search, 
  Terminal,
  Zap, 
  Clock, 
  Calendar, 
  Tag, 
  TrendingUp, 
  BookOpen,
  Filter
} from 'lucide-react';

export function Blog() {
  const [blogs, setBlogs] = useState<BlogPostData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch blogs from Firestore & local server cache
  useEffect(() => {
    let isMounted = true;

    async function loadBlogs() {
      let firestorePosts: BlogPostData[] = [];

      try {
        const postsQuery = query(collection(db, 'blog_posts'));
        const snapshot = await getDocs(postsQuery);
        firestorePosts = snapshot.docs
          .map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title,
              slug: data.slug || doc.id,
              excerpt: data.excerpt || '',
              content: data.content || '',
              coverImage: data.coverImage || '/blog_saturn_bg.jpg',
              category: data.category || 'Engineering',
              industry: data.industry || 'Cross-Industry',
              readTime: data.readTime || '5 min read',
              author: data.author || {
                name: 'AIMLPartner Lab',
                role: 'Enterprise AI Engineer',
                avatar: '/team_deepak.jpg'
              },
              tags: data.tags || [],
              status: data.status || 'published',
              publishedAt: data.publishedAt?.toDate ? data.publishedAt.toDate().toISOString() : data.publishedAt || new Date().toISOString(),
              seo: data.seo || { metaTitle: data.title, metaDescription: data.excerpt, keywords: [] },
              featured: data.featured ?? false,
              views: data.views || 0
            };
          })
          // Only show published authentic articles in the public directory (filter out dummy stubs)
          .filter(p => p.status !== 'draft' && p.id !== 'gen_test_01' && p.slug !== 'private-llms-zero-data-leakage-financial-services-vpc' && !p.id.startsWith('starter-'));
      } catch (err: any) {
        console.warn('Firestore blog query notice, falling back to server and starter blogs:', err?.message || err);
      }

      if (!isMounted) return;

      // Merge with server posts and starter blogs
      try {
        const res = await fetch('/api/blog/posts');
        const serverPosts = res.ok ? await res.json() : [];
        const validServer = Array.isArray(serverPosts) ? serverPosts.filter((p: any) => p.status !== 'draft') : [];
        const existingSlugs = new Set(firestorePosts.map(p => p.slug));
        const uniqueServer = validServer.filter((sp: any) => !existingSlugs.has(sp.slug));
        uniqueServer.forEach((sp: any) => existingSlugs.add(sp.slug));

        const combined = [
          ...firestorePosts,
          ...uniqueServer,
          ...STARTER_BLOGS.filter(sb => !existingSlugs.has(sb.slug))
        ];

        combined.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        if (isMounted) {
          setBlogs(combined);
          setLoading(false);
        }
      } catch {
        const existingSlugs = new Set(firestorePosts.map(p => p.slug));
        const combined = [
          ...firestorePosts,
          ...STARTER_BLOGS.filter(sb => !existingSlugs.has(sb.slug))
        ];
        combined.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        if (isMounted) {
          setBlogs(combined);
          setLoading(false);
        }
      }
    }

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach(b => {
      if (b.category) set.add(b.category);
    });
    return ['All', ...Array.from(set)];
  }, [blogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter(post => {
      const matchesCat = selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;

      const matchesSearch = 
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.industry.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    if (selectedCategory !== 'All' || searchQuery) return null;
    return blogs.find(b => b.featured) || blogs[0] || null;
  }, [blogs, selectedCategory, searchQuery]);

  const gridPosts = useMemo(() => {
    if (featuredPost && selectedCategory === 'All' && !searchQuery) {
      return filteredBlogs.filter(p => p.id !== featuredPost.id);
    }
    return filteredBlogs;
  }, [filteredBlogs, featuredPost, selectedCategory, searchQuery]);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#FF5500] selection:text-black relative overflow-hidden">
      <SEO 
        title="Engineering Insights & Enterprise AI Architecture" 
        description="Read our latest engineering notes, case studies, and strategic frameworks on private VPC LLMs, autonomous agent pods, and escaping the SaaS trap."
        url="https://aimlpartner.com/blog"
      />
      
      {/* Background Hero Image */}
      <div className="absolute top-0 left-0 right-0 h-[65vh] z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: 'url("/blog_saturn_bg.jpg")' }}
        />
        {/* Gradient overlays to blend smoothly into black */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FF5500]/10 rounded-full blur-[160px] pointer-events-none z-10" />
      </div>

      {/* Header Section */}
      <section className="pt-32 sm:pt-40 pb-12 px-6 md:px-16 max-w-7xl mx-auto relative z-20 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF5500] bg-[#FF5500]/10 px-4 py-1.5 rounded-full border border-[#FF5500]/20 font-bold uppercase tracking-widest mb-6">
          <Terminal size={14} />
          <span>AIMLPartner Engineering Lab & Insights</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] mb-6 drop-shadow-2xl">
          We build things. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-[#FF5500]">Sometimes we write about it.</span>
        </h1>
        
        <p className="font-sans text-base sm:text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto text-balance font-medium">
          Authoritative blueprints on private AI infrastructure, eliminating manual corporate drag, and escaping the multi-tenant SaaS trap.
        </p>

        {/* Search & Filter Bar */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <Search size={18} className="absolute left-5 text-zinc-400 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search architecture notes, keywords, or industries..."
              className="w-full bg-black/60 border border-white/10 hover:border-white/20 focus:border-[#FF5500] rounded-full py-4 pl-14 pr-6 text-sm text-white placeholder-zinc-500 backdrop-blur-xl outline-none transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] focus:shadow-[0_0_25px_rgba(255,85,0,0.2)]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-5 text-xs text-zinc-500 hover:text-white font-mono"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#FF5500] text-black shadow-[0_0_20px_rgba(255,85,0,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post Hero (Shown only on clean "All" view) */}
      {featuredPost && (
        <section className="px-6 md:px-16 max-w-7xl mx-auto relative z-20 mb-16">
          <Link
            to={`/blog/${featuredPost.slug}`}
            className="group block relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-black/60 backdrop-blur-2xl p-8 sm:p-12 hover:border-[#FF5500]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,85,0,0.18)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5500]/10 rounded-full blur-[140px] pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="text-[10px] font-mono text-[#FF5500] bg-[#FF5500]/15 px-3 py-1.5 rounded-full font-black tracking-widest uppercase border border-[#FF5500]/30 flex items-center gap-1.5">
                    <Zap size={11} />
                    Featured Insight
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    {featuredPost.category}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                    <Clock size={12} className="text-zinc-500" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-4 group-hover:text-[#FF5500] transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed line-clamp-3 mb-8 font-medium">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 bg-[#FF5500] text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all group-hover:shadow-[0_0_20px_rgba(255,85,0,0.4)]">
                    <span>Read Full Blueprint</span>
                    <ArrowUpRight size={15} />
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{formatDate(featuredPost.publishedAt)}</span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src={featuredPost.coverImage} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-8 pb-28 px-6 md:px-16 max-w-7xl mx-auto relative z-20">
        {gridPosts.length === 0 ? (
          (searchQuery || selectedCategory !== 'All' || !featuredPost) ? (
            <div className="text-center py-20 border border-white/10 bg-black/40 backdrop-blur-xl rounded-3xl max-w-lg mx-auto">
              <BookOpen size={32} className="mx-auto text-zinc-600 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No matching articles found</h3>
              <p className="text-sm text-zinc-400 mb-6">Try adjusting your search query or category filter.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="px-5 py-2 rounded-full bg-[#FF5500] text-black font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : null
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
                className="group relative overflow-hidden p-6 border border-white/10 bg-black/40 backdrop-blur-xl rounded-3xl hover:border-[#FF5500]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,85,0,0.15)] flex flex-col justify-between"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF5500]/0 via-[#FF5500]/5 to-[#FF5500]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div>
                  {/* Thumbnail Image (16:9 Landscape) */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-white/10 bg-black/40">
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#FF5500] bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full font-bold tracking-widest uppercase border border-[#FF5500]/30">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono mb-3">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider">{post.industry}</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white tracking-tight mb-3 group-hover:text-[#FF5500] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>
                
                {/* Card Footer */}
                <div className="relative z-10 pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#FF5500] transition-colors">
                    <span>Read Post</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
