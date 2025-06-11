import React from 'react';
import { FileEdit } from 'lucide-react';
import OrderStatusUpdate from './OrderStatusUpdate';
interface OrderManagementProps {
 orderId: string;
 currentStatus: string;
 onStatusUpdate: () => void;
}

const OrderManagement: React.FC<OrderManagementProps> = ({ 
 orderId, 
 currentStatus, 
 onStatusUpdate 
}) => {
 return (
 <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
 <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-100 ">
 <div className="flex items-center">
 <FileEdit className="h-5 w-5 text-gray-500 mr-2"/>
 <h2 className="text-lg font-medium text-gray-900">Upravljanje Narudžbom</h2>
 </div>
 </div>
 <div className="px-4 py-5 sm:p-6">
 <OrderStatusUpdate 
 orderId={orderId} 
 currentStatus={currentStatus}
 onStatusUpdate={onStatusUpdate}
 />
 </div>
 </div>
 );
};

export default OrderManagement; 