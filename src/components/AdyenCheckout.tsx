'use client';

import { useEffect, useRef, useState } from 'react';
import { AdyenCheckout, Dropin, Card, SepaDirectDebit } from '@adyen/adyen-web';
import '@adyen/adyen-web/styles/adyen.css';

export default function AdyenCheckoutComponent() {
  const dropinRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // @ts-ignore - Adyen session type is complex, using any for simplicity
  const [sessionRes, setSessionRes] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  // First effect: Create session and prepare data
  useEffect(() => {
    async function createSession() {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Creating Adyen session...');
        
        const sessionResponse = await fetch('/api/sessions', { method: 'POST' }).then(res => res.json());
        console.log('Session response (non-sensitive):', {
          sessionId: sessionResponse.session?.id,
          expiresAt: sessionResponse.session?.expiresAt,
          returnUrl: sessionResponse.session?.returnUrl,
          amount: sessionResponse.session?.amount,
          countryCode: sessionResponse.session?.countryCode,
          reference: sessionResponse.session?.reference,
        });
        
        setSessionRes(sessionResponse);

        if (!sessionResponse.session) {
          throw new Error('Failed to create payment session');
        }

        setIsReady(true);
        setIsLoading(false);
      } catch (err) {
        console.error('Session creation error:', err);
        setError('Failed to create payment session. Please refresh the page.');
        setIsLoading(false);
      }
    }

    createSession();
  }, []);

  // Second effect: Initialize Adyen Dropin when ready and DOM element exists
  useEffect(() => {
    if (!isReady || !dropinRef.current || !sessionRes?.session) {
      return;
    }

    async function initDropin() {
      try {
        console.log('Initializing Adyen Dropin...');
        
        const checkout = await AdyenCheckout({
          clientKey: process.env.NEXT_PUBLIC_ADYEN_CLIENT_KEY!,
          environment: 'test',
          session: sessionRes.session,
          analytics: { enabled: false },
          // @ts-ignore - Adyen callback types are complex
          onPaymentCompleted: (result: any) => {
            console.log('Payment completed:', result);
          },
                      onError: (error: Error) => {
              console.error('Adyen error:', error);
              setError('Payment initialization failed. Please refresh the page.');
          },
        });

        const dropin = new Dropin(checkout, {
          paymentMethodsConfiguration: {
            card: {
              hasHolderName: true,
              holderNameRequired: true,
              enableStoreDetails: true,
              name: 'Credit or debit card',
            },
            sepadirectdebit: {},
          },
          paymentMethodComponents: [Card, SepaDirectDebit],
          // @ts-ignore - Adyen onSubmit types are complex
          onSubmit: async (state: any, dropin: any) => {
                    console.log('Payment submitted');
        console.log('Payment state (non-sensitive):', {
              isValid: state.isValid,
              dataKeys: Object.keys(state.data || {}),
            });
            try {
              const res = await fetch('/api/payments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  paymentMethod: state.data.paymentMethod,
                  reference: sessionRes.session.reference,
                  amount: sessionRes.session.amount,
                }),
              }).then(r => r.json());

              if (res.action) {
                dropin.handleAction(res.action);
              } else if (res.resultCode) {
                if (res.resultCode === 'Authorised') {
                  window.location.href = '/checkout/success';
                  return;
                } else if (res.resultCode === 'Pending' || res.resultCode === 'Received') {
                  window.location.href = '/checkout/pending';
                  return;
                } else {
                  window.location.href = '/checkout/failed';
                  return;
                }
                dropin.setStatus('finished');
              } else if (res.error) {
                window.location.href = '/checkout/failed';
                dropin.setStatus('error');
              }
                    } catch (err) {
          console.error('Payment error:', err);
              window.location.href = '/checkout/failed';
              dropin.setStatus('error');
            }
          },
        });

        if (!dropinRef.current) {
          throw new Error('Payment form container not found');
        }

        dropin.mount(dropinRef.current);
        console.log('Adyen Dropin mounted successfully');
              } catch (err) {
          console.error('Dropin initialization error:', err);
        setError('Failed to initialize payment form. Please refresh the page.');
      }
    }

    initDropin();
  }, [isReady, sessionRes]);

  if (error) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '2rem',
          background: '#fff',
          borderRadius: '8px',
          border: '1px solid #ffcdd2',
        }}
      >
        <div style={{ color: '#d32f2f', fontSize: '1.2rem', marginBottom: '1rem' }}>
          Error: {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: '#00112c',
            color: '#fff',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Refresh Page
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          background: '#fff',
          borderRadius: '8px',
          border: '1px solid #E0E0E0',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '3px solid #E0E0E0',
            borderTop: '3px solid #00112c',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem',
          }}
        />
        <div style={{ color: '#00112c', fontSize: '1.1rem', fontWeight: 500 }}>
          Loading payment form...
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return <div ref={dropinRef} />;
}