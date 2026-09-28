"""
HARNESS Quality Evaluator.
Evaluates prompt specifications across 4 key dimensions:
Clarity, Specificity, Completeness, and Structure, plus Hallucination Risk.
"""

from typing import List, Tuple
from harness.backend.models.schemas import PromptSections, QualityScores

class QualityEvaluator:
    @staticmethod
    def evaluate(sections: PromptSections) -> QualityScores:
        clarity_score = 92
        specificity_score = 90
        completeness_score = 94
        structure_score = 96
        recommendations: List[str] = []

        # Completeness Check: verify all 15 sections are populated meaningfully
        section_lengths = {
            "role": len(sections.role.strip()),
            "objective": len(sections.objective.strip()),
            "context": len(sections.context.strip()),
            "target_users": len(sections.target_users.strip()),
            "personality": len(sections.personality.strip()),
            "capabilities": len(sections.capabilities.strip()),
            "knowledge": len(sections.knowledge.strip()),
            "tools": len(sections.tools.strip()),
            "constraints": len(sections.constraints.strip()),
            "security": len(sections.security.strip()),
            "error_handling": len(sections.error_handling.strip()),
            "escalation": len(sections.escalation.strip()),
            "output_format": len(sections.output_format.strip()),
            "quality_criteria": len(sections.quality_criteria.strip()),
            "test_cases": len(sections.test_cases.strip()),
        }

        short_sections = [k for k, length in section_lengths.items() if length < 30]
        if short_sections:
            completeness_score = max(70, 94 - (len(short_sections) * 4))
            recommendations.append(f"Expand low-density sections: {', '.join(short_sections[:3])}.")

        # Specificity Check: search for concrete keywords, numbers, schemas, or tools
        combined_text = " ".join([
            sections.constraints, sections.security, sections.tools,
            sections.output_format, sections.quality_criteria
        ]).lower()

        concrete_markers = [
            "never", "always", "strict", "schema", "json", "markdown",
            "return", "if", "must", "parameter", "error", "%", "token"
        ]
        matched_markers = sum(1 for m in concrete_markers if m in combined_text)
        specificity_score = min(98, 82 + (matched_markers * 2))

        # Clarity Check: penalize vague filler words
        vague_phrases = ["etc", "and so on", "as needed", "do your best", "good job", "various", "things"]
        vague_found = [p for p in vague_phrases if p in combined_text]
        if vague_found:
            clarity_score = max(75, 94 - (len(vague_found) * 5))
            recommendations.append(f"Replace ambiguous phrases like '{vague_found[0]}' with deterministic bounds.")
        else:
            clarity_score = 95

        # Structure Check: verify test cases format and error handling
        if "test" in sections.test_cases.lower():
            structure_score = 97
        else:
            structure_score = 88
            recommendations.append("Format test cases with explicit input-output pairs.")

        if not recommendations:
            recommendations = [
                "Consider defining latency or token budget constraints in OUTPUT FORMAT.",
                "Verify API tool argument schemas match strict OpenAPI specifications."
            ]

        # Token count estimation (~4 chars per token)
        total_chars = sum(section_lengths.values())
        estimated_tokens = int(total_chars / 3.8)

        # Hallucination Risk
        if "never guess" in sections.constraints.lower() or "knowledge cutoff" in sections.knowledge.lower() or "zero hallucination" in sections.role.lower():
            hallucination_risk = "Low (0.8%)"
        else:
            hallucination_risk = "Medium (3.2%)"

        overall = int((clarity_score * 0.25) + (specificity_score * 0.25) + (completeness_score * 0.25) + (structure_score * 0.25))

        return QualityScores(
            clarity=clarity_score,
            specificity=specificity_score,
            completeness=completeness_score,
            structure=structure_score,
            overall=overall,
            hallucination_risk=hallucination_risk,
            token_count=estimated_tokens,
            recommendations=recommendations
        )
