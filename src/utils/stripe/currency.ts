/**
 * Currency formatting utilities for Stripe payments
 */

/**
 * Formats amount for display (converts cents to currency)
 */
export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount);
}

/**
 * Converts amount to cents for Stripe
 */
export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Converts cents to amount for display
 */
export function fromCents(cents: number): number {
  return cents / 100;
} 