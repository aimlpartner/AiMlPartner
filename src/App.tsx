/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuizModal } from './components/QuizModal';
import { StickyCTA } from './components/StickyCTA';
import { ExitIntentPopup } from './components/ExitIntentPopup';
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

export default function App() {
  useVisitorTracking();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50/30 font-sans text-slate-900 selection:bg-slate-200 selection:text-slate-900">
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
        </Routes>
      </Suspense>
      
      <Footer />
      
      {/* Modals and Overlays */}
      <QuizModal />
      <StickyCTA />
      <ExitIntentPopup />
    </div>
  );
}
