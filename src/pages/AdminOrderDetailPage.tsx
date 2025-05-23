import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { supabase } from '../utils/supabaseClient';

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
  width?: number;
  height?: number;
}

// Extended order data type that matches the API response structure
interface ExtendedOrderData {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  billingAddress: string;
  shippingAddress: string;
  totalAmount: number;
  taxAmount?: number;
  shippingCost?: number;
  discountAmount?: number;
  discountCode?: string;
  paymentMethod: string;
  paymentStatus: string;
  shippingMethod: string;
  trackingNumber?: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    width?: number;
    height?: number;
    options?: Record<string, string | number | boolean>;
  }>;
}

// Function to get order by ID using the Netlify function
const getOrderById = async (orderId: string): Promise<ExtendedOrderData | null> => {
  try {
    const response = await fetch(`/.netlify/functions/get-orders?orderId=${encodeURIComponent(orderId)}`);
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.success && result.orders.length > 0 ? result.orders[0] : null;
    
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    return null;
  }
};

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
        const data = await getOrderById(orderId);
        
        if (!data) {
          setError('Order not found');
        } else {
          setOrder(data);
          
          // Process items from the API response
          if (data.items && Array.isArray(data.items)) {
            const formattedItems = data.items.map(item => ({
              productId: item.productId,
              productName: item.productName,
              quantity: item.quantity,
              price: item.unitPrice,
              options: item.options || {},
              width: item.width,
              height: item.height
            }));
            setItems(formattedItems);
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
  const handleOrderStatusUpdate = () => {
    // Refresh the order data by fetching it again
    if (orderId) {
      getOrderById(orderId).then(data => {
        if (data) setOrder(data);
      });
    }
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
  const subtotal = items.reduce((acc, item) => {
    const price = item.price ? Number(item.price) : 0;
    return acc + (price * item.quantity);
  }, 0);
  
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
            createdAt={order.createdAt} 
            status={order.status} 
          />
              
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <OrderItems 
                items={items} 
                subtotal={subtotal} 
                totalAmount={order.totalAmount} 
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
                name={order.customerName}
                email={order.email}
                phone={order.phone}
                billingAddress={order.billingAddress}
                shippingAddress={order.shippingAddress}
                paymentMethod={order.paymentMethod}
                shippingMethod={order.shippingMethod}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage; 