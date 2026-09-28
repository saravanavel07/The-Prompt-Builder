"""
Unit tests for the HARNESS Prompt Engine and Evaluator.
"""

import pytest
from harness.backend.models.schemas import PromptCreateRequest, PromptSections
from harness.backend.prompt_engine.engine import PromptEngine
from harness.backend.prompt_engine.composer import ComposableEngine
from harness.backend.evaluators.quality_evaluator import QualityEvaluator
from harness.backend.providers.demo_provider import DemoProvider

@pytest.mark.asyncio
async def test_demo_prompt_creation():
    engine = PromptEngine(DemoProvider())
    req = PromptCreateRequest(
        goal="Create an automated chatbot for customer support",
        context="E-commerce apparel store",
        constraints="Never process refunds over $50 without approval"
    )
    result = await engine.create_prompt(req)

    assert result.id.startswith("pmpt_")
    assert result.mode == "demo_engine"
    assert result.scores.clarity >= 80
    assert result.scores.completeness >= 80
    assert "NexusCare" in result.sections.role or "Specialist" in result.sections.role
    assert "ROLE" in result.markdown
    assert "OBJECTIVE" in result.markdown
    assert "TEST CASES" in result.markdown

def test_composable_matrix():
    total = ComposableEngine.total_combinations()
    assert total >= 150000

    tpl = ComposableEngine.synthesize_template(
        domain="FastAPI Microservices",
        task_type="Code Generation & Architecture",
        role="Principal AI Architect",
        output_format="Strict JSON Schema with Typed Validation",
        complexity="Enterprise Production"
    )

    assert tpl.category == "Software"
    assert "FastAPI Microservices" in tpl.title
    assert tpl.sections.role != ""
    assert tpl.sections.output_format != ""

def test_quality_evaluator():
    sections = PromptSections(
        role="Senior Database Engineer",
        objective="Optimize slow queries",
        context="Postgres 16 instance with 10M rows",
        target_users="Engineers",
        personality="Direct and concise",
        capabilities="Analyze query execution plans and suggest indexes",
        knowledge="PostgreSQL cost models and indexing strategies",
        tools="EXPLAIN ANALYZE",
        constraints="Never suggest full table scans",
        security="No password exposure",
        error_handling="Report syntax errors with line numbers",
        escalation="Escalate schema changes to lead DBA",
        output_format="Markdown with SQL blocks",
        quality_criteria="Cost reduction >= 50%",
        test_cases="Test 1: Input slow query -> Output optimized query plan"
    )
    scores = QualityEvaluator.evaluate(sections)
    assert scores.overall >= 85
    assert scores.hallucination_risk in ["Low (0.8%)", "Medium (3.2%)"]
