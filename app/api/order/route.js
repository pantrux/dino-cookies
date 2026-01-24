import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request) {
    try {
        // Step 1: Parse body
        const body = await request.json();

        // Step 2: Return immediately for testing
        return NextResponse.json({
            success: true,
            message: 'API is working',
            received: body
        });
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
