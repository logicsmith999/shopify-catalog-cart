import { useState, useCallback } from 'react';
import type { CartItem } from '@/types';
import { saveCartToApi } from '@/services/cartApi';

export interface CartApiState {
  isSaving: boolean;
  lastError: string | null;
}

export const useCartApi = () => {
  const [state, setState] = useState<CartApiState>({
    isSaving: false,
    lastError: null
  });

  const saveCart = useCallback(async (cartItems: CartItem[]): Promise<boolean> => {
    setState(prev => ({
      ...prev,
      isSaving: true,
      lastError: null
    }));

    try {
      const result = await saveCartToApi(cartItems);
      
      if (result.success) {
        setState(prev => ({
          ...prev,
          isSaving: false,
          lastError: null
        }));
        console.log('✅ Cart saved successfully to API');
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isSaving: false,
          lastError: result.error || 'Failed to save cart'
        }));
        console.error('❌ Failed to save cart to API:', result.error);
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState(prev => ({
        ...prev,
        isSaving: false,
        lastError: errorMessage
      }));
      console.error('❌ Error saving cart to API:', error);
      return false;
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, lastError: null }));
  }, []);

  return {
    isSaving: state.isSaving,
    lastError: state.lastError,
    saveCart,
    clearError
  };
};
