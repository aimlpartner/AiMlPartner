import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth, signInWithGoogle, logOut } from '../lib/firebase';
import { LogOut, Users, FileText, Activity, DollarSign, Briefcase, Plus, Trash2, LayoutDashboard, Send } from 'lucide-react';

type Tab = 'overview' | 'jobs' | 'applications';

export function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const [audits, setAudits] = useState<any[]>([]);
  
  // New States
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  
  // Job Form State
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobForm, setJobForm] = useState({ title: '', location: '', type: 'Full-time', desc: '', isRemote: false });
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);

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

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingJob(true);
    try {
      await addDoc(collection(db, 'job_postings'), {
        ...jobForm,
        createdAt: serverTimestamp()
      });
      setShowJobForm(false);
      setJobForm({ title: '', location: '', type: 'Full-time', desc: '', isRemote: false });
    } catch (err) {
      console.error("Error adding job:", err);
      alert("Failed to create job posting.");
    } finally {
      setIsSubmittingJob(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      try {
        await deleteDoc(doc(db, 'job_postings', id));
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
      <div className="relative min-h-screen bg-surface text-ink flex items-center justify-center font-sans">
        {/* Texture Overlays */}
        <div className="grain-overlay"></div>

        {/* SECTION 1: IMMERSIVE SPACE BACKGROUND */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 animate-[float-slow_30s_ease-in-out_infinite]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-90 transform scale-[1.15] origin-center"></div>
          </div>
          <div className="absolute inset-0 bg-space-gradient"></div>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white border border-black/10 p-10 rounded-3xl max-w-md w-full text-center shadow-editorial relative overflow-hidden z-10 mx-4">
          <div className="w-16 h-16 bg-surface-alt border border-black/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent shadow-sm">
            <Users size={24} />
          </div>
          <h1 className="text-2xl font-display font-extrabold text-ink mb-2">Admin Login</h1>
          <p className="text-ink-light font-medium text-sm mb-8 leading-relaxed">
            Sign in with your authorized Google account to access the dashboard.
          </p>
          <button
            onClick={signInWithGoogle}
            className="w-full bg-ink text-white font-bold hover:bg-accent px-6 py-3 rounded-full transition-all cursor-pointer shadow-md"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-surface text-ink font-sans">
      <div className="grain-overlay"></div>

      <section className="relative pt-40 pb-24 text-white overflow-hidden bg-surface-dark">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 animate-[float-slow_30s_ease-in-out_infinite]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-90 transform scale-[1.15] origin-center"></div>
          </div>
          <div className="absolute inset-0 bg-space-gradient"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
        </div>
        <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none z-0"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight mb-2 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                Admin Dashboard
              </h1>
              <p className="text-white/70 font-medium text-sm leading-relaxed">
                Logged in as <span className="font-semibold text-accent">{user.email}</span>
              </p>
            </div>
            <button
              onClick={logOut}
              className="flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white bg-white/10 border border-white/20 px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm hover:bg-white/20"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </section>

      <section className="bg-surface rounded-t-[3rem] -mt-10 py-12 relative z-10 text-ink border-t border-black/5 px-6 min-h-[500px]">
        <div className="max-w-[1400px] mx-auto">
          {error && (
            <div className="bg-alert-soft border border-alert-border text-alert p-4 rounded-xl mb-8 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-black/5 pb-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'overview' ? 'bg-ink text-white' : 'bg-surface-alt hover:bg-black/5 text-ink-light hover:text-ink'
              }`}
            >
              <LayoutDashboard size={16} />
              Overview & Leads
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'jobs' ? 'bg-ink text-white' : 'bg-surface-alt hover:bg-black/5 text-ink-light hover:text-ink'
              }`}
            >
              <Briefcase size={16} />
              Job Postings
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'applications' ? 'bg-ink text-white' : 'bg-surface-alt hover:bg-black/5 text-ink-light hover:text-ink'
              }`}
            >
              <FileText size={16} />
              Applications
              {applications.length > 0 && (
                <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'applications' ? 'bg-accent text-white' : 'bg-accent/20 text-accent'}`}>
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
                <div className="bg-white border border-black/5 p-6 rounded-2xl flex items-center gap-6 shadow-editorial hover:shadow-editorial-hover transition-all duration-300 relative overflow-hidden">
                  <div className="w-12 h-12 bg-surface-alt border border-black/5 rounded-xl flex items-center justify-center text-accent">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-ink-light uppercase tracking-widest mb-1">Total Leads</div>
                    <div className="text-3xl font-display font-extrabold text-ink">{leads.length}</div>
                  </div>
                </div>

                <div className="bg-white border border-black/5 p-6 rounded-2xl flex items-center gap-6 shadow-editorial hover:shadow-editorial-hover transition-all duration-300 relative overflow-hidden">
                  <div className="w-12 h-12 bg-surface-alt border border-black/5 rounded-xl flex items-center justify-center text-accent">
                    <Activity size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-ink-light uppercase tracking-widest mb-1">Unique Visitors</div>
                    <div className="text-3xl font-display font-extrabold text-ink">{visitorCount}</div>
                  </div>
                </div>

                <div className="bg-white border border-black/5 p-6 rounded-2xl flex items-center gap-6 shadow-editorial hover:shadow-editorial-hover transition-all duration-300 relative overflow-hidden">
                  <div className="w-12 h-12 bg-surface-alt border border-black/5 rounded-xl flex items-center justify-center text-accent">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-ink-light uppercase tracking-widest mb-1">Total API Spend</div>
                    <div className="text-3xl font-display font-extrabold text-ink">
                      ${totalSpend.toFixed(5)}
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-black/5 p-6 rounded-2xl flex items-center gap-6 shadow-editorial hover:shadow-editorial-hover transition-all duration-300 relative overflow-hidden">
                  <div className="w-12 h-12 bg-surface-alt border border-black/5 rounded-xl flex items-center justify-center text-accent">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-ink-light uppercase tracking-widest mb-1">Avg. Audit Cost</div>
                    <div className="text-3xl font-display font-extrabold text-ink">
                      ${avgCostPerAudit.toFixed(5)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Leads Table Card */}
              <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-editorial">
                <div className="px-6 py-5 border-b border-black/5 bg-surface-alt/30">
                  <h2 className="font-display font-bold text-ink text-lg">Recent Leads</h2>
                </div>

                {loading ? (
                  <div className="p-8 text-center text-ink-light font-medium text-sm">Loading leads...</div>
                ) : leads.length === 0 ? (
                  <div className="p-8 text-center text-ink-light font-medium text-sm">No leads captured yet.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-black/5 text-[10px] font-mono text-ink-light uppercase tracking-widest bg-surface-alt/10">
                          <th className="px-6 py-4 font-bold">Date</th>
                          <th className="px-6 py-4 font-bold">Name</th>
                          <th className="px-6 py-4 font-bold">Email</th>
                          <th className="px-6 py-4 font-bold">Company</th>
                          <th className="px-6 py-4 font-bold">Source</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead) => (
                          <tr key={lead.id} className="border-b border-black/5 last:border-0 hover:bg-surface-alt/30 transition-colors">
                            <td className="px-6 py-4 text-xs text-ink-light whitespace-nowrap font-mono">
                              {lead.createdAt ? new Intl.DateTimeFormat('en-US', {
                                month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
                              }).format(lead.createdAt) : 'N/A'}
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-ink whitespace-nowrap font-display">
                              {lead.name || '-'}
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-light whitespace-nowrap">
                              {lead.email}
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-light whitespace-nowrap">
                              {lead.company || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-surface-alt border border-black/5 text-[10px] font-semibold text-ink-light uppercase font-mono tracking-wider">
                                {lead.source}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Recent API Audits Table Card */}
              <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-editorial mt-12">
                <div className="px-6 py-5 border-b border-black/5 bg-surface-alt/30">
                  <h2 className="font-display font-bold text-ink text-lg">AI Analysis Cost Logs</h2>
                </div>

                {loading ? (
                  <div className="p-8 text-center text-ink-light font-medium text-sm">Loading audits...</div>
                ) : audits.length === 0 ? (
                  <div className="p-8 text-center text-ink-light font-medium text-sm">No analysis runs recorded yet.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-black/5 text-[10px] font-mono text-ink-light uppercase tracking-widest bg-surface-alt/10">
                          <th className="px-6 py-4 font-bold">Date</th>
                          <th className="px-6 py-4 font-bold">Business Name</th>
                          <th className="px-6 py-4 font-bold">Details / Source</th>
                          <th className="px-6 py-4 font-bold">Cost (USD)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {audits.map((audit) => (
                          <tr key={audit.id} className="border-b border-black/5 last:border-0 hover:bg-surface-alt/30 transition-colors">
                            <td className="px-6 py-4 text-xs text-ink-light whitespace-nowrap font-mono">
                              {audit.createdAt ? new Intl.DateTimeFormat('en-US', {
                                month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
                              }).format(audit.createdAt) : 'N/A'}
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-ink whitespace-nowrap font-display">
                              {audit.businessName || '-'}
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-light max-w-xs truncate">
                              {audit.url ? (
                                <span className="text-accent underline break-all">{audit.url}</span>
                              ) : (
                                audit.description || '-'
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm font-bold text-ink whitespace-nowrap font-mono">
                              ${(audit.costUsd || 0).toFixed(5)}
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

          {/* TAB CONTENT: JOBS */}
          {activeTab === 'jobs' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display font-bold text-2xl text-ink">Job Postings</h2>
                  <p className="text-ink-light text-sm mt-1">Manage active career opportunities.</p>
                </div>
                <button
                  onClick={() => setShowJobForm(!showJobForm)}
                  className="flex items-center gap-2 bg-ink text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-accent transition-colors"
                >
                  <Plus size={16} />
                  {showJobForm ? 'Cancel' : 'Post New Job'}
                </button>
              </div>

              {showJobForm && (
                <form onSubmit={handleCreateJob} className="bg-white border border-black/5 p-8 rounded-2xl shadow-editorial mb-8 animate-in fade-in slide-in-from-top-4">
                  <h3 className="font-display font-bold text-lg mb-6">Create Job Posting</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-xs font-mono font-bold text-ink-light uppercase tracking-widest mb-2">Job Title</label>
                      <input
                        type="text"
                        required
                        value={jobForm.title}
                        onChange={e => setJobForm({...jobForm, title: e.target.value})}
                        className="w-full bg-surface border border-black/10 px-4 py-3 rounded-xl focus:outline-none focus:border-accent transition-colors"
                        placeholder="e.g. Senior AI Engineer"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-mono font-bold text-ink-light uppercase tracking-widest">Location</label>
                        <label className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-accent uppercase cursor-pointer bg-accent/10 px-2 py-0.5 rounded transition-colors hover:bg-accent/20">
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
                            className="accent-accent cursor-pointer"
                          />
                          Remote Position
                        </label>
                      </div>
                      <input
                        type="text"
                        required={!jobForm.isRemote}
                        disabled={jobForm.isRemote}
                        value={jobForm.isRemote ? 'Remote' : jobForm.location}
                        onChange={e => setJobForm({...jobForm, location: e.target.value})}
                        className={`w-full bg-surface border border-black/10 px-4 py-3 rounded-xl focus:outline-none focus:border-accent transition-colors ${jobForm.isRemote ? 'opacity-60 cursor-not-allowed bg-black/5 text-ink-light' : ''}`}
                        placeholder="e.g. New York, NY"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-ink-light uppercase tracking-widest mb-2">Employment Type</label>
                      <select
                        value={jobForm.type}
                        onChange={e => setJobForm({...jobForm, type: e.target.value})}
                        className="w-full bg-surface border border-black/10 px-4 py-3 rounded-xl focus:outline-none focus:border-accent transition-colors appearance-none"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Contract-to-Hire">Contract-to-Hire</option>
                        <option value="Contract">Contract</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-xs font-mono font-bold text-ink-light uppercase tracking-widest mb-2">Description</label>
                    <textarea
                      required
                      rows={4}
                      value={jobForm.desc}
                      onChange={e => setJobForm({...jobForm, desc: e.target.value})}
                      className="w-full bg-surface border border-black/10 px-4 py-3 rounded-xl focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="Briefly describe the role..."
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowJobForm(false)}
                      className="px-6 py-2.5 rounded-full font-bold text-sm text-ink-light hover:bg-surface-alt transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingJob}
                      className="flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-full font-bold text-sm transition-colors disabled:opacity-50"
                    >
                      {isSubmittingJob ? 'Saving...' : 'Publish Job'}
                    </button>
                  </div>
                </form>
              )}

              <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-editorial">
                {jobs.length === 0 ? (
                  <div className="p-8 text-center text-ink-light font-medium text-sm">No active job postings.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-black/5 text-[10px] font-mono text-ink-light uppercase tracking-widest bg-surface-alt/10">
                          <th className="px-6 py-4 font-bold">Title</th>
                          <th className="px-6 py-4 font-bold">Location</th>
                          <th className="px-6 py-4 font-bold">Type</th>
                          <th className="px-6 py-4 font-bold">Date Posted</th>
                          <th className="px-6 py-4 font-bold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.map((job) => (
                          <tr key={job.id} className="border-b border-black/5 last:border-0 hover:bg-surface-alt/30 transition-colors group">
                            <td className="px-6 py-4 text-sm font-bold text-ink font-display">
                              {job.title}
                            </td>
                            <td className="px-6 py-4 text-sm text-ink-light">
                              {job.location}
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2 py-1 rounded bg-surface-alt border border-black/5 text-[10px] font-semibold text-ink-light uppercase font-mono tracking-wider">
                                {job.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs text-ink-light font-mono">
                              {job.createdAt ? new Intl.DateTimeFormat('en-US', {
                                month: 'short', day: 'numeric', year: 'numeric'
                              }).format(job.createdAt) : 'Just now'}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => handleDeleteJob(job.id)}
                                className="text-ink-light hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100"
                                title="Delete Posting"
                              >
                                <Trash2 size={16} />
                              </button>
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
                <h2 className="font-display font-bold text-2xl text-ink">Job Applications</h2>
                <p className="text-ink-light text-sm mt-1">Review candidates who applied via the Careers page.</p>
              </div>

              <div className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-editorial">
                {applications.length === 0 ? (
                  <div className="p-8 text-center text-ink-light font-medium text-sm">No applications received yet.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-black/5 text-[10px] font-mono text-ink-light uppercase tracking-widest bg-surface-alt/10">
                          <th className="px-6 py-4 font-bold">Date</th>
                          <th className="px-6 py-4 font-bold">Candidate</th>
                          <th className="px-6 py-4 font-bold">Role Applied For</th>
                          <th className="px-6 py-4 font-bold">Links</th>
                          <th className="px-6 py-4 font-bold">Cover Letter</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((app) => (
                          <tr key={app.id} className="border-b border-black/5 last:border-0 hover:bg-surface-alt/30 transition-colors align-top">
                            <td className="px-6 py-4 text-xs text-ink-light font-mono whitespace-nowrap">
                              {app.createdAt ? new Intl.DateTimeFormat('en-US', {
                                month: 'short', day: 'numeric'
                              }).format(app.createdAt) : 'N/A'}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-bold text-ink font-display">{app.name}</div>
                              <a href={`mailto:${app.email}`} className="text-xs text-accent hover:underline">{app.email}</a>
                            </td>
                            <td className="px-6 py-4 text-sm font-bold text-ink-light">
                              {app.jobTitle || 'Unknown Role'}
                            </td>
                            <td className="px-6 py-4">
                              {app.linkedinUrl ? (
                                <a href={app.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-accent hover:underline flex items-center gap-1">
                                  Profile / Resume <Send size={10} />
                                </a>
                              ) : (
                                <span className="text-xs text-ink-light">No link provided</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-ink-light max-w-sm whitespace-pre-wrap">
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
      </section>
    </div>
  );
}
