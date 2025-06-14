import React from 'react';
import { OrderDetails } from '../../../Checkout/utils/orderDetails';

interface CustomerAddressInfoProps {
 customer: OrderDetails['customer'];
}

const CustomerAddressInfo: React.FC<CustomerAddressInfoProps> = ({ customer }) => {
 return (
 <p className="flex items-start">
 <svg className="w-4 h-4 mr-2 mt-1 text-gray-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
 </svg>
 <span>
 {customer.address}<br />
 {customer.postalCode} {customer.city}<br />
 {customer.country}
 </span>
 </p>
 );
};

export default CustomerAddressInfo; 