/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PeacockCanvas } from './components/PeacockCanvas';
import { Header } from './components/Header';
import { HeroPromptBar } from './components/HeroPromptBar';
import { CoreStudioGrid } from './components/CoreStudioGrid';
import { 
  PromptSections, 
  QualityScores, 
  ProviderType, 
  TemplateItem 
} from './types/prompt';
import { LocalPromptEngine } from './services/localEngine';
import { generatePrompt } from './services/apiClient';
import { CURATED_TEMPLATES } from './data/curatedTemplates';

export default function App() {
  // Primary input state
  const [goal, setGoal] = useState(
    'Build a production-ready customer support chatbot for my website that handles order tracking, sizing, and returns'
  );
  const [context, setContext] = useState(
    'E-commerce apparel store integrated with Shopify order API and Gorgias helpdesk'
  );
  const [audience, setAudience] = useState(
    'Online retail shoppers looking for order status, size advice, and return initiation'
  );
  const [constraints, setConstraints] = useState(
    'Never process refund amounts directly over $0 without human review. Never guess or promise out-of-stock restock dates.'
  );
  const [complexity, setComplexity] = useState('Enterprise');
  const [tone, setTone] = useState('Warm, professional, proactive, and concise');
  const [outputFormat, setOutputFormat] = useState('Structured Markdown with Hierarchical Headers');

  // AI & Engine state
  const [provider, setProvider] = useState<ProviderType>('demo');
  const [mode, setMode] = useState<'real_ai' | 'demo_engine'>('demo_engine');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Initialize with the featured Enterprise Chatbot template
  const initialTemplate = CURATED_TEMPLATES[0];
  const [sections, setSections] = useState<PromptSections>(initialTemplate.sections);
  const [scores, setScores] = useState<QualityScores>(
    LocalPromptEngine.evaluateScores(initialTemplate.sections)
  );

  // Check health and available keys on mount
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.gemini_configured) {
          setProvider('gemini');
          setMode('real_ai');
        }
      })
      .catch(() => {
        // Safe demo fallback
      });
  }, []);

  // Update scores when sections change
  useEffect(() => {
    const updatedScores = LocalPromptEngine.evaluateScores(sections);
    setScores(updatedScores);
  }, [sections]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    setIsLoading(true);
    try {
      const result = await generatePrompt({
        goal,
        context,
        audience,
        constraints,
        complexity,
        tone,
        outputFormat,
        provider,
      });

      setSections(result.sections);
      setMode(result.mode);
      showToast(
        result.mode === 'real_ai'
          ? 'Synthesized live with Gemini 3.8 Flash!'
          : 'Synthesized via THE PROMPTBUILDER Demo Engine (100% functional).'
      );
    } catch (err) {
      showToast('Error generating prompt. Using local deterministic engine.');
      const localSec = LocalPromptEngine.generateSections({
        goal,
        context,
        audience,
        constraints,
        complexity,
        tone,
        outputFormat,
      });
      setSections(localSec);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImprove = () => {
    setIsLoading(true);
    setTimeout(() => {
      const improved = LocalPromptEngine.improveSections(
        sections,
        'Sharpen instructional clarity, add explicit negative security walls, enforce token economy'
      );
      setSections(improved);
      setIsLoading(false);
      showToast('Prompt sharpened with strict security walls and clarity checks!');
    }, 400);
  };

  const handleOptimize = () => {
    setIsLoading(true);
    setTimeout(() => {
      const optimized = LocalPromptEngine.optimizeSections(sections, 'token_efficiency');
      setSections(optimized);
      setIsLoading(false);
      showToast('Optimized token economy & compressed instructional density!');
    }, 400);
  };

  const handleQuickImprove = (recommendation: string) => {
    const improved = LocalPromptEngine.improveSections(sections, recommendation);
    setSections(improved);
    showToast(`Applied refinement: "${recommendation.slice(0, 45)}..."`);
  };

  const handleSelectTemplate = (tpl: TemplateItem) => {
    setGoal(tpl.title);
    setContext(tpl.useCase);
    setComplexity(tpl.difficulty);
    setSections(tpl.sections);
    showToast(`Loaded "${tpl.title}" from Prompt Library!`);
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 flex flex-col relative selection:bg-teal-500/30 selection:text-teal-200">
      {/* Animated Peacock Particles Canvas Background */}
      <PeacockCanvas />

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#091829] border border-teal-500/50 text-teal-200 px-4 py-2.5 rounded-xl shadow-2xl text-xs font-mono flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          <span>{notification}</span>
        </div>
      )}

      {/* Studio Header */}
      <Header />

      {/* Main Studio Viewport */}
      <main className="flex-1 flex flex-col z-10">
        {/* Hero Prompt Bar */}
        <HeroPromptBar
          goal={goal}
          setGoal={setGoal}
          onGenerate={handleGenerate}
          onImprove={handleImprove}
          onOptimize={handleOptimize}
          isLoading={isLoading}
        />

        {/* 3-Column Core Grid: INPUT | PROMPT BUILDER | AI ANALYSIS */}
        <CoreStudioGrid
          goal={goal}
          setGoal={setGoal}
          context={context}
          setContext={setContext}
          audience={audience}
          setAudience={setAudience}
          constraints={constraints}
          setConstraints={setConstraints}
          complexity={complexity}
          setComplexity={setComplexity}
          tone={tone}
          setTone={setTone}
          outputFormat={outputFormat}
          setOutputFormat={setOutputFormat}
          sections={sections}
          setSections={setSections}
          scores={scores}
          provider={provider}
          mode={mode}
          onQuickImprove={handleQuickImprove}
        />
      </main>

      {/* Footer */}
      <footer className="z-10 border-t border-slate-900 bg-[#03070d]/80 py-4 px-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-teal-400 font-bold">THE PROMPTBUILDER</span>
            <span>— AI Prompt Engineering Studio</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">15-Part Production Standard</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <span>Autonomous Prompt Synthesis &amp; Quality Validation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
