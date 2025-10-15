import React, { type ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { CartProvider } from '@/contexts/CartContext'
import type { CartItem } from '@/types'

export const mockProduct = {
  id: 'test-product',
  title: 'Test Product',
  price: 1000,
  tags: ['Test']
}

export const mockCartItem: CartItem = {
  product: mockProduct,
  quantity: 2
}

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
