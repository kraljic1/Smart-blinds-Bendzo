import { supabase } from '../../../utils/supabaseClient';
import { safeLog } from '../../../utils/errorHandler';
import { FormData } from '../CheckoutFormTypes';
import { BasketItem } from '../../../hooks/useBasket';
import { ConfirmPaymentData, SupabaseOrderData, SavedOrder } from './orderTypes';
import { createOrderData, mapItemsForSupabase } from './orderHelpers';
import { fetchWithTimeout, validateResponse, RETRY_ATTEMPTS, RETRY_DELAY } from './networkUtils';

/**
 * Tests if Netlify function is available
 */
export const testNetlifyFunction = async (): Promise<boolean> => {
 console.log('[CHECKOUT] Attempting to save order via Netlify function...');
 safeLog.info('Checking if confirm-payment function is available...');
 
 try {
 const testResponse = await fetchWithTimeout('/.netlify/functions/confirm-payment', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ test: true })
 }, 10000);

 if (testResponse.status === 404) {
 console.log('[CHECKOUT] Netlify function not deployed, using direct Supabase save');
 safeLog.info('Netlify function not deployed, using direct Supabase save');
 return false;
 }
 
 console.log('[CHECKOUT] Netlify function available, attempting to use it...');
 safeLog.info('Netlify function available, attempting to use it...');
 return true;
 } catch (error) {
 console.log('[CHECKOUT] Error testing Netlify function:', error);
 safeLog.error('Error testing Netlify function availability', error);
 return false;
 }
};

/**
 * Handles a single Netlify function attempt
 */
const attemptNetlifySave = async (confirmPaymentData: ConfirmPaymentData): Promise<string> => {
 const confirmResult = await fetchWithTimeout('/.netlify/functions/confirm-payment', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(confirmPaymentData)
 });

 validateResponse(confirmResult);
 const result = await confirmResult.json();
 
 console.log('[CHECKOUT] Confirm payment result:', result);
 safeLog.info('Confirm payment result received');
 
 if (!result.success) {
 const errorMessage = result.message || result.error || 'Unknown error from Netlify function';
 throw new Error(`Netlify function failed: ${errorMessage}`);
 }

 if (!result.orderId) {
 throw new Error('Netlify function succeeded but returned no orderId');
 }

 return result.orderId;
};

/**
 * Saves order using Netlify function with retry logic
 */
export const saveOrderViaNetlify = async (confirmPaymentData: ConfirmPaymentData): Promise<string> => {
 let lastError: Error | null = null;

 for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
 try {
 safeLog.info(`Attempting to save order via Netlify function (attempt ${attempt}/${RETRY_ATTEMPTS})`);
 
 const orderId = await attemptNetlifySave(confirmPaymentData);
 
 console.log('[CHECKOUT] Order saved successfully via Netlify function');
 safeLog.info('Order saved successfully via Netlify function');
 return orderId;
 } catch (error) {
 lastError = error instanceof Error ? error : new Error(String(error));
 safeLog.error(`Netlify function attempt ${attempt} failed`, lastError);
 
 if (attempt < RETRY_ATTEMPTS) {
 console.log(`[CHECKOUT] Retrying in ${RETRY_DELAY}ms...`);
 await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
 }
 }
 }

 const errorMessage = lastError?.message || 'Unknown error';
 safeLog.error('All Netlify function attempts failed', lastError);
 throw new Error(`Failed to save order via Netlify function after ${RETRY_ATTEMPTS} attempts: ${errorMessage}`);
};

/**
 * Validates order parameters
 */
const validateOrderParams = (orderId: number, items: BasketItem[]): void => {
 if (!orderId || typeof orderId !== 'number' || orderId <= 0) {
 const error = new Error(`Invalid orderId parameter: ${orderId}`);
 safeLog.error('Invalid orderId parameter for saving order items', error);
 throw error;
 }

 if (!Array.isArray(items) || items.length === 0) {
 const error = new Error('Invalid or empty items array');
 safeLog.error('Invalid items array for saving order items', error);
 throw error;
 }
};

/**
 * Saves order items to Supabase with validation
 */
export const saveOrderItemsToSupabase = async (items: BasketItem[], orderId: number): Promise<void> => {
 validateOrderParams(orderId, items);

 try {
 const orderItems = mapItemsForSupabase(items, orderId);

 console.log('[CHECKOUT-SUPABASE] Order items to be saved:', orderItems);
 safeLog.info(`Saving ${orderItems.length} order items to Supabase for order ${orderId}`);
 
 const { data, error: itemsError } = await supabase
 .from('order_items')
 .insert(orderItems)
 .select();

 if (itemsError) {
 safeLog.error('Failed to save order items to Supabase', itemsError);
 throw new Error(`Database error saving order items: ${itemsError.message}`);
 }

 if (!data || data.length === 0) {
 const error = new Error('Order items insert succeeded but returned no data');
 safeLog.error('Order items insert returned no data', error);
 throw error;
 }

 safeLog.info(`Successfully saved ${data.length} order items to Supabase`);
 } catch (error) {
 const errorMessage = error instanceof Error ? error.message : 'Unknown error';
 safeLog.error('Error in saveOrderItemsToSupabase', error);
 throw new Error(`Failed to save order items: ${errorMessage}`);
 }
};

/**
 * Validates Supabase order parameters
 */
const validateSupabaseOrderParams = (
 orderId: string,
 formData: FormData,
 items: BasketItem[],
 paymentIntentId: string
): void => {
 if (!orderId || typeof orderId !== 'string') {
 const error = new Error(`Invalid orderId parameter: ${orderId}`);
 safeLog.error('Invalid orderId parameter for saving order', error);
 throw error;
 }

 if (!paymentIntentId || typeof paymentIntentId !== 'string') {
 const error = new Error(`Invalid paymentIntentId parameter: ${paymentIntentId}`);
 safeLog.error('Invalid paymentIntentId parameter for saving order', error);
 throw error;
 }

 if (!formData) {
 const error = new Error('Missing formData parameter');
 safeLog.error('Missing formData parameter for saving order', error);
 throw error;
 }

 if (!Array.isArray(items) || items.length === 0) {
 const error = new Error('Invalid or empty items array');
 safeLog.error('Invalid items array for saving order', error);
 throw error;
 }
};

/**
 * Saves order to Supabase database
 */
const saveOrderToDatabase = async (orderData: SupabaseOrderData): Promise<SavedOrder> => {
 const { data: order, error: orderError } = await supabase
 .from('orders')
 .insert([orderData])
 .select();

 if (orderError) {
 safeLog.error('Failed to save order to Supabase', orderError);
 throw new Error(`Database error saving order: ${orderError.message}`);
 }

 if (!order || order.length === 0) {
 const error = new Error('Order insert succeeded but returned no data');
 safeLog.error('Order insert returned no data', error);
 throw error;
 }

 const savedOrder = order[0] as SavedOrder;
 if (!savedOrder.id) {
 const error = new Error('Order saved but no ID returned');
 safeLog.error('Order saved but no ID returned', error);
 throw error;
 }

 return savedOrder;
};

/**
 * Order save parameters interface
 */
interface OrderSaveParams {
 orderId: string;
 formData: FormData;
 items: BasketItem[];
 paymentIntentId: string;
 getTotalPrice: () => number;
 getShippingCost: () => number;
}

/**
 * Saves order directly to Supabase with comprehensive validation
 */
export const saveOrderToSupabase = async (params: OrderSaveParams): Promise<void> => {
 const { orderId, formData, items, paymentIntentId, getTotalPrice, getShippingCost } = params;
 
 validateSupabaseOrderParams(orderId, formData, items, paymentIntentId);

 try {
 safeLog.info(`Using direct Supabase client as fallback to save order ${orderId}`);
 
 const orderData = createOrderData({
 orderId,
 formData,
 paymentIntentId,
 getTotalPrice,
 getShippingCost
 });
 safeLog.info('Saving order to Supabase');
 
 const savedOrder = await saveOrderToDatabase(orderData);
 
 safeLog.info(`Order saved successfully with ID: ${savedOrder.id}`);
 await saveOrderItemsToSupabase(items, savedOrder.id);
 
 safeLog.info('Order and items saved successfully to Supabase');
 } catch (error) {
 const errorMessage = error instanceof Error ? error.message : 'Unknown error';
 safeLog.error('Error in saveOrderToSupabase', error);
 throw new Error(`Failed to save order to Supabase: ${errorMessage}`);
 }
}; 