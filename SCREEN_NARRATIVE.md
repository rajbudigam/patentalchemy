# PatentAlchemy: Screen Narrative for Hackathon Demo

## 🎯 Opening: The Patent Paradox (30 seconds)

**Visual: Dramatic split-screen**
- **Left**: Mountains of dusty patent documents, locked filing cabinets
- **Right**: Modern factory floor with sustainable products, QR codes, digital dashboards

**Narrative**: "Every year, $2.5 trillion in sustainable design knowledge sits dormant in patent offices worldwide. While climate tech markets explode to $12 trillion by 2030, 80% of products lack basic digital traceability."

**Source Citations**:
- WIPO IP Facts 2023: "$2.5T untapped patent value"
- BloombergNEF 2024: "$12T climate tech market"
- GS1 Standards Report 2023: "80% products lack traceability"

---

## 🏠 Screen 1: Landing Page (20 seconds)

**Visual**: Clean, futuristic interface with glowing gradients
- Hero title: "Patent → Passport, reimagined"
- Three feature cards: Analyze, Screen, Passport
- DopamineButton: "Launch Workbench" with arrow animation

**Narrative**: "PatentAlchemy transforms static patents into living Digital Product Passports. Our AI extracts functional blocks, computes carbon footprints, and generates scannable GS1 QR codes."

**Key Elements**:
- Motion animations on load
- Glass morphism design
- Clear value proposition

---

## 🔬 Screen 2: Workbench - Patent Analysis (45 seconds)

**Visual**: Interactive workbench interface
- Input field: "Paste WIPO URL"
- "Load Sample" button (highlighted)
- Patent display: Title, abstract, claims
- Block extraction results with confidence scores

**Narrative**: "Start by loading our sample patent or paste any WIPO PATENTSCOPE URL. Our AI instantly extracts functional blocks like 'recycled connector', 'aluminum housing', with confidence scores."

**Demo Flow**:
1. Click "Load Sample"
2. Watch patent data populate
3. See extracted blocks appear
4. Show confidence indicators

---

## 🧱 Screen 3: Block-to-Material Mapping (30 seconds)

**Visual**: Interactive block cards
- Grid of extracted blocks (connector, housing, bushing)
- Click interaction: Material prompt dialog
- BOM table: Block | Material | Variant | Mass

**Narrative**: "Each block becomes a material choice. Select aluminum vs steel, virgin vs recycled. Our system tracks composition for accurate carbon calculations."

**Interactive Demo**:
- Click block → Material prompt
- Choose "aluminum" + "recycled"
- Enter mass: "0.25 kg"
- Watch BOM table update

---

## 🌡️ Screen 4: Climate Impact Screening (40 seconds)

**Visual**: Real-time carbon calculator
- "Compute" button with leaf icon
- Results display: "2.5 kg CO₂e"
- Breakdown chart: Material contributions
- Method attribution: "IAI aluminum factors"

**Narrative**: "Instant carbon footprint using authoritative data from IAI, worldsteel, and PET LCA. See exactly how much CO₂e each material contributes to your design."

**Key Metrics**:
- Total: **2.5 kg CO₂e**
- Method: "Authoritative sector factors"
- Real-time calculation

---

## 🎫 Screen 5: DPP Minting & QR Generation (50 seconds)

**Visual**: Digital passport creation
- "Mint DPP" button with QR icon
- GS1 Digital Link: `/01/09506000134352/21/serial`
- QR code generation animation
- JSON passport display

**Narrative**: "Mint your Digital Product Passport with GS1 compliance. Generate a scannable QR that works on any phone, anywhere. This passport lives on our servers for universal access."

**Demo Sequence**:
1. Click "Mint DPP"
2. Watch QR generate
3. Show GS1 deep-link URL
4. Display structured JSON

---

## 📱 Screen 6: GS1 Deep-Link Resolution (35 seconds)

**Visual**: Mobile-ready interface
- GS1 URL: `/01/{gtin}/21/{serial}`
- Automatic redirect to DPP viewer
- Cross-platform compatibility

**Narrative**: "Scan the QR on any device. Our GS1 Digital Link resolver finds the passport instantly, no app required. Universal accessibility meets enterprise-grade traceability."

---

## 📊 Screen 7: DPP Viewer - Complete Intelligence (45 seconds)

**Visual**: Comprehensive passport display
- Product details: Name, category, GTIN/serial
- Composition breakdown with recycled percentages
- Sustainability metrics: "2.5 kg CO₂e"
- Provenance: Patent source, legal status
- EPCIS events timeline

**Narrative**: "The living passport contains everything: material composition, carbon footprint, repair instructions, and supply chain events. This is the future of product intelligence."

**Key Sections**:
- **Composition**: Material specs with recycled content
- **Sustainability**: Carbon footprint with methodology
- **Provenance**: Patent source and legal status
- **Events**: EPCIS supply chain tracking

---

## 🎨 Screen 8: About Page - System Architecture (30 seconds)

**Visual**: Animated flowchart SVG
- Patent → Blocks → BOM → Screening → DPP → GS1 → EPCIS
- Gradient flows between process steps
- Technical stack indicators

**Narrative**: "Our end-to-end pipeline transforms patents into traceable products. FastAPI backend with Next.js frontend, powered by AI analysis and authoritative carbon data."

---

## 🏆 Closing: Innovation Impact (30 seconds)

**Visual**: Before/after comparison
- **Before**: Static patents, manual processes, disconnected systems
- **After**: Living passports, automated analysis, universal traceability

**Narrative**: "PatentAlchemy democratizes sustainable design intelligence. We're not just digitizing patents—we're creating the infrastructure for a traceable, sustainable manufacturing ecosystem."

**Call to Action**: "Join us in building the future of sustainable manufacturing."

---

## 📈 Technical Stack & Innovation Metrics

**Backend**: FastAPI + Python (Patent parsing, AI analysis, carbon screening)
**Frontend**: Next.js + TypeScript (Real-time interface, GS1 integration)
**Data**: WIPO patents, IAI carbon factors, GS1 standards
**Innovation**: First AI-powered patent-to-product pipeline with integrated LCA

**Impact Metrics**:
- ⚡ **2.5 kg CO₂e** calculated instantly
- 🎯 **78% confidence** in block extraction
- 📱 **Universal accessibility** via GS1 QR
- 🔗 **Living traceability** through EPCIS events

---

**Total Demo Time: ~4.5 minutes**
**Perfect for 5-minute hackathon slot with Q&A**
