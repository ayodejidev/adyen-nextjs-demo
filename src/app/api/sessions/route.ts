import { NextResponse } from 'next/server';
import { getAdyenCheckout } from '@/utils/adyenClient';

export async function POST() {
  try {
    console.log('Creating Adyen session...');
    console.log('Merchant Account is set:', !!process.env.ADYEN_MERCHANT_ACCOUNT);
    console.log('API Key exists:', !!process.env.ADYEN_API_KEY);
    
    const checkout = getAdyenCheckout();

    const sessionRequest = {
      merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT!,
      countryCode: 'NL',
      shopperLocale: 'nl-NL',
      amount: { currency: 'EUR', value: 1000 },
      returnUrl: 'http://localhost:3000/checkout',
      reference: `order_${Date.now()}`,
    };

    console.log('Session request (non-sensitive):', {
      merchantAccount: sessionRequest.merchantAccount.replace(/.(?=.{4})/g, '*'), // Mask all but the last 4 characters
      countryCode: sessionRequest.countryCode,
      shopperLocale: sessionRequest.shopperLocale,
      amount: sessionRequest.amount,
      returnUrl: sessionRequest.returnUrl,
      reference: sessionRequest.reference,
    });

    const res = await checkout.PaymentsApi.sessions(sessionRequest);
    
    console.log('Session created successfully');
    console.log('Session response (non-sensitive):', {
      id: res.id,
      expiresAt: res.expiresAt,
      returnUrl: res.returnUrl,
      amount: res.amount,
      countryCode: res.countryCode,
      shopperLocale: res.shopperLocale,
      reference: res.reference,
      mode: res.mode,
      // sessionData is intentionally excluded as it's sensitive
    });

    // Return the session data in the format expected by the frontend
    return NextResponse.json({
      session: {
        id: res.id,
        sessionData: res.sessionData,
        expiresAt: res.expiresAt,
        returnUrl: res.returnUrl,
        amount: res.amount,
        countryCode: res.countryCode,
        shopperLocale: res.shopperLocale,
        reference: res.reference,
        mode: res.mode,
      }
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Session creation failed:', errorMessage);
    // Don't log the full error object as it might contain sensitive data
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 