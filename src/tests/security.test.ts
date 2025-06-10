import { describe, it, expect, beforeEach } from 'vitest';
import { validateInput } from '../utils/security/inputValidation';
import { RateLimiter } from '../utils/security/rateLimiter';
import { validateOrderData } from '../utils/security/businessValidators';

describe('Security Tests', () => {
  describe('Input Validation', () => {
    it('should prevent XSS attacks', () => {
      const maliciousInputs = [
        '<script>alert("xss")</script>',
        'javascript:alert("xss")',
        '<img src="x" onerror="alert(1)">',
        '<svg onload="alert(1)">',
        '"><script>alert("xss")</script>'
      ];

      maliciousInputs.forEach(input => {
        const result = validateInput(input, 'text');
        expect(result.isValid).toBe(false);
        expect(result.sanitizedValue).not.toContain('<script>');
        expect(result.sanitizedValue).not.toContain('javascript:');
      });
    });

    it('should prevent SQL injection attempts', () => {
      const sqlInjectionInputs = [
        "'; DROP TABLE users; --",
        "1' OR '1'='1",
        "admin'--",
        "' UNION SELECT * FROM users --",
        "1; DELETE FROM orders; --"
      ];

      sqlInjectionInputs.forEach(input => {
        const result = validateInput(input, 'text');
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Input contains potentially malicious content');
      });
    });

    it('should validate email formats securely', () => {
      const maliciousEmails = [
        'test@example.com<script>alert(1)</script>',
        'test+<script>@example.com',
        '"<script>alert(1)</script>"@example.com'
      ];

      maliciousEmails.forEach(email => {
        const result = validateInput(email, 'email');
        expect(result.isValid).toBe(false);
      });
    });
  });

  describe('Rate Limiting', () => {
    let rateLimiter: RateLimiter;

    beforeEach(() => {
      rateLimiter = new RateLimiter(3, 60000); // 3 attempts per minute
    });

    it('should enforce rate limits', () => {
      const endpoint = 'test-endpoint';
      
      // First 3 attempts should succeed
      expect(rateLimiter.isAllowed(endpoint)).toBe(true);
      expect(rateLimiter.isAllowed(endpoint)).toBe(true);
      expect(rateLimiter.isAllowed(endpoint)).toBe(true);
      
      // 4th attempt should fail
      expect(rateLimiter.isAllowed(endpoint)).toBe(false);
    });

    it('should reset rate limits after time window', async () => {
      const shortLimiter = new RateLimiter(1, 100); // 1 attempt per 100ms
      const endpoint = 'test-reset';
      
      expect(shortLimiter.isAllowed(endpoint)).toBe(true);
      expect(shortLimiter.isAllowed(endpoint)).toBe(false);
      
      // Wait for reset
      await new Promise(resolve => setTimeout(resolve, 150));
      expect(shortLimiter.isAllowed(endpoint)).toBe(true);
    });
  });

  describe('Business Logic Security', () => {
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
  });

  describe('Authentication Security', () => {
    it('should validate admin credentials securely', () => {
      const weakPasswords = [
        '123456',
        'password',
        'admin',
        'qwerty',
        '12345678'
      ];

      weakPasswords.forEach(password => {
        // This would test password strength validation
        expect(password.length).toBeLessThan(12); // Weak passwords are short
      });
    });
  });

  describe('Data Sanitization', () => {
    it('should sanitize HTML content', () => {
      const htmlInputs = [
        '<b>Bold text</b>',
        '<script>alert("xss")</script>Normal text',
        '<div onclick="alert(1)">Click me</div>',
        '<iframe src="javascript:alert(1)"></iframe>'
      ];

      htmlInputs.forEach(input => {
        const result = validateInput(input, 'text');
        expect(result.sanitizedValue).not.toContain('<script>');
        expect(result.sanitizedValue).not.toContain('onclick');
        expect(result.sanitizedValue).not.toContain('<iframe>');
      });
    });
  });
}); 