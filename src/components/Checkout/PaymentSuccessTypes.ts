export interface PaymentSuccessProps {
 orderDetails: {
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
 };
 onContinueShopping: () => void;
} 