import React from 'react';
import { OrderDetails } from '../../Checkout/utils/orderDetails';

interface OrderItemsTableProps {
 orderDetails: OrderDetails;
}

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({ orderDetails }) => {
 return (
 <div className="p-6 border-b border-gray-200">
 <h3 className="text-lg font-semibold text-gray-900 mb-4">
 Stavke narudžbe
 </h3>
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead>
 <tr className="border-b border-gray-200">
 <th className="text-left py-3 text-gray-600 font-medium">Proizvod</th>
 <th className="text-center py-3 text-gray-600 font-medium">Količina</th>
 <th className="text-right py-3 text-gray-600 font-medium">Cijena</th>
 <th className="text-right py-3 text-gray-600 font-medium">Ukupno</th>
 </tr>
 </thead>
 <tbody>
 {orderDetails.items.map((item, index) => (
 <tr key={index} className="border-b border-gray-100">
 <td className="py-4">
 <div>
 <p className="font-medium text-gray-900">
 {item.name || 'Proizvod bez naziva'}
 </p>
 {item.description && (
 <p className="text-sm text-gray-500 mt-1">{item.description}</p>
 )}
 </div>
 </td>
 <td className="py-4 text-center text-gray-600">
 {item.quantity}
 </td>
 <td className="py-4 text-right text-gray-600">
 €{item.unitPrice.toFixed(2)}
 </td>
 <td className="py-4 text-right font-medium text-gray-900">
 €{item.totalPrice.toFixed(2)}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 );
};

export default OrderItemsTable; 