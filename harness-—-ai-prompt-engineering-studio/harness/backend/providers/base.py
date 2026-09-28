"""
Base Abstract Provider Interface for HARNESS.
Any model integration (Gemini, OpenAI, Anthropic, Ollama, Demo) implements this.
"""

from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from harness.backend.models.schemas import (
    PromptCreateRequest,
    PromptSections,
    QualityScores,
    TestRunRequest,
    TestRunResponse
)

class BaseProvider(ABC):
    @property
    @abstractmethod
    def name(self) -> str:
        """Name of provider (e.g., 'gemini', 'openai', 'anthropic', 'demo')."""
        pass

    @property
    @abstractmethod
    def is_demo(self) -> bool:
        """Returns True if this provider is running offline without external API keys."""
        pass

    @abstractmethod
    async def generate_structured_prompt(self, request: PromptCreateRequest) -> PromptSections:
        """Transform raw user request into a complete 15-part prompt specification."""
        pass

    @abstractmethod
    async def improve_prompt(self, sections: PromptSections, feedback: str) -> PromptSections:
        """Refine existing prompt sections according to critique and feedback."""
        pass

    @abstractmethod
    async def optimize_prompt(self, sections: PromptSections, target_metric: str) -> PromptSections:
        """Optimize token efficiency, security perimeter, or reasoning chains."""
        pass

    @abstractmethod
    async def run_test(self, request: TestRunRequest) -> TestRunResponse:
        """Execute a sample test run against the generated prompt."""
        pass
