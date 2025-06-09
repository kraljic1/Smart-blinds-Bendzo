import { safeLog } from '../../../utils/errorHandler';
import { OrderSaveData } from './orderTypes';
import { createConfirmPaymentData, generateOrderId } from './orderHelpers';
import { testNetlifyFunction, saveOrderViaNetlify, saveOrderToSupabase } from './orderServices';

/**
 * Main function to save order to database
 * Attempts to use Netlify function first, falls back to direct Supabase save
 */
export const saveOrderToDatabase = async ({
  paymentIntentId,
  formData,
  items,
  getTotalPrice,
  getShippingCost
}: OrderSaveData): Promise<string> => {
  safeLog.info('Starting order save process', { 
    itemCount: items.length, 
    paymentIntentId,
    totalAmount: getTotalPrice()
  });
  
  const confirmPaymentData = createConfirmPaymentData({
    paymentIntentId,
    formData,
    items,
    getTotalPrice,
    getShippingCost
  });

  let orderId = '';

  try {
    // Try to use Netlify function first
    const isNetlifyAvailable = await testNetlifyFunction();
    
    if (isNetlifyAvailable) {
      safeLog.info('Netlify function available, attempting to save order via Netlify');
      orderId = await saveOrderViaNetlify(confirmPaymentData);
      safeLog.info('Order saved successfully via Netlify', { orderId });
      return orderId;
    } else {
      throw new Error('Netlify function not available');
    }
  } catch (netlifyError) {
    safeLog.warn('Netlify function save failed, falling back to direct Supabase save', { 
      error: netlifyError instanceof Error ? netlifyError.message : 'Unknown error',
      paymentIntentId 
    });
    
    // Fallback to direct Supabase save
    try {
      orderId = generateOrderId();
      safeLog.info('Attempting direct Supabase save', { orderId });
      await saveOrderToSupabase({
        orderId,
        formData,
        items,
        paymentIntentId,
        getTotalPrice,
        getShippingCost
      });
      safeLog.info('Order saved successfully via Supabase fallback', { orderId });
      return orderId;
    } catch (supabaseError) {
      safeLog.error('Failed to save order via Supabase fallback', { 
        error: supabaseError instanceof Error ? supabaseError.message : 'Unknown error',
        paymentIntentId,
        orderId 
      });
      safeLog.warn('Payment succeeded but order save failed - this needs manual intervention', {
        paymentIntentId,
        customerEmail: formData.email
      });
      throw supabaseError;
    }
  }
}; 