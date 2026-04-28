/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuizModal } from './components/QuizModal';
import { StickyCTA } from './components/StickyCTA';
import { ExitIntentPopup } from './components/ExitIntentPopup';
import { useVisitorTracking } from './hooks/useVisitorTracking';

// Pages
import { Home } from './pages/Home';
import { AgentStudio } from './pages/AgentStudio';
import { AgentShop } from './pages/AgentShop';
import { LowCodePods } from './pages/LowCodePods';
import { AgentforceServices } from './pages/AgentforceServices';
import { TeamPage } from './pages/TeamPage';
import { EventsPage } from './pages/EventsPage';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  useVisitorTracking();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50/30 font-sans text-slate-900 selection:bg-slate-200 selection:text-slate-900">
      <Navbar />
      
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
      
      <Footer />
      
      {/* Modals and Overlays */}
      <QuizModal />
      <StickyCTA />
      <ExitIntentPopup />
    </div>
  );
}
