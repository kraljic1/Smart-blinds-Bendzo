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

 return (
 <div className="pt-24 pb-32 bg-gradient-to-b from-gray-50 to-white">
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
 <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"/>
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