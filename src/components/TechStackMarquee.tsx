import React from 'react';
import { motion } from 'motion/react';

export function TechStackMarquee() {
  const tools = [
    { name: "Google AI Studio", logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" },
    { name: "OpenAI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
    { name: "Anthropic", logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg" },
    { name: "n8n", logo: "https://n8n.io/favicon.ico" },
    { name: "LangChain", logo: "https://js.langchain.com/v0.2/img/favicon.ico" },
    { name: "CrewAI", logo: "https://docs.crewai.com/favicon.ico" },
    { name: "Supabase", logo: "https://supabase.com/favicon/favicon-196x196.png" }
  ];

  // Duplicate for seamless scroll
  const marqueeTools = [...tools, ...tools, ...tools];

  return (
    <section className="py-12 bg-slate-900 border-y border-slate-800 overflow-hidden">
      <div className="container-max mb-8 text-center">
        <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          Built with enterprise-grade tools
        </h3>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex whitespace-nowrap items-center gap-16 px-8"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20
          }}
        >
          {marqueeTools.map((tool, i) => (
            <div key={i} className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
              <img src={tool.logo} alt={tool.name} className="w-6 h-6 object-contain" />
              <span className="text-slate-300 font-medium tracking-tight text-lg">{tool.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
