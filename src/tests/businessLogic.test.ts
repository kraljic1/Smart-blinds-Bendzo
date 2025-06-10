import { describe, it, expect } from 'vitest';
import { validateOrderData } from '../utils/security/businessValidators';

describe('Business Logic Security Tests', () => {
  it('should validate order data integrity', () => {
    const invalidOrders = [
      { customer: null, items: [], totalAmount: 100 },
      { customer: { email: 'test@test.com' }, items: [], totalAmount: -100 },
      { customer: { email: 'invalid-email' }, items: [{}], totalAmount: 100 },
      { customer: { email: 'test@test.com' }, items: [{ price: -50 }], totalAmount: 100 }
    ];

    invalidOrders.forEach(order => {
      const result = validateOrderData(order);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  it('should prevent price manipulation', () => {
    const order = {
      customer: { email: 'test@test.com', fullName: 'Test User' },
      items: [
        { name: 'Product 1', price: 100, quantity: 2 },
        { name: 'Product 2', price: 50, quantity: 1 }
      ],
      totalAmount: 1 // Manipulated total (should be 250)
    };

    const result = validateOrderData(order);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Total amount does not match calculated sum');
  });

  it('should accept valid orders', () => {
    const validOrder = {
      customer: { email: 'test@test.com', fullName: 'Test User' },
      items: [
        { name: 'Product 1', price: 100, quantity: 2 },
        { name: 'Product 2', price: 50, quantity: 1 }
      ],
      totalAmount: 250 // Correct total
    };

    const result = validateOrderData(validOrder);
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('should reject orders with negative prices', () => {
    const orderWithNegativePrice = {
      customer: { email: 'test@test.com', fullName: 'Test User' },
      items: [
        { name: 'Product 1', price: -100, quantity: 1 }
      ],
      totalAmount: -100
    };

    const result = validateOrderData(orderWithNegativePrice);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Item prices cannot be negative');
  });
}); 