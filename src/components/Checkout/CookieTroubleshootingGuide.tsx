import { useState } from 'react';
import './CookieTroubleshootingGuide.css';
import {
 CookieTroubleshootingGuideProps,
 BrowserType,
 ProblemExplanation,
 BrowserTabs,
 AlternativeSolutions,
 TroubleshootingActions
} from './CookieTroubleshooting';

export function CookieTroubleshootingGuide({ onClose, onRetry }: CookieTroubleshootingGuideProps) {
 const [activeTab, setActiveTab] = useState<BrowserType>('chrome');

 return (
 <div className="troubleshooting-overlay">
 <div className="troubleshooting-modal">
 <div className="troubleshooting-header">
 <h3>Rešavanje problema sa kolačićima</h3>
 <button onClick={onClose} className="close-button">×</button>
 </div>

 <div className="troubleshooting-content">
 <ProblemExplanation />
 <BrowserTabs 
 activeTab={activeTab} 
 onTabChange={setActiveTab} 
 />
 <AlternativeSolutions />
 </div>

 <TroubleshootingActions 
 onRetry={onRetry} 
 onClose={onClose} 
 />
 </div>
 </div>
 );
} 