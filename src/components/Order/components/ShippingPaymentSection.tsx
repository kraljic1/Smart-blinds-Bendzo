import React from 'react';
import { OrderDetails } from '../../Checkout/utils/orderDetails';

interface ShippingPaymentSectionProps {
 orderDetails: OrderDetails;
}

const ShippingPaymentSection: React.FC<ShippingPaymentSectionProps> = ({ orderDetails }) => {
 return (
 <div>
 <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
 <svg className="w-5 h-5 mr-2"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
 </svg>
 Dostava i plaćanje
 </h3>
 <div className="space-y-2 text-gray-600">
 <p className="flex items-center">
 <svg className="w-4 h-4 mr-2 text-gray-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
 </svg>
 <span><strong>Dostava:</strong> {orderDetails.shipping.method}</span>
 </p>
 <p className="flex items-start">
 <svg className="w-4 h-4 mr-2 mt-1 text-gray-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
 </svg>
 <span>
 {orderDetails.shipping.address.address}<br />
 {orderDetails.shipping.address.postalCode} {orderDetails.shipping.address.city}<br />
 Hrvatska
 </span>
 </p>
 <p className="flex items-center">
 <svg className="w-4 h-4 mr-2 text-gray-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
 </svg>
 <span><strong>Plaćanje:</strong> Kartica</span>
 </p>
 </div>
 </div>
 );
};

export default ShippingPaymentSection; 