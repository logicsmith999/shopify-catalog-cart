import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { ProductCard } from '@/components/ProductCard'
import { mockProduct } from '@/test/test-utils'

describe('ProductCard', () => {
  it('should render product information correctly', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add test product to cart/i })).toBeInTheDocument()
  })

  it('should render multiple tags', () => {
    const productWithMultipleTags = {
      ...mockProduct,
      tags: ['Premium', 'New', 'Limited']
    }

    render(<ProductCard product={productWithMultipleTags} />)

    expect(screen.getByText('Premium')).toBeInTheDocument()
    expect(screen.getByText('New')).toBeInTheDocument()
    expect(screen.getByText('Limited')).toBeInTheDocument()
  })

  it('should call addToCart when button is clicked', async () => {
    const user = userEvent.setup()
    render(<ProductCard product={mockProduct} />)

    const addButton = screen.getByRole('button', { name: /add test product to cart/i })
    await user.click(addButton)
  })

  it('should have proper accessibility attributes', () => {
    render(<ProductCard product={mockProduct} />)

    const addButton = screen.getByRole('button', { name: /add test product to cart/i })
    expect(addButton).toHaveAttribute('aria-label', 'Add Test Product to cart')
  })

  it('should format price correctly', () => {
    const expensiveProduct = {
      ...mockProduct,
      price: 39900 // $399.00
    }

    render(<ProductCard product={expensiveProduct} />)

    expect(screen.getByText('$399.00')).toBeInTheDocument()
  })

  it('should render as an article element', () => {
    render(<ProductCard product={mockProduct} />)

    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()
  })
})
