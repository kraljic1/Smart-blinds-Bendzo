import React, { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

interface MobileMenuWrapperProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenuWrapper: React.FC<MobileMenuWrapperProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  
  // Create the menu panel as a direct DOM manipulation
  useEffect(() => {
    if (isOpen) {
      // Remove any existing menu panel
      const existingPanel = document.getElementById('mobile-menu-panel');
      if (existingPanel) {
        existingPanel.parentNode?.removeChild(existingPanel);
      }
      
      // Create panel with modern 2025 style
      const panel = document.createElement('div');
      panel.id = 'mobile-menu-panel';
      panel.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 350px !important;
        max-width: 90% !important;
        background-color: ${isDark ? '#111827' : '#ffffff'} !important;
        box-shadow: ${isDark ? '0 0 40px rgba(0,0,0,0.5)' : '0 0 40px rgba(0,0,0,0.2)'} !important;
        z-index: 9999 !important;
        padding: 80px 32px 32px 32px !important;
        overflow-y: auto !important;
        border-radius: 24px 0 0 24px !important;
      `;
      
      // Add close button with modern style
      const closeButton = document.createElement('button');
      closeButton.style.cssText = `
        position: absolute !important;
        top: 24px !important;
        right: 24px !important;
        background: ${isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(249, 250, 251, 0.8)'} !important;
        border: none !important;
        cursor: pointer !important;
        color: ${isDark ? '#ffffff' : '#111827'} !important;
        z-index: 10000 !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 50% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        box-shadow: 0 4px 12px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'} !important;
        transition: all 0.2s ease !important;
      `;
      closeButton.onmouseover = () => {
        closeButton.style.transform = 'scale(1.1)';
      };
      closeButton.onmouseout = () => {
        closeButton.style.transform = 'scale(1)';
      };
      closeButton.onclick = onClose;
      closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      
      panel.appendChild(closeButton);
      
      // Add logo/brand at the top
      const brandArea = document.createElement('div');
      brandArea.style.cssText = `
        margin-bottom: 40px !important;
        display: flex !important;
        align-items: center !important;
      `;
      brandArea.innerHTML = `
        <div style="
          font-weight: 700 !important; 
          font-size: 24px !important; 
          background: linear-gradient(90deg, #3B82F6, #8B5CF6) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          color: transparent !important;
          display: inline-block !important;
        ">Smartblinds</div>
      `;
      panel.appendChild(brandArea);
      
      // Add content with modern style
      const content = document.createElement('div');
      content.style.cssText = `
        display: flex !important;
        flex-direction: column !important;
        gap: 8px !important;
      `;
      
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
      
      // Generate HTML for menu items
      menuItems.forEach(item => {
        const menuItem = document.createElement('a');
        menuItem.href = item.path;
        menuItem.style.cssText = `
          display: flex !important;
          align-items: center !important;
          gap: 16px !important;
          padding: 16px !important;
          color: ${isDark ? '#ffffff' : '#111827'} !important;
          text-decoration: none !important;
          font-weight: 500 !important;
          font-size: 16px !important;
          border-radius: 14px !important;
          background: ${isDark ? 'rgba(31, 41, 55, 0.3)' : 'rgba(249, 250, 251, 0.7)'} !important;
          backdrop-filter: blur(5px) !important;
          -webkit-backdrop-filter: blur(5px) !important;
          transition: all 0.2s ease !important;
          border: 1px solid ${isDark ? 'rgba(55, 65, 81, 0.5)' : 'rgba(229, 231, 235, 0.8)'} !important;
        `;
        
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
        
        menuItem.onclick = () => {
          onClose();
        };
        
        menuItem.innerHTML = `
          <div style="
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 40px !important;
            height: 40px !important;
            border-radius: 12px !important;
            background: ${isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)'} !important;
            color: ${isDark ? '#60a5fa' : '#3b82f6'} !important;
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
      footer.style.cssText = `
        margin-top: 40px !important;
        padding-top: 24px !important;
        border-top: 1px solid ${isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(229, 231, 235, 0.8)'} !important;
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
      `;
      
      footer.innerHTML = `
        <span style="
          font-size: 14px !important;
          color: ${isDark ? 'rgba(156, 163, 175, 0.8)' : 'rgba(107, 114, 128, 0.8)'} !important;
          font-weight: 500 !important;
        ">© ${new Date().getFullYear()} Smartblinds</span>
        
        <div style="
          display: flex !important;
          gap: 8px !important;
        ">
          <a href="#" style="
            color: ${isDark ? '#9ca3af' : '#6b7280'} !important;
            font-size: 14px !important;
            text-decoration: none !important;
          ">Privacy</a>
          <a href="#" style="
            color: ${isDark ? '#9ca3af' : '#6b7280'} !important;
            font-size: 14px !important;
            text-decoration: none !important;
          ">Terms</a>
        </div>
      `;
      
      panel.appendChild(footer);
      document.body.appendChild(panel);
      
      // Animation for panel entrance
      setTimeout(() => {
        panel.style.transform = 'translateX(0)';
        panel.style.opacity = '1';
      }, 10);
      
      // Add some entrance animation
      panel.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      panel.style.transform = 'translateX(50px)';
      panel.style.opacity = '0';
    } else {
      // Animation for panel exit and removal
      const existingPanel = document.getElementById('mobile-menu-panel');
      if (existingPanel) {
        existingPanel.style.transform = 'translateX(50px)';
        existingPanel.style.opacity = '0';
        
        setTimeout(() => {
          if (existingPanel.parentNode) {
            existingPanel.parentNode.removeChild(existingPanel);
          }
        }, 300);
      }
    }
    
    // Cleanup function
    return () => {
      const existingPanel = document.getElementById('mobile-menu-panel');
      if (existingPanel && existingPanel.parentNode) {
        existingPanel.parentNode.removeChild(existingPanel);
      }
    };
  }, [isOpen, isDark, onClose]);
  
  // We don't render anything in the component itself
  return null;
};

export default MobileMenuWrapper; 