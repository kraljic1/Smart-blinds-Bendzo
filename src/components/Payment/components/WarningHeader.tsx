import { BrowserInfo } from '../../../utils/browserDetection';

interface StripeCompatibility {
 isBlocked: boolean;
 canLoadStripe: boolean;
 recommendations: string[];
}

interface WarningHeaderProps {
 browserInfo: BrowserInfo | null;
 stripeCompatibility: StripeCompatibility | null;
}

export function WarningHeader({ browserInfo, stripeCompatibility }: WarningHeaderProps) {
 const getHeaderTitle = () => {
 return browserInfo?.isBrave ? 'Brave Browser Detected' : 'Payment Compatibility Issue';
 };

 const shouldShowBraveMessage = () => {
 return browserInfo?.isBrave;
 };

 const hasRecommendations = () => {
 return stripeCompatibility?.recommendations && stripeCompatibility.recommendations.length > 0;
 };

 return (
 <>
 <h3 className="text-amber-800 font-medium text-sm mb-2">
 {getHeaderTitle()}
 </h3>
 
 {shouldShowBraveMessage() && (
 <p className="text-amber-700 text-sm mb-3">
 Brave's privacy features may block payment processing. We recommend following the steps below for a smooth checkout experience.
 </p>
 )}

 {hasRecommendations() && (
 <div className="mb-3">
 {stripeCompatibility!.recommendations.map((rec, index) => (
 <p key={index} className="text-amber-700 text-sm mb-1">{rec}</p>
 ))}
 </div>
 )}
 </>
 );
} 