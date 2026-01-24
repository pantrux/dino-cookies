import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    return new Response('API is responding', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
    });
}
