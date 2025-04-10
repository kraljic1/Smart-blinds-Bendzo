import ModernProductCard from '../components/ModernProductCard';
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
    <div className="modern-page-container">
      {/* Static Hero section */}
      <div className={`relative h-[50vh] mb-16 ${isLoaded ? 'fade-in-scale' : 'opacity-0'}`}>
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <img 
            src={curtainTrackImg} 
            alt="Smart curtain tracks showcase"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-sm" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6 animate-text-reveal">
              Smart Curtain Tracks
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Transform your curtains with our premium electric curtain track system. Elegant, quiet, and seamlessly integrated with your smart home.
            </p>
            <a 
              href="#products" 
              onClick={scrollToProducts}
              className="light-button px-8 py-3 rounded-full font-medium text-center inline-block w-auto"
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
        
        <h1 className="modern-page-title">Smart Curtain Tracks</h1>
        <p className="modern-page-subtitle">Premium electric curtain tracks with modern design and smart home integration</p>

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