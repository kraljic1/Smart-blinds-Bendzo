/**
 * Brave browser detection utilities
 */

/**
 * Method 1: Check for Brave-specific navigator properties (most reliable)
 */
export async function detectBraveByNavigator(): Promise<boolean> {
  if ('brave' in navigator && navigator.brave && typeof navigator.brave.isBrave === 'function') {
    try {
      return await navigator.brave.isBrave();
    } catch {
      // Brave detection method 1 failed - silently continue to next method
      return false;
    }
  }
  return false;
}

/**
 * Method 2: Check user agent for Brave-specific patterns
 */
export function detectBraveByUserAgent(): boolean {
  const userAgent = navigator.userAgent;
  return userAgent.includes('Brave');
}

/**
 * Method 3: Check for Brave-specific features (only if Chrome-like)
 */
export function detectBraveByChromeFeatures(): boolean {
  const userAgent = navigator.userAgent;
  
  // Only run this check if the browser appears to be Chrome-based
  if (!userAgent.includes('Chrome') || userAgent.includes('Safari') || !window.chrome) {
    return false;
  }

  try {
    // Check if certain Chrome APIs are blocked (Brave blocks some)
    if (window.chrome.runtime && !window.chrome.runtime.getManifest) {
      return true;
    }
  } catch {
    // If we get an error accessing Chrome APIs, it might be Brave
    return true;
  }

  return false;
}

/**
 * Comprehensive Brave browser detection using multiple methods
 */
export async function detectBrave(): Promise<boolean> {
  // Try navigator-based detection first (most reliable)
  const navigatorResult = await detectBraveByNavigator();
  if (navigatorResult) {
    return true;
  }

  // Check user agent patterns
  if (detectBraveByUserAgent()) {
    return true;
  }

  // Check Chrome feature differences
  return detectBraveByChromeFeatures();
} 