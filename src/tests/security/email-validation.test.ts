import { describe, it, expect } from 'vitest';
import { validateInput } from '../../utils/security/inputValidation';

describe('Email Validation Security', () => {
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