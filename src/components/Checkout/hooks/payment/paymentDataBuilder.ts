import { FormData } from '../../CheckoutFormTypes';

export interface BasketItem {
 product: {
 id: string;
 name: string;
 price: number;
 };
 quantity: number;
 options?: Record<string, string | number | boolean>;
}

export interface PaymentIntentData {
 amount: number;
 currency: string;
 customer: {
 fullName: string;
 email: string;
 phone: string;
 address: string;
 shippingAddress: string;
 needsR1Invoice: boolean;
 companyName?: string;
 companyOib?: string;
 };
 items: Array<{
 productId: string;
 productName: string;
 quantity: number;
 price: number;
 options?: Record<string, string | number | boolean>;
 }>;
 metadata: {
 shippingMethod: string;
 notes: string;
 };
}

/**
 * Builds customer data for payment intent
 */
export const buildCustomerData = (formData: FormData) => {
 return {
 fullName: formData.fullName,
 email: formData.email,
 phone: `${formData.phoneCode}${formData.phoneNumber}`,
 address: formData.address,
 shippingAddress: formData.shippingAddress || formData.address,
 needsR1Invoice: formData.needsR1Invoice,
 companyName: formData.companyName,
 companyOib: formData.companyOib
 };
};

/**
 * Builds items data for payment intent
 */
export const buildItemsData = (items: BasketItem[]) => {
 return items.map(item => ({
 productId: item.product.id,
 productName: item.product.name,
 quantity: item.quantity,
 price: item.product.price,
 options: item.options
 }));
};

/**
 * Builds metadata for payment intent
 */
export const buildMetadata = (formData: FormData) => {
 return {
 shippingMethod: formData.shippingMethod,
 notes: formData.additionalNotes || ''
 };
};

/**
 * Builds complete payment intent data
 */
export const buildPaymentIntentData = (
 formData: FormData,
 items: BasketItem[],
 totalPrice: number
): PaymentIntentData => {
 return {
 amount: totalPrice,
 currency: 'eur',
 customer: buildCustomerData(formData),
 items: buildItemsData(items),
 metadata: buildMetadata(formData)
 };
}; 