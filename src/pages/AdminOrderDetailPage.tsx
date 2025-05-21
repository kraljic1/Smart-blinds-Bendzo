import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { getOrderById } from '../utils/orderUtils';
import { OrderData as SupabaseOrderData, supabase } from '../utils/supabaseClient';

// Import extracted components
import AdminOrderHeader from '../components/AdminRoute/AdminOrderHeader';
import OrderTitle from '../components/AdminRoute/OrderTitle';
import OrderItems from '../components/AdminRoute/OrderItems';
import CustomerInfo from '../components/AdminRoute/CustomerInfo';
import CustomerNotes from '../components/AdminRoute/CustomerNotes';
import OrderManagement from '../components/AdminRoute/OrderManagement';
import { LoadingState, ErrorState } from '../components/AdminRoute/OrderStateDisplay';

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
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  if (error) {
    return <ErrorState error={error} />;
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <AdminOrderHeader onLogout={handleLogout} />
        
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden mb-8">
          <OrderTitle 
            orderId={orderId} 
            createdAt={order.created_at} 
            status={order.status} 
          />
              
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <OrderItems 
                items={items} 
                subtotal={subtotal} 
                totalAmount={order.total_amount} 
              />
              
              {/* Customer Notes */}
              {order.notes && <CustomerNotes notes={order.notes} />}
              
              {/* Order Status Management */}
              {orderId && (
                <OrderManagement 
                  orderId={orderId} 
                  currentStatus={order.status}
                  onStatusUpdate={handleOrderStatusUpdate}
                />
              )}
            </div>
            
            <div>
              {/* Customer Information */}
              <CustomerInfo
                name={order.customer_name}
                email={order.customer_email}
                phone={order.customer_phone}
                address={order.customer_address}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage; 