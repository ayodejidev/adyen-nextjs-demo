export default function CheckoutFailed() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>❌ Payment Failed</h1>
      <p>Your payment could not be processed. Please try again or use a different payment method.</p>
      <a href="/checkout">Return to Checkout</a>
    </div>
  );
} 