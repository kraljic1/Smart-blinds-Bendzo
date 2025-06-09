import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasketContext } from '../../../hooks/useBasketContext';
import { useOrderContext } from '../../../context/useOrderContext';
import { safeLog, sanitizeErrorMessage } from '../../../utils/errorHandler';
import { FormData } from '../CheckoutFormTypes';
import { saveOrderToDatabase } from '../utils/orderSaving';
import { createOrderDetails, OrderDetails } from '../utils/orderDetails';
import { getShippingCost } from '../../../utils/shippingCosts';

interface PaymentHandlingState {
  orderComplete: boolean;
  orderDetails: OrderDetails | null;
}

export const usePaymentHandling = (
  formData: FormData,
  setError: (error: string) => void,
  setSubmitting: (submitting: boolean) => void
) => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearBasket } = useBasketContext();
  const { setLastOrder, setLastOrderDetails } = useOrderContext();

  const [paymentState, setPaymentState] = useState<PaymentHandlingState>({
    orderComplete: false,
    orderDetails: null
  });

  const getShippingCostForOrder = () => {
    return getShippingCost(formData.shippingMethod || 'Standard delivery');
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    console.log('[CHECKOUT] handlePaymentSuccess called with paymentIntentId:', paymentIntentId);
    
    try {
      const orderId = await saveOrderToDatabase({
        paymentIntentId,
        formData,
        items,
        getTotalPrice,
        getShippingCost: getShippingCostForOrder
      });

      const orderDetails = createOrderDetails({
        paymentIntentId,
        orderId,
        formData,
        items,
        getTotalPrice
      });

      safeLog.info('Setting order details and marking order as complete');
      setPaymentState(prev => ({ 
        ...prev, 
        orderDetails,
        orderComplete: true 
      }));
      
      // Set order in context for Thank You page
      console.log('[CHECKOUT] Setting order in context for Thank You page');
      safeLog.info('Setting order in context for Thank You page');
      setLastOrder({
        success: true,
        orderId: orderId,
        message: 'Order created successfully'
      });
      
      // Also store the complete order details
      console.log('[CHECKOUT] Setting complete order details in context');
      safeLog.info('Setting complete order details in context');
      setLastOrderDetails(orderDetails);
      
      // Clear basket
      clearBasket();
      
      // Use setTimeout to ensure state updates are processed before navigation
      setTimeout(() => {
        console.log('[CHECKOUT] Navigating to Thank You page');
        safeLog.info('Navigating to Thank You page');
        navigate('/thank-you');
      }, 100);

    } catch (error) {
      safeLog.error('Error in payment success handling', error);
      safeLog.warn('Payment succeeded but order save failed - this needs manual intervention');
      
      // Even if order saving fails, we should still navigate to thank you page
      // since the payment was successful
      console.log('[CHECKOUT] Order save failed but payment succeeded, still navigating to thank you page');
      setError('Payment successful, but there was an issue saving your order. Please contact support with your payment confirmation.');
      navigate('/thank-you');
    }
  };

  const handlePaymentError = (error: unknown) => {
    safeLog.error('Payment error', error);
    setError(sanitizeErrorMessage(error, 'payment'));
    setSubmitting(false);
  };

  const handleContinueShopping = () => {
    clearBasket();
    setPaymentState({
      orderComplete: false,
      orderDetails: null
    });
    window.location.href = '/';
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:support@yourcompany.com?subject=Payment Assistance Needed&body=I need help completing my order payment.';
  };

  return {
    paymentState,
    handlePaymentSuccess,
    handlePaymentError,
    handleContinueShopping,
    handleContactSupport,
    getShippingCost: getShippingCostForOrder
  };
}; 