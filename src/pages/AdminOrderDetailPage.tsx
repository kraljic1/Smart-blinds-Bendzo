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

// Extended order data type that includes items
interface ExtendedOrderData extends SupabaseOrderData {
  items?: Array<{
    product_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    options?: Record<string, string | number | boolean>;
  }> | string;
}

const AdminOrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<ExtendedOrderData | null>(null);
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
        const data = await getOrderById(orderId) as ExtendedOrderData;
        
        if (!data) {
          setError('Order not found');
        } else {
          setOrder(data);
          
          // Check if we have items from the new schema
          if (data.items && Array.isArray(data.items)) {
            const formattedItems = data.items.map(item => ({
              productId: item.product_id,
              productName: item.product_name,
              quantity: item.quantity,
              price: item.unit_price,
              options: item.options || {}
            }));
            setItems(formattedItems);
          }
          // Fallback for legacy format (JSON string)
          else if (typeof data.items === 'string') {
            try {
              const parsedItems = JSON.parse(data.items);
              setItems(parsedItems);
            } catch (e) {
              console.error('Failed to parse order items:', e);
              setItems([]);
            }
          } else {
            setItems([]);
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
    setOrder(updatedOrder as ExtendedOrderData);
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
                billingAddress={order.billing_address}
                shippingAddress={order.shipping_address}
                paymentMethod={order.payment_method}
                shippingMethod={order.shipping_method}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage; 