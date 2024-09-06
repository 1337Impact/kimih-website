// app/api/verify-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tap_id = searchParams.get('tap_id');

  try {
    const response = await axios.get(`https://api.tap.company/v2/charges/${tap_id}`, {
      headers: {
        Authorization: `Bearer ${process.env.TAP_SECRET_KEY}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error verifying payment:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Error verifying payment' }, { status: 500 });
  }
}
