'use client';

import AdyenCheckoutComponent from '@/components/AdyenCheckout';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <main
      style={{
        background: '#F5F5F5',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'Inter, Roboto, Open Sans, Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 2px 16px rgba(0, 17, 44, 0.08)',
          overflow: 'hidden',
        }}
      >
        {/* Top Bar with Return Home Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '1rem 2rem 0.5rem 2rem', background: '#fff' }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              background: '#00112c',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '0.5rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0, 17, 44, 0.08)',
              transition: 'background 0.2s',
              outline: 'none',
            }}
            tabIndex={0}
            aria-label="Return to home"
            onFocus={e => (e.currentTarget.style.background = '#1a2b4a')}
            onBlur={e => (e.currentTarget.style.background = '#00112c')}
            onMouseEnter={e => (e.currentTarget.style.background = '#1a2b4a')}
            onMouseLeave={e => (e.currentTarget.style.background = '#00112c')}
          >
            ← Return to Home
          </Link>
        </div>
        {/* Header */}
        <div
          style={{
            background: '#00112c',
            color: '#fff',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: 'JetBrains Mono, Fira Code, IBM Plex Mono, monospace',
              fontWeight: 700,
              fontSize: '2rem',
              margin: 0,
              marginBottom: '0.5rem',
            }}
          >
            
            Adyen Checkout Demo
          </h1>
          <p
            style={{
              margin: 0,
              opacity: 0.9,
              fontSize: '1rem',
            }}
          >
            Complete a test payment securely with Adyen
          </p>
        </div>

        {/* Order Summary */}
        <div
          style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid #E0E0E0',
            background: '#fafafa',
          }}
        >
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#00112c',
              margin: '0 0 1rem 0',
            }}
          >
            Order Summary
          </h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              background: '#fff',
              borderRadius: '8px',
              border: '1px solid #E0E0E0',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, color: '#00112c' }}>
                Demo Product
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem' }}>
                Test payment for Adyen integration
              </div>
            </div>
            <div
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#00112c',
              }}
            >
              €10.00
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div style={{ padding: '2rem' }}>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#00112c',
              margin: '0 0 1.5rem 0',
            }}
          >
            Payment Method
          </h2>
          <AdyenCheckoutComponent />
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '1.5rem 2rem',
            background: '#fafafa',
            borderTop: '1px solid #E0E0E0',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '0.9rem',
              color: '#666',
            }}
          >
            🔒 Your payment information is encrypted and secure
          </p>
        </div>
      </div>
    </main>
  );
}