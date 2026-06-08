import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth, signInWithGoogle, logOut } from '../lib/firebase';
import { LogOut, Users, FileText, Activity, DollarSign } from 'lucide-react';

export function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const [audits, setAudits] = useState<any[]>([]);
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
    const leadsQuery = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubscribeLeads = onSnapshot(leadsQuery, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      setLeads(leadsData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching leads:", err);
      setError('You do not have permission to view this data or an error occurred.');
      setLoading(false);
    });

    // Fetch Audits
    const auditsQuery = query(collection(db, 'audits'), orderBy('createdAt', 'desc'));
    const unsubscribeAudits = onSnapshot(auditsQuery, (snapshot) => {
      const auditsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      setAudits(auditsData);
    }, (err) => {
      console.error("Error fetching audits:", err);
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
    };
  }, [user]);

  const totalSpend = audits.reduce((sum, audit) => sum + (audit.costUsd || 0), 0);
  const avgCostPerAudit = audits.length > 0 ? totalSpend / audits.length : 0;

  if (!user) {
    return (
      <div className="relative min-h-screen overflow-x-hidden bg-surface text-ink flex items-center justify-center font-sans">
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
    <div className="relative min-h-screen overflow-x-hidden bg-surface text-ink font-sans">
      {/* Texture Overlays */}
      <div className="grain-overlay"></div>

      {/* SECTION 1: IMMERSIVE SPACE HERO */}
      <section className="relative pt-40 pb-24 text-white overflow-hidden bg-surface-dark">
        {/* Deep Space Background Overlay */}
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

      {/* SECTION 2: THE DASHBOARD PANEL (Light Alabaster theme wrapper) */}
      <section className="bg-surface rounded-t-[3rem] -mt-10 py-24 relative z-10 text-ink border-t border-black/5 px-6">
        <div className="max-w-[1400px] mx-auto">
          {error && (
            <div className="bg-alert-soft border border-alert-border text-alert p-4 rounded-xl mb-8 text-sm font-medium">
              {error}
            </div>
          )}

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
                <div className="text-3xl font-display font-extrabold text-ink">${totalSpend.toFixed(5)}</div>
              </div>
            </div>

            <div className="bg-white border border-black/5 p-6 rounded-2xl flex items-center gap-6 shadow-editorial hover:shadow-editorial-hover transition-all duration-300 relative overflow-hidden">
              <div className="w-12 h-12 bg-surface-alt border border-black/5 rounded-xl flex items-center justify-center text-accent">
                <DollarSign size={20} />
              </div>
              <div>
                <div className="text-[10px] font-mono text-ink-light uppercase tracking-widest mb-1">Avg. Audit Cost</div>
                <div className="text-3xl font-display font-extrabold text-ink">${avgCostPerAudit.toFixed(5)}</div>
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
                      <th className="px-6 py-4 font-bold">Tokens (Prompt/Completion)</th>
                      <th className="px-6 py-4 font-bold">Grounding</th>
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
                        <td className="px-6 py-4 text-xs text-ink-light whitespace-nowrap font-mono">
                          {(audit.promptTokens || 0).toLocaleString()} / {(audit.completionTokens || 0).toLocaleString()} <span className="text-[10px] text-ink-light/50">({(audit.totalTokens || 0).toLocaleString()} total)</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {audit.groundingQueries > 0 ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-accent/15 border border-accent/20 text-[9px] font-bold text-accent uppercase font-mono tracking-wider">
                              Grounded
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-alt border border-black/5 text-[9px] font-semibold text-ink-light/60 uppercase font-mono tracking-wider">
                              None
                            </span>
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
      </section>
    </div>
  );
}
