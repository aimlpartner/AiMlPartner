import React from 'react';
import { Team } from '../components/Team';

export function TeamPage() {
  return (
    <div className="relative min-h-screen bg-surface text-ink">
      {/* Texture Overlays */}
      <div className="grain-overlay"></div>
      <Team />
    </div>
  );
}
