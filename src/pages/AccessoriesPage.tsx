import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO/SEO';
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

 const scrollToProducts = () => {
   // Implement the scrollToProducts function
 };

 return (
 <div className="pt-24 pb-32 bg-white">
 <SEO
 title="Smart Home Accessories | Smartblinds"
 description="Discover our range of smart home accessories including remote controls, WiFi bridges, and more."
 keywords="smart accessories, remote control, wifi bridge, smart home"
 />
 
 {/* Hero Section */}
 <div className={`relative h-[50vh] min-h-[400px] mb-16 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
 <div className="absolute inset-0">
 <img 
 src={accessories[0].images[0]} 
 alt="Smart home accessories showcase"
 className="w-full h-full object-contain bg-gradient-to-b from-gray-50 to-gray-100"
 />
 <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"/>
 </div>
 <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
 <div className="max-w-3xl">
 <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 drop-shadow-lg">
 Smart Home Accessories
 </h2>
 <p className="text-lg sm:text-xl text-blue-50 mb-8 drop-shadow-md">
 Complete your smart home setup with our range of premium accessories and control devices.
 </p>
 <a 
 href="#products"
 onClick={scrollToProducts}
 className="bg-white text-blue-900 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition inline-block shadow-lg"
 >
 Explore Collection
 </a>
 </div>
 </div>
 </div>

 {/* Main Content */}
 <div className="max-w-7xl mx-auto px-4">
 <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
 {accessories.map((accessory) => (
 <ModernAccessoryCard key={accessory.id} product={accessory} />
 ))}
 </div>
 </div>
 </div>
 );
};

export default AccessoriesPage; 