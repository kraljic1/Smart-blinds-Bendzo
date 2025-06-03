import { supabase } from '../../../utils/supabaseClient';
import { safeLog } from '../../../utils/errorHandler';
import { FormData } from '../CheckoutFormTypes';
import { BasketItem } from '../../../hooks/useBasket';

interface OrderSaveData {
  paymentIntentId: string;
  formData: FormData;
  items: BasketItem[];
  getTotalPrice: () => number;
  getShippingCost: () => number;
}

export const saveOrderToDatabase = async ({
  paymentIntentId,
  formData,
  items,
  getTotalPrice,
  getShippingCost
}: OrderSaveData): Promise<string> => {
  console.log('[CHECKOUT] Preparing confirmation data');
  console.log('[CHECKOUT] Items being saved:', items);
  console.log('[CHECKOUT] Items details:', items.map(item => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity
  })));
  safeLog.info('Payment successful');
  
  const confirmPaymentData = {
    paymentIntentId,
    customer: {
      fullName: formData.fullName,
      email: formData.email,
      phone: `${formData.phoneCode}${formData.phoneNumber}`,
      address: formData.address,
      shippingAddress: formData.shippingAddress || formData.address,
      paymentMethod: 'Credit/Debit Card',
      shippingMethod: formData.shippingMethod,
      needsR1Invoice: formData.needsR1Invoice,
      companyName: formData.companyName,
      companyOib: formData.companyOib
    },
    items: items.map(item => {
      console.log('[CHECKOUT] Mapping item for API:', item);
      const mappedItem = {
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        options: item.options
      };
      console.log('[CHECKOUT] Mapped item:', mappedItem);
      return mappedItem;
    }),
    notes: formData.additionalNotes,
    totalAmount: getTotalPrice(),
    taxAmount: 0,
    shippingCost: getShippingCost()
  };

  console.log('[CHECKOUT] Confirm payment data:', confirmPaymentData);
  console.log('[CHECKOUT] Confirm payment data items:', confirmPaymentData.items);

  let orderId = '';
  let orderSaved = false;

  try {
    // Try to use Netlify function first
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
      throw new Error('Function not available');
    } else {
      console.log('[CHECKOUT] Netlify function available, attempting to use it...');
      safeLog.info('Netlify function available, attempting to use it...');
      
      const confirmResult = await fetch('/.netlify/functions/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(confirmPaymentData)
      });

      if (confirmResult.ok) {
        const result = await confirmResult.json();
        console.log('[CHECKOUT] Confirm payment result:', result);
        safeLog.info('Confirm payment result received');
        
        if (result.success) {
          console.log('[CHECKOUT] Order saved successfully via Netlify function');
          safeLog.info('Order saved successfully via Netlify function');
          orderId = result.orderId;
          orderSaved = true;
        } else {
          throw new Error('Netlify function failed');
        }
      } else {
        throw new Error('Netlify function failed');
      }
    }
  } catch {
    safeLog.warn('Netlify function check failed, falling back to direct Supabase save');
    
    // Fallback to direct Supabase save
    try {
      safeLog.info('Using direct Supabase client as fallback to save order');
      
      orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      const orderData = {
        order_id: orderId,
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: `${formData.phoneCode}${formData.phoneNumber}`,
        billing_address: formData.address,
        shipping_address: formData.shippingAddress || formData.address,
        notes: formData.additionalNotes,
        total_amount: getTotalPrice(),
        tax_amount: 0,
        shipping_cost: getShippingCost(),
        payment_method: 'Credit/Debit Card',
        payment_status: 'completed',
        shipping_method: formData.shippingMethod,
        status: 'received',
        stripe_payment_intent_id: paymentIntentId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        company_name: formData.companyName || null,
        company_oib: formData.companyOib || null,
        needs_r1_invoice: formData.needsR1Invoice
      };

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

      // Insert order items
      const orderItems = items.map(item => {
        console.log('[CHECKOUT-SUPABASE] Mapping item for Supabase:', item);
        const mappedItem = {
          order_id: order[0].id,
          product_id: item.product.id,
          product_name: item.product.name,
          product_image: item.product.image,
          quantity: item.quantity,
          unit_price: item.product.price,
          subtotal: item.product.price * item.quantity,
          options: item.options
        };
        console.log('[CHECKOUT-SUPABASE] Mapped item for Supabase:', mappedItem);
        return mappedItem;
      });

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