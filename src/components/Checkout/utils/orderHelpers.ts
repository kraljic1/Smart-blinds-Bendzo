import { safeLog } from '../../../utils/errorHandler';
import { FormData } from '../CheckoutFormTypes';
import { BasketItem } from '../../../hooks/useBasket';
import { CustomerData, MappedItem, ConfirmPaymentData } from './orderTypes';

/**
 * Logs order preparation details for debugging
 */
export const logOrderPreparation = (items: BasketItem[]): void => {
  console.log('[CHECKOUT] Preparing confirmation data');
  console.log('[CHECKOUT] Items being saved:', items);
  console.log('[CHECKOUT] Items details:', items.map(item => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity
  })));
  safeLog.info('Payment successful');
};

/**
 * Creates customer data object from form data
 */
export const createCustomerData = (formData: FormData): CustomerData => {
  return {
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
  };
};

/**
 * Maps basket items to API format
 */
export const mapItemsForAPI = (items: BasketItem[]): MappedItem[] => {
  return items.map(item => {
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
  });
};

/**
 * Creates confirmation payment data structure
 */
export const createConfirmPaymentData = (
  paymentIntentId: string,
  formData: FormData,
  items: BasketItem[],
  getTotalPrice: () => number,
  getShippingCost: () => number
): ConfirmPaymentData => {
  const confirmPaymentData = {
    paymentIntentId,
    customer: createCustomerData(formData),
    items: mapItemsForAPI(items),
    notes: formData.additionalNotes,
    totalAmount: getTotalPrice(),
    taxAmount: 0,
    shippingCost: getShippingCost()
  };

  console.log('[CHECKOUT] Confirm payment data:', confirmPaymentData);
  console.log('[CHECKOUT] Confirm payment data items:', confirmPaymentData.items);
  
  return confirmPaymentData;
};

/**
 * Generates unique order ID
 */
export const generateOrderId = (): string => {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

/**
 * Creates order data for Supabase
 */
export const createOrderData = (
  orderId: string,
  formData: FormData,
  paymentIntentId: string,
  getTotalPrice: () => number,
  getShippingCost: () => number
) => {
  return {
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
};

/**
 * Maps items for Supabase format
 */
export const mapItemsForSupabase = (items: BasketItem[], orderId: number) => {
  return items.map(item => {
    console.log('[CHECKOUT-SUPABASE] Mapping item for Supabase:', item);
    const mappedItem = {
      order_id: orderId,
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
}; 