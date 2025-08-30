"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GS1DeepLink() {
  const params = useParams<{ gtin: string; serial: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function run() {
      try {
        const r = await fetch(`/api/dpp/by-serial/${encodeURIComponent(params.serial)}`);
        if (r.ok) setData(await r.json());
      } catch {}
    }
    run();
  }, [params.serial]);

  if (!data) return <div className="p-8">Resolving… (mint a DPP first)</div>;
  if (data?.id) {
    // redirect UX: show link to canonical DPP page
    if (typeof window !== "undefined") window.location.href = `/dpp/${encodeURIComponent(data.id)}`;
  }
  return <div className="p-8">Opening passport…</div>;
}
