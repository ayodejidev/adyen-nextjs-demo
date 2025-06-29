'use client';

export default function Home() {
  const createGitHubIssue = () => {
    const issueTitle = encodeURIComponent('Adyen Next.js Demo - Feedback or Issue');
    const issueBody = encodeURIComponent(`## Issue Description
Please describe the issue or feedback you have with the Adyen Next.js demo.

## Steps to Reproduce
1. 
2. 
3. 

## Expected Behavior

## Actual Behavior

## Environment
- Browser: ${navigator.userAgent}
- URL: ${window.location.href}
- Date: ${new Date().toISOString()}

## Additional Information
`);
    
    const githubUrl = `https://github.com/ayodejidev/adyen-nextjs-demo/issues/new?title=${issueTitle}&body=${issueBody}`;
    window.open(githubUrl, '_blank');
  };

  return (
    <main
      style={{
        background: '#F5F5F5',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'Inter, Roboto, Open Sans, Arial, sans-serif',
      }}
      aria-labelledby="home-heading"
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
        {/* Header */}
        <div
          style={{
            background: '#00112c',
            color: '#fff',
            padding: '2.5rem 2rem',
            textAlign: 'center',
          }}
        >
          <h1
            id="home-heading"
            style={{
              fontFamily: 'JetBrains Mono, Fira Code, IBM Plex Mono, monospace',
              fontWeight: 700,
              fontSize: '2.5rem',
              margin: 0,
              marginBottom: '1rem',
            }}
            tabIndex={-1}
          >
            Adyen Next.js Demo
          </h1>
          <p
            style={{
              margin: 0,
              opacity: 0.9,
              fontSize: '1.1rem',
              maxWidth: 600,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            A demo of Adyen Web Drop-in v6 integration with Next.js 13+ (App Router)
          </p>
        </div>

        {/* Features */}
        <div style={{ padding: '2rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#00112c',
              margin: '0 0 1.5rem 0',
            }}
          >
            Features
          </h2>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 2rem 0',
              color: '#00112c',
              fontWeight: 500,
            }}
          >
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#00112c', fontSize: '1.2rem', marginRight: 12 }}>✅</span>
              Secure session-based payment flow
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#00112c', fontSize: '1.2rem', marginRight: 12 }}>✅</span>
              Card & SEPA Direct Debit support
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#00112c', fontSize: '1.2rem', marginRight: 12 }}>✅</span>
              Outcome pages for success, pending, and failed payments
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#00112c', fontSize: '1.2rem', marginRight: 12 }}>✅</span>
              Modern, accessible UI with brand consistency
            </li>
            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#00112c', fontSize: '1.2rem', marginRight: 12 }}>✅</span>
              Secure API routes with environment variable management
            </li>
          </ul>

          {/* CTA Button */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <a
              href="/checkout"
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
              aria-label="Start checkout"
              onFocus={e => (e.currentTarget.style.background = '#1a2b4a')}
              onBlur={e => (e.currentTarget.style.background = '#00112c')}
              onMouseEnter={e => (e.currentTarget.style.background = '#1a2b4a')}
              onMouseLeave={e => (e.currentTarget.style.background = '#00112c')}
            >
              Start Checkout
            </a>
          </div>

          {/* Documentation Links */}
          <div
            style={{
              background: '#f8f9fa',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#00112c',
                margin: '0 0 1rem 0',
              }}
            >
              📚 Adyen Documentation
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
              }}
            >
              <a
                href="https://docs.adyen.com/online-payments/web-drop-in"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  padding: '1rem',
                  background: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #E0E0E0',
                  textDecoration: 'none',
                  color: '#00112c',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#1a2b4a';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(26, 43, 74, 0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E0E0E0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Web Drop-in</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Complete payment UI components</div>
              </a>
              
              <a
                href="https://docs.adyen.com/api-explorer/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  padding: '1rem',
                  background: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #E0E0E0',
                  textDecoration: 'none',
                  color: '#00112c',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#1a2b4a';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(26, 43, 74, 0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E0E0E0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Adyen APIs</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>API Explorer for Adyen</div>
              </a>
              
              <a
                href="https://docs.adyen.com/development-resources/test-cards"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  padding: '1rem',
                  background: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #E0E0E0',
                  textDecoration: 'none',
                  color: '#00112c',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#1a2b4a';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(26, 43, 74, 0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E0E0E0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Test Cards</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Test payment scenarios</div>
              </a>
              
              <a
                href="https://docs.adyen.com/online-payments/classic-integrations/security/webhooks"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  padding: '1rem',
                  background: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #E0E0E0',
                  textDecoration: 'none',
                  color: '#00112c',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#1a2b4a';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(26, 43, 74, 0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E0E0E0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Webhooks</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Payment status notifications</div>
              </a>
            </div>
          </div>

          {/* GitHub Issue */}
          <div
            style={{
              background: '#f8f9fa',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#00112c',
                margin: '0 0 1rem 0',
              }}
            >
              🐛 Found an Issue?
            </h3>
            <p
              style={{
                margin: '0 0 1.5rem 0',
                color: '#666',
                fontSize: '1rem',
              }}
            >
              Help improve this demo by reporting bugs or suggesting features
            </p>
            <button
              onClick={createGitHubIssue}
              style={{
                background: '#00112c',
                color: '#fff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1a2b4a')}
              onMouseLeave={e => (e.currentTarget.style.background = '#00112c')}
            >
              Create GitHub Issue
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
