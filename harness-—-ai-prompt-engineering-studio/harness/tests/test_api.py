"""
Integration tests for HARNESS FastAPI endpoints.
"""

import pytest
from httpx import AsyncClient, ASGITransport
from harness.app import app

@pytest.mark.asyncio
async def test_health_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["service"] == "HARNESS — AI Prompt Engineering Studio"

@pytest.mark.asyncio
async def test_generate_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/api/prompts/generate", json={
            "goal": "Build an intelligent SQL query optimizer",
            "context": "PostgreSQL data warehouse",
            "constraints": "Zero table scans allowed",
            "complexity": "Enterprise",
            "provider": "demo"
        })
    assert response.status_code == 200
    data = response.json()
    assert "sections" in data
    assert "role" in data["sections"]
    assert "scores" in data
    assert data["scores"]["clarity"] > 80

@pytest.mark.asyncio
async def test_templates_endpoint():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/templates")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 5
