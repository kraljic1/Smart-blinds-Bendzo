import React from 'react';
import { FileText } from 'lucide-react';
import { OrderItemDisplay } from './types';

interface OrderItemsTableProps {
 orderItems: OrderItemDisplay[];
}

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({ orderItems }) => {
 return (
 <div className="p-6 border-b border-gray-200">
 <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
 <FileText className="w-5 h-5 mr-2"/>
 Naručeni proizvodi
 </h3>
 
 {orderItems.length > 0 ? (
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead>
 <tr className="border-b border-gray-200">
 <th className="text-left py-3 px-2 font-semibold text-gray-900">Proizvod</th>
 <th className="text-center py-3 px-2 font-semibold text-gray-900">Količina</th>
 <th className="text-right py-3 px-2 font-semibold text-gray-900">Cijena</th>
 <th className="text-right py-3 px-2 font-semibold text-gray-900">Ukupno</th>
 </tr>
 </thead>
 <tbody>
 {orderItems.map((item, index) => (
 <tr key={index} className="border-b border-gray-100 last:border-0">
 <td className="py-4 px-2">
 <div>
 <p className="font-medium text-gray-900">
 {item.productName || 'Proizvod bez naziva'}
 </p>
 {(item.width || item.height) && (
 <p className="text-sm text-gray-500">
 Dimenzije: {item.width}cm × {item.height}cm
 </p>
 )}
 {item.options && Object.keys(item.options).length > 0 && (
 <div className="text-sm text-gray-500 mt-1">
 {Object.entries(item.options).map(([key, value]) => (
 <span key={key} className="mr-3">
 {key}: {String(value)}
 </span>
 ))}
 </div>
 )}
 </div>
 </td>
 <td className="py-4 px-2 text-center text-gray-600">
 {item.quantity}
 </td>
 <td className="py-4 px-2 text-right text-gray-600">
 €{Number(item.unitPrice).toFixed(2)}
 </td>
 <td className="py-4 px-2 text-right font-medium text-gray-900">
 €{Number(item.subtotal).toFixed(2)}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 ) : (
 <p className="text-gray-500 italic">Nema dostupnih stavki narudžbe</p>
 )}
 </div>
 );
};

export default OrderItemsTable; 