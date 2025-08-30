"use client";
import Shell from "../../components/Shell";
import GlassCard from "../../components/GlassCard";
import DopamineButton from "../../components/DopamineButton";
import { useState } from "react";
import { toQRDataURL } from "../lib/qr";
import { externalBaseUrl } from "../lib/url";
import type { Block, BomLine, Dpp, PatentInput } from "../lib/schema";
import { motion } from "framer-motion";
import { QrCode, Wand2, Leaf } from "lucide-react";

type ScreeningResp = { ghg_kgco2e: number; breakdown: Record<string, number>; method: string };

export default function Workbench() {
  const [patent, setPatent] = useState<PatentInput>({});
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [bom, setBom] = useState<BomLine[]>([]);
  const [screening, setScreening] = useState<ScreeningResp | null>(null);
  const [dpp, setDpp] = useState<Dpp | null>(null);
  const [qr, setQr] = useState<string | null>(null);
  const [lint, setLint] = useState<{ ok: boolean; issues: string[] } | null>(null);

  async function loadSample() {
    const r = await fetch(`/api/sample`);
    const j = await r.json();
    setPatent(j.patent);
    setBlocks(j.blocks);
  }

  async function analyzeUrl(url: string) {
    const r = await fetch(`/api/patent/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source_url: url }),
    });
    const j = await r.json();
    setPatent(j.patent);
    setBlocks(j.blocks);
  }

  function addToBom(b: Block) {
    const m = prompt(`Material for "${b.label}"?`, "aluminum");
    if (!m) return;
    const variant = (prompt(`Variant? "virgin" or "recycled"`, "recycled") || "recycled") as
      | "virgin"
      | "recycled";
    const mass = parseFloat(prompt(`Mass (kg)`, "0.25") || "0.25");
    setBom([...bom, { block: b.label, material: m.toLowerCase(), variant, mass_kg: mass }]);
  }

  async function computeScreening() {
    const r = await fetch(`/api/footprint/compute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bom }),
    });
    setScreening(await r.json());
  }

  async function mintDpp() {
    const base = externalBaseUrl();
    const product = { name: patent.title?.slice(0, 40) || "Remix Component", category: "furniture_component" };
    const r = await fetch(`/api/dpp/mint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product, bom, patent, screening }),
    });
    const j = await r.json();
    setDpp(j);

    const lintResp = await fetch(`/api/dpp/lint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dpp: j }),
    });
    setLint(await lintResp.json());

    const gs1 = `${base}/01/${j.identifiers.gtin}/21/${encodeURIComponent(j.identifiers.serial)}`;
    setQr(await toQRDataURL(gs1));
  }

  return (
    <Shell>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Patent → Passport Workbench</h1>
          <p className="opacity-80 mt-2 max-w-2xl">
            Extract blocks from patents, build a BOM, compute environmental screening, and mint a Digital Product Passport.
          </p>
        </div>

        <GlassCard
          title="Get Started"
          right={<DopamineButton onClick={loadSample}>Load Sample</DopamineButton>}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              placeholder="Paste a WIPO / WIPO GREEN URL"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/10 outline-none backdrop-blur"
              onKeyDown={(e) => {
                if (e.key === "Enter") analyzeUrl((e.target as HTMLInputElement).value);
              }}
            />
            <DopamineButton
              onClick={() => {
                const v = (document.querySelector("input[type=url]") as HTMLInputElement)?.value;
                if (v) analyzeUrl(v);
              }}
            >
              <Wand2 size={18} /> Analyze
            </DopamineButton>
          </div>
          <p className="text-xs opacity-70 mt-2">
            Standards‑flavored outputs: GS1 Digital Link path and EPCIS JSON events. USEEIO‑aligned categories; screening factors from sector authorities.
          </p>
        </GlassCard>

        <GlassCard title="Blocks">
          {blocks.length === 0 ? (
            <p className="opacity-70">
              Load a sample or analyze a URL. We'll extract 5–12 functional blocks.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {blocks.map((b, i) => (
                <button
                  key={i}
                  onClick={() => addToBom(b)}
                  className="text-left p-4 rounded-xl2 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="font-medium">{b.label}</div>
                  <div className="text-xs opacity-60">confidence {Math.round(b.confidence * 100)}%</div>
                </button>
              ))}
            </div>
          )}
        </GlassCard>

        <GlassCard
          title="BOM & Screening"
          right={
            <DopamineButton onClick={computeScreening} className="text-emerald-50">
              <Leaf size={16} /> Compute
            </DopamineButton>
          }
        >
          {bom.length === 0 ? (
            <p className="opacity-70">
              Add blocks to your Bill of Materials (BOM). We'll compute <b>kg CO₂e</b>.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="opacity-70">
                  <tr>
                    <th className="text-left p-2">Block</th>
                    <th className="text-left p-2">Material</th>
                    <th className="text-left p-2">Variant</th>
                    <th className="text-left p-2">Mass (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {bom.map((l, i) => (
                    <tr key={i} className="border-t border-white/10">
                      <td className="p-2">{l.block}</td>
                      <td className="p-2">{l.material}</td>
                      <td className="p-2">{l.variant}</td>
                      <td className="p-2">{l.mass_kg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {screening && (
                <div className="mt-3 text-sm">
                  <div>
                    Total: <b>{screening.ghg_kgco2e.toFixed(3)} kg CO₂e</b>
                  </div>
                  <div className="opacity-70">Method: {screening.method}</div>
                </div>
              )}
            </div>
          )}
        </GlassCard>

        <GlassCard
          title="Mint Digital Product Passport"
          right={
            <DopamineButton onClick={mintDpp}>
              <QrCode size={16} /> Mint DPP
            </DopamineButton>
          }
        >
          {!dpp ? (
            <p className="opacity-70">
              When ready, mint a DPP (JSON) and a GS1 Digital Link QR. Scan it live. (/01/&lt;gtin&gt;/21/&lt;serial&gt;)
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl2 bg-white/5">
                <div className="text-sm opacity-70 mb-1">QR (scan me)</div>
                {qr && <img className="qr w-64 h-64" src={qr} alt="QR" />}
              </div>
              <div className="p-4 rounded-xl2 bg-white/5">
                <div className="text-sm opacity-70 mb-1">DPP JSON</div>
                <pre className="text-xs whitespace-pre-wrap break-all">{JSON.stringify(dpp, null, 2)}</pre>
                {lint && !lint.ok && (
                  <div className="mt-3 text-xs text-amber-200">
                    <b>Lint:</b> {lint.issues.join(" · ")}
                  </div>
                )}
              </div>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </Shell>
  );
}
