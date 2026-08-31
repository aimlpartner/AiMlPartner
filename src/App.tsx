/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { USFooter } from './components/us/USFooter';
import { useVisitorTracking } from './hooks/useVisitorTracking';

// Core Landing Pages (Eagerly imported to eliminate CLS and prevent footer flash on load)
import { HomeUS } from './pages/HomeUS';
import { Home as HomeIN } from './pages/Home';

// Secondary pages (Lazy loaded)
const UseCases = lazy(() => import('./pages/UseCases').then((module) => ({ default: module.UseCases })));
const Pricing = lazy(() => import('./pages/Pricing').then((module) => ({ default: module.Pricing })));
const AboutUs = lazy(() => import('./pages/AboutUs').then((module) => ({ default: module.AboutUs })));
const AdminDashboard = lazy(() =>
  import('./pages/AdminDashboard').then((module) => ({ default: module.AdminDashboard })),
);
const Analyzer = lazy(() =>
  import('./pages/Analyzer').then((module) => ({ default: module.Analyzer })),
);
const PartnerWaitlist = lazy(() =>
  import('./pages/PartnerWaitlist').then((module) => ({ default: module.PartnerWaitlist })),
);
const NotFound = lazy(() =>
  import('./pages/NotFound').then((module) => ({ default: module.NotFound })),
);
const Blog = lazy(() => import('./pages/Blog').then((module) => ({ default: module.Blog })));
const Careers = lazy(() => import('./pages/Careers').then((module) => ({ default: module.Careers })));
const JobDetails = lazy(() => import('./pages/JobDetails').then((module) => ({ default: module.JobDetails })));

// Services Hub & Specialized Subpages
const Services = lazy(() => import('./pages/Services').then((module) => ({ default: module.Services })));
const OperationsAutomation = lazy(() => import('./pages/services/OperationsAutomation').then((module) => ({ default: module.OperationsAutomation })));
const SalesAI = lazy(() => import('./pages/services/SalesAI').then((module) => ({ default: module.SalesAI })));
const CustomerAgents = lazy(() => import('./pages/services/CustomerAgents').then((module) => ({ default: module.CustomerAgents })));
const CustomEngineering = lazy(() => import('./pages/services/CustomEngineering').then((module) => ({ default: module.CustomEngineering })));
const WhatWeAutomate = lazy(() => import('./pages/WhatWeAutomate').then((module) => ({ default: module.WhatWeAutomate })));
const SMBSolutionDetail = lazy(() => import('./pages/SMBSolutionDetail').then((module) => ({ default: module.SMBSolutionDetail })));

export default function App() {
  const { pathname, hash } = useLocation();
  const isIN = pathname.startsWith('/in');
  const isUS = pathname === '/' || pathname.startsWith('/us');

  React.useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    if (hash) {
      // Delay slightly to let target component render on fresh route mount
      const timer = setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

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

            {/* Services Hub & Persona Subpages */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/operations-automation" element={<OperationsAutomation />} />
            <Route path="/services/sales-ai" element={<SalesAI />} />
            <Route path="/services/customer-agents" element={<CustomerAgents />} />
            <Route path="/services/custom-engineering" element={<CustomEngineering />} />
            <Route path="/low-code-pods" element={<Services />} />

            {/* Deep Tools & Shared Enterprise Pages */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/team" element={<AboutUs />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/agent-studio" element={<UseCases />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/partner-waitlist" element={<PartnerWaitlist />} />
            <Route path="/what-we-automate" element={<WhatWeAutomate />} />
            <Route path="/what-we-automate/:industryId" element={<SMBSolutionDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:id" element={<JobDetails />} />

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      
      {isIN ? <Footer /> : <USFooter />}
    </div>
  );
}
