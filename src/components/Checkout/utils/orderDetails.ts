import { FormData } from '../CheckoutFormTypes';
import { BasketItem } from '../../../hooks/useBasket';

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
  console.log('[CREATE-ORDER-DETAILS] Creating order details with items:', items);
  console.log('[CREATE-ORDER-DETAILS] Items length:', items.length);
  
  const orderDetails = {
    paymentIntentId,
    orderNumber: orderId.split('-')[1] || orderId.substring(3, 15),
    date: new Date().toLocaleDateString('hr-HR'),
    time: new Date().toLocaleTimeString('hr-HR'),
    amount: getTotalPrice(),
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
    items: items.map(item => {
      console.log('[CREATE-ORDER-DETAILS] Processing item:', item);
      return {
        id: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
        totalPrice: item.product.price * item.quantity,
        description: item.product.description || ''
      };
    }),
    subtotal: getTotalPrice(),
    tax: getTotalPrice() * 0.25, // 25% PDV
    total: getTotalPrice(),
    notes: formData.additionalNotes || ''
  };
  
  console.log('[CREATE-ORDER-DETAILS] Created order details:', orderDetails);
  console.log('[CREATE-ORDER-DETAILS] Order details items:', orderDetails.items);
  
  return orderDetails;
}; 