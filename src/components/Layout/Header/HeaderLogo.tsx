import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderLogoProps {
  scrolled: boolean;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ scrolled }) => {
  return (
    <div className="flex items-center">
      <Link 
        to="/" 
        className={`flex items-center transition-all duration-300 ${
          scrolled 
            ? 'text-gray-900 dark:text-white'
            : 'text-gray-900 dark:text-white'
        }`}
      >
        <div className="relative px-3 py-1">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-sm"></div>
          <span className="relative text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Smartblinds
          </span>
        </div>
      </Link>
    </div>
  );
};

export default HeaderLogo; 