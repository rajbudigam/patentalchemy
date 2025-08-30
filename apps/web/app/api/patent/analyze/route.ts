import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const backendUrl = `${BACKEND_URL}/patent/analyze`;

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

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API proxy POST error:', error);
    console.log('Backend connection failed, returning fallback patent analysis');

    const body = await request.json().catch(() => ({}));

    return NextResponse.json({
      patent: {
        title: "Patent Analysis (Fallback)",
        abstract: "Patent analysis service temporarily unavailable. Please try again later.",
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
}
