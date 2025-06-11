/**
 * Error handling utilities for secure error management
 * Prevents information disclosure while maintaining debugging capabilities
 */

export interface ErrorResponse {
 success: false;
 message: string;
 code?: string;
}

export interface SuccessResponse<T = unknown> {
 success: true;
 data?: T;
 message?: string;
}

export type ApiResponse<T = unknown> = ErrorResponse | SuccessResponse<T>;

/**
 * Sanitizes error messages for client consumption
 * Removes sensitive information while providing meaningful feedback
 */
export function sanitizeErrorMessage(error: unknown, context?: string): string {
 // Default user-friendly messages based on context
 const defaultMessages: Record<string, string> = {
 payment: 'Payment processing failed. Please try again.',
 order: 'Order processing failed. Please try again.',
 auth: 'Authentication failed. Please check your credentials.',
 database: 'A system error occurred. Please try again later.',
 validation: 'Invalid data provided. Please check your input.',
 network: 'Network error. Please check your connection and try again.',
 default: 'An unexpected error occurred. Please try again later.'
 };

 // Return context-specific message or default
 return defaultMessages[context || 'default'];
}

/**
 * Logs errors securely without exposing sensitive data in production
 */
export function logError(error: unknown, context?: string, metadata?: Record<string, unknown>): void {
 // Only log detailed errors in development
 if (import.meta.env.DEV) {
 console.error(`[${context || 'ERROR'}]`, error, metadata);
 } else {
 // In production, log minimal information
 const errorType = error instanceof Error ? error.constructor.name : 'UnknownError';
 console.error(`[${context || 'ERROR'}] ${errorType} occurred`);
 }
}

/**
 * Creates a standardized error response for APIs
 */
export function createErrorResponse(
 error: unknown, 
 context?: string,
 code?: string
): ErrorResponse {
 logError(error, context);
 
 return {
 success: false,
 message: sanitizeErrorMessage(error, context),
 ...(code && { code })
 };
}

/**
 * Creates a standardized success response for APIs
 */
export function createSuccessResponse<T>(
 data?: T, 
 message?: string
): SuccessResponse<T> {
 return {
 success: true,
 ...(data !== undefined && { data }),
 ...(message && { message })
 };
}

/**
 * Wraps async functions with error handling
 */
export function withErrorHandling<T extends unknown[], R>(
 fn: (...args: T) => Promise<R>,
 context?: string
) {
 return async (...args: T): Promise<ApiResponse<R>> => {
 try {
 const result = await fn(...args);
 return createSuccessResponse(result);
 } catch (error) {
 return createErrorResponse(error, context);
 }
 };
}

/**
 * Validates that sensitive data is not logged
 */
export function sanitizeLogData(data: unknown): unknown {
 if (!data || typeof data !== 'object') {
 return data;
 }

 const sensitiveFields = [
 'password', 'token', 'secret', 'key', 'authorization',
 'credit_card', 'card_number', 'cvv', 'ssn', 'oib',
 'payment_method_id', 'client_secret'
 ];

 const sanitized = { ...data as Record<string, unknown> };

 for (const field of sensitiveFields) {
 if (field in sanitized) {
 sanitized[field] = '[REDACTED]';
 }
 }

 // Recursively sanitize nested objects
 for (const key in sanitized) {
 if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
 sanitized[key] = sanitizeLogData(sanitized[key]);
 }
 }

 return sanitized;
}

/**
 * Safe console logging that automatically sanitizes sensitive data
 */
export const safeLog = {
 info: (message: string, data?: unknown) => {
 if (import.meta.env.DEV) {
 console.log(message, data ? sanitizeLogData(data) : '');
 }
 },
 
 warn: (message: string, data?: unknown) => {
 if (import.meta.env.DEV) {
 console.warn(message, data ? sanitizeLogData(data) : '');
 }
 },
 
 error: (message: string, error?: unknown, data?: unknown) => {
 logError(error, message, data ? sanitizeLogData(data) as Record<string, unknown> : undefined);
 }
}; 