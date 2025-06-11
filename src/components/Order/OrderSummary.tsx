import React from 'react';

interface OrderSummaryProps {
 subtotal: number;
 taxAmount: number;
 shippingCost: number;
 total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
 subtotal, 
 taxAmount, 
 shippingCost, 
 total 
}) => {
 return (
 <div className="p-6 bg-gray-50 ">
 <div className="max-w-md ml-auto">
 <div className="space-y-3">
 <div className="flex justify-between text-gray-600">
 <span>Međuzbroj:</span>
 <span>€{subtotal.toFixed(2)}</span>
 </div>
 {shippingCost > 0 && (
 <div className="flex justify-between text-gray-600">
 <span>Dostava:</span>
 <span>€{shippingCost.toFixed(2)}</span>
 </div>
 )}
 <div className="flex justify-between text-gray-600">
 <span>PDV (25%):</span>
 <span>€{taxAmount.toFixed(2)}</span>
 </div>
 <div className="border-t border-gray-300 pt-3">
 <div className="flex justify-between text-xl font-bold text-gray-900">
 <span>UKUPNO:</span>
 <span>€{total.toFixed(2)}</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
};

export default OrderSummary; 