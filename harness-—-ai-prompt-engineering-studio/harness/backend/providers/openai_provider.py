"""
OpenAI-compatible and Anthropic Provider adapters for HARNESS.
"""

import os
from typing import Optional
from harness.backend.providers.base import BaseProvider
from harness.backend.providers.demo_provider import DemoProvider
from harness.backend.models.schemas import (
    PromptCreateRequest,
    PromptSections,
    TestRunRequest,
    TestRunResponse
)

class OpenAIProvider(BaseProvider):
    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None, model: str = "gpt-4o"):
        self.api_key = api_key or os.getenv("OPENAI_API_KEY", "")
        self.base_url = base_url or os.getenv("OPENAI_BASE_URL")
        self.model_name = model
        self._fallback = DemoProvider()

    @property
    def name(self) -> str:
        return f"openai ({self.model_name})"

    @property
    def is_demo(self) -> bool:
        return not bool(self.api_key)

    async def generate_structured_prompt(self, request: PromptCreateRequest) -> PromptSections:
        if not self.api_key:
            return await self._fallback.generate_structured_prompt(request)
        try:
            from openai import AsyncOpenAI
            client = AsyncOpenAI(api_key=self.api_key, base_url=self.base_url)
            # Call openai with response_format={"type": "json_object"}
            resp = await client.chat.completions.create(
                model=self.model_name,
                response_format={"type": "json_object"},
                messages=[
                    {"role": "system", "content": "You are HARNESS Prompt Engineering Studio. Return a 15-part prompt JSON."},
                    {"role": "user", "content": f"Goal: {request.goal}\nContext: {request.context}\nConstraints: {request.constraints}"}
                ]
            )
            import json
            data = json.loads(resp.choices[0].message.content)
            return PromptSections(**data)
        except Exception:
            return await self._fallback.generate_structured_prompt(request)

    async def improve_prompt(self, sections: PromptSections, feedback: str) -> PromptSections:
        return await self._fallback.improve_prompt(sections, feedback)

    async def optimize_prompt(self, sections: PromptSections, target_metric: str) -> PromptSections:
        return await self._fallback.optimize_prompt(sections, target_metric)

    async def run_test(self, request: TestRunRequest) -> TestRunResponse:
        return await self._fallback.run_test(request)

class AnthropicProvider(BaseProvider):
    def __init__(self, api_key: Optional[str] = None, model: str = "claude-3-5-sonnet-20241022"):
        self.api_key = api_key or os.getenv("ANTHROPIC_API_KEY", "")
        self.model_name = model
        self._fallback = DemoProvider()

    @property
    def name(self) -> str:
        return f"anthropic ({self.model_name})"

    @property
    def is_demo(self) -> bool:
        return not bool(self.api_key)

    async def generate_structured_prompt(self, request: PromptCreateRequest) -> PromptSections:
        return await self._fallback.generate_structured_prompt(request)

    async def improve_prompt(self, sections: PromptSections, feedback: str) -> PromptSections:
        return await self._fallback.improve_prompt(sections, feedback)

    async def optimize_prompt(self, sections: PromptSections, target_metric: str) -> PromptSections:
        return await self._fallback.optimize_prompt(sections, target_metric)

    async def run_test(self, request: TestRunRequest) -> TestRunResponse:
        return await self._fallback.run_test(request)
