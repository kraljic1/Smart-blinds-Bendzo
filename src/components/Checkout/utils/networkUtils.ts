/**
 * Network utility functions for handling HTTP requests with timeout and error handling
 */

// Configuration constants
export const NETWORK_TIMEOUT = 30000; // 30 seconds
export const RETRY_ATTEMPTS = 3;
export const RETRY_DELAY = 1000; // 1 second

/**
 * Creates a fetch request with timeout
 */
export const fetchWithTimeout = async (url: string, options: RequestInit, timeout: number = NETWORK_TIMEOUT): Promise<Response> => {
 const controller = new AbortController();
 const timeoutId = setTimeout(() => controller.abort(), timeout);

 try {
 const response = await fetch(url, {
 ...options,
 signal: controller.signal,
 });
 clearTimeout(timeoutId);
 return response;
 } catch (error) {
 clearTimeout(timeoutId);
 if (error instanceof Error && error.name === 'AbortError') {
 throw new Error(`Request timeout after ${timeout}ms`);
 }
 throw error;
 }
};

/**
 * Validates network response status codes
 */
export const validateResponse = (response: Response): void => {
 if (response.status >= 500) {
 throw new Error(`Server error: ${response.status} ${response.statusText}`);
 }
 if (response.status === 429) {
 throw new Error('Rate limit exceeded. Please try again later.');
 }
 if (response.status === 401) {
 throw new Error('Authentication failed. Please refresh and try again.');
 }
 if (response.status === 403) {
 throw new Error('Access forbidden. Please check your permissions.');
 }
 if (response.status >= 400) {
 throw new Error(`Client error: ${response.status} ${response.statusText}`);
 }
 if (!response.ok) {
 throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
 }
}; 