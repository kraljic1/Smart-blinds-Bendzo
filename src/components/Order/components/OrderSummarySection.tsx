import React from 'react';
import { OrderDetails } from '../../Checkout/utils/orderDetails';

interface OrderSummarySectionProps {
 orderDetails: OrderDetails;
}

const OrderSummarySection: React.FC<OrderSummarySectionProps> = ({ orderDetails }) => {
 return (
 <div className="p-6 bg-gray-50 ">
 <div className="max-w-md ml-auto">
 <div className="space-y-3">
 <div className="flex justify-between text-gray-600">
 <span>Međuzbroj:</span>
 <span>€{orderDetails.subtotal.toFixed(2)}</span>
 </div>
 {orderDetails.shippingCost > 0 && (
 <div className="flex justify-between text-gray-600">
 <span>Dostava:</span>
 <span>€{orderDetails.shippingCost.toFixed(2)}</span>
 </div>
 )}
 <div className="flex justify-between text-gray-600">
 <span>PDV (25%):</span>
 <span>€{orderDetails.tax.toFixed(2)}</span>
 </div>
 <div className="border-t border-gray-300 pt-3">
 <div className="flex justify-between text-xl font-bold text-gray-900">
 <span>UKUPNO:</span>
 <span>€{orderDetails.total.toFixed(2)}</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
};

export default OrderSummarySection; 