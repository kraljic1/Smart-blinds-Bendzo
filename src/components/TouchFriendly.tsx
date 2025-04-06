import React, { ReactNode, useEffect } from 'react';

interface TouchFriendlyProps {
  children: ReactNode;
}

/**
 * Component that ensures touch events work properly on mobile devices
 * Particularly helps with iOS Safari by adding touch-action CSS
 */
const TouchFriendly: React.FC<TouchFriendlyProps> = ({ children }) => {
  useEffect(() => {
    // Add a global style for better touch handling
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        touch-action: manipulation;
      }
      a, button, [role="button"], input, select, textarea {
        touch-action: auto;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <>{children}</>;
};

export default TouchFriendly; 