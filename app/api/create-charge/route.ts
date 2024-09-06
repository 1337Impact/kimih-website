// app/api/create-charge/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { amount, currency } = await req.json();

  try {
    const response = await axios.post(
      'https://api.tap.company/v2/charges',
      {
        amount,
        currency,
        customer: {
          first_name: 'John',
          last_name: 'Doe',
          email: 'johndoe@example.com',
          phone: {
            country_code: '965', // Example country code (Kuwait)
            number: '50000000',  // Example phone number
          },
        },
        source: {
          id: 'src_card', // Use card payment as the source
        },
        redirect: {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-callback`,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TAP_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error creating charge:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Error creating charge' }, { status: 500 });
  }
}
