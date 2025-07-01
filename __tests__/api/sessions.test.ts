import { NextRequest } from 'next/server'
import { POST } from '@/app/api/sessions/route'

// Mock NextResponse without requiring the actual module
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn((data, options) => ({
      json: () => Promise.resolve(data),
      status: options?.status || 200,
      headers: options?.headers || {},
    })),
  },
}))

// Mock the Adyen client
const mockSessions = jest.fn()
jest.mock('@/utils/adyenClient', () => ({
  getAdyenCheckout: jest.fn(() => ({
    PaymentsApi: {
      sessions: mockSessions
    }
  }))
}))

describe('/api/sessions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset environment variables
    process.env.ADYEN_MERCHANT_ACCOUNT = 'test_merchant_account'
    process.env.ADYEN_API_KEY = 'test_api_key'
  })

  it('creates a session successfully', async () => {
    const mockSessionResponse = {
      id: 'test-session-id',
      sessionData: 'test-session-data',
      expiresAt: '2025-12-31T23:59:59.000Z',
      returnUrl: 'http://localhost:3000/checkout',
      amount: { currency: 'EUR', value: 1000 },
      countryCode: 'NL',
      shopperLocale: 'nl-NL',
      reference: 'test-reference',
      mode: 'embedded'
    }

    mockSessions.mockResolvedValue(mockSessionResponse)

    const response = await POST()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.session).toEqual({
      id: mockSessionResponse.id,
      sessionData: mockSessionResponse.sessionData,
      expiresAt: mockSessionResponse.expiresAt,
      returnUrl: mockSessionResponse.returnUrl,
      amount: mockSessionResponse.amount,
      countryCode: mockSessionResponse.countryCode,
      shopperLocale: mockSessionResponse.shopperLocale,
      reference: mockSessionResponse.reference,
      mode: mockSessionResponse.mode
    })

    expect(mockSessions).toHaveBeenCalledWith({
      merchantAccount: 'test_merchant_account',
      countryCode: 'NL',
      shopperLocale: 'nl-NL',
      amount: { currency: 'EUR', value: 1000 },
      returnUrl: 'http://localhost:3000/checkout',
      reference: expect.stringMatching(/^order_\d+$/)
    })
  })

  it('handles session creation error', async () => {
    mockSessions.mockRejectedValue(new Error('API Error'))

    const response = await POST()
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('API Error')
  })

  it('logs session creation process', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    
    const mockSessionResponse = {
      id: 'test-session-id',
      sessionData: 'test-session-data',
      expiresAt: '2025-12-31T23:59:59.000Z',
      returnUrl: 'http://localhost:3000/checkout',
      amount: { currency: 'EUR', value: 1000 },
      countryCode: 'NL',
      shopperLocale: 'nl-NL',
      reference: 'test-reference',
      mode: 'embedded'
    }

    mockSessions.mockResolvedValue(mockSessionResponse)

    await POST()

    expect(consoleSpy).toHaveBeenCalledWith('Creating Adyen session...')
    expect(consoleSpy).toHaveBeenCalledWith('Merchant Account:', 'test_merchant_account')
    expect(consoleSpy).toHaveBeenCalledWith('API Key exists:', true)
    expect(consoleSpy).toHaveBeenCalledWith('Session created successfully')

    consoleSpy.mockRestore()
  })

  it('generates unique order reference', async () => {
    const mockSessionResponse = {
      id: 'test-session-id',
      sessionData: 'test-session-data',
      expiresAt: '2025-12-31T23:59:59.000Z',
      returnUrl: 'http://localhost:3000/checkout',
      amount: { currency: 'EUR', value: 1000 },
      countryCode: 'NL',
      shopperLocale: 'nl-NL',
      reference: 'test-reference',
      mode: 'embedded'
    }

    mockSessions.mockResolvedValue(mockSessionResponse)

    await POST()

    const callArgs = mockSessions.mock.calls[0][0]
    expect(callArgs.reference).toMatch(/^order_\d+$/)
  })

  it('uses correct session request parameters', async () => {
    const mockSessionResponse = {
      id: 'test-session-id',
      sessionData: 'test-session-data',
      expiresAt: '2025-12-31T23:59:59.000Z',
      returnUrl: 'http://localhost:3000/checkout',
      amount: { currency: 'EUR', value: 1000 },
      countryCode: 'NL',
      shopperLocale: 'nl-NL',
      reference: 'test-reference',
      mode: 'embedded'
    }

    mockSessions.mockResolvedValue(mockSessionResponse)

    await POST()

    const callArgs = mockSessions.mock.calls[0][0]
    expect(callArgs).toEqual({
      merchantAccount: 'test_merchant_account',
      countryCode: 'NL',
      shopperLocale: 'nl-NL',
      amount: { currency: 'EUR', value: 1000 },
      returnUrl: 'http://localhost:3000/checkout',
      reference: expect.stringMatching(/^order_\d+$/)
    })
  })
}) 