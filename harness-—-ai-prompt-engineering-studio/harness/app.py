"""
HARNESS — AI Prompt Engineering Studio
FastAPI Entrypoint & Application Factory
"""

import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from harness.backend.api.router import router as api_router
from harness.backend.database.database import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite/Postgres database tables
    try:
        await init_db()
    except Exception as e:
        print(f"[HARNESS] Database init notice: {e}")
    yield

app = FastAPI(
    title="HARNESS — AI Prompt Engineering Studio",
    description="From a rough idea to a production-ready prompt. 15-part prompt architecture & 15,000+ composable templates.",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for local and web dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Router
app.include_router(api_router)

# Mount frontend static directory if exists
static_dir = os.path.join(os.path.dirname(__file__), "frontend", "static")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

@app.get("/")
async def root():
    template_path = os.path.join(os.path.dirname(__file__), "frontend", "templates", "index.html")
    if os.path.exists(template_path):
        return FileResponse(template_path)
    return {
        "brand": "HARNESS",
        "tagline": "AI Prompt Engineering Studio",
        "status": "online",
        "documentation": "/docs",
        "api_endpoints": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("harness.app:app", host="0.0.0.0", port=port, reload=True)
