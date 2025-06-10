import type { PaymentTestData, ConfirmPaymentData } from './types';

export const createTestPaymentData = (): PaymentTestData => ({
  amount: 100,
  currency: 'eur',
  customer: {
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '+385123456789',
    address: 'Test Address 123',
    shippingAddress: 'Test Address 123'
  },
  items: [{
    productId: 'test-product',
    productName: 'Test Product',
    quantity: 1,
    price: 100
  }],
  metadata: {
    shippingMethod: 'standard',
    notes: 'Test order'
  }
});

export const createTestConfirmPaymentData = (): ConfirmPaymentData => ({
  paymentIntentId: 'pi_test_123456789',
  amount: 100,
  currency: 'eur',
  customer: {
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '+385123456789',
    address: 'Test Address 123',
    shippingAddress: 'Test Address 123',
    paymentMethod: 'Credit/Debit Card',
    shippingMethod: 'standard'
  },
  items: [{
    productId: 'test-product',
    productName: 'Test Product',
    quantity: 1,
    price: 100
  }],
  notes: 'Test order',
  totalAmount: 100,
  taxAmount: 0,
  shippingCost: 0
}); 