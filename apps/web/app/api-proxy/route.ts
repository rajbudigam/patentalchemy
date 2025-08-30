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
    const url = new URL(request.url);
    const path = url.pathname.replace('/api-proxy', '');
    const search = url.search;

    const backendUrl = `${BACKEND_URL}${path}${search}`;

    console.log('Proxying GET request to:', backendUrl);

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Backend error:', response.status, response.statusText);

      // For /sample endpoint, return fallback data when backend is unavailable
      if (path === '/sample') {
        console.log('Backend unavailable, returning fallback sample data');
        return NextResponse.json(fallbackSampleData);
      }

      return NextResponse.json(
        { error: `Backend returned ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API proxy GET error:', error);

    // For /sample endpoint, return fallback data when backend connection fails
    const url = new URL(request.url);
    const path = url.pathname.replace('/api-proxy', '');
    if (path === '/sample') {
      console.log('Backend connection failed, returning fallback sample data');
      return NextResponse.json(fallbackSampleData);
    }

    return NextResponse.json(
      { error: 'Failed to connect to backend', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const path = url.pathname.replace('/api-proxy', '');
    const search = url.search;

    const backendUrl = `${BACKEND_URL}${path}${search}`;

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

      // Provide fallback responses for common endpoints when backend is unavailable
      if (path === '/patent/analyze') {
        console.log('Backend unavailable, returning fallback patent analysis');
        return NextResponse.json({
          patent: {
            title: body.source_url ? "Patent from URL (fallback)" : "Analyzed Patent (fallback)",
            abstract: "Patent analysis temporarily unavailable. Using fallback data.",
            claims_text: "Claims analysis temporarily unavailable.",
            ipc: ["F16B"],
            source_url: body.source_url || null
          },
          blocks: [
            { label: "connector", confidence: 0.5, notes: "fallback" },
            { label: "housing", confidence: 0.5, notes: "fallback" }
          ]
        });
      }

      if (path === '/footprint/compute') {
        console.log('Backend unavailable, returning fallback screening');
        return NextResponse.json({
          ghg_kgco2e: 2.5,
          breakdown: { "aluminum": 1.8, "steel": 0.7 },
          method: "fallback_factors"
        });
      }

      return NextResponse.json(
        { error: `Backend returned ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API proxy POST error:', error);

    // Provide fallback responses when backend connection fails
    const url = new URL(request.url);
    const path = url.pathname.replace('/api-proxy', '');

    if (path === '/patent/analyze') {
      console.log('Backend connection failed, returning fallback patent analysis');
      return NextResponse.json({
        patent: {
          title: "Patent Analysis (Fallback)",
          abstract: "Patent analysis service temporarily unavailable. Please try again later.",
          claims_text: "Claims analysis temporarily unavailable.",
          ipc: ["F16B"],
          source_url: null
        },
        blocks: [
          { label: "connector", confidence: 0.5, notes: "fallback" },
          { label: "housing", confidence: 0.5, notes: "fallback" }
        ]
      });
    }

    if (path === '/footprint/compute') {
      console.log('Backend connection failed, returning fallback screening');
      return NextResponse.json({
        ghg_kgco2e: 2.5,
        breakdown: { "aluminum": 1.8, "steel": 0.7 },
        method: "fallback_factors"
      });
    }

    return NextResponse.json(
      { error: 'Failed to connect to backend', details: String(error) },
      { status: 500 }
    );
  }
}
