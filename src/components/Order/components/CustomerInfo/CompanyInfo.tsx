import React from 'react';
import { OrderDetails } from '../../../Checkout/utils/orderDetails';

interface CompanyInfoProps {
 company: OrderDetails['company'];
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ company }) => {
 if (!company) return null;

 return (
 <>
 <p className="flex items-center">
 <svg className="w-4 h-4 mr-2 text-gray-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
 </svg>
 <strong>{company.name}</strong>
 </p>
 <p className="flex items-center">
 <svg className="w-4 h-4 mr-2 text-gray-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
 </svg>
 <span><strong>OIB:</strong> {company.oib}</span>
 </p>
 <div className="border-t border-gray-200 my-2 pt-2">
 <p className="text-sm text-gray-500 mb-1">Kontakt osoba:</p>
 </div>
 </>
 );
};

export default CompanyInfo; 