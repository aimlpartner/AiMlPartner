/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { USFooter } from './components/us/USFooter';
import { StickyCTA } from './components/StickyCTA';
import { useVisitorTracking } from './hooks/useVisitorTracking';

// Core Landing Pages (Eagerly imported to eliminate CLS and prevent footer flash on load)
import { HomeUS } from './pages/HomeUS';
import { Home as HomeIN } from './pages/Home';

// Secondary pages (Lazy loaded)
const AgentStudio = lazy(() => import('./pages/AgentStudio').then((module) => ({ default: module.AgentStudio })));
const Pricing = lazy(() => import('./pages/Pricing').then((module) => ({ default: module.Pricing })));
const LowCodePods = lazy(() => import('./pages/LowCodePods').then((module) => ({ default: module.LowCodePods })));
const TeamPage = lazy(() => import('./pages/TeamPage').then((module) => ({ default: module.TeamPage })));
const AdminDashboard = lazy(() =>
  import('./pages/AdminDashboard').then((module) => ({ default: module.AdminDashboard })),
);
const Analyzer = lazy(() =>
  import('./pages/Analyzer').then((module) => ({ default: module.Analyzer })),
);
const PartnerWaitlist = lazy(() =>
  import('./pages/PartnerWaitlist').then((module) => ({ default: module.PartnerWaitlist })),
);

export default function App() {
  const { pathname } = useLocation();
  const isIN = pathname.startsWith('/in');
  const isUS = pathname === '/' || pathname.startsWith('/us');

  React.useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  useVisitorTracking();

  return (
    <div className={`min-h-screen overflow-x-hidden font-sans flex flex-col justify-between ${
      isUS ? 'bg-black text-white selection:bg-[#FF5500] selection:text-black' : isIN ? 'bg-black text-white' : 'bg-gradient-to-br from-slate-50 to-sky-50/30 text-slate-900'
    }`}>
      <Navbar />
      
      <main className="flex-1 w-full">
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <Routes>
            {/* Flagship US-Market Landing Page (Default & /us) */}
            <Route path="/" element={<HomeUS />} />
            <Route path="/us" element={<HomeUS />} />

            {/* Preserved Indian-Market Landing Page (/in) */}
            <Route path="/in" element={<HomeIN />} />

            {/* Deep Tools & Shared Enterprise Pages */}
            <Route path="/agent-studio" element={<AgentStudio />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/low-code-pods" element={<LowCodePods />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/partner-waitlist" element={<PartnerWaitlist />} />
          </Routes>
        </Suspense>
      </main>
      
      {isIN ? <Footer /> : <USFooter />}
    </div>
  );
}
