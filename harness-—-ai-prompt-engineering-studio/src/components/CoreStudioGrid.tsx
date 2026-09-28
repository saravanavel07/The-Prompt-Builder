import React, { useState } from 'react';
import { 
  PromptSections, 
  QualityScores, 
  ProviderType 
} from '../types/prompt';
import { 
  Check, 
  Copy, 
  Download, 
  Edit3, 
  Eye, 
  FileCode, 
  FileText, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  AlertCircle,
  HelpCircle,
  Code2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Wand2
} from 'lucide-react';
import { LocalPromptEngine } from '../services/localEngine';
import { testRunPrompt } from '../services/apiClient';

interface CoreStudioGridProps {
  goal: string;
  setGoal: (g: string) => void;
  context: string;
  setContext: (c: string) => void;
  audience: string;
  setAudience: (a: string) => void;
  constraints: string;
  setConstraints: (c: string) => void;
  complexity: string;
  setComplexity: (c: string) => void;
  tone: string;
  setTone: (t: string) => void;
  outputFormat: string;
  setOutputFormat: (f: string) => void;
  sections: PromptSections;
  setSections: (s: PromptSections) => void;
  scores: QualityScores;
  provider: ProviderType;
  mode: 'real_ai' | 'demo_engine';
  onQuickImprove: (feedback: string) => void;
}

type TabType = 'structured' | 'markdown' | 'xml' | 'json' | 'python';

export const CoreStudioGrid: React.FC<CoreStudioGridProps> = ({
  goal,
  setGoal,
  context,
  setContext,
  audience,
  setAudience,
  constraints,
  setConstraints,
  complexity,
  setComplexity,
  tone,
  setTone,
  outputFormat,
  setOutputFormat,
  sections,
  setSections,
  scores,
  provider,
  mode,
  onQuickImprove,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('structured');
  const [copied, setCopied] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Test Runner state
  const [testInput, setTestInput] = useState('Where is my order #10842? Can you expedite it?');
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testMeta, setTestMeta] = useState<{ time: number; mode: string } | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format: 'markdown' | 'python') => {
    let content = '';
    let filename = '';
    if (format === 'markdown') {
      content = LocalPromptEngine.toMarkdown(sections);
      filename = 'promptbuilder_system_prompt.md';
    } else {
      content = LocalPromptEngine.toPythonCode(sections);
      filename = 'promptbuilder_prompt_runner.py';
    }
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRunTest = async () => {
    if (!testInput.trim()) return;
    setIsTesting(true);
    setTestOutput(null);
    try {
      const result = await testRunPrompt({
        sections,
        userInput: testInput,
        provider,
      });
      setTestOutput(result.output);
      setTestMeta({ time: result.executionTimeMs, mode: result.mode });
    } catch (err) {
      setTestOutput('Error executing test runner.');
    } finally {
      setIsTesting(false);
    }
  };

  const updateSectionKey = (key: keyof PromptSections, value: string) => {
    setSections({
      ...sections,
      [key]: value,
    });
  };

  const sectionKeys: Array<{ key: keyof PromptSections; label: string; badge: string }> = [
    { key: 'role', label: '1. ROLE', badge: 'Identity' },
    { key: 'objective', label: '2. OBJECTIVE', badge: 'Mission' },
    { key: 'context', label: '3. CONTEXT', badge: 'Domain' },
    { key: 'target_users', label: '4. TARGET USERS', badge: 'Audience' },
    { key: 'personality', label: '5. PERSONALITY', badge: 'Tone' },
    { key: 'capabilities', label: '6. CAPABILITIES', badge: 'Skills' },
    { key: 'knowledge', label: '7. KNOWLEDGE', badge: 'Ground Truth' },
    { key: 'tools', label: '8. TOOLS', badge: 'API & Functions' },
    { key: 'constraints', label: '9. CONSTRAINTS', badge: 'Negative Limits' },
    { key: 'security', label: '10. SECURITY', badge: 'Safety & Injections' },
    { key: 'error_handling', label: '11. ERROR HANDLING', badge: 'Fallbacks' },
    { key: 'escalation', label: '12. ESCALATION', badge: 'Human Handoff' },
    { key: 'output_format', label: '13. OUTPUT FORMAT', badge: 'Schema' },
    { key: 'quality_criteria', label: '14. QUALITY CRITERIA', badge: 'Rubric' },
    { key: 'test_cases', label: '15. TEST CASES', badge: 'Verification' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      {/* 3-Column Core Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ================= COLUMN 1: INPUT ================= */}
        <div className="lg:col-span-3 bg-[#08121f]/90 rounded-2xl border border-teal-500/25 shadow-xl p-4 flex flex-col gap-4 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]" />
              <h2 className="font-bold text-sm text-slate-100 tracking-wider font-mono">
                [ 1. INPUT ]
              </h2>
            </div>
            <span className="text-[11px] text-teal-400/80 font-mono">Parameters</span>
          </div>

          {/* Goal */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300 font-mono flex items-center justify-between">
              <span>Primary Goal</span>
              <span className="text-[10px] text-teal-400">Core intent</span>
            </label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows={2}
              className="bg-[#050b14] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-400 transition-colors font-sans"
              placeholder="What do you want AI to create?"
            />
          </div>

          {/* Context */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300 font-mono flex items-center justify-between">
              <span>Context & Environment</span>
              <span className="text-[10px] text-slate-500">Domain</span>
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={2}
              className="bg-[#050b14] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-400 transition-colors font-sans"
              placeholder="System environment, data sources, constraints..."
            />
          </div>

          {/* Audience */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300 font-mono flex items-center justify-between">
              <span>Target Audience</span>
              <span className="text-[10px] text-slate-500">Users</span>
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="bg-[#050b14] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-teal-400 transition-colors font-sans"
              placeholder="E.g. Retail shoppers, staff engineers"
            />
          </div>

          {/* Constraints */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300 font-mono flex items-center justify-between">
              <span>Negative Constraints</span>
              <span className="text-[10px] text-rose-400">Strict walls</span>
            </label>
            <textarea
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              rows={2}
              className="bg-[#050b14] border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-400 transition-colors font-sans"
              placeholder="Never hallucinate, never refund without human approval..."
            />
          </div>

          {/* Complexity Level */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300 font-mono">
              Complexity Level
            </label>
            <select
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
              className="bg-[#050b14] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-teal-400 cursor-pointer font-mono"
            >
              <option value="Beginner">Beginner (Foundational)</option>
              <option value="Intermediate">Intermediate (Professional)</option>
              <option value="Advanced">Advanced (High-scale)</option>
              <option value="Enterprise">Enterprise (Production / Mission-Critical)</option>
            </select>
          </div>

          {/* Persona / Tone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300 font-mono">
              Tone & Voice
            </label>
            <input
              type="text"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="bg-[#050b14] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-teal-400 font-sans"
              placeholder="Objective, authoritative, empathetic, concise"
            />
          </div>

          {/* Output Format */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300 font-mono">
              Output Format Target
            </label>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className="bg-[#050b14] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-teal-400 cursor-pointer font-mono"
            >
              <option value="Structured Markdown with Hierarchical Headers">Structured Markdown</option>
              <option value="Strict JSON Schema with Typed Validation">Strict JSON Schema</option>
              <option value="Executable Python Code with Unit Tests">Executable Python Code</option>
              <option value="OpenAPI 3.1 Specification (YAML/JSON)">OpenAPI 3.1 Specification</option>
              <option value="Mermaid.js Flowchart & Architecture Diagram">Mermaid.js Diagram</option>
            </select>
          </div>
        </div>

        {/* ================= COLUMN 2: PROMPT BUILDER ================= */}
        <div className="lg:col-span-6 bg-[#081422]/90 rounded-2xl border border-teal-500/30 shadow-xl p-4 flex flex-col gap-4 backdrop-blur-md min-h-[680px]">
          {/* Top Bar with Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
              <h2 className="font-bold text-sm text-slate-100 tracking-wider font-mono">
                [ 2. PROMPT BUILDER ]
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 font-semibold">
                15 Sections
              </span>
            </div>

            {/* Quick Actions: Copy, Download, Code */}
            <div className="flex items-center gap-1.5 ml-auto">
              <button
                onClick={() => handleCopy(LocalPromptEngine.toMarkdown(sections))}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-mono transition-colors"
                title="Copy entire markdown prompt"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={() => handleDownload('markdown')}
                className="p-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                title="Download prompt markdown (.md)"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDownload('python')}
                className="p-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-violet-300 text-xs transition-colors"
                title="Download Python client script (.py)"
              >
                <FileCode className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* View Modes Tabs */}
          <div className="flex items-center gap-1 bg-[#050b14] p-1 rounded-xl border border-slate-800/80 text-xs font-mono">
            <button
              onClick={() => setActiveTab('structured')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
                activeTab === 'structured'
                  ? 'bg-teal-500/20 text-teal-200 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Structured (15 Axes)
            </button>
            <button
              onClick={() => setActiveTab('markdown')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
                activeTab === 'markdown'
                  ? 'bg-teal-500/20 text-teal-200 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Markdown
            </button>
            <button
              onClick={() => setActiveTab('xml')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
                activeTab === 'xml'
                  ? 'bg-teal-500/20 text-teal-200 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              XML Tags
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
                activeTab === 'json'
                  ? 'bg-teal-500/20 text-teal-200 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              JSON
            </button>
            <button
              onClick={() => setActiveTab('python')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all ${
                activeTab === 'python'
                  ? 'bg-teal-500/20 text-teal-200 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Python Code
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="flex-1 overflow-y-auto max-h-[620px] pr-1 scrollbar-thin">
            {/* 1. Structured Cards */}
            {activeTab === 'structured' && (
              <div className="flex flex-col gap-2.5">
                {sectionKeys.map(({ key, label, badge }) => {
                  const isExpanded = expandedSection === key || !expandedSection;
                  const value = sections[key] || '';
                  return (
                    <div
                      key={key}
                      className="bg-[#050c18] border border-slate-800/90 hover:border-teal-500/30 rounded-xl p-3 transition-colors text-left"
                    >
                      <div
                        className="flex items-center justify-between cursor-pointer select-none mb-1.5"
                        onClick={() =>
                          setExpandedSection(expandedSection === key ? null : key)
                        }
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-teal-300">
                            {label}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60">
                            {badge}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(value);
                            }}
                            className="text-slate-500 hover:text-teal-300 p-0.5 text-[11px]"
                            title="Copy section"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <textarea
                          value={value}
                          onChange={(e) => updateSectionKey(key, e.target.value)}
                          rows={Math.min(6, Math.max(2, Math.ceil(value.length / 85)))}
                          className="w-full bg-[#081220] border border-slate-800/80 rounded-lg p-2 text-xs text-slate-200 font-sans focus:outline-none focus:border-teal-400/80 transition-colors leading-relaxed resize-y"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. Markdown View */}
            {activeTab === 'markdown' && (
              <pre className="p-3 bg-[#050b14] border border-slate-800 rounded-xl text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed select-text">
                {LocalPromptEngine.toMarkdown(sections)}
              </pre>
            )}

            {/* 3. XML Tags View */}
            {activeTab === 'xml' && (
              <pre className="p-3 bg-[#050b14] border border-slate-800 rounded-xl text-xs font-mono text-cyan-200 overflow-x-auto whitespace-pre-wrap leading-relaxed select-text">
                {LocalPromptEngine.toXml(sections)}
              </pre>
            )}

            {/* 4. JSON Schema View */}
            {activeTab === 'json' && (
              <pre className="p-3 bg-[#050b14] border border-slate-800 rounded-xl text-xs font-mono text-violet-200 overflow-x-auto whitespace-pre-wrap leading-relaxed select-text">
                {JSON.stringify(sections, null, 2)}
              </pre>
            )}

            {/* 5. Python Integration View */}
            {activeTab === 'python' && (
              <pre className="p-3 bg-[#050b14] border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed select-text">
                {LocalPromptEngine.toPythonCode(sections)}
              </pre>
            )}
          </div>
        </div>

        {/* ================= COLUMN 3: AI ANALYSIS ================= */}
        <div className="lg:col-span-3 bg-[#08121f]/90 rounded-2xl border border-teal-500/25 shadow-xl p-4 flex flex-col gap-4 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa]" />
              <h2 className="font-bold text-sm text-slate-100 tracking-wider font-mono">
                [ 3. AI ANALYSIS ]
              </h2>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-bold">
              {scores.overall} / 100
            </span>
          </div>

          {/* Metric Gauges */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Clarity */}
            <div className="bg-[#050b14] border border-slate-800/90 rounded-xl p-2.5 flex flex-col gap-1">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>Clarity</span>
                <span className="text-teal-400 font-bold">{scores.clarity}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${scores.clarity}%` }}
                />
              </div>
            </div>

            {/* Specificity */}
            <div className="bg-[#050b14] border border-slate-800/90 rounded-xl p-2.5 flex flex-col gap-1">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>Specificity</span>
                <span className="text-cyan-400 font-bold">{scores.specificity}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-500"
                  style={{ width: `${scores.specificity}%` }}
                />
              </div>
            </div>

            {/* Completeness */}
            <div className="bg-[#050b14] border border-slate-800/90 rounded-xl p-2.5 flex flex-col gap-1">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>Completeness</span>
                <span className="text-violet-400 font-bold">{scores.completeness}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-violet-400 transition-all duration-500"
                  style={{ width: `${scores.completeness}%` }}
                />
              </div>
            </div>

            {/* Structure */}
            <div className="bg-[#050b14] border border-slate-800/90 rounded-xl p-2.5 flex flex-col gap-1">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>Structure</span>
                <span className="text-amber-400 font-bold">{scores.structure}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${scores.structure}%` }}
                />
              </div>
            </div>
          </div>

          {/* Hallucination Risk & Token Gauge */}
          <div className="bg-[#050b14] border border-slate-800 rounded-xl p-3 flex flex-col gap-2 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Hallucination Risk:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {scores.hallucinationRisk}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-1.5">
              <span className="text-slate-400">Estimated Tokens:</span>
              <span className="text-cyan-300 font-bold">~{scores.tokenCount}</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-1.5">
              <span className="text-slate-400">Est. Latency:</span>
              <span className="text-slate-300 font-semibold">&lt; 1.4s (p90)</span>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Recommendations
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {scores.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="bg-[#050b14] border border-slate-800/90 rounded-lg p-2 text-[11px] text-slate-300 flex items-start justify-between gap-2"
                >
                  <span className="leading-snug">{rec}</span>
                  <button
                    onClick={() => onQuickImprove(rec)}
                    className="flex-shrink-0 text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Test Runner Sandbox */}
          <div className="bg-[#050b14] border border-teal-500/30 rounded-xl p-3 flex flex-col gap-2.5 mt-auto">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-teal-300 flex items-center gap-1.5">
                <Play className="w-3 h-3 text-teal-400 fill-teal-400" />
                Test Sandbox
              </span>
              <span className="text-[10px] text-teal-400/90 font-semibold">
                Interactive Test Sandbox
              </span>
            </div>

            <textarea
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              rows={2}
              placeholder="Enter sample user input to test prompt behavior..."
              className="w-full bg-[#081220] border border-slate-800 rounded-lg p-2 text-xs text-slate-200 font-sans focus:outline-none focus:border-teal-400/80"
            />

            <button
              onClick={handleRunTest}
              disabled={isTesting || !testInput.trim()}
              className="w-full py-1.5 rounded-lg bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 border border-teal-500/40 text-teal-200 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isTesting ? 'Running Execution...' : 'Run Prompt Test'}
            </button>

            {testOutput && (
              <div className="mt-1 p-2 bg-[#091524] border border-slate-800 rounded-lg text-xs font-mono text-slate-200 max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                <div className="text-[10px] text-teal-400 font-semibold mb-1 flex justify-between">
                  <span>Execution Result ({testMeta?.time || 350}ms)</span>
                  <span className="text-emerald-400">● Validated</span>
                </div>
                {testOutput}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
