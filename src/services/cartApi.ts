import type { CartItem } from '@/types';

const API_DELAY = 1000;

const FAILURE_RATE = 0.1;

export interface CartApiResponse {
  success: boolean;
  data?: CartItem[];
  error?: string;
}

const simulateApiCall = async <T>(data: T): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        reject(new Error('Network error: Failed to save cart'));
      } else {
        resolve(data);
      }
    }, API_DELAY);
  });
};

export const saveCartToApi = async (cartItems: CartItem[]): Promise<CartApiResponse> => {
  try {
    console.log('Saving cart to API:', cartItems);

    const savedCart = await simulateApiCall(cartItems);
    
    console.log('Cart saved successfully to API');
    return {
      success: true,
      data: savedCart
    };
  } catch (error) {
    console.error('Failed to save cart to API:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

export const loadCartFromApi = async (): Promise<CartApiResponse> => {
  try {
    console.log('Loading cart from API');

    const cartItems = await simulateApiCall([]);
    
    return {
      success: true,
      data: cartItems
    };
  } catch (error) {
    console.error('Failed to load cart from API:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
