import { FormData } from '../CheckoutFormTypes';
import { BasketItem } from '../../../hooks/useBasket';
import { getShippingCost } from '../../../utils/shippingCosts';

export interface OrderDetails {
 paymentIntentId: string;
 orderNumber: string;
 date: string;
 time: string;
 amount: number;
 currency: string;
 customer: {
 name: string;
 email: string;
 phone: string;
 address: string;
 city: string;
 postalCode: string;
 country: string;
 };
 company?: {
 name: string;
 oib: string;
 };
 shipping: {
 method: string;
 address: {
 address: string;
 city: string;
 postalCode: string;
 };
 };
 items: {
 id: string;
 name: string;
 quantity: number;
 unitPrice: number;
 totalPrice: number;
 description: string;
 }[];
 subtotal: number;
 shippingCost: number;
 tax: number;
 total: number;
 notes: string;
}

interface CreateOrderDetailsParams {
 paymentIntentId: string;
 orderId: string;
 formData: FormData;
 items: BasketItem[];
 getTotalPrice: () => number;
}

export const createOrderDetails = ({
 paymentIntentId,
 orderId,
 formData,
 items,
 getTotalPrice
}: CreateOrderDetailsParams): OrderDetails => {
 const subtotal = getTotalPrice(); // This is VAT-inclusive
 const shippingCost = getShippingCost(formData.shippingMethod || 'Standard delivery');
 const totalWithShipping = subtotal + shippingCost;
 
 // Calculate VAT from VAT-inclusive prices: VAT = price × (25/125) = price × 0.2
 const vatAmount = subtotal * 0.2;
 
 const orderDetails = {
 paymentIntentId,
 orderNumber: orderId.split('-')[1] || orderId.substring(3, 15),
 date: new Date().toLocaleDateString('hr-HR'),
 time: new Date().toLocaleTimeString('hr-HR'),
 amount: totalWithShipping,
 currency: 'EUR',
 customer: {
 name: formData.fullName,
 email: formData.email,
 phone: `${formData.phoneCode}${formData.phoneNumber}`,
 address: formData.address,
 city: formData.city,
 postalCode: formData.postalCode,
 country: 'Hrvatska'
 },
 company: formData.needsR1Invoice ? {
 name: formData.companyName,
 oib: formData.companyOib
 } : undefined,
 shipping: {
 method: formData.shippingMethod,
 address: formData.sameAsBilling ? {
 address: formData.address,
 city: formData.city,
 postalCode: formData.postalCode
 } : {
 address: formData.shippingAddress,
 city: formData.shippingCity,
 postalCode: formData.shippingPostalCode
 }
 },
 items: items.map(item => ({
 id: item.product.id,
 name: item.product.name,
 quantity: item.quantity,
 unitPrice: item.calculatedPrice ?? item.product.price, // Use calculated price if available
 totalPrice: (item.calculatedPrice ?? item.product.price) * item.quantity,
 description: item.product.description || ''
 })),
 subtotal: subtotal, // VAT-inclusive subtotal
 shippingCost: shippingCost,
 tax: vatAmount, // VAT portion of the inclusive price
 total: totalWithShipping, // Total including shipping
 notes: formData.additionalNotes || ''
 };
 
 return orderDetails;
}; 