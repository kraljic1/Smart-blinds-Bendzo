import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { BrowserInfo } from '../../utils/browserDetection';
import { LoadingIndicator } from './components/LoadingIndicator';
import { WarningHeader } from './components/WarningHeader';
import { InstructionsSection } from './components/InstructionsSection';
import { useBrowserCompatibility } from './hooks/useBrowserCompatibility';

interface BraveCompatibilityWarningProps {
 onBrowserDetected?: (browserInfo: BrowserInfo) => void;
 className?: string;
}

export function BraveCompatibilityWarning({ 
 onBrowserDetected, 
 className = '' 
}: BraveCompatibilityWarningProps) {
 const [showInstructions, setShowInstructions] = useState(false);
 
 const {
 browserInfo,
 stripeCompatibility,
 isLoading,
 shouldShowWarning
 } = useBrowserCompatibility(onBrowserDetected);

 const toggleInstructions = () => setShowInstructions(!showInstructions);

 if (isLoading) {
 return <LoadingIndicator className={className} />;
 }

 if (!shouldShowWarning) {
 return null;
 }

 return (
 <div className={`bg-amber-50 border border-amber-200 rounded-lg p-4 ${className}`}>
 <div className="flex items-start space-x-3">
 <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0"/>
 <div className="flex-1">
 <WarningHeader 
 browserInfo={browserInfo}
 stripeCompatibility={stripeCompatibility}
 />
 
 <button
 onClick={toggleInstructions}
 className="text-amber-800 text-sm font-medium hover:text-amber-900 underline focus:outline-none"
 >
 {showInstructions ? 'Hide Instructions' : 'Show Payment Instructions'}
 </button>

 {showInstructions && (
 <InstructionsSection browserInfo={browserInfo} />
 )}
 </div>
 </div>
 </div>
 );
} 