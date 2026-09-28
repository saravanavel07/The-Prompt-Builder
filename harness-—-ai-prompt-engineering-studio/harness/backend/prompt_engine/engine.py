"""
Core Prompt Engine for HARNESS.
Orchestrates prompt generation, formatting, code generation, and quality analysis.
"""

import uuid
from datetime import datetime
from typing import Dict, Any, Optional
from harness.backend.models.schemas import (
    PromptCreateRequest,
    PromptImproveRequest,
    PromptOptimizeRequest,
    PromptResponse,
    PromptSections,
    QualityScores
)
from harness.backend.providers.base import BaseProvider
from harness.backend.providers.demo_provider import DemoProvider
from harness.backend.evaluators.quality_evaluator import QualityEvaluator

class PromptEngine:
    def __init__(self, provider: Optional[BaseProvider] = None):
        self.provider = provider or DemoProvider()

    def set_provider(self, provider: BaseProvider):
        self.provider = provider

    async def create_prompt(self, request: PromptCreateRequest) -> PromptResponse:
        prompt_id = f"pmpt_{uuid.uuid4().hex[:10]}"
        sections = await self.provider.generate_structured_prompt(request)
        scores = QualityEvaluator.evaluate(sections)
        markdown = self.to_markdown(sections)
        tags = [request.task_type.lower() if request.task_type else "prompt", "harness-v1", request.complexity.lower()]

        mode = "demo_engine" if self.provider.is_demo else "real_ai"

        return PromptResponse(
            id=prompt_id,
            goal=request.goal,
            provider=self.provider.name,
            mode=mode,
            sections=sections,
            scores=scores,
            created_at=datetime.utcnow().isoformat(),
            markdown=markdown,
            tags=tags
        )

    async def improve(self, request: PromptImproveRequest) -> PromptResponse:
        prompt_id = request.prompt_id or f"pmpt_{uuid.uuid4().hex[:10]}"
        new_sections = await self.provider.improve_prompt(request.sections, request.feedback)
        scores = QualityEvaluator.evaluate(new_sections)
        markdown = self.to_markdown(new_sections)

        mode = "demo_engine" if self.provider.is_demo else "real_ai"

        return PromptResponse(
            id=prompt_id,
            goal="Improved prompt",
            provider=self.provider.name,
            mode=mode,
            sections=new_sections,
            scores=scores,
            created_at=datetime.utcnow().isoformat(),
            markdown=markdown,
            tags=["improved", "harness-v1"]
        )

    async def optimize(self, request: PromptOptimizeRequest) -> PromptResponse:
        prompt_id = f"pmpt_{uuid.uuid4().hex[:10]}"
        new_sections = await self.provider.optimize_prompt(request.sections, request.target_metric)
        scores = QualityEvaluator.evaluate(new_sections)
        markdown = self.to_markdown(new_sections)

        mode = "demo_engine" if self.provider.is_demo else "real_ai"

        return PromptResponse(
            id=prompt_id,
            goal="Optimized prompt",
            provider=self.provider.name,
            mode=mode,
            sections=new_sections,
            scores=scores,
            created_at=datetime.utcnow().isoformat(),
            markdown=markdown,
            tags=["optimized", request.target_metric]
        )

    @staticmethod
    def to_markdown(sections: PromptSections) -> str:
        return f"""# SYSTEM PROMPT SPECIFICATION (HARNESS 15-PART STANDARD)

## 1. ROLE
{sections.role}

## 2. OBJECTIVE
{sections.objective}

## 3. CONTEXT
{sections.context}

## 4. TARGET USERS
{sections.target_users}

## 5. PERSONALITY
{sections.personality}

## 6. CAPABILITIES
{sections.capabilities}

## 7. KNOWLEDGE
{sections.knowledge}

## 8. TOOLS
{sections.tools}

## 9. CONSTRAINTS
{sections.constraints}

## 10. SECURITY
{sections.security}

## 11. ERROR HANDLING
{sections.error_handling}

## 12. ESCALATION
{sections.escalation}

## 13. OUTPUT FORMAT
{sections.output_format}

## 14. QUALITY CRITERIA
{sections.quality_criteria}

## 15. TEST CASES
{sections.test_cases}
"""

    @staticmethod
    def to_xml_tags(sections: PromptSections) -> str:
        return f"""<system_prompt>
  <role>{sections.role}</role>
  <objective>{sections.objective}</objective>
  <context>{sections.context}</context>
  <target_users>{sections.target_users}</target_users>
  <personality>{sections.personality}</personality>
  <capabilities>{sections.capabilities}</capabilities>
  <knowledge>{sections.knowledge}</knowledge>
  <tools>{sections.tools}</tools>
  <constraints>{sections.constraints}</constraints>
  <security>{sections.security}</security>
  <error_handling>{sections.error_handling}</error_handling>
  <escalation>{sections.escalation}</escalation>
  <output_format>{sections.output_format}</output_format>
  <quality_criteria>{sections.quality_criteria}</quality_criteria>
  <test_cases>{sections.test_cases}</test_cases>
</system_prompt>"""

    @staticmethod
    def to_python_snippet(sections: PromptSections) -> str:
        return f'''# Python Integration via HARNESS Prompt Spec
import os
from google import genai

SYSTEM_INSTRUCTION = """{PromptEngine.to_markdown(sections).replace('"""', '\\"\\"\\"')}"""

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="Hello, ready to execute task.",
    config={{"system_instruction": SYSTEM_INSTRUCTION}}
)

print(response.text)
'''
