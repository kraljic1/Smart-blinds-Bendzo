import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Chrome, Globe } from 'lucide-react';
import { getBrowserInfo, checkStripeCompatibility, getPaymentInstructions, BrowserInfo } from '../../utils/browserDetection';

interface BraveCompatibilityWarningProps {
  onBrowserDetected?: (browserInfo: BrowserInfo) => void;
  className?: string;
}

export function BraveCompatibilityWarning({ onBrowserDetected, className = '' }: BraveCompatibilityWarningProps) {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [stripeCompatibility, setStripeCompatibility] = useState<{
    isBlocked: boolean;
    canLoadStripe: boolean;
    recommendations: string[];
  } | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function detectBrowserAndCompatibility() {
      try {
        const info = await getBrowserInfo();
        setBrowserInfo(info);
        onBrowserDetected?.(info);

        const compatibility = await checkStripeCompatibility();
        setStripeCompatibility(compatibility);

        // Auto-show instructions for Brave users
        if (info.isBrave) {
          setShowInstructions(true);
        }
      } catch (error) {
        console.error('Browser detection failed:', error);
      } finally {
        setIsLoading(false);
      }
    }

    detectBrowserAndCompatibility();
  }, [onBrowserDetected]);

  if (isLoading) {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-blue-800 text-sm">Checking browser compatibility...</span>
        </div>
      </div>
    );
  }

  if (!browserInfo?.isBrave && !stripeCompatibility?.isBlocked) {
    return null; // No warning needed for compatible browsers
  }

  const instructions = getPaymentInstructions(browserInfo!);

  return (
    <div className={`bg-amber-50 border border-amber-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-amber-800 font-medium text-sm mb-2">
            {browserInfo?.isBrave ? 'Brave Browser Detected' : 'Payment Compatibility Issue'}
          </h3>
          
          {browserInfo?.isBrave && (
            <p className="text-amber-700 text-sm mb-3">
              Brave's privacy features may block payment processing. We recommend following the steps below for a smooth checkout experience.
            </p>
          )}

          {stripeCompatibility?.recommendations && stripeCompatibility.recommendations.length > 0 && (
            <div className="mb-3">
              {stripeCompatibility.recommendations.map((rec, index) => (
                <p key={index} className="text-amber-700 text-sm mb-1">{rec}</p>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="text-amber-800 text-sm font-medium hover:text-amber-900 underline focus:outline-none"
          >
            {showInstructions ? 'Hide Instructions' : 'Show Payment Instructions'}
          </button>

          {showInstructions && (
            <div className="mt-4 space-y-4">
              {/* Brave-specific instructions */}
              {browserInfo?.isBrave && (
                <div className="bg-white rounded-md p-3 border border-amber-200">
                  <h4 className="font-medium text-amber-800 text-sm mb-2 flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    {instructions.title}
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-amber-700">
                    {instructions.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Alternative browser options */}
              <div className="bg-white rounded-md p-3 border border-amber-200">
                <h4 className="font-medium text-amber-800 text-sm mb-2">
                  Alternative Options
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-amber-700">
                    <Chrome className="h-4 w-4" />
                    <span>Use Google Chrome for payment</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-amber-700">
                    <Globe className="h-4 w-4" />
                    <span>Use Mozilla Firefox for payment</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-amber-700">
                    <Globe className="h-4 w-4" />
                    <span>Use Safari for payment (Mac/iOS)</span>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm text-amber-700 mt-2">
                  {instructions.alternativeOptions.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              </div>

              {/* Contact support */}
              <div className="bg-blue-50 rounded-md p-3 border border-blue-200">
                <h4 className="font-medium text-blue-800 text-sm mb-1">
                  Need Help?
                </h4>
                <p className="text-blue-700 text-sm">
                  If you continue to experience issues, please contact our support team. 
                  We can process your payment manually or provide additional assistance.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 