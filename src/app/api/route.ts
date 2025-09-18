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
  return new NextResponse(null, { status: 200 });
}