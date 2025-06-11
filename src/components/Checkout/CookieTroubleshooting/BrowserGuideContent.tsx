import { BrowserGuide } from './types';

interface BrowserGuideContentProps {
 guide: BrowserGuide;
}

export const BrowserGuideContent = ({ guide }: BrowserGuideContentProps) => {
 return (
 <div className="tab-content">
 <div className="browser-guide">
 <h4>Instrukcije za {guide.title}:</h4>
 <ol>
 {guide.steps.map((step, index) => (
 <li key={index}>{step}</li>
 ))}
 </ol>
 </div>
 </div>
 );
}; 