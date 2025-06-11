/**
 * Browser detection utilities for handling Brave browser compatibility
 * 
 * This module provides a simplified interface to the browser detection system.
 * The complex logic has been moved to dedicated modules to improve maintainability.
 */

// Re-export all functionality from the modular system
export {
 detectBrave,
 getBrowserInfo,
 checkStripeCompatibility,
 getPaymentInstructions,
 // Advanced exports for specific use cases
 detectBraveByNavigator,
 detectBraveByUserAgent,
 detectBraveByChromeFeatures,
 detectSafari,
 detectChrome
} from './browserDetection/index';

// Re-export types
export type {
 BrowserInfo,
 StripeCompatibilityResult,
 PaymentInstructions
} from './browserDetection/index'; 