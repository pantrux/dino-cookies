import { NextResponse } from 'next/server';
import { getOrders } from '@/lib/db';

export const runtime = 'edge';

export async function GET(request) {
    try {
        // Get D1 database binding from the request context
        const db = process.env.DB;

        if (!db) {
            console.error('D1 database binding not found');
            return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
        }

        // Fetch all orders from D1 (already sorted by date DESC in the query)
        const orders = await getOrders(db);

        return NextResponse.json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}
