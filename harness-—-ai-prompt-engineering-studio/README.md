# HARNESS — AI Prompt Engineering Studio

HARNESS isn't another chatbot.

It is a workspace for people who want to communicate with AI more effectively.

Most people know what they want AI to do. The difficult part is expressing that idea clearly enough for an AI system to execute it consistently.

HARNESS was created around that problem.

Give it an idea. Shape the requirements. Let HARNESS turn the rough thought into a structured prompt you can actually use.

---

## Why HARNESS Exists

Natural language models are capable of startling reasoning, yet the single most common reason AI systems fail in real-world software, analytics pipelines, and business workflows is **underspecified prompting**.

When a developer writes:
> *"Create a chatbot for my website."*

The model has to guess everything:
- What is its persona and tone?
- What are its strict knowledge boundaries?
- What tools or APIs can it trigger?
- When should it escalate to a human?
- How should it handle hostile jailbreak attempts?
- What exact JSON or Markdown schema must it adhere to?
- What are the explicit test criteria for evaluating its responses?

HARNESS bridges this gap by transforming vague human intents into **15-part production-grade prompt specifications** ready for system prompts, agent graphs, RAG pipelines, or autonomous tool callers.

---

## What Problem It Solves

| Without HARNESS | With HARNESS |
|---|---|
| Ambiguous 1-2 sentence prompt | 15-part structured prompt specification |
| Hallucinations and uncontrolled tool calls | Explicit constraints, knowledge walls, and fallback trees |
| Ad-hoc formatting and broken JSON parsing | Enforced output schema and edge-case handling |
| Inconsistent results across model releases | Quantified prompt clarity, specificity, and quality metrics |
| Hard-coded prompts copied from random forums | Composable template engine spanning 15,000+ domain combinations |

---

## Visual Identity & Design Philosophy

- **Peacock-inspired Palette**: Teal (`#0d9488`), Turquoise (`#06b6d4`), Emerald (`#059669`), Blue (`#2563eb`), Violet (`#7c3aed`), and Subtle Gold (`#f59e0b`).
- **Dark Premium Aesthetics**: Luminous radial and linear gradients (`#050b14`), fine micro-borders, and high contrast typography.
- **Animated AI Canvas**: Floating terms including `RAG`, `LLM`, `MCP`, `AGENT`, `VISION`, `VECTOR`, `EMBEDDING`, `PYTHON`, `SQL`, `API`, `AI`, dynamic connection lines, and mathematical code particles.
- **Iconic Logo**: Computer/laptop silhouette containing the structured prompt symbol:
  ```text
       ┌───────────────────┐
       │  > AI PROMPT_     │
       │  ███████████      │
       │  { HARNESS }      │
       └───────────────────┘
             ╲     ╱
              ╲___╱
  ```

---

## The 15-Part Prompt Architecture

Every production prompt created by HARNESS contains:

1. **ROLE** — The exact persona, seniority, technical depth, and worldview.
2. **OBJECTIVE** — The primary mission and measurable definition of success.
3. **CONTEXT** — Environmental realities, domain rules, and upstream prerequisites.
4. **TARGET USERS** — User background, skill level, and implicit assumptions.
5. **PERSONALITY** — Voice, tone, communication cadence, and attitude.
6. **CAPABILITIES** — Explicit tasks the AI is authorized to perform.
7. **KNOWLEDGE** — Canonical references, knowledge cutoffs, and verified facts.
8. **TOOLS** — Allowed function declarations, parameters, and invocation criteria.
9. **CONSTRAINTS** — Negative constraints, forbidden actions, and token boundaries.
10. **SECURITY** — Injection defenses, secret protection, and policy adherence.
11. **ERROR HANDLING** — Graceful failure modes when data is missing or corrupted.
12. **ESCALATION** — Clear thresholds for human handoff or safe termination.
13. **OUTPUT FORMAT** — Exact Markdown headers, JSON schema, or code fences.
14. **QUALITY CRITERIA** — Objective rubrics the model evaluates against itself.
15. **TEST CASES** — Standard, edge-case, and adversarial verification examples.

---

## Composable 15,000+ Template Engine

Rather than maintaining rigid, brittle static files, HARNESS uses a **5-Dimensional Combinatorial Template Matrix**:

$$\text{Total Space} = 50\text{ Domains} \times 20\text{ Task Types} \times 15\text{ Roles} \times 10\text{ Output Formats} \times 10\text{ Complexity Levels} = 150,000+\text{ prompt configurations}$$

The library covers:
- **AI & LLM**: Chatbots, AI assistants, System prompts, RAG, MCP, AI agents, Multi-agent systems, AI evaluation, AI safety, AI research
- **Software**: Python, Java, JavaScript, TypeScript, React, Next.js, FastAPI, APIs, SQL, NoSQL, Docker, CI/CD, Cloud, Debugging, Code review, Architecture
- **Data**: Data analysis, Excel, Power BI, Tableau, SQL analytics, Statistics, Machine learning, Deep learning, NLP, Computer vision
- **Business**: Strategy, Market research, Marketing, Sales, Customer support, Product management, Operations, Finance, HR
- **Career**: Resume, LinkedIn, Interview preparation, Coding interviews, Portfolio, Cover letters, Career planning
- **Education**: Tutor, Quiz generation, Study plans, Exam preparation, Research, Lesson planning
- **Creative**: Image generation, Video generation, Storytelling, Branding, UI/UX, Presentations, Social media
- **Professional**: Email, Reports, Documentation, Meeting summaries, Requirements, SOPs, Project planning

---

## AI Integrations & Provider Abstraction

HARNESS implements an open provider interface (`backend/providers/base.py`):
- **Google Gemini** (`gemini-3.8-flash` via `@google/genai`)
- **OpenAI** (`gpt-4o`, `gpt-4o-mini`)
- **Anthropic** (`claude-3-5-sonnet`)
- **Local Models** (`Ollama`, `vLLM` via standard OpenAI protocol)
- **HARNESS Demo Engine** (Built-in deterministic generator requiring zero external keys)

### Real AI Provider vs. Demo Mode

- **Real AI Provider Mode**: Active when API keys are configured (`GEMINI_API_KEY`, etc.). Requests are synthesized live by frontier LLMs using few-shot meta-prompting, real-time reflection, and deep semantic evaluation.
- **Demo Mode**: Active when running without API keys or in offline environments. It uses HARNESS's algorithmic synthesis engine, rule-based heuristics, and curated domain trees to produce complete 15-part prompts, calculated quality metrics, and deterministic responses. **No fake network calls or misleading mock indicators are used.**

---

## Quickstart (Python Setup)

```bash
cd harness
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app:app --reload --port 8000
```

---

## Final Product Positioning

**HARNESS — AI Prompt Engineering Studio**  
*From a rough idea to a production-ready prompt.*

Licensed under Apache 2.0.
