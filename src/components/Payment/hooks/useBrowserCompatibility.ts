import { useState, useEffect } from 'react';
import { getBrowserInfo, checkStripeCompatibility, BrowserInfo } from '../../../utils/browserDetection';

interface StripeCompatibility {
 isBlocked: boolean;
 canLoadStripe: boolean;
 recommendations: string[];
}

interface UseBrowserCompatibilityReturn {
 browserInfo: BrowserInfo | null;
 stripeCompatibility: StripeCompatibility | null;
 isLoading: boolean;
 shouldShowWarning: boolean;
}

export function useBrowserCompatibility(
 onBrowserDetected?: (browserInfo: BrowserInfo) => void
): UseBrowserCompatibilityReturn {
 const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
 const [stripeCompatibility, setStripeCompatibility] = useState<StripeCompatibility | null>(null);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
 async function detectBrowserAndCompatibility() {
 try {
 const info = await getBrowserInfo();
 setBrowserInfo(info);
 onBrowserDetected?.(info);

 const compatibility = await checkStripeCompatibility();
 setStripeCompatibility(compatibility);
 } catch (error) {
 console.error('Browser detection failed:', error);
 } finally {
 setIsLoading(false);
 }
 }

 detectBrowserAndCompatibility();
 }, [onBrowserDetected]);

 const shouldShowWarning = !!(browserInfo?.isBrave || stripeCompatibility?.isBlocked);

 return {
 browserInfo,
 stripeCompatibility,
 isLoading,
 shouldShowWarning
 };
} 