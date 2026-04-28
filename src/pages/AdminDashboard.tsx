import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth, signInWithGoogle, logOut, handleFirestoreError, OperationType } from '../lib/firebase';
import { LogOut, Users, FileText, Activity } from 'lucide-react';

export function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [visitorCount, setVisitorCount] = useState(0);
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

    return () => unsubscribeLeads();
  }, [user]);

  if (!user) {
    return (
      <main className="pt-32 pb-24 bg-gradient-to-br from-slate-50 to-sky-50/30 min-h-screen flex items-center justify-center">
        <div className="bg-white p-10 border border-slate-200 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-slate-100 flex items-center justify-center mx-auto mb-6 border border-slate-200">
            <Users className="text-slate-900" size={24} />
          </div>
          <h1 className="text-2xl font-medium text-slate-900 mb-2">Admin Login</h1>
          <p className="text-slate-600 font-light text-sm mb-8">
            Sign in with your authorized Google account to access the dashboard.
          </p>
          <button 
            onClick={signInWithGoogle}
            className="w-full bg-gradient-to-r from-sky-400 to-sky-600 text-white rounded-full shadow-md shadow-sky-500/20  px-6 py-3 font-medium hover:from-sky-500 hover:to-sky-700 transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-24 bg-gradient-to-br from-slate-50 to-sky-50/30 min-h-screen">
      <div className="container-max">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 font-light">
              Logged in as <span className="font-medium text-slate-900">{user.email}</span>
            </p>
          </div>
          <button 
            onClick={logOut}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-900 p-4 border border-red-200 mb-8 text-sm">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 border border-slate-200 flex items-center gap-6">
            <div className="w-12 h-12 bg-slate-100 flex items-center justify-center border border-slate-200">
              <FileText className="text-slate-900" size={20} />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">Total Leads</div>
              <div className="text-3xl font-semibold text-slate-900">{leads.length}</div>
            </div>
          </div>
          <div className="bg-white p-6 border border-slate-200 flex items-center gap-6">
            <div className="w-12 h-12 bg-slate-100 flex items-center justify-center border border-slate-200">
              <Activity className="text-slate-900" size={20} />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">Unique Visitors</div>
              <div className="text-3xl font-semibold text-slate-900">{visitorCount}</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-br from-slate-50 to-sky-50/30">
            <h2 className="font-medium text-slate-900">Recent Leads</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-slate-600 font-light">Loading leads...</div>
          ) : leads.length === 0 ? (
            <div className="p-8 text-center text-slate-600 font-light">No leads captured yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-mono text-slate-400 uppercase tracking-widest bg-gradient-to-br from-slate-50 to-sky-50/30/50">
                    <th className="px-6 py-4 font-normal">Date</th>
                    <th className="px-6 py-4 font-normal">Name</th>
                    <th className="px-6 py-4 font-normal">Email</th>
                    <th className="px-6 py-4 font-normal">Company</th>
                    <th className="px-6 py-4 font-normal">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-slate-100 last:border-0 hover:bg-gradient-to-br from-slate-50 to-sky-50/30/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                        {lead.createdAt ? new Intl.DateTimeFormat('en-US', { 
                          month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' 
                        }).format(lead.createdAt) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">
                        {lead.name || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                        {lead.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                        {lead.company || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
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
      </div>
    </main>
  );
}
