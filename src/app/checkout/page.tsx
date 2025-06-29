'use client';

import AdyenCheckoutComponent from '@/components/AdyenCheckout';

export default function CheckoutPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Checkout</h1>
      <AdyenCheckoutComponent />
    </main>
  );
}