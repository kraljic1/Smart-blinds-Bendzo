import { supabase } from '../../../utils/supabaseClient';
import { safeLog } from '../../../utils/errorHandler';
import { FormData } from '../CheckoutFormTypes';
import { BasketItem } from '../../../hooks/useBasket';
import { ConfirmPaymentData } from './orderTypes';
import { createOrderData, mapItemsForSupabase } from './orderHelpers';

/**
 * Tests if Netlify function is available
 */
export const testNetlifyFunction = async (): Promise<boolean> => {
  console.log('[CHECKOUT] Attempting to save order via Netlify function...');
  safeLog.info('Checking if confirm-payment function is available...');
  
  const testResponse = await fetch('/.netlify/functions/confirm-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ test: true })
  });

  if (testResponse.status === 404) {
    console.log('[CHECKOUT] Netlify function not deployed, using direct Supabase save');
    safeLog.info('Netlify function not deployed, using direct Supabase save');
    return false;
  }
  
  console.log('[CHECKOUT] Netlify function available, attempting to use it...');
  safeLog.info('Netlify function available, attempting to use it...');
  return true;
};

/**
 * Saves order using Netlify function
 */
export const saveOrderViaNetlify = async (confirmPaymentData: ConfirmPaymentData): Promise<string> => {
  const confirmResult = await fetch('/.netlify/functions/confirm-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(confirmPaymentData)
  });

  if (!confirmResult.ok) {
    throw new Error('Netlify function failed');
  }

  const result = await confirmResult.json();
  console.log('[CHECKOUT] Confirm payment result:', result);
  safeLog.info('Confirm payment result received');
  
  if (!result.success) {
    throw new Error('Netlify function failed');
  }

  console.log('[CHECKOUT] Order saved successfully via Netlify function');
  safeLog.info('Order saved successfully via Netlify function');
  return result.orderId;
};

/**
 * Saves order items to Supabase
 */
export const saveOrderItemsToSupabase = async (items: BasketItem[], orderId: number): Promise<void> => {
  const orderItems = mapItemsForSupabase(items, orderId);

  console.log('[CHECKOUT-SUPABASE] Order items to be saved:', orderItems);
  safeLog.info('Saving order items to Supabase');
  
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    safeLog.error('Failed to save order items to Supabase', itemsError);
    throw itemsError;
  }

  safeLog.info('Order items saved to Supabase successfully');
};

/**
 * Saves order directly to Supabase
 */
export const saveOrderToSupabase = async (
  orderId: string,
  formData: FormData,
  items: BasketItem[],
  paymentIntentId: string,
  getTotalPrice: () => number,
  getShippingCost: () => number
): Promise<void> => {
  safeLog.info('Using direct Supabase client as fallback to save order');
  
  const orderData = createOrderData(orderId, formData, paymentIntentId, getTotalPrice, getShippingCost);

  safeLog.info('Saving order to Supabase');
  
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([orderData])
    .select();

  if (orderError) {
    safeLog.error('Failed to save order to Supabase', orderError);
    throw orderError;
  }

  safeLog.info('Order saved to Supabase');
  await saveOrderItemsToSupabase(items, order[0].id);
}; 