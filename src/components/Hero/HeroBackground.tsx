import React, { useEffect, useRef } from 'react';
import { HeroBackgroundProps } from './types';

const HeroBackground: React.FC<HeroBackgroundProps> = ({ 
 images, 
 currentImageIndex 
}) => {
 const imageRefs = useRef<Map<number, HTMLDivElement>>(new Map());
 
 // Set background images via JavaScript and prevent white flash
 useEffect(() => {
 const loadImages = async () => {
 try {
 // Preload all images to prevent white flash
 const imagePromises = images.map(src => {
 return new Promise((resolve, reject) => {
 const img = new Image();
 img.src = src;
 img.onload = resolve;
 img.onerror = reject;
 });
 });
 
 // Wait for all images to load
 await Promise.all(imagePromises);
 
 // Apply background images
 images.forEach((img, index) => {
 const imageDiv = imageRefs.current.get(index);
 if (imageDiv) {
 // Force immediate rendering using important flag
 imageDiv.style.cssText = `
 background-image: url(${img}) !important;
 background-position: center !important;
 background-size: cover !important;
 position: absolute !important;
 top: 0 !important;
 width: 100% !important;
 height: 100% !important;
 transition: opacity 1000ms ease-in-out !important;
 opacity: ${currentImageIndex === index ? '1' : '0'} !important;
 `;
 }
 });
 } catch (error) {
 console.error('Error loading background images:', error);
 // Fallback - apply backgrounds anyway
 images.forEach((img, index) => {
 const imageDiv = imageRefs.current.get(index);
 if (imageDiv) {
 imageDiv.style.backgroundImage = `url(${img})`;
 }
 });
 }
 };
 
 loadImages();
 }, [images, currentImageIndex]);

 return (
 <>
 {/* Floating particles */}
 <div className="absolute inset-0 z-0 pointer-events-none">
 <div className="particle particle-1"></div>
 <div className="particle particle-2"></div>
 <div className="particle particle-3"></div>
 <div className="particle particle-4"></div>
 <div className="particle particle-5"></div>
 </div>

 {/* Carousel images */}
 {images.map((img, index) => (
 <div 
 key={index}
 ref={(el) => {
 if (el) imageRefs.current.set(index, el);
 }}
 className={`absolute top-0 w-full h-full bg-center bg-cover transition-opacity duration-1000 ease-in-out bg-gray-100 ${
 currentImageIndex === index ? 'opacity-100' : 'opacity-0'
 }`}
 data-bg-image={img}
 />
 ))}
 
 {/* Gradient overlay */}
 <div 
 className="absolute top-0 w-full h-full z-[1]"
 style={{
 background: 'linear-gradient(125deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 40%, rgba(59,130,246,0.4) 100%)'
 }}
 ></div>
 </>
 );
};

export default HeroBackground; 