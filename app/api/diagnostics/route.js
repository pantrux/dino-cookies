import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    try {
        const info = {
            status: 'online',
            time: new Date().toISOString(),
            db_type: typeof globalThis.DB,
            env_db_type: typeof process.env.DB
        };

        return new Response(JSON.stringify(info), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        return new Response('Error: ' + e.message, { status: 500 });
    }
}
