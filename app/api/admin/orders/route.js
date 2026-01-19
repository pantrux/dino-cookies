import { NextResponse } from 'next/server';
import { getOrders } from '@/lib/db';

export async function GET() {
    const orders = getOrders();
    // Sort by date desc
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));
    return NextResponse.json({ orders });
}
