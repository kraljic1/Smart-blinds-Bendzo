import { getBrowserInfo } from '../detectors/browserInfoDetector';
import { StripeCompatibilityResult } from '../types/browserTypes';

/**
 * Test if Stripe resources can be loaded
 */
export async function testStripeResourceAccess(): Promise<boolean> {
 try {
 await fetch('https://js.stripe.com/v3/', { 
 method: 'HEAD',
 mode: 'no-cors'
 });
 return true;
 } catch {
 return false;
 }
}

/**
 * Get Brave-specific recommendations
 */
export function getBraveRecommendations(): string[] {
 return [
 'You are using Brave browser. For the best payment experience:',
 '• Temporarily disable Brave Shields for this site',
 '• Or use Chrome, Firefox, or Safari for payment'
 ];
}

/**
 * Check if Stripe resources are being blocked
 */
export async function checkStripeCompatibility(): Promise<StripeCompatibilityResult> {
 const recommendations: string[] = [];
 let isBlocked = false;
 let canLoadStripe = true;

 // Test Stripe resource access
 const canAccessStripe = await testStripeResourceAccess();
 if (!canAccessStripe) {
 isBlocked = true;
 canLoadStripe = false;
 recommendations.push('Stripe resources are being blocked by your browser');
 }

 // Check for Brave-specific issues
 const browserInfo = await getBrowserInfo();
 if (browserInfo.isBrave) {
 recommendations.push(...getBraveRecommendations());
 }

 return {
 isBlocked,
 canLoadStripe,
 recommendations
 };
} 