import React from 'react';
import { CheckCircle } from 'lucide-react';

const OrderSuccessHeader: React.FC = () => {
 return (
 <div className="text-center mb-8 print-hide">
 <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
 <CheckCircle className="w-12 h-12 text-green-600"/>
 </div>
 <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
 Hvala vam na narudžbi!
 </h1>
 <p className="text-lg text-gray-600">
 Vaša narudžba je uspješno primljena i obrađuje se
 </p>
 </div>
 );
};

export default OrderSuccessHeader; 