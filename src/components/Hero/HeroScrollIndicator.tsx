import React from 'react';
import { HeroScrollIndicatorProps } from './types';

const HeroScrollIndicator: React.FC<HeroScrollIndicatorProps> = () => {
 return (
 <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden md:block">
 <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2">
 <div className="w-1 h-2 bg-white/70 rounded-full animate-scroll-down"></div>
 </div>
 </div>
 );
};

export default HeroScrollIndicator; 