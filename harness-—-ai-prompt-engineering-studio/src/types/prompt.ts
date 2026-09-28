export interface PromptSections {
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

export interface QualityScores {
  clarity: number;
  specificity: number;
  completeness: number;
  structure: number;
  overall: number;
  hallucinationRisk: string;
  tokenCount: number;
  recommendations: string[];
}

export type ProviderType = 'gemini' | 'openai' | 'anthropic' | 'ollama' | 'demo';

export interface PromptState {
  id: string;
  goal: string;
  context: string;
  audience: string;
  constraints: string;
  taskType: string;
  outputFormat: string;
  complexity: string;
  tone: string;
  provider: ProviderType;
  mode: 'real_ai' | 'demo_engine';
  sections: PromptSections;
  scores: QualityScores;
  createdAt: string;
  history: Array<{
    timestamp: string;
    action: string;
    overallScore: number;
  }>;
}

export interface TemplateItem {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  difficulty: string;
  useCase: string;
  variables: string[];
  sections: PromptSections;
  expectedOutput: string;
  tags: string[];
}

export interface ComposableMatrix {
  domains: string[];
  taskTypes: string[];
  roles: string[];
  outputFormats: string[];
  complexityLevels: string[];
}
