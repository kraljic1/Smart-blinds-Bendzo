import { BrowserInfo, PaymentInstructions } from '../types/browserTypes';

/**
 * Get Brave-specific payment instructions
 */
export function getBravePaymentInstructions(): PaymentInstructions {
  return {
    title: 'Payment Instructions for Brave Browser',
    instructions: [
      '1. Click the Brave Shields icon (🛡️) in the address bar',
      '2. Toggle "Shields" to "Down" for this site',
      '3. Refresh the page and try payment again',
      '4. Re-enable Shields after completing your purchase'
    ],
    troubleshootingOptions: [
      'Use Chrome, Firefox, or Safari for payment',
      'Contact support if you continue to experience issues'
    ]
  };
}

/**
 * Get general payment instructions for other browsers
 */
export function getGeneralPaymentInstructions(): PaymentInstructions {
  return {
    title: 'Payment Instructions',
    instructions: [
      'Please ensure your browser allows payment processing',
      'Disable any ad blockers for this site',
      'Make sure JavaScript is enabled'
    ],
    troubleshootingOptions: [
      'Try a different browser if issues persist',
      'Contact support for assistance'
    ]
  };
}

/**
 * Show browser-specific payment instructions
 */
export function getPaymentInstructions(browserInfo: BrowserInfo): PaymentInstructions {
  if (browserInfo.isBrave) {
    return getBravePaymentInstructions();
  }

  return getGeneralPaymentInstructions();
} 