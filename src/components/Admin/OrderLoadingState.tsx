import React from 'react';
import { Loader } from 'lucide-react';

const OrderLoadingState: React.FC = () => {
 return (
 <div className="flex justify-center items-center py-16">
 <Loader className="w-10 h-10 animate-spin text-blue-600"/>
 </div>
 );
};

export default OrderLoadingState; 