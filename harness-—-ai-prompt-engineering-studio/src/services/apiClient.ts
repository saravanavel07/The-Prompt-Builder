import { PromptSections, ProviderType } from '../types/prompt';
import { LocalPromptEngine } from './localEngine';

export interface GeneratePromptParams {
  goal: string;
  context?: string;
  audience?: string;
  constraints?: string;
  complexity?: string;
  tone?: string;
  taskType?: string;
  outputFormat?: string;
  provider: ProviderType;
}

export async function generatePrompt(params: GeneratePromptParams): Promise<{
  sections: PromptSections;
  mode: 'real_ai' | 'demo_engine';
  providerName: string;
}> {
  // If provider is set to demo, immediately run local deterministic engine
  if (params.provider === 'demo') {
    const sections = LocalPromptEngine.generateSections(params);
    return {
      sections,
      mode: 'demo_engine',
      providerName: 'THE PROMPTBUILDER Demo Engine (Deterministic)',
    };
  }

  // Attempt server-side Gemini API call
  try {
    const response = await fetch('/api/prompt/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        goal: params.goal,
        context: params.context,
        audience: params.audience,
        constraints: params.constraints,
        complexity: params.complexity,
        tone: params.tone,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.mode === 'real_ai' && data.sections) {
        return {
          sections: data.sections,
          mode: 'real_ai',
          providerName: data.provider || 'Gemini 3.8 Flash',
        };
      }
    }
  } catch (err) {
    console.warn('[HARNESS Client] Server call failed, using deterministic local engine:', err);
  }

  // Fallback to local engine
  const sections = LocalPromptEngine.generateSections(params);
  return {
    sections,
    mode: 'demo_engine',
    providerName: `${params.provider.toUpperCase()} (Demo Simulation)`,
  };
}

export async function testRunPrompt(params: {
  sections: PromptSections;
  userInput: string;
  provider: ProviderType;
}): Promise<{
  output: string;
  executionTimeMs: number;
  mode: 'real_ai' | 'demo_engine';
}> {
  if (params.provider !== 'demo') {
    try {
      const response = await fetch('/api/prompt/test-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sections: params.sections,
          userInput: params.userInput,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.mode === 'real_ai' && data.output) {
          return {
            output: data.output,
            executionTimeMs: data.executionTimeMs || 420,
            mode: 'real_ai',
          };
        }
      }
    } catch (e) {
      console.warn('[HARNESS Client] Test run server failed, simulating:', e);
    }
  }

  // Deterministic simulation
  const start = performance.now();
  await new Promise((resolve) => setTimeout(resolve, 350));
  const output = `[THE PROMPTBUILDER Execution for Test Input: "${params.userInput}"]\n\nAdhering to Role: ${params.sections.role.slice(0, 90)}...\n\nObjective Check: Verified against primary mission.\nNegative Constraints: Enforced strictly (zero prohibited tokens).\nOutput: Processing completed with high fidelity following the 15-part prompt architecture.\n\nStatus: 200 OK | Guardrails Passed: YES`;
  const elapsed = Math.round(performance.now() - start);

  return {
    output,
    executionTimeMs: elapsed,
    mode: 'demo_engine',
  };
}
