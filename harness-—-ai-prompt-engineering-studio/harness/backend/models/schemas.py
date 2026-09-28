"""
Pydantic schemas for the HARNESS Prompt Engineering Studio.
"""

from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field

class PromptSections(BaseModel):
    role: str = Field(..., description="Identity, seniority, perspective, and worldview")
    objective: str = Field(..., description="Primary mission and success condition")
    context: str = Field(..., description="Domain environment, prerequisites, and operational bounds")
    target_users: str = Field(..., description="Audience background, expectations, and expertise level")
    personality: str = Field(..., description="Tone, voice, mannerisms, and communication cadence")
    capabilities: str = Field(..., description="Explicit tasks and operations permitted")
    knowledge: str = Field(..., description="Core ground-truth references and knowledge limits")
    tools: str = Field(..., description="Function declarations, API schemas, and tool use rules")
    constraints: str = Field(..., description="Negative constraints, forbidden actions, and perimeter limits")
    security: str = Field(..., description="Prompt injection defenses, confidential data handling")
    error_handling: str = Field(..., description="Fallback pathways, clarification routines, and recovery logic")
    escalation: str = Field(..., description="Handoff criteria, supervisor flags, and safe termination")
    output_format: str = Field(..., description="Exact structural specification (Markdown, JSON, schema)")
    quality_criteria: str = Field(..., description="Deterministic rubrics for response self-evaluation")
    test_cases: str = Field(..., description="Concrete inputs and expected outputs for benchmarking")

class QualityScores(BaseModel):
    clarity: int = Field(..., ge=0, le=100, description="Clarity and ambiguity reduction")
    specificity: int = Field(..., ge=0, le=100, description="Precision of task requirements")
    completeness: int = Field(..., ge=0, le=100, description="Coverage across all 15 operational axes")
    structure: int = Field(..., ge=0, le=100, description="Schema cohesion and modular segmentation")
    overall: int = Field(..., ge=0, le=100, description="Weighted composite prompt score")
    hallucination_risk: str = Field("Low", description="Risk assessment: Low, Medium, High")
    token_count: int = Field(0, description="Estimated prompt token consumption")
    recommendations: List[str] = Field(default_factory=list, description="Actionable refinement suggestions")

class PromptCreateRequest(BaseModel):
    goal: str = Field(..., description="The main intent or user request")
    context: Optional[str] = Field("", description="Domain or business background")
    audience: Optional[str] = Field("General / Technical", description="Target users")
    constraints: Optional[str] = Field("", description="Strict prohibitions or boundaries")
    task_type: Optional[str] = Field("Chatbot", description="Taxonomic task type")
    output_format: Optional[str] = Field("Structured Markdown", description="Desired format")
    complexity: Optional[str] = Field("Production", description="Complexity level")
    tone: Optional[str] = Field("Professional, precise", description="Desired personality")
    provider: Optional[str] = Field("demo", description="AI Provider to use")
    variables: Optional[Dict[str, str]] = Field(default_factory=dict, description="Dynamic template variables")

class PromptImproveRequest(BaseModel):
    prompt_id: Optional[str] = None
    sections: PromptSections
    feedback: Optional[str] = Field("Sharpen clarity, add strict guardrails, reduce verbosity", description="Improvement direction")
    provider: Optional[str] = "demo"

class PromptOptimizeRequest(BaseModel):
    sections: PromptSections
    target_metric: Optional[str] = Field("token_efficiency", description="token_efficiency | safety_hardening | reasoning_depth")
    provider: Optional[str] = "demo"

class PromptEvaluationResult(BaseModel):
    scores: QualityScores
    strengths: List[str]
    weaknesses: List[str]
    suggested_edits: Dict[str, str]

class PromptResponse(BaseModel):
    id: str
    goal: str
    provider: str
    mode: str  # "real_ai" | "demo_engine"
    sections: PromptSections
    scores: QualityScores
    created_at: str
    markdown: str
    tags: List[str]

class TemplateItem(BaseModel):
    id: str
    category: str
    subcategory: str
    title: str
    description: str
    difficulty: str
    use_case: str
    variables: List[str]
    sections: PromptSections
    expected_output: str
    tags: List[str]

class ComposableQueryParams(BaseModel):
    domain: str
    task_type: str
    role: str
    output_format: str
    complexity: str

class TestRunRequest(BaseModel):
    prompt_sections: PromptSections
    user_test_input: str
    provider: Optional[str] = "demo"

class TestRunResponse(BaseModel):
    model_output: str
    execution_time_ms: int
    tokens_used: int
    guardrails_passed: bool
    evaluation_notes: str
