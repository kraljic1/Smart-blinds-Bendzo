import { describe, it, expect } from 'vitest';
import { validateInput } from '../../utils/security/inputValidation';

describe('SQL Injection Protection', () => {
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
}); 