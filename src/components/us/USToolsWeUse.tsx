import React from 'react';

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
        <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase">
          Elite AI & Cloud Infrastructure
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
              className="flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-md hover:border-[#FF5500]/30 hover:bg-[#FF5500]/5 transition-all duration-300 hover:scale-110 group/logo"
            >
              <img 
                src={`https://cdn.simpleicons.org/${tool.slug}/white`} 
                alt={tool.name} 
                className="w-10 h-10 sm:w-12 sm:h-12 opacity-60 group-hover/logo:opacity-100 group-hover/logo:drop-shadow-[0_0_15px_rgba(255,85,0,0.5)] transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Row 2: Infra Tools (Right to Left) */}
        <div className="flex gap-8 items-center w-max animate-marquee-right hover:[animation-play-state:paused] -ml-24">
          {row2.map((tool, idx) => (
            <div 
              key={`infra-${idx}`}
              className="flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-md hover:border-[#FF5500]/30 hover:bg-[#FF5500]/5 transition-all duration-300 hover:scale-110 group/logo"
            >
              <img 
                src={`https://cdn.simpleicons.org/${tool.slug}/white`} 
                alt={tool.name} 
                className="w-10 h-10 sm:w-12 sm:h-12 opacity-60 group-hover/logo:opacity-100 group-hover/logo:drop-shadow-[0_0_15px_rgba(255,85,0,0.5)] transition-all duration-300"
                loading="lazy"
              />
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
