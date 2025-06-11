import React, { useRef } from 'react';
import { BasketIcon } from '../../Basket/BasketIcon';
import { LikedIcon } from '../../Liked/LikedIcon';
import { AdminIcon } from '../../AdminRoute/AdminIcon';
import { Menu, X } from 'lucide-react';

interface HeaderActionsProps {
 scrolled: boolean;
 isMenuOpen: boolean;
 toggleMenu: () => void;
}

interface ActionIconProps {
 children: React.ReactNode;
 scrolled: boolean;
}

const ActionIcon: React.FC<ActionIconProps> = ({ children, scrolled }) => (
 <div className={`relative transition-all duration-300 ${
 scrolled ? 'text-gray-900 ' : 'text-gray-900 '
 }`}>
 {children}
 </div>
);

const HeaderActions: React.FC<HeaderActionsProps> = ({
 scrolled,
 isMenuOpen,
 toggleMenu
}) => {
 const menuBtnRef = useRef<HTMLButtonElement>(null);

 return (
 <div className="flex items-center space-x-2">
 <ActionIcon scrolled={scrolled}><AdminIcon /></ActionIcon>
 <ActionIcon scrolled={scrolled}><LikedIcon /></ActionIcon>
 <ActionIcon scrolled={scrolled}><BasketIcon /></ActionIcon>
 
 <div className="lg:hidden">
 <button
 ref={menuBtnRef}
 type="button"
 onClick={toggleMenu}
 className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800"
 aria-expanded={isMenuOpen}
 >
 {isMenuOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
 </button>
 </div>
 </div>
 );
};

export default HeaderActions; 