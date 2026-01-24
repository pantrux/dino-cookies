import { NextResponse } from 'next/server';
import { saveOrder } from '@/lib/db';

import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, quantity, type, address } = body;

        if (!firstName || !lastName || !email || !phone || !quantity || !address) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        // Get D1 database binding from the request context
        const { env } = getRequestContext();
        const db = env.DB;

        if (!db) {
            console.error('D1 binding not found. Env keys:', Object.keys(env));
            return NextResponse.json({
                error: 'Database connection failed (Binding "DB" is missing in context)'
            }, { status: 500 });
        }

        // Save to D1 Database
        const newOrder = await saveOrder(db, body);
        console.log("Order saved to D1:", newOrder);

        // Send to Webhook (n8n)
        try {
            const webhookUrl = 'https://pantrux.duckdns.org/n8n/webhook/0bcd36c4-8b0e-495b-8adc-9a1234adc726';
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newOrder)
            });
            console.log("Sent to Webhook successfully");
        } catch (webhookError) {
            console.error("Webhook error:", webhookError);
            // We don't fail the request to the user if webhook fails, but we log it.
        }

        return NextResponse.json({ success: true, message: 'Pedido recibido', order: newOrder });
    } catch (error) {
        console.error('Order error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

