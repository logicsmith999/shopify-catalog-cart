import React, { useReducer, useEffect, useState, type ReactNode, createContext } from 'react';
import type { Product, CartItem, CartContextType } from '@/types';
import { useLocalCart } from '@/hooks/useLocalCart';
import { useCartApi } from '@/hooks/useCartApi';

export const CART_STORAGE_KEY = 'shopify-cart';

export enum CartActionType {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  UPDATE_QUANTITY = 'UPDATE_QUANTITY',
  CLEAR_CART = 'CLEAR_CART',
  LOAD_CART = 'LOAD_CART'
}

type CartAction =
  | { type: CartActionType.ADD_TO_CART; payload: { product: Product; quantity?: number } }
  | { type: CartActionType.REMOVE_FROM_CART; payload: { productId: string } }
  | { type: CartActionType.UPDATE_QUANTITY; payload: { productId: string; quantity: number } }
  | { type: CartActionType.CLEAR_CART }
  | { type: CartActionType.LOAD_CART; payload: { cartItems: CartItem[] } };

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: []
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionType.ADD_TO_CART: {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.cartItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      }
      
      return {
        ...state,
        cartItems: [...state.cartItems, { product, quantity }]
      };
    }
    
    case CartActionType.REMOVE_FROM_CART: {
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product.id !== action.payload.productId)
      };
    }
    
    case CartActionType.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.product.id !== productId)
        };
      }
      
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      };
    }
    
    case CartActionType.CLEAR_CART: {
      return {
        ...state,
        cartItems: []
      };
    }
    
    case CartActionType.LOAD_CART: {
      return {
        ...state,
        cartItems: action.payload.cartItems
      };
    }
    
    default:
      return state;
  }
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: CartActionType.LOAD_CART, payload: { cartItems } });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  const localCart = useLocalCart(state.cartItems);
  const cartApi = useCartApi();

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(localCart.cartItems));
    }
  }, [localCart.cartItems, isInitialized]);

  const saveCartToApi = async () => {
    const success = await cartApi.saveCart(localCart.cartItems);
    if (success) {
      localCart.markAsSaved();
    } else {
      localCart.resetToLastSaved();
    }
  };

  const value: CartContextType = {
    cartItems: localCart.cartItems,
    addToCart: localCart.addToCart,
    removeFromCart: localCart.removeFromCart,
    updateQuantity: localCart.updateQuantity,
    clearCart: localCart.clearCart,
    getTotalItems: () => {
      return localCart.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    getSubtotal: () => {
      return localCart.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    },
    saveCartToApi,
    isSaving: cartApi.isSaving,
    lastError: cartApi.lastError,
    hasUnsavedChanges: localCart.hasUnsavedChanges,
    clearError: cartApi.clearError
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
