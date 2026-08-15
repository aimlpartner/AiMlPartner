import React from 'react';

export function USTicker() {
  const stacks = [
    'CLAUDE 3.7 SONNET',
    'OPENAI O3 & GPT-4O',
    'DEEPSEEK R1',
    'LLAMA 3.3 70B',
    'VLLM & TENSORRT-LLM',
    'AWS BEDROCK',
    'AZURE AI FOUNDRY',
    'LANGGRAPH & CREWAI',
    'PINECONE & QDRANT',
    'ENTERPRISE AGENTFORCE'
  ];

  return (
    <div className="w-full bg-black border-y border-zinc-900 py-3.5 overflow-hidden select-none">
      <div className="flex items-center">
        {/* Repeating Marquee */}
        <div className="flex shrink-0 items-center gap-8 animate-marquee">
          {stacks.map((item, index) => (
            <div key={`m1-${index}`} className="flex items-center gap-8">
              <span className="font-mono text-xs font-semibold tracking-widest text-zinc-400 hover:text-white transition-colors uppercase">
                {item}
              </span>
              <span className="text-[#FF5500] font-bold text-xs">/</span>
            </div>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-8 animate-marquee" aria-hidden="true">
          {stacks.map((item, index) => (
            <div key={`m2-${index}`} className="flex items-center gap-8">
              <span className="font-mono text-xs font-semibold tracking-widest text-zinc-400 hover:text-white transition-colors uppercase">
                {item}
              </span>
              <span className="text-[#FF5500] font-bold text-xs">/</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
