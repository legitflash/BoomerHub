import { NextResponse } from 'next/server';

// Generic API health check endpoint to prevent 404 errors
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'BoomerHub API is running'
  });
}

export async function HEAD() {
  // Add aggressive cache headers to reduce repeated requests
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
      'Vary': 'Accept-Encoding',
      'ETag': `"api-health-${Date.now()}"`
    }
  });
}