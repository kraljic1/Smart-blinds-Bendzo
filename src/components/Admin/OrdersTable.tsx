import React from 'react';
import { OptimizedOrderSummary } from '../../utils/optimizedOrderService';

interface OrdersTableProps {
 orders: OptimizedOrderSummary[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
 return (
 <div className="bg-white shadow-sm rounded-lg overflow-hidden">
 <div className="overflow-x-auto">
 <table className="min-w-full divide-y divide-gray-200 ">
 <thead className="bg-gray-50 ">
 <tr>
 <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 ID Narudžbe
 </th>
 <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 Datum
 </th>
 <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 Kupac
 </th>
 <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 Email
 </th>
 <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
 Stavke
 </th>
 <th scope="col"className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
 Iznos
 </th>
 <th scope="col"className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
 Status
 </th>
 <th scope="col"className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
 Akcije
 </th>
 </tr>
 </thead>
 <tbody className="bg-white divide-y divide-gray-200 ">
 {orders.map((order) => (
 <tr key={order.order_id} className="hover:bg-gray-50 :bg-gray-750">
 <td className="px-6 py-4 text-sm font-medium text-gray-900">
 {order.order_id}
 </td>
 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
 {new Date(order.created_at).toLocaleDateString('hr-HR')}
 </td>
 <td className="px-6 py-4 text-sm text-gray-900">
 {order.customer_name}
 </td>
 <td className="px-6 py-4 text-sm text-gray-500">
 {order.customer_email}
 </td>
 <td className="px-6 py-4 text-sm text-gray-500">
 {order.item_count} stavki ({order.total_quantity} kom)
 </td>
 <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
 €{order.total_amount.toFixed(2)}
 </td>
 <td className="px-6 py-4 whitespace-nowrap text-center">
 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
 order.status === 'completed' 
 ? 'bg-green-100 text-green-800 '
 : order.status === 'processing'
 ? 'bg-blue-100 text-blue-800 '
 : order.status === 'cancelled'
 ? 'bg-red-100 text-red-800 '
 : 'bg-yellow-100 text-yellow-800 '
 }`}>
 {order.status === 'completed' ? 'Završeno' :
 order.status === 'processing' ? 'U obradi' :
 order.status === 'cancelled' ? 'Otkazano' :
 order.status === 'received' ? 'Primljeno' : order.status}
 </span>
 </td>
 <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
 <div className="flex items-center justify-center space-x-2">
 <a
 href={`/admin/orders/${order.order_id}`}
 className="text-blue-600 hover:text-blue-900 :text-blue-300"
 >
 Prikaži
 </a>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 );
};

export default OrdersTable;