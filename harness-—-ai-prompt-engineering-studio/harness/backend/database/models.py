"""
SQLAlchemy ORM models for storing generated prompts, templates, and evaluations.
"""

from datetime import datetime
from sqlalchemy import Column, String, Integer, Text, DateTime, JSON, Float
from harness.backend.database.database import Base

class PromptRecord(Base):
    __tablename__ = "prompts"

    id = Column(String(64), primary_key=True, index=True)
    goal = Column(String(512), nullable=False)
    provider = Column(String(64), default="demo")
    mode = Column(String(32), default="demo_engine")
    category = Column(String(128), default="General")
    complexity = Column(String(64), default="Production")
    
    # Serialized 15-part prompt sections
    sections = Column(JSON, nullable=False)
    
    # Quality metrics
    clarity_score = Column(Integer, default=90)
    specificity_score = Column(Integer, default=90)
    completeness_score = Column(Integer, default=90)
    structure_score = Column(Integer, default=90)
    overall_score = Column(Integer, default=90)
    
    token_count = Column(Integer, default=0)
    full_markdown = Column(Text, nullable=False)
    tags = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)

class TemplateRecord(Base):
    __tablename__ = "templates"

    id = Column(String(64), primary_key=True, index=True)
    category = Column(String(128), index=True)
    subcategory = Column(String(128), index=True)
    title = Column(String(256), nullable=False)
    description = Column(Text, nullable=False)
    difficulty = Column(String(64), default="Intermediate")
    use_case = Column(Text, nullable=False)
    variables = Column(JSON, default=list)
    sections = Column(JSON, nullable=False)
    expected_output = Column(Text, default="")
    tags = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)
