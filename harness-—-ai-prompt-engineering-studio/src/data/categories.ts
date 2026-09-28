export interface CategoryConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: string[];
}

export const CATEGORIES: CategoryConfig[] = [
  {
    id: 'ai',
    name: 'AI & LLM',
    icon: 'Brain',
    description: 'Autonomous agents, RAG, MCP orchestration, and safety guardrails',
    subcategories: [
      'Chatbot',
      'AI assistant',
      'System prompts',
      'RAG',
      'MCP',
      'AI agents',
      'Multi-agent systems',
      'AI evaluation',
      'AI safety',
      'AI research'
    ]
  },
  {
    id: 'software',
    name: 'Software',
    icon: 'Code2',
    description: 'Modern full-stack, distributed backends, microservices, and DevOps',
    subcategories: [
      'Python',
      'Java',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'FastAPI',
      'APIs',
      'SQL',
      'NoSQL',
      'Docker',
      'CI/CD',
      'Cloud',
      'Debugging',
      'Code review',
      'Architecture'
    ]
  },
  {
    id: 'data',
    name: 'Data',
    icon: 'Database',
    description: 'Analytics, data warehousing, BI dashboards, and ML/CV/NLP',
    subcategories: [
      'Data analysis',
      'Excel',
      'Power BI',
      'Tableau',
      'SQL analytics',
      'Statistics',
      'Machine learning',
      'Deep learning',
      'NLP',
      'Computer vision'
    ]
  },
  {
    id: 'business',
    name: 'Business',
    icon: 'Briefcase',
    description: 'GTM strategy, market research, sales, product management, and finance',
    subcategories: [
      'Strategy',
      'Market research',
      'Marketing',
      'Sales',
      'Customer support',
      'Product management',
      'Operations',
      'Finance',
      'HR'
    ]
  },
  {
    id: 'career',
    name: 'Career',
    icon: 'Compass',
    description: 'Resume tailoring, FAANG interviews, portfolios, and career strategy',
    subcategories: [
      'Resume',
      'LinkedIn',
      'Interview preparation',
      'Coding interviews',
      'Portfolio',
      'Cover letters',
      'Career planning'
    ]
  },
  {
    id: 'education',
    name: 'Education',
    icon: 'GraduationCap',
    description: 'Socratic tutors, quiz synthesizers, lesson plans, and research reviews',
    subcategories: [
      'Tutor',
      'Quiz generation',
      'Study plans',
      'Exam preparation',
      'Research',
      'Lesson planning'
    ]
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: 'Sparkles',
    description: 'Image & video prompt crafting, narrative storytelling, and UI/UX',
    subcategories: [
      'Image generation',
      'Video generation',
      'Storytelling',
      'Branding',
      'UI/UX',
      'Presentations',
      'Social media'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: 'FileText',
    description: 'Executive emails, audit reports, meeting synthesis, and SOPs',
    subcategories: [
      'Email',
      'Reports',
      'Documentation',
      'Meeting summaries',
      'Requirements',
      'SOPs',
      'Project planning'
    ]
  }
];

export const COMPOSABLE_DOMAINS = [
  'Customer Support Chatbots',
  'RAG Document Retrieval',
  'Model Context Protocol (MCP)',
  'Autonomous Code Agents',
  'Multi-Agent Swarm Orchestration',
  'AI Evaluation & Red-Teaming',
  'Synthetic Data Generation',
  'Agent Memory & Reflection',
  'Function-Calling Pipelines',
  'AI Safety & Alignment',
  'FastAPI Microservices',
  'React & Next.js Frontends',
  'TypeScript Architecture',
  'PostgreSQL & Vector DBs',
  'Docker & Kubernetes Deployment',
  'CI/CD Pipeline Automation',
  'Distributed Systems Reliability',
  'REST & GraphQL API Design',
  'Legacy Code Refactoring',
  'Automated Security Auditing',
  'Enterprise SQL Analytics',
  'Pandas Data Wrangling',
  'Machine Learning Pipelines',
  'Power BI DAX Formulas',
  'Tableau Dashboard Architecture',
  'Time-Series Forecasting',
  'A/B Test Statistical Analysis',
  'ETL Pipeline Orchestration',
  'Computer Vision Preprocessing',
  'NLP Sentiment & Classification',
  'Product Management PRDs',
  'Go-To-Market Strategy',
  'Competitive Market Intelligence',
  'Sales Outreach Copywriting',
  'Financial Modeling & Valuation',
  'SaaS Metric Tracking (CAC/LTV)',
  'Customer Churn Mitigation',
  'HR & Talent Acquisition',
  'Supply Chain Optimization',
  'Investor Pitch Deck Synthesis',
  'Technical Resume Tailoring',
  'FAANG System Design Prep',
  'Algorithmic Interview Practice',
  'Executive LinkedIn Branding',
  'Interactive STEM Tutoring',
  'Automated Exam Generation',
  'Curriculum & Lesson Planning',
  'Academic Research Synthesis',
  'Personalized Language Acquisition',
  'Executive Briefing & SOPs'
];

export const COMPOSABLE_TASK_TYPES = [
  'Conversational Chatbot',
  'System Prompt Definition',
  'Code Generation & Architecture',
  'Code Review & Security Audit',
  'Debugging & Root Cause Analysis',
  'Document Synthesis & Summary',
  'Structured Extraction (JSON)',
  'Step-by-Step Problem Solving',
  'Adversarial Evaluation & Fuzzing',
  'Autonomous Multi-Step Execution',
  'Creative Writing & Storytelling',
  'Marketing Copy & Messaging',
  'Statistical Hypothesis Testing',
  'Data Transformation & ETL',
  'Interactive Q&A & Socratic Tutor',
  'Policy & Governance Generation',
  'Decision Matrix & Tradeoff Analysis',
  'API Spec & OpenAPI Drafting',
  'User Persona Simulation',
  'Incident Postmortem Analysis'
];

export const COMPOSABLE_ROLES = [
  'Principal AI Architect',
  'Staff Software Engineer',
  'Lead Data Scientist',
  'Senior Product Manager',
  'Autonomous MCP Agent',
  'Security Penetration Tester',
  'DevOps & Reliability Engineer',
  'Quantitative Financial Analyst',
  'Executive Communication Coach',
  'Distinguished University Professor',
  'Legal & Compliance Specialist',
  'Creative Director & Copy Chief',
  'Customer Experience Concierge',
  'Domain Ontology Engineer',
  'Adversarial Safety Evaluator'
];

export const COMPOSABLE_OUTPUT_FORMATS = [
  'Structured Markdown with Hierarchical Headers',
  'Strict JSON Schema with Typed Validation',
  'Executable Python Code with Unit Tests',
  'YAML Configuration Blueprint',
  'Tabular Markdown Matrix with Metrics',
  'Step-by-Step Executable Runbook',
  'Concise Bulleted Executive Summary (<150 words)',
  'OpenAPI 3.1 Specification (YAML/JSON)',
  'Mermaid.js Flowchart & Architecture Diagram',
  'Socratic Dialogue & Guided Prompts'
];

export const COMPOSABLE_COMPLEXITY_LEVELS = [
  'Beginner (Introductory)',
  'Foundational',
  'Intermediate',
  'Applied Professional',
  'Senior Specialist',
  'Advanced Architecture',
  'Staff/Principal',
  'Enterprise Production',
  'Mission-Critical / Fault-Tolerant',
  'Zero-Trust Military Grade'
];
