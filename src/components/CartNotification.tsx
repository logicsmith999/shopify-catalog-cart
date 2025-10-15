import React from 'react';
import { useCart } from '@/hooks/useCart';

export const CartNotification: React.FC = () => {
  const { lastError, clearError } = useCart();

  if (lastError) {
    return (
      <div className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg z-50 max-w-sm">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Save Failed</span>
            </div>
            <p className="text-xs text-red-100 mb-3">{lastError}</p>
            <div className="flex space-x-2">
              <button
                onClick={clearError}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded transition-colors duration-200"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
