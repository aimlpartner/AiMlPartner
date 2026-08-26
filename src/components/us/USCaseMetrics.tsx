import React from 'react';
import { motion } from 'motion/react';

export function USCaseMetrics() {
  const cases = [
    {
      id: '01',
      name: 'Lending & Finance',
      moonImg: '/moon_titan.jpg',
      stat: '420',
      label: 'Hours Saved Weekly',
      industry: 'Financial Services',
      story: 'A local lending firm eliminated 420 hours of manual paperwork every week by automating their document verification processes.'
    },
    {
      id: '02',
      name: 'Healthcare Clinic',
      moonImg: '/moon_enceladus.jpg',
      stat: '20s',
      label: 'Patient Charting',
      industry: 'Medical Practice',
      story: 'A specialty clinic turned 45-minute patient charting sessions into 20-second automated records, completely eliminating physician burnout.'
    },
    {
      id: '03',
      name: 'Logistics Carrier',
      moonImg: '/moon_mimas.jpg',
      stat: '$3.2M',
      label: 'Annual Cost Cut',
      industry: 'Freight & Logistics',
      story: 'A freight carrier saved $3.2M in wasted fuel and time by automating route dispatching and rate negotiation across 1,400 active fleet routes.'
    }
  ];

  return (
    <section id="metrics" className="py-32 px-6 md:px-16 bg-black text-white border-b border-zinc-900 relative select-none">
      
      {/* Deep Space Background Atmosphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#FF5500]/5 rounded-full blur-[260px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* ========================================================================= */}
        {/* EDITORIAL MANIFESTO HEADER (CLEAN, LUXURY, NON-TECHY) */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-28 pb-10 border-b border-zinc-900 gap-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#FF5500] font-mono font-bold mb-4">
              PROVEN RESULTS
            </p>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.04]">
              Real businesses.{' '}
              <span className="text-[#FF5500]">Real time saved.</span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
            We measure success in hours saved and costs cut, not vanity metrics. Here are three examples of how we've helped businesses streamline their operations.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* PURE CELESTIAL MOONS SHOWCASE (ZERO CARDS, ZERO BORDERS) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 items-start">
          {cases.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center group"
            >
              {/* Floating Saturn Moon Globe (No Container, No Border) */}
              <div className="relative w-48 sm:w-56 aspect-square mb-10 flex items-center justify-center">
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 7 + idx, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={c.moonImg}
                    alt={c.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </div>

              {/* Monumental Impact Stat */}
              <div className="mb-2">
                <span className="font-display text-6xl sm:text-7xl font-extrabold text-white tracking-tight leading-none">
                  {c.stat}
                </span>
              </div>

              {/* Label & Industry */}
              <p className="font-sans text-base sm:text-lg text-[#FF5500] font-semibold mb-1">
                {c.label}
              </p>
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-6">
                {c.industry}
              </p>

              {/* Clear, Human Story */}
              <p className="font-sans text-sm text-zinc-400 leading-relaxed max-w-sm">
                {c.story}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* SECTION BOTTOM CTA */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 pt-12 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <span className="font-mono text-xs text-[#FF5500] uppercase tracking-widest font-bold block mb-2">
              ✦ QUANTIFIED RETURN // PRODUCTION OBSERVED
            </span>
            <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to eliminate your enterprise friction?
            </h4>
          </div>

          <a
            href="#intake"
            className="px-8 py-4 rounded-full bg-[#FF5500] hover:bg-[#FF6E26] text-black font-display font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-us-pop hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Scope Your AI Pod</span>
            <span className="text-sm">↗</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}

