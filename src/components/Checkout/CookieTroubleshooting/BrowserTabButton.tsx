import { BrowserGuide } from './types';

interface BrowserTabButtonProps {
 guide: BrowserGuide;
 isActive: boolean;
 isRecommended: boolean;
 onClick: () => void;
}

export const BrowserTabButton = ({ 
 guide, 
 isActive, 
 isRecommended, 
 onClick 
}: BrowserTabButtonProps) => {
 return (
 <button
 onClick={onClick}
 className={`tab-button ${isActive ? 'active' : ''} ${isRecommended ? 'recommended' : ''}`}
 >
 <span className="browser-icon">{guide.icon}</span>
 {guide.title}
 {isRecommended && <span className="recommended-badge">Preporučeno</span>}
 </button>
 );
}; 