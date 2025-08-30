from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .models import PatentInput, Block, BomLine, Screening, DPP
import json, uuid, os, datetime, re, requests
from bs4 import BeautifulSoup

app = FastAPI(title="PatentAlchemy API", version="0.2.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"]
)

ROOT = os.path.dirname(__file__)
DATA_DIR = os.path.join(ROOT, "data", "dpp")
os.makedirs(DATA_DIR, exist_ok=True)

# Load screening factors (kg CO2e per kg)
FACTORS_KG = {}
try:
    FACTORS_KG = json.load(open(os.path.join(ROOT, "factors_kgco2e.json"), "r"))
except Exception:
    FACTORS_KG = {}

# ---- Routes ----

@app.get("/health")
def health():
    return {"ok": True, "version": app.version}

@app.get("/sample")
def sample():
    sample_path = os.path.join(ROOT, "sample", "sample_patent.json")
    patent = json.load(open(sample_path))
    blocks = extract_blocks(patent.get("abstract",""), patent.get("claims_text",""))
    return {"patent": patent, "blocks": blocks}

@app.post("/patent/analyze")
def analyze(p: PatentInput):
    """Attempt to fetch and parse WIPO PATENTSCOPE / WIPO GREEN page.
       Fall back to heuristic analysis when content can't be fetched."""
    patent = p.model_dump()
    text_abstract, text_claims, title, ipc = "", "", None, None
    if p.source_url:
        try:
            html = fetch_html(p.source_url)
            title, text_abstract, text_claims, ipc = parse_patent_like_html(html, p.source_url)
            patent["title"] = patent.get("title") or title
            patent["abstract"] = patent.get("abstract") or text_abstract
            patent["claims_text"] = patent.get("claims_text") or text_claims
            patent["ipc"] = patent.get("ipc") or (ipc or [])
        except Exception:
            # Heuristic fallback below
            pass

    # Ensure there is content
    if not patent.get("title"):
        patent["title"] = "Eco-modular component (analyzed)"
    if not patent.get("abstract") and not patent.get("claims_text"):
        patent["abstract"] = "Eco modular connector recycled aluminium serviceable low-friction bushing node"

    blocks = extract_blocks(patent.get("abstract",""), patent.get("claims_text",""))
    return {"patent": patent, "blocks": blocks}

class BomPayload(BaseModel):
    bom: list[BomLine]

@app.post("/footprint/compute")
def compute(payload: BomPayload):
    """Compute screening footprint (kg CO2e) using per-kg factors."""
    total = 0.0
    breakdown = {}
    for line in payload.bom:
        mat = (line.material or "").lower()
        var = line.variant.lower()
        f = FACTORS_KG.get(mat, {}).get(var, None)
        if f is None:  # unknown → assume 1.0 as neutral placeholder
            f = 1.0
        score = f * float(line.mass_kg)
        key = f"{mat}:{var}"
        breakdown[key] = breakdown.get(key, 0.0) + score
        total += score
    return {"ghg_kgco2e": total, "breakdown": breakdown, "method": "Screening factors (IAI, worldsteel, PET LCA)"}

class DppPayload(BaseModel):
    product: dict
    bom: list[BomLine]
    patent: PatentInput
    screening: dict | None = None

@app.post("/dpp/mint")
def dpp_mint(payload: DppPayload, request: Request):
    dpp_id = f"demo-{uuid.uuid4().hex[:8]}"
    comp = []
    for line in payload.bom:
        rpct = 100 if line.variant == "recycled" else 0
        comp.append({"material": line.material.title(), "recycled_pct": rpct, "mass_kg": line.mass_kg})

    sustainability = {
        "ghg_kgco2e": (payload.screening or {}).get("ghg_kgco2e", 0.0),
        "method": (payload.screening or {}).get("method", "Screening factors")
    }

    events = [{
        "type": "EPCIS:ObjectEvent",
        "bizStep": "commissioning",
        "action": "ADD",
        "eventTime": datetime.datetime.utcnow().isoformat()+"Z",
        "epcList": [f"urn:epc:id:sgtin:0000000.{uuid.uuid4().int % 1000000}.{dpp_id}"]
    }]

    dpp = DPP(
        id=dpp_id,
        identifiers={"gtin":"00000000000000","serial":dpp_id.upper()},
        product={"name": payload.product.get("name","Remix Component"), "category": payload.product.get("category","demo_component")},
        composition=comp,
        sustainability=sustainability,
        repair={"method": "Allen key"},
        provenance={"source_patent_url": payload.patent.source_url, "legal_status": (payload.patent.legal_status or {}).get("type","unknown")},
        events=events
    )

    # Persist for QR deep-links
    save_dpp(dpp_id, json.loads(dpp.model_dump_json()))
    return json.loads(dpp.model_dump_json())

@app.get("/dpp/{dpp_id}")
def dpp_get(dpp_id: str):
    path = os.path.join(DATA_DIR, f"{dpp_id}.json")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="DPP not found")
    return json.load(open(path))

@app.get("/dpp/by-serial/{serial}")
def dpp_by_serial(serial: str):
    # our serial is the uppercase id; map case-insensitively
    serial = serial.lower()
    for fn in os.listdir(DATA_DIR):
        if fn.endswith(".json") and fn.replace(".json","").lower() == serial.lower():
            return json.load(open(os.path.join(DATA_DIR, fn)))
    raise HTTPException(status_code=404, detail="DPP not found")

class LintPayload(BaseModel):
    dpp: dict

@app.post("/dpp/lint")
def dpp_lint(payload: LintPayload):
    """Ultra-light checks inspired by early DPP narratives for textiles/furniture."""
    d = payload.dpp
    issues = []
    cat = (d.get("product",{}).get("category") or "").lower()
    comp = d.get("composition", [])
    if not comp:
        issues.append("Composition missing")
    if "textile" in cat or "footwear" in cat:
        # require at least one fiber/polymer material
        if not any(m["material"].lower() in ["cotton","polyester","nylon","wool","viscose","lyocell","hemp","linen","rpet","recycled polyester"] for m in comp):
            issues.append("Textiles: expected at least one fiber/polymer in composition")
    if "furniture" in cat or "component" in cat:
        if not d.get("repair",{}).get("method"):
            issues.append("Furniture: add basic repair method/tools")
    if d.get("sustainability",{}).get("ghg_kgco2e", 0) == 0:
        issues.append("Footprint zero: run screening computation")
    return {"ok": len(issues)==0, "issues": issues}

# -------- Helpers --------

def save_dpp(dpp_id: str, dpp: dict):
    with open(os.path.join(DATA_DIR, f"{dpp_id}.json"), "w") as f:
        json.dump(dpp, f, indent=2)

def fetch_html(url: str) -> str:
    headers = {"User-Agent": "Mozilla/5.0 PatentAlchemy"}
    r = requests.get(url, headers=headers, timeout=6)
    r.raise_for_status()
    return r.text

def parse_patent_like_html(html: str, url: str):
    """Very robust, selector-light parsing for WIPO pages."""
    soup = BeautifulSoup(html, "html.parser")
    # title
    t = soup.find("meta", attrs={"name":"DC.title"}) or soup.find("meta", attrs={"name":"dc.title"})
    title = (t["content"].strip() if t and t.has_attr("content") else None) or (soup.title.get_text(strip=True) if soup.title else None)

    # abstract
    abs_txt = None
    for tag in soup.find_all(["h1","h2","h3","strong","b"]):
        if tag.get_text(strip=True).lower() in ["abstract","summary","technical field"]:
            # take the next <p>
            nxt = tag.find_next(["p","div"])
            if nxt:
                abs_txt = nxt.get_text(" ", strip=True)
                break
    if not abs_txt:
        m = soup.find("meta", attrs={"name":"description"})
        abs_txt = m["content"].strip() if m and m.has_attr("content") else None

    # claims (best-effort: look for "claims" marker)
    claims_txt = None
    for tag in soup.find_all(["h1","h2","h3","strong","b"]):
        if "claim" in tag.get_text(strip=True).lower():
            buf = []
            for sib in tag.find_all_next(["p","li"]):
                txt = sib.get_text(" ", strip=True)
                if len(txt) < 6: continue
                buf.append(txt)
                if len(buf) > 10: break
            if buf:
                claims_txt = "; ".join(buf)
                break

    # IPC codes (PATENTSCOPE often exposes DC.subject or spans with IPC)
    ipc = []
    for m in soup.find_all("meta"):
        if m.get("name","").lower() in ["dc.subject","dc.subject.classification"]:
            val = m.get("content","").strip()
            if val and re.match(r"^[A-HY]\d{2}", val):
                ipc.append(val)
    if not ipc:
        for sp in soup.find_all("span"):
            tx = sp.get_text(strip=True)
            if re.match(r"^[A-HY]\d{2}", tx):
                ipc.append(tx)

    return title, (abs_txt or ""), (claims_txt or ""), list(dict.fromkeys(ipc))

def extract_blocks(abstract: str, claims: str):
    text = (abstract + " " + claims).lower()
    hints = ["connector","node","bushing","housing","slot","filter","weave","panel","hinge","beam"]
    blocks, seen = [], set()
    for h in hints:
        if h in text and h not in seen:
            seen.add(h)
            blocks.append(Block(label=f"{'recycled ' if 'recycl' in text else ''}{h}".strip(), confidence=0.78, notes="heuristic").model_dump())
    for token in re.split(r"[;,.]", claims):
        token = token.strip()
        if 3 < len(token) < 80:
            label = " ".join(token.split()[0:3])
            if label and label not in seen:
                seen.add(label)
                blocks.append(Block(label=label, confidence=0.62, notes="claims").model_dump())
    return blocks[:12]
