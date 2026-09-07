import React from 'react';
import { TOOL_PATHS } from './toolPaths';

const aiTools = [
  { name: 'OpenAI', slug: 'openai' },
  { name: 'HuggingFace', slug: 'huggingface' },
  { name: 'Meta', slug: 'meta' },
  { name: 'Google', slug: 'google' },
  { name: 'Nvidia', slug: 'nvidia' },
  { name: 'Anthropic', slug: 'anthropic' },
  { name: 'Midjourney', slug: 'midjourney' },
  { name: 'TensorFlow', slug: 'tensorflow' },
  { name: 'PyTorch', slug: 'pytorch' },
];

const infraTools = [
  { name: 'AWS', slug: 'amazonaws' },
  { name: 'Google Cloud', slug: 'googlecloud' },
  { name: 'Microsoft Azure', slug: 'microsoftazure' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Kubernetes', slug: 'kubernetes' },
  { name: 'Vercel', slug: 'vercel' },
  { name: 'Cloudflare', slug: 'cloudflare' },
  { name: 'Supabase', slug: 'supabase' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'Redis', slug: 'redis' },
  { name: 'Python', slug: 'python' },
  { name: 'TypeScript', slug: 'typescript' },
];

// Combine and duplicate for infinite scroll effect
const row1 = [...aiTools, ...aiTools];
const row2 = [...infraTools, ...infraTools];

export function USToolsWeUse() {
  return (
    <section className="py-24 relative overflow-hidden bg-black border-y border-white/5">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FF5500]/5 rounded-[100%] blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
          Powered By <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-white">The Best</span>
        </h2>
        <p className="text-[#FF5500] font-display text-xs sm:text-sm font-semibold tracking-widest uppercase">
          Elite AI &amp; Cloud Infrastructure
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-10 overflow-hidden w-full group mask-image-fade">
        {/* Gradients to fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

        {/* Row 1: AI Tools (Left to Right) */}
        <div className="flex gap-8 items-center w-max animate-marquee-left hover:[animation-play-state:paused]">
          {row1.map((tool, idx) => (
            <div 
              key={`ai-${idx}`}
              className="flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:border-[#FF5500]/40 hover:bg-[#FF5500]/10 transition-all duration-300 hover:scale-105 group/logo p-3"
              title={tool.name}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className="w-8 h-8 sm:w-9 sm:h-9 text-zinc-400 group-hover/logo:text-white group-hover/logo:drop-shadow-[0_0_15px_rgba(255,85,0,0.6)] transition-all duration-300 shrink-0"
              >
                <path d={TOOL_PATHS[tool.slug] || ''} />
              </svg>
              <span className="text-[10px] sm:text-xs font-display font-medium text-zinc-500 group-hover/logo:text-[#FF5500] transition-colors mt-2 text-center tracking-tight truncate max-w-full">
                {tool.name}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2: Infra Tools (Right to Left) */}
        <div className="flex gap-8 items-center w-max animate-marquee-right hover:[animation-play-state:paused] -ml-24">
          {row2.map((tool, idx) => (
            <div 
              key={`infra-${idx}`}
              className="flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md hover:border-[#FF5500]/40 hover:bg-[#FF5500]/10 transition-all duration-300 hover:scale-105 group/logo p-3"
              title={tool.name}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className="w-8 h-8 sm:w-9 sm:h-9 text-zinc-400 group-hover/logo:text-white group-hover/logo:drop-shadow-[0_0_15px_rgba(255,85,0,0.6)] transition-all duration-300 shrink-0"
              >
                <path d={TOOL_PATHS[tool.slug] || ''} />
              </svg>
              <span className="text-[10px] sm:text-xs font-display font-medium text-zinc-500 group-hover/logo:text-[#FF5500] transition-colors mt-2 text-center tracking-tight truncate max-w-full">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles for custom animations since standard tailwind config doesn't have marquee by default without editing tailwind.config.js */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 40s linear infinite;
        }
      `}} />
    </section>
  );
}
