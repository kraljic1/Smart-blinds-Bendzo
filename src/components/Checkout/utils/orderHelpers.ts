import { safeLog } from '../../../utils/errorHandler';
import { FormData } from '../CheckoutFormTypes';
import { BasketItem } from '../../../hooks/useBasket';
import { CustomerData, MappedItem, ConfirmPaymentData, SupabaseOrderData } from './orderTypes';

/**
 * Validates required form data fields
 */
const validateRequiredFields = (formData: FormData): void => {
  const requiredFields = [
    { field: 'fullName', name: 'Full Name' },
    { field: 'email', name: 'Email' },
    { field: 'phoneCode', name: 'Phone Code' },
    { field: 'phoneNumber', name: 'Phone Number' },
    { field: 'address', name: 'Address' },
    { field: 'shippingMethod', name: 'Shipping Method' }
  ];

  const missingFields = requiredFields.filter(({ field }) => {
    const value = formData[field];
    return !value || (typeof value === 'string' && value.trim() === '');
  });

  if (missingFields.length > 0) {
    const fieldNames = missingFields.map(({ name }) => name).join(', ');
    throw new Error(`Missing required fields: ${fieldNames}`);
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    throw new Error('Invalid email format');
  }

  // Validate R1 invoice requirements
  if (formData.needsR1Invoice) {
    if (!formData.companyName || formData.companyName.trim() === '') {
      throw new Error('Company name is required for R1 invoice');
    }
    if (!formData.companyOib || formData.companyOib.trim() === '') {
      throw new Error('Company OIB is required for R1 invoice');
    }
  }
};

/**
 * Logs payment success for audit purposes
 */
export const logPaymentSuccess = (): void => {
  safeLog.info('Payment completed successfully');
};

/**
 * Creates customer data object from form data
 */
export const createCustomerData = (formData: FormData): CustomerData => {
  // Validate required fields before creating customer data
  validateRequiredFields(formData);

  return {
    fullName: formData.fullName.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: `${formData.phoneCode}${formData.phoneNumber}`,
    address: formData.address.trim(),
    shippingAddress: formData.shippingAddress?.trim() || formData.address.trim(),
    paymentMethod: 'Credit/Debit Card',
    shippingMethod: formData.shippingMethod,
    needsR1Invoice: formData.needsR1Invoice,
    companyName: formData.companyName?.trim() || undefined,
    companyOib: formData.companyOib?.trim() || undefined
  };
};

/**
 * Maps basket items to API format
 */
export const mapItemsForAPI = (items: BasketItem[]): MappedItem[] => {
  return items.map(item => ({
    productId: item.product.id,
    productName: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
    options: item.options
  }));
};

/**
 * Parameters for creating confirmation payment data
 */
interface ConfirmPaymentParams {
  paymentIntentId: string;
  formData: FormData;
  items: BasketItem[];
  getTotalPrice: () => number;
  getShippingCost: () => number;
}

/**
 * Creates confirmation payment data structure
 */
export const createConfirmPaymentData = (params: ConfirmPaymentParams): ConfirmPaymentData => {
  const { paymentIntentId, formData, items, getTotalPrice, getShippingCost } = params;
  
  return {
    paymentIntentId,
    customer: createCustomerData(formData),
    items: mapItemsForAPI(items),
    notes: formData.additionalNotes,
    totalAmount: getTotalPrice(),
    taxAmount: 0,
    shippingCost: getShippingCost()
  };
};

/**
 * Generates unique order ID
 */
export const generateOrderId = (): string => {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

/**
 * Parameters for creating order data
 */
interface OrderDataParams {
  orderId: string;
  formData: FormData;
  paymentIntentId: string;
  getTotalPrice: () => number;
  getShippingCost: () => number;
}

/**
 * Creates order data for Supabase
 */
export const createOrderData = (params: OrderDataParams): SupabaseOrderData => {
  const { orderId, formData, paymentIntentId, getTotalPrice, getShippingCost } = params;
  
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
  return items.map(item => ({
    order_id: orderId,
    product_id: item.product.id,
    product_name: item.product.name,
    product_image: item.product.image,
    quantity: item.quantity,
    unit_price: item.product.price,
    subtotal: item.product.price * item.quantity,
    options: item.options
  }));
}; 