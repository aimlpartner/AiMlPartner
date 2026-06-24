/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StickyCTA } from './components/StickyCTA';
import { useVisitorTracking } from './hooks/useVisitorTracking';

// Pages
const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const AgentStudio = lazy(() => import('./pages/AgentStudio').then((module) => ({ default: module.AgentStudio })));
const AgentShop = lazy(() => import('./pages/AgentShop').then((module) => ({ default: module.AgentShop })));
const LowCodePods = lazy(() => import('./pages/LowCodePods').then((module) => ({ default: module.LowCodePods })));
const AgentforceServices = lazy(() =>
  import('./pages/AgentforceServices').then((module) => ({ default: module.AgentforceServices })),
);
const TeamPage = lazy(() => import('./pages/TeamPage').then((module) => ({ default: module.TeamPage })));
const EventsPage = lazy(() => import('./pages/EventsPage').then((module) => ({ default: module.EventsPage })));
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

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useVisitorTracking();

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 to-sky-50/30 font-sans text-slate-900 selection:bg-slate-200 selection:text-slate-900">
      <Navbar />
      
      <Suspense fallback={<div className="px-6 py-16 text-center text-slate-500">Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agent-studio" element={<AgentStudio />} />
          <Route path="/agent-shop" element={<AgentShop />} />
          <Route path="/low-code-pods" element={<LowCodePods />} />
          <Route path="/agentforce-services" element={<AgentforceServices />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/partner-waitlist" element={<PartnerWaitlist />} />
        </Routes>
      </Suspense>
      
      <Footer />
      
      {/* Modals and Overlays */}
      <StickyCTA />
    </div>
  );
}
