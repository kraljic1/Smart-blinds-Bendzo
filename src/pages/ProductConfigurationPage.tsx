import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Info, ArrowLeft, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Product } from '../types/product';
import InfoPanel from '../components/InfoPanel';
import { getProductsByCategory } from '../hooks/useProductFilter';

const ProductConfigurationPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [allImages, setAllImages] = useState<string[]>([]);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // Fetch product data based on productId
  useEffect(() => {
    // In a real app, you would fetch from an API
    // For now, we'll simulate by searching through all products
    setIsLoading(true);
    
    // Get all products from all categories
    const allProducts = [
      ...getProductsByCategory('roller'),
      ...getProductsByCategory('zebra'),
      ...getProductsByCategory('curtain'),
      ...getProductsByCategory('accessories')
    ];
    
    const foundProduct = allProducts.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      // Create array with main image first, followed by additional images
      const images = [foundProduct.image];
      if (foundProduct.images && foundProduct.images.length > 0) {
        images.push(...foundProduct.images);
      }
      setAllImages(images);
      setSelectedImageIndex(0);
    }
    
    setIsLoading(false);
  }, [productId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInfoButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInfoPanelOpen(true);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => 
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => 
      (prevIndex + 1) % allImages.length
    );
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  if (isLoading) {
    return (
      <div className="pt-20 pb-24 sm:pt-24 sm:pb-32 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20 pb-24 sm:pt-24 sm:pb-32 flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={handleGoBack}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          <ArrowLeft className="mr-2" size={16} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24 sm:pt-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={handleGoBack}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-6 sm:mb-8"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Products
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6">
            <div className="space-y-4">
              {/* Main product image with navigation arrows */}
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 mx-auto">
                {allImages.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      className="absolute left-0 sm:left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-r-full sm:rounded-full p-2 sm:p-3 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button 
                      onClick={handleNextImage}
                      className="absolute right-0 sm:right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-l-full sm:rounded-full p-2 sm:p-3 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    
                    {/* Image indicators (dots) for mobile */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-10 sm:hidden">
                      {allImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handleThumbnailClick(index)}
                          className={`w-2 h-2 rounded-full ${
                            selectedImageIndex === index 
                              ? 'bg-blue-600 dark:bg-blue-400' 
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
                
                {/* Zoom button */}
                <button 
                  className="absolute right-2 bottom-2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition hidden sm:block"
                  aria-label="Zoom image"
                >
                  <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
                
                <img 
                  src={allImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail gallery - hidden on very small screens */}
              {allImages.length > 1 && (
                <div className="hidden sm:flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                  {allImages.map((image, index) => (
                    <button 
                      key={index} 
                      onClick={() => handleThumbnailClick(index)}
                      className={`flex-shrink-0 w-20 sm:w-24 h-20 sm:h-24 border-2 rounded-md overflow-hidden ${
                        selectedImageIndex === index 
                          ? 'border-blue-600 dark:border-blue-400' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <img 
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2">
                  <span className="text-gray-600 dark:text-gray-300">Light filtering</span>
                  <span className="text-gray-600 dark:text-gray-300 hidden sm:inline">-</span>
                  <span className="text-gray-600 dark:text-gray-300">With smart engine</span>
                  <button 
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    onClick={handleInfoButtonClick}
                  >
                    <Info size={16} />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                {product.description || 
                  `Create a pleasant atmosphere in your home with our electric Essential roller blinds! Both the
                  light filtering and blackout Essential collection consist of sturdy roller blind fabrics with a
                  textile look and feel and are available in 9 different colours, making the Essential collection
                  suitable for any interior.`}
              </p>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">CUSTOMIZE AND ORDER</h3>
                  <div className="text-right">
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">From Price</div>
                    <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">${product.price}</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">${product.originalPrice}</div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Width (in cm)
                      <Info size={16} className="ml-1 text-gray-400 dark:text-gray-500" />
                    </label>
                    <input
                      type="text"
                      placeholder="66 - 250 cm"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Height (in cm)
                      <Info size={16} className="ml-1 text-gray-400 dark:text-gray-500" />
                    </label>
                    <input
                      type="text"
                      placeholder="30 - 350 cm"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition">
                  CALCULATE PRICE
                </button>
              </div>
              
              {/* Additional product information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Product Features</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>Smart home integration</li>
                      <li>Remote control operation</li>
                      <li>Silent motor technology</li>
                      <li>Energy efficient design</li>
                      <li>UV protection fabric</li>
                    </ul>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Specifications</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500 dark:text-gray-400">Material</div>
                      <div className="text-gray-900 dark:text-white">Premium Polyester</div>
                      
                      <div className="text-gray-500 dark:text-gray-400">Control</div>
                      <div className="text-gray-900 dark:text-white">App / Remote / Voice</div>
                      
                      <div className="text-gray-500 dark:text-gray-400">Power Source</div>
                      <div className="text-gray-900 dark:text-white">Electric (AC)</div>
                      
                      <div className="text-gray-500 dark:text-gray-400">Warranty</div>
                      <div className="text-gray-900 dark:text-white">5 Years</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InfoPanel 
        isOpen={isInfoPanelOpen} 
        onClose={() => setIsInfoPanelOpen(false)} 
      />
    </div>
  );
};

export default ProductConfigurationPage; 