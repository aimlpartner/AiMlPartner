import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Send, ArrowLeft, UploadCloud, FileText, X } from 'lucide-react';
import { SEO } from '../components/SEO';

export function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedinUrl: '',
    coverLetter: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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
          // Job not found
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
        linkedinUrl: formData.linkedinUrl,
        coverLetter: formData.coverLetter,
        resumeName: resumeFile?.name || null,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setTimeout(() => {
        navigate('/careers');
      }, 3000);
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
        <span className="ml-4">Loading application...</span>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#FF5500] selection:text-black relative overflow-hidden pt-28 pb-20">
      <SEO 
        title={`Apply for ${job.title} | AIMLPartner`} 
        description={`Apply for the ${job.title} position at AIMLPartner.`}
      />
      
      {/* Background Hero Image - Subtle */}
      <div className="absolute top-0 left-0 right-0 h-[40vh] z-0 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" style={{ backgroundImage: 'url("/hero_saturn.png")' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black z-10" />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-20">
        <Link to="/careers" className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#FF5500] transition-colors mb-12 font-mono text-sm uppercase tracking-wider">
          <ArrowLeft size={16} />
          Back to Careers
        </Link>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-300">{job.type} • {job.location}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Apply for <span className="text-[#FF5500]">{job.title}</span></h1>
          <p className="text-zinc-400 text-lg">Please fill out the form below. We're excited to learn more about you.</p>
        </div>

        <div className="bg-zinc-950/50 border border-white/10 p-8 md:p-12 rounded-[2rem] backdrop-blur-md shadow-2xl relative">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5500]/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send size={32} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Application Received!</h2>
              <p className="text-zinc-400">Thanks for applying. We'll be reviewing your application and will get back to you soon.</p>
              <p className="text-zinc-500 text-sm mt-4">Redirecting you back to careers...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-3">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl text-white px-5 py-4 focus:outline-none focus:border-[#FF5500] transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-3">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl text-white px-5 py-4 focus:outline-none focus:border-[#FF5500] transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="linkedinUrl" className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-3">LinkedIn / Portfolio URL</label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  required
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl text-white px-5 py-4 focus:outline-none focus:border-[#FF5500] transition-colors"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Resume (PDF, DOCX) *</label>
                <div 
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 relative ${
                    resumeFile 
                      ? 'border-[#FF5500]/50 bg-[#FF5500]/5' 
                      : 'border-white/10 hover:border-[#FF5500]/30 bg-black/50 hover:bg-black/80'
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
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#FF5500]/20 flex items-center justify-center">
                        <FileText size={24} className="text-[#FF5500]" />
                      </div>
                      <div>
                        <p className="font-bold text-white">{resumeFile.name}</p>
                        <p className="text-xs text-zinc-400">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setResumeFile(null);
                        }}
                        className="text-xs text-red-400 hover:text-red-300 mt-2 z-10 relative px-3 py-1 bg-red-400/10 rounded-full cursor-pointer"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-[#FF5500]/10 flex items-center justify-center">
                        <UploadCloud size={28} className="text-[#FF5500]" />
                      </div>
                      <div>
                        <p className="font-bold text-lg text-white mb-1">Click to upload resume</p>
                        <p className="text-sm text-zinc-400">PDF or DOCX, max 5MB</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="coverLetter" className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-3">Cover Letter / Note</label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={6}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl text-white px-5 py-4 focus:outline-none focus:border-[#FF5500] transition-colors resize-none"
                  placeholder="Tell us why you're a great fit for this role..."
                />
              </div>

              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl text-sm font-bold flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  An error occurred. Please try again later.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-white text-black hover:bg-[#FF5500] hover:text-white font-bold uppercase tracking-widest text-sm px-8 py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(255,85,0,0.3)]"
              >
                {status === 'submitting' ? 'Submitting Application...' : 'Submit Application'}
                <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
