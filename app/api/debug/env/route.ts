// app/api/debug/env/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    AUTH_GITHUB_CLIENT_ID: process.env.AUTH_GITHUB_CLIENT_ID,
    AUTH_GITHUB_CLIENT_SECRET: process.env.AUTH_GITHUB_CLIENT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not set',
  });
}
