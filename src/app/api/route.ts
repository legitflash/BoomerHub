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
  // Add cache headers to reduce repeated requests
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=60, s-maxage=60',
      'Vary': 'Accept-Encoding'
    }
  });
}