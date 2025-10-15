import type { Product } from '@/types';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('/products.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const products: Product[] = await response.json();

    await new Promise(resolve => setTimeout(resolve, 500));
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to load products. Please try again later.');
  }
};
