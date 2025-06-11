import React from 'react';
import zebraBlindHero from '../../img/zebra/PURE/PURE - WHITE/0.webp';

interface ZebraHeroSectionProps {
 isLoaded: boolean;
 onScrollToProducts: (e: React.MouseEvent) => void;
}

const ZebraHeroSection: React.FC<ZebraHeroSectionProps> = ({ 
 isLoaded, 
 onScrollToProducts 
}) => {
 return (
 <div className={`relative h-[40vh] mb-16 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
 <div className="absolute inset-0">
 <img 
 src={zebraBlindHero} 
 alt="Smart zebra blinds showcase"
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"/>
 </div>
 <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
 <div className="max-w-3xl">
 <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
 Smart Zebra Blinds
 </h2>
 <p className="text-lg sm:text-xl text-gray-200 mb-8">
 Elegant dual-layer fabric blinds with alternating sheer and solid patterns for precise light control and privacy.
 </p>
 <a 
 href="#products"
 onClick={onScrollToProducts}
 className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition inline-block"
 >
 Explore Collection
 </a>
 </div>
 </div>
 </div>
 );
};

export default ZebraHeroSection; 