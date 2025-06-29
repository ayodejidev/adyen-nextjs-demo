import { NextResponse } from 'next/server';
import { getAdyenCheckout } from '@/utils/adyenClient';

export async function POST() {
  try {
    const checkout = getAdyenCheckout();

    const res = await checkout.PaymentsApi.paymentMethods({
      merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT!,
      countryCode: 'NL',
      shopperLocale: 'nl-NL',
      amount: { currency: 'EUR', value: 1000 },
    });

    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}