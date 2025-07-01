import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import CheckoutPage from '@/app/checkout/page'

// Mock the AdyenCheckout component
jest.mock('@/components/AdyenCheckout', () => {
  return function MockAdyenCheckout() {
    return <div data-testid="adyen-checkout">Mock Adyen Checkout Component</div>
  }
})

describe('CheckoutPage', () => {
  it('renders checkout page with correct structure', () => {
    const { getByText, getByRole, getByTestId, getAllByRole } = render(<CheckoutPage />)
    
    // Check main heading
    expect(getByText('Adyen Checkout Demo')).toBeInTheDocument()
    
    // Check subtitle
    expect(getByText('Complete a test payment securely with Adyen')).toBeInTheDocument()
    
    // Check order summary
    expect(getByText('Order Summary')).toBeInTheDocument()
    expect(getByText('Demo Product')).toBeInTheDocument()
    expect(getByText('Test payment for Adyen integration')).toBeInTheDocument()
    expect(getByText('€10.00')).toBeInTheDocument()
    
    // Check payment section
    expect(getByText('Payment Method')).toBeInTheDocument()
    
    // Check footer
    expect(getByText(/Your payment information is encrypted and secure/)).toBeInTheDocument()
  })

  it('renders return to home button', () => {
    const { getByRole } = render(<CheckoutPage />)
    
    const returnButton = getByRole('link', { name: /return to home/i })
    expect(returnButton).toBeInTheDocument()
    expect(returnButton).toHaveAttribute('href', '/')
  })

  it('renders Adyen checkout component', () => {
    const { getByTestId, getByText } = render(<CheckoutPage />)
    
    expect(getByTestId('adyen-checkout')).toBeInTheDocument()
    expect(getByText('Mock Adyen Checkout Component')).toBeInTheDocument()
  })

  it('has correct styling classes and structure', () => {
    const { getByRole } = render(<CheckoutPage />)
    
    // Check main container
    const main = getByRole('main')
    expect(main).toBeInTheDocument()
    
    // Check that the page has the expected layout structure
    expect(main).toHaveStyle({
      background: '#F5F5F5',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Inter, Roboto, Open Sans, Arial, sans-serif'
    })
  })

  it('displays correct order information', () => {
    const { getByText } = render(<CheckoutPage />)
    
    // Check order details
    expect(getByText('Demo Product')).toBeInTheDocument()
    expect(getByText('Test payment for Adyen integration')).toBeInTheDocument()
    expect(getByText('€10.00')).toBeInTheDocument()
  })

  it('has accessible navigation', () => {
    const { getByRole } = render(<CheckoutPage />)
    
    const returnButton = getByRole('link', { name: /return to home/i })
    expect(returnButton).toHaveAttribute('aria-label', 'Return to home')
    expect(returnButton).toHaveAttribute('tabIndex', '0')
  })

  it('has proper heading hierarchy', () => {
    const { getByRole, getAllByRole } = render(<CheckoutPage />)
    
    // Main heading should be h1
    const mainHeading = getByRole('heading', { level: 1 })
    expect(mainHeading).toHaveTextContent('Adyen Checkout Demo')
    
    // Section headings should be h2
    const sectionHeadings = getAllByRole('heading', { level: 2 })
    expect(sectionHeadings).toHaveLength(2)
    expect(sectionHeadings[0]).toHaveTextContent('Order Summary')
    expect(sectionHeadings[1]).toHaveTextContent('Payment Method')
  })

  it('displays security message in footer', () => {
    const { getByText } = render(<CheckoutPage />)
    
    const securityMessage = getByText(/Your payment information is encrypted and secure/)
    expect(securityMessage).toBeInTheDocument()
    expect(securityMessage).toHaveTextContent('Your payment information is encrypted and secure')
  })
}) 