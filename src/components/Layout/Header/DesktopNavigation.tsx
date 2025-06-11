import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { navItems, isActiveRoute } from './navigationData';
import NavItem from './NavItem';

interface DesktopNavigationProps {
 scrolled: boolean;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ scrolled }) => {
 const [hoverIndex, setHoverIndex] = useState<number | null>(null);
 const location = useLocation();

 return (
 <nav className="hidden lg:flex items-center">
 <div className="relative px-2 py-1 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 /30 flex items-center space-x-1">
 {navItems.map((item, index) => (
 <NavItem
 key={index}
 item={item}
 index={index}
 isActive={isActiveRoute(location.pathname, item.path)}
 scrolled={scrolled}
 hoverIndex={hoverIndex}
 onMouseEnter={() => setHoverIndex(index)}
 onMouseLeave={() => setHoverIndex(null)}
 />
 ))}
 </div>
 </nav>
 );
};

export default DesktopNavigation; 