"use client";
import Shell from "../../components/Shell";
import { motion } from "framer-motion";

function Flowchart() {
  return (
    <svg viewBox="0 0 1200 500" className="w-full h-auto">
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8ef9f3" />
          <stop offset="50%" stopColor="#f6a6ff" />
          <stop offset="100%" stopColor="#a4ff9f" />
        </linearGradient>
        <linearGradient id="g2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b3ffea" />
          <stop offset="100%" stopColor="#e6c0ff" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge>
            <feMergeNode in="b"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect x="0" y="0" width="1200" height="500" fill="url(#g2)" opacity="0.06" />

      <g filter="url(#glow)">
        <rect x="60" y="60" rx="14" width="220" height="90" fill="url(#g1)" opacity="0.25" stroke="white" strokeOpacity="0.25" />
        <text x="170" y="112" textAnchor="middle" fill="white" fontSize="18">Patent Corpus</text>

        <rect x="360" y="60" rx="14" width="220" height="90" fill="url(#g1)" opacity="0.25" stroke="white" strokeOpacity="0.25" />
        <text x="470" y="112" textAnchor="middle" fill="white" fontSize="18">Block Extraction</text>

        <rect x="660" y="60" rx="14" width="220" height="90" fill="url(#g1)" opacity="0.25" stroke="white" strokeOpacity="0.25" />
        <text x="770" y="112" textAnchor="middle" fill="white" fontSize="18">BOM Assembly</text>

        <rect x="960" y="60" rx="14" width="220" height="90" fill="url(#g1)" opacity="0.25" stroke="white" strokeOpacity="0.25" />
        <text x="1070" y="112" textAnchor="middle" fill="white" fontSize="18">Footprint Screening</text>

        <rect x="360" y="230" rx="14" width="220" height="90" fill="url(#g1)" opacity="0.25" stroke="white" strokeOpacity="0.25" />
        <text x="470" y="282" textAnchor="middle" fill="white" fontSize="18">DPP Minting</text>

        <rect x="660" y="230" rx="14" width="220" height="90" fill="url(#g1)" opacity="0.25" stroke="white" strokeOpacity="0.25" />
        <text x="770" y="282" textAnchor="middle" fill="white" fontSize="18">GS1 Digital Link</text>

        <rect x="960" y="230" rx="14" width="220" height="90" fill="url(#g1)" opacity="0.25" stroke="white" strokeOpacity="0.25" />
        <text x="1070" y="282" textAnchor="middle" fill="white" fontSize="18">EPCIS Events</text>

        {[
          [280, 105, 360, 105],
          [580, 105, 660, 105],
          [880, 105, 960, 105],
          [470, 150, 470, 230],
          [580, 275, 660, 275],
          [880, 275, 960, 275],
        ].map(([x1, y1, x2, y2], i) => (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#g1)" strokeWidth="3" />
            <circle cx={x2} cy={y2} r="3.5" fill="white" opacity="0.8" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function AboutPage() {
  return (
    <Shell>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">About PatentAlchemy</h1>
        <p className="opacity-85 mt-3 max-w-3xl">
          PatentAlchemy turns public eco‑innovation into action: extract functional blocks from patents, assemble Bills of Materials, screen climate impact, and mint Digital Product Passports you can scan and share.
        </p>

        <section className="mt-8 card rounded-xl2 p-5">
          <h2 className="font-semibold mb-3">System Flow</h2>
          <Flowchart />
          <p className="text-sm opacity-80 mt-3">
            We preserve standards at interfaces: GS1 Digital Link for discovery, EPCIS‑shaped events for provenance, and transparent screening with sector‑published emission factors.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="card rounded-xl2 p-5">
            <h3 className="font-semibold mb-2">Footprint Screening</h3>
            <p className="text-sm opacity-80">
              Rapid screening estimates kg CO₂e by mapping BOM materials to authoritative factors (e.g., metal production, transport). Category alignment follows USEEIO where applicable. Uncertainty is explicit; results are labeled as screening, not verified LCA.
            </p>
          </div>
          <div className="card rounded-xl2 p-5">
            <h3 className="font-semibold mb-2">Digital Product Passport</h3>
            <p className="text-sm opacity-80">
              Passports include identifiers (GTIN + serial), composition, sustainability summary, and provenance metadata. Deep links follow the GS1 pattern <code>/01/&lt;gtin&gt;/21/&lt;serial&gt;</code>; QR encodes the same, resolving to a canonical DPP page.
            </p>
          </div>
        </section>

        <section className="card rounded-xl2 p-5 mt-6">
          <h3 className="font-semibold mb-2">References</h3>
          <ul className="text-sm opacity-85 list-disc pl-5 space-y-1">
            <li>GS1 Digital Link Standard</li>
            <li>GS1 EPCIS 2.0 Event Vocabulary</li>
            <li>USEEIO Categories and Mapping Guidance</li>
            <li>Sector Authority Factors (e.g., aluminum, steel, electricity mixes)</li>
            <li>WIPO and WIPO GREEN as primary corpus sources</li>
          </ul>
        </section>
      </motion.div>
    </Shell>
  );
}

