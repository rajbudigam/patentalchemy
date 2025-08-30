import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const backendUrl = `${BACKEND_URL}/dpp/${encodeURIComponent(params.id)}`;

    console.log('Proxying GET request to:', backendUrl);

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Backend error:', response.status, response.statusText);
      console.log('Backend unavailable or DPP not found');

      return NextResponse.json(
        { error: `DPP not found` },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API proxy GET error:', error);
    console.log('Backend connection failed');

    return NextResponse.json(
      { error: 'Failed to connect to backend', details: String(error) },
      { status: 500 }
    );
  }
}
