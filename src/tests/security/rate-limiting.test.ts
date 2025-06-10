import { describe, it, expect, beforeEach } from 'vitest';
import { RateLimiter } from '../../utils/security/rateLimiter';

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