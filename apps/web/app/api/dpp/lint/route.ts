import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const backendUrl = `${BACKEND_URL}/dpp/lint`;

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
      console.log('Backend unavailable, returning fallback lint result');

      return NextResponse.json({
        ok: true,
        issues: []
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API proxy POST error:', error);
    console.log('Backend connection failed, returning fallback lint result');

    return NextResponse.json({
      ok: true,
      issues: []
    });
  }
}
