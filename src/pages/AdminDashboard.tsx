import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth, signInWithGoogle, logOut } from '../lib/firebase';
import { LogOut, Users, FileText, Activity, DollarSign, Briefcase, Plus, Trash2, Pencil, LayoutDashboard, Send, ShieldAlert, ArrowLeft, Eye, X, Calendar, Sparkles, TrendingUp, Clock, ExternalLink, Check, Wand2 } from 'lucide-react';
import { smartAutoFillJobDescription } from '../utils/jobDescriptionParser';

type Tab = 'overview' | 'jobs' | 'applications';

export function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const [audits, setAudits] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  
  // New States
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  
  // Job Form State
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobForm, setJobForm] = useState({ 
    title: '', 
    location: '', 
    type: 'Full-time', 
    desc: '', 
    isRemote: false,
    stipend: '',
    duration: '',
    skills: ''
  });
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);
  const [isAutofilling, setIsAutofilling] = useState(false);
  const [autofillSuccess, setAutofillSuccess] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    setError('');

    // Fetch Leads
    const leadsQuery = query(collection(db, 'leads'));
    const unsubscribeLeads = onSnapshot(leadsQuery, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      leadsData.sort((a: any, b: any) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      setLeads(leadsData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching leads:", err);
      setError('You do not have permission to view this data or an error occurred.');
      setLoading(false);
    });

    // Fetch Audits
    const auditsQuery = query(collection(db, 'audits'));
    const unsubscribeAudits = onSnapshot(auditsQuery, (snapshot) => {
      const auditsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      auditsData.sort((a: any, b: any) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      setAudits(auditsData);
    }, (err) => {
      console.error("Error fetching audits:", err);
    });

    // Fetch Jobs
    const jobsQuery = query(collection(db, 'job_postings'));
    const unsubscribeJobs = onSnapshot(jobsQuery, (snapshot) => {
      const jobsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      jobsData.sort((a: any, b: any) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      setJobs(jobsData);
    }, (err) => {
      console.error("Error fetching jobs:", err);
    });

    // Fetch Applications
    const appsQuery = query(collection(db, 'job_applications'));
    const unsubscribeApps = onSnapshot(appsQuery, (snapshot) => {
      const appsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      appsData.sort((a: any, b: any) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
      setApplications(appsData);
    }, (err) => {
      console.error("Error fetching apps:", err);
    });

    // Fetch Visitor Count
    const fetchVisitors = async () => {
      try {
        const visitorsSnap = await getDocs(collection(db, 'visitors'));
        setVisitorCount(visitorsSnap.size);
      } catch (err) {
        console.error("Error fetching visitors:", err);
      }
    };
    fetchVisitors();

    return () => {
      unsubscribeLeads();
      unsubscribeAudits();
      unsubscribeJobs();
      unsubscribeApps();
    };
  }, [user]);

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingJob(true);
    try {
      const payload = {
        title: jobForm.title.trim(),
        location: jobForm.isRemote ? 'Remote' : jobForm.location.trim(),
        type: jobForm.type,
        desc: jobForm.desc.trim(),
        isRemote: jobForm.isRemote,
        stipend: jobForm.stipend ? jobForm.stipend.trim() : '',
        duration: jobForm.duration ? jobForm.duration.trim() : '',
        skills: jobForm.skills ? jobForm.skills.trim() : '',
      };

      if (editingJobId) {
        await updateDoc(doc(db, 'job_postings', editingJobId), {
          ...payload,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'job_postings'), {
          ...payload,
          createdAt: serverTimestamp()
        });
      }
      setShowJobForm(false);
      setEditingJobId(null);
      setJobForm({ 
        title: '', 
        location: '', 
        type: 'Full-time', 
        desc: '', 
        isRemote: false,
        stipend: '',
        duration: '',
        skills: ''
      });
    } catch (err) {
      console.error("Error saving job:", err);
      alert(editingJobId ? "Failed to update job posting." : "Failed to create job posting.");
    } finally {
      setIsSubmittingJob(false);
    }
  };

  const handleSmartAutofill = async (customDesc?: string) => {
    const textToParse = (typeof customDesc === 'string' ? customDesc : jobForm.desc).trim();
    if (!textToParse) {
      alert("Please paste or type a job description first.");
      return;
    }

    setIsAutofilling(true);
    setAutofillSuccess(false);

    try {
      const parsed = await smartAutoFillJobDescription(textToParse);

      setJobForm(prev => ({
        ...prev,
        desc: textToParse,
        title: parsed.title || prev.title,
        type: parsed.type || prev.type,
        location: parsed.location || prev.location,
        isRemote: typeof parsed.isRemote === 'boolean' ? parsed.isRemote : prev.isRemote,
        duration: parsed.duration || prev.duration,
        stipend: parsed.stipend !== undefined ? parsed.stipend : prev.stipend,
        skills: parsed.skills || prev.skills,
      }));

      setAutofillSuccess(true);
      setTimeout(() => setAutofillSuccess(false), 4500);
    } catch (err) {
      console.error("Autofill error:", err);
    } finally {
      setIsAutofilling(false);
    }
  };

  const handleStartEditJob = (job: any) => {
    setEditingJobId(job.id);
    setJobForm({
      title: job.title || '',
      location: job.location || '',
      type: job.type || 'Full-time',
      desc: job.desc || '',
      isRemote: job.isRemote ?? (job.location?.toLowerCase() === 'remote'),
      stipend: job.stipend || '',
      duration: job.duration || '',
      skills: job.skills || ''
    });
    setShowJobForm(true);
    setTimeout(() => {
      const formEl = document.getElementById('job-form-section');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleCancelJobForm = () => {
    setShowJobForm(false);
    setEditingJobId(null);
    setJobForm({ 
      title: '', 
      location: '', 
      type: 'Full-time', 
      desc: '', 
      isRemote: false,
      stipend: '',
      duration: '',
      skills: ''
    });
  };

  const handleDeleteJob = async (id: string) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      try {
        await deleteDoc(doc(db, 'job_postings', id));
        if (editingJobId === id) {
          handleCancelJobForm();
        }
      } catch (err) {
        console.error("Error deleting job:", err);
        alert("Failed to delete job posting.");
      }
    }
  };

  const totalSpend = audits.reduce((sum, audit) => sum + (audit.costUsd || 0), 0);
  const avgCostPerAudit = audits.length > 0 ? totalSpend / audits.length : 0;

  if (!user) {
    return (
      <div className="relative min-h-screen bg-black text-white flex items-center justify-center font-sans overflow-hidden">
        
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
            style={{ backgroundImage: 'url("/hero_saturn.png")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5500]/10 rounded-full blur-[150px] pointer-events-none z-10" />
        </div>

        {/* LOGIN CARD */}
        <div className="bg-black/60 border border-white/10 backdrop-blur-xl p-10 rounded-3xl max-w-md w-full text-center shadow-[0_0_40px_rgba(255,85,0,0.1)] relative z-10 mx-4">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#FF5500]">
            <Users size={24} />
          </div>
          <h1 className="text-3xl font-display font-extrabold text-white mb-3 tracking-tight">Admin Login</h1>
          <p className="text-zinc-400 font-medium text-sm mb-8 leading-relaxed">
            Sign in with your authorized Google account to access the control panel.
          </p>
          <button
            onClick={signInWithGoogle}
            className="w-full bg-[#FF5500] text-black font-bold hover:bg-orange-600 px-6 py-4 rounded-full transition-all cursor-pointer shadow-[0_0_20px_rgba(255,85,0,0.4)]"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // Access Restricted / Permission Denied Screen
  if (error) {
    return (
      <div className="relative min-h-screen bg-black text-white flex items-center justify-center font-sans overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
            style={{ backgroundImage: 'url("/hero_saturn.png")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[150px] pointer-events-none z-10" />
        </div>

        {/* ACCESS RESTRICTED CARD */}
        <div className="bg-black/70 border border-red-500/30 backdrop-blur-2xl p-10 rounded-3xl max-w-md w-full text-center shadow-[0_0_60px_rgba(239,68,68,0.18)] relative z-10 mx-4">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500 shadow-inner">
            <ShieldAlert size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white mb-2 tracking-tight">Access Restricted</h1>
          <p className="text-zinc-400 font-medium text-sm mb-6 leading-relaxed">
            You do not have administrator permissions to access this control panel.
          </p>
          
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 mb-8 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">Authenticated Account</span>
            <span className="text-sm font-mono text-red-400 font-semibold break-all">{user.email}</span>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={logOut}
              className="w-full flex items-center justify-center gap-2 bg-[#FF5500] hover:bg-orange-600 text-black font-bold px-6 py-3.5 rounded-full transition-all cursor-pointer shadow-[0_0_20px_rgba(255,85,0,0.3)]"
            >
              <LogOut size={16} />
              Sign Out & Switch Account
            </button>
            <a
              href="/"
              className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white font-medium text-sm px-6 py-3 rounded-full transition-all border border-white/5"
            >
              <ArrowLeft size={14} />
              Return to Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-[#FF5500] selection:text-black overflow-hidden">
      
      {/* Background (Fixed for entire dashboard) */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{ backgroundImage: 'url("/hero_saturn.png")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#FF5500]/5 rounded-full blur-[150px] pointer-events-none z-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight mb-2 drop-shadow-2xl">
              Control <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF5500] to-[#FF8844]">Panel</span>
            </h1>
            <p className="text-zinc-400 font-medium text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Logged in as <span className="font-semibold text-white">{user.email}</span>
            </p>
          </div>
          <button
            onClick={logOut}
            className="flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white bg-white/5 border border-white/10 px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-sm hover:bg-white/10"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-12 border-b border-white/10 pb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#FF5500] text-black shadow-[0_0_20px_rgba(255,85,0,0.4)]' : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <LayoutDashboard size={16} />
            Overview & Leads
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'jobs' ? 'bg-[#FF5500] text-black shadow-[0_0_20px_rgba(255,85,0,0.4)]' : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Briefcase size={16} />
            Job Postings
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'applications' ? 'bg-[#FF5500] text-black shadow-[0_0_20px_rgba(255,85,0,0.4)]' : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <FileText size={16} />
            Applications
            {applications.length > 0 && (
              <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'applications' ? 'bg-black/20 text-black' : 'bg-[#FF5500]/20 text-[#FF5500]'}`}>
                {applications.length}
              </span>
            )}
          </button>
        </div>

        {/* TAB CONTENT: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-black/40 border border-white/10 backdrop-blur-xl p-6 rounded-3xl flex items-center gap-6 hover:border-[#FF5500]/40 transition-all duration-300">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#FF5500]">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Total Leads</div>
                  <div className="text-3xl font-display font-black text-white">{leads.length}</div>
                </div>
              </div>

              <div className="bg-black/40 border border-white/10 backdrop-blur-xl p-6 rounded-3xl flex items-center gap-6 hover:border-[#FF5500]/40 transition-all duration-300">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#FF5500]">
                  <Activity size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Unique Visitors</div>
                  <div className="text-3xl font-display font-black text-white">{visitorCount}</div>
                </div>
              </div>

              <div className="bg-black/40 border border-white/10 backdrop-blur-xl p-6 rounded-3xl flex items-center gap-6 hover:border-[#FF5500]/40 transition-all duration-300">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#FF5500]">
                  <DollarSign size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Total API Spend</div>
                  <div className="text-3xl font-display font-black text-white">
                    ${totalSpend.toFixed(5)}
                  </div>
                </div>
              </div>

              <div className="bg-black/40 border border-white/10 backdrop-blur-xl p-6 rounded-3xl flex items-center gap-6 hover:border-[#FF5500]/40 transition-all duration-300">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#FF5500]">
                  <DollarSign size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Avg. Audit Cost</div>
                  <div className="text-3xl font-display font-black text-white">
                    ${avgCostPerAudit.toFixed(5)}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Leads Table Card */}
            <div className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden mb-12">
              <div className="px-8 py-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div>
                  <h2 className="font-display font-bold text-white text-xl">Recent Leads</h2>
                  <p className="text-zinc-400 text-xs mt-0.5">All prospective clients captured across audits, booking calls, waitlists, and newsletters.</p>
                </div>
                <span className="text-xs font-mono text-[#FF5500] font-bold px-3 py-1 bg-[#FF5500]/10 border border-[#FF5500]/20 rounded-full">
                  {leads.length} Captured
                </span>
              </div>

              {loading ? (
                <div className="p-12 text-center text-zinc-500 font-mono text-sm">Loading leads...</div>
              ) : leads.length === 0 ? (
                <div className="p-12 text-center text-zinc-500 font-mono text-sm">No leads captured yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-black/20">
                        <th className="px-8 py-5 font-bold">Date</th>
                        <th className="px-8 py-5 font-bold">Name</th>
                        <th className="px-8 py-5 font-bold">Email</th>
                        <th className="px-8 py-5 font-bold">Company</th>
                        <th className="px-8 py-5 font-bold">Source</th>
                        <th className="px-8 py-5 font-bold text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr key={lead.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                          <td className="px-8 py-5 text-xs text-zinc-400 whitespace-nowrap font-mono">
                            {lead.createdAt ? new Intl.DateTimeFormat('en-US', {
                              month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
                            }).format(lead.createdAt) : 'N/A'}
                          </td>
                          <td className="px-8 py-5 text-sm font-bold text-white whitespace-nowrap font-display">
                            {lead.name || '-'}
                          </td>
                          <td className="px-8 py-5 text-sm text-zinc-300 whitespace-nowrap">
                            <a href={`mailto:${lead.email}`} className="hover:text-[#FF5500] transition-colors underline-offset-2 hover:underline">
                              {lead.email}
                            </a>
                          </td>
                          <td className="px-8 py-5 text-sm text-zinc-300 whitespace-nowrap">
                            {lead.company || '-'}
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 uppercase font-mono tracking-wider">
                              {lead.source}
                            </span>
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap text-right">
                            {lead.quizAnswers ? (
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF5500]/10 hover:bg-[#FF5500]/20 border border-[#FF5500]/30 text-[#FF5500] text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
                              >
                                <Sparkles size={12} />
                                <span>View Data</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white text-xs font-mono transition-all cursor-pointer"
                              >
                                <Eye size={12} />
                                <span>Details</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent API Audits Table Card */}
            <div className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden">
              <div className="px-8 py-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div>
                  <h2 className="font-display font-bold text-white text-xl">AI Analysis Cost Logs</h2>
                  <p className="text-zinc-400 text-xs mt-0.5">Real-time Gemini token expenditure and web grounding queries for each audit.</p>
                </div>
                <span className="text-xs font-mono text-[#FF5500] font-bold px-3 py-1 bg-[#FF5500]/10 border border-[#FF5500]/20 rounded-full">
                  {audits.length} Audits Run
                </span>
              </div>

              {loading ? (
                <div className="p-12 text-center text-zinc-500 font-mono text-sm">Loading audits...</div>
              ) : audits.length === 0 ? (
                <div className="p-12 text-center text-zinc-500 font-mono text-sm">No analysis runs recorded yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-black/20">
                        <th className="px-8 py-5 font-bold">Date</th>
                        <th className="px-8 py-5 font-bold">Business Name</th>
                        <th className="px-8 py-5 font-bold">Details / Source</th>
                        <th className="px-8 py-5 font-bold">Token Breakdown</th>
                        <th className="px-8 py-5 font-bold">Cost (USD)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {audits.map((audit) => (
                        <tr key={audit.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                          <td className="px-8 py-5 text-xs text-zinc-400 whitespace-nowrap font-mono">
                            {audit.createdAt ? new Intl.DateTimeFormat('en-US', {
                              month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
                            }).format(audit.createdAt) : 'N/A'}
                          </td>
                          <td className="px-8 py-5 text-sm font-bold text-white whitespace-nowrap font-display">
                            {audit.businessName || '-'}
                          </td>
                          <td className="px-8 py-5 text-sm text-zinc-300 max-w-xs truncate">
                            {audit.url ? (
                              <span className="text-[#FF5500] hover:underline break-all cursor-pointer">{audit.url}</span>
                            ) : (
                              audit.description || '-'
                            )}
                          </td>
                          <td className="px-8 py-5 text-xs text-zinc-400 whitespace-nowrap font-mono">
                            {((audit.promptTokens || 0) + (audit.completionTokens || 0)).toLocaleString()} tokens
                            {audit.groundingQueries > 0 && (
                              <span className="ml-2 text-blue-400 font-semibold">• Search Grounded</span>
                            )}
                          </td>
                          <td className="px-8 py-5 text-sm font-bold text-white whitespace-nowrap font-mono">
                            ${(audit.costUsd || 0).toFixed(5)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Selected Lead Details Modal */}
            {selectedLead && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative overflow-hidden text-white max-h-[90vh] overflow-y-auto">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF5500]/10 border border-[#FF5500]/20 flex items-center justify-center text-[#FF5500]">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#FF5500] uppercase tracking-widest block font-bold">
                        // LEAD PROFILE & AUDIT REPORT
                      </span>
                      <h3 className="text-2xl font-bold font-display text-white">
                        {selectedLead.name || 'Anonymous Visitor'}
                      </h3>
                    </div>
                  </div>

                  {/* Core Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">Email Address</span>
                      <a href={`mailto:${selectedLead.email}`} className="text-sm font-semibold text-white hover:text-[#FF5500] transition-colors break-all flex items-center gap-1.5">
                        {selectedLead.email}
                        <ExternalLink size={12} className="opacity-60" />
                      </a>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">Company / Organization</span>
                      <span className="text-sm font-semibold text-white">{selectedLead.company || 'Not Specified'}</span>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">Lead Source</span>
                      <span className="text-sm font-semibold text-[#FF5500] font-mono">{selectedLead.source}</span>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">Captured At</span>
                      <span className="text-sm font-semibold text-zinc-300 font-mono">
                        {selectedLead.createdAt ? new Intl.DateTimeFormat('en-US', {
                          dateStyle: 'medium', timeStyle: 'short'
                        }).format(selectedLead.createdAt) : 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Audit Diagnostic Metrics (if available) */}
                  {selectedLead.quizAnswers && (
                    <div className="space-y-4">
                      <div className="border-t border-white/10 pt-6">
                        <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Activity size={14} className="text-[#FF5500]" />
                          Diagnostic Payload & Custom Answers
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedLead.quizAnswers.businessName && (
                            <div className="bg-black/50 border border-white/10 rounded-2xl p-4">
                              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Business Analyzed</span>
                              <span className="text-base font-bold text-white">{selectedLead.quizAnswers.businessName}</span>
                            </div>
                          )}

                          {selectedLead.quizAnswers.sector && (
                            <div className="bg-black/50 border border-white/10 rounded-2xl p-4">
                              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Sector / Industry</span>
                              <span className="text-base font-bold text-white">{selectedLead.quizAnswers.sector}</span>
                            </div>
                          )}

                          {selectedLead.quizAnswers.readinessScore !== undefined && (
                            <div className="bg-black/50 border border-white/10 rounded-2xl p-4">
                              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">AI Readiness Score</span>
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-[#FF5500] font-mono">{selectedLead.quizAnswers.readinessScore}/100</span>
                                {selectedLead.quizAnswers.readinessTier && (
                                  <span className="text-xs text-zinc-400">({selectedLead.quizAnswers.readinessTier})</span>
                                )}
                              </div>
                            </div>
                          )}

                          {selectedLead.quizAnswers.annualReclaimedROI !== undefined && (
                            <div className="bg-black/50 border border-white/10 rounded-2xl p-4">
                              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Est. Reclaimed Annual ROI</span>
                              <span className="text-2xl font-black text-green-400 font-mono">
                                ${Number(selectedLead.quizAnswers.annualReclaimedROI).toLocaleString()}
                              </span>
                            </div>
                          )}

                          {selectedLead.quizAnswers.internalDragHours !== undefined && (
                            <div className="bg-black/50 border border-white/10 rounded-2xl p-4">
                              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Internal Drag Hours</span>
                              <span className="text-lg font-bold text-white font-mono">
                                {Number(selectedLead.quizAnswers.internalDragHours).toLocaleString()} hrs/year
                              </span>
                            </div>
                          )}

                          {/* Meeting Schedule details */}
                          {selectedLead.quizAnswers.date && (
                            <div className="bg-black/50 border border-blue-500/30 rounded-2xl p-4 sm:col-span-2">
                              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-1">Scheduled Call Slot</span>
                              <div className="flex items-center gap-2 text-base font-bold text-white mt-1">
                                <Calendar size={16} className="text-blue-400" />
                                <span>{selectedLead.quizAnswers.date} at {selectedLead.quizAnswers.time}</span>
                              </div>
                            </div>
                          )}

                          {/* Department Demo details */}
                          {selectedLead.quizAnswers.department && (
                            <div className="bg-black/50 border border-white/10 rounded-2xl p-4 sm:col-span-2">
                              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Target Department & Workflow</span>
                              <span className="text-sm font-bold text-white block">{selectedLead.quizAnswers.department}</span>
                              {selectedLead.quizAnswers.workflow && (
                                <p className="text-xs text-zinc-400 mt-1">{selectedLead.quizAnswers.workflow}</p>
                              )}
                            </div>
                          )}

                          {/* Waitlist details */}
                          {selectedLead.quizAnswers.linkedin && (
                            <div className="bg-black/50 border border-white/10 rounded-2xl p-4 sm:col-span-2">
                              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">LinkedIn Profile</span>
                              <a
                                href={selectedLead.quizAnswers.linkedin.startsWith('http') ? selectedLead.quizAnswers.linkedin : `https://${selectedLead.quizAnswers.linkedin}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-semibold text-[#FF5500] hover:underline break-all inline-flex items-center gap-1.5"
                              >
                                {selectedLead.quizAnswers.linkedin}
                                <ExternalLink size={12} />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-3">
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                    <a
                      href={`mailto:${selectedLead.email}?subject=Regarding Your AI Automation Audit - AIMLpartner`}
                      className="px-6 py-2.5 rounded-full bg-[#FF5500] hover:bg-orange-600 text-black text-xs font-bold transition-all shadow-[0_0_20px_rgba(255,85,0,0.3)] flex items-center gap-2 cursor-pointer"
                    >
                      <Send size={14} />
                      Email Lead Now
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: JOBS */}
        {activeTab === 'jobs' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display font-bold text-2xl text-white">Job Postings</h2>
                <p className="text-zinc-400 text-sm mt-1">Manage active career opportunities.</p>
              </div>
              <button
                onClick={() => {
                  if (showJobForm) {
                    handleCancelJobForm();
                  } else {
                    setEditingJobId(null);
                    setJobForm({ title: '', location: '', type: 'Full-time', desc: '', isRemote: false });
                    setShowJobForm(true);
                  }
                }}
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-[#FF5500] hover:text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-none"
              >
                <Plus size={16} />
                {showJobForm ? (editingJobId ? 'Cancel Edit' : 'Cancel') : 'Post New Job'}
              </button>
            </div>

            {showJobForm && (
              <form id="job-form-section" onSubmit={handleSaveJob} className="bg-black/60 border border-[#FF5500]/50 backdrop-blur-xl p-8 sm:p-10 rounded-3xl mb-12 animate-in fade-in slide-in-from-top-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF5500]/10 to-transparent pointer-events-none"></div>
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display font-bold text-xl text-white">
                      {editingJobId ? 'Edit Job Posting' : 'Create Job Posting'}
                    </h3>
                    {editingJobId && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF5500] bg-[#FF5500]/10 border border-[#FF5500]/30 px-3 py-1 rounded-full">
                        Editing Active Role
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleCancelJobForm}
                    className="text-zinc-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                {/* 1. SMART AUTO-FILL JOB DESCRIPTION CARD (TOP OF FORM) */}
                <div className="mb-8 relative z-10 p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-mono font-bold text-zinc-200 uppercase tracking-widest flex items-center gap-1.5">
                        <Wand2 size={14} className="text-[#FF5500]" />
                        Job Description
                      </label>
                      <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline">
                        — Paste description to smartly auto-fill fields below
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSmartAutofill()}
                      disabled={isAutofilling || !jobForm.desc.trim()}
                      className="flex items-center gap-1.5 text-xs font-mono font-bold text-black bg-[#FF5500] hover:bg-[#FF6E26] px-4 py-2 rounded-full transition-all shadow-[0_0_15px_rgba(255,85,0,0.35)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed self-start sm:self-auto hover:scale-105 active:scale-95"
                      title="Analyze description and autofill title, type, location, duration, and skills"
                    >
                      <Sparkles size={13} className={isAutofilling ? 'animate-spin' : 'animate-pulse'} />
                      <span>{isAutofilling ? 'Smart Analyzing...' : '✨ Smart Auto-Fill Fields'}</span>
                    </button>
                  </div>

                  <textarea
                    required
                    rows={6}
                    value={jobForm.desc}
                    onChange={e => setJobForm({...jobForm, desc: e.target.value})}
                    onPaste={(e) => {
                      const pasted = e.clipboardData.getData('text');
                      if (pasted && pasted.trim().length > 25) {
                        setTimeout(() => handleSmartAutofill(pasted), 60);
                      }
                    }}
                    className="w-full bg-black/60 border border-white/20 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-[#FF5500] transition-colors resize-y font-sans text-sm leading-relaxed placeholder-zinc-500"
                    placeholder="Paste the full job or internship description here (from LinkedIn, document, or notes). Title, employment type, location, duration, and skills will be smartly extracted..."
                  />

                  {autofillSuccess && (
                    <div className="mt-3 flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl animate-in fade-in slide-in-from-top-2">
                      <Check size={14} className="text-emerald-400 shrink-0" />
                      <span>Smartly auto-filled Title, Type, Location, Duration &amp; Skills from description! Review and adjust any field below.</span>
                    </div>
                  )}
                </div>

                {/* 2. AUTO-FILLED & CUSTOMIZABLE PARAMETERS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 relative z-10">
                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={jobForm.title}
                      onChange={e => setJobForm({...jobForm, title: e.target.value})}
                      className="w-full bg-black/50 border border-white/20 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#FF5500] transition-colors text-sm"
                      placeholder="e.g. Senior AI Engineer"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                        Location *
                      </label>
                      <label className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#FF5500] uppercase cursor-pointer bg-[#FF5500]/10 px-2.5 py-0.5 rounded-md transition-colors hover:bg-[#FF5500]/20 border border-[#FF5500]/30">
                        <input
                          type="checkbox"
                          checked={jobForm.isRemote}
                          onChange={e => {
                            const checked = e.target.checked;
                            setJobForm(prev => ({
                              ...prev,
                              isRemote: checked,
                              location: checked ? 'Remote' : ''
                            }));
                          }}
                          className="accent-[#FF5500] cursor-pointer"
                        />
                        Remote
                      </label>
                    </div>
                    <input
                      type="text"
                      required={!jobForm.isRemote}
                      disabled={jobForm.isRemote}
                      value={jobForm.isRemote ? 'Remote' : jobForm.location}
                      onChange={e => setJobForm({...jobForm, location: e.target.value})}
                      className={`w-full bg-black/50 border border-white/20 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#FF5500] transition-colors text-sm ${jobForm.isRemote ? 'opacity-60 cursor-not-allowed text-zinc-400' : ''}`}
                      placeholder="e.g. New York, NY"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
                      Employment Type *
                    </label>
                    <select
                      value={jobForm.type}
                      onChange={e => setJobForm({...jobForm, type: e.target.value})}
                      className="w-full bg-black/50 border border-white/20 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#FF5500] transition-colors appearance-none cursor-pointer text-sm"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                      <option value="Contract-to-Hire">Contract-to-Hire</option>
                      <option value="Part-time">Part-time</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 relative z-10">
                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={jobForm.duration}
                      onChange={e => setJobForm({...jobForm, duration: e.target.value})}
                      className="w-full bg-black/50 border border-white/20 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#FF5500] transition-colors text-sm"
                      placeholder="e.g. 3 Months or Full-time"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
                      Stipend / Comp (Optional)
                    </label>
                    <input
                      type="text"
                      value={jobForm.stipend}
                      onChange={e => setJobForm({...jobForm, stipend: e.target.value})}
                      className="w-full bg-black/50 border border-white/20 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#FF5500] transition-colors text-sm"
                      placeholder="Leave blank if not applicable"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
                      Key Technologies (CSV)
                    </label>
                    <input
                      type="text"
                      value={jobForm.skills}
                      onChange={e => setJobForm({...jobForm, skills: e.target.value})}
                      className="w-full bg-black/50 border border-white/20 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-[#FF5500] transition-colors text-sm"
                      placeholder="e.g. React, Node.js, MongoDB, Git"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 relative z-10">
                  <button
                    type="button"
                    onClick={handleCancelJobForm}
                    className="px-8 py-3 rounded-full font-bold text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingJob}
                    className="flex items-center gap-2 px-8 py-3 bg-[#FF5500] hover:bg-[#FF8844] text-black rounded-full font-bold text-sm transition-colors cursor-pointer shadow-[0_0_15px_rgba(255,85,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingJob ? 'Saving...' : editingJobId ? 'Save Changes' : 'Publish Job'}
                  </button>
                </div>
              </form>
            )}

            <div className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden">
              {jobs.length === 0 ? (
                <div className="p-16 text-center text-zinc-500 font-mono text-sm border border-dashed border-white/10 rounded-2xl m-6">No active job postings.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-black/20">
                        <th className="px-8 py-5 font-bold">Title</th>
                        <th className="px-8 py-5 font-bold">Location</th>
                        <th className="px-8 py-5 font-bold">Type</th>
                        <th className="px-8 py-5 font-bold">Date Posted</th>
                        <th className="px-8 py-5 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job) => (
                        <tr key={job.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                          <td className="px-8 py-5 text-base font-bold text-white font-display">
                            {job.title}
                          </td>
                          <td className="px-8 py-5 text-sm text-zinc-300">
                            {job.location}
                          </td>
                          <td className="px-8 py-5">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 uppercase font-mono tracking-wider">
                              {job.type}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-xs text-zinc-400 font-mono">
                            {job.createdAt ? new Intl.DateTimeFormat('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric'
                            }).format(job.createdAt) : 'Just now'}
                          </td>
                          <td className="px-8 py-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleStartEditJob(job)}
                                className="text-zinc-300 hover:text-[#FF5500] bg-white/5 hover:bg-[#FF5500]/10 border border-white/10 hover:border-[#FF5500]/30 px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono font-semibold"
                                title="Edit Posting"
                              >
                                <Pencil size={14} />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteJob(job.id)}
                                className="text-zinc-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono font-semibold"
                                title="Delete Posting"
                              >
                                <Trash2 size={14} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB CONTENT: APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="font-display font-bold text-2xl text-white">Job Applications</h2>
              <p className="text-zinc-400 text-sm mt-1">Review candidates who applied via the Careers page.</p>
            </div>

            <div className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden">
              {applications.length === 0 ? (
                <div className="p-16 text-center text-zinc-500 font-mono text-sm border border-dashed border-white/10 rounded-2xl m-6">No applications received yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-black/20">
                        <th className="px-8 py-5 font-bold">Date</th>
                        <th className="px-8 py-5 font-bold">Candidate</th>
                        <th className="px-8 py-5 font-bold">Role Applied For</th>
                        <th className="px-8 py-5 font-bold">Links</th>
                        <th className="px-8 py-5 font-bold">Cover Letter</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors align-top">
                          <td className="px-8 py-6 text-xs text-zinc-400 font-mono whitespace-nowrap">
                            {app.createdAt ? new Intl.DateTimeFormat('en-US', {
                              month: 'short', day: 'numeric'
                            }).format(app.createdAt) : 'N/A'}
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-sm font-bold text-white font-display mb-1">{app.name}</div>
                            <a href={`mailto:${app.email}`} className="text-xs text-[#FF5500] hover:underline cursor-pointer">{app.email}</a>
                          </td>
                          <td className="px-8 py-6 text-sm font-bold text-zinc-300">
                            {app.jobTitle || 'Unknown Role'}
                          </td>
                          <td className="px-8 py-6">
                            {app.linkedinUrl ? (
                              <a href={app.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono font-bold text-[#FF5500] hover:underline flex items-center gap-1.5 cursor-pointer bg-[#FF5500]/10 px-3 py-1.5 rounded w-fit border border-[#FF5500]/20">
                                Profile / Resume <Send size={12} />
                              </a>
                            ) : (
                              <span className="text-xs text-zinc-500 font-mono">No link provided</span>
                            )}
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-sm text-zinc-400 max-w-sm whitespace-pre-wrap leading-relaxed">
                              {app.coverLetter || <span className="italic opacity-50">No cover letter</span>}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
