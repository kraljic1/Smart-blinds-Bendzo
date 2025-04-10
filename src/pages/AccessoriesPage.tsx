import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import '../styles/AccessoriesPage.css';
import { accessories } from '../data/accessories';
import ModernAccessoryCard from '../components/Products/ModernAccessoryCard';

const AccessoriesPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-24 pb-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <SEO
        title="Smart Home Accessories | Smartblinds"
        description="Discover our range of smart home accessories including remote controls, WiFi bridges, and more."
        keywords="smart accessories, remote control, wifi bridge, smart home"
      />
      
      {/* Hero Section */}
      <div className={`relative h-[30vh] sm:h-[35vh] md:h-[40vh] mb-12 md:mb-16 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
        <div className="absolute inset-0">
          <img 
            src={accessories[0].images[2]} 
            alt="Smart accessories showcase"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              Smart Home Accessories
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8">
              Complete your smart home setup with our range of accessories
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-12">
          <h2 className={`text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 ${isLoaded ? 'fade-in-delay-1' : 'opacity-0'}`}>
            Smart Accessories Collection
          </h2>
          <p className={`text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl ${isLoaded ? 'fade-in-delay-2' : 'opacity-0'}`}>
            Enhance your smart blinds experience with our collection of innovative accessories designed to add convenience and flexibility to your home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 accessories-grid">
          {accessories.map((product, index) => (
            <ModernAccessoryCard 
              key={product.id} 
              product={product} 
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessoriesPage; 