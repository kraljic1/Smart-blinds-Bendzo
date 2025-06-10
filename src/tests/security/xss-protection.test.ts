import { describe, it, expect } from 'vitest';
import { validateInput } from '../../utils/security/inputValidation';

describe('XSS Protection', () => {
  it('should prevent script injection attacks', () => {
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
      // Check that javascript: is encoded, not removed
      if (input.includes('javascript:')) {
        expect(result.sanitizedValue).not.toContain('javascript:');
      }
    });
  });

  it('should sanitize HTML content properly', () => {
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