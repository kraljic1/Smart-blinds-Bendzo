import { useCallback } from 'react';
import { useSecurityMonitoring } from './useSecurityMonitoring';

/**
 * Security monitoring context for error boundaries
 */
export const useSecurityErrorHandler = () => {
  const security = useSecurityMonitoring();

  return useCallback((error: Error, errorInfo: unknown) => {
    // Check if error might be security-related
    const securityKeywords = ['unauthorized', 'forbidden', 'token', 'auth', 'permission'];
    const isSecurityError = securityKeywords.some(keyword => 
      error.message.toLowerCase().includes(keyword) ||
      error.stack?.toLowerCase().includes(keyword)
    );

    if (isSecurityError) {
      security.logSuspiciousActivity('Security-related error detected', {
        error: error.message,
        stack: error.stack,
        errorInfo
      });
    }
  }, [security]);
}; 