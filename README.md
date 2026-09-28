# The Prompt Builder

A practical AI prompt engineering studio that turns rough ideas into structured, production-ready prompts.

This repository contains the HARNESS project: a web-based prompt builder that helps users define goals, context, audience, constraints, and tone, then generate a professional prompt specification with scoring, optimization, and template-based generation.

## Why this project exists

Most AI failures are not caused by weak models alone — they are caused by weak instructions.

A single vague request like:

> "Build a chatbot for my website"

forces the model to guess important details such as:

- who the user is
- what the chatbot should and should not do
- what tools it can use
- how it should handle safety issues
- how the answer should be formatted
- how success should be measured

The Prompt Builder solves this by turning fuzzy ideas into a clear 15-part prompt structure.

## What it does

- turns a rough idea into a complete prompt specification
- supports domain-specific prompt templates
- evaluates prompt quality and clarity
- allows prompt improvement and optimization
- supports demo mode and real AI providers
- provides a clean front-end studio for building prompts visually

## Main features

- Prompt generation from goal + context + audience + constraints
- 15-part production prompt architecture
- Quality scoring and evaluation
- Template library for multiple domains
- AI provider support (Gemini, OpenAI, Anthropic, and demo engine)
- Local prompt engine for offline or deterministic usage
- Fast UI built with React and TypeScript

## Project structure

```text
The-Prompt-Builder/
├── README.md
├── harness-—-ai-prompt-engineering-studio/
│   ├── index.html
│   ├── metadata.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   ├── data/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.css
│   └── harness/
│       ├── app.py
│       ├── requirements.txt
│       ├── README.md
│       ├── backend/
│       ├── prompt_library/
│       └── tests/
└── .gitignore
```

## Tech stack

- Frontend: React, TypeScript, Vite
- Styling: CSS and modern UI design
- Backend: Python, FastAPI
- AI integrations: Gemini, OpenAI, Anthropic, and demo engine
- Database: SQLite / async database layer
- Testing: Pytest

## Frontend app

The main UI is inside:

- `harness-—-ai-prompt-engineering-studio/src/App.tsx`
- `harness-—-ai-prompt-engineering-studio/src/components/`
- `harness-—-ai-prompt-engineering-studio/src/services/`

This part powers the prompt studio interface where users enter details and generate improved prompts.

## Python backend

The Python application is located under:

- `harness-—-ai-prompt-engineering-studio/harness/`

It includes:

- FastAPI app entrypoint
- prompt generation engine
- provider abstraction layer
- prompt library and templates
- evaluator logic and tests

## Quick start

### 1) Install frontend dependencies

```bash
cd "harness-—-ai-prompt-engineering-studio"
npm install
```

### 2) Run the app locally

```bash
npm run dev
```

This starts the Vite development server, usually on port 3000.

### 3) Run the Python backend (optional)

```bash
cd "harness-—-ai-prompt-engineering-studio/harness"
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app:app --reload --port 8000
```

The app can run in demo mode without API keys, or in real AI mode if provider keys are configured.

## Example workflow

1. Enter a business goal
2. Add context, audience, and constraints
3. Choose complexity and tone
4. Generate a prompt
5. Improve or optimize the output
6. Save or reuse the final prompt specification

## Typical prompt structure

The generated prompt is usually organized into sections such as:

- Role
- Objective
- Context
- Target users
- Personality
- Capabilities
- Knowledge
- Tools
- Constraints
- Security
- Error handling
- Escalation
- Output format
- Quality criteria
- Test cases

## License

This project is licensed under the Apache License 2.0.

## Summary

The Prompt Builder is designed to help people create better prompts, improve AI reliability, and reduce ambiguity in AI-powered systems. It is a practical tool for developers, product teams, researchers, and anyone who wants more consistent and higher-quality AI outputs.

If you want, I can also create a more polished version of this README with:

- a product-style landing page layout
- badges and emojis
- screenshot placeholders
- a stronger GitHub marketing description
- a separate setup guide for Windows and Linux/macOS
