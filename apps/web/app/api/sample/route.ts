import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

// Fallback sample data when backend is not available
const fallbackSampleData = {
  patent: {
    title: "Modular tool-less joinery for recycled aluminum furniture components",
    abstract: "A modular connector system enabling rapid assembly of furniture using recycled aluminum nodes and slotted beams without adhesives or fasteners.",
    claims_text: "A connector node comprising: a recycled aluminum body; an interference-fit slot; a replaceable low-friction bushing; a serviceable design facilitating disassembly; a repairable component interface.",
    ipc: ["F16B", "A47B"],
    source_url: "https://www3.wipo.int/wipogreen/en/",
    legal_status: { type: "pledged_or_expired", evidence_url: "https://lowcarbonpatentpledge.org/" }
  },
  blocks: [
    { label: "recycled connector", confidence: 0.78, notes: "heuristic" },
    { label: "aluminum housing", confidence: 0.62, notes: "claims" },
    { label: "low-friction bushing", confidence: 0.78, notes: "heuristic" },
    { label: "interference-fit slot", confidence: 0.62, notes: "claims" },
    { label: "serviceable design", confidence: 0.62, notes: "claims" }
  ]
};

export async function GET(request: NextRequest) {
  try {
    const backendUrl = `${BACKEND_URL}/sample`;

    console.log('Proxying GET request to:', backendUrl);

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Backend error:', response.status, response.statusText);
      console.log('Backend unavailable, returning fallback sample data');
      return NextResponse.json(fallbackSampleData);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API proxy GET error:', error);
    console.log('Backend connection failed, returning fallback sample data');
    return NextResponse.json(fallbackSampleData);
  }
}
