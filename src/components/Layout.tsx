import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen light-gradient-bg dark:bg-gray-900 flex flex-col overflow-x-hidden">
      {children}
    </div>
  );
};

export default Layout; 