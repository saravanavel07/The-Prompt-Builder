import React, { useState } from 'react';
import { 
  CATEGORIES, 
  COMPOSABLE_DOMAINS, 
  COMPOSABLE_TASK_TYPES, 
  COMPOSABLE_ROLES, 
  COMPOSABLE_OUTPUT_FORMATS, 
  COMPOSABLE_COMPLEXITY_LEVELS 
} from '../data/categories';
import { CURATED_TEMPLATES } from '../data/curatedTemplates';
import { TemplateItem, PromptSections } from '../types/prompt';
import { 
  X, 
  Search, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Sliders, 
  Check, 
  Folder,
  Layers,
  Code
} from 'lucide-react';
import { LocalPromptEngine } from '../services/localEngine';

interface PromptLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: TemplateItem) => void;
}

export const PromptLibraryModal: React.FC<PromptLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'curated' | 'composable'>('curated');

  // Composable 5D state
  const [compDomain, setCompDomain] = useState(COMPOSABLE_DOMAINS[0]);
  const [compTask, setCompTask] = useState(COMPOSABLE_TASK_TYPES[0]);
  const [compRole, setCompRole] = useState(COMPOSABLE_ROLES[0]);
  const [compFormat, setCompFormat] = useState(COMPOSABLE_OUTPUT_FORMATS[0]);
  const [compComplexity, setCompComplexity] = useState(COMPOSABLE_COMPLEXITY_LEVELS[7]); // Enterprise

  if (!isOpen) return null;

  const filteredTemplates = CURATED_TEMPLATES.filter((tpl) => {
    const matchesCat = selectedCategory === 'All' || tpl.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleSynthesizeComposable = () => {
    const sections = LocalPromptEngine.generateSections({
      goal: `${compTask} for ${compDomain}`,
      context: `Operating in the ${compDomain} domain with ${compComplexity} constraints.`,
      audience: `Domain practitioners, technical leads, and end users.`,
      constraints: `Strict compliance with ${compFormat}. Zero ungrounded assertions.`,
      complexity: compComplexity.split(' ')[0],
      outputFormat: compFormat,
      tone: 'Authoritative, precise, objective'
    });

    // Enhance role
    sections.role = `You are a ${compRole} specializing in ${compDomain}. You execute ${compTask} with ${compComplexity} rigor.`;
    sections.output_format = `Strictly adhere to: ${compFormat}.`;

    const newTemplate: TemplateItem = {
      id: `comp_${Date.now()}`,
      category: 'Composable 5D',
      subcategory: compDomain,
      title: `${compRole} — ${compDomain}`,
      description: `Custom synthesized prompt for ${compTask} with ${compFormat}.`,
      difficulty: compComplexity.split(' ')[0],
      useCase: `Enterprise execution of ${compTask} in ${compDomain}.`,
      variables: ['domain_payload', 'runtime_config'],
      sections,
      expectedOutput: `[${compFormat} artifact fulfilling ${compTask}]`,
      tags: [compDomain.toLowerCase().split(' ')[0], 'composable', 'harness-5d']
    };

    onSelectTemplate(newTemplate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#08121f] border border-teal-500/30 w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#050b14]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>15,000+ Composable Prompt Library</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  150,000+ Permutations
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Browse production-grade blueprints or synthesize bespoke prompts across 5 dimensions.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-[#060e1a] px-4 pt-2">
          <button
            onClick={() => setActiveTab('curated')}
            className={`px-4 py-2 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'curated'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Curated Blueprints ({CURATED_TEMPLATES.length})
          </button>
          <button
            onClick={() => setActiveTab('composable')}
            className={`px-4 py-2 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'composable'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>5D Composable Matrix (150,000+ Combinations)</span>
          </button>
        </div>

        {/* TAB 1: CURATED TEMPLATES */}
        {activeTab === 'curated' && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Categories */}
            <div className="w-full md:w-56 border-r border-slate-800 bg-[#050c17] p-3 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-y-auto">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  selectedCategory === 'All'
                    ? 'bg-teal-500/20 text-teal-200 border border-teal-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                All Categories
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center justify-between ${
                    selectedCategory === cat.name
                      ? 'bg-teal-500/20 text-teal-200 border border-teal-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] text-slate-500">
                    {cat.subcategories.length}
                  </span>
                </button>
              ))}
            </div>

            {/* Template List & Search */}
            <div className="flex-1 flex flex-col overflow-hidden p-4">
              {/* Search Bar */}
              <div className="relative mb-3">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates by role, subcategory, keyword or tag..."
                  className="w-full bg-[#050b14] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-400/80 font-sans"
                />
              </div>

              {/* Template Cards */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                {filteredTemplates.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="p-3.5 rounded-xl bg-[#06101c] border border-slate-800 hover:border-teal-500/40 transition-all flex flex-col justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-teal-300">
                          {tpl.category} &gt; {tpl.subcategory}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20 font-bold">
                          {tpl.difficulty}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {tpl.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                        {tpl.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <div className="flex flex-wrap gap-1">
                        {tpl.tags.slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          onSelectTemplate(tpl);
                          onClose();
                        }}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 text-xs font-mono font-bold border border-teal-500/40 transition-colors cursor-pointer"
                      >
                        <span>Load Template</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {filteredTemplates.length === 0 && (
                  <div className="text-center py-12 text-slate-500 text-xs font-mono">
                    No templates matching your query. Try searching for "chatbot", "rag", "fastapi", or "sql".
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 5D COMPOSABLE MATRIX GENERATOR */}
        {activeTab === 'composable' && (
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="bg-[#050b14] border border-cyan-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-mono">
                  5-Dimensional Combinatorial Prompt Synthesizer
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Formula: 50 Domains × 20 Task Types × 15 Roles × 10 Output Formats × 10 Complexity Levels ={' '}
                <span className="text-cyan-300 font-bold font-mono">150,000+ configurations</span>.
                Select any coordinate to synthesize a bespoke 15-part prompt.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 1. Domain */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 font-mono">
                  1. Domain (50 options)
                </label>
                <select
                  value={compDomain}
                  onChange={(e) => setCompDomain(e.target.value)}
                  className="bg-[#050b14] border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                >
                  {COMPOSABLE_DOMAINS.map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Task Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 font-mono">
                  2. Task Type (20 options)
                </label>
                <select
                  value={compTask}
                  onChange={(e) => setCompTask(e.target.value)}
                  className="bg-[#050b14] border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                >
                  {COMPOSABLE_TASK_TYPES.map((t, i) => (
                    <option key={i} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Role */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 font-mono">
                  3. Autonomous Role (15 options)
                </label>
                <select
                  value={compRole}
                  onChange={(e) => setCompRole(e.target.value)}
                  className="bg-[#050b14] border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                >
                  {COMPOSABLE_ROLES.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Output Format */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 font-mono">
                  4. Output Format (10 options)
                </label>
                <select
                  value={compFormat}
                  onChange={(e) => setCompFormat(e.target.value)}
                  className="bg-[#050b14] border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                >
                  {COMPOSABLE_OUTPUT_FORMATS.map((f, i) => (
                    <option key={i} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Complexity Level */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 font-mono">
                  5. Complexity Level (10 options)
                </label>
                <select
                  value={compComplexity}
                  onChange={(e) => setCompComplexity(e.target.value)}
                  className="bg-[#050b14] border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                >
                  {COMPOSABLE_COMPLEXITY_LEVELS.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Synthesize Button */}
            <div className="pt-2">
              <button
                onClick={handleSynthesizeComposable}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-500 hover:from-teal-400 hover:via-cyan-400 hover:to-violet-400 text-[#050b14] font-bold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] cursor-pointer"
              >
                Synthesize &amp; Load into Prompt Studio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
