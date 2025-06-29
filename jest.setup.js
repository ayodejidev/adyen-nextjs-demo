import '@testing-library/jest-dom'

// Polyfill Web API Request/Headers/FormData for Next.js API route tests
const fetch = require('node-fetch');
global.Request = fetch.Request;
global.Headers = fetch.Headers;
global.FormData = fetch.FormData;

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    }
  },
}))

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }
})

// Mock environment variables
process.env.NEXT_PUBLIC_ADYEN_CLIENT_KEY = 'test_client_key'
process.env.ADYEN_API_KEY = 'test_api_key'
process.env.ADYEN_MERCHANT_ACCOUNT = 'test_merchant_account'

// Mock fetch globally
global.fetch = jest.fn()

// Mock Adyen Web
jest.mock('@adyen/adyen-web', () => ({
  AdyenCheckout: jest.fn(() => Promise.resolve({
    create: jest.fn(),
    mount: jest.fn(),
  })),
  Dropin: jest.fn().mockImplementation(() => ({
    mount: jest.fn(),
    unmount: jest.fn(),
    setStatus: jest.fn(),
    handleAction: jest.fn(),
  })),
  Card: jest.fn(),
  SepaDirectDebit: jest.fn(),
}))

// Mock Adyen API Library
jest.mock('@adyen/api-library', () => ({
  Client: jest.fn(),
  Config: jest.fn(),
  CheckoutAPI: jest.fn(),
}))

// Suppress console.log in tests unless explicitly needed
const originalConsoleLog = console.log
beforeAll(() => {
  console.log = jest.fn()
})

afterAll(() => {
  console.log = originalConsoleLog
}) 