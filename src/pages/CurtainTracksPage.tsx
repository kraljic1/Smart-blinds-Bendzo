import ModernProductCard from '../components/Product/ModernProductCard';
import Breadcrumb from '../components/Navigation/Breadcrumb';
import { Product } from '../types/product';
import { useState, useEffect } from 'react';
import React from 'react';

// Import images using URL constructor for proper path resolution
const curtainTrackImg = new URL('../img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/curtain_track.webp', import.meta.url).href;
const detailshotImg = new URL('../img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/medium_web-sb_gordijnrails_detailshot.webp', import.meta.url).href;
const kleurenImg = new URL('../img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/gordijnrail_kleuren.webp', import.meta.url).href;
const renderImg = new URL('../img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/gordijnrail_render.webp', import.meta.url).href;
const afmetingenImg = new URL('../img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/smartblinds_elektrische_gordijnrail_afmetingen.webp', import.meta.url).href;
const afmetingen2Img = new URL('../img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/smartblinds_elektrische_gordijnrail_afmetingen_2.webp', import.meta.url).href;

const CurtainTracksPage = () => {
 const [isLoaded, setIsLoaded] = useState(false);
 
 // Add animation class to show content after a short delay
 useEffect(() => {
 const timer = setTimeout(() => {
 setIsLoaded(true);
 }, 100);
 
 return () => clearTimeout(timer);
 }, []);
 
 const breadcrumbItems = [
 { label: 'Home', path: '/' },
 { label: 'Products', path: '/products' },
 { label: 'Curtain Tracks', path: '/products/curtain-blinds' }
 ];

 const products: Product[] = [
 {
 id:"glider-track",
 name:"Electric curtain tracks",
 price: 349.99,
 originalPrice: 389.99,
 image: curtainTrackImg,
 images: [
 curtainTrackImg,
 detailshotImg,
 kleurenImg,
 renderImg,
 afmetingenImg,
 afmetingen2Img
 ],
 features: ["Light filtering"],
 colors: 2,
 fabricColor:"#888888"
 }
 ];

 const scrollToProducts = (e: React.MouseEvent) => {
 e.preventDefault();
 const productsElement = document.getElementById('products');
 if (productsElement) {
 productsElement.scrollIntoView({
 behavior: 'smooth',
 block: 'start'
 });
 }
 };

 return (
 <div className="pt-24 pb-32 bg-white">
 {/* Hero Section */}
 <div className={`relative h-[40vh] mb-16 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
 <div className="absolute inset-0">
 <img 
 src={curtainTrackImg} 
 alt="Smart curtain tracks showcase"
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-black/40"/>
 </div>
 <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
 <div className="max-w-3xl">
 <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
 Smart Curtain Tracks
 </h2>
 <p className="text-lg sm:text-xl text-blue-50 mb-8">
 Transform your curtains with our premium electric curtain track system. Elegant, quiet, and seamlessly integrated with your smart home.
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
 
 <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
 {/* Page Header with Breadcrumb and Title */}
 <div className={`mb-8 slide-in-up ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
 <Breadcrumb items={breadcrumbItems} />
 </div>
 
 <div className="relative">
 <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
 <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
 </div>
 
 <h1 className={`text-5xl font-bold text-gray-900 mb-4 fade-in-scale ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
 Smart Curtain Tracks
 </h1>
 
 <p className={`text-lg text-gray-600 mb-8 max-w-2xl slide-in-up delay-50 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
 Premium electric curtain tracks with modern design and smart home integration. Control your curtains with precision and style.
 </p>

 <div id="products" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
 {products.map((product) => (
 <ModernProductCard
 key={product.id}
 product={product}
 />
 ))}
 </div>
 </div>
 </div>
 );
};

export default CurtainTracksPage;