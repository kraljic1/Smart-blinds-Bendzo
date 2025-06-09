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