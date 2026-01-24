import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    try {
        const diagnostics = {
            timestamp: new Date().toISOString(),
            environment: 'cloudflare-pages',

            // Check globalThis.DB safely
            globalThis_DB_exists: 'DB' in globalThis,
            globalThis_DB_type: globalThis.DB ? typeof globalThis.DB : 'undefined',
            globalThis_DB_value: globalThis.DB ? 'present' : 'missing',

            // Check process.env.DB safely
            process_env_DB_exists: 'DB' in (process.env || {}),
            process_env_DB_type: process.env?.DB ? typeof process.env.DB : 'undefined',

            // List available environment keys
            process_env_keys: Object.keys(process.env || {}).slice(0, 20),

            // Check for Cloudflare-specific globals
            cloudflare_context_type: typeof globalThis.CLOUDFLARE_CONTEXT,

            // Runtime information
            runtime: 'edge',
            node_version: process.version || 'unknown'
        };

        return NextResponse.json(diagnostics, {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Diagnostics failed',
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        }, {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
