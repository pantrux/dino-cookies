import { NextResponse } from 'next/server';
import { saveOrder } from '@/lib/db';

export const runtime = 'edge';

// This function will be called by Cloudflare Pages
// The DB binding should be available via the global context
export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, quantity, type, address } = body;

        if (!firstName || !lastName || !email || !phone || !quantity || !address) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Access DB binding from the Cloudflare Workers environment
        // @cloudflare/next-on-pages makes this available globally
        const db = globalThis.DB || process.env.DB;

        if (!db) {
            console.error('D1 binding not found');
            console.error('globalThis.DB:', typeof globalThis.DB);
            console.error('process.env.DB:', typeof process.env.DB);
            return NextResponse.json({
                error: 'Database binding "DB" not configured. Please check Cloudflare Pages settings.'
            }, { status: 500 });
        }

        // Save to D1 Database
        let newOrder;
        try {
            newOrder = await saveOrder(db, body);
            console.log("Order saved successfully:", newOrder.id);
        } catch (dbError) {
            console.error("Database save error:", dbError);
            return NextResponse.json({
                error: 'Failed to save order: ' + dbError.message
            }, { status: 500 });
        }

        // Send to Webhook (n8n) - non-blocking, don't fail if this errors
        try {
            const webhookUrl = 'https://pantrux.duckdns.org/n8n/webhook/0bcd36c4-8b0e-495b-8adc-9a1234adc726';
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newOrder)
            });
            console.log("Webhook notification sent");
        } catch (webhookError) {
            console.error("Webhook error (non-critical):", webhookError.message);
        }

        return NextResponse.json({
            success: true,
            message: 'Pedido recibido exitosamente',
            order: newOrder
        });
    } catch (error) {
        console.error('Unexpected error in POST /api/order:', error);
        return NextResponse.json({
            error: 'Server error: ' + (error.message || 'Unknown error')
        }, { status: 500 });
    }
}
