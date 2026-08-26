import React, { useEffect } from 'react';
import { SEO } from '../components/SEO';
import { USHero } from '../components/us/USHero';
import { USTicker } from '../components/us/USTicker';
import { USPillars } from '../components/us/USPillars';
import { USSimulatorSection } from '../components/us/USSimulatorSection';
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
      
      {/* 1. Hero Section */}
      <USHero />

      {/* 2. Enterprise Trust Ticker */}
      <USTicker />

      {/* 3. 3-Phase Transformation Architecture */}
      <div className="reveal">
        <USPillars />
      </div>

      {/* 4. Live Interactive Simulator & Opportunity Scan */}
      <div className="reveal">
        <USSimulatorSection />
      </div>

      {/* 5. Hard ROI Stat Counters & Case Studies */}
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
