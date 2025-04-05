import { useState, useEffect, useRef } from 'react';
import ModernProductCard from '../components/ModernProductCard';
import Breadcrumb from '../components/Breadcrumb';
import { CollapsibleFilterSidebar } from '../components/Filters';
import { zebraBlinds } from '../data/zebrablinds';
import { Product } from '../types/product';

const ZebraBlindsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(zebraBlinds);
  const [isLoaded, setIsLoaded] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  // Reset filters when component mounts
  useEffect(() => {
    setFilteredProducts(zebraBlinds);
    
    // Add animation class to show content after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Add intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
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
    { label: 'Zebra Blinds', path: '/products/zebra-blinds' }
  ];

  return (
    <div className="pt-24 pb-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-8 slide-in-up ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <div className="relative">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full filter blur-3xl opacity-20 -z-10"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-200 dark:bg-indigo-900 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        </div>
        
        <h1 
          ref={headingRef}
          className={`text-5xl font-bold text-gray-900 dark:text-white mb-4 fade-in-scale ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          Smart Zebra Blinds
        </h1>
        
        <p className={`text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl slide-in-up ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '50ms' }}>
          Discover our premium collection of zebra blinds with alternating opaque and sheer fabric strips.
          Control light and privacy with our smart zebra blinds.
        </p>

        <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Filters */}
          <div className={`lg:col-span-1 fade-in-scale ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            <CollapsibleFilterSidebar
              categoryId="zebra"
              products={zebraBlinds}
              onFilteredProductsChange={setFilteredProducts}
              className="modern-card bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 backdrop-blur-lg"
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 border-glow p-8 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">
                  No zebra blinds match your selected filters. Please try different filter options.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <ModernProductCard
                    key={product.id}
                    product={product}
                    onConfigure={() => window.location.href = `/products/configure/${product.id}`}
                    delay={index * 100}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZebraBlindsPage;