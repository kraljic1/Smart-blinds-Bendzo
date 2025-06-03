/**
 * Security Monitor Module
 * Main exports for the security monitoring system
 */

export { SecurityMonitor } from './SecurityMonitor.js';
export { ReportGenerator } from './ReportGenerator.js';
export { SECURITY_CONFIG } from './config.js';

// Scanner exports
export { SensitiveDataScanner } from './scanners/SensitiveDataScanner.js';
export { DependencyScanner } from './scanners/DependencyScanner.js';
export { EnvironmentScanner } from './scanners/EnvironmentScanner.js';
export { FilePermissionScanner } from './scanners/FilePermissionScanner.js';
export { SecurityHeaderScanner } from './scanners/SecurityHeaderScanner.js';

// Utility exports
export * from './utils.js'; 