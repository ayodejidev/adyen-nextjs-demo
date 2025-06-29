import { NextRequest } from 'next/server'
import { POST } from '@/app/api/payments/route'

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
const mockPayments = jest.fn()
jest.mock('@/utils/adyenClient', () => ({
  getAdyenCheckout: jest.fn(() => ({
    PaymentsApi: {
      payments: mockPayments
    }
  }))
}))

describe('/api/payments', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset environment variables
    process.env.ADYEN_MERCHANT_ACCOUNT = 'test_merchant_account'
  })

  it('processes payment successfully', async () => {
    const mockPaymentResponse = {
      resultCode: 'Authorised',
      pspReference: 'test-psp-reference',
      action: null
    }

    mockPayments.mockResolvedValue(mockPaymentResponse)

    const requestBody = {
      paymentMethod: { type: 'scheme' },
      reference: 'test-reference',
      amount: { currency: 'EUR', value: 1000 }
    }

    // Create a proper mock request with json method
    const mockRequest = {
      json: jest.fn().mockResolvedValue(requestBody)
    } as any

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual(mockPaymentResponse)

    expect(mockPayments).toHaveBeenCalledWith({
      ...requestBody,
      merchantAccount: 'test_merchant_account',
      returnUrl: 'http://localhost:3000/checkout'
    })
  })

  it('handles payment processing error', async () => {
    mockPayments.mockRejectedValue(new Error('Payment failed'))

    const requestBody = {
      paymentMethod: { type: 'scheme' },
      reference: 'test-reference',
      amount: { currency: 'EUR', value: 1000 }
    }

    const mockRequest = {
      json: jest.fn().mockResolvedValue(requestBody)
    } as any

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Payment failed')
  })

  it('handles invalid JSON request body', async () => {
    const mockRequest = {
      json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
    } as any

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Invalid JSON')
  })

  it('includes required fields in payment request', async () => {
    const mockPaymentResponse = {
      resultCode: 'Authorised',
      pspReference: 'test-psp-reference'
    }

    mockPayments.mockResolvedValue(mockPaymentResponse)

    const requestBody = {
      paymentMethod: { type: 'scheme', encryptedCardNumber: 'test' },
      reference: 'order_123',
      amount: { currency: 'EUR', value: 1000 }
    }

    const mockRequest = {
      json: jest.fn().mockResolvedValue(requestBody)
    } as any

    await POST(mockRequest)

    const callArgs = mockPayments.mock.calls[0][0]
    expect(callArgs).toEqual({
      paymentMethod: requestBody.paymentMethod,
      reference: requestBody.reference,
      amount: requestBody.amount,
      merchantAccount: 'test_merchant_account',
      returnUrl: 'http://localhost:3000/checkout'
    })
  })

  it('handles payment action response', async () => {
    const mockPaymentResponse = {
      resultCode: 'ChallengeShopper',
      pspReference: 'test-psp-reference',
      action: {
        type: 'challenge',
        paymentData: 'test-payment-data'
      }
    }

    mockPayments.mockResolvedValue(mockPaymentResponse)

    const requestBody = {
      paymentMethod: { type: 'scheme' },
      reference: 'test-reference',
      amount: { currency: 'EUR', value: 1000 }
    }

    const mockRequest = {
      json: jest.fn().mockResolvedValue(requestBody)
    } as any

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.action).toEqual(mockPaymentResponse.action)
  })

  it('handles different payment result codes', async () => {
    const testCases = [
      { resultCode: 'Authorised', expectedStatus: 200 },
      { resultCode: 'Pending', expectedStatus: 200 },
      { resultCode: 'Received', expectedStatus: 200 },
      { resultCode: 'Refused', expectedStatus: 200 }
    ]

    for (const testCase of testCases) {
      const mockPaymentResponse = {
        resultCode: testCase.resultCode,
        pspReference: 'test-psp-reference'
      }

      mockPayments.mockResolvedValue(mockPaymentResponse)

      const requestBody = {
        paymentMethod: { type: 'scheme' },
        reference: 'test-reference',
        amount: { currency: 'EUR', value: 1000 }
      }

      const mockRequest = {
        json: jest.fn().mockResolvedValue(requestBody)
      } as any

      const response = await POST(mockRequest)
      expect(response.status).toBe(testCase.expectedStatus)
    }
  })
}) 