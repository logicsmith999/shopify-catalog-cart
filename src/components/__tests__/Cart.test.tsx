import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { Cart } from '@/components/Cart'
import { mockCartItem } from '@/test/test-utils'
import type { CartItem } from '@/types'

const mockCartContext = {
  cartItems: [] as CartItem[],
  addToCart: vi.fn(),
  removeFromCart: vi.fn(),
  updateQuantity: vi.fn(),
  clearCart: vi.fn(),
  getTotalItems: vi.fn(() => 0),
  getSubtotal: vi.fn(() => 0),
  saveCartToApi: vi.fn(),
  isSaving: false,
  lastError: null,
  hasUnsavedChanges: false,
  clearError: vi.fn()
}

vi.mock('../../hooks/useCart', () => ({
  useCart: () => mockCartContext
}))

describe('Cart', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mockCartContext.cartItems = []
    mockCartContext.getTotalItems.mockReturnValue(0)
    mockCartContext.getSubtotal.mockReturnValue(0)
    mockCartContext.hasUnsavedChanges = false
    mockCartContext.isSaving = false
    mockCartContext.lastError = null
  })

  it('should render empty cart message when no items', () => {
    render(<Cart />)

    expect(screen.getByText('Shopping Cart')).toBeInTheDocument()
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  it('should render cart items when cart has items', () => {
    mockCartContext.cartItems = [mockCartItem]
    mockCartContext.getTotalItems.mockReturnValue(2)
    mockCartContext.getSubtotal.mockReturnValue(2000)

    render(<Cart />)

    expect(screen.getByText('Shopping Cart (2 items)')).toBeInTheDocument()
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$10.00 each')).toBeInTheDocument()

    const priceElements = screen.getAllByText('$20.00')
    expect(priceElements.length).toBeGreaterThan(0)
  })

  it('should render singular item text for single item', () => {
    const singleItem = { ...mockCartItem, quantity: 1 }
    mockCartContext.cartItems = [singleItem]
    mockCartContext.getTotalItems.mockReturnValue(1)

    render(<Cart />)

    expect(screen.getByText('Shopping Cart (1 item)')).toBeInTheDocument()
  })

  it('should call updateQuantity when quantity buttons are clicked', async () => {
    const user = userEvent.setup()
    mockCartContext.cartItems = [mockCartItem]

    render(<Cart />)

    const increaseButton = screen.getByLabelText(/increase quantity of test product/i)
    const decreaseButton = screen.getByLabelText(/decrease quantity of test product/i)

    await user.click(increaseButton)
    expect(mockCartContext.updateQuantity).toHaveBeenCalledWith('test-product', 3)

    await user.click(decreaseButton)
    expect(mockCartContext.updateQuantity).toHaveBeenCalledWith('test-product', 1)
  })

  it('should call removeFromCart when remove button is clicked', async () => {
    const user = userEvent.setup()
    mockCartContext.cartItems = [mockCartItem]

    render(<Cart />)

    const removeButton = screen.getByLabelText(/remove test product from cart/i)
    await user.click(removeButton)

    expect(mockCartContext.removeFromCart).toHaveBeenCalledWith('test-product')
  })

  it('should call clearCart when clear cart button is clicked', async () => {
    const user = userEvent.setup()
    mockCartContext.cartItems = [mockCartItem]

    render(<Cart />)

    const clearButton = screen.getByText('Clear Cart')
    await user.click(clearButton)

    expect(mockCartContext.clearCart).toHaveBeenCalled()
  })

  it('should show unsaved changes indicator when hasUnsavedChanges is true', () => {
    mockCartContext.cartItems = [mockCartItem]
    mockCartContext.hasUnsavedChanges = true

    render(<Cart />)

    expect(screen.getByText('Unsaved changes')).toBeInTheDocument()
  })

  it('should not show unsaved changes indicator when hasUnsavedChanges is false', () => {
    mockCartContext.cartItems = [mockCartItem]
    mockCartContext.hasUnsavedChanges = false

    render(<Cart />)

    expect(screen.queryByText('Unsaved changes')).not.toBeInTheDocument()
  })

  it('should enable save cart button when hasUnsavedChanges is true', () => {
    mockCartContext.cartItems = [mockCartItem]
    mockCartContext.hasUnsavedChanges = true

    render(<Cart />)

    const saveButton = screen.getByRole('button', { name: /save cart/i })
    expect(saveButton).not.toBeDisabled()
  })

  it('should disable save cart button when hasUnsavedChanges is false', () => {
    mockCartContext.cartItems = [mockCartItem]
    mockCartContext.hasUnsavedChanges = false

    render(<Cart />)

    const saveButton = screen.getByRole('button', { name: /save cart/i })
    expect(saveButton).toBeDisabled()
  })

  it('should show saving state when isSaving is true', () => {
    mockCartContext.cartItems = [mockCartItem]
    mockCartContext.hasUnsavedChanges = true
    mockCartContext.isSaving = true

    render(<Cart />)

    expect(screen.getByText('Saving...')).toBeInTheDocument()
    const saveButton = screen.getByRole('button', { name: /saving/i })
    expect(saveButton).toBeDisabled()
  })

  it('should call saveCartToApi when save cart button is clicked', async () => {
    const user = userEvent.setup()
    mockCartContext.cartItems = [mockCartItem]
    mockCartContext.hasUnsavedChanges = true

    render(<Cart />)

    const saveButton = screen.getByRole('button', { name: /save cart/i })
    await user.click(saveButton)

    expect(mockCartContext.saveCartToApi).toHaveBeenCalled()
  })

  it('should display correct subtotal', () => {
    mockCartContext.cartItems = [mockCartItem]
    mockCartContext.getSubtotal.mockReturnValue(2000)

    render(<Cart />)

    const priceElements = screen.getAllByText('$20.00')
    expect(priceElements).toHaveLength(2)
  })
})
