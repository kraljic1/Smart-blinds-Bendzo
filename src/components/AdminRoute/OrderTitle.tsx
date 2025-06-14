import React from 'react';
import { Clock } from 'lucide-react';
import { formatDate, getStatusIcon, getStatusStyle } from '../../utils/orderStatusUtils';
import { getStatusTranslation } from '../../utils/orderStatusFormatter';

interface OrderTitleProps {
 orderId: string | undefined;
 createdAt: string;
 status: string;
}

const OrderTitle: React.FC<OrderTitleProps> = ({ orderId, createdAt, status }) => {
 return (
 <div className="p-6 border-b border-gray-200">
 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
 <h1 className="text-2xl font-bold text-gray-900 flex items-center">
 Narudžba <span className="text-blue-600 ml-2">{orderId}</span>
 </h1>
 
 <div className="mt-4 sm:mt-0 flex items-center">
 <div className="flex items-center mr-4">
 <Clock className="h-5 w-5 text-gray-500 mr-2"/>
 <span className="text-sm text-gray-600">{formatDate(createdAt)}</span>
 </div>
 
 <div className="flex items-center space-x-1">
 {getStatusIcon(status)}
 <span className={`ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(status)}`}>
 {getStatusTranslation(status)}
 </span>
 </div>
 </div>
 </div>
 </div>
 );
};

export default OrderTitle; 