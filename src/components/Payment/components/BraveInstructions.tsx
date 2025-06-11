import { Shield } from 'lucide-react';
import { BrowserInfo, getPaymentInstructions } from '../../../utils/browserDetection';

interface BraveInstructionsProps {
 browserInfo: BrowserInfo;
}

export function BraveInstructions({ browserInfo }: BraveInstructionsProps) {
 const instructions = getPaymentInstructions(browserInfo);

 if (!browserInfo.isBrave) {
 return null;
 }

 return (
 <div className="bg-white rounded-md p-3 border border-amber-200">
 <h4 className="font-medium text-amber-800 text-sm mb-2 flex items-center">
 <Shield className="h-4 w-4 mr-2"/>
 {instructions.title}
 </h4>
 <ol className="list-decimal list-inside space-y-1 text-sm text-amber-700">
 {instructions.instructions.map((instruction, index) => (
 <li key={index}>{instruction}</li>
 ))}
 </ol>
 </div>
 );
} 