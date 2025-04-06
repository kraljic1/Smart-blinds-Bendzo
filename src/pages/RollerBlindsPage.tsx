import { useState, useEffect, useRef, useMemo } from 'react';
import ModernProductCard from '../components/ModernProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { CollapsibleFilterSidebar } from '../components/Filters';
// Import roller blinds data directly
import { rollerBlinds } from '../data/rollerblinds';
import { Product } from '../types/product';
import React from 'react';

// Import roller blinds image for hero section
import rollerBlindsHero from '../img/rollerblinds/CLASSIC/CLASSIC - BLACK/0.webp';

const RollerBlindsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(rollerBlinds);
  const [isLoaded, setIsLoaded] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  // Reset filters when component mounts
  useEffect(() => {
    setFilteredProducts(rollerBlinds);
    
    // Add animation class to show content after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Group products by name (to keep different variants of the same product together)
  const groupedProducts = useMemo(() => {
    // Create a map of products grouped by name
    const groupedMap = filteredProducts.reduce((groups, product) => {
      const name = product.name.toLowerCase(); // Convert to lowercase for case-insensitive grouping
      if (!groups[name]) {
        groups[name] = [];
      }
      groups[name].push(product);
      return groups;
    }, {} as Record<string, Product[]>);

    // Flatten the grouped products back into an array
    // This ensures products with the same name appear next to each other
    return Object.values(groupedMap).flat();
  }, [filteredProducts]);
  
  // Add intersection observer for scroll animations - optimized for mobile
  useEffect(() => {
    // Skip animations on mobile for better performance
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // On mobile, just mark everything as visible immediately without animations
      document.querySelectorAll('.reveal-staggered').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }
    
    // Only use IntersectionObserver on desktop
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { 
        threshold: 0.1,
        // Use rootMargin to start loading earlier
        rootMargin: '100px 0px' 
      }
    );
    
    // Observe all elements with reveal-staggered class
    document.querySelectorAll('.reveal-staggered').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.reveal-staggered').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, [filteredProducts]);
  
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Roller Blinds', path: '/products/roller-blinds' },
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
            src={rollerBlindsHero} 
            alt="Smart roller blinds showcase"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Smart Roller Blinds
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8">
              Enhance your windows with our premium smart roller blinds collection. Elegant, functional, and designed to fit seamlessly into your home.
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
      
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-8 slide-in-up ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <div className="relative">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full filter blur-3xl opacity-20 -z-10"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        </div>
        
        <h1 
          ref={headingRef}
          className={`text-5xl font-bold text-gray-900 dark:text-white mb-4 fade-in-scale ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          Smart Roller Blinds
        </h1>
        
        <p className={`text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl slide-in-up ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '50ms' }}>
          Discover our collection of premium smart roller blinds designed for modern homes. 
          Control your blinds with voice, app, or the smart hub.
        </p>

        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar with Filters */}
          <div className={`lg:col-span-1 fade-in-scale ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            <CollapsibleFilterSidebar
              categoryId="roller"
              products={rollerBlinds}
              onFilteredProductsChange={setFilteredProducts}
              className="modern-card bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 backdrop-blur-lg"
            />
          </div>

          {/* Products Grid */}
          <div id="products" className="lg:col-span-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 border-glow p-8 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">
                  No roller blinds match your selected filters. Please try different filter options.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {groupedProducts.map((product, index) => (
                    <ModernProductCard
                      key={product.id}
                      product={product}
                      onConfigure={() => window.location.href = `/products/configure/${product.id}`}
                      delay={index * 100}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RollerBlindsPage;