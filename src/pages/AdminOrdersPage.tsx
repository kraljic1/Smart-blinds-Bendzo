import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from 'lucide-react';
import SEO from '../components/SEO';
import { supabase } from '../utils/supabaseClient';
import { OrderData as SupabaseOrderData } from '../utils/supabaseClient';

// Admin page for viewing all orders
const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<SupabaseOrderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setOrders(data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title="Admin Orders | Smartblinds Croatia"
        description="Admin page for managing orders"
      />
      
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Order Management</h1>
        <Link 
          to="/"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Back to Home
        </Link>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-gray-600 text-lg">No orders found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="py-3 px-4 font-medium">
                    {order.order_id}
                  </td>
                  <td className="py-3 px-4">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="py-3 px-4">
                    {order.customer_name}
                  </td>
                  <td className="py-3 px-4">
                    {order.customer_email}
                  </td>
                  <td className="py-3 px-4 text-right font-medium">
                    €{order.total_amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'received' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'shipped' ? 'bg-green-100 text-green-800' :
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Link 
                      to={`/admin/orders/${order.order_id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage; 