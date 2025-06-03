import React from 'react';
import { OrderDetails } from '../Checkout/utils/orderDetails';

interface StoredOrderDetailsSectionProps {
  orderDetails: OrderDetails;
}

const StoredOrderDetailsSection: React.FC<StoredOrderDetailsSectionProps> = ({ orderDetails }) => {
  return (
    <>
      {/* Customer Information */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Billing Info */}
          <div>
            <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Podaci o kupcu
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <strong>{orderDetails.customer.name}</strong>
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {orderDetails.customer.email}
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {orderDetails.customer.phone}
              </p>
              <p className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  {orderDetails.customer.address}<br />
                  {orderDetails.customer.postalCode} {orderDetails.customer.city}<br />
                  {orderDetails.customer.country}
                </span>
              </p>
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div>
            <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Dostava i plaćanje
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span><strong>Dostava:</strong> {orderDetails.shipping.method}</span>
              </p>
              <p className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  {orderDetails.shipping.address.address}<br />
                  {orderDetails.shipping.address.postalCode} {orderDetails.shipping.address.city}<br />
                  Hrvatska
                </span>
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span><strong>Plaćanje:</strong> Kartica</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Stavke narudžbe
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 text-gray-600 dark:text-gray-300 font-medium">Proizvod</th>
                <th className="text-center py-3 text-gray-600 dark:text-gray-300 font-medium">Količina</th>
                <th className="text-right py-3 text-gray-600 dark:text-gray-300 font-medium">Cijena</th>
                <th className="text-right py-3 text-gray-600 dark:text-gray-300 font-medium">Ukupno</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                      {item.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 text-center text-gray-600 dark:text-gray-300">
                    {item.quantity}
                  </td>
                  <td className="py-4 text-right text-gray-600 dark:text-gray-300">
                    €{item.unitPrice.toFixed(2)}
                  </td>
                  <td className="py-4 text-right font-medium text-gray-900 dark:text-white">
                    €{item.totalPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-6 bg-gray-50 dark:bg-gray-700">
        <div className="max-w-md ml-auto">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>Međuzbroj:</span>
              <span>€{orderDetails.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>PDV (25%):</span>
              <span>€{orderDetails.tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-600 pt-3">
              <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                <span>UKUPNO:</span>
                <span>€{orderDetails.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {orderDetails.notes && (
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Napomene
          </h3>
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
            {orderDetails.notes}
          </p>
        </div>
      )}
    </>
  );
};

export default StoredOrderDetailsSection; 