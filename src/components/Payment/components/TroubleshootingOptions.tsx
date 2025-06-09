import { Chrome, Globe } from 'lucide-react';
import { BrowserInfo, getPaymentInstructions } from '../../../utils/browserDetection';

interface TroubleshootingOptionsProps {
  browserInfo: BrowserInfo;
}

export function TroubleshootingOptions({ browserInfo }: TroubleshootingOptionsProps) {
  const instructions = getPaymentInstructions(browserInfo);

  const browserAlternatives = [
    { icon: Chrome, label: 'Use Google Chrome for payment' },
    { icon: Globe, label: 'Use Mozilla Firefox for payment' },
    { icon: Globe, label: 'Use Safari for payment (Mac/iOS)' }
  ];

  return (
    <div className="bg-white rounded-md p-3 border border-amber-200">
      <h4 className="font-medium text-amber-800 text-sm mb-2">
        Troubleshooting Options
      </h4>
      <div className="space-y-2">
        {browserAlternatives.map((browser, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm text-amber-700">
            <browser.icon className="h-4 w-4" />
            <span>{browser.label}</span>
          </div>
        ))}
      </div>
      <ul className="list-disc list-inside space-y-1 text-sm text-amber-700 mt-2">
        {instructions.troubleshootingOptions.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
} 