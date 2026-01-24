import { NextResponse } from 'next/server';
import { getOrders } from '@/lib/db';

export const runtime = 'edge';

export async function GET(request) {
    try {
        const db = globalThis.DB;

        if (!db) {
            console.error('D1 binding not found in globalThis.DB');
            return NextResponse.json({
                error: 'Database not configured',
                details: 'D1 binding not found in globalThis.DB'
            }, { status: 500 });
        }

        const orders = await getOrders(db);
        return NextResponse.json({ orders }, {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({
            error: 'Failed to fetch orders',
            details: error.message
        }, { status: 500 });
    }
}
