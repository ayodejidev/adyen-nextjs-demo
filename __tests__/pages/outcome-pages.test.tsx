import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import CheckoutSuccess from '@/app/checkout/success/page'
import CheckoutFailed from '@/app/checkout/failed/page'
import CheckoutPending from '@/app/checkout/pending/page'

describe('Outcome Pages', () => {
  describe('Success Page', () => {
    it('has consistent styling structure', () => {
      const { getByRole } = render(<CheckoutSuccess />)
      const main = getByRole('main')
      expect(main).toBeInTheDocument()
      expect(main).toHaveAttribute('aria-labelledby')
      expect(main).toHaveStyle({
        background: 'rgb(245, 245, 245)',
      })
    })
    it('has proper focus management', () => {
      const { getByRole } = render(<CheckoutSuccess />)
      const heading = getByRole('heading', { level: 1 })
      expect(heading).toHaveAttribute('id', 'success-heading')
      expect(heading).toHaveAttribute('tabIndex', '-1')
    })
    it('has consistent button styling', () => {
      const { getByText } = render(<CheckoutSuccess />)
      const button = getByText('Return to Home')
      expect(button).toHaveStyle({
        display: 'inline-block',
        background: '#00112c',
        color: '#fff',
        fontWeight: '600',
        fontSize: '1.1rem',
        padding: '0.85rem 2.25rem',
        borderRadius: '8px',
        textDecoration: 'none',
      })
    })
  })
  describe('Failed Page', () => {
    it('has consistent styling structure', () => {
      const { getByRole } = render(<CheckoutFailed />)
      const main = getByRole('main')
      expect(main).toBeInTheDocument()
      expect(main).toHaveAttribute('aria-labelledby')
      expect(main).toHaveStyle({
        background: 'rgb(245, 245, 245)',
      })
    })
    it('has proper focus management', () => {
      const { getByRole } = render(<CheckoutFailed />)
      const heading = getByRole('heading', { level: 1 })
      expect(heading).toHaveAttribute('id', 'failed-heading')
      expect(heading).toHaveAttribute('tabIndex', '-1')
    })
    it('has consistent button styling', () => {
      const { getByText } = render(<CheckoutFailed />)
      const button = getByText('Return to Checkout')
      expect(button).toHaveStyle({
        display: 'inline-block',
        background: '#00112c',
        color: '#fff',
        fontWeight: '600',
        fontSize: '1.1rem',
        padding: '0.85rem 2.25rem',
        borderRadius: '8px',
        textDecoration: 'none',
      })
    })
  })
  describe('Pending Page', () => {
    it('has consistent styling structure', () => {
      const { getByRole } = render(<CheckoutPending />)
      const main = getByRole('main')
      expect(main).toBeInTheDocument()
      expect(main).toHaveAttribute('aria-labelledby')
      expect(main).toHaveStyle({
        background: 'rgb(245, 245, 245)',
      })
    })
    it('has proper focus management', () => {
      const { getByRole } = render(<CheckoutPending />)
      const heading = getByRole('heading', { level: 1 })
      expect(heading).toHaveAttribute('id', 'pending-heading')
      expect(heading).toHaveAttribute('tabIndex', '-1')
    })
    it('has consistent button styling', () => {
      const { getByText } = render(<CheckoutPending />)
      const button = getByText('Return to Home')
      expect(button).toHaveStyle({
        display: 'inline-block',
        background: '#00112c',
        color: '#fff',
        fontWeight: '600',
        fontSize: '1.1rem',
        padding: '0.85rem 2.25rem',
        borderRadius: '8px',
        textDecoration: 'none',
      })
    })
  })
}) 