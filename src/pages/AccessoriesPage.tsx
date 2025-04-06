import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Smartphone, Cable, Radio } from 'lucide-react';
import SEO from '../components/SEO';
import '../styles/AccessoriesPage.css';
import { accessories, AccessoryProduct } from '../data/accessories';

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
          {accessories.map((product: AccessoryProduct) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
              <div className="relative">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  />
                </div>
              </div>
              <div className="p-4 sm:p-5 md:p-6 flex-grow flex flex-col min-h-[200px] sm:min-h-[220px] md:min-h-[240px]">
                <div className="h-12 sm:h-14 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 uppercase overflow-hidden line-clamp-2 h-full flex items-center">
                    {product.name}
                  </h3>
                </div>
              
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature: string, i: number) => (
                    <span
                      key={i}
                      className="bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs sm:text-sm uppercase flex items-center"
                    >
                      {feature === 'Wi-Fi' && <Wifi className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
                      {feature === 'Matter' && <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
                      {feature === 'Charging' && <Cable className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
                      {(feature === '5 Channels' || feature === '15 Channels') && <Radio className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-baseline mb-4">
                    {product.originalPrice && (
                      <span className="text-gray-500 dark:text-gray-400 line-through mr-2">${product.originalPrice}</span>
                    )}
                    <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                  </div>
                  
                  <Link 
                    to={`/products/configure/${product.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full flex justify-center items-center transition duration-300 uppercase font-medium text-sm sm:text-base"
                  >
                    Configure & Buy
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessoriesPage; 