export interface Product {
  id: string;
  title: string;
  price: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  // Save cart to API
  saveCartToApi: () => Promise<void>;
  isSaving: boolean;
  lastError: string | null;
  hasUnsavedChanges: boolean;
  clearError: () => void;
}

export enum SortOption {
  PRICE_ASC = 'price-asc',
  PRICE_DESC = 'price-desc'
}
