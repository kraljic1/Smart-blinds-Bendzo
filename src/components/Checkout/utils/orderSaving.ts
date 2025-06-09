import { safeLog } from '../../../utils/errorHandler';
import { OrderSaveData } from './orderTypes';
import { logOrderPreparation, createConfirmPaymentData, generateOrderId } from './orderHelpers';
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
  logOrderPreparation(items);
  
  const confirmPaymentData = createConfirmPaymentData(
    paymentIntentId,
    formData,
    items,
    getTotalPrice,
    getShippingCost
  );

  let orderId = '';
  let orderSaved = false;

  try {
    // Try to use Netlify function first
    const isNetlifyAvailable = await testNetlifyFunction();
    
    if (isNetlifyAvailable) {
      orderId = await saveOrderViaNetlify(confirmPaymentData);
      orderSaved = true;
    } else {
      throw new Error('Function not available');
    }
  } catch {
    safeLog.warn('Netlify function check failed, falling back to direct Supabase save');
    
    // Fallback to direct Supabase save
    try {
      orderId = generateOrderId();
      await saveOrderToSupabase(orderId, formData, items, paymentIntentId, getTotalPrice, getShippingCost);
      orderSaved = true;
    } catch (supabaseError) {
      safeLog.error('Failed to save order via Supabase fallback', supabaseError);
      throw supabaseError;
    }
  }

  if (!orderSaved) {
    safeLog.error('Failed to save order to database via both methods');
    safeLog.warn('Payment succeeded but order save failed - this needs manual intervention');
    throw new Error('Order save failed');
  }

  return orderId;
}; 