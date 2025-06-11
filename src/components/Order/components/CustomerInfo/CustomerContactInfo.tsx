import React from 'react';
import { OrderDetails } from '../../../Checkout/utils/orderDetails';

interface CustomerContactInfoProps {
 customer: OrderDetails['customer'];
}

const CustomerContactInfo: React.FC<CustomerContactInfoProps> = ({ customer }) => {
 return (
 <>
 <p className="flex items-center">
 <svg className="w-4 h-4 mr-2 text-gray-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
 </svg>
 <strong>{customer.name}</strong>
 </p>
 <p className="flex items-center">
 <svg className="w-4 h-4 mr-2 text-gray-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
 </svg>
 {customer.email}
 </p>
 <p className="flex items-center">
 <svg className="w-4 h-4 mr-2 text-gray-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
 </svg>
 {customer.phone}
 </p>
 </>
 );
};

export default CustomerContactInfo; 