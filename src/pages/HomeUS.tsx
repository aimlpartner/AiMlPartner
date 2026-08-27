import React, { useEffect } from 'react';
import { SEO } from '../components/SEO';
import { USHero } from '../components/us/USHero';
import { USTicker } from '../components/us/USTicker';
import { USWhatWeAutomatePreview } from '../components/us/USWhatWeAutomatePreview';
import { USPillars } from '../components/us/USPillars';
import { USUseCasesSection } from '../components/us/USUseCasesSection';
import { USCaseMetrics } from '../components/us/USCaseMetrics';
import { USFAQ } from '../components/us/USFAQ';
import { USIntakeCTA } from '../components/us/USIntakeCTA';

export function HomeUS() {
  // Intersection Observer for subtle scroll reveals
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.12
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#FF5500] selection:text-black">
      <SEO 
        title="Custom Enterprise AI & Automation Agents" 
        description="Stop paying humans for robot work. AIMLPartner builds custom AI agents that automate your sales, support, and operations based in Bedminster, NJ."
        url="https://aimlpartner.com/"
      />
      
      {/* 1. Hero Section (With Automated Companies Strip) */}
      <USHero />

      {/* 2. Enterprise Trust Ticker */}
      <USTicker />

      {/* 3. What We Automate - Popular SMB Automations Grid */}
      <div className="reveal">
        <USWhatWeAutomatePreview />
      </div>

      {/* 4. 3-Phase Transformation Architecture */}
      <div className="reveal">
        <USPillars />
      </div>

      {/* 5. Proven AI Use Cases Showcase (Editorial Deep-Dive) */}
      <div className="reveal">
        <USUseCasesSection />
      </div>

      {/* 6. Hard ROI Stat Counters & Case Studies ("Real businesses. Real time saved.") */}
      <div className="reveal">
        <USCaseMetrics />
      </div>

      {/* 6. Enterprise FAQs */}
      <div className="reveal">
        <USFAQ />
      </div>

      {/* 7. High-Converting Direct Intake & Booking */}
      <div className="reveal">
        <USIntakeCTA />
      </div>
    </div>
  );
}
