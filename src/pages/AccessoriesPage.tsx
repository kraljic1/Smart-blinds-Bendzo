import { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { accessories } from '../data/accessories';
import '../styles/AccessoriesPage.css';

const AccessoriesPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Add animation class to show content after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Accessories', path: '/products/accessories' }
  ];

  const handleAddToCart = (productId: string) => {
    console.log(`Adding product ${productId} to cart`);
    // Implement actual cart functionality here
  };

  return (
    <div className="pt-24 pb-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`mb-8 slide-in-up ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <div className="relative">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full filter blur-3xl opacity-20 -z-10"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-200 dark:bg-indigo-900 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        </div>
        
        <h1 
          className={`text-5xl font-bold text-gray-900 dark:text-white mb-4 fade-in-scale ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          Smart Accessories
        </h1>
        
        <p className={`text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl slide-in-up ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '50ms' }}>
          Enhance your smart blinds experience with our premium accessories. From remote controls to bridges and cables.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accessories.map((product, index) => (
            <div 
              key={product.id}
              className={`accessory-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 fade-in-scale ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="product-image-container h-48 flex items-center justify-center mb-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h3>
              
              <div className="flex items-center justify-between mt-4">
                <div className="price-display text-xl font-bold">
                  {product.price.toFixed(2)}
                </div>
                
                <button 
                  className="add-to-cart-btn bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition duration-300"
                  onClick={() => handleAddToCart(product.id)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessoriesPage;