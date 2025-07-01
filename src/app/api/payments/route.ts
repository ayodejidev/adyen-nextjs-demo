import { NextResponse } from 'next/server';
import { getAdyenCheckout } from '@/utils/adyenClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const checkout = getAdyenCheckout();

    const res = await checkout.PaymentsApi.payments({
      ...body,
      merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT!,
      returnUrl: 'http://localhost:3000/checkout',
    });

    return NextResponse.json(res);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}