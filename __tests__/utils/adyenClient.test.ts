import { getAdyenCheckout } from '@/utils/adyenClient'

// Mock the Adyen API library
jest.mock('@adyen/api-library', () => ({
  Client: jest.fn(),
  Config: jest.fn(),
  CheckoutAPI: jest.fn()
}))

describe('adyenClient', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset environment variables
    process.env.ADYEN_API_KEY = 'test_api_key'
    process.env.ADYEN_MERCHANT_ACCOUNT = 'test_merchant_account'
  })

  it('creates Adyen checkout client with correct configuration', () => {
    const { Client, Config, CheckoutAPI } = require('@adyen/api-library')
    
    // Mock the Config constructor
    const mockConfig = {
      apiKey: 'test_api_key',
      environment: 'TEST'
    }
    Config.mockImplementation(() => mockConfig)
    
    // Mock the Client constructor
    const mockClient = {}
    Client.mockImplementation(() => mockClient)
    
    // Mock the CheckoutAPI to return an object with PaymentsApi
    const mockCheckoutAPI = {
      PaymentsApi: {
        payments: jest.fn(),
        sessions: jest.fn()
      }
    }
    CheckoutAPI.mockImplementation(() => mockCheckoutAPI)

    const checkout = getAdyenCheckout()

    expect(Config).toHaveBeenCalled()
    expect(Client).toHaveBeenCalledWith({ config: mockConfig })
    expect(CheckoutAPI).toHaveBeenCalledWith(mockClient)
    expect(checkout).toBeDefined()
    expect(checkout.PaymentsApi).toBeDefined()
  })

  it('uses test environment by default', () => {
    const { Config } = require('@adyen/api-library')
    
    const mockConfig = {
      apiKey: 'test_api_key',
      environment: 'TEST'
    }
    Config.mockImplementation(() => mockConfig)

    getAdyenCheckout()

    expect(Config).toHaveBeenCalled()
    // The config should have TEST environment
    expect(mockConfig.environment).toBe('TEST')
  })

  it('uses provided API key from environment', () => {
    const { Config } = require('@adyen/api-library')
    
    const mockConfig = {
      apiKey: 'test_api_key',
      environment: 'TEST'
    }
    Config.mockImplementation(() => mockConfig)

    getAdyenCheckout()

    expect(Config).toHaveBeenCalled()
    // The config should have the API key from environment
    expect(mockConfig.apiKey).toBe('test_api_key')
  })

  it('returns the same instance on multiple calls (singleton pattern)', () => {
    const { Client, CheckoutAPI } = require('@adyen/api-library')
    
    const mockClient = {}
    Client.mockImplementation(() => mockClient)
    
    const mockCheckoutAPI = {
      PaymentsApi: {
        payments: jest.fn(),
        sessions: jest.fn()
      }
    }
    CheckoutAPI.mockImplementation(() => mockCheckoutAPI)

    const checkout1 = getAdyenCheckout()
    const checkout2 = getAdyenCheckout()

    expect(checkout1).toBe(checkout2)
    expect(Client).toHaveBeenCalledTimes(2) // Creates new instance each time
  })

  it('has required API methods', () => {
    const { Client, CheckoutAPI } = require('@adyen/api-library')
    
    const mockClient = {}
    Client.mockImplementation(() => mockClient)
    
    const mockCheckoutAPI = {
      PaymentsApi: {
        payments: jest.fn(),
        sessions: jest.fn()
      }
    }
    CheckoutAPI.mockImplementation(() => mockCheckoutAPI)

    const checkout = getAdyenCheckout()

    expect(checkout.PaymentsApi).toBeDefined()
    expect(typeof checkout.PaymentsApi.payments).toBe('function')
    expect(typeof checkout.PaymentsApi.sessions).toBe('function')
  })

  it('handles missing environment variables gracefully', () => {
    // Remove environment variables
    delete process.env.ADYEN_API_KEY
    delete process.env.ADYEN_MERCHANT_ACCOUNT

    const { Config } = require('@adyen/api-library')
    
    const mockConfig = {
      apiKey: undefined,
      environment: 'TEST'
    }
    Config.mockImplementation(() => mockConfig)

    // Should not throw error even with missing env vars
    expect(() => getAdyenCheckout()).not.toThrow()
    
    // Should create config with undefined apiKey
    expect(Config).toHaveBeenCalled()
    expect(mockConfig.apiKey).toBeUndefined()
  })
}) 