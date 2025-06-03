import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasketContext } from '../../../hooks/useBasketContext';
import { useOrderContext } from '../../../context/useOrderContext';
import { safeLog, sanitizeErrorMessage } from '../../../utils/errorHandler';
import { FormData } from '../CheckoutFormTypes';
import { saveOrderToDatabase } from '../utils/orderSaving';
import { createOrderDetails, OrderDetails } from '../utils/orderDetails';

interface PaymentHandlingState {
  orderComplete: boolean;
  showManualPayment: boolean;
  orderDetails: OrderDetails | null;
}

export const usePaymentHandling = (
  formData: FormData,
  setError: (error: string) => void,
  setSubmitting: (submitting: boolean) => void
) => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearBasket } = useBasketContext();
  const { setLastOrder } = useOrderContext();

  const [paymentState, setPaymentState] = useState<PaymentHandlingState>({
    orderComplete: false,
    showManualPayment: false,
    orderDetails: null
  });

  const getShippingCost = () => {
    return 0; // Free shipping for now
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    console.log('[CHECKOUT] handlePaymentSuccess called with paymentIntentId:', paymentIntentId);
    
    try {
      const orderId = await saveOrderToDatabase({
        paymentIntentId,
        formData,
        items,
        getTotalPrice,
        getShippingCost
      });

      const orderDetails = createOrderDetails({
        paymentIntentId,
        orderId,
        formData,
        items,
        getTotalPrice
      });

      safeLog.info('Setting order details');
      setPaymentState(prev => ({ ...prev, orderDetails }));
      
      // Set order in context for Thank You page
      console.log('[CHECKOUT] Setting order in context for Thank You page');
      safeLog.info('Setting order in context for Thank You page');
      setLastOrder({
        success: true,
        orderId: orderId,
        message: 'Order created successfully'
      });
      
      // Clear basket
      clearBasket();
      
      // Navigate to Thank You page
      console.log('[CHECKOUT] Navigating to Thank You page');
      safeLog.info('Navigating to Thank You page');
      navigate('/thank-you');

    } catch (error) {
      safeLog.error('Error in payment success handling', error);
      safeLog.warn('Payment succeeded but order save failed - this needs manual intervention');
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
      showManualPayment: false,
      orderDetails: null
    });
    window.location.href = '/';
  };

  const handleContactSupport = () => {
    window.location.href = 'mailto:support@yourcompany.com?subject=Payment Assistance Needed&body=I need help completing my order payment.';
  };

  const handleShowManualPayment = () => {
    setPaymentState(prev => ({ ...prev, showManualPayment: true }));
  };

  return {
    paymentState,
    handlePaymentSuccess,
    handlePaymentError,
    handleContinueShopping,
    handleContactSupport,
    handleShowManualPayment,
    getShippingCost
  };
}; 