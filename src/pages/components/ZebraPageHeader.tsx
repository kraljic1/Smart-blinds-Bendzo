import React from 'react';
import Breadcrumb from '../../components/Navigation/Breadcrumb';

interface ZebraPageHeaderProps {
  isLoaded: boolean;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}

const ZebraPageHeader: React.FC<ZebraPageHeaderProps> = ({ 
  isLoaded, 
  headingRef 
}) => {
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Zebra Blinds', path: '/products/zebra-blinds' }
  ];

  return (
    <>
      <div className={`mb-8 slide-in-up ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Breadcrumb items={breadcrumbItems} />
      </div>
      
      <div className="relative">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-200 dark:bg-indigo-900 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      </div>
      
      <h1 
        ref={headingRef}
        className={`text-5xl font-bold text-gray-900 dark:text-white mb-4 fade-in-scale ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        Smart Zebra Blinds
      </h1>
      
      <p className={`text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl slide-in-up delay-50 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        Discover our premium collection of zebra blinds with alternating opaque and sheer fabric strips.
        Control light and privacy with our smart zebra blinds.
      </p>
    </>
  );
};

export default ZebraPageHeader; 