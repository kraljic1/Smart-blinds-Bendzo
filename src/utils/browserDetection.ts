/**
 * Browser detection utilities for handling Brave browser compatibility
 */

// Extend global interfaces for browser-specific properties
declare global {
  interface Navigator {
    brave?: {
      isBrave: () => Promise<boolean>;
    };
  }
  
  interface Window {
    chrome?: {
      runtime?: {
        onConnect?: unknown;
        getManifest?: () => unknown;
      };
    };
  }
}

export interface BrowserInfo {
  isBrave: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  isEdge: boolean;
  userAgent: string;
}

/**
 * Detect if the user is using Brave browser
 * Brave pretends to be Chrome in the user agent, so we need to use JavaScript detection
 */
export async function detectBrave(): Promise<boolean> {
  // Method 1: Check for Brave-specific navigator properties (most reliable)
  if ('brave' in navigator && navigator.brave && typeof navigator.brave.isBrave === 'function') {
    try {
      return await navigator.brave.isBrave();
    } catch (error) {
      // Brave detection method 1 failed - silently continue to next method
    }
  }

  // Method 2: Check user agent for Brave-specific patterns
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Brave')) {
    return true;
  }

  // Method 3: Check for Brave-specific features (only if Chrome-like)
  // Only run this check if the browser appears to be Chrome-based
  if (userAgent.includes('Chrome') && !userAgent.includes('Safari') && window.chrome) {
    try {
      // Check if certain Chrome APIs are blocked (Brave blocks some)
      if (window.chrome.runtime && !window.chrome.runtime.getManifest) {
        return true;
      }
    } catch (error) {
      // If we get an error accessing Chrome APIs, it might be Brave
      // Chrome API check failed - treating as potential Brave browser
      return true;
    }
  }

  // Don't use ad blocker detection as it's too unreliable and causes false positives
  // Many browsers and extensions can block ads, not just Brave

  return false;
}

/**
 * Get comprehensive browser information
 */
export async function getBrowserInfo(): Promise<BrowserInfo> {
  const userAgent = navigator.userAgent;
  const isBrave = await detectBrave();
  
  // More accurate Safari detection
  const isSafari = userAgent.includes('Safari') && 
                   !userAgent.includes('Chrome') && 
                   !userAgent.includes('Chromium') &&
                   !isBrave;
  
  return {
    isBrave,
    isChrome: userAgent.includes('Chrome') && !isBrave && !isSafari,
    isFirefox: userAgent.includes('Firefox'),
    isSafari,
    isEdge: userAgent.includes('Edge'),
    userAgent
  };
}

/**
 * Check if Stripe resources are being blocked
 */
export async function checkStripeCompatibility(): Promise<{
  isBlocked: boolean;
  canLoadStripe: boolean;
  recommendations: string[];
}> {
  const recommendations: string[] = [];
  let isBlocked = false;
  let canLoadStripe = true;

  try {
    // Test if we can load Stripe's JS
    await fetch('https://js.stripe.com/v3/', { 
      method: 'HEAD',
      mode: 'no-cors'
    });
  } catch {
    isBlocked = true;
    canLoadStripe = false;
    recommendations.push('Stripe resources are being blocked by your browser');
  }

  // Check for Brave-specific issues
  const browserInfo = await getBrowserInfo();
  if (browserInfo.isBrave) {
    recommendations.push('You are using Brave browser. For the best payment experience:');
    recommendations.push('• Temporarily disable Brave Shields for this site');
    recommendations.push('• Or use Chrome, Firefox, or Safari for payment');
    recommendations.push('• Or try our alternative payment methods below');
  }

  return {
    isBlocked,
    canLoadStripe,
    recommendations
  };
}

/**
 * Show browser-specific payment instructions
 */
export function getPaymentInstructions(browserInfo: BrowserInfo): {
  title: string;
  instructions: string[];
  alternativeOptions: string[];
} {
  if (browserInfo.isBrave) {
    return {
      title: 'Payment Instructions for Brave Browser',
      instructions: [
        '1. Click the Brave Shields icon (🛡️) in the address bar',
        '2. Toggle "Shields" to "Down" for this site',
        '3. Refresh the page and try payment again',
        '4. Re-enable Shields after completing your purchase'
      ],
      alternativeOptions: [
        'Use Chrome, Firefox, or Safari for payment',
        'Contact us for manual payment processing',
        'Use PayPal or bank transfer if available'
      ]
    };
  }

  return {
    title: 'Payment Instructions',
    instructions: [
      'Please ensure your browser allows payment processing',
      'Disable any ad blockers for this site',
      'Make sure JavaScript is enabled'
    ],
    alternativeOptions: [
      'Try a different browser if issues persist',
      'Contact support for assistance'
    ]
  };
} 