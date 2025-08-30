import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const backendUrl = `${BACKEND_URL}/dpp/mint`;

    console.log('Proxying POST request to:', backendUrl);

    const body = await request.json();

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error('Backend error:', response.status, response.statusText);
      console.log('Backend unavailable, returning fallback DPP');

      return NextResponse.json({
        id: `fallback-${Date.now()}`,
        product: body.product || { name: "Fallback Product", category: "unknown" },
        identifiers: {
          gtin: "09506000134352",
          serial: `fallback-${Date.now()}`
        },
        composition: body.bom || [],
        sustainability: body.screening || { ghg_kgco2e: 2.5, method: "fallback" },
        provenance: {
          source_patent_url: null,
          legal_status: { type: "unknown", evidence_url: null }
        },
        events: [],
        created_at: new Date().toISOString()
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API proxy POST error:', error);
    console.log('Backend connection failed, returning fallback DPP');

    const body = await request.json().catch(() => ({}));

    return NextResponse.json({
      id: `fallback-${Date.now()}`,
      product: body.product || { name: "Fallback Product", category: "unknown" },
      identifiers: {
        gtin: "09506000134352",
        serial: `fallback-${Date.now()}`
      },
      composition: body.bom || [],
      sustainability: body.screening || { ghg_kgco2e: 2.5, method: "fallback" },
      provenance: {
        source_patent_url: null,
        legal_status: { type: "unknown", evidence_url: null }
      },
      events: [],
      created_at: new Date().toISOString()
    });
  }
}
