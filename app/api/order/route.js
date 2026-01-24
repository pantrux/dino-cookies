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

        // Try multiple ways to access the DB binding
        // Cloudflare Pages can expose it in different ways depending on configuration
        const db = globalThis.DB ||
            process.env.DB ||
            (typeof DB !== 'undefined' ? DB : null);

        if (!db) {
            console.error('D1 binding not found');
            console.error('globalThis.DB:', typeof globalThis.DB);
            console.error('process.env.DB:', typeof process.env.DB);
            console.error('global DB:', typeof (typeof DB !== 'undefined' ? DB : undefined));

            return NextResponse.json({
                error: 'Database binding not available. Check Cloudflare Pages D1 binding configuration.'
            }, { status: 500 });
        }

        // Save to D1 Database
        let newOrder;
        try {
            newOrder = await saveOrder(db, body);
            console.log("Order saved:", newOrder.id);
        } catch (dbError) {
            console.error("Database error:", dbError);
            return NextResponse.json({
                error: 'Database error: ' + dbError.message
            }, { status: 500 });
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
        });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({
            error: 'Server error: ' + (error.message || 'Unknown')
        }, { status: 500 });
    }
}
