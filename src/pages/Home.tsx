import React from 'react';
import { AnalyzerHero } from '../components/AnalyzerHero';
import { TechStackMarquee } from '../components/TechStackMarquee';
import { ProblemSolution } from '../components/ProblemSolution';
import { Offerings } from '../components/Offerings';
import { AgentShowcase } from '../components/AgentShowcase';
import { AgentCategories } from '../components/AgentCategories';
import { Proof } from '../components/Proof';
import { HowWeWork } from '../components/HowWeWork';
import { LeadMagnets } from '../components/LeadMagnets';
import { DistributionTeaser } from '../components/DistributionTeaser';
import { CTABanner } from '../components/CTABanner';

export function Home() {
  return (
    <main>
      <AnalyzerHero />
      <TechStackMarquee />
      <ProblemSolution />
      <Offerings />
      <AgentShowcase />
      <AgentCategories />
      <Proof />
      <HowWeWork />
      <LeadMagnets />
      <DistributionTeaser />
      <CTABanner />
    </main>
  );
}
