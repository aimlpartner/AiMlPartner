import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  Send, 
  ArrowLeft, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  BookOpen, 
  Check, 
  Laptop, 
  GraduationCap, 
  Code2, 
  Layers, 
  Rocket, 
  Briefcase, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Building2,
  Cpu,
  UserCheck
} from 'lucide-react';
import { SEO } from '../components/SEO';

export function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    coverLetter: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJob = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'job_postings', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJob({ id: docSnap.id, ...docSnap.data() });
        } else {
          navigate('/careers');
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, navigate]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const scrollToApply = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
      const nameInput = document.getElementById('name');
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 600);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !job) return;
    setStatus('submitting');

    try {
      await addDoc(collection(db, 'job_applications'), {
        jobId: id,
        jobTitle: job.title,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        linkedinUrl: formData.linkedinUrl,
        coverLetter: formData.coverLetter,
        resumeName: resumeFile?.name || null,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setTimeout(() => {
        navigate('/careers');
      }, 3500);
    } catch (error) {
      console.error("Error submitting application:", error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-400 font-mono">
        <div className="w-8 h-8 border-2 border-[#FF5500] border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-4">Loading opportunity details...</span>
      </div>
    );
  }

  if (!job) return null;

  const isInternship = job.type === 'Internship';
  const hasStipend = Boolean(job.stipend && String(job.stipend).trim());
  const displayStipend = hasStipend ? String(job.stipend).trim() : null;
  const displayDuration = job.duration || (isInternship ? '3 Months' : 'Full-time');
  const displayLocation = job.isRemote || job.location?.toLowerCase().includes('remote') 
    ? 'Remote & On-site' 
    : (job.location || 'Remote');

  // Parse skill pills from job.skills or provide role-smart defaults matching the screenshot
  const skillList: string[] = job.skills 
    ? job.skills.split(',').map((s: string) => s.trim()).filter(Boolean)
    : isInternship 
      ? ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Git', 'Vercel/Netlify']
      : ['React', 'TypeScript', 'Node.js', 'Python', 'LLM APIs', 'Git', 'Cloud VPC'];

  // Default learning points matching the screenshot structure
  const learningPoints = [
    'Build complete web apps from database to UI',
    'Connect frontend interfaces with backend APIs',
    'Implement user authentication and data flow',
    'Deploy full-stack applications to cloud platforms',
    'Understand DevOps fundamentals and CI/CD',
    'Master agentic workflow automations and LLM integrations'
  ];

  // Default requirements matching the screenshot structure
  const requirementsList = [
    'JavaScript / TypeScript proficiency required',
    'Basic understanding of both frontend and backend architecture',
    'Familiarity with any database system (MongoDB, PostgreSQL, Firebase, or SQL)',
    'Strong problem-solving skills & high self-drive to build',
    'Personal laptop & reliable internet connection required'
  ];

  return (
    <div className="bg-[#050507] text-white min-h-screen font-sans selection:bg-[#FF5500] selection:text-black relative overflow-hidden pt-28 pb-24">
      <SEO 
        title={`${job.title} | Careers at AIMLPartner`} 
        description={`Apply for the ${job.title} position at AIMLPartner.${displayStipend ? ` ${displayStipend} •` : ''} ${displayLocation} • ${displayDuration}.`}
      />
      
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" 
          style={{ backgroundImage: 'url("/blueprint_audit.jpg")' }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050507]/90 to-[#050507] z-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FF5500]/10 rounded-full blur-[140px] pointer-events-none z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-20">
        
        {/* ========================================================================= */}
        {/* BREADCRUMB NAVIGATION */}
        {/* ========================================================================= */}
        <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={13} className="text-zinc-600 shrink-0" />
          <Link to="/careers" className="hover:text-white transition-colors">Careers</Link>
          {isInternship && (
            <>
              <ChevronRight size={13} className="text-zinc-600 shrink-0" />
              <Link to="/careers" className="hover:text-white transition-colors">Internships</Link>
            </>
          )}
          <ChevronRight size={13} className="text-zinc-600 shrink-0" />
          <span className="text-[#FF5500] font-bold truncate max-w-xs sm:max-w-md">{job.title}</span>
        </nav>

        {/* ========================================================================= */}
        {/* TOP HERO HEADER CARD (Matches Screenshot Structure) */}
        {/* ========================================================================= */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5500]/5 rounded-full blur-[90px] pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 relative z-10">
            {/* Left: Role Info & Badges */}
            <div className="flex items-start gap-5">
              {/* Brand Monogram Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black border border-white/15 flex items-center justify-center shrink-0 p-3.5 shadow-lg group">
                <img 
                  src="/aimlpartner_logo.png" 
                  alt="AIMLPartner" 
                  className="w-full h-full object-contain brightness-0 invert"
                />
              </div>

              <div>
                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-1.5">
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 font-medium mb-4">
                  <span className="text-white font-bold">AIMLPartner</span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 text-[11px]">
                    ★ 4.9
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span>Bedminster, NJ HQ &amp; Remote</span>
                </div>

                {/* Metadata Row: Stipend (ONLY IF PROVIDED), Location, Duration */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-zinc-300 mb-5">
                  {displayStipend && (
                    <div className="flex items-center gap-1.5 font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-lg border border-emerald-400/20">
                      <span>{displayStipend}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <MapPin size={14} className="text-[#FF5500]" />
                    <span>{displayLocation}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <Clock size={14} className="text-[#FF5500]" />
                    <span>{displayDuration}</span>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {displayStipend && (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                      {displayStipend}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {displayLocation}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {isInternship ? 'Fresh Talent & Students' : 'Direct Impact'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Buttons (Share, Bookmark) */}
            <div className="flex items-center gap-3 self-end lg:self-start shrink-0">
              <button
                onClick={handleShare}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center gap-2 text-xs font-mono"
                title="Share this opportunity"
              >
                <Share2 size={16} />
                <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-2 text-xs font-mono ${
                  isSaved 
                    ? 'bg-[#FF5500]/15 border-[#FF5500]/50 text-[#FF5500]' 
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-white'
                }`}
                title="Save opportunity"
              >
                {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>

          {/* Callout Notice Box (From Screenshot) */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-start gap-3.5 text-sky-200 text-xs sm:text-sm leading-relaxed">
            <Sparkles size={18} className="text-sky-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sky-300 mb-0.5">
                Anyone can apply — School Students, College Students, Graduates &amp; Freshers
              </p>
              <p className="text-sky-200/80 text-xs">
                Skills, hunger, and proof of work matter — not degrees or pedigree. If you can build, you belong here.
              </p>
            </div>
          </div>

          {/* Tech Badges List (From Screenshot) */}
          <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
            {skillList.map((skill, i) => (
              <span 
                key={i} 
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-medium text-zinc-300 hover:border-[#FF5500]/40 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TWO-COLUMN GRID: MAIN CONTENT (LEFT) & STICKY SIDEBAR (RIGHT) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: DETAILED SECTIONS */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* 1. About the Role / Internship */}
            <div className="bg-zinc-950/70 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4 text-[#FF5500]">
                <Briefcase size={20} />
                <h2 className="font-display text-xl font-bold text-white tracking-tight">
                  About the {isInternship ? 'Internship' : 'Role'}
                </h2>
              </div>
              <div className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed space-y-4">
                {job.desc ? (
                  job.desc.split('\n\n').map((paragraph: string, idx: number) => (
                    <p key={idx}>{paragraph}</p>
                  ))
                ) : (
                  <p>
                    Experience the full spectrum of applied AI development. As an engineer at AIMLPartner, you will work on live client-facing workflow engines, autonomous support agents, and private VPC infrastructure.
                  </p>
                )}
              </div>
            </div>

            {/* 2. What You'll Learn & Deliver */}
            <div className="bg-zinc-950/70 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6 text-sky-400">
                <GraduationCap size={22} />
                <h2 className="font-display text-xl font-bold text-white tracking-tight">
                  What You'll Learn &amp; Build
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 leading-snug">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Requirements */}
            <div className="bg-zinc-950/70 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6 text-[#FF5500]">
                <Code2 size={20} />
                <h2 className="font-display text-xl font-bold text-white tracking-tight">
                  Requirements
                </h2>
              </div>
              <ul className="space-y-3">
                {requirementsList.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500] shrink-0 mt-2"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Technologies & Tools */}
            <div className="bg-zinc-950/70 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6 text-purple-400">
                <Laptop size={20} />
                <h2 className="font-display text-xl font-bold text-white tracking-tight">
                  Technologies &amp; Tools
                </h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {skillList.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-200 font-semibold"
                  >
                    {skill}
                  </span>
                ))}
                <span className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-400">
                  Vercel / Netlify
                </span>
                <span className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-400">
                  Docker &amp; Cloud VPC
                </span>
              </div>
            </div>

            {/* 5. Skills You'll Gain */}
            <div className="bg-zinc-950/70 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6 text-amber-400">
                <Layers size={20} />
                <h2 className="font-display text-xl font-bold text-white tracking-tight">
                  Skills You'll Gain
                </h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {['Full-Stack Development', 'API Engineering', 'Agentic AI Workflows', 'Database Architecture', 'Prompt Engineering', 'Production RAG'].map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 font-medium hover:border-[#FF5500]/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 6. What You'll Build */}
            <div className="bg-gradient-to-br from-zinc-950 to-black border border-[#FF5500]/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5500]/10 rounded-full blur-[70px] pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-4 text-[#FF5500] relative z-10">
                <Rocket size={22} />
                <h2 className="font-display text-xl font-bold text-white tracking-tight">
                  What You'll Build
                </h2>
              </div>
              <div className="relative z-10 space-y-2">
                <p className="text-white font-bold text-sm sm:text-base">
                  2 full-stack applications deployed live, complete with documentation
                </p>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  These real-world deliverables will form your professional portfolio by the end of the program, demonstrating hands-on mastery over scalable production systems.
                </p>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 7. APPLICATION FORM (Target of "Apply Now") */}
            {/* ========================================================================= */}
            <div 
              ref={formRef} 
              id="apply-section" 
              className="bg-zinc-950 border border-white/15 p-8 sm:p-12 rounded-3xl backdrop-blur-xl shadow-2xl relative scroll-mt-28"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5500]/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="mb-8 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF5500] mb-3">
                  <UserCheck size={13} />
                  Direct Application Desk
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Apply for {job.title}
                </h3>
                <p className="text-zinc-400 text-sm mt-1">
                  Fill out the form below. Our engineering leads review submissions daily and respond within 48 hours.
                </p>
              </div>

              {status === 'success' ? (
                <div className="text-center py-12 relative z-10">
                  <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <Check size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
                  <p className="text-zinc-300 text-sm max-w-md mx-auto">
                    Thanks for applying for the <span className="text-[#FF5500] font-bold">{job.title}</span> role. Our engineering team has received your submission.
                  </p>
                  <p className="text-zinc-500 text-xs font-mono mt-4">Redirecting you back to careers...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-black/60 border border-white/15 rounded-xl text-white px-5 py-3.5 text-sm focus:outline-none focus:border-[#FF5500] transition-colors"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-black/60 border border-white/15 rounded-xl text-white px-5 py-3.5 text-sm focus:outline-none focus:border-[#FF5500] transition-colors"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-black/60 border border-white/15 rounded-xl text-white px-5 py-3.5 text-sm focus:outline-none focus:border-[#FF5500] transition-colors"
                        placeholder="+1 (555) 000-0000 / +91 ..."
                      />
                    </div>

                    <div>
                      <label htmlFor="linkedinUrl" className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
                        LinkedIn / Portfolio / GitHub *
                      </label>
                      <input
                        type="url"
                        id="linkedinUrl"
                        name="linkedinUrl"
                        required
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        className="w-full bg-black/60 border border-white/15 rounded-xl text-white px-5 py-3.5 text-sm focus:outline-none focus:border-[#FF5500] transition-colors"
                        placeholder="https://linkedin.com/in/... or github.com/..."
                      />
                    </div>
                  </div>

                  {/* Resume Upload Box */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
                      Resume (PDF or DOCX) *
                    </label>
                    <div 
                      className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 relative ${
                        resumeFile 
                          ? 'border-[#FF5500]/50 bg-[#FF5500]/5' 
                          : 'border-white/15 hover:border-[#FF5500]/40 bg-black/50 hover:bg-black/80'
                      }`}
                    >
                      <input 
                        type="file" 
                        id="resume" 
                        accept=".pdf,.docx,.doc" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setResumeFile(e.target.files[0]);
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        required
                      />
                      
                      {resumeFile ? (
                        <div className="flex items-center justify-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#FF5500]/20 flex items-center justify-center text-[#FF5500]">
                            <FileText size={20} />
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-white text-sm">{resumeFile.name}</p>
                            <p className="text-xs text-zinc-400 font-mono">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setResumeFile(null);
                            }}
                            className="text-xs text-red-400 hover:text-red-300 ml-4 px-3 py-1 bg-red-400/10 rounded-full cursor-pointer z-10"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none py-2">
                          <UploadCloud size={28} className="text-[#FF5500]" />
                          <p className="font-bold text-sm text-white">Click or drag resume here</p>
                          <p className="text-xs text-zinc-500 font-mono">PDF or DOCX, max 5MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cover letter / Pitch */}
                  <div>
                    <label htmlFor="coverLetter" className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
                      Why are you excited to build with AIMLPartner?
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      rows={4}
                      value={formData.coverLetter}
                      onChange={handleChange}
                      className="w-full bg-black/60 border border-white/15 rounded-xl text-white px-5 py-3.5 text-sm focus:outline-none focus:border-[#FF5500] transition-colors resize-none"
                      placeholder="Share a project you built, a problem you solved, or why you want this opportunity..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs font-mono flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      An error occurred while submitting. Please verify fields and try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-[#FF5500] text-black hover:bg-[#FF6E26] font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all shadow-[0_0_25px_rgba(255,85,0,0.35)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application Now</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: STICKY SUMMARY SIDEBAR (Matches Screenshot Structure) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-28">
            
            {/* 1. Primary Action & Details Card */}
            <div className="bg-zinc-950/90 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Big CTA Apply Button */}
              <button
                type="button"
                onClick={scrollToApply}
                className="w-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-extrabold uppercase tracking-widest text-sm py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,85,0,0.4)] hover:shadow-[0_0_40px_rgba(255,85,0,0.6)] cursor-pointer mb-6"
              >
                <span>Apply Now</span>
                <span className="text-base font-bold">→</span>
              </button>

              {/* Key Details Table (From Screenshot) */}
              <div className="divide-y divide-white/10 text-xs font-mono">
                <div className="py-3 flex items-center justify-between">
                  <span className="text-zinc-400">Duration</span>
                  <span className="text-white font-bold">{displayDuration}</span>
                </div>
                {displayStipend && (
                  <div className="py-3 flex items-center justify-between">
                    <span className="text-zinc-400">Stipend / Comp</span>
                    <span className="text-emerald-400 font-bold">{displayStipend}</span>
                  </div>
                )}
                <div className="py-3 flex items-center justify-between">
                  <span className="text-zinc-400">Type</span>
                  <span className="text-white font-bold">{job.type}</span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <span className="text-zinc-400">Mode</span>
                  <span className="text-white font-bold">{displayLocation}</span>
                </div>
              </div>
            </div>

            {/* 2. Presented By Box (From Screenshot) */}
            <div className="bg-zinc-950/70 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">
                Presented by
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-black border border-white/10 p-2 flex items-center justify-center shrink-0">
                  <img 
                    src="/aimlpartner_logo.png" 
                    alt="AIMLPartner" 
                    className="w-full h-full object-contain brightness-0 invert" 
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">AIMLPartner Services</h3>
                  <p className="text-zinc-400 text-xs mt-0.5">Applied AI automation &amp; enterprise engineering</p>
                </div>
              </div>
            </div>

            {/* 3. Powered By Box (From Screenshot) */}
            <div className="bg-zinc-950/70 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">
                Powered by
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FF5500]/10 border border-[#FF5500]/25 flex items-center justify-center text-[#FF5500] shrink-0">
                  <Cpu size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">AIMLPartner Applied Labs</h4>
                  <p className="text-zinc-400 text-xs mt-0.5">Autonomous intelligence &amp; cloud systems</p>
                </div>
              </div>
            </div>

            {/* 4. Posted By Box (From Screenshot) */}
            <div className="bg-zinc-950/70 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">
                Posted by
              </div>
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 shrink-0">
                  <Building2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Engineering Leadership Team</h4>
                  <p className="text-zinc-400 text-xs mt-0.5">Bedminster, New Jersey, USA</p>
                </div>
              </div>
            </div>

            {/* 5. Direct Question / Recruiter Link */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center text-xs font-mono text-zinc-400">
              <span>Have questions about this role?</span>
              <a 
                href="mailto:careers@aimlpartner.com" 
                className="block text-[#FF5500] hover:underline font-bold mt-1"
              >
                careers@aimlpartner.com
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
