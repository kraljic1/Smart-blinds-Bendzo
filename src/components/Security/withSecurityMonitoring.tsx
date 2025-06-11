import React, { useEffect } from 'react';
import { useSecurityMonitoring } from '../../hooks/useSecurityMonitoring';

interface SecurityMonitoringOptions {
 enableRateLimitMonitoring?: boolean;
 enableSuspiciousActivityDetection?: boolean;
 enableUnauthorizedAccessDetection?: boolean;
 rateLimitThreshold?: number;
 rateLimitWindow?: number;
}

/**
 * Higher-order component for automatic security monitoring
 */
export function withSecurityMonitoring<P extends object>(
 WrappedComponent: React.ComponentType<P>,
 options: SecurityMonitoringOptions = {}
): React.ComponentType<P> {
 const SecurityMonitoredComponent = (props: P) => {
 const security = useSecurityMonitoring(options);

 // Monitor component mount/unmount for suspicious patterns
 useEffect(() => {
 const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Unknown';
 
 // Log component access for sensitive components
 if (componentName.includes('Admin') || componentName.includes('Payment')) {
 security.logSuspiciousActivity(`Sensitive component accessed: ${componentName}`, {
 component: componentName,
 timestamp: new Date().toISOString()
 });
 }

 return () => {
 // Component unmount - could be used for session tracking
 };
 }, [security]);

 return React.createElement(WrappedComponent, props);
 };

 SecurityMonitoredComponent.displayName = `withSecurityMonitoring(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
 
 return SecurityMonitoredComponent;
} 