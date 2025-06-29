'use client';

import { useEffect, useRef } from 'react';
import { AdyenCheckout, Dropin, Card, SepaDirectDebit } from '@adyen/adyen-web';
import '@adyen/adyen-web/styles/adyen.css';

export default function AdyenCheckoutComponent() {
  const dropinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function initCheckout() {
      try {
        console.log('🔧 Initializing Adyen checkout...');
        
        const sessionRes = await fetch('/api/sessions', { method: 'POST' }).then(res => res.json());
        console.log('📋 Session response (non-sensitive):', {
          sessionId: sessionRes.session?.id,
          expiresAt: sessionRes.session?.expiresAt,
          returnUrl: sessionRes.session?.returnUrl,
          amount: sessionRes.session?.amount,
          countryCode: sessionRes.session?.countryCode,
          shopperLocale: sessionRes.session?.shopperLocale,
          reference: sessionRes.session?.reference,
          mode: sessionRes.session?.mode,
          // sessionData is intentionally excluded as it's sensitive
        });

        if (!sessionRes.session) {
          console.error('❌ No session data received');
          return;
        }

        // Core config for AdyenCheckout
        const coreConfig = {
          environment: 'test' as const,
          clientKey: process.env.NEXT_PUBLIC_ADYEN_CLIENT_KEY!,
          session: sessionRes.session,
          analytics: { enabled: false },
        };

        console.log('⚙️ Core config (non-sensitive):', {
          environment: coreConfig.environment,
          clientKey: coreConfig.clientKey ? '[REDACTED]' : undefined,
          sessionId: coreConfig.session?.id,
          analytics: coreConfig.analytics,
        });

        // Drop-in specific config - removed Apple Pay and Google Pay to avoid CSP issues
        const dropinConfig = {
          paymentMethodsConfiguration: {
            card: {},
            sepadirectdebit: {},
          },
          paymentMethodComponents: [Card, SepaDirectDebit],
          onSubmit: async (state: any, dropin: any) => {
            console.log('🚀 Payment submitted');
            console.log('📊 Payment state (non-sensitive):', {
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
            } catch (err: any) {
              alert('Payment failed: ' + (err?.message || 'Unknown error'));
              dropin.setStatus('error');
            }
          },
          onAdditionalDetails: async (state: any, dropin: any) => {
            console.log('📝 Additional details required');
            console.log('📊 Additional details (non-sensitive):', {
              hasData: !!state.data,
              dataKeys: Object.keys(state.data || {}),
              // Don't log actual details as they're sensitive
            });
          },
          onError: (error: any, component: any) => {
            console.error('❌ Payment error:', error.message);
            console.error('🔧 Component type:', component?.constructor?.name);
          },
          onPaymentCompleted: (result: any, component: any) => {
            console.log('✅ Payment completed successfully!');
            console.log('📋 Result (non-sensitive):', {
              resultCode: result.resultCode,
              hasSessionData: !!result.sessionData,
              hasSessionResult: !!result.sessionResult,
              // Don't log actual session data as it's sensitive
            });
            
            // Handle successful payment
            if (result.resultCode === 'Authorised') {
              alert('Payment successful! Result: ' + result.resultCode);
            } else {
              alert('Payment completed with result: ' + result.resultCode);
            }
          },
          onPaymentFailed: (result: any, component: any) => {
            console.log('❌ Payment failed!');
            console.log('📋 Result (non-sensitive):', {
              resultCode: result?.resultCode,
              hasSessionData: !!result?.sessionData,
              hasSessionResult: !!result?.sessionResult,
              // Don't log actual session data as it's sensitive
            });
            
            // Handle failed payment
            alert('Payment failed: ' + (result?.resultCode || 'Unknown error'));
          },
          onActionHandled: (actionHandled: any) => {
            console.log('🎭 Action handled:', {
              componentType: actionHandled.componentType,
              actionDescription: actionHandled.actionDescription,
              // Don't log action details as they might be sensitive
            });
          },
          onChange: (state: any, component: any) => {
            console.log('🔄 Payment method changed');
            console.log('📊 Change state (non-sensitive):', {
              isValid: state.isValid,
              dataKeys: Object.keys(state.data || {}),
              // Don't log actual payment data as it's sensitive
            });
          },
        };

        console.log('⚙️ Drop-in config (non-sensitive):', {
          paymentMethodsCount: Object.keys(dropinConfig.paymentMethodsConfiguration).length,
          paymentMethodComponentsCount: dropinConfig.paymentMethodComponents.length,
          hasEventHandlers: true,
        });

        const checkout = await AdyenCheckout(coreConfig);
        console.log('✅ AdyenCheckout initialized');
        
        const dropin = new Dropin(checkout, dropinConfig);
        console.log('✅ Dropin created');
        
        dropin.mount(dropinRef.current!);
        console.log('✅ Dropin mounted successfully');
        
      } catch (error) {
        console.error('❌ Failed to initialize Adyen checkout:', error instanceof Error ? error.message : 'Unknown error');
        alert('Failed to initialize payment form: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    }

    initCheckout();
  }, []);

  return (
    <div>
      <h2>Adyen Payment Form</h2>
      <div ref={dropinRef} />
    </div>
  );
}