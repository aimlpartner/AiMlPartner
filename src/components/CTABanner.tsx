import React from 'react';
import { Link } from 'react-router-dom';

export function CTABanner() {
  return (
    <section className="py-24 bg-sky-900 border-b border-slate-200">
      <div className="container-max text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
          Not sure where AI fits in your business?
        </h2>
        <p className="text-lg text-sky-100 font-light mb-10 max-w-2xl mx-auto">
          Run a free AI operational scan in less than 30 seconds and get a prioritized roadmap.
        </p>
        <Link 
          to="/analyzer"
          className="inline-flex items-center justify-center bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-full px-8 py-4 font-semibold hover:from-sky-300 hover:to-sky-400 transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40"
        >
          Start Free AI Audit
        </Link>
      </div>
    </section>
  );
}
