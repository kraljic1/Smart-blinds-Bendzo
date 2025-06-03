/**
 * Production Logger - Replaces console statements with production-safe logging
 * Automatically removes debug logs in production builds while preserving errors
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';
type LogData = string | number | boolean | object | null | undefined;

interface LogConfig {
  enabledInProduction: LogLevel[];
  enabledInDevelopment: LogLevel[];
  maxLogLength: number;
  sensitiveFields: string[];
}

const LOG_CONFIG: LogConfig = {
  enabledInProduction: ['error'], // Only errors in production
  enabledInDevelopment: ['debug', 'info', 'warn', 'error'], // All logs in development
  maxLogLength: 1000,
  sensitiveFields: [
    'password', 'secret', 'token', 'key', 'auth', 'credential',
    'private', 'confidential', 'payment_method_id', 'client_secret',
    'card_number', 'cvv', 'ssn', 'oib', 'credit_card'
  ]
};

class ProductionLogger {
  private isProduction: boolean;
  private isDevelopment: boolean;
  private enabledLevels: LogLevel[];

  constructor() {
    this.isProduction = import.meta.env.PROD;
    this.isDevelopment = import.meta.env.DEV;
    this.enabledLevels = this.isProduction 
      ? LOG_CONFIG.enabledInProduction 
      : LOG_CONFIG.enabledInDevelopment;
  }

  /**
   * Sanitize sensitive data from logs
   */
  private sanitizeData(data: LogData): LogData {
    if (typeof data === 'string') {
      return this.sanitizeString(data);
    }
    
    if (typeof data === 'object' && data !== null) {
      return this.sanitizeObject(data);
    }
    
    return data;
  }

  private sanitizeString(str: string): string {
    let sanitized = str;
    
    // Truncate if too long
    if (sanitized.length > LOG_CONFIG.maxLogLength) {
      sanitized = sanitized.substring(0, LOG_CONFIG.maxLogLength) + '... [TRUNCATED]';
    }
    
    // Remove sensitive patterns
    LOG_CONFIG.sensitiveFields.forEach(field => {
      const regex = new RegExp(`${field}[\\s]*[:=][\\s]*[\\w\\-\\.@]+`, 'gi');
      sanitized = sanitized.replace(regex, `${field}: [REDACTED]`);
    });
    
    return sanitized;
  }

  private sanitizeObject(obj: object): object {
    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeData(item));
    }
    
    const sanitized: Record<string, LogData> = {};
    
    for (const [key, value] of Object.entries(obj)) {
      const lowerKey = key.toLowerCase();
      const isSensitive = LOG_CONFIG.sensitiveFields.some(field => 
        lowerKey.includes(field)
      );
      
      if (isSensitive) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = this.sanitizeData(value);
      }
    }
    
    return sanitized;
  }

  /**
   * Check if a log level should be output
   */
  private shouldLog(level: LogLevel): boolean {
    return this.enabledLevels.includes(level);
  }

  /**
   * Format log message with timestamp and context
   */
  private formatMessage(level: LogLevel, message: string, context?: string): string {
    const timestamp = new Date().toISOString();
    const prefix = context ? `[${context}]` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${prefix} ${message}`;
  }

  /**
   * Debug logging - only in development
   */
  debug(message: string, data?: LogData, context?: string): void {
    if (!this.shouldLog('debug')) return;
    
    const formattedMessage = this.formatMessage('debug', message, context);
    const sanitizedData = data ? this.sanitizeData(data) : undefined;
    
    if (sanitizedData !== undefined) {
      console.log(formattedMessage, sanitizedData);
    } else {
      console.log(formattedMessage);
    }
  }

  /**
   * Info logging - development only by default
   */
  info(message: string, data?: LogData, context?: string): void {
    if (!this.shouldLog('info')) return;
    
    const formattedMessage = this.formatMessage('info', message, context);
    const sanitizedData = data ? this.sanitizeData(data) : undefined;
    
    if (sanitizedData !== undefined) {
      console.info(formattedMessage, sanitizedData);
    } else {
      console.info(formattedMessage);
    }
  }

  /**
   * Warning logging - development only by default
   */
  warn(message: string, data?: LogData, context?: string): void {
    if (!this.shouldLog('warn')) return;
    
    const formattedMessage = this.formatMessage('warn', message, context);
    const sanitizedData = data ? this.sanitizeData(data) : undefined;
    
    if (sanitizedData !== undefined) {
      console.warn(formattedMessage, sanitizedData);
    } else {
      console.warn(formattedMessage);
    }
  }

  /**
   * Error logging - always enabled
   */
  error(message: string, error?: Error | LogData, context?: string): void {
    if (!this.shouldLog('error')) return;
    
    const formattedMessage = this.formatMessage('error', message, context);
    
    if (error instanceof Error) {
      // In production, only log error message, not stack trace
      if (this.isProduction) {
        console.error(formattedMessage, error.message);
      } else {
        console.error(formattedMessage, error);
      }
    } else if (error !== undefined) {
      const sanitizedData = this.sanitizeData(error);
      console.error(formattedMessage, sanitizedData);
    } else {
      console.error(formattedMessage);
    }
  }

  /**
   * Performance logging for timing operations
   */
  time(label: string): void {
    if (this.isDevelopment) {
      console.time(label);
    }
  }

  timeEnd(label: string): void {
    if (this.isDevelopment) {
      console.timeEnd(label);
    }
  }

  /**
   * Group logging for better organization
   */
  group(label: string): void {
    if (this.isDevelopment) {
      console.group(label);
    }
  }

  groupEnd(): void {
    if (this.isDevelopment) {
      console.groupEnd();
    }
  }

  /**
   * Table logging for structured data
   */
  table(data: object): void {
    if (this.isDevelopment) {
      console.table(this.sanitizeData(data));
    }
  }
}

// Create singleton instance
const logger = new ProductionLogger();

// Export convenience functions that match console API
export const log = {
  debug: (message: string, data?: LogData, context?: string) => logger.debug(message, data, context),
  info: (message: string, data?: LogData, context?: string) => logger.info(message, data, context),
  warn: (message: string, data?: LogData, context?: string) => logger.warn(message, data, context),
  error: (message: string, error?: Error | LogData, context?: string) => logger.error(message, error, context),
  time: (label: string) => logger.time(label),
  timeEnd: (label: string) => logger.timeEnd(label),
  group: (label: string) => logger.group(label),
  groupEnd: () => logger.groupEnd(),
  table: (data: object) => logger.table(data)
};

// Export individual functions for easier migration
export const logDebug = log.debug;
export const logInfo = log.info;
export const logWarn = log.warn;
export const logError = log.error;

// Export the logger instance for advanced usage
export { logger as productionLogger };

// Export type for external usage
export type { LogLevel, LogData }; 