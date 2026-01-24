import { NextResponse } from 'next/server';
import { saveOrder } from '@/lib/db';

export const runtime = 'edge';

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, quantity, type, address } = body;

        if (!firstName || !lastName || !email || !phone || !quantity || !address) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Access D1 binding via globalThis (standard for @cloudflare/next-on-pages v1)
        const db = globalThis.DB;

        if (!db) {
            console.error('D1 binding not found in globalThis.DB');
            console.error('Available in globalThis:', 'DB' in globalThis);
            console.error('Type of globalThis.DB:', typeof globalThis.DB);

            return NextResponse.json({
                error: 'Database not configured',
                details: 'D1 binding not found. Ensure DB binding is configured in Cloudflare Pages settings.'
            }, {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Save to D1 Database
        let newOrder;
        try {
            newOrder = await saveOrder(db, body);
            console.log("Order saved:", newOrder.id);
        } catch (dbError) {
            console.error("Database error:", dbError);
            return NextResponse.json({
                error: 'Database error',
                details: dbError.message
            }, {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Send to Webhook (non-blocking)
        try {
            const webhookUrl = 'https://pantrux.duckdns.org/n8n/webhook/0bcd36c4-8b0e-495b-8adc-9a1234adc726';
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newOrder)
            });
        } catch (webhookError) {
            console.error("Webhook error:", webhookError.message);
        }

        return NextResponse.json({
            success: true,
            message: 'Pedido recibido exitosamente',
            order: newOrder
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({
            error: 'Server error',
            details: error.message || 'Unknown error'
        }, {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
