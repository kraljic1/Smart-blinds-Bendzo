import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
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
    { label: 'Our Products', path: '/products' },
    { label: 'Curtain Tracks', path: '/products/curtain-blinds' }
  ];

  const products: Product[] = [
    {
      id: "glider-track",
      name: "Electric curtain tracks",
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
      fabricColor: "#888888"
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
    <div className="pt-24 pb-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Static Hero section */}
      <div className={`relative h-[40vh] mb-16 ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
        <div className="absolute inset-0">
          <img 
            src={curtainTrackImg} 
            alt="Smart curtain tracks showcase"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Smart Curtain Tracks
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8">
              Transform your curtains with our premium electric curtain track system. Elegant, quiet, and seamlessly integrated with your smart home.
            </p>
            <a 
              href="#products" 
              onClick={scrollToProducts}
              className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition inline-block"
            >
              Explore Collection
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-16">Smart Curtain Tracks</h1>

        <div id="products" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
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