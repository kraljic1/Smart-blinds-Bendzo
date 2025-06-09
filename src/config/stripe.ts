/**
 * Enhanced Stripe configuration with privacy browser compatibility
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';

// Stripe publishable key (starts with pk_)
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('⚠️ VITE_STRIPE_PUBLISHABLE_KEY is not defined in environment variables');
  console.warn('Please create a .env file with your Stripe keys. See STRIPE_SETUP.md for details.');
}

// Type definition for Brave browser detection
interface NavigatorWithBrave extends Navigator {
  brave?: {
    isBrave: () => Promise<boolean>;
  };
}

// Enhanced privacy browser detection
const detectPrivacyBrowser = (): { isBrave: boolean; isFirefoxStrict: boolean; isSafariITP: boolean; isPrivacyMode: boolean } => {
  const userAgent = navigator.userAgent;
  
  // Detect Brave browser
  const navigatorWithBrave = navigator as NavigatorWithBrave;
  const isBrave = !!(navigatorWithBrave.brave && typeof navigatorWithBrave.brave.isBrave === 'function');
  
  // Detect Firefox with strict tracking protection
  const isFirefoxStrict = userAgent.includes('Firefox') && 
    // Check if tracking protection is likely enabled
    (document.cookie === '' || !navigator.cookieEnabled);
  
  // Detect Safari with Intelligent Tracking Prevention
  const isSafariITP = userAgent.includes('Safari') && 
    !userAgent.includes('Chrome') && 
    !userAgent.includes('Chromium');
  
  const isPrivacyMode = isBrave || isFirefoxStrict || isSafariITP;
  
  return { isBrave, isFirefoxStrict, isSafariITP, isPrivacyMode };
};

// Strategy 1: Standard Stripe loading (for normal browsers)
const loadStripeStandard = async (): Promise<Stripe | null> => {
  try {
    return await loadStripe(stripePublishableKey || '', {
      locale: 'auto',
      // Disable Payment Request API in development to avoid permissions policy warnings
      ...(window.location.hostname === 'localhost' && {
        disableAdvancedFraudDetection: true,
      }),
    });
  } catch (error) {
    console.warn('Standard Stripe loading failed:', error);
    return null;
  }
};

// Strategy 2: Enhanced loading for privacy browsers
const loadStripePrivacyMode = async (): Promise<Stripe | null> => {
  try {
    // Use a more privacy-friendly approach
    return await loadStripe(stripePublishableKey || '', {
      locale: 'auto',
      // Minimal configuration for privacy browsers
      // Disable Payment Request API in development
      ...(window.location.hostname === 'localhost' && {
        disableAdvancedFraudDetection: true,
      }),
    });
  } catch (error) {
    console.warn('Privacy-mode loading failed:', error);
    return null;
  }
};

// Strategy 3: Fallback with retry mechanism
const loadStripeWithRetry = async (maxRetries: number = 3): Promise<Stripe | null> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Stripe loading attempt ${attempt}/${maxRetries}`);
      
      const stripe = await loadStripe(stripePublishableKey || '', {
        locale: 'auto',
        // Disable Payment Request API in development
        ...(window.location.hostname === 'localhost' && {
          disableAdvancedFraudDetection: true,
        }),
      });
      
      if (stripe) {
        console.log('Stripe loaded successfully on attempt', attempt);
        return stripe;
      }
    } catch (error) {
      console.warn(`Stripe loading attempt ${attempt} failed:`, error);
      
      if (attempt < maxRetries) {
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }
  
  console.error('All Stripe loading attempts failed');
  return null;
};

// Main Stripe promise with intelligent strategy selection
let stripePromise: Promise<Stripe | null>;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const browserInfo = detectPrivacyBrowser();
    
    console.log('Browser detection:', browserInfo);
    
    stripePromise = (async () => {
      // Strategy selection based on browser
      if (browserInfo.isPrivacyMode) {
        console.log('Privacy browser detected, using enhanced loading strategy');
        
        // Try privacy-mode loading first
        let stripe = await loadStripePrivacyMode();
        
        // If that fails, try with retry mechanism
        if (!stripe) {
          console.log('Privacy-mode loading failed, trying with retry mechanism');
          stripe = await loadStripeWithRetry(2);
        }
        
        return stripe;
      } else {
        // Standard loading for normal browsers
        console.log('Standard browser detected, using normal loading strategy');
        
        let stripe = await loadStripeStandard();
        
        // Fallback to retry mechanism if standard loading fails
        if (!stripe) {
          console.log('Standard loading failed, trying with retry mechanism');
          stripe = await loadStripeWithRetry(2);
        }
        
        return stripe;
      }
    })().catch((error) => {
      console.warn('All Stripe loading strategies failed:', error);
      return null;
    });
  }
  
  return stripePromise;
};

export const checkStripeAvailability = async (): Promise<boolean> => {
  try {
    const stripe = await getStripe();
    return stripe !== null;
  } catch {
    return false;
  }
};

// Enhanced browser compatibility check
export const getBrowserCompatibilityInfo = () => {
  const browserInfo = detectPrivacyBrowser();
  
  return {
    ...browserInfo,
    recommendations: {
      shouldUseServerSideRedirect: browserInfo.isBrave,
      shouldShowCookieNotice: browserInfo.isPrivacyMode,
      shouldUseRetryMechanism: browserInfo.isFirefoxStrict || browserInfo.isSafariITP,
    }
  };
};

// Export for server-side use only
export const stripeApiVersion = '2024-06-20';
export { stripePublishableKey }; 