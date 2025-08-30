# PatentAlchemy 

> **Patent → Passport**: Transform public patents into living Digital Product Passports with AI-powered analysis, climate impact screening, and GS1 deep-linking.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.112+-green.svg)](https://fastapi.tiangolo.com/)

##  Vision

PatentAlchemy bridges the gap between **patent knowledge** and **sustainable manufacturing** by transforming static patent documents into **living Digital Product Passports (DPPs)** that encode complete product intelligence including:

- **Functional design blocks** extracted from patent claims
- **Material composition** with recycled content tracking
- **Climate impact screening** (kg CO₂e) using authoritative factors
- **GS1 Digital Links** for universal QR accessibility
- **EPCIS event chains** for supply chain transparency

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution Overview](#-solution-overview)
- [Key Innovations](#-key-innovations)
- [Technical Architecture](#-technical-architecture)
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Research & Citations](#-research--citations)
- [Contributing](#-contributing)
- [License](#-license)

##  Problem Statement

### The Patent Paradox in Sustainable Manufacturing

**The Challenge**: Public patents contain trillions of dollars in sustainable design knowledge, yet this intellectual property remains largely inaccessible to manufacturers and designers. Key issues include:

1. **Static Documents**: Patents exist as PDF/text documents, not structured data
2. **Discovery Gap**: No systematic way to find sustainable design patterns
3. **Implementation Barrier**: Hard to extract functional blocks and material specs
4. **Climate Blindness**: No integrated carbon footprint assessment
5. **Traceability Void**: No living product intelligence beyond manufacturing

##  Solution Overview

PatentAlchemy provides an end-to-end pipeline that transforms patents into actionable, traceable products:

```
Patent Document → AI Analysis → Functional Blocks → BOM Assembly → CO₂e Screening → DPP Minting → GS1 QR → EPCIS Events
```

### Core Workflow

1. **Patent Ingestion**: Parse WIPO PATENTSCOPE or WIPO GREEN documents
2. **Block Extraction**: Use NLP + heuristics to identify functional components
3. **BOM Assembly**: Map blocks to materials with virgin/recycled variants
4. **Climate Screening**: Calculate kg CO₂e using IAI, worldsteel, and PET LCA factors
5. **DPP Minting**: Create structured Digital Product Passports
6. **GS1 Integration**: Generate scannable QR codes with deep-linking
7. **EPCIS Events**: Track product lifecycle with electronic pedigree

##  Key Innovations

### 1. **Patent-to-Product Intelligence Pipeline**
**Novelty**: First system to extract structured manufacturing intelligence from patent text using AI.

- **Multi-modal Analysis**: Combines abstract, claims, and IPC classification
- **Heuristic Block Detection**: Identifies connectors, housings, bushings, etc.
- **Confidence Scoring**: Ranks extraction accuracy for quality control

### 2. **Integrated LCA Screening**
**Novelty**: Embeds authoritative carbon factors directly into the design workflow.

- **Real-time CO₂e Calculation**: Instant footprint assessment during design
- **Multi-source Factors**: IAI aluminum, worldsteel, PET LCA data
- **Breakdown Transparency**: Shows contribution by material and variant

### 3. **Living Digital Product Passports**
**Novelty**: DPPs that evolve with product lifecycle and enable universal discovery.

- **GS1 Digital Link Integration**: `/01/{gtin}/21/{serial}` deep-linking
- **Server-side Persistence**: DPPs stored for QR accessibility
- **EPCIS Event Chains**: Complete supply chain traceability

### 4. **Sustainable Design Intelligence**
**Novelty**: Makes patent-based sustainable design patterns discoverable and implementable.

- **Recycled Content Tracking**: Automated virgin/recycled material classification
- **Repair Method Encoding**: Documents serviceability requirements
- **Legal Status Integration**: Links to patent pledge programs

##  Technical Architecture

### Backend (FastAPI + Python)

```python
# Core Components
├── Patent Analysis Engine
│   ├── WIPO Parser (BeautifulSoup4)
│   ├── Block Extractor (NLP + Regex)
│   └── IPC Classifier
├── Screening Calculator
│   ├── Material Factors Database
│   └── CO₂e Computation Engine
├── DPP Minting Service
│   ├── GS1 Identifier Generation
│   ├── EPCIS Event Creation
│   └── JSON Schema Validation
└── Persistence Layer
    └── DPP Storage (JSON files)
```

### Frontend (Next.js + TypeScript)

```typescript
// User Interface Flow
├── Patent Input Interface
│   ├── URL Parser
│   └── Manual Entry Forms
├── Block Visualization
│   ├── Confidence Indicators
│   └── Material Mapping
├── BOM Assembly Tools
│   ├── Material Selector
│   └── Mass Calculator
├── Screening Dashboard
│   ├── CO₂e Visualization
│   └── Factor Attribution
├── DPP Minting Interface
│   ├── QR Code Generator
│   └── GS1 Link Creator
└── Deep-link Resolver
    └── GS1 Route Handler
```

### Data Flow Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Patent Input  │ -> │  AI Analysis    │ -> │ Block Extraction│
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
┌─────────────────┐    ┌─────────────────┐             │
│ BOM Assembly    │ <- │ Material Mapping│ <- ─ ─ ─ ─ ─┘
└─────────────────┘    └─────────────────┘
         │
         v
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│CO₂e Screening   │ -> │   DPP Minting   │ -> │  GS1 QR Code   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

##  Features

### 🔍 Patent Analysis
- **WIPO Integration**: Parse PATENTSCOPE and WIPO GREEN documents
- **Multi-format Support**: HTML, PDF, and structured text
- **IPC Classification**: Automatic patent class identification
- **Legal Status Tracking**: Integration with patent pledge programs

###  Block Extraction
- **Functional Decomposition**: Extract connectors, housings, bushings
- **Confidence Scoring**: Quality metrics for extracted blocks
- **Material Hints**: Recycled content detection from patent text
- **Claims Processing**: Structured analysis of patent claims

###  BOM Assembly
- **Material Mapping**: Link blocks to specific materials
- **Variant Selection**: Virgin vs recycled material options
- **Mass Calculation**: Weight-based composition tracking
- **Cost Estimation**: Optional unit cost integration

###  Climate Screening
- **Authoritative Factors**: IAI, worldsteel, PET LCA data
- **Real-time Calculation**: Instant CO₂e feedback
- **Breakdown Analysis**: Per-material impact attribution
- **Method Transparency**: Source documentation

###  DPP Minting
- **GS1 Compliance**: Proper identifier structure
- **EPCIS Events**: Supply chain event tracking
- **Repair Documentation**: Serviceability information
- **Provenance Tracking**: Patent source attribution

###  GS1 Integration
- **Digital Link Generation**: `/01/{gtin}/21/{serial}` format
- **QR Code Creation**: Scannable product identifiers
- **Deep-link Resolution**: Mobile-friendly access
- **Cross-platform Compatibility**: Works on any QR scanner

##  Installation

### Prerequisites
- **Python 3.11+**
- **Node.js 18+**
- **Docker** (optional, for containerized deployment)

### Backend Setup

```bash
cd apps/api
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend Setup

```bash
cd apps/web
npm install
npm run dev
```

### Docker Deployment

```bash
docker compose up -d
```

##  Usage

### Basic Workflow

1. **Load Sample Patent**
   ```typescript
   const response = await fetch('/api/sample');
   const { patent, blocks } = await response.json();
   ```

2. **Analyze Custom Patent**
   ```typescript
   const analysis = await fetch('/api/patent/analyze', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ source_url: 'https://patent-url.com' })
   });
   ```

3. **Assemble BOM**
   ```typescript
   const bom = [
     { block: 'connector', material: 'aluminum', variant: 'recycled', mass_kg: 0.25 }
   ];
   ```

4. **Calculate Footprint**
   ```typescript
   const screening = await fetch('/api/footprint/compute', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ bom })
   });
   ```

5. **Mint DPP**
   ```typescript
   const dpp = await fetch('/api/dpp/mint', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ product, bom, patent, screening })
   });
   ```

##  API Reference

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/sample` | GET | Load sample patent data |
| `/api/patent/analyze` | POST | Analyze patent from URL |
| `/api/footprint/compute` | POST | Calculate CO₂e screening |
| `/api/dpp/mint` | POST | Create Digital Product Passport |
| `/api/dpp/lint` | POST | Validate DPP completeness |
| `/api/dpp/{id}` | GET | Retrieve DPP by ID |
| `/api/dpp/by-serial/{serial}` | GET | Retrieve DPP by serial number |

### Data Models

#### Patent Input
```typescript
{
  source_url?: string;
  title?: string;
  abstract?: string;
  claims_text?: string;
  ipc?: string[];
  legal_status?: { type: string; evidence_url?: string };
}
```

#### DPP Structure
```typescript
{
  id: string;
  identifiers: { gtin: string; serial: string };
  product: { name: string; category: string };
  composition: Array<{ material: string; recycled_pct: number; mass_kg: number }>;
  sustainability: { ghg_kgco2e: number; method: string };
  repair?: { method?: string };
  provenance: { source_patent_url?: string; legal_status?: string };
  events: Array<any>;
}
```

### Research and references

These are representative sources for the problem framing and market context:
- Business and Sustainable Development Commission. Better Business, Better World (2017). Report on economic opportunities from meeting the Sustainable Development Goals.
https://betterbusinessbetterworld.report/
- WIPO. WIPO IP Facts and Figures 2023. Context on patents and their economic significance.
https://www.wipo.int/publications/en/details.jsp?id=4807
- BloombergNEF. Climate Tech Investment Trends 2024. Overview of capital flows and market sizing for climate technologies.
https://about.bnef.com/blog/climate-tech-investment-trends-2024/
- GS1. Digital Link and EPCIS standards. Practical reference for identifiers, deep links and event tracking.
https://www.gs1.org/standards/digital-link
https://www.gs1.org/standards/epcis
- International Aluminium Institute (IAI). LCA data and guidance for aluminum production.
https://international-aluminium.org/
- World Steel Association. Steel LCA and sustainability data.
https://www.worldsteel.org/steel-stories/steel-lca-data.html

### Technical Standards

- **GS1 Digital Link**: Universal product identification and linking - [GS1.org](https://www.gs1.org/standards/digital-link)
- **EPCIS**: Electronic Product Code Information Services for supply chain events - [EPCIS Standard](https://www.gs1.org/standards/epcis)
- **Digital Product Passport**: EU Battery Regulation and emerging standards - [European Commission](https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives/13626-Digital-product-passport-for-sustainable-and-circular-economy_en)

### Carbon Footprint Data Sources

- **International Aluminium Institute (IAI)**: Primary aluminum production factors - [IAI LCA Data](https://international-aluminium.org/)
- **World Steel Association**: Steel production LCA factors - [World Steel LCA](https://www.worldsteel.org/steel-stories/steel-lca-data.html)
- **PET LCA**: Polyester production environmental impact - [PET LCA Study](https://www.petcore-europe.org/)

##  Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/patentalchemy.git
cd patentalchemy

# Start development environment
make up

# Run tests
make test

# Build for production
make build
```

### Areas for Contribution

- **Patent Parser Extensions**: Support for USPTO, EPO, CNIPA formats
- **Material Database**: Expand screening factors coverage
- **UI/UX Improvements**: Enhanced visualization and interaction
- **Integration APIs**: SAP, Oracle, ERP system connections
- **Mobile Applications**: iOS/Android DPP readers

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **WIPO** for patent data access and standards
- **GS1** for Digital Link and EPCIS specifications
- **FastAPI** and **Next.js** communities for excellent frameworks
- **Open source LCA databases** for carbon footprint data

