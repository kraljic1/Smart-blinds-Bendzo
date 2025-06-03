/**
 * Security Utilities
 * Helper functions for security operations, data sanitization, and environment detection
 */

import type { SecurityIncident, SecurityIncidentType, SecuritySeverity } from '../../types/security';

/**
 * Generate a unique incident ID
 */
export function generateIncidentId(): string {
  return `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get user agent string
 */
export function getUserAgent(): string {
  return typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
}

/**
 * Get client IP address (placeholder for client-side)
 */
export function getClientIP(): string {
  // In a real application, this would be obtained from the server
  // Client-side cannot reliably determine the real IP address
  return 'client-side-unknown';
}

/**
 * Sanitize payload by removing sensitive information
 */
export function sanitizePayload(payload: unknown): unknown {
  if (!payload || typeof payload !== 'object') return payload;
  
  // Remove sensitive information from payload
  const sanitized = { ...payload as Record<string, unknown> };
  const sensitiveKeys = ['password', 'token', 'secret', 'key', 'auth', 'authorization', 'bearer'];
  
  sensitiveKeys.forEach(key => {
    if (sanitized[key]) {
      sanitized[key] = '[REDACTED]';
    }
  });
  
  return sanitized;
}

/**
 * Create a basic security incident object
 */
export function createSecurityIncident(
  type: SecurityIncidentType,
  severity: SecuritySeverity,
  description: string,
  metadata?: Record<string, unknown>
): SecurityIncident {
  return {
    id: generateIncidentId(),
    timestamp: new Date(),
    type,
    severity,
    description,
    userAgent: getUserAgent(),
    ipAddress: getClientIP(),
    metadata: metadata ? sanitizePayload(metadata) as Record<string, unknown> : undefined,
    resolved: false
  };
}

/**
 * Validate incident data before processing
 */
export function validateIncidentData(incident: Partial<SecurityIncident>): boolean {
  return !!(
    incident.type &&
    incident.severity &&
    incident.description &&
    incident.timestamp
  );
}

/**
 * Format incident for logging
 */
export function formatIncidentForLogging(incident: SecurityIncident): Record<string, unknown> {
  return {
    id: incident.id,
    type: incident.type,
    severity: incident.severity,
    description: incident.description,
    timestamp: incident.timestamp.toISOString(),
    userAgent: incident.userAgent,
    ipAddress: incident.ipAddress,
    userId: incident.userId,
    resolved: incident.resolved,
    resolvedAt: incident.resolvedAt?.toISOString(),
    resolvedBy: incident.resolvedBy,
    metadata: incident.metadata
  };
}

/**
 * Check if running in development environment
 */
export function isDevelopment(): boolean {
  return import.meta.env.DEV;
}

/**
 * Check if running in production environment
 */
export function isProduction(): boolean {
  return import.meta.env.PROD;
}

/**
 * Get environment-specific log level
 */
export function getLogLevel(): 'debug' | 'info' | 'warn' | 'error' {
  if (isDevelopment()) {
    return 'debug';
  }
  return 'error';
}

/**
 * Safely stringify object for logging
 */
export function safeStringify(obj: unknown): string {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return '[Unable to stringify object]';
  }
}

/**
 * Truncate string to maximum length
 */
export function truncateString(str: string, maxLength = 1000): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
}

/**
 * Get current timestamp in ISO format
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Calculate time difference in milliseconds
 */
export function getTimeDifference(startTime: Date, endTime: Date = new Date()): number {
  return endTime.getTime() - startTime.getTime();
} 