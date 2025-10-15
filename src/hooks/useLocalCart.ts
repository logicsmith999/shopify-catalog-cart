import { useState, useCallback, useEffect } from 'react';
import type { CartItem, Product } from '@/types';

export interface LocalCartState {
  cartItems: CartItem[];
  hasUnsavedChanges: boolean;
  lastSavedState: CartItem[];
}

export const useLocalCart = (initialCartItems: CartItem[]) => {
  const [state, setState] = useState<LocalCartState>({
    cartItems: initialCartItems,
    hasUnsavedChanges: false,
    lastSavedState: initialCartItems
  });

  useEffect(() => {
    setState(prev => ({
      ...prev,
      cartItems: initialCartItems,
      lastSavedState: initialCartItems,
      hasUnsavedChanges: false
    }));
  }, [initialCartItems]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setState(prev => {
      const existingItem = prev.cartItems.find(item => item.product.id === product.id);
      
      let newCartItems: CartItem[];
      if (existingItem) {
        newCartItems = prev.cartItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCartItems = [...prev.cartItems, { product, quantity }];
      }
      
      return {
        ...prev,
        cartItems: newCartItems,
        hasUnsavedChanges: true
      };
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setState(prev => {
      let newCartItems: CartItem[];
      if (quantity <= 0) {
        newCartItems = prev.cartItems.filter(item => item.product.id !== productId);
      } else {
        newCartItems = prev.cartItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        );
      }
      
      return {
        ...prev,
        cartItems: newCartItems,
        hasUnsavedChanges: true
      };
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setState(prev => ({
      ...prev,
      cartItems: prev.cartItems.filter(item => item.product.id !== productId),
      hasUnsavedChanges: true
    }));
  }, []);

  const clearCart = useCallback(() => {
    setState(prev => ({
      ...prev,
      cartItems: [],
      hasUnsavedChanges: true
    }));
  }, []);

  const markAsSaved = useCallback(() => {
    setState(prev => ({
      ...prev,
      hasUnsavedChanges: false,
      lastSavedState: prev.cartItems
    }));
  }, []);

  const resetToLastSaved = useCallback(() => {
    setState(prev => ({
      ...prev,
      cartItems: prev.lastSavedState,
      hasUnsavedChanges: false
    }));
  }, []);

  return {
    cartItems: state.cartItems,
    hasUnsavedChanges: state.hasUnsavedChanges,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    markAsSaved,
    resetToLastSaved
  };
};
