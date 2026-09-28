import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Folder, 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';

interface PythonArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FILE_SNIPPETS: Record<string, { lang: string; code: string; desc: string }> = {
  'harness/app.py': {
    lang: 'python',
    desc: 'FastAPI application factory, lifespan DB initialization, and static file mounting',
    code: `"""
HARNESS — AI Prompt Engineering Studio
FastAPI Entrypoint & Application Factory
"""

import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from harness.backend.api.router import router as api_router
from harness.backend.database.database import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite or PostgreSQL tables
    await init_db()
    yield

app = FastAPI(
    title="HARNESS — AI Prompt Engineering Studio",
    description="From a rough idea to a production-ready prompt.",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("harness.app:app", host="0.0.0.0", port=8000, reload=True)`
  },
  'harness/backend/prompt_engine/engine.py': {
    lang: 'python',
    desc: 'Core 15-part prompt synthesizer, serializer (Markdown, XML, JSON), and transformer',
    code: `class PromptEngine:
    def __init__(self, provider: Optional[BaseProvider] = None):
        self.provider = provider or DemoProvider()

    async def create_prompt(self, request: PromptCreateRequest) -> PromptResponse:
        prompt_id = f"pmpt_{uuid.uuid4().hex[:10]}"
        sections = await self.provider.generate_structured_prompt(request)
        scores = QualityEvaluator.evaluate(sections)
        markdown = self.to_markdown(sections)
        
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
            tags=[request.complexity.lower(), "harness-v1"]
        )`
  },
  'harness/backend/providers/base.py': {
    lang: 'python',
    desc: 'Provider abstraction supporting Gemini, OpenAI, Anthropic, Ollama, and Demo Engine',
    code: `class BaseProvider(ABC):
    @property
    @abstractmethod
    def name(self) -> str:
        """Name of provider (e.g. 'gemini', 'demo')."""
        pass

    @property
    @abstractmethod
    def is_demo(self) -> bool:
        """True if running offline without external API keys."""
        pass

    @abstractmethod
    async def generate_structured_prompt(self, request: PromptCreateRequest) -> PromptSections:
        pass

    @abstractmethod
    async def improve_prompt(self, sections: PromptSections, feedback: str) -> PromptSections:
        pass

    @abstractmethod
    async def optimize_prompt(self, sections: PromptSections, target_metric: str) -> PromptSections:
        pass

    @abstractmethod
    async def run_test(self, request: TestRunRequest) -> TestRunResponse:
        pass`
  },
  'harness/backend/database/models.py': {
    lang: 'python',
    desc: 'Async SQLAlchemy ORM models (SQLite initially, PostgreSQL-ready)',
    code: `class PromptRecord(Base):
    __tablename__ = "prompts"

    id = Column(String(64), primary_key=True, index=True)
    goal = Column(String(512), nullable=False)
    provider = Column(String(64), default="demo")
    mode = Column(String(32), default="demo_engine")
    
    # Serialized 15-part prompt sections
    sections = Column(JSON, nullable=False)
    
    clarity_score = Column(Integer, default=90)
    specificity_score = Column(Integer, default=90)
    completeness_score = Column(Integer, default=90)
    structure_score = Column(Integer, default=90)
    overall_score = Column(Integer, default=90)
    
    full_markdown = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)`
  },
  'harness/requirements.txt': {
    lang: 'text',
    desc: 'Python dependencies for FastAPI, async SQLite, and AI SDKs',
    code: `fastapi>=0.110.0
uvicorn>=0.28.0
pydantic>=2.6.0
sqlalchemy>=2.0.28
aiosqlite>=0.20.0
google-genai>=0.1.1
openai>=1.14.0
anthropic>=0.19.0
python-dotenv>=1.0.1
httpx>=0.27.0
pytest>=8.1.0
pytest-asyncio>=0.23.5`
  }
};

export const PythonArchitectureModal: React.FC<PythonArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<string>('harness/app.py');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentSnippet = FILE_SNIPPETS[selectedFile] || FILE_SNIPPETS['harness/app.py'];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#08121f] border border-cyan-500/30 w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#050b14]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-violet-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Python + FastAPI Architecture Explorer</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  SQLite / PostgreSQL
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Inspect the native Python backend, Pydantic v2 schemas, and provider abstraction.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* File Tree Sidebar */}
          <div className="w-full md:w-64 border-r border-slate-800 bg-[#050c18] p-3 overflow-y-auto font-mono text-xs">
            <div className="text-[11px] font-bold text-teal-400 uppercase tracking-wider mb-2">
              Repository Tree
            </div>
            <div className="space-y-1">
              <div className="text-slate-400 font-semibold flex items-center gap-1.5 py-1">
                <Folder className="w-3.5 h-3.5 text-teal-400" />
                <span>harness/</span>
              </div>
              <div className="pl-4 space-y-1">
                {Object.keys(FILE_SNIPPETS).map((file) => (
                  <button
                    key={file}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-2 py-1.5 rounded-md flex items-center gap-2 transition-colors cursor-pointer text-[11px] truncate ${
                      selectedFile === file
                        ? 'bg-teal-500/20 text-teal-200 border border-teal-500/40'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <FileCode className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{file.replace('harness/', '')}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
              <div className="font-bold text-slate-300">Run Locally:</div>
              <div className="bg-[#050b14] p-2 rounded border border-slate-800 select-all font-mono text-[10px] text-teal-300">
                cd harness<br />
                pip install -r requirements.txt<br />
                uvicorn app:app --port 8000
              </div>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#060e1a]">
            {/* File info bar */}
            <div className="px-4 py-2.5 border-b border-slate-800 flex items-center justify-between bg-[#071322]">
              <div>
                <span className="text-xs font-mono font-bold text-white">
                  {selectedFile}
                </span>
                <span className="text-[11px] text-slate-400 ml-2 hidden sm:inline">
                  — {currentSnippet.desc}
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-mono transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4">
              <pre className="text-xs font-mono text-slate-200 whitespace-pre leading-relaxed select-text">
                {currentSnippet.code}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
