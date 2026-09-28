"""
FastAPI Router for HARNESS Prompt Engineering Studio.
"""

from typing import List, Optional
from fastapi import APIRouter, HTTPException, Depends
from harness.backend.models.schemas import (
    PromptCreateRequest,
    PromptImproveRequest,
    PromptOptimizeRequest,
    PromptResponse,
    PromptSections,
    QualityScores,
    TemplateItem,
    TestRunRequest,
    TestRunResponse,
    ComposableQueryParams
)
from harness.backend.prompt_engine.engine import PromptEngine
from harness.backend.prompt_engine.composer import ComposableEngine
from harness.backend.evaluators.quality_evaluator import QualityEvaluator
from harness.backend.providers.demo_provider import DemoProvider
from harness.backend.providers.gemini_provider import GeminiProvider
from harness.backend.providers.openai_provider import OpenAIProvider
from harness.prompt_library.curated_templates import CURATED_TEMPLATES

router = APIRouter(prefix="/api", tags=["HARNESS Prompt Studio"])

def get_engine(provider_name: str = "demo") -> PromptEngine:
    if provider_name == "gemini":
        return PromptEngine(GeminiProvider())
    elif provider_name == "openai":
        return PromptEngine(OpenAIProvider())
    return PromptEngine(DemoProvider())

@router.get("/health")
async def health_check():
    return {
        "status": "online",
        "service": "HARNESS — AI Prompt Engineering Studio",
        "version": "1.0.0",
        "database": "SQLite / PostgreSQL-ready",
        "mode": "Active (Demo Mode & Real AI supported)"
    }

@router.post("/prompts/generate", response_model=PromptResponse)
async def generate_prompt(request: PromptCreateRequest):
    engine = get_engine(request.provider or "demo")
    return await engine.create_prompt(request)

@router.post("/prompts/improve", response_model=PromptResponse)
async def improve_prompt(request: PromptImproveRequest):
    engine = get_engine(request.provider or "demo")
    return await engine.improve(request)

@router.post("/prompts/optimize", response_model=PromptResponse)
async def optimize_prompt(request: PromptOptimizeRequest):
    engine = get_engine(request.provider or "demo")
    return await engine.optimize(request)

@router.post("/prompts/evaluate", response_model=QualityScores)
async def evaluate_prompt(sections: PromptSections):
    return QualityEvaluator.evaluate(sections)

@router.post("/prompts/test-run", response_model=TestRunResponse)
async def test_run_prompt(request: TestRunRequest):
    provider = GeminiProvider() if request.provider == "gemini" else DemoProvider()
    return await provider.run_test(request)

@router.get("/templates", response_model=List[TemplateItem])
async def list_curated_templates(category: Optional[str] = None):
    results = []
    for item in CURATED_TEMPLATES:
        if category and item["category"].lower() != category.lower():
            continue
        results.append(TemplateItem(
            id=item["id"],
            category=item["category"],
            subcategory=item["subcategory"],
            title=item["title"],
            description=item["description"],
            difficulty=item["difficulty"],
            use_case=item["use_case"],
            variables=item["variables"],
            sections=PromptSections(**item["sections"]),
            expected_output=item["expected_output"],
            tags=item["tags"]
        ))
    return results

@router.get("/templates/composable/matrix")
async def get_composable_matrix():
    return {
        "dimensions": ComposableEngine.get_dimensions(),
        "total_combinations": ComposableEngine.total_combinations()
    }

@router.post("/templates/composable/synthesize", response_model=TemplateItem)
async def synthesize_composable_template(params: ComposableQueryParams):
    return ComposableEngine.synthesize_template(
        domain=params.domain,
        task_type=params.task_type,
        role=params.role,
        output_format=params.output_format,
        complexity=params.complexity
    )
