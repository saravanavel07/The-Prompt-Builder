/**
 * Server-side Gemini API Handler for HARNESS.
 * Runs strictly in Node.js server context. Never bundled to client.
 */

import { GoogleGenAI } from '@google/genai';

let aiInstance: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

export interface PromptSectionsServer {
  role: string;
  objective: string;
  context: string;
  target_users: string;
  personality: string;
  capabilities: string;
  knowledge: string;
  tools: string;
  constraints: string;
  security: string;
  error_handling: string;
  escalation: string;
  output_format: string;
  quality_criteria: string;
  test_cases: string;
}

export async function serverGeneratePrompt(params: {
  goal: string;
  context?: string;
  audience?: string;
  constraints?: string;
  complexity?: string;
  tone?: string;
}): Promise<{ sections: PromptSectionsServer; provider: string; mode: string } | null> {
  const ai = getAiClient();
  if (!ai) return null;

  const systemInstruction = `You are THE PROMPTBUILDER, the premier AI Prompt Engineering Studio.
Transform the user's intent into a 15-part production prompt specification.
You must return valid JSON with these EXACT 15 string keys:
"role", "objective", "context", "target_users", "personality", "capabilities",
"knowledge", "tools", "constraints", "security", "error_handling", "escalation",
"output_format", "quality_criteria", "test_cases".
Do not wrap with markdown code fences. Just return pure JSON.`;

  const userPrompt = `
Goal: ${params.goal}
Context: ${params.context || 'Enterprise operational environment'}
Audience: ${params.audience || 'Target end users and operators'}
Constraints: ${params.constraints || 'Zero ungrounded hallucinations, strict perimeter compliance'}
Complexity: ${params.complexity || 'Production'}
Tone: ${params.tone || 'Authoritative, precise, empathetic'}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;
    if (!text) return null;
    const parsed = JSON.parse(text) as PromptSectionsServer;
    return {
      sections: parsed,
      provider: 'gemini-3.8-flash',
      mode: 'real_ai',
    };
  } catch (err) {
    console.error('[HARNESS Server] Gemini generation notice:', err);
    return null;
  }
}

export async function serverRunTest(params: {
  sections: PromptSectionsServer;
  userInput: string;
}): Promise<{ output: string; executionTimeMs: number; mode: string } | null> {
  const ai = getAiClient();
  if (!ai) return null;

  const start = Date.now();
  const systemInstruction = `${params.sections.role}\n\nOBJECTIVE:\n${params.sections.objective}\n\nCONSTRAINTS:\n${params.sections.constraints}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: params.userInput,
      config: {
        systemInstruction,
      },
    });

    const elapsed = Date.now() - start;
    return {
      output: response.text || 'No response returned from model.',
      executionTimeMs: elapsed,
      mode: 'real_ai',
    };
  } catch (err) {
    console.error('[HARNESS Server] Gemini test run notice:', err);
    return null;
  }
}
