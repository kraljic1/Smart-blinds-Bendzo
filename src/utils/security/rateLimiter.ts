/**
 * Rate Limiter
 * Client-side rate limiting to prevent abuse and manage submission frequency
 */

// Rate limiting helper (client-side basic implementation)
export class RateLimiter {
 private attempts: Map<string, number[]> = new Map();
 private readonly maxAttempts: number;
 private readonly windowMs: number;
 
 constructor(maxAttempts: number = 5, windowMs: number = 60000) {
 this.maxAttempts = maxAttempts;
 this.windowMs = windowMs;
 }
 
 isAllowed(identifier: string): boolean {
 const now = Date.now();
 const attempts = this.attempts.get(identifier) || [];
 
 // Remove old attempts outside the window
 const recentAttempts = attempts.filter(time => now - time < this.windowMs);
 
 if (recentAttempts.length >= this.maxAttempts) {
 return false;
 }
 
 // Add current attempt
 recentAttempts.push(now);
 this.attempts.set(identifier, recentAttempts);
 
 return true;
 }
 
 getRemainingAttempts(identifier: string): number {
 const now = Date.now();
 const attempts = this.attempts.get(identifier) || [];
 const recentAttempts = attempts.filter(time => now - time < this.windowMs);
 
 return Math.max(0, this.maxAttempts - recentAttempts.length);
 }
 
 reset(identifier: string): void {
 this.attempts.delete(identifier);
 }
 
 getTimeUntilReset(identifier: string): number {
 const now = Date.now();
 const attempts = this.attempts.get(identifier) || [];
 
 if (attempts.length === 0) {
 return 0;
 }
 
 const oldestAttempt = Math.min(...attempts);
 const timeUntilReset = this.windowMs - (now - oldestAttempt);
 
 return Math.max(0, timeUntilReset);
 }
}

// Export rate limiter instance
export const formSubmissionLimiter = new RateLimiter(3, 60000); // 3 attempts per minute

// Export validation rate limiter for real-time validation
export const validationLimiter = new RateLimiter(10, 10000); // 10 validations per 10 seconds 