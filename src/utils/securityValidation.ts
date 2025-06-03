/**
 * Security Validation (Legacy Entry Point)
 * 
 * This file has been refactored into smaller modules for better maintainability.
 * All functionality is now available through the modular structure in ./security/
 * 
 * This file serves as a backward compatibility layer.
 */

// Re-export everything from the new modular structure
export * from './security';

// Maintain backward compatibility by re-exporting the main functions
export { validateFormData } from './security/comprehensiveValidation';
export { formSubmissionLimiter } from './security/rateLimiter'; 