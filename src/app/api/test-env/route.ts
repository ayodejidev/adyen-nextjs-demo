import { NextResponse } from 'next/server';

export async function GET() {
  const envCheck = {
    ADYEN_API_KEY: !!process.env.ADYEN_API_KEY,
    ADYEN_MERCHANT_ACCOUNT: !!process.env.ADYEN_MERCHANT_ACCOUNT,
    NEXT_PUBLIC_ADYEN_CLIENT_KEY: !!process.env.NEXT_PUBLIC_ADYEN_CLIENT_KEY,
    ADYEN_HMAC_KEY: !!process.env.ADYEN_HMAC_KEY,
  };

  console.log('🔍 Environment check:', envCheck);

  return NextResponse.json({
    message: 'Environment variables check',
    envCheck,
    hasAllRequired: Object.values(envCheck).every(Boolean),
  });
} 