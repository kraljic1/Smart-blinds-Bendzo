import { ReactNode } from 'react';
import { ScrollIndicator } from '../UI';
import { BackToTop } from '../Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen light-gradient-bg dark:bg-[#0c1222] flex flex-col overflow-x-hidden">
      <div className="w-full h-full absolute top-0 left-0 z-[-1] bg-white dark:bg-[#0c1222]"></div>
      {children}
      <ScrollIndicator />
      <BackToTop />
    </div>
  );
};

export default Layout; 