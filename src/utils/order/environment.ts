/**
 * Environment detection utilities for order processing
 */

/**
 * Check if the application is running in development mode
 * @returns true if running on localhost, false otherwise
 */
export const isDevelopmentMode = (): boolean => {
 return typeof window !== 'undefined' && 
 (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
};

/**
 * Get the appropriate API endpoint based on environment
 * @param endpoint - The endpoint path
 * @returns Full URL for the endpoint
 */
export const getApiEndpoint = (endpoint: string): string => {
 if (isDevelopmentMode()) {
 return endpoint; // Direct Supabase calls in development
 }
 return `/.netlify/functions/${endpoint}`;
}; 