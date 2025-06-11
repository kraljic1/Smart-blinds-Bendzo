import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from './navigationData';

interface NavItemProps {
 item: typeof navItems[0];
 index: number;
 isActive: boolean;
 scrolled: boolean;
 hoverIndex: number | null;
 onMouseEnter: () => void;
 onMouseLeave: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
 item,
 index,
 isActive,
 scrolled,
 hoverIndex,
 onMouseEnter,
 onMouseLeave
}) => (
 <Link
 to={item.path}
 className={`relative px-4 py-2 rounded-full text-sm font-medium nav-font transition-all duration-300 flex items-center group ${
 isActive
 ? 'text-blue-600 '
 : scrolled
 ? 'text-gray-700 hover:text-blue-600 :text-blue-400'
 : 'text-gray-700 hover:text-blue-600 :text-white'
 }`}
 onMouseEnter={onMouseEnter}
 onMouseLeave={onMouseLeave}
 >
 <span className="relative z-10">{item.label}</span>
 {(isActive || hoverIndex === index) && (
 <span className={`absolute inset-0 rounded-full transition-all duration-300 ${
 isActive ? 'bg-white/90 shadow-md' : 'bg-white/20 '
 }`}></span>
 )}
 {isActive && (
 <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 hidden group-hover:block">
 <div className="w-1 h-1 rounded-full bg-blue-600"></div>
 </div>
 )}
 </Link>
);

export default NavItem; 