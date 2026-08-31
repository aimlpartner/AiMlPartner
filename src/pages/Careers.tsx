import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Briefcase, GraduationCap, Users } from 'lucide-react';
import { SEO } from '../components/SEO';

type FilterType = 'All' | 'Full-time' | 'Internship' | 'Contract';

export function Careers() {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  useEffect(() => {
    window.scrollTo(0, 0);

    const jobsQuery = query(collection(db, 'job_postings'));
    const unsubscribe = onSnapshot(jobsQuery, (snapshot) => {
      const jobsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));
      
      // Sort locally to avoid index errors
      jobsData.sort((a: any, b: any) => {
        const timeA = a.createdAt?.getTime() || 0;
        const timeB = b.createdAt?.getTime() || 0;
        return timeB - timeA; // desc
      });

      setRoles(jobsData);
      setLoading(false);
    }, (error) => {
      console.error("Firestore error in Careers:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredRoles = roles.filter(role => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Internship') return role.type === 'Internship';
    if (activeFilter === 'Contract') return role.type === 'Contract' || role.type === 'Contract-to-Hire';
    if (activeFilter === 'Full-time') return role.type === 'Full-time';
    return true;
  });

  const getIconForType = (type: string) => {
    if (type === 'Internship') return <GraduationCap size={16} />;
    if (type.includes('Contract')) return <Users size={16} />;
    return <Briefcase size={16} />;
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#FF5500] selection:text-black relative overflow-hidden">
      <SEO 
        title="Careers | AIMLPartner" 
        description="Join AIMLPartner. We are hiring senior engineers and interns to build the future of private enterprise AI."
        url="https://aimlpartner.com/careers"
      />
      
      {/* Background Hero Image */}
      <div className="absolute top-0 left-0 right-0 h-[60vh] z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{ backgroundImage: 'url("/hero_saturn.png")' }}
        />
        {/* Gradient overlays to blend smoothly into black */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5500]/10 rounded-full blur-[150px] pointer-events-none z-10" />
      </div>

      {/* Header Section */}
      <section className="pt-28 sm:pt-36 pb-8 px-6 md:px-16 max-w-7xl mx-auto relative z-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
          <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse"></span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-300">We are hiring</span>
        </div>
        
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white leading-[1.1] mb-4 drop-shadow-2xl">
          Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF5500] to-[#FF8844]">AI Frontline</span>
        </h1>
        
        <p className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto text-balance font-medium">
          Whether you're a seasoned engineer or a hungry intern, if you want to build high-impact enterprise AI systems instead of slide decks, we want you.
        </p>
      </section>

      {/* Roles & Switcher Section */}
      <section className="py-12 px-6 md:px-16 max-w-5xl mx-auto relative z-20 min-h-[50vh]">
        
        {/* The Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(['All', 'Full-time', 'Internship', 'Contract'] as FilterType[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeFilter === filter
                  ? 'bg-[#FF5500] text-black shadow-[0_0_20px_rgba(255,85,0,0.4)] scale-105'
                  : 'bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Roles List */}
        <div className="flex flex-col gap-6">
          {loading ? (
            <div className="text-zinc-400 font-mono text-sm text-center py-20 flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-[#FF5500] border-t-transparent rounded-full animate-spin"></div>
              Loading open positions...
            </div>
          ) : filteredRoles.length === 0 ? (
            <div className="text-zinc-400 font-mono text-sm text-center py-20 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
              <p className="text-xl font-bold text-white mb-2">No positions found</p>
              <p>We don't have any open {activeFilter !== 'All' ? activeFilter.toLowerCase() : ''} roles right now. Check back soon!</p>
            </div>
          ) : (
            filteredRoles.map((role, idx) => (
              <div 
                key={idx} 
                className="group relative overflow-hidden p-8 sm:p-10 bg-black border border-white/10 rounded-[2rem] hover:border-white/20 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(255,85,0,0.5)] flex flex-col md:flex-row md:items-center justify-between gap-8"
              >
                {/* Saturn Theme Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 pointer-events-none"
                  style={{ backgroundImage: 'url("/job_card_bg_saturn.jpg")' }}
                />
                {/* Minimal dark overlay to let the image shine */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-1000 pointer-events-none" />
                
                {/* Permanent Subtle Glows */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FF5500]/20 to-transparent rounded-full blur-[60px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-[60px] pointer-events-none"></div>

                {/* Dynamic corner gradient on hover */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF5500]/30 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                {/* Left accent line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-[#FF5500] to-[#FF8844] group-hover:h-1/2 transition-all duration-500 rounded-r-full"></div>
                
                <div className="max-w-2xl relative z-10 flex flex-col gap-5 pl-2 md:pl-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-md ${
                      role.type === 'Internship' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      role.type.includes('Contract') ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                      'bg-[#FF5500]/10 text-[#FF5500] border border-[#FF5500]/20'
                    }`}>
                      {getIconForType(role.type)}
                      {role.type}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 bg-white/5 px-3 py-1.5 rounded-md font-bold tracking-widest uppercase flex items-center gap-2 border border-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></span>
                      {role.location}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
                      {role.title}
                    </h3>
                    
                    <p className="font-sans text-sm md:text-base text-zinc-400 leading-relaxed line-clamp-3 group-hover:text-zinc-300 transition-colors">
                      {role.desc}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 shrink-0 mt-4 md:mt-0 pr-2 md:pr-4">
                  <Link 
                    to={`/careers/${role.id}`}
                    className="relative overflow-hidden group/btn flex items-center justify-center gap-3 w-full md:w-auto bg-white text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-transparent hover:border-[#FF5500]/30"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF5500] to-[#FF8844] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">Apply Now</span>
                    <div className="relative z-10 w-6 h-6 rounded-full bg-black/10 group-hover/btn:bg-white/20 flex items-center justify-center transition-colors duration-300">
                      <ArrowRight size={14} className="group-hover/btn:text-white transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                    </div>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
}
