import React, { ReactNode } from 'react';

interface TouchFriendlyProps {
 children: ReactNode;
}

/**
 * Component that ensures touch events work properly on mobile devices
 * Touch-action CSS rules are now in OverscrollFix.css for CSP compliance
 */
const TouchFriendly: React.FC<TouchFriendlyProps> = ({ children }) => {
 // Touch-friendly styles are now handled via CSS files
 // No inline style injection needed - CSP compliant!
 return <>{children}</>;
};

export default TouchFriendly; 