import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Loader } from 'lucide-react';
import SEO from '../components/SEO';
import { useBasketContext } from '../hooks/useBasketContext';
import { useOrderContext } from '../context/useOrderContext';
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

const ThankYouPage: React.FC = () => {
  const { clearBasket } = useBasketContext();
  const { lastOrder } = useOrderContext();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<SupabaseOrderData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Clear the basket when this page is reached
    clearBasket();
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // If there's no order info, redirect to home
    if (!lastOrder) {
      // Short delay to avoid flash of content
      const timer = setTimeout(() => {
        navigate('/');
      }, 100);
      
      return () => clearTimeout(timer);
    }
    
    // Fetch order details from Supabase
    if (lastOrder?.orderId) {
      setIsLoading(true);
      getOrderById(lastOrder.orderId)
        .then(data => {
          setOrderDetails(data);
        })
        .catch(error => {
          console.error('Error fetching order details:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [clearBasket, lastOrder, navigate]);

  // If no order is found, show simple message (should redirect)
  if (!lastOrder) {
    return null;
  }

  // Parse items from JSON if available
  const orderItems: OrderItemDisplay[] = orderDetails?.items 
    ? JSON.parse(orderDetails.items) 
    : [];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <SEO 
        title="Thank You for Your Order | Smartblinds Croatia"
        description="Your order has been successfully submitted."
      />
      
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Thank You for Your Order!
        </h1>
        
        <div className="mb-6 text-left bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Order Reference:</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{lastOrder.orderId}</p>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Status:</p>
          <p className="text-green-600 dark:text-green-400 font-medium mb-4">
            {orderDetails?.status ? 
              orderDetails.status.charAt(0).toUpperCase() + orderDetails.status.slice(1) : 
              'Order Received'}
          </p>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : orderDetails && (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Customer:</p>
              <p className="text-gray-900 dark:text-white mb-4">{orderDetails.customer_name}</p>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Email:</p>
              <p className="text-gray-900 dark:text-white mb-4">{orderDetails.customer_email}</p>
              
              {orderItems.length > 0 && (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Items:</p>
                  <div className="pl-2 mb-4">
                    {orderItems.map((item, index) => (
                      <div key={index} className="text-gray-900 dark:text-white text-sm py-1 border-b border-gray-200 dark:border-gray-600 last:border-0">
                        {item.productName} × {item.quantity} - €{(item.price * item.quantity).toFixed(2)}
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Total Amount:</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                €{orderDetails.total_amount.toFixed(2)}
              </p>
            </>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We have received your order and will process it shortly. 
          Please save your order reference number for tracking.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
          
          <Link 
            to="/products"
            className="px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage; 