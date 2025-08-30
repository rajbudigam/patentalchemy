
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DPPView() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function run() {
      try {
        const r = await fetch(`/api/dpp/${encodeURIComponent(params.id)}`);
        if (r.ok) { setData(await r.json()); return; }
      } catch {}
      // fallback to client storage for local dev
      const j = sessionStorage.getItem(`dpp:${params.id}`);
      if (j) setData(JSON.parse(j));
    }
    run();
  }, [params.id]);

  if (!data) return <div className="p-8">DPP not found (mint one first).</div>;

  return (
    <div className="min-h-screen p-6 sm:p-10">
      <div className="plasma" />
      <div className="card rounded-xl2 p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-1">{data.product?.name}</h1>
        <div className="text-sm opacity-70 mb-4">{data.product?.category}</div>
        <div className="text-sm mb-2">ID: <span className="opacity-80">{data.id}</span></div>
        <div className="text-sm mb-4">GTIN: {data.identifiers?.gtin} · Serial: {data.identifiers?.serial}</div>

        <h2 className="font-semibold mb-2">Composition</h2>
        <ul className="text-sm mb-4 opacity-80">
          {data.composition?.map((c: any, i: number) => (
            <li key={i}>• {c.material} — {c.mass_kg} kg, {c.recycled_pct}% recycled</li>
          ))}
        </ul>

        <h2 className="font-semibold mb-2">Sustainability</h2>
        <div className="text-sm mb-4 opacity-80">
          Screening footprint: <b>{data.sustainability?.ghg_kgco2e?.toFixed?.(3)} kg CO₂e</b> ({data.sustainability?.method})
        </div>

        <h2 className="font-semibold mb-2">Provenance</h2>
        <div className="text-sm opacity-80">
          Patent: {data.provenance?.source_patent_url || "N/A"}<br/>
          Legal status: {data.provenance?.legal_status || "N/A"}
        </div>

        <h2 className="font-semibold mt-4 mb-2">Events (EPCIS)</h2>
        <pre className="text-xs opacity-80">{JSON.stringify(data.events, null, 2)}</pre>
      </div>
    </div>
  );
}
