import React, { useState, useRef, useEffect } from 'react';

// Import CSS
import './Hero.css';

// Import sub-components
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import HeroCarouselIndicators from './HeroCarouselIndicators';
import HeroScrollIndicator from './HeroScrollIndicator';
import { HeroProps } from './types';

const Hero: React.FC<HeroProps> = ({ 
 images,
 autoChangeInterval = 5000,
 title ="Transform Your Windows Into Smart Windows",
 description ="Automate your home with smart blinds that adjust to your schedule, save energy, and create the perfect ambiance throughout the day.",
 buttonText ="Otkrijte pametna rješenja",
 buttonLink ="/how-it-works"
}) => {
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 const [headingVisible, setHeadingVisible] = useState(false);
 const heroRef = useRef<HTMLDivElement>(null);
 const headingRef = useRef<HTMLHeadingElement>(null);
 
 // Change image on interval
 useEffect(() => {
 if (images.length <= 1) return;
 
 const interval = setInterval(() => {
 setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
 }, autoChangeInterval);
 
 return () => clearInterval(interval);
 }, [autoChangeInterval, images.length]);
 
 // Monitor heading visibility for animations
 useEffect(() => {
 if (!headingRef.current) return;
 
 const observer = new IntersectionObserver(
 (entries) => {
 const [entry] = entries;
 if (entry.isIntersecting) {
 setTimeout(() => {
 setHeadingVisible(true);
 }, 400);
 observer.disconnect();
 }
 },
 { threshold: 0.5 }
 );
 
 observer.observe(headingRef.current);
 return () => observer.disconnect();
 }, []);

 // Clean up any leftover elements
 useEffect(() => {
 const checkForWhiteSquares = () => {
 const elementsToCheck = [
 document.getElementById('mobile-menu-panel'),
 document.getElementById('pure-black-overlay')
 ];
 
 elementsToCheck.forEach(element => {
 if (element && element.parentNode) {
 element.parentNode.removeChild(element);
 }
 });
 };
 
 const interval = setInterval(checkForWhiteSquares, 100);
 checkForWhiteSquares();
 
 return () => clearInterval(interval);
 }, []);

 return (
 <div 
 ref={heroRef}
 className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen overflow-hidden bg-gray-100"
 >
 <HeroBackground 
 images={images} 
 currentImageIndex={currentImageIndex} 
 />
 
 <HeroContent
 title={title}
 description={description}
 buttonText={buttonText}
 buttonLink={buttonLink}
 headingRef={headingRef}
 headingVisible={headingVisible}
 />
 
 <HeroCarouselIndicators 
 images={images}
 currentImageIndex={currentImageIndex}
 setCurrentImageIndex={setCurrentImageIndex}
 />
 
 <HeroScrollIndicator />
 </div>
 );
};

export default Hero; 