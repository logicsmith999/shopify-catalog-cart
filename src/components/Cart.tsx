import React from 'react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/format';

export const Cart: React.FC = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalItems, 
    getSubtotal,
    saveCartToApi,
    isSaving,
    hasUnsavedChanges
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Shopping Cart</h2>
        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Shopping Cart ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
        </h2>
        <button
          onClick={clearCart}
          className="text-sm text-red-600 hover:text-red-800 font-medium whitespace-nowrap"
          aria-label="Clear cart"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.product.id} className="py-3 border-b border-gray-200 last:border-b-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-gray-900">{item.product.title}</h3>
              <p className="text-sm text-gray-500">{formatPrice(item.product.price)} each</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="px-3 py-1 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Decrease quantity of ${item.product.title}`}
                >
                  −
                </button>
                <span className="px-3 py-1 text-center min-w-[3rem] font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Increase quantity of ${item.product.title}`}
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-600 hover:text-red-800 p-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                  aria-label={`Remove ${item.product.title} from cart`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>        
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center text-lg font-semibold text-gray-900 mb-4">
          <span>Total:</span>
          <span>{formatPrice(getSubtotal())}</span>
        </div>
        
        {/* Save Cart Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {hasUnsavedChanges && (
              <div className="flex items-center space-x-1 text-amber-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Unsaved changes</span>
              </div>
            )}
          </div>
          
          <button
            onClick={saveCartToApi}
            disabled={isSaving || !hasUnsavedChanges}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200 flex items-center space-x-2"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Save Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
