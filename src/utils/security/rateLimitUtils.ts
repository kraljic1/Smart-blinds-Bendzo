import { logSecurityEvent } from '../securityLogger';

interface RateLimitData {
  count: number;
  firstRequest: number;
}

export class RateLimitManager {
  private requestCounts = new Map<string, RateLimitData>();
  private threshold: number;
  private window: number;

  constructor(threshold: number = 10, window: number = 60000) {
    this.threshold = threshold;
    this.window = window;
  }

  /**
   * Check if request is within rate limit
   */
  checkRateLimit(endpoint: string): boolean {
    const now = Date.now();
    const key = `rate_limit_${endpoint}`;
    const current = this.requestCounts.get(key);

    if (!current) {
      this.requestCounts.set(key, { count: 1, firstRequest: now });
      return true;
    }

    // Reset if window has passed
    if (now - current.firstRequest > this.window) {
      this.requestCounts.set(key, { count: 1, firstRequest: now });
      return true;
    }

    // Increment count
    current.count++;

    // Check if limit exceeded
    if (current.count > this.threshold) {
      logSecurityEvent.rateLimitExceeded(endpoint, this.threshold);
      return false;
    }

    return true;
  }

  /**
   * Clean up old rate limit data
   */
  cleanup(): void {
    const now = Date.now();
    const entries = Array.from(this.requestCounts.entries());
    
    entries.forEach(([key, data]) => {
      if (now - data.firstRequest > this.window) {
        this.requestCounts.delete(key);
      }
    });
  }

  /**
   * Get current rate limit stats
   */
  getStats(): Record<string, RateLimitData> {
    return Object.fromEntries(this.requestCounts);
  }
} 