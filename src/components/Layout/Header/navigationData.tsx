import React from 'react';
import { Home, ShoppingBag, HelpCircle, Settings } from 'lucide-react';

export interface NavItem {
 label: string;
 path: string;
 icon: React.ReactNode;
}

export const navItems: NavItem[] = [
 { label: 'Roller Blinds', path: '/products/roller-blinds', icon: <Home size={16} /> },
 { label: 'Zebra Blinds', path: '/products/zebra-blinds', icon: <Home size={16} /> },
 { label: 'Curtain Blinds', path: '/products/curtain-blinds', icon: <Home size={16} /> },
 { label: 'Accessories', path: '/products/accessories', icon: <ShoppingBag size={16} /> },
 { label: 'How It Works', path: '/how-it-works', icon: <HelpCircle size={16} /> },
 { label: 'Support', path: '/support', icon: <Settings size={16} /> },
];

// Check if a route is active
export const isActiveRoute = (currentPath: string, itemPath: string): boolean => {
 return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
}; 