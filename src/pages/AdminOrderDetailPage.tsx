import React from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO/SEO';

// Import extracted components
import AdminOrderHeader from '../components/AdminRoute/AdminOrderHeader';
import OrderTitle from '../components/AdminRoute/OrderTitle';
import OrderItems from '../components/AdminRoute/OrderItems';
import CustomerInfo from '../components/AdminRoute/CustomerInfo';
import CustomerNotes, { SystemNotes } from '../components/AdminRoute/CustomerNotes';
import OrderManagement from '../components/AdminRoute/OrderManagement';
import { LoadingState, ErrorState } from '../components/AdminRoute/OrderStateDisplay';

// Import custom hooks and utilities
import { useOrderDetails } from '../hooks/useOrderDetails';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { calculateOrderSubtotal } from '../utils/orderCalculations';

const AdminOrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  
  // Use custom hooks
  const { order, items, isLoading, error, refreshOrder } = useOrderDetails(orderId);
  const { handleLogout } = useAdminAuth();
  
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
  const subtotal = calculateOrderSubtotal(items);
  const shippingCost = order.shippingCost || 0;
  const totalWithShipping = subtotal + shippingCost;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <SEO 
        title={`Narudžba ${orderId} | Admin | Smartblinds Croatia`}
        description="Stranica s detaljima narudžbe"
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
                shippingCost={shippingCost}
                totalAmount={totalWithShipping} 
              />
              
              {/* Customer Notes */}
              {order.notes && <CustomerNotes notes={order.notes} />}
              
              {/* System Information */}
              {order.notes && <SystemNotes notes={order.notes} />}
              
              {/* Order Status Management */}
              {orderId && (
                <OrderManagement 
                  orderId={orderId} 
                  currentStatus={order.status}
                  onStatusUpdate={refreshOrder}
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