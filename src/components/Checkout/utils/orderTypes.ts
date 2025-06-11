import { FormData } from '../CheckoutFormTypes';
import { BasketItem } from '../../../hooks/useBasket';

export interface OrderSaveData {
 paymentIntentId: string;
 formData: FormData;
 items: BasketItem[];
 getTotalPrice: () => number;
 getShippingCost: () => number;
}

export interface ConfirmPaymentData {
 paymentIntentId: string;
 customer: CustomerData;
 items: MappedItem[];
 notes: string;
 totalAmount: number;
 taxAmount: number;
 shippingCost: number;
}

export interface CustomerData {
 fullName: string;
 email: string;
 phone: string;
 address: string;
 shippingAddress: string;
 paymentMethod: string;
 shippingMethod: string;
 needsR1Invoice: boolean;
 companyName?: string;
 companyOib?: string;
}

export interface MappedItem {
 productId: string;
 productName: string;
 quantity: number;
 price: number;
 options: Record<string, string | number | boolean> | undefined;
}

export interface SupabaseOrderData {
 order_id: string;
 customer_name: string;
 customer_email: string;
 customer_phone: string;
 billing_address: string;
 shipping_address: string;
 notes: string;
 total_amount: number;
 tax_amount: number;
 shipping_cost: number;
 payment_method: string;
 payment_status: string;
 shipping_method: string;
 status: string;
 stripe_payment_intent_id: string;
 created_at: string;
 updated_at: string;
 company_name: string | null;
 company_oib: string | null;
 needs_r1_invoice: boolean;
}

export interface SavedOrder {
 id: number;
 order_id: string;
 customer_name: string;
 customer_email: string;
 customer_phone: string;
 billing_address: string;
 shipping_address: string;
 notes: string;
 total_amount: number;
 tax_amount: number;
 shipping_cost: number;
 payment_method: string;
 payment_status: string;
 shipping_method: string;
 status: string;
 stripe_payment_intent_id: string;
 created_at: string;
 updated_at: string;
 company_name: string | null;
 company_oib: string | null;
 needs_r1_invoice: boolean;
} 