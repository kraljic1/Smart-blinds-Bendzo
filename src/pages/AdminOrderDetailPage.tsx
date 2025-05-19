import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Loader, ArrowLeft, Mail, Phone, MapPin, FileText, Clock, DollarSign } from 'lucide-react';
import SEO from '../components/SEO';
import { getOrderById } from '../utils/orderUtils';
import { OrderData as SupabaseOrderData } from '../utils/supabaseClient';

// Type for order items
interface OrderItemDisplay {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  options?: Record<string, string | number | boolean>;
}

const AdminOrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<SupabaseOrderData | null>(null);
  const [items, setItems] = useState<OrderItemDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setError('Order ID is missing');
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const data = await getOrderById(orderId);
        
        if (!data) {
          setError('Order not found');
        } else {
          setOrder(data);
          
          // Parse items from JSON string
          if (data.items) {
            try {
              const parsedItems = JSON.parse(data.items);
              setItems(parsedItems);
            } catch (e) {
              console.error('Failed to parse order items:', e);
              setItems([]);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Failed to load order details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId]);
  
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
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-100 text-red-800 p-6 rounded-lg max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => navigate('/admin/orders')}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title={`Order ${orderId} | Admin | Smartblinds Croatia`}
        description="Order details page"
      />
      
      <div className="mb-8">
        <Link 
          to="/admin/orders"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Order #{orderId}
            </h1>
            
            <div className="mt-4 sm:mt-0">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'received' ? 'bg-blue-100 text-blue-800' :
                order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'shipped' ? 'bg-green-100 text-green-800' :
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center text-gray-700 dark:text-gray-300">
            <Clock className="w-4 h-4 mr-2" />
            <span>{formatDate(order.created_at)}</span>
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">
              Customer Information
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-700 dark:text-blue-300 mt-1">
                  <span className="text-lg font-bold">{order.customer_name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-700 dark:text-gray-300 font-medium">Name</h3>
                  <p className="text-gray-900 dark:text-white">{order.customer_name}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-700 dark:text-blue-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-700 dark:text-gray-300 font-medium">Email</h3>
                  <p className="text-gray-900 dark:text-white">{order.customer_email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-700 dark:text-blue-300">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-700 dark:text-gray-300 font-medium">Phone</h3>
                  <p className="text-gray-900 dark:text-white">{order.customer_phone}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-700 dark:text-blue-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-700 dark:text-gray-300 font-medium">Address</h3>
                  <p className="text-gray-900 dark:text-white">{order.customer_address}</p>
                </div>
              </div>
              
              {order.notes && (
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-700 dark:text-blue-300">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-700 dark:text-gray-300 font-medium">Notes</h3>
                    <p className="text-gray-900 dark:text-white">{order.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">
              Order Summary
            </h2>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              {items.length > 0 ? (
                <div className="divide-y divide-gray-200 dark:divide-gray-600">
                  {items.map((item, index) => (
                    <div key={index} className="py-3 flex justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                        
                        {item.options && Object.keys(item.options).length > 0 && (
                          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {Object.entries(item.options).map(([key, value]) => (
                              <div key={key}>
                                {key}: {value.toString()}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900 dark:text-white">€{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No items found</p>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Total</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">€{order.total_amount.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                onClick={() => window.print()}
              >
                Print Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage; 