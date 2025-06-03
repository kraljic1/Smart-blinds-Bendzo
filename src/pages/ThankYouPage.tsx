import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import { useBasketContext } from '../hooks/useBasketContext';
import { useOrderContext } from '../context/useOrderContext';
import { getOrderById } from '../utils/orderUtils';
import {
  OrderSuccessHeader,
  PrintButton,
  InvoiceHeader,
  CustomerInformation,
  OrderItemsTable,
  OrderSummary,
  OrderNotes,
  NextSteps,
  ActionButtons,
  ContactInfo,
  LoadingSpinner,
  ExtendedOrderData,
  OrderItemDisplay
} from '../components/Order';
import '../styles/print.css';

const ThankYouPage: React.FC = () => {
  const { clearBasket } = useBasketContext();
  const { lastOrder } = useOrderContext();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<ExtendedOrderData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Clear the basket when this page is reached
    clearBasket();
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [clearBasket]);

  useEffect(() => {
    // If there's no order info, redirect to home
    if (!lastOrder) {
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
          setOrderDetails(data as unknown as ExtendedOrderData);
        })
        .catch(error => {
          console.error('Error fetching order details:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [lastOrder, navigate]);

  // If no order is found, show simple message (should redirect)
  if (!lastOrder) {
    return null;
  }

  // Get items from the order details
  const orderItems: OrderItemDisplay[] = orderDetails?.items || [];

  // Calculate subtotal from items
  const subtotal = orderItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  const taxAmount = orderDetails?.taxAmount || (subtotal * 0.25); // 25% PDV
  const shippingCost = orderDetails?.shippingCost || 0;
  const total = orderDetails?.totalAmount || (subtotal + taxAmount + shippingCost);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <SEO 
        title="Hvala vam na narudžbi | Smartblinds Croatia"
        description="Vaša narudžba je uspješno poslana."
      />
      
      <div className="max-w-4xl mx-auto">
        <OrderSuccessHeader />
        
        <PrintButton onClick={handlePrint} />

        {/* Order Receipt */}
        <div className="print-invoice bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <InvoiceHeader 
            orderId={lastOrder.orderId || ''} 
            orderDetails={orderDetails} 
          />

          {isLoading ? (
            <LoadingSpinner />
          ) : orderDetails ? (
            <>
              <CustomerInformation orderDetails={orderDetails} />
              
              <OrderItemsTable orderItems={orderItems} />

              <OrderSummary 
                subtotal={subtotal}
                taxAmount={taxAmount}
                shippingCost={shippingCost}
                total={total}
              />

              {orderDetails.notes && (
                <OrderNotes notes={orderDetails.notes} />
              )}
            </>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">Nema dostupnih detalja narudžbe</p>
            </div>
          )}
        </div>

        <NextSteps />
        
        <ActionButtons onPrint={handlePrint} />

        <ContactInfo />
      </div>
    </div>
  );
};

export default ThankYouPage; 