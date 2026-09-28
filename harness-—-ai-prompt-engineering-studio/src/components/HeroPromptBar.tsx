import React, { useState } from 'react';
import { 
  Sparkles, 
  Wand2, 
  SlidersHorizontal, 
  ArrowRight, 
  Terminal, 
  Check, 
  RefreshCw 
} from 'lucide-react';

interface HeroPromptBarProps {
  goal: string;
  setGoal: (g: string) => void;
  onGenerate: () => void;
  onImprove: () => void;
  onOptimize: () => void;
  isLoading: boolean;
}

const STARTER_CHIPS = [
  'Build a production-ready customer support chatbot with Shopify & order tracking',
  'Design an autonomous coding agent with MCP tool orchestration',
  'Self-correcting RAG document retrieval pipeline with source citations',
  'Async Python FastAPI microservice with Pydantic v2 and PostgreSQL',
  'Enterprise SQL analytics and query planner optimizer for Snowflake',
  'VP-level Product Requirements Document (PRD) for automated AI billing',
  'FAANG algorithmic coding interview coach with Socratic hints'
];

export const HeroPromptBar: React.FC<HeroPromptBarProps> = ({
  goal,
  setGoal,
  onGenerate,
  onImprove,
  onOptimize,
  isLoading,
}) => {
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const handleChipClick = (chipText: string) => {
    setActiveChip(chipText);
    setGoal(chipText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-center px-4 pt-4 pb-2">
      {/* ASCII-inspired Top Accent Banner */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono mb-3 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
        <span className="text-violet-400 font-bold">&gt;</span>
        <span>AI PROMPT ENGINEERING STUDIO</span>
        <span className="text-slate-500">|</span>
        <span className="text-cyan-300">15-PART BATTLE-TESTED STANDARD</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2 font-['Plus_Jakarta_Sans']">
        <span className="bg-gradient-to-r from-teal-200 via-cyan-100 to-violet-200 bg-clip-text text-transparent">
          From a rough idea to a production-ready prompt.
        </span>
      </h1>

      <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mb-6">
        Most people know what they want AI to do. The difficult part is expressing that idea clearly enough for an AI system to execute it consistently.
      </p>

      {/* Main Prompt Bar Container */}
      <div className="relative bg-[#081422]/90 rounded-2xl border border-teal-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(20,184,166,0.15)] p-2 transition-all focus-within:border-teal-400/80 focus-within:shadow-[0_0_25px_rgba(20,184,166,0.25)] text-left">
        {/* Header inside box */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800/80 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-teal-300/80 font-semibold">[ What do you want AI to create? ]</span>
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">⌘+Enter</kbd> to run
          </span>
        </div>

        {/* Textarea Input */}
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          placeholder="E.g., Build a production-ready customer support chatbot for my website that handles order tracking, sizing, and refunds with strict knowledge boundaries..."
          className="w-full bg-transparent px-3 py-3 text-slate-100 placeholder-slate-500 focus:outline-none text-sm md:text-base resize-none font-sans leading-relaxed"
        />

        {/* Core Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-1 px-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              15 Operational Axes
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-500">Zero Hallucination Perimeter</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* [ Create Prompt ] */}
            <button
              onClick={onGenerate}
              disabled={isLoading || !goal.trim()}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 hover:from-teal-400 hover:via-cyan-400 hover:to-emerald-400 text-[#050b14] font-bold text-xs md:text-sm transition-all shadow-[0_0_20px_rgba(20,184,166,0.35)] hover:shadow-[0_0_25px_rgba(20,184,166,0.55)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#050b14]" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-[#050b14]" />
                  <span>Create Prompt</span>
                </>
              )}
            </button>

            {/* [ Improve ] */}
            <button
              onClick={onImprove}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0e2238] hover:bg-[#132c49] border border-cyan-500/40 text-cyan-200 text-xs md:text-sm font-semibold transition-all hover:border-cyan-400 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              title="Critique, sharpen clarity, and add strict guardrails"
            >
              <Wand2 className="w-3.5 h-3.5 text-cyan-300" />
              <span>Improve</span>
            </button>

            {/* [ Optimize ] */}
            <button
              onClick={onOptimize}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#141b36] hover:bg-[#1a2347] border border-violet-500/40 text-violet-200 text-xs md:text-sm font-semibold transition-all hover:border-violet-400 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              title="Compress token footprint and tighten security perimeter"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-violet-300" />
              <span>Optimize</span>
            </button>
          </div>
        </div>
      </div>

      {/* Starter Quick Chips */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
        <span className="text-[11px] font-mono text-slate-500 mr-1">Starters:</span>
        {STARTER_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleChipClick(chip)}
            className={`text-[11px] font-mono px-2.5 py-1 rounded-md border transition-all cursor-pointer text-left truncate max-w-xs ${
              activeChip === chip
                ? 'bg-teal-500/20 border-teal-400 text-teal-200 shadow-[0_0_10px_rgba(20,184,166,0.2)]'
                : 'bg-[#091524]/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-teal-500/40'
            }`}
          >
            {chip.split(' ')[0]} {chip.split(' ')[1]} {chip.split(' ')[2]}...
          </button>
        ))}
      </div>
    </div>
  );
};
