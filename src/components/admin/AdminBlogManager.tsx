import React, { useState, useEffect, useMemo } from 'react';
import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { BlogPostData, STARTER_BLOGS } from '../../data/starterBlogs';
import {
  Calendar,
  Clock,
  Zap,
  Cpu,
  Play,
  Pause,
  Plus,
  Trash2,
  Pencil,
  Eye,
  ExternalLink,
  Search,
  Check,
  X,
  RefreshCw,
  Sliders,
  FileText,
  Activity,
  Layers,
  Wand2,
  Tag,
  Globe,
  Settings,
  AlertCircle,
  HelpCircle,
  Image as ImageIcon,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { CustomSelect, CustomSelectOption } from '../common/CustomSelect';
import { cleanPlainText } from '../../pages/BlogPost';

const INTERVAL_OPTIONS: CustomSelectOption[] = [
  { value: 6, label: 'Every 6 Hours', sublabel: 'High Frequency' },
  { value: 12, label: 'Every 12 Hours', sublabel: 'Twice Daily' },
  { value: 24, label: 'Every 24 Hours', sublabel: 'Daily - Recommended' },
  { value: 48, label: 'Every 48 Hours', sublabel: 'Every 2 Days' },
  { value: 72, label: 'Every 72 Hours', sublabel: 'Every 3 Days' },
  { value: 168, label: 'Every 7 Days', sublabel: 'Weekly' }
];

const TONE_OPTIONS: CustomSelectOption[] = [
  { value: 'authoritative-technical', label: 'Authoritative Technical', sublabel: 'Architecture, Schemas, VPC' },
  { value: 'strategic-executive', label: 'Strategic Executive', sublabel: 'ROI, TCO, 14-Day Delivery' },
  { value: 'practical-guide', label: 'Practical Guide', sublabel: 'Step-by-Step Implementation' },
  { value: 'thought-leadership', label: 'Thought Leadership', sublabel: 'Critique of SaaS Bloat' }
];

const CATEGORY_OPTIONS: CustomSelectOption[] = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Strategy', label: 'Strategy' },
  { value: 'Case Study', label: 'Case Study' },
  { value: 'Automation', label: 'Automation' },
  { value: 'Enterprise AI', label: 'Enterprise AI' }
];

const STATUS_OPTIONS: CustomSelectOption[] = [
  { value: 'published', label: 'Published', sublabel: 'Live on Website' },
  { value: 'draft', label: 'Draft', sublabel: 'Hidden from Public' }
];

interface AdminBlogManagerProps {
  user: any;
}

export function AdminBlogManager({ user }: AdminBlogManagerProps) {
  // Navigation
  const [activeSection, setActiveSection] = useState<'automation' | 'posts' | 'logs'>('automation');

  // Blog Posts from Firestore
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  // Automation Config State
  const [config, setConfig] = useState<any>({
    enabled: false,
    intervalHours: 24,
    statusOnGenerate: 'published',
    selectedNiches: [],
    customNiches: [],
    selectedIndustries: [],
    customIndustries: [],
    tone: 'authoritative-technical',
    primaryKeywords: [],
    callToAction: {
      type: 'call',
      title: 'Deploy Private Enterprise AI with AIMLPartner in 14 Days',
      description: 'Skip the 6-month consulting bloat. Build and deploy private AI in 14-day execution sprints.',
      buttonText: 'Book Architecture Discovery Call',
      buttonUrl: '/#book-call'
    },
    lastRunAt: null,
    nextRunAt: null,
    totalGenerated: 0
  });
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [configSuccessMsg, setConfigSuccessMsg] = useState('');

  // New inputs for tags
  const [newNicheInput, setNewNicheInput] = useState('');
  const [newIndustryInput, setNewIndustryInput] = useState('');
  const [newKeywordInput, setNewKeywordInput] = useState('');

  // Logs State
  const [logs, setLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // Curated Images
  const [curatedImages, setCuratedImages] = useState<any[]>([]);

  // Instant Generation State
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [overrideTopic, setOverrideTopic] = useState('');
  const [overrideNiche, setOverrideNiche] = useState('');
  const [overrideIndustry, setOverrideIndustry] = useState('');
  const [generateResultMsg, setGenerateResultMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Post Editor State
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editorTab, setEditorTab] = useState<'write' | 'preview'>('write');
  const [isSavingPost, setIsSavingPost] = useState(false);
  const [isAiPolishing, setIsAiPolishing] = useState(false);
  const [isGeneratingLandscapeImage, setIsGeneratingLandscapeImage] = useState(false);
  const [postForm, setPostForm] = useState({
    title: '',
    slug: '',
    category: 'Engineering',
    industry: 'Enterprise SaaS',
    readTime: '6 min read',
    excerpt: '',
    content: '',
    coverImage: '/blog_saturn_bg.jpg',
    tags: '',
    status: 'published' as 'published' | 'draft',
    metaTitle: '',
    metaDescription: '',
    focusKeywords: ''
  });

  // 1. Fetch Blog Posts from Firestore and Local Server
  const fetchLocalServerPosts = async () => {
    try {
      const res = await fetch('/api/blog/posts');
      if (res.ok) {
        const serverPosts = await res.json();
        return Array.isArray(serverPosts) ? serverPosts : [];
      }
    } catch (e) {
      console.warn('[AdminBlogManager] Local posts fetch notice:', e);
    }
    return [];
  };

  useEffect(() => {
    const q = query(collection(db, 'blog_posts'));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const firestorePosts: any[] = snapshot.docs.map(d => {
        const dData = d.data();
        const rawContent = dData.content || '';
        const cleanContent = rawContent.replace(/\*\*/g, '');
        const cleanTitle = cleanPlainText(dData.title);
        const cleanExcerpt = cleanPlainText(dData.excerpt);
        const cleanCategory = cleanPlainText(dData.category) || 'Engineering';
        const cleanIndustry = cleanPlainText(dData.industry) || 'Enterprise SaaS';
        const cleanTags = Array.isArray(dData.tags) ? dData.tags.map((t: string) => cleanPlainText(t)) : [];

        // Auto-clean any stars from Firestore documents using authenticated admin credentials
        if (rawContent.includes('**') || dData.title?.includes('**') || dData.excerpt?.includes('**') || dData.category?.includes('**')) {
          updateDoc(doc(db, 'blog_posts', d.id), {
            title: cleanTitle,
            excerpt: cleanExcerpt,
            content: cleanContent,
            category: cleanCategory,
            industry: cleanIndustry,
            tags: cleanTags
          }).catch(() => {});
        }

        return {
          id: d.id,
          ...dData,
          title: cleanTitle,
          excerpt: cleanExcerpt,
          content: cleanContent,
          category: cleanCategory,
          industry: cleanIndustry,
          tags: cleanTags,
          publishedAt: dData.publishedAt?.toDate ? dData.publishedAt.toDate().toISOString() : dData.publishedAt
        };
      });

      const serverPosts = await fetchLocalServerPosts();
      const sanitizedServerPosts = serverPosts.map((sp: any) => ({
        ...sp,
        title: cleanPlainText(sp.title),
        excerpt: cleanPlainText(sp.excerpt),
        content: (sp.content || '').replace(/\*\*/g, ''),
        category: cleanPlainText(sp.category) || 'Engineering',
        industry: cleanPlainText(sp.industry) || 'Enterprise SaaS',
        tags: Array.isArray(sp.tags) ? sp.tags.map((t: string) => cleanPlainText(t)) : []
      }));

      const existingIds = new Set(firestorePosts.map((p: any) => p.id));
      const existingSlugs = new Set(firestorePosts.map((p: any) => p.slug));

      const merged = [...firestorePosts];
      for (const sp of sanitizedServerPosts) {
        if (!existingIds.has(sp.id) && !existingSlugs.has(sp.slug)) {
          merged.push(sp);
          existingIds.add(sp.id);
          existingSlugs.add(sp.slug);

          // Auto-sync unwritten server posts to Firestore using admin credentials
          if (user && sp.title && sp.slug) {
            try {
              addDoc(collection(db, 'blog_posts'), {
                ...sp,
                createdAt: serverTimestamp(),
                publishedAt: serverTimestamp()
              }).catch(() => {});
            } catch (_) {}
          }
        }
      }

      merged.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
      setPosts(merged);
      setLoadingPosts(false);
    }, async (err) => {
      console.warn('Firestore blog subscription notice, using server posts fallback:', err);
      const serverPosts = await fetchLocalServerPosts();
      const sanitizedServerPosts = serverPosts.map((sp: any) => ({
        ...sp,
        title: cleanPlainText(sp.title),
        excerpt: cleanPlainText(sp.excerpt),
        content: (sp.content || '').replace(/\*\*/g, ''),
        category: cleanPlainText(sp.category) || 'Engineering',
        industry: cleanPlainText(sp.industry) || 'Enterprise SaaS',
        tags: Array.isArray(sp.tags) ? sp.tags.map((t: string) => cleanPlainText(t)) : []
      }));
      sanitizedServerPosts.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
      setPosts(sanitizedServerPosts);
      setLoadingPosts(false);
    });

    return () => unsubscribe();
  }, [user]);

  // 2. Fetch Config & Images & Logs
  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/blog/config');
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      }
    } catch (err) {
      console.error('Failed to load blog config:', err);
    } finally {
      setLoadingConfig(false);
    }
  };

  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const res = await fetch('/api/blog/logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (err) {
      console.error('Failed to load blog logs:', err);
    } finally {
      setLoadingLogs(false);
    }
  };

  const fetchCuratedImages = async () => {
    try {
      const res = await fetch('/api/blog/curated-images');
      if (res.ok) {
        const data = await res.json();
        setCuratedImages(data);
      }
    } catch (err) {
      console.error('Failed to load images:', err);
    }
  };

  useEffect(() => {
    fetchConfig();
    fetchLogs();
    fetchCuratedImages();
  }, []);

  // Save Automation Config
  const handleSaveConfig = async () => {
    setIsSavingConfig(true);
    setConfigSuccessMsg('');
    try {
      const res = await fetch('/api/blog/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (!res.ok) throw new Error('Failed to update config');
      const data = await res.json();
      setConfig(data.config);
      setConfigSuccessMsg('Automation configuration saved successfully!');
      setTimeout(() => setConfigSuccessMsg(''), 4000);
    } catch (err: any) {
      alert(err.message || 'Error saving configuration');
    } finally {
      setIsSavingConfig(false);
    }
  };

  // Trigger Immediate Blog Generation
  const handleTriggerGenerate = async () => {
    setIsGenerating(true);
    setGenerateResultMsg(null);
    try {
      const payload: any = {};
      if (overrideTopic.trim()) payload.preferredTitle = overrideTopic.trim();
      if (overrideNiche.trim()) payload.niche = overrideNiche.trim();
      if (overrideIndustry.trim()) payload.industry = overrideIndustry.trim();

      const res = await fetch('/api/blog/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate post');

      // Sync immediately to Firestore with authenticated admin credentials
      if (data.post) {
        const sanitizedPost = {
          ...data.post,
          title: cleanPlainText(data.post.title),
          excerpt: cleanPlainText(data.post.excerpt),
          content: (data.post.content || '').replace(/\*\*/g, ''),
          category: cleanPlainText(data.post.category) || 'Engineering',
          industry: cleanPlainText(data.post.industry) || 'Enterprise SaaS',
          tags: Array.isArray(data.post.tags) ? data.post.tags.map((t: string) => cleanPlainText(t)) : []
        };
        if (user) {
          try {
            await addDoc(collection(db, 'blog_posts'), {
              ...sanitizedPost,
              createdAt: serverTimestamp(),
              publishedAt: serverTimestamp()
            });
            console.log('[AdminBlogManager] Synced generated post to Firestore');
          } catch (fsErr) {
            console.warn('[AdminBlogManager] Firestore client sync note:', fsErr);
          }
        }
        setPosts(prev => {
          if (prev.some(p => p.slug === sanitizedPost.slug || p.id === sanitizedPost.id)) return prev;
          return [sanitizedPost, ...prev];
        });
      }

      setGenerateResultMsg({
        type: 'success',
        text: `Successfully generated "${data.post?.title}" (${data.post?.readTime})! Post is published with 16:9 landscape AI cover.`
      });

      // Refresh config and logs
      fetchConfig();
      fetchLogs();

      // Reset modal fields after slight delay
      setTimeout(() => {
        setShowGenerateModal(false);
        setOverrideTopic('');
        setOverrideNiche('');
        setOverrideIndustry('');
        setGenerateResultMsg(null);
      }, 3000);
    } catch (err: any) {
      setGenerateResultMsg({
        type: 'error',
        text: err.message || 'Generation failed. Check server console or API key.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Post Editor Actions
  const handleStartCreatePost = () => {
    setEditingPostId(null);
    setPostForm({
      title: '',
      slug: '',
      category: 'Engineering',
      industry: 'Enterprise SaaS',
      readTime: '6 min read',
      excerpt: '',
      content: '',
      coverImage: '/blog_saturn_bg.jpg',
      tags: 'Private LLMs, Enterprise AI, VPC',
      status: 'published',
      metaTitle: '',
      metaDescription: '',
      focusKeywords: 'Private LLMs, Data Sovereignty'
    });
    setEditorTab('write');
    setShowEditorModal(true);
  };

  const handleStartEditPost = (post: any) => {
    setEditingPostId(post.id);
    setPostForm({
      title: cleanPlainText(post.title) || '',
      slug: post.slug || '',
      category: cleanPlainText(post.category) || 'Engineering',
      industry: cleanPlainText(post.industry) || 'Enterprise SaaS',
      readTime: post.readTime || '6 min read',
      excerpt: cleanPlainText(post.excerpt) || '',
      content: (post.content || '').replace(/\*\*/g, ''),
      coverImage: post.coverImage || '/blog_saturn_bg.jpg',
      tags: Array.isArray(post.tags) ? post.tags.map((t: string) => cleanPlainText(t)).join(', ') : cleanPlainText(post.tags) || '',
      status: post.status || 'published',
      metaTitle: cleanPlainText(post.seo?.metaTitle || post.title) || '',
      metaDescription: cleanPlainText(post.seo?.metaDescription || post.excerpt) || '',
      focusKeywords: Array.isArray(post.seo?.keywords) ? post.seo.keywords.map((k: string) => cleanPlainText(k)).join(', ') : ''
    });
    setEditorTab('write');
    setShowEditorModal(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.title.trim() || !postForm.content.trim()) {
      alert('Please provide at least a Title and Content for the blog post.');
      return;
    }

    setIsSavingPost(true);
    try {
      const slug = (postForm.slug.trim() || postForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).toLowerCase();
      const tagsArray = postForm.tags.split(',').map(t => cleanPlainText(t)).filter(Boolean);
      const keywordsArray = postForm.focusKeywords.split(',').map(k => cleanPlainText(k)).filter(Boolean);

      const payload = {
        title: cleanPlainText(postForm.title),
        slug,
        category: cleanPlainText(postForm.category),
        industry: cleanPlainText(postForm.industry) || 'Enterprise SaaS',
        readTime: postForm.readTime.trim() || '6 min read',
        excerpt: cleanPlainText(postForm.excerpt) || cleanPlainText(postForm.content.slice(0, 160)) + '...',
        content: postForm.content.replace(/\*\*/g, '').trim(),
        coverImage: postForm.coverImage,
        tags: tagsArray,
        status: postForm.status,
        seo: {
          metaTitle: cleanPlainText(postForm.metaTitle) || `${cleanPlainText(postForm.title)} | AIMLPartner`,
          metaDescription: cleanPlainText(postForm.metaDescription) || cleanPlainText(postForm.excerpt) || '',
          keywords: keywordsArray
        },
        updatedAt: serverTimestamp()
      };

      let savedId = editingPostId;
      if (editingPostId) {
        await updateDoc(doc(db, 'blog_posts', editingPostId), payload);
        await fetch('/api/blog/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingPostId, ...payload })
        }).catch(() => {});
      } else {
        const ref = await addDoc(collection(db, 'blog_posts'), {
          ...payload,
          createdAt: serverTimestamp(),
          publishedAt: serverTimestamp(),
          views: 0
        });
        savedId = ref.id;
        await fetch('/api/blog/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: ref.id, ...payload })
        }).catch(() => {});
      }

      // Update local state immediately
      setPosts(prev => {
        const item = { id: savedId, ...payload };
        const idx = prev.findIndex(p => p.id === savedId || p.slug === payload.slug);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], ...item };
          return next;
        }
        return [item, ...prev];
      });

      setShowEditorModal(false);
      setEditingPostId(null);
    } catch (err: any) {
      console.error('Error saving post:', err);
      alert('Failed to save post: ' + (err.message || 'Unknown error'));
    } finally {
      setIsSavingPost(false);
    }
  };

  const handleDeletePost = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to permanently delete the post "${title}"?`)) {
      try {
        await deleteDoc(doc(db, 'blog_posts', id));
        await fetch(`/api/blog/posts/${id}`, { method: 'DELETE' }).catch(() => {});
        setPosts(prev => prev.filter(p => p.id !== id && p.slug !== id));
      } catch (err: any) {
        console.error('Error deleting post:', err);
        alert('Failed to delete post: ' + err.message);
      }
    }
  };

  const handleToggleStatus = async (post: any) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      await updateDoc(doc(db, 'blog_posts', post.id), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      await fetch('/api/blog/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...post, status: newStatus })
      }).catch(() => {});
      setPosts(prev => prev.map(p => p.id === post.id ? { ...p, status: newStatus } : p));
    } catch (err: any) {
      console.error('Error toggling status:', err);
    }
  };

  // Helper inside modal to auto-generate or polish content with Gemini
  const handleAiDraftInModal = async () => {
    if (!postForm.title.trim()) {
      alert('Please enter a title or topic idea first so Gemini knows what to draft!');
      return;
    }
    setIsAiPolishing(true);
    try {
      const res = await fetch('/api/blog/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preferredTitle: postForm.title,
          niche: postForm.category,
          industry: postForm.industry,
          status: 'draft'
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate');

      if (data.post) {
        setPostForm(prev => ({
          ...prev,
          title: cleanPlainText(data.post.title) || prev.title,
          slug: data.post.slug || prev.slug,
          excerpt: cleanPlainText(data.post.excerpt) || prev.excerpt,
          content: (data.post.content || prev.content || '').replace(/\*\*/g, ''),
          coverImage: data.post.coverImage || prev.coverImage,
          readTime: data.post.readTime || prev.readTime,
          category: cleanPlainText(data.post.category) || prev.category,
          industry: cleanPlainText(data.post.industry) || prev.industry,
          tags: Array.isArray(data.post.tags) ? data.post.tags.map((t: string) => cleanPlainText(t)).join(', ') : prev.tags,
          metaTitle: cleanPlainText(data.post.seo?.metaTitle) || prev.metaTitle,
          metaDescription: cleanPlainText(data.post.seo?.metaDescription) || prev.metaDescription,
          focusKeywords: Array.isArray(data.post.seo?.keywords) ? data.post.seo.keywords.map((k: string) => cleanPlainText(k)).join(', ') : prev.focusKeywords
        }));
      }
    } catch (err: any) {
      alert('AI Draft error: ' + err.message);
    } finally {
      setIsAiPolishing(false);
    }
  };

  // Add custom niche chip
  const handleAddCustomNiche = () => {
    const val = newNicheInput.trim();
    if (!val) return;
    if (!config.customNiches?.includes(val) && !config.selectedNiches?.includes(val)) {
      setConfig((prev: any) => ({
        ...prev,
        customNiches: [...(prev.customNiches || []), val],
        selectedNiches: [...(prev.selectedNiches || []), val]
      }));
    }
    setNewNicheInput('');
  };

  // Add custom industry chip
  const handleAddCustomIndustry = () => {
    const val = newIndustryInput.trim();
    if (!val) return;
    if (!config.customIndustries?.includes(val) && !config.selectedIndustries?.includes(val)) {
      setConfig((prev: any) => ({
        ...prev,
        customIndustries: [...(prev.customIndustries || []), val],
        selectedIndustries: [...(prev.selectedIndustries || []), val]
      }));
    }
    setNewIndustryInput('');
  };

  // Add custom keyword chip
  const handleAddKeyword = () => {
    const val = newKeywordInput.trim();
    if (!val) return;
    if (!config.primaryKeywords?.includes(val)) {
      setConfig((prev: any) => ({
        ...prev,
        primaryKeywords: [...(prev.primaryKeywords || []), val]
      }));
    }
    setNewKeywordInput('');
  };

  // Filtered posts for list
  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesStatus;

      const matchesSearch =
        p.title?.toLowerCase().includes(q) ||
        p.industry?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [posts, filterStatus, searchQuery]);

  const publishedCount = posts.filter(p => p.status === 'published').length;
  const draftCount = posts.filter(p => p.status === 'draft').length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Action Bar & Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Automation Status Card */}
        <div className="bg-black/40 border border-white/10 backdrop-blur-xl p-5 sm:p-6 rounded-3xl flex flex-col justify-between h-[148px] hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Autonomous Scheduler
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const updated = { ...config, enabled: !config.enabled };
                setConfig(updated);
                fetch('/api/blog/config', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(updated)
                });
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                config.enabled
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30'
                  : 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
              }`}
            >
              {config.enabled ? 'Pause' : 'Activate'}
            </button>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${config.enabled ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
              <span className="font-display font-bold text-white text-lg leading-tight">
                {config.enabled ? 'Active & Running' : 'Scheduler Paused'}
              </span>
            </div>
            <div className="text-xs text-zinc-400 font-mono mt-1">
              {config.intervalHours ? `Every ${config.intervalHours} Hours` : 'Daily automated run'}
            </div>
          </div>
        </div>

        {/* Total Articles Published */}
        <div className="bg-black/40 border border-white/10 backdrop-blur-xl p-5 sm:p-6 rounded-3xl flex flex-col justify-between h-[148px] hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Published Posts
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF5500]">
              <FileText size={15} />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-display font-black text-white leading-none">
              {publishedCount}
            </div>
            <div className="text-xs text-zinc-400 font-mono mt-1.5">
              {draftCount} Drafts in Pipeline
            </div>
          </div>
        </div>

        {/* Total Automated Runs */}
        <div className="bg-black/40 border border-white/10 backdrop-blur-xl p-5 sm:p-6 rounded-3xl flex flex-col justify-between h-[148px] hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              AI Generated
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400">
              <Cpu size={15} />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-display font-black text-white leading-none">
              {config.totalGenerated || 0}
            </div>
            <div className="text-xs text-zinc-400 font-mono mt-1.5">
              Gemini 2.5 Flash Engine
            </div>
          </div>
        </div>

        {/* Instant Trigger Card */}
        <div className="bg-gradient-to-br from-[#FF5500]/20 to-black/60 border border-[#FF5500]/30 backdrop-blur-xl p-5 sm:p-6 rounded-3xl flex flex-col justify-between h-[148px] hover:border-[#FF5500]/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#FF5500] uppercase tracking-widest font-bold">
              Instant Generation
            </span>
            <span className="text-[10px] font-mono text-zinc-400 bg-black/50 px-2 py-0.5 rounded-full border border-white/10">
              16:9 AI Cover
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowGenerateModal(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#FF5500] hover:bg-orange-600 text-black font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-[0_0_20px_rgba(255,85,0,0.4)] cursor-pointer"
            >
              <Zap size={14} />
              <span className="truncate">Generate Post Now</span>
            </button>
            <button
              onClick={handleStartCreatePost}
              title="Create Manual Post"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white shrink-0 transition-all cursor-pointer"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Sub Navigation Switcher */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveSection('automation')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeSection === 'automation'
              ? 'bg-[#FF5500] text-black shadow-[0_0_20px_rgba(255,85,0,0.3)]'
              : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
          }`}
        >
          <Sliders size={14} />
          <span>Automation & Targeting Rules</span>
        </button>

        <button
          onClick={() => setActiveSection('posts')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeSection === 'posts'
              ? 'bg-[#FF5500] text-black shadow-[0_0_20px_rgba(255,85,0,0.3)]'
              : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
          }`}
        >
          <FileText size={14} />
          <span>Post Manager ({posts.length})</span>
        </button>

        <button
          onClick={() => { setActiveSection('logs'); fetchLogs(); }}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeSection === 'logs'
              ? 'bg-[#FF5500] text-black shadow-[0_0_20px_rgba(255,85,0,0.3)]'
              : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
          }`}
        >
          <Activity size={14} />
          <span>Execution Logs</span>
        </button>
      </div>

      {/* SECTION 1: AUTOMATION & TARGETING RULES */}
      {activeSection === 'automation' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {configSuccessMsg && (
            <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>{configSuccessMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Schedule & Tone (5 columns) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Frequency & Mode Card */}
              <div className="bg-black/40 border border-white/10 backdrop-blur-xl p-6 rounded-3xl space-y-6 relative z-30">
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <Clock size={16} className="text-[#FF5500]" />
                  <span>Publishing Schedule</span>
                </h3>

                {/* Interval selector */}
                <div className="relative z-20">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                    Generation Interval
                  </label>
                  <CustomSelect
                    value={config.intervalHours || 24}
                    onChange={(val) => setConfig({ ...config, intervalHours: Number(val) })}
                    options={INTERVAL_OPTIONS}
                  />
                </div>

                {/* Status on generation */}
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                    Default Post Status
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setConfig({ ...config, statusOnGenerate: 'published' })}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-left ${
                        config.statusOnGenerate === 'published'
                          ? 'bg-[#FF5500]/20 border-[#FF5500] text-white'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="font-semibold mb-0.5">Publish Directly</div>
                      <div className="text-[10px] text-zinc-400 font-normal">Goes live immediately on website</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setConfig({ ...config, statusOnGenerate: 'draft' })}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-left ${
                        config.statusOnGenerate === 'draft'
                          ? 'bg-[#FF5500]/20 border-[#FF5500] text-white'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="font-semibold mb-0.5">Save as Draft</div>
                      <div className="text-[10px] text-zinc-400 font-normal">Requires admin review before live</div>
                    </button>
                  </div>
                </div>

                {/* Tone of Voice */}
                <div className="relative z-10">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                    Writing Tone & Persona
                  </label>
                  <CustomSelect
                    value={config.tone || 'authoritative-technical'}
                    onChange={(val) => setConfig({ ...config, tone: String(val) })}
                    options={TONE_OPTIONS}
                  />
                </div>
              </div>

              {/* Call-to-Action Directive */}
              <div className="bg-black/40 border border-white/10 backdrop-blur-xl p-6 rounded-3xl space-y-4 relative z-10">
                <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <ArrowUpRight size={16} className="text-[#FF5500]" />
                  <span>Article Conversion Call-to-Action</span>
                </h3>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">
                    CTA Title
                  </label>
                  <input
                    type="text"
                    value={config.callToAction?.title || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      callToAction: { ...config.callToAction, title: e.target.value }
                    })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#FF5500] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">
                    CTA Description
                  </label>
                  <textarea
                    rows={2}
                    value={config.callToAction?.description || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      callToAction: { ...config.callToAction, description: e.target.value }
                    })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:border-[#FF5500] outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">Button Text</label>
                    <input
                      type="text"
                      value={config.callToAction?.buttonText || ''}
                      onChange={(e) => setConfig({
                        ...config,
                        callToAction: { ...config.callToAction, buttonText: e.target.value }
                      })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#FF5500] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">Button Link</label>
                    <input
                      type="text"
                      value={config.callToAction?.buttonUrl || ''}
                      onChange={(e) => setConfig({
                        ...config,
                        callToAction: { ...config.callToAction, buttonUrl: e.target.value }
                      })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#FF5500] outline-none"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Niches, Industries & Keywords (7 columns) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Target Niches */}
              <div className="bg-black/40 border border-white/10 backdrop-blur-xl p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                    <Layers size={16} className="text-[#FF5500]" />
                    <span>Targeted Niches & Topics</span>
                  </h3>
                  <span className="text-xs font-mono text-zinc-500">
                    {(config.selectedNiches || []).length} Active
                  </span>
                </div>

                <p className="text-xs text-zinc-400">
                  The automated engine rotates across active niches to produce authoritative, non-repetitive enterprise coverage. Click to toggle.
                </p>

                {/* Niches Pill Matrix */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    ...(config.selectedNiches || []),
                    ...(config.customNiches || []).filter((cn: string) => !config.selectedNiches?.includes(cn))
                  ].map((niche: string, idx: number) => {
                    const isSelected = config.selectedNiches?.includes(niche);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          const updated = isSelected
                            ? config.selectedNiches.filter((n: string) => n !== niche)
                            : [...(config.selectedNiches || []), niche];
                          setConfig({ ...config, selectedNiches: updated });
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#FF5500]/20 border border-[#FF5500] text-white shadow-[0_0_10px_rgba(255,85,0,0.3)]'
                            : 'bg-white/5 border border-white/10 text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {isSelected ? <Check size={12} className="text-[#FF5500]" /> : <Plus size={12} />}
                        <span>{niche}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Add Custom Niche */}
                <div className="flex items-center gap-2 pt-3">
                  <input
                    type="text"
                    value={newNicheInput}
                    onChange={(e) => setNewNicheInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCustomNiche()}
                    placeholder="Add custom niche (e.g. Agentic Procurement Systems)..."
                    className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:border-[#FF5500] outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomNiche}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer shrink-0"
                  >
                    Add Niche
                  </button>
                </div>
              </div>

              {/* Target Industries */}
              <div className="bg-black/40 border border-white/10 backdrop-blur-xl p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                    <Globe size={16} className="text-[#FF5500]" />
                    <span>Target Industries</span>
                  </h3>
                  <span className="text-xs font-mono text-zinc-500">
                    {(config.selectedIndustries || []).length} Active
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    ...(config.selectedIndustries || []),
                    ...(config.customIndustries || []).filter((ci: string) => !config.selectedIndustries?.includes(ci))
                  ].map((ind: string, idx: number) => {
                    const isSelected = config.selectedIndustries?.includes(ind);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          const updated = isSelected
                            ? config.selectedIndustries.filter((i: string) => i !== ind)
                            : [...(config.selectedIndustries || []), ind];
                          setConfig({ ...config, selectedIndustries: updated });
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#FF5500]/20 border border-[#FF5500] text-white shadow-[0_0_10px_rgba(255,85,0,0.3)]'
                            : 'bg-white/5 border border-white/10 text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {isSelected ? <Check size={12} className="text-[#FF5500]" /> : <Plus size={12} />}
                        <span>{ind}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Add Custom Industry */}
                <div className="flex items-center gap-2 pt-3">
                  <input
                    type="text"
                    value={newIndustryInput}
                    onChange={(e) => setNewIndustryInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCustomIndustry()}
                    placeholder="Add custom industry (e.g. MedTech & Clinical)..."
                    className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:border-[#FF5500] outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomIndustry}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer shrink-0"
                  >
                    Add Industry
                  </button>
                </div>
              </div>

              {/* Seed Keyword Bank */}
              <div className="bg-black/40 border border-white/10 backdrop-blur-xl p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                    <Tag size={16} className="text-[#FF5500]" />
                    <span>Focus SEO Seed Keywords</span>
                  </h3>
                  <span className="text-xs font-mono text-zinc-500">
                    {(config.primaryKeywords || []).length} Keywords
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {(config.primaryKeywords || []).map((kw: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-2"
                    >
                      <span>{kw}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = config.primaryKeywords.filter((_: any, i: number) => i !== idx);
                          setConfig({ ...config, primaryKeywords: updated });
                        }}
                        className="hover:text-red-400 text-zinc-500 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add Keyword */}
                <div className="flex items-center gap-2 pt-3">
                  <input
                    type="text"
                    value={newKeywordInput}
                    onChange={(e) => setNewKeywordInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                    placeholder="Add seed keyword (e.g. Private LLMs, HIPAA AI)..."
                    className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:border-[#FF5500] outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer shrink-0"
                  >
                    Add Keyword
                  </button>
                </div>
              </div>

              {/* Save Settings Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleSaveConfig}
                  disabled={isSavingConfig}
                  className="flex items-center gap-2 bg-[#FF5500] hover:bg-orange-600 text-black font-bold px-8 py-3.5 rounded-full transition-all shadow-[0_0_25px_rgba(255,85,0,0.4)] cursor-pointer disabled:opacity-50"
                >
                  {isSavingConfig ? <RefreshCw size={16} className="animate-spin" /> : <Check size={16} />}
                  <span>Save Automation Rules</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* SECTION 2: POST MANAGER */}
      {activeSection === 'posts' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Filter and Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-black/40 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
            <div className="relative flex-1 w-full">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, industry, or category..."
                className="w-full bg-black/60 border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#FF5500]"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <div className="flex items-center bg-black/60 border border-white/10 rounded-full p-1 text-xs">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1 rounded-full font-mono transition-colors ${
                    filterStatus === 'all' ? 'bg-[#FF5500] text-black font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  All ({posts.length})
                </button>
                <button
                  onClick={() => setFilterStatus('published')}
                  className={`px-3 py-1 rounded-full font-mono transition-colors ${
                    filterStatus === 'published' ? 'bg-[#FF5500] text-black font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Published ({publishedCount})
                </button>
                <button
                  onClick={() => setFilterStatus('draft')}
                  className={`px-3 py-1 rounded-full font-mono transition-colors ${
                    filterStatus === 'draft' ? 'bg-[#FF5500] text-black font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Drafts ({draftCount})
                </button>
              </div>

              <button
                onClick={handleStartCreatePost}
                className="flex items-center gap-1.5 bg-[#FF5500] hover:bg-orange-600 text-black font-bold text-xs px-4 py-2.5 rounded-full transition-all cursor-pointer shrink-0"
              >
                <Plus size={14} />
                <span>New Article</span>
              </button>
            </div>
          </div>

          {/* Posts Table / Card List */}
          {loadingPosts ? (
            <div className="text-center py-16 text-zinc-500 font-mono text-xs">
              Loading articles from Firestore...
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-black/40 border border-white/10 rounded-3xl">
              <FileText size={32} className="mx-auto text-zinc-600 mb-3" />
              <div className="text-white font-bold text-base mb-1">No articles found</div>
              <p className="text-zinc-400 text-xs mb-4">No posts match your current search or status filter.</p>
              <button
                onClick={handleStartCreatePost}
                className="px-5 py-2 rounded-full bg-[#FF5500] text-black font-bold text-xs"
              >
                Create Your First Post
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-black/40 border border-white/10 hover:border-white/20 p-5 rounded-2xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all"
                >
                  {/* Thumbnail & Title Info */}
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <img
                      src={post.coverImage || '/blog_saturn_bg.jpg'}
                      alt={post.title}
                      className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#FF5500] bg-[#FF5500]/10 px-2 py-0.5 rounded border border-[#FF5500]/20">
                          {post.category || 'General'}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {post.industry || 'Cross-Industry'}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          • {post.readTime || '5 min'}
                        </span>
                        {post.systemGenerated && (
                          <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                            AI
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-base font-bold text-white truncate hover:text-[#FF5500] transition-colors">
                        {cleanPlainText(post.title)}
                      </h4>
                      <p className="text-xs text-zinc-400 truncate mt-0.5">
                        {cleanPlainText(post.excerpt) || 'No summary'}
                      </p>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    {/* Status Badge */}
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(post)}
                      title="Click to toggle status"
                      className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                        post.status === 'published'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20'
                      }`}
                    >
                      {post.status || 'draft'}
                    </button>

                    {/* View Live */}
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View live post"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                    >
                      <ExternalLink size={15} />
                    </a>

                    {/* Edit */}
                    <button
                      onClick={() => handleStartEditPost(post)}
                      title="Edit article"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <Pencil size={15} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDeletePost(post.id, post.title)}
                      title="Delete article"
                      className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* SECTION 3: EXECUTION LOGS */}
      {activeSection === 'logs' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <Activity size={16} className="text-[#FF5500]" />
              <span>Generation Activity & Health</span>
            </h3>
            <button
              onClick={fetchLogs}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white font-mono px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10"
            >
              <RefreshCw size={12} className={loadingLogs ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>

          {loadingLogs ? (
            <div className="text-center py-12 text-zinc-500 font-mono text-xs">Loading logs...</div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12 bg-black/40 border border-white/10 rounded-3xl text-zinc-400 text-xs font-mono">
              No generation runs logged yet. Click "Generate Post Now" to initiate your first autonomous post.
            </div>
          ) : (
            <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-white/[0.03] border-b border-white/10 text-zinc-400 uppercase tracking-widest text-[10px]">
                    <tr>
                      <th className="px-6 py-4">Timestamp</th>
                      <th className="px-6 py-4">Trigger</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Article Title</th>
                      <th className="px-6 py-4">Industry / Niche</th>
                      <th className="px-6 py-4">Speed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-zinc-300">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 text-zinc-400 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className="uppercase text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/10">
                            {log.triggerType || 'manual'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {log.status === 'success' ? (
                            <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded text-[10px]">
                              SUCCESS
                            </span>
                          ) : (
                            <span className="text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded text-[10px]">
                              ERROR
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 font-sans font-medium text-white max-w-xs truncate">
                          {log.postTitle ? (
                            <a 
                              href={`/blog/${log.postSlug}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-[#FF5500] transition-colors"
                            >
                              {log.postTitle}
                            </a>
                          ) : (
                            log.details || log.error || 'N/A'
                          )}
                        </td>
                        <td className="px-6 py-4 text-zinc-400">
                          {log.industry || log.niche || 'Enterprise AI'}
                        </td>
                        <td className="px-6 py-4 text-zinc-400 whitespace-nowrap">
                          {log.durationMs ? `${(log.durationMs / 1000).toFixed(1)}s` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODAL: INSTANT GENERATE NOW */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0B0B0E] border border-white/10 rounded-3xl max-w-lg w-full p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setShowGenerateModal(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF5500]/10 border border-[#FF5500]/20 flex items-center justify-center text-[#FF5500]">
                <Cpu size={20} />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white">Generate Blog Post</h3>
                <p className="text-xs text-zinc-400">Powered by Gemini 2.5 Flash Autonomous Engine</p>
              </div>
            </div>

            {generateResultMsg && (
              <div className={`p-4 rounded-xl text-xs font-medium ${
                generateResultMsg.type === 'success' 
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}>
                {generateResultMsg.text}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                  Optional Topic Override (Leave blank for automatic smart rotation)
                </label>
                <input
                  type="text"
                  value={overrideTopic}
                  onChange={(e) => setOverrideTopic(e.target.value)}
                  placeholder="e.g. Scaling Local LLMs for Real-Time Financial Fraud Detection"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-[#FF5500] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                    Niche Override
                  </label>
                  <input
                    type="text"
                    value={overrideNiche}
                    onChange={(e) => setOverrideNiche(e.target.value)}
                    placeholder="Auto-selected"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-[#FF5500] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                    Industry Override
                  </label>
                  <input
                    type="text"
                    value={overrideIndustry}
                    onChange={(e) => setOverrideIndustry(e.target.value)}
                    placeholder="Auto-selected"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-[#FF5500] outline-none"
                  />
                </div>
              </div>

              {/* Landscape Notice */}
              <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/25 text-xs text-orange-200 font-mono">
                <Zap size={14} className="text-[#FF5500] shrink-0" />
                <span>Every post automatically generates a custom 16:9 widescreen landscape AI cover image.</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowGenerateModal(false)}
                className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isGenerating}
                onClick={handleTriggerGenerate}
                className="flex items-center gap-2 bg-[#FF5500] hover:bg-orange-600 text-black font-bold text-xs px-6 py-2.5 rounded-full transition-all shadow-[0_0_20px_rgba(255,85,0,0.4)] cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
                <span>{isGenerating ? 'Generating Article (~4s)...' : 'Run Generation'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: POST EDITOR */}
      {showEditorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#0A0A0C] border border-white/10 rounded-3xl max-w-4xl w-full p-6 sm:p-8 my-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setShowEditorModal(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-display font-bold text-white">
                  {editingPostId ? 'Edit Article' : 'Create New Article'}
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Authoritative enterprise publishing module
                </p>
              </div>

              <div className="flex items-center gap-2 pr-8">
                <button
                  type="button"
                  onClick={handleAiDraftInModal}
                  disabled={isAiPolishing}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#FF5500] bg-[#FF5500]/10 border border-[#FF5500]/30 hover:bg-[#FF5500]/20 px-3.5 py-1.5 rounded-full transition-all cursor-pointer disabled:opacity-50"
                >
                  <Wand2 size={13} className={isAiPolishing ? 'animate-spin' : ''} />
                  <span>{isAiPolishing ? 'Drafting...' : 'AI Assist / Draft'}</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSavePost} className="space-y-6">
              
              {/* Title & Slug */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={postForm.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      const autoSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setPostForm(prev => ({
                        ...prev,
                        title: newTitle,
                        slug: prev.slug && prev.slug !== autoSlug.slice(0, prev.slug.length) ? prev.slug : autoSlug
                      }));
                    }}
                    placeholder="e.g. How to Deploy Private LLMs on Your Own VPC"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#FF5500] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">URL Slug</label>
                    <input
                      type="text"
                      value={postForm.slug}
                      onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                      placeholder="how-to-deploy-private-llms"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#FF5500] outline-none font-mono"
                    />
                  </div>

                  <div className="relative z-20">
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">Category</label>
                    <CustomSelect
                      value={postForm.category}
                      onChange={(val) => setPostForm({ ...postForm, category: String(val) })}
                      options={CATEGORY_OPTIONS}
                      triggerClassName="py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">Industry</label>
                    <input
                      type="text"
                      value={postForm.industry}
                      onChange={(e) => setPostForm({ ...postForm, industry: e.target.value })}
                      placeholder="Enterprise SaaS"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#FF5500] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">
                  Excerpt (Executive Summary)
                </label>
                <textarea
                  rows={2}
                  value={postForm.excerpt}
                  onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                  placeholder="2-3 sentence teaser for cards and search snippets..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:border-[#FF5500] outline-none resize-none"
                />
              </div>

              {/* Cover Image Selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    Cover Image
                  </label>
                  <button
                    type="button"
                    disabled={isGeneratingLandscapeImage}
                    onClick={async () => {
                      setIsGeneratingLandscapeImage(true);
                      try {
                        const res = await fetch('/api/blog/generate-image', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            title: postForm.title || 'Enterprise AI Architecture',
                            niche: postForm.category,
                            industry: postForm.industry,
                            slug: postForm.slug,
                            category: postForm.category
                          })
                        });
                        const data = await res.json();
                        if (data.imageUrl) {
                          setPostForm(prev => ({ ...prev, coverImage: data.imageUrl }));
                        } else if (data.error) {
                          alert('Notice: ' + data.error);
                        }
                      } catch (e: any) {
                        alert('Failed to generate image: ' + e.message);
                      } finally {
                        setIsGeneratingLandscapeImage(false);
                      }
                    }}
                    className="flex items-center gap-1.5 text-[11px] font-mono text-[#FF5500] hover:text-orange-400 bg-[#FF5500]/10 hover:bg-[#FF5500]/20 border border-[#FF5500]/30 px-3 py-1 rounded-full transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Wand2 size={11} className={isGeneratingLandscapeImage ? 'animate-spin' : ''} />
                    <span>{isGeneratingLandscapeImage ? 'Generating Landscape...' : 'Generate 16:9 Landscape AI Image'}</span>
                  </button>
                </div>
                
                <input
                  type="text"
                  value={postForm.coverImage}
                  onChange={(e) => setPostForm({ ...postForm, coverImage: e.target.value })}
                  placeholder="/blog_saturn_bg.jpg or https://..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:border-[#FF5500] outline-none font-mono mb-3"
                />

                {/* 16:9 Landscape Image Preview */}
                {postForm.coverImage && (
                  <div className="relative aspect-video max-h-48 rounded-xl overflow-hidden border border-white/10 mb-3 group shadow-xl">
                    <img src={postForm.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[10px] font-mono text-[#FF5500] bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#FF5500]/30 font-bold">
                      <ImageIcon size={11} />
                      <span>16:9 Landscape Format</span>
                    </div>
                  </div>
                )}

                {/* Quick Curated Gallery */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Or pick from curated landscape gallery:</div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-28 overflow-y-auto p-2 bg-black/60 rounded-xl border border-white/10">
                    {curatedImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPostForm({ ...postForm, coverImage: img.url })}
                        className={`relative h-14 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                          postForm.coverImage === img.url ? 'border-[#FF5500] ring-2 ring-[#FF5500]/40 scale-105' : 'border-white/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Editor with Write / Preview Tabs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    Article Content (Markdown) *
                  </label>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setEditorTab('write')}
                      className={`px-3 py-1 rounded transition-colors ${
                        editorTab === 'write' ? 'bg-[#FF5500] text-black font-bold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab('preview')}
                      className={`px-3 py-1 rounded transition-colors ${
                        editorTab === 'preview' ? 'bg-[#FF5500] text-black font-bold' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Live Preview
                    </button>
                  </div>
                </div>

                {editorTab === 'write' ? (
                  <textarea
                    rows={12}
                    required
                    value={postForm.content}
                    onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                    placeholder="Write article in Markdown. Use ## for section headings, ``` for code, > for takeaways..."
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-xs font-mono text-zinc-200 focus:border-[#FF5500] outline-none leading-relaxed"
                  />
                ) : (
                  <div className="w-full bg-black/60 border border-white/10 rounded-xl p-6 max-h-96 overflow-y-auto text-sm text-zinc-300 space-y-4">
                    <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2">{postForm.title || 'Untitled Post'}</h2>
                    <p className="italic text-zinc-400">{postForm.excerpt}</p>
                    <div className="whitespace-pre-wrap font-sans leading-relaxed text-xs">
                      {postForm.content || 'No content written yet.'}
                    </div>
                  </div>
                )}
              </div>

              {/* SEO & Publishing Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">
                    Meta Description (SEO Snippet)
                  </label>
                  <input
                    type="text"
                    value={postForm.metaDescription}
                    onChange={(e) => setPostForm({ ...postForm, metaDescription: e.target.value })}
                    placeholder="Under 160 characters for search engines"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#FF5500] outline-none"
                  />
                </div>

                <div className="relative z-10">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">
                    Publish Status
                  </label>
                  <CustomSelect
                    value={postForm.status}
                    onChange={(val) => setPostForm({ ...postForm, status: val as any })}
                    options={STATUS_OPTIONS}
                    direction="up"
                    triggerClassName="py-2 text-xs"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowEditorModal(false)}
                  className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingPost}
                  className="flex items-center gap-2 bg-[#FF5500] hover:bg-orange-600 text-black font-bold text-xs px-8 py-2.5 rounded-full transition-all shadow-[0_0_20px_rgba(255,85,0,0.4)] cursor-pointer disabled:opacity-50"
                >
                  {isSavingPost ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                  <span>{editingPostId ? 'Save Changes' : 'Publish Article'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
