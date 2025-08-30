"use client";
import Shell from "../../components/Shell";
import { useEffect, useState } from "react";

type Factor = { name: string; ghg_kgco2e_per_kg: number; source?: string };

export default function Materials() {
  const [factors, setFactors] = useState<Factor[]>([
    { name: "aluminum (recycled)", ghg_kgco2e_per_kg: 1.8, source: "sector_authority" },
    { name: "aluminum (virgin)", ghg_kgco2e_per_kg: 10.5, source: "sector_authority" },
    { name: "steel (recycled)", ghg_kgco2e_per_kg: 0.9, source: "sector_authority" },
    { name: "steel (virgin)", ghg_kgco2e_per_kg: 2.1, source: "sector_authority" },
  ]);

  return (
    <Shell>
      <div className="max-w-5xl">
        <h1 className="text-4xl font-semibold tracking-tight">Materials & Factors</h1>
        <p className="opacity-85 mt-3 max-w-3xl">
          Screening factors used in fast calculations. Values and sources are illustrative and may be replaced by live sector datasets in your environment.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          {factors.map((f, i) => (
            <div key={i} className="card rounded-xl2 p-5">
              <div className="font-medium">{f.name}</div>
              <div className="opacity-90 mt-1 text-sm">{f.ghg_kgco2e_per_kg.toFixed(2)} kg CO₂e / kg</div>
              <div className="opacity-60 text-xs mt-2">{f.source}</div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

