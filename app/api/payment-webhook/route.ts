// app/api/verify-payment/route.ts
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.text(); 
    const eventData = JSON.parse(body);

    // Log the parsed webhook data
    console.log('Webhook event data:', eventData);

    return NextResponse.json({ message: 'Webhook received successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);

    return NextResponse.json({ message: 'Error processing webhook' }, { status: 500 });
  }
}