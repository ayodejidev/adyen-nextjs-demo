import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import AdyenCheckoutComponent from '@/components/AdyenCheckout'

// Mock the Adyen CSS import
jest.mock('@adyen/adyen-web/styles/adyen.css', () => ({}), { virtual: true })

describe('AdyenCheckoutComponent', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
    
    // Mock successful session creation
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          session: {
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
        })
      })
    ) as jest.Mock
  })

  it('renders loading state initially', async () => {
    render(<AdyenCheckoutComponent />)
    // Check for loading text
    expect(screen.getByText('Loading payment form...')).toBeInTheDocument()
    // Check for spinner by style
    expect(screen.getByText('Loading payment form...').previousSibling).toBeTruthy()
  })

  it('creates session and initializes Adyen Dropin on mount', async () => {
    render(<AdyenCheckoutComponent />)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/sessions', {
        method: 'POST'
      })
    }, { timeout: 3000 })
  })

  it('handles session creation error gracefully', async () => {
    // Mock failed session creation
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock

    render(<AdyenCheckoutComponent />)
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to create payment session/)).toBeInTheDocument()
    }, { timeout: 3000 })
    
    expect(screen.getByRole('button', { name: /refresh page/i })).toBeInTheDocument()
  })

  it('handles API error response', async () => {
    // Mock API error response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ error: 'Session creation failed' })
      })
    ) as jest.Mock

    render(<AdyenCheckoutComponent />)
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to create payment session/)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('shows refresh button when error occurs', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock

    render(<AdyenCheckoutComponent />)
    
    await waitFor(() => {
      const refreshButton = screen.getByRole('button', { name: /refresh page/i })
      expect(refreshButton).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('calls window.location.reload when refresh button is clicked', async () => {
    // Mock window.location.reload
    const mockReload = jest.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true
    })

    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock

    render(<AdyenCheckoutComponent />)
    
    await waitFor(() => {
      const refreshButton = screen.getByRole('button', { name: /refresh page/i })
      fireEvent.click(refreshButton)
      expect(mockReload).toHaveBeenCalled()
    }, { timeout: 3000 })
  })

  it('handles missing session data', async () => {
    // Mock response without session
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({})
      })
    ) as jest.Mock

    render(<AdyenCheckoutComponent />)
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to create payment session/)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('logs session creation process', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    
    render(<AdyenCheckoutComponent />)
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('🔧 Creating Adyen session...')
    }, { timeout: 3000 })
    
    consoleSpy.mockRestore()
  })

  it('logs session response data', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    
    render(<AdyenCheckoutComponent />)
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        '📋 Session response (non-sensitive):',
        expect.objectContaining({
          sessionId: 'test-session-id'
        })
      )
    }, { timeout: 3000 })
    
    consoleSpy.mockRestore()
  })
}) 