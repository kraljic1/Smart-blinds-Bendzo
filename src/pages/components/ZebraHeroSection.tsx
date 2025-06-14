import React from 'react';
import zebraBlindHero from '../../img/hero-images/zebrablinds.webp';

interface ZebraHeroSectionProps {
 isLoaded: boolean;
 onScrollToProducts: (e: React.MouseEvent) => void;
}

const ZebraHeroSection: React.FC<ZebraHeroSectionProps> = ({ 
 isLoaded, 
 onScrollToProducts 
}) => {
 return (
 <div className={`relative h-[50vh] min-h-[400px] mb-16 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
 <div className="absolute inset-0">
 <img 
 src={zebraBlindHero} 
 alt="Smart zebra blinds showcase"
 className="w-full h-full object-contain bg-gradient-to-b from-gray-50 to-gray-100"
 />
 <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"/>
 </div>
 <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
 <div className="max-w-3xl">
 <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 drop-shadow-lg">
 Smart Zebra Blinds
 </h2>
 <p className="text-lg sm:text-xl text-blue-50 mb-8 drop-shadow-md">
 Elegant dual-layer fabric blinds with alternating sheer and solid patterns for precise light control and privacy.
 </p>
 <a 
 href="#products"
 onClick={onScrollToProducts}
 className="bg-white text-blue-900 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition inline-block shadow-lg"
 >
 Explore Collection
 </a>
 </div>
 </div>
 </div>
 );
};

export default ZebraHeroSection; 