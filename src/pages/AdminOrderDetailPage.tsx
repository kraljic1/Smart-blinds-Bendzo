import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Loader, Mail, Phone, MapPin, Clock, LogOut, Printer, ChevronLeft, ShoppingCart, User, FileEdit, AlertCircle, Calendar, CheckCircle, XCircle, Truck, Package } from 'lucide-react';
import SEO from '../components/SEO';
import { getOrderById } from '../utils/orderUtils';
import { OrderData as SupabaseOrderData, supabase } from '../utils/supabaseClient';
import OrderStatusUpdate from '../components/AdminRoute/OrderStatusUpdate';

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
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };
  
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
  
  // Handle order status update
  const handleOrderStatusUpdate = (updatedOrder: SupabaseOrderData) => {
    setOrder(updatedOrder);
  };
  
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
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'received':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'processing':
        return <Package className="w-5 h-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };
  
  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'received':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shipped':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading order details...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="w-full max-w-lg">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">Error</h1>
              <p className="text-center text-gray-600 dark:text-gray-400">{error}</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-900 flex justify-center">
              <button 
                onClick={() => navigate('/admin/orders')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return null;
  }
  
  // Calculate order summary
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <SEO 
        title={`Order ${orderId} | Admin | Smartblinds Croatia`}
        description="Order details page"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <Link 
            to="/admin/orders"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Orders
          </Link>
          
          <div className="flex gap-2">
            <button 
              onClick={() => window.print()}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Order
            </button>
            
            <button 
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                Order <span className="text-blue-600 dark:text-blue-400 ml-2">{orderId}</span>
              </h1>
              
              <div className="mt-4 sm:mt-0 flex items-center">
                <div className="flex items-center mr-4">
                  <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{formatDate(order.created_at)}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  {getStatusIcon(order.status)}
                  <span className={`ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                  <div className="flex items-center">
                    <ShoppingCart className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Order Items</h2>
                  </div>
                </div>
                
                <div className="px-4 py-5 sm:p-6">
                  {items.length > 0 ? (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {items.map((item, index) => (
                        <div key={index} className="py-4 flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">{item.productName}</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity} × €{item.price.toFixed(2)}</p>
                            
                            {item.options && Object.keys(item.options).length > 0 && (
                              <div className="mt-2 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Product Options:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                                  {Object.entries(item.options).map(([key, value]) => (
                                    <div key={key} className="flex items-center">
                                      <span className="font-medium mr-1">{key}:</span>
                                      <span>{value.toString()}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="mt-2 sm:mt-0 flex flex-col items-end">
                            <p className="text-base font-medium text-gray-900 dark:text-white">€{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 dark:text-gray-400">No items found in this order.</p>
                    </div>
                  )}
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Subtotal</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">€{subtotal.toFixed(2)}</p>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Shipping</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Calculated at checkout</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <p className="text-base font-medium text-gray-900 dark:text-white">Order Total</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">€{order.total_amount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Customer Notes */}
              {order.notes && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                    <div className="flex items-center">
                      <FileEdit className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">Customer Notes</h2>
                    </div>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{order.notes}</p>
                  </div>
                </div>
              )}
              
              {/* Order Status Management */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                  <div className="flex items-center">
                    <FileEdit className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Manage Order</h2>
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  {orderId && (
                    <OrderStatusUpdate 
                      orderId={orderId} 
                      currentStatus={order.status}
                      onStatusUpdate={handleOrderStatusUpdate}
                    />
                  )}
                </div>
              </div>
            </div>
            
            <div>
              {/* Customer Information */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Customer Information</h2>
                  </div>
                </div>
                
                <div className="px-4 py-5 sm:p-6 grid grid-cols-1 gap-5">
                  <div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-800 dark:text-blue-300">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</p>
                        <p className="text-sm text-gray-900 dark:text-white font-medium">{order.customer_name}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-800 dark:text-blue-300">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</p>
                        <p className="text-sm text-gray-900 dark:text-white font-medium">{order.customer_email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-800 dark:text-blue-300">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</p>
                        <p className="text-sm text-gray-900 dark:text-white font-medium">{order.customer_phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-800 dark:text-blue-300 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</p>
                        <p className="text-sm text-gray-900 dark:text-white whitespace-pre-line font-medium">{order.customer_address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage; 