/**
 * Security Incident Types and Interfaces
 */

export interface SecurityIncident {
 id: string;
 type: SecurityIncidentType;
 severity: 'low' | 'medium' | 'high' | 'critical';
 timestamp: Date;
 details: Record<string, unknown>;
 userAgent?: string;
 ipAddress?: string;
 userId?: string;
 resolved: boolean;
}

export enum SecurityIncidentType {
 RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
 SUSPICIOUS_INPUT = 'suspicious_input',
 AUTHENTICATION_FAILURE = 'authentication_failure',
 UNAUTHORIZED_ACCESS = 'unauthorized_access',
 DATA_VALIDATION_FAILURE = 'data_validation_failure',
 PAYMENT_FRAUD_ATTEMPT = 'payment_fraud_attempt',
 XSS_ATTEMPT = 'xss_attempt',
 SQL_INJECTION_ATTEMPT = 'sql_injection_attempt'
}

export interface UserContext {
 userAgent?: string;
 ipAddress?: string;
 userId?: string;
} 