import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Wifi, Smartphone } from 'lucide-react';
import SEO from '../components/SEO';
import '../styles/AccessoriesPage.css';

interface AccessoryProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  features: string[];
  colors: number;
  colorHex: string;
}

const accessories: AccessoryProduct[] = [
  {
    id: "wifi-bridge",
    name: "WIFI BRIDGE",
    price: 159.99,
    originalPrice: 189.99,
    image: "/src/img/motori/wifi-bridge.webp",
    features: ["Smart Control"],
    colors: 2,
    colorHex: "#000000"
  },
  {
    id: "remote-control",
    name: "REMOTE CONTROL",
    price: 59.99,
    originalPrice: 79.99,
    image: "/src/img/motori/remote.webp",
    features: ["15 Channels"],
    colors: 2,
    colorHex: "#FFFFFF"
  },
  {
    id: "smart-hub",
    name: "SMART HUB",
    price: 129.99,
    originalPrice: 149.99,
    image: "/src/img/motori/wifi-bridge.webp",
    features: ["Voice Control"],
    colors: 1,
    colorHex: "#333333"
  }
];

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
      <div className={`relative h-[40vh] mb-16 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
        <div className="absolute inset-0">
          <img 
            src="/src/img/motori/hero.webp" 
            alt="Smart accessories showcase"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Smart Home Accessories
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8">
              Complete your smart home setup with our range of accessories
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className={`text-3xl font-bold text-gray-900 dark:text-white mb-6 ${isLoaded ? 'fade-in-delay-1' : 'opacity-0'}`}>
            Smart Accessories Collection
          </h2>
          <p className={`text-lg text-gray-600 dark:text-gray-300 max-w-3xl ${isLoaded ? 'fade-in-delay-2' : 'opacity-0'}`}>
            Enhance your smart blinds experience with our collection of innovative accessories designed to add convenience and flexibility to your home.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accessories.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
              <div className="relative">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="absolute bottom-4 right-4">
                  <div 
                    className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-800 shadow-md product-color-swatch" 
                    data-color={product.colorHex} 
                    style={{ backgroundColor: product.colorHex }}
                  ></div>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col min-h-[240px]">
                <div className="h-14 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 uppercase overflow-hidden line-clamp-2 h-full flex items-center">
                    {product.name}
                  </h3>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm uppercase">
                    {product.features[0] === "Smart Control" ? (
                      <><Wifi className="w-4 h-4 mr-1 inline" />{product.features[0]}</>
                    ) : product.features[0] === "Voice Control" ? (
                      <><Smartphone className="w-4 h-4 mr-1 inline" />{product.features[0]}</>
                    ) : (
                      <><Sun className="w-4 h-4 mr-1 inline" />{product.features[0]}</>
                    )}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400 uppercase">
                    +{product.colors} COLORS
                  </span>
                </div>
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${product.price}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                </div>
                <div className="space-y-2 mt-auto">
                  <Link to={`/products/configure/${product.id}`} className="block">
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition uppercase dark:bg-blue-500 dark:hover:bg-blue-600">
                      Configure &amp; Buy
                    </button>
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