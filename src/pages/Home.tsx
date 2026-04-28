import React from 'react';
import { Hero } from '../components/Hero';
import { TechStackMarquee } from '../components/TechStackMarquee';
import { ProblemSolution } from '../components/ProblemSolution';
import { Offerings } from '../components/Offerings';
import { Proof } from '../components/Proof';
import { HowWeWork } from '../components/HowWeWork';
import { MessagingTable } from '../components/MessagingTable';
import { LeadMagnets } from '../components/LeadMagnets';
import { DistributionTeaser } from '../components/DistributionTeaser';

export function Home() {
  return (
    <main>
      <Hero />
      <TechStackMarquee />
      <ProblemSolution />
      <Offerings />
      <Proof />
      <HowWeWork />
      <MessagingTable />
      <LeadMagnets />
      <DistributionTeaser />
    </main>
  );
}
