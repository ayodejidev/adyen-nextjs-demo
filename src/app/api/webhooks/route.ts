import { NextResponse } from 'next/server';
import crypto from 'crypto';

function isValidHmac(hmacKey: string, payload: any, signature: string): boolean {
  const signingData = `${payload.pspReference}:${payload.originalReference || ''}:${payload.merchantAccountCode}:${payload.merchantReference}:${payload.amount.value}:${payload.amount.currency}:${payload.eventCode}:${payload.success}`;
  const key = Buffer.from(hmacKey, 'hex');
  const hmac = crypto.createHmac('sha256', key).update(signingData).digest('base64');
  return hmac === signature;
}

export async function POST(req: Request) {
  const json = await req.json();
  const item = json.notificationItems?.[0]?.NotificationRequestItem;

  if (!item) return new Response('Bad Request', { status: 400 });

  const valid = isValidHmac(
    process.env.ADYEN_HMAC_KEY!,
    item,
    item.additionalData['hmacSignature']
  );

  if (!valid) return new Response('Unauthorized', { status: 403 });

  console.log('Webhook Event:', item.eventCode, item.pspReference);
  return new Response('[accepted]');
}