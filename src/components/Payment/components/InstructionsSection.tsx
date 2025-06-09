import { BrowserInfo } from '../../../utils/browserDetection';
import { BraveInstructions } from './BraveInstructions';
import { TroubleshootingOptions } from './TroubleshootingOptions';
import { SupportSection } from './SupportSection';

interface InstructionsSectionProps {
  browserInfo: BrowserInfo | null;
}

export function InstructionsSection({ browserInfo }: InstructionsSectionProps) {
  if (!browserInfo) {
    return null;
  }

  return (
    <div className="mt-4 space-y-4">
      <BraveInstructions browserInfo={browserInfo} />
      <TroubleshootingOptions browserInfo={browserInfo} />
      <SupportSection />
    </div>
  );
} 