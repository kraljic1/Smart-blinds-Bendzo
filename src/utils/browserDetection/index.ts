// Export main functionality
export { detectBrave } from './detectors/braveDetector';
export { getBrowserInfo } from './detectors/browserInfoDetector';
export { checkStripeCompatibility } from './services/StripeCompatibilityService';
export { getPaymentInstructions } from './services/PaymentInstructionService';

// Export types
export type { 
  BrowserInfo, 
  StripeCompatibilityResult, 
  PaymentInstructions 
} from './types/browserTypes';

// Export individual detectors for advanced usage
export { 
  detectBraveByNavigator, 
  detectBraveByUserAgent, 
  detectBraveByChromeFeatures 
} from './detectors/braveDetector';

export { 
  detectSafari, 
  detectChrome 
} from './detectors/browserInfoDetector'; 