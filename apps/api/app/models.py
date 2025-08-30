from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class PatentInput(BaseModel):
    source_url: Optional[str] = None
    title: Optional[str] = None
    abstract: Optional[str] = None
    claims_text: Optional[str] = None
    ipc: Optional[List[str]] = None
    legal_status: Optional[Dict[str, Any]] = None

class Block(BaseModel):
    label: str
    confidence: float
    notes: Optional[str] = None

class BomLine(BaseModel):
    block: str
    material: str
    variant: str  # "virgin" | "recycled"
    mass_kg: float
    unit_cost: Optional[float] = None

class Screening(BaseModel):
    ghg_index: float
    breakdown: Dict[str, float]

class DPP(BaseModel):
    id: str
    identifiers: Dict[str, str]
    product: Dict[str, str]
    composition: List[Dict[str, Any]]
    sustainability: Dict[str, Any]
    repair: Optional[Dict[str, Any]] = None
    provenance: Dict[str, Any]
    events: List[Dict[str, Any]]
