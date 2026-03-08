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

        // Try to access D1 binding via globalThis or process.env
        // Diagnostics confirmed it is available in process.env.DB in this environment
        const db = globalThis.DB || process.env.DB;

        if (!db) {
            console.error('D1 binding not found in globalThis.DB or process.env.DB');
            return NextResponse.json({
                error: 'Database not configured',
                details: 'D1 binding not found. Please ensure the "DB" binding is configured in Cloudflare Pages settings.'
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
                body: JSON.stringify({
                    ...newOrder,
                    items: body.items || [],
                    subtotalCents: body.subtotalCents || 0,
                })
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
