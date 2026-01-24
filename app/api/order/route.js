import { NextResponse } from 'next/server';
import { saveOrder } from '@/lib/db';

export const runtime = 'edge';

export async function POST(request, { env }) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, quantity, type, address } = body;

        if (!firstName || !lastName || !email || !phone || !quantity || !address) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Get D1 database binding from env parameter
        const db = env?.DB || process.env.DB;

        if (!db) {
            console.error('D1 binding not found. Env available:', !!env, 'Process.env.DB:', !!process.env.DB);
            return NextResponse.json({
                error: 'Database binding "DB" not configured'
            }, { status: 500 });
        }

        // Save to D1 Database
        let newOrder;
        try {
            newOrder = await saveOrder(db, body);
            console.log("Order saved to D1:", newOrder);
        } catch (dbError) {
            console.error("Database save error:", dbError);
            return NextResponse.json({
                error: 'Database error: ' + dbError.message
            }, { status: 500 });
        }

        // Send to Webhook (n8n) - non-blocking
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
            // Don't fail the request if webhook fails
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
