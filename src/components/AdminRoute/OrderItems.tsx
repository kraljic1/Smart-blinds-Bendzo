import React from 'react';
import { ShoppingCart } from 'lucide-react';

// Type for order items
interface OrderItemDisplay {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  options?: Record<string, string | number | boolean>;
}

interface OrderItemsProps {
  items: OrderItemDisplay[];
  subtotal: number;
  totalAmount: number;
}

const OrderItems: React.FC<OrderItemsProps> = ({ items, subtotal, totalAmount }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        <div className="flex items-center">
          <ShoppingCart className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Order Items</h2>
        </div>
      </div>
      
      <div className="px-4 py-5 sm:p-6">
        {items.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {items.map((item, index) => (
              <div key={index} className="py-4 flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div className="flex-1">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">{item.productName}</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity} × €{item.price ? Number(item.price).toFixed(2) : '0.00'}</p>
                  
                  {item.options && Object.keys(item.options).length > 0 && (
                    <div className="mt-2 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Product Options:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                        {Object.entries(item.options).map(([key, value]) => (
                          <div key={key} className="flex items-center">
                            <span className="font-medium mr-1">{key}:</span>
                            <span>{value.toString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-2 sm:mt-0 flex flex-col items-end">
                  <p className="text-base font-medium text-gray-900 dark:text-white">€{item.price ? (Number(item.price) * item.quantity).toFixed(2) : '0.00'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 dark:text-gray-400">No items found in this order.</p>
          </div>
        )}
        
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Subtotal</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">€{subtotal ? Number(subtotal).toFixed(2) : '0.00'}</p>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Shipping</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Calculated at checkout</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <p className="text-base font-medium text-gray-900 dark:text-white">Order Total</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">€{totalAmount ? Number(totalAmount).toFixed(2) : '0.00'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItems; 