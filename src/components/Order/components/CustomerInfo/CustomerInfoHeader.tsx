import React from 'react';

const CustomerInfoHeader: React.FC = () => {
 return (
 <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
 <svg className="w-5 h-5 mr-2"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
 </svg>
 Podaci o kupcu
 </h3>
 );
};

export default CustomerInfoHeader; 