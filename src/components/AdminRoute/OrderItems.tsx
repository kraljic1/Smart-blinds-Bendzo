import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { formatProductOptions, formatDimensions } from '../../utils/productOptionsFormatter';
import '../../styles/AdminOrderItems.css';

// Type for order items
interface OrderItemDisplay {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  options?: Record<string, string | number | boolean>;
  width?: number;
  height?: number;
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
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Stavke Narudžbe</h2>
        </div>
      </div>
      
      <div className="px-4 py-5 sm:p-6">
        {items.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {items.map((item, index) => {
              const formattedOptions = item.options ? formatProductOptions(item.options) : [];
              const dimensionText = formatDimensions(item.width, item.height);
              
              return (
                <div key={index} className="order-item-card py-4 flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">{item.productName}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Količina: {item.quantity} × €{item.price ? Number(item.price).toFixed(2) : '0.00'}
                    </p>
                    
                    {/* Dimensions */}
                    {dimensionText && (
                      <p className="mt-1 text-sm font-semibold dimension-text">
                        📏 {dimensionText}
                      </p>
                    )}
                    
                    {/* Product Options */}
                    {formattedOptions.length > 0 && (
                      <div className="animate-slide-up mt-3 product-options-container rounded-lg border border-gray-200 dark:border-gray-600 p-4">
                        <p className="configuration-header text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          ⚙️ Konfiguracija
                        </p>
                        <div className="space-y-2">
                          {formattedOptions.map((option, optionIndex) => (
                            <div key={optionIndex} className="product-option-row flex items-center justify-between py-2 px-3 rounded-md">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {option.label}
                              </span>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white ml-2 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                                {option.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 sm:mt-0 flex flex-col items-end">
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      €{item.price ? (Number(item.price) * item.quantity).toFixed(2) : '0.00'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 dark:text-gray-400">Nema stavki u ovoj narudžbi.</p>
          </div>
        )}
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Međuzbroj</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">€{subtotal ? Number(subtotal).toFixed(2) : '0.00'}</p>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Dostava</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Izračunava se pri plaćanju</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <p className="text-base font-medium text-gray-900 dark:text-white">Ukupno Narudžbe</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">€{totalAmount ? Number(totalAmount).toFixed(2) : '0.00'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItems; 