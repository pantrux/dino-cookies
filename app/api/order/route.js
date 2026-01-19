import { NextResponse } from 'next/server';
import { saveOrder } from '@/lib/db';

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, quantity, address } = body;

        if (!firstName || !lastName || !email || !phone || !quantity || !address) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        // 1. Save to Local JSON (Kept for Admin Dashboard)
        const newOrder = saveOrder(body);
        console.log("Order saved locally:", newOrder);

        // 2. Send to Webhook (n8n)
        try {
            const webhookUrl = 'https://pantrux.duckdns.org/n8n/webhook-test/0bcd36c4-8b0e-495b-8adc-9a1234adc726';
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newOrder)
            });
            console.log("Sent to Webhook successfully");
        } catch (webhookError) {
            console.error("Webhook error:", webhookError);
            // We don't fail the request to the user if webhook fails, but we log it.
            // Alternatively, we could throw if strict consistency is needed.
        }

        return NextResponse.json({ success: true, message: 'Pedido recibido', order: newOrder });
    } catch (error) {
        console.error('Order error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
