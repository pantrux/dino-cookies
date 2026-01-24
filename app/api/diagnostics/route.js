import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    try {
        const diagnostics = {
            timestamp: new Date().toISOString(),
            globalThis_DB: typeof globalThis.DB,
            process_env_DB: typeof process.env.DB,
            DB_direct: typeof (typeof DB !== 'undefined' ? DB : undefined),
            available_globals: Object.keys(globalThis).filter(k => k.toUpperCase() === k).slice(0, 20)
        };

        return NextResponse.json(diagnostics);
    } catch (error) {
        return NextResponse.json({
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
