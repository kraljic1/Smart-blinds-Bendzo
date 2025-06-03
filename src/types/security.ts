/**
 * TypeScript interfaces, types, and enums for security logging
 */

export interface SecurityIncident {
  id: string;
  timestamp: Date;
  type: SecurityIncidentType;
  severity: SecuritySeverity;
  description: string;
  userAgent?: string;
  ipAddress?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
  resolved: boolean;
  resolvedAt?: Date;
  resolvedBy?: string;
}

export enum SecurityIncidentType {
  FAILED_LOGIN = 'failed_login',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
  UNAUTHORIZED_ACCESS = 'unauthorized_access',
  DATA_BREACH_ATTEMPT = 'data_breach_attempt',
  MALICIOUS_REQUEST = 'malicious_request',
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
  INVALID_AUTH_TOKEN = 'invalid_auth_token',
  PERMISSION_VIOLATION = 'permission_violation',
  SECURITY_SCAN_DETECTED = 'security_scan_detected',
  UNUSUAL_BEHAVIOR = 'unusual_behavior'
}

export enum SecuritySeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface SecurityStats {
  totalIncidents: number;
  unresolvedIncidents: number;
  incidentsByType: Record<string, number>;
  incidentsBySeverity: Record<string, number>;
  recentActivity: SecurityIncident[];
}

export interface AlertThresholds {
  [SecuritySeverity.LOW]: number;
  [SecuritySeverity.MEDIUM]: number;
  [SecuritySeverity.HIGH]: number;
  [SecuritySeverity.CRITICAL]: number;
}

export interface SecurityLoggerConfig {
  maxIncidents?: number;
  alertThresholds?: Partial<AlertThresholds>;
} 