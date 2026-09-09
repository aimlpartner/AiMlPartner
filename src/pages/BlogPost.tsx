import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SEO } from '../components/SEO';
import { STARTER_BLOGS, BlogPostData } from '../data/starterBlogs';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Check, 
  Copy, 
  Quote, 
  ArrowUpRight, 
  BookOpen, 
  User, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Terminal,
  Layers,
  Linkedin,
  Twitter
} from 'lucide-react';

// Helper to validate whether heading text is meaningful (not just orphan numbers like "2." or symbols)
function isMeaningfulHeading(text: string) {
  if (!text) return false;
  const stripped = text.replace(/^[\d\.\:\)\s-]+/, '').trim();
  return stripped.length >= 2;
}

// Helper to generate a clean URL/DOM slug for headings
function generateHeadingId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Helper to deduplicate IDs if identical heading texts occur
function getUniqueId(baseId: string, seenSet: Set<string>) {
  let id = baseId;
  if (seenSet.has(id)) {
    let suffix = 2;
    while (seenSet.has(`${baseId}-${suffix}`)) {
      suffix++;
    }
    id = `${baseId}-${suffix}`;
  }
  seenSet.add(id);
  return id;
}

// Helper to extract table of contents from markdown
function extractHeadings(markdownText: string, postTitle?: string) {
  if (!markdownText) return [];
  const lines = markdownText.split('\n');
  const headings: { id: string; text: string; level: number }[] = [];
  const seenIds = new Set<string>();

  lines.forEach(line => {
    const match = line.match(/^(#{1,3})\s+(.*)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim().replace(/\*\*/g, '');
      // Skip invalid/orphan numbers like "2." or empty headings
      if (!isMeaningfulHeading(text)) {
        return;
      }
      // If it repeats the main post title, skip it
      if (level === 1 && postTitle && text.toLowerCase() === postTitle.toLowerCase()) {
        return;
      }
      const rawId = generateHeadingId(text);
      if (!rawId) return;
      const id = getUniqueId(rawId, seenIds);
      headings.push({ id, text, level });
    }
  });
  return headings;
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Scroll reading progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoized table of contents headings
  const headings = useMemo(() => {
    return extractHeadings(post?.content || '', post?.title);
  }, [post?.content, post?.title]);

  const tocNavRef = useRef<HTMLElement>(null);

  // Active heading tracking for table of contents (Viewport-relative accurate scroll spy)
  useEffect(() => {
    if (!headings || headings.length === 0) return;
    let isTicking = false;

    const updateActiveHeading = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. If reached bottom of page, activate last heading
      if (scrollY + windowHeight >= docHeight - 60) {
        setActiveHeadingId(headings[headings.length - 1].id);
        return;
      }

      // 2. If above the article (still reading hero/title section)
      const firstEl = document.getElementById(headings[0].id);
      if (firstEl) {
        const firstRect = firstEl.getBoundingClientRect();
        if (firstRect.top > windowHeight * 0.45 && scrollY < 350) {
          setActiveHeadingId('');
          return;
        }
      }

      // 3. Find the heading currently active based on viewport reading line (150px)
      const READING_LINE = 150;
      let currentId = headings[0].id;

      for (let i = 0; i < headings.length; i++) {
        const h = headings[i];
        const el = document.getElementById(h.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= READING_LINE) {
          currentId = h.id;
        } else {
          break;
        }
      }

      setActiveHeadingId(currentId);
    };

    const onScroll = () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          updateActiveHeading();
          isTicking = false;
        });
        isTicking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateActiveHeading();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [headings]);

  // Auto-scroll ONLY the Table of Contents container - NEVER touch window/document scroll
  useEffect(() => {
    if (!activeHeadingId || !tocNavRef.current) return;
    const container = tocNavRef.current;
    const activeLink = container.querySelector<HTMLElement>(`[data-heading-id="${activeHeadingId}"]`);
    if (!activeLink) return;

    const allLinks = Array.from(container.querySelectorAll<HTMLElement>('[data-heading-id]'));
    const linkIndex = allLinks.indexOf(activeLink);

    // Keep container scrolled cleanly to top for the first 2 items
    if (linkIndex <= 1) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const relativeTop = linkRect.top - containerRect.top + container.scrollTop;
    const containerHeight = container.clientHeight;
    const linkHeight = activeLink.offsetHeight;

    const linkTopInView = linkRect.top - containerRect.top;
    const linkBottomInView = linkTopInView + linkHeight;

    // Only auto-scroll if active link is near or outside visible container bounds
    if (linkTopInView < 24 || linkBottomInView > containerHeight - 24) {
      const targetScrollTop = relativeTop - (containerHeight / 2) + (linkHeight / 2);
      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: 'smooth'
      });
    }
  }, [activeHeadingId]);

  // Fetch Post by Slug
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function fetchPost() {
      try {
        // First check Firestore
        const postsRef = collection(db, 'blog_posts');
        const q = query(postsRef, where('slug', '==', slug));
        const snapshot = await getDocs(q);

        if (!snapshot.empty && isMounted) {
          const docData = snapshot.docs[0].data();
          const docId = snapshot.docs[0].id;
          let content = docData.content || '';

          // Prefer richer/updated content from server cache if Firestore had a truncated draft
          try {
            const sRes = await fetch('/api/blog/posts');
            if (sRes.ok) {
              const sPosts: any[] = await sRes.json();
              const sMatch = Array.isArray(sPosts) ? sPosts.find(p => p.slug === slug) : null;
              if (sMatch && sMatch.content && sMatch.content.length > content.length) {
                content = sMatch.content;
                // Opportunistically persist full content to Firestore
                updateDoc(doc(db, 'blog_posts', docId), { content, readTime: sMatch.readTime || '10 min read' }).catch(() => {});
              }
            }
          } catch (_) {}

          const loadedPost: BlogPostData = {
            id: docId,
            title: docData.title,
            slug: docData.slug,
            excerpt: docData.excerpt,
            content: content,
            coverImage: docData.coverImage || '/blog_saturn_bg.jpg',
            category: docData.category || 'Engineering',
            industry: docData.industry || 'Enterprise SaaS',
            readTime: docData.readTime || '5 min read',
            author: docData.author || {
              name: 'AIMLPartner Research Lab',
              role: 'Enterprise AI & Distributed Systems',
              avatar: '/team_deepak.jpg'
            },
            tags: docData.tags || [],
            status: docData.status || 'published',
            publishedAt: docData.publishedAt?.toDate ? docData.publishedAt.toDate().toISOString() : docData.publishedAt || new Date().toISOString(),
            seo: docData.seo || {
              metaTitle: docData.title,
              metaDescription: docData.excerpt,
              keywords: docData.tags || []
            },
            cta: docData.cta,
            views: (docData.views || 0) + 1
          };

          setPost(loadedPost);

          // Increment view count asynchronously
          updateDoc(doc(db, 'blog_posts', docId), {
            views: increment(1)
          }).catch(() => {});

          // Fetch other posts for related section
          const allSnap = await getDocs(collection(db, 'blog_posts'));
          let others = allSnap.docs
            .filter(d => d.id !== docId && d.data().status !== 'draft')
            .slice(0, 3)
            .map(d => ({ id: d.id, ...d.data() } as any));

          if (others.length === 0) {
            try {
              const res = await fetch('/api/blog/posts');
              if (res.ok) {
                const sPosts: any[] = await res.json();
                others = Array.isArray(sPosts)
                  ? sPosts.filter((p: any) => p.slug !== slug && p.status !== 'draft').slice(0, 3)
                  : [];
              }
            } catch (_) {}
          }
          setRelatedPosts(others);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Firestore fetch notice, trying server cache fallback:', err);
      }

      // Check server API fallback
      try {
        const res = await fetch('/api/blog/posts');
        if (res.ok) {
          const sPosts: any[] = await res.json();
          const serverMatch = Array.isArray(sPosts) ? sPosts.find(p => p.slug === slug) : null;
          if (serverMatch && isMounted) {
            setPost(serverMatch);
            const others = Array.isArray(sPosts)
              ? sPosts.filter((p: any) => p.slug !== slug && p.status !== 'draft').slice(0, 3)
              : [];
            setRelatedPosts(others);
            setLoading(false);
            return;
          }
        }
      } catch (_) {}

      if (isMounted) {
        setPost(null);
        setLoading(false);
      }
    }

    fetchPost();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2500);
  };



  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Custom Markdown Rendering with high-polish Saturn aesthetics
  const renderMarkdownContent = (markdownText: string) => {
    if (!markdownText) return null;

    const sections = markdownText.split('\n\n');
    let codeBlockCounter = 0;
    let headingCounter = 0;
    const seenIds = new Set<string>();

    return sections.map((sec, secIdx) => {
      const trimmed = sec.trim();

      // Horizontal rule
      if (trimmed === '---') {
        return <hr key={secIdx} className="border-white/10 my-10" />;
      }

      // Code blocks (```language ... ```)
      if (trimmed.startsWith('```')) {
        const lines = trimmed.split('\n');
        const firstLine = lines[0].replace('```', '').trim();
        const codeLang = firstLine || 'code';
        const codeBody = lines.slice(1, lines[lines.length - 1].startsWith('```') ? -1 : undefined).join('\n');
        const thisCodeIdx = codeBlockCounter++;

        return (
          <div key={secIdx} className="my-8 rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0C] shadow-2xl relative group">
            <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/10 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#FF5500]" />
                <span className="uppercase text-[11px] font-bold tracking-wider">{codeLang}</span>
              </div>
              <button
                onClick={() => handleCopyCode(codeBody, thisCodeIdx)}
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 transition-all cursor-pointer text-[11px]"
              >
                {copiedCodeIndex === thisCodeIdx ? (
                  <>
                    <Check size={12} className="text-green-400" />
                    <span className="text-green-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-5 font-mono text-xs sm:text-sm text-zinc-300 overflow-x-auto leading-relaxed selection:bg-[#FF5500]/30">
              <code>{codeBody}</code>
            </pre>
          </div>
        );
      }

      // Blockquotes (> Quote or Takeaway)
      if (trimmed.startsWith('>')) {
        const quoteText = trimmed.replace(/^>\s*/gm, '').replace(/\*\*/g, '');
        return (
          <div key={secIdx} className="my-8 p-6 rounded-2xl bg-gradient-to-r from-[#FF5500]/10 via-[#FF5500]/5 to-transparent border-l-4 border-[#FF5500] backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <Quote size={20} className="text-[#FF5500] shrink-0 mt-0.5" />
              <div className="font-sans text-base sm:text-lg text-zinc-200 italic leading-relaxed font-medium">
                {quoteText}
              </div>
            </div>
          </div>
        );
      }

      // Standalone dangling numbers or punctuation (e.g. "2." or "3")
      if (/^\d+[\.\:\)]*$/.test(trimmed)) {
        return null;
      }

      // Heading 1 (# in markdown body)
      if (trimmed.startsWith('# ')) {
        const titleText = trimmed.replace(/^#\s+/, '').replace(/\*\*/g, '').trim();
        if (!isMeaningfulHeading(titleText)) return null;
        if (post && titleText.toLowerCase() === post.title.toLowerCase()) {
          return null;
        }
        const isFirst = headingCounter++ === 0;
        const headingId = getUniqueId(generateHeadingId(titleText), seenIds);
        return (
          <div key={secIdx} id={headingId} className={`scroll-mt-28 ${isFirst ? 'pt-1' : 'pt-8'} mb-6`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white tracking-tight leading-tight flex items-baseline gap-3 group">
              <span>{titleText}</span>
              <a href={`#${headingId}`} className="text-zinc-600 hover:text-[#FF5500] opacity-0 group-hover:opacity-100 transition-opacity text-sm font-mono font-normal">
                #
              </a>
            </h2>
            <div className="h-0.5 w-20 bg-gradient-to-r from-[#FF5500] via-orange-400 to-transparent mt-3 mb-4" />
          </div>
        );
      }

      // Heading 2 (##)
      if (trimmed.startsWith('## ')) {
        const titleText = trimmed.replace('## ', '').replace(/\*\*/g, '').trim();
        if (!isMeaningfulHeading(titleText)) return null;
        const isFirst = headingCounter++ === 0;
        const headingId = getUniqueId(generateHeadingId(titleText), seenIds);
        return (
          <div key={secIdx} id={headingId} className={`scroll-mt-28 ${isFirst ? 'pt-1' : 'pt-6'} mb-4`}>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-tight flex items-baseline gap-3 group">
              <span>{titleText}</span>
              <a href={`#${headingId}`} className="text-zinc-600 hover:text-[#FF5500] opacity-0 group-hover:opacity-100 transition-opacity text-sm font-mono font-normal">
                #
              </a>
            </h2>
            <div className="h-0.5 w-16 bg-gradient-to-r from-[#FF5500] to-transparent mt-2 mb-4" />
          </div>
        );
      }

      // Heading 3 (###)
      if (trimmed.startsWith('### ')) {
        const titleText = trimmed.replace('### ', '').replace(/\*\*/g, '').trim();
        if (!isMeaningfulHeading(titleText)) return null;
        headingCounter++;
        const headingId = getUniqueId(generateHeadingId(titleText), seenIds);
        return (
          <div key={secIdx} id={headingId} className="scroll-mt-28 pt-4 mb-3">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
              {titleText}
            </h3>
          </div>
        );
      }

      // Bullet lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').filter(l => l.trim().startsWith('- ') || l.trim().startsWith('* '));
        return (
          <ul key={secIdx} className="my-5 space-y-2.5 pl-2">
            {items.map((item, itemIdx) => {
              const rawText = item.replace(/^[-*]\s+/, '');
              // Check for bold title format: **Title**: Description
              const boldMatch = rawText.match(/^\*\*(.*?)\*\*:(.*)/);
              if (boldMatch) {
                return (
                  <li key={itemIdx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] mt-2.5 shrink-0 shadow-[0_0_8px_rgba(255,85,0,0.8)]" />
                    <div>
                      <strong className="text-white font-semibold">{boldMatch[1]}:</strong>
                      <span>{boldMatch[2]}</span>
                    </div>
                  </li>
                );
              }
              return (
                <li key={itemIdx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] mt-2.5 shrink-0 shadow-[0_0_8px_rgba(255,85,0,0.8)]" />
                  <span>{rawText}</span>
                </li>
              );
            })}
          </ul>
        );
      }

      // Numbered lists (1. , 2. )
      if (/^\d+\.\s+/.test(trimmed)) {
        const items = trimmed.split('\n').filter(l => /^\d+\.\s+/.test(l.trim()));
        return (
          <ol key={secIdx} className="my-5 space-y-3 pl-2">
            {items.map((item, itemIdx) => {
              const cleaned = item.replace(/^\d+\.\s+/, '');
              return (
                <li key={itemIdx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
                  <span className="font-mono text-xs font-bold text-[#FF5500] bg-[#FF5500]/10 border border-[#FF5500]/20 rounded-md w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                    {itemIdx + 1}
                  </span>
                  <span>{cleaned}</span>
                </li>
              );
            })}
          </ol>
        );
      }

      // Regular Paragraph with bold formatting support
      return (
        <p key={secIdx} className="text-sm sm:text-base text-zinc-300 leading-relaxed my-4 font-normal">
          {trimmed.split(/(\*\*.*?\*\*)/g).map((chunk, cIdx) => {
            if (chunk.startsWith('**') && chunk.endsWith('**')) {
              return <strong key={cIdx} className="text-white font-semibold">{chunk.slice(2, -2)}</strong>;
            }
            return chunk;
          })}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-sans">
        <div className="w-12 h-12 border-2 border-[#FF5500] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest">Loading Article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-sans px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#FF5500]">
            <BookOpen size={28} />
          </div>
          <h1 className="text-3xl font-display font-extrabold text-white mb-3">Post Not Found</h1>
          <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
            The article you are looking for may have been moved, updated, or does not exist yet.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#FF5500] hover:bg-orange-600 text-black font-bold px-6 py-3 rounded-full transition-all"
          >
            <ArrowLeft size={16} />
            Back to Blog Hub
          </Link>
        </div>
      </div>
    );
  }


  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://aimlpartner.com/blog/${post.slug}`;

  // Structured JSON-LD for Google Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage.startsWith('http') ? post.coverImage : `https://aimlpartner.com${post.coverImage}`,
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "AIMLPartner Research Lab"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AIMLPartner",
      "logo": {
        "@type": "ImageObject",
        "url": "https://aimlpartner.com/aimlpartner_logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": shareUrl
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#FF5500] selection:text-black relative overflow-x-clip">
      <SEO
        title={post.seo?.metaTitle || post.title}
        description={post.seo?.metaDescription || post.excerpt}
        url={shareUrl}
        schema={articleSchema}
      />

      {/* Sticky Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#FF5500] via-orange-400 to-[#FF8844] z-50 transition-all duration-75 shadow-[0_0_12px_rgba(255,85,0,0.8)]"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Full-Bleed Hero Section (Not in a card) with Clearly Visible Generated Image Background */}
      <header className="relative w-full overflow-hidden min-h-[520px] lg:min-h-[620px] pt-32 sm:pt-36 pb-16 flex flex-col justify-end border-b border-white/10">
        {/* Full Cover Image Background - Clearly Visible */}
        {post.coverImage && (
          <div className="absolute inset-0 z-0">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle, translucent gradients: art is vividly visible while text is sharp */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" />
          </div>
        )}

        {/* Hero Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          {/* Top Row: Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm w-fit mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} className="text-zinc-500" />
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight size={12} className="text-zinc-500" />
            <span className="text-[#FF5500] font-semibold truncate max-w-xs">{post.category}</span>
          </div>

          {/* Center: Metadata, H1, and Excerpt */}
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs font-mono text-[#FF5500] bg-[#FF5500]/15 px-3.5 py-1.5 rounded-full font-bold tracking-widest uppercase border border-[#FF5500]/30 shadow-[0_0_15px_rgba(255,85,0,0.2)]">
                {post.category}
              </span>
              <span className="text-xs font-mono text-zinc-300 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                {post.industry}
              </span>
              <span className="text-xs text-zinc-300 font-mono flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                <Clock size={13} className="text-[#FF5500]" />
                {post.readTime}
              </span>
              <span className="text-xs text-zinc-300 font-mono flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                <Calendar size={13} className="text-[#FF5500]" />
                {formatDate(post.publishedAt)}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              {post.title}
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-100 leading-relaxed font-normal max-w-3xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] mb-8">
              {post.excerpt}
            </p>
          </div>

          {/* Bottom Row: Author Attribution Card & Social Share Buttons */}
          <div className="border-t border-white/15 pt-6 mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15">
              {post.author?.avatar ? (
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-11 h-11 rounded-full object-cover border border-[#FF5500]/40 shadow-[0_0_10px_rgba(255,85,0,0.3)]" 
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-[#FF5500]">
                  <User size={20} />
                </div>
              )}
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span>{post.author?.name || 'AIMLPartner Lab'}</span>
                  <span className="text-[10px] font-mono text-[#FF5500] bg-[#FF5500]/15 px-2 py-0.5 rounded border border-[#FF5500]/30 font-semibold">Verified</span>
                </div>
                <div className="text-xs text-zinc-400 font-medium">{post.author?.role || 'Enterprise AI Engineer'}</div>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/15">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mr-1 hidden sm:inline">Share:</span>
              <button
                onClick={handleCopyLink}
                title="Copy Link"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                {copiedLink ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-[#0077b5] transition-all"
              >
                <Linkedin size={14} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on X"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all"
              >
                <Twitter size={14} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area (Article + Sticky Sidebar) */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-12 pb-24">
        {/* Article Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl relative">
          
          {/* Main Article Content (8 columns) */}
          <article className="lg:col-span-8 min-w-0">
            {renderMarkdownContent(post.content)}

            {/* Post Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mr-2">Topics:</span>
                {post.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="text-xs font-mono text-zinc-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full hover:border-[#FF5500]/50 hover:text-[#FF5500] transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Attribution Card */}
            <div className="mt-12 p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {post.author?.avatar ? (
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="w-20 h-20 rounded-2xl object-cover border border-[#FF5500]/40 shrink-0 shadow-lg" 
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-[#FF5500] shrink-0">
                    <User size={32} />
                  </div>
                )}
                <div>
                  <div className="text-[10px] font-mono text-[#FF5500] uppercase tracking-widest mb-1 font-bold">Author Bio</div>
                  <h4 className="text-xl font-display font-bold text-white mb-2">{post.author?.name}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    Architect at AIMLPartner, engineering sovereign enterprise AI systems, private VPC model deployments, and autonomous workflow pods from our Bedminster, NJ engineering facility.
                  </p>
                  <a 
                    href="/#book-call" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5500] hover:text-orange-400 transition-colors uppercase tracking-wider"
                  >
                    <span>Connect with the Engineering Pod</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar (4 columns) - Sticks till the end of the article */}
          <aside className="lg:col-span-4 relative">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] flex flex-col">
              <div className="bg-[#0A0A0C]/90 border border-white/10 backdrop-blur-2xl p-5 sm:p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col max-h-[calc(100vh-7rem)]">
                {/* Table of Contents Header */}
                {headings.length > 0 && (
                  <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-widest text-[#FF5500] mb-3 shrink-0">
                    <div className="flex items-center gap-2">
                      <Layers size={14} />
                      <span>Table of Contents</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono font-normal">
                      {headings.length} sections
                    </span>
                  </div>
                )}

                {/* Auto-scrolling Table of Contents List */}
                {headings.length > 0 && (
                  <nav 
                    ref={tocNavRef}
                    className="space-y-1 overflow-y-auto pr-1.5 mb-4 max-h-[340px] xl:max-h-[420px] shrink [scrollbar-width:thin] [scrollbar-color:#3f3f46_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full scroll-smooth"
                  >
                    {headings.map((h, hIdx) => {
                      const isActive = activeHeadingId === h.id;
                      return (
                        <a
                          key={hIdx}
                          href={`#${h.id}`}
                          data-heading-id={h.id}
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById(h.id);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth' });
                              setActiveHeadingId(h.id);
                            }
                          }}
                          className={`block text-xs transition-all leading-relaxed py-1.5 px-2.5 rounded-lg ${
                            h.level === 3 ? 'ml-3 pl-2.5 text-[11px]' : 'font-medium'
                          } ${
                            isActive 
                              ? 'text-[#FF5500] font-bold bg-[#FF5500]/10 border-l-2 border-[#FF5500] shadow-[inset_0_0_12px_rgba(255,85,0,0.05)]' 
                              : h.level === 3 
                                ? 'text-zinc-400 hover:text-zinc-200' 
                                : 'text-zinc-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span className="line-clamp-2">{h.text}</span>
                        </a>
                      );
                    })}
                  </nav>
                )}

                {/* Conversion Widget - Always Visible at bottom */}
                <div className={`shrink-0 ${headings.length > 0 ? 'pt-4 border-t border-white/10' : ''}`}>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
                    <ShieldCheck size={14} className="text-[#FF5500]" />
                    <span>Private AI Architecture</span>
                  </div>
                  <h4 className="text-base font-display font-bold text-white mb-1 leading-snug">
                    Deploy Sovereign AI in 14 Days
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-3.5">
                    Zero multi-tenant SaaS leakages. Full VPC containment & dedicated engineering pods.
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href="/#book-call"
                      className="w-full text-center bg-[#FF5500] hover:bg-[#FF6611] text-black font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(255,85,0,0.3)] hover:scale-[1.01] cursor-pointer"
                    >
                      Schedule 15-Min Discovery
                    </a>
                    <Link
                      to="/analyzer"
                      className="w-full text-center bg-white/5 hover:bg-white/10 text-white font-medium text-xs py-2 px-4 rounded-xl border border-white/10 transition-all cursor-pointer"
                    >
                      Run AI Readiness Audit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Global Bottom Conversion Banner */}
        <section className="mt-24 p-10 sm:p-14 rounded-3xl border border-white/10 bg-gradient-to-br from-black/80 via-black to-[#FF5500]/10 backdrop-blur-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#FF5500]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF5500] bg-[#FF5500]/10 px-3 py-1.5 rounded-full border border-[#FF5500]/20 font-bold inline-block mb-4">
              Next Steps For Your Organization
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Stop debating roadmaps. Build working private AI in weeks.
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8 font-medium">
              We eliminate manual corporate drag, train localized models on your confidential schemas, and deploy production pipelines in 14-day execution sprints.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/#book-call"
                className="inline-flex items-center gap-2 bg-[#FF5500] hover:bg-orange-600 text-black font-bold text-sm px-6 py-3.5 rounded-full transition-all shadow-[0_0_25px_rgba(255,85,0,0.4)] cursor-pointer"
              >
                <span>Book Architecture Call</span>
                <ArrowUpRight size={16} />
              </a>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-medium text-sm px-6 py-3.5 rounded-full border border-white/10 transition-all cursor-pointer"
              >
                <ArrowLeft size={16} />
                <span>Explore All Articles</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles Grid */}
        {relatedPosts.length > 0 && (
          <section className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                  Recommended Insights
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-1">More engineering frameworks & strategic case studies</p>
              </div>
              <Link to="/blog" className="text-xs font-mono font-bold text-[#FF5500] hover:underline flex items-center gap-1">
                <span>View all</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((rel, idx) => (
                <Link
                  key={idx}
                  to={`/blog/${rel.slug}`}
                  className="group relative overflow-hidden p-6 border border-white/10 bg-black/40 backdrop-blur-xl rounded-3xl hover:border-[#FF5500]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,85,0,0.15)] flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 rounded-2xl overflow-hidden mb-5 border border-white/10">
                      <img 
                        src={rel.coverImage || '/blog_saturn_bg.jpg'} 
                        alt={rel.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute top-3 left-3 text-[10px] font-mono text-[#FF5500] bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full font-bold uppercase border border-[#FF5500]/30">
                        {rel.category}
                      </div>
                    </div>
                    <h4 className="font-display text-lg font-bold text-white group-hover:text-[#FF5500] transition-colors leading-snug mb-2 line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <span>{rel.readTime}</span>
                    <span className="text-[#FF5500] flex items-center gap-1 font-bold">
                      Read <ArrowUpRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
