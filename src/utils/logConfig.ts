/**
 * Centralized Logging Configuration
 * Controls what gets logged in different environments
 */

export interface LogConfig {
  enableConsoleInProduction: boolean;
  enableDebugInProduction: boolean;
  enableInfoInProduction: boolean;
  enableWarnInProduction: boolean;
  enableErrorInProduction: boolean;
  maxLogLength: number;
  enablePerformanceLogging: boolean;
  enableSecurityLogging: boolean;
}

// Environment-specific configurations
const DEVELOPMENT_CONFIG: LogConfig = {
  enableConsoleInProduction: true,
  enableDebugInProduction: true,
  enableInfoInProduction: true,
  enableWarnInProduction: true,
  enableErrorInProduction: true,
  maxLogLength: 5000,
  enablePerformanceLogging: true,
  enableSecurityLogging: true
};

const PRODUCTION_CONFIG: LogConfig = {
  enableConsoleInProduction: false,
  enableDebugInProduction: false,
  enableInfoInProduction: false,
  enableWarnInProduction: false,
  enableErrorInProduction: true, // Only errors in production
  maxLogLength: 1000,
  enablePerformanceLogging: false,
  enableSecurityLogging: true // Keep security logging for monitoring
};

// Get current configuration based on environment
export const getLogConfig = (): LogConfig => {
  if (import.meta.env.PROD) {
    return PRODUCTION_CONFIG;
  }
  return DEVELOPMENT_CONFIG;
};

// Convenience functions
export const shouldLog = (level: 'debug' | 'info' | 'warn' | 'error'): boolean => {
  const config = getLogConfig();
  
  switch (level) {
    case 'debug':
      return config.enableDebugInProduction;
    case 'info':
      return config.enableInfoInProduction;
    case 'warn':
      return config.enableWarnInProduction;
    case 'error':
      return config.enableErrorInProduction;
    default:
      return false;
  }
};

export const isProductionLoggingEnabled = (): boolean => {
  return getLogConfig().enableConsoleInProduction;
};

export const getMaxLogLength = (): number => {
  return getLogConfig().maxLogLength;
};

// Export current config for debugging
export const currentLogConfig = getLogConfig(); 