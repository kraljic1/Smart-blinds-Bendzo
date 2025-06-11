import { ReactNode } from 'react';
import { ScrollIndicator } from '../UI';
import { BackToTop } from '../Navigation';

interface LayoutProps {
 children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
 return (
 <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
 {children}
 <ScrollIndicator />
 <BackToTop />
 </div>
 );
};

export default Layout; 