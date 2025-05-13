import React, { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

interface MobileMenuWrapperProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define a type that includes non-standard CSS properties
interface ExtendedCSSStyleDeclaration extends CSSStyleDeclaration {
  '-webkit-backdrop-filter': string;
}

const MobileMenuWrapper: React.FC<MobileMenuWrapperProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  
  // Create the menu panel as a direct DOM manipulation
  useEffect(() => {
    console.log("MobileMenuWrapper: isOpen state changed to", isOpen);
    
    const cleanupPanel = () => {
      const existingPanel = document.getElementById('mobile-menu-panel');
      if (existingPanel && existingPanel.parentNode) {
        existingPanel.parentNode.removeChild(existingPanel);
      }
    };

    if (isOpen) {
      // Remove any existing menu panel
      cleanupPanel();
      
      // Create panel with modern 2025 style
      const panel = document.createElement('div');
      panel.id = 'mobile-menu-panel';
      panel.style.position = 'fixed';
      panel.style.top = '0';
      panel.style.right = '0';
      panel.style.bottom = '0';
      panel.style.width = '350px';
      panel.style.maxWidth = '90%';
      panel.style.backgroundColor = isDark ? '#111827' : '#ffffff';
      panel.style.boxShadow = isDark ? '0 0 40px rgba(0,0,0,0.5)' : '0 0 40px rgba(0,0,0,0.2)';
      panel.style.zIndex = '9999';
      panel.style.padding = '80px 32px 32px 32px';
      panel.style.overflowY = 'auto';
      panel.style.borderRadius = '24px 0 0 24px';
      panel.style.transform = 'translateX(100%)'; // Start offscreen
      panel.style.opacity = '0';
      panel.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      
      // Add close button with modern style
      const closeButton = document.createElement('button');
      closeButton.style.position = 'absolute';
      closeButton.style.top = '24px';
      closeButton.style.right = '24px';
      closeButton.style.background = isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(249, 250, 251, 0.8)';
      closeButton.style.border = 'none';
      closeButton.style.cursor = 'pointer';
      closeButton.style.color = isDark ? '#ffffff' : '#111827';
      closeButton.style.zIndex = '10000';
      closeButton.style.width = '40px';
      closeButton.style.height = '40px';
      closeButton.style.borderRadius = '50%';
      closeButton.style.display = 'flex';
      closeButton.style.alignItems = 'center';
      closeButton.style.justifyContent = 'center';
      closeButton.style.backdropFilter = 'blur(8px)';
      (closeButton.style as unknown as ExtendedCSSStyleDeclaration)['-webkit-backdrop-filter'] = 'blur(8px)';
      closeButton.style.boxShadow = `0 4px 12px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`;
      closeButton.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      closeButton.style.opacity = '0';
      closeButton.style.transform = 'scale(0.9)';
      
      closeButton.onmouseover = () => {
        closeButton.style.transform = 'scale(1.1)';
        closeButton.style.boxShadow = `0 6px 16px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)'}`;
      };
      closeButton.onmouseout = () => {
        closeButton.style.transform = 'scale(1)';
        closeButton.style.boxShadow = `0 4px 12px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`;
      };
      
      // Make sure the click event is properly attached
      closeButton.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      };
      
      closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      
      panel.appendChild(closeButton);
      
      // Add logo/brand at the top
      const brandArea = document.createElement('div');
      brandArea.style.marginBottom = '40px';
      brandArea.style.display = 'flex';
      brandArea.style.alignItems = 'center';
      brandArea.style.transform = 'translateY(20px)';
      brandArea.style.opacity = '0';
      brandArea.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s';
      
      brandArea.innerHTML = `
        <div style="
          font-weight: 700; 
          font-size: 24px; 
          background: linear-gradient(90deg, #3B82F6, #8B5CF6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline-block;
        ">Smartblinds</div>
      `;
      panel.appendChild(brandArea);
      
      // Add content with modern style
      const content = document.createElement('div');
      content.style.display = 'flex';
      content.style.flexDirection = 'column';
      content.style.gap = '8px';
      content.style.opacity = '0';
      content.style.transform = 'translateY(30px)';
      content.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s';
      
      // Menu items data with modern icons
      const menuItems = [
        { 
          path: '/products/roller-blinds', 
          label: 'Roller Blinds',
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3H21V7.5H3V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 7.5H21V21H3V7.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 13.5L12 16.5L15 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        },
        { 
          path: '/products/zebra-blinds', 
          label: 'Zebra Blinds',
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3H21V7.5H3V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 7.5H21V12H3V7.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 12H21V16.5H3V12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 16.5H21V21H3V16.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        },
        { 
          path: '/products/curtain-blinds', 
          label: 'Curtain Blinds',
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3V21M18 3V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 4C6 4 9 8 12 8C15 8 18 4 18 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 21C6 21 9 16 12 16C15 16 18 21 18 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        },
        { 
          path: '/products/accessories', 
          label: 'Accessories',
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10H3M16 2V6M8 2V6M6.8 22H17.2C18.8802 22 19.7202 22 20.362 21.673C20.9265 21.3854 21.3854 20.9265 21.673 20.362C22 19.7202 22 18.8802 22 17.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V17.2C2 18.8802 2 19.7202 2.32698 20.362C2.6146 20.9265 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        },
        { 
          path: '/how-it-works', 
          label: 'How It Works',
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        },
        { 
          path: '/support', 
          label: 'Support',
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12V12.01M12 16V16.01M18.364 5.63604C21.8787 9.15076 21.8787 14.8492 18.364 18.364C14.8492 21.8787 9.15076 21.8787 5.63604 18.364C2.12132 14.8492 2.12132 9.15076 5.63604 5.63604C9.15076 2.12132 14.8492 2.12132 18.364 5.63604" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        }
      ];
      
      // Generate HTML for menu items with staggered animation
      menuItems.forEach((item, index) => {
        const menuItem = document.createElement('a');
        menuItem.href = item.path;
        menuItem.style.display = 'flex';
        menuItem.style.alignItems = 'center';
        menuItem.style.gap = '16px';
        menuItem.style.padding = '16px';
        menuItem.style.color = isDark ? '#ffffff' : '#111827';
        menuItem.style.textDecoration = 'none';
        menuItem.style.fontWeight = '500';
        menuItem.style.fontSize = '16px';
        menuItem.style.borderRadius = '14px';
        menuItem.style.background = isDark ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.7)';
        menuItem.style.backdropFilter = 'blur(5px)';
        (menuItem.style as unknown as ExtendedCSSStyleDeclaration)['-webkit-backdrop-filter'] = 'blur(5px)';
        menuItem.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        menuItem.style.border = `1px solid ${isDark ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.8)'}`;
        menuItem.style.opacity = '0';
        menuItem.style.transform = 'translateX(20px)';
        menuItem.style.transitionDelay = `${0.2 + (index * 0.05)}s`;
        
        menuItem.onmouseover = () => {
          menuItem.style.transform = 'translateX(5px)';
          menuItem.style.background = isDark ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 0.9)';
          menuItem.style.boxShadow = isDark ? '0 5px 15px rgba(0, 0, 0, 0.3)' : '0 5px 15px rgba(0, 0, 0, 0.05)';
        };
        
        menuItem.onmouseout = () => {
          menuItem.style.transform = 'translateX(0)';
          menuItem.style.background = isDark ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.7)';
          menuItem.style.boxShadow = 'none';
        };
        
        menuItem.onclick = (e) => {
          e.preventDefault();
          window.location.href = item.path;
          onClose();
        };
        
        menuItem.innerHTML = `
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'};
            color: ${isDark ? '#60a5fa' : '#3b82f6'};
          ">${item.icon}</div>
          <span>${item.label}</span>
          <svg style="margin-left: auto;" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;
        
        content.appendChild(menuItem);
      });
      
      panel.appendChild(content);
      
      // Add footer with modern design
      const footer = document.createElement('div');
      footer.style.marginTop = '40px';
      footer.style.paddingTop = '24px';
      footer.style.borderTop = `1px solid ${isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)'}`;
      footer.style.display = 'flex';
      footer.style.justifyContent = 'space-between';
      footer.style.alignItems = 'center';
      footer.style.opacity = '0';
      footer.style.transform = 'translateY(20px)';
      footer.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s, opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s';
      
      footer.innerHTML = `
        <span style="
          font-size: 14px;
          color: ${isDark ? 'rgba(156, 163, 175, 0.8)' : 'rgba(107, 114, 128, 0.8)'};
          font-weight: 500;
        ">© ${new Date().getFullYear()} Smartblinds</span>
        
        <div style="
          display: flex;
          gap: 8px;
        ">
          <a href="#" style="
            color: ${isDark ? '#9ca3af' : '#6b7280'};
            font-size: 14px;
            text-decoration: none;
          ">Privacy</a>
          <a href="#" style="
            color: ${isDark ? '#9ca3af' : '#6b7280'};
            font-size: 14px;
            text-decoration: none;
          ">Terms</a>
        </div>
      `;
      
      panel.appendChild(footer);
      
      // Append to body before animations
      document.body.appendChild(panel);
      
      // Force a reflow for smoother animation
      void panel.offsetWidth;
      
      // Apply animations with smooth transitions
      window.setTimeout(() => {
        // Show the panel first
        panel.style.transform = 'translateX(0)';
        panel.style.opacity = '1';
        
        // Then animate the inner elements
        window.setTimeout(() => {
          closeButton.style.opacity = '1';
          closeButton.style.transform = 'scale(1)';
          
          brandArea.style.opacity = '1';
          brandArea.style.transform = 'translateY(0)';
          
          content.style.opacity = '1';
          content.style.transform = 'translateY(0)';
          
          // Animate each menu item
          Array.from(content.children).forEach((child: Element) => {
            (child as HTMLElement).style.opacity = '1';
            (child as HTMLElement).style.transform = 'translateX(0)';
          });
          
          footer.style.opacity = '1';
          footer.style.transform = 'translateY(0)';
        }, 100);
      }, 50);
    } else {
      // Animation for panel exit and removal
      const existingPanel = document.getElementById('mobile-menu-panel');
      if (existingPanel) {
        // Get all animated children
        const closeButton = existingPanel.querySelector('button');
        const brandArea = existingPanel.querySelector('div');
        const content = brandArea?.nextElementSibling as HTMLElement;
        const footer = content?.nextElementSibling as HTMLElement;
        
        if (closeButton) {
          (closeButton as HTMLElement).style.opacity = '0';
          (closeButton as HTMLElement).style.transform = 'scale(0.9)';
        }
        
        if (brandArea) {
          (brandArea as HTMLElement).style.opacity = '0';
          (brandArea as HTMLElement).style.transform = 'translateY(20px)';
        }
        
        if (content) {
          content.style.opacity = '0';
          content.style.transform = 'translateY(30px)';
          
          // Animate each menu item with staggered delay
          Array.from(content.children).forEach((child: Element, index: number) => {
            (child as HTMLElement).style.opacity = '0';
            (child as HTMLElement).style.transform = 'translateX(20px)';
            (child as HTMLElement).style.transitionDelay = `${0.05 * (content.children.length - index - 1)}s`;
          });
        }
        
        if (footer) {
          footer.style.opacity = '0';
          footer.style.transform = 'translateY(20px)';
        }
        
        // Animate panel exit
        window.setTimeout(() => {
          if (existingPanel) {
            existingPanel.style.transform = 'translateX(100%)';
            existingPanel.style.opacity = '0';
            
            // Remove panel after animation completes
            window.setTimeout(() => {
              if (existingPanel && existingPanel.parentNode) {
                existingPanel.parentNode.removeChild(existingPanel);
              }
            }, 400);
          }
        }, 200);
      }
    }

    // Ensure cleanup on unmount
    return () => {
      cleanupPanel();
    };
  }, [isOpen, onClose, isDark]);

  return null;
};

export default MobileMenuWrapper; 