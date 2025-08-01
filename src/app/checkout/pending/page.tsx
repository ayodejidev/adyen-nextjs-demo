'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CheckoutPending() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main
      style={{
        background: '#F5F5F5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, Roboto, Open Sans, Arial, sans-serif',
      }}
      aria-labelledby="pending-heading"
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 2px 16px rgba(0, 17, 44, 0.08)',
          padding: '2.5rem 2rem',
          maxWidth: 420,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h1
          id="pending-heading"
          ref={headingRef}
          style={{
            fontFamily: 'JetBrains Mono, Fira Code, IBM Plex Mono, monospace',
            fontWeight: 700,
            fontSize: '2.5rem',
            color: '#00112c',
            marginBottom: '1.5rem',
          }}
          tabIndex={-1}
        >
          ⏳ Payment Pending
        </h1>
        <p
          style={{
            fontSize: '1.15rem',
            color: '#333',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          Your payment is being processed. You will receive an update soon.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            background: '#00112c',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.1rem',
            padding: '0.85rem 2.25rem',
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
          Return to Home
        </Link>
      </div>
    </main>
  );
} 