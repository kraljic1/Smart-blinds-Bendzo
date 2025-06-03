// Secure logging utility to prevent sensitive data exposure
interface LogLevel {
  ERROR: 'error';
  WARN: 'warn';
  INFO: 'info';
  DEBUG: 'debug';
}

const LOG_LEVELS: LogLevel = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

// Sensitive keywords that should be sanitized from logs
const SENSITIVE_KEYWORDS = [
  'password',
  'secret',
  'token',
  'key',
  'auth',
  'credential',
  'private',
  'confidential'
];

/**
 * Sanitizes sensitive information from log messages and objects
 */
function sanitizeLogData(data: any): any {
  if (typeof data === 'string') {
    return sanitizeString(data);
  }
  
  if (typeof data === 'object' && data !== null) {
    return sanitizeObject(data);
  }
  
  return data;
}

/**
 * Sanitizes sensitive keywords from strings
 */
function sanitizeString(str: string): string {
  let sanitized = str;
  
  SENSITIVE_KEYWORDS.forEach(keyword => {
    const regex = new RegExp(`(${keyword}[^\\s]*[:\\s]*)[^\\s]*`, 'gi');
    sanitized = sanitized.replace(regex, `$1[REDACTED]`);
  });
  
  return sanitized;
}

/**
 * Sanitizes sensitive properties from objects
 */
function sanitizeObject(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeLogData(item));
  }
  
  const sanitized: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();
    const isSensitive = SENSITIVE_KEYWORDS.some(keyword => 
      lowerKey.includes(keyword)
    );
    
    if (isSensitive) {
      sanitized[key] = '[REDACTED]';
    } else {
      sanitized[key] = sanitizeLogData(value);
    }
  }
  
  return sanitized;
}

/**
 * Secure logger that automatically sanitizes sensitive information
 */
export class SecureLogger {
  private static instance: SecureLogger;
  private isDevelopment: boolean;
  
  private constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }
  
  static getInstance(): SecureLogger {
    if (!SecureLogger.instance) {
      SecureLogger.instance = new SecureLogger();
    }
    return SecureLogger.instance;
  }
  
  private log(level: keyof LogLevel, message: string, ...args: any[]): void {
    if (!this.isDevelopment && level === 'DEBUG') {
      return; // Skip debug logs in production
    }
    
    const sanitizedMessage = sanitizeString(message);
    const sanitizedArgs = args.map(arg => sanitizeLogData(arg));
    
    const timestamp = new Date().toISOString();
    const logPrefix = `[${timestamp}] [${level.toUpperCase()}]`;
    
    switch (level) {
      case 'ERROR':
        console.error(logPrefix, sanitizedMessage, ...sanitizedArgs);
        break;
      case 'WARN':
        console.warn(logPrefix, sanitizedMessage, ...sanitizedArgs);
        break;
      case 'INFO':
        console.info(logPrefix, sanitizedMessage, ...sanitizedArgs);
        break;
      case 'DEBUG':
        console.log(logPrefix, sanitizedMessage, ...sanitizedArgs);
        break;
      default:
        console.log(logPrefix, sanitizedMessage, ...sanitizedArgs);
    }
  }
  
  error(message: string, ...args: any[]): void {
    this.log('ERROR', message, ...args);
  }
  
  warn(message: string, ...args: any[]): void {
    this.log('WARN', message, ...args);
  }
  
  info(message: string, ...args: any[]): void {
    this.log('INFO', message, ...args);
  }
  
  debug(message: string, ...args: any[]): void {
    this.log('DEBUG', message, ...args);
  }
}

// Export singleton instance
export const secureLogger = SecureLogger.getInstance();

// Export convenience functions
export const logError = (message: string, ...args: any[]) => secureLogger.error(message, ...args);
export const logWarn = (message: string, ...args: any[]) => secureLogger.warn(message, ...args);
export const logInfo = (message: string, ...args: any[]) => secureLogger.info(message, ...args);
export const logDebug = (message: string, ...args: any[]) => secureLogger.debug(message, ...args); 