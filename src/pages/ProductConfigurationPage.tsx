import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Info, ArrowLeft, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Product } from '../types/product';
import SEO from '../components/SEO';
import InfoPanel from '../components/InfoPanel';
import ImageZoomModal from '../components/ImageZoomModal';
import { getProductsByCategory } from '../hooks/useProductFilter';
import ProductCustomization, { CustomizationOption } from '../components/ProductCustomization';
import PriceCalculator from '../components/PriceCalculator';
import { getCustomizationOptions } from '../data/customizationOptionsByProduct';
import { useBasketContext } from '../hooks/useBasketContext';
import '../styles/ProductConfiguration.css';

const ProductConfigurationPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addItem } = useBasketContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [allImages, setAllImages] = useState<string[]>([]);
  
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // New state variables for product customization
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [customizationOptions, setCustomizationOptions] = useState<CustomizationOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [additionalCosts, setAdditionalCosts] = useState<{ name: string; price: number }[]>([]);
  
  // Add state for image zoom modal
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);
  
  // Trigger animations after component mounts
  useEffect(() => {
    // Short delay before starting animations
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Set animation as finished after all staggered elements should be done
    const animTimer = setTimeout(() => {
      setAnimationFinished(true);
    }, 1800);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(animTimer);
    };
  }, []);

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
      
      // Auto-calculate for accessories - they don't need dimensions
      if (
        productId === 'matter-bridge-cm55' ||
        productId === 'remote-5-channel' ||
        productId === 'remote-15-channel' ||
        productId === 'wifi-bridge-cm20' ||
        productId === 'eve-smart-plug' ||
        productId === 'usb-c-cable'
      ) {
        setIsCalculated(true);
      }
      
      // For products with the new numbered image system (0.webp, 1.webp, etc.)
      // Create a properly ordered array of images
      if (foundProduct.images && foundProduct.images.length > 0) {
        // Check if we're using the numbered image system (if any image has a number pattern)
        const hasNumberedImages = foundProduct.images.some(img => 
          img.includes("/0.webp") || img.includes("/1.webp") || img.includes("/2.webp") || 
          img.includes("/3.webp") || img.includes("/4.webp")
        );
        
        if (hasNumberedImages) {
          // Create ordered array of numbered images
          const orderedImages: string[] = [];
          
          // Find the cover image (0.webp)
          const coverImage = foundProduct.images.find(img => img.includes("/0.webp"));
          if (coverImage) {
            orderedImages.push(coverImage);
          } else {
            // Fallback to main image if 0.webp not found
            orderedImages.push(foundProduct.image);
          }
          
          // Add remaining images in numerical order
          for (let i = 1; i <= 4; i++) {
            const img = foundProduct.images.find(img => img.includes(`/${i}.webp`));
            if (img) {
              orderedImages.push(img);
            }
          }
          
          setAllImages(orderedImages);
        } else {
          // For legacy image naming conventions
          const images: string[] = [];
          
          // Add main image
          images.push(foundProduct.image);
          
          // Add additional images, skipping any that match the main image
          foundProduct.images.forEach(img => {
            if (img !== foundProduct.image) {
              images.push(img);
            }
          });
          
          setAllImages(images);
        }
      } else {
        // Just use the main image if no additional images
        setAllImages([foundProduct.image]);
      }
      
      setSelectedImageIndex(0);
    }
    
    setIsLoading(false);
  }, [productId]);

  // Set default selected options
  useEffect(() => {
    if (product) {
      const productOptions = getCustomizationOptions(product.id);
      if (productOptions.length > 0) {
        const defaultSelections: Record<string, string> = {};
        productOptions.forEach(option => {
          if (option.options.length > 0) {
            defaultSelections[option.id] = option.options[0].id;
          }
        });
        setSelectedOptions(defaultSelections);
        setCustomizationOptions(productOptions);
      }
    }
  }, [product]);

  // Update additional costs when selected options change
  useEffect(() => {
    if (isCalculated && Object.keys(selectedOptions).length > 0) {
      const costs: { name: string; price: number }[] = [];
      
      customizationOptions.forEach(option => {
        const selectedOptionId = selectedOptions[option.id];
        if (selectedOptionId) {
          const selectedValue = option.options.find(o => o.id === selectedOptionId);
          if (selectedValue && selectedValue.price && selectedValue.price > 0) {
            costs.push({
              name: `${option.name}: ${selectedValue.name}`,
              price: selectedValue.price
            });
          }
        }
      });
      
      setAdditionalCosts(costs);
    }
  }, [selectedOptions, isCalculated, customizationOptions]);

  // Add handler for zoom button click
  const handleZoomButtonClick = () => {
    setIsZoomModalOpen(true);
  };

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

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWidth(value === '' ? '' : Number(value));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHeight(value === '' ? '' : Number(value));
  };

  const handleCalculatePrice = () => {
    if (typeof width === 'number' && typeof height === 'number' && width > 0 && height > 0) {
      setIsCalculated(true);
    } else {
      alert('Please enter valid width and height values');
    }
  };

  const handleOptionChange = (optionId: string, valueId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: valueId
    }));
  };

  const handleCheckout = (quantity: number = 1) => {
    if (product) {
      // Prepare options to save with the product
      const options: Record<string, string | number | boolean> = {
        ...selectedOptions
      };
      
      // Add width and height for non-accessory products
      if (!isAccessoryProduct) {
        if (typeof width === 'number' && typeof height === 'number') {
          options.width = width;
          options.height = height;
        } else {
          // For non-accessory products, width and height are required
          alert('Please ensure width and height are valid before adding to basket');
          return;
        }
      }
      
      // Add item to the basket
      addItem(product, quantity, options);
      
      // Show a confirmation toast
      alert(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} ${quantity > 1 ? 'have' : 'has'} been added to your basket!`);
    }
  };

  const isAccessoryProduct = 
    productId === 'matter-bridge-cm55' ||
    productId === 'remote-5-channel' ||
    productId === 'remote-15-channel' ||
    productId === 'wifi-bridge-cm20' ||
    productId === 'eve-smart-plug' ||
    productId === 'usb-c-cable';

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
    <div className="pt-20 pb-24 sm:pt-24 sm:pb-32 bg-white dark:bg-[#0c1222]" ref={containerRef}>
      {product && (
        <SEO
          title={`${product.name} - Configure Your Smart Blind | Smartblinds Croatia`}
          description={`Customize your ${product.name} with our easy-to-use configurator. Choose dimensions, colors, and features to create the perfect smart blind for your home.`}
          keywords={`smart blinds, ${product.name.toLowerCase()}, window automation, smart home, blinds configurator`}
          ogType="product"
          ogImage={product.image}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={handleGoBack}
          className={`flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-6 sm:mb-8 ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Products
        </button>

        <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden modern-card ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6">
            <div className={`space-y-4 ${isVisible ? 'fade-in-scale' : 'opacity-0'}`} style={{ animationDelay: '75ms' }}>
              {/* Main product image with navigation arrows */}
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 mx-auto depth-effect">
                {allImages.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      className={`absolute left-0 sm:left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-r-full sm:rounded-full p-2 sm:p-3 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}
                      style={{ animationDelay: '150ms' }}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button 
                      onClick={handleNextImage}
                      className={`absolute right-0 sm:right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-l-full sm:rounded-full p-2 sm:p-3 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}
                      style={{ animationDelay: '175ms' }}
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
                          } ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}
                          style={{ animationDelay: `${200 + index * 25}ms` }}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
                
                {/* Zoom button */}
                <button 
                  onClick={handleZoomButtonClick}
                  className={`absolute right-2 bottom-2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition hidden sm:block ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}
                  style={{ animationDelay: '200ms' }}
                  aria-label="Zoom image"
                >
                  <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
                
                <img 
                  src={allImages[selectedImageIndex]}
                  alt={product.name}
                  className={`w-full h-full object-cover depth-effect-inner ${isVisible ? 'fade-in-scale' : 'opacity-0'}`}
                  style={{ animationDelay: '100ms' }}
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
                      } ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`}
                      style={{ animationDelay: `${225 + index * 50}ms` }}
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

            <div className={`space-y-4 sm:space-y-6 ${isVisible ? 'slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '125ms' }}>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2">
                  <span className="text-gray-600 dark:text-gray-300">{product.features && product.features.length > 0 ? product.features[0] : ''}</span>
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

              <p className={`text-gray-600 dark:text-gray-300 text-sm sm:text-base ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '250ms' }}>
                {product.description || 
                  `Create a pleasant atmosphere in your home with our electric Essential roller blinds! Both the
                  light filtering and blackout Essential collection consist of sturdy roller blind fabrics with a
                  textile look and feel and are available in 9 different colours, making the Essential collection
                  suitable for any interior.`}
              </p>

              <div className={`bg-gray-100 dark:bg-gray-700 p-4 sm:p-6 rounded-lg modern-card ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '300ms' }}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">CUSTOMIZE AND ORDER</h3>
                  <div className="text-right">
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">From Price</div>
                    <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">${product.price}</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">${product.originalPrice}</div>
                  </div>
                </div>

                {/* Dimensions Inputs (hide for accessories) */}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {!isAccessoryProduct && !isCalculated && (
                    <>
                      <div className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '350ms' }}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Width
                        </label>
                        <input
                          type="text"
                          placeholder="30 - 350 cm"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white product-configuration-input"
                          value={width}
                          onChange={handleWidthChange}
                        />
                      </div>
                      <div className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '400ms' }}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Height
                        </label>
                        <input
                          type="text"
                          placeholder="30 - 350 cm"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white product-configuration-input"
                          value={height}
                          onChange={handleHeightChange}
                        />
                      </div>
                    </>
                  )}
                </div>

                {!isCalculated && !isAccessoryProduct ? (
                  <button 
                    className={`w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition shimmer-button ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`}
                    style={{ animationDelay: '450ms' }}
                    onClick={handleCalculatePrice}
                  >
                    CALCULATE PRICE
                  </button>
                ) : (
                  <>
                    <ProductCustomization 
                      product={product}
                      options={customizationOptions}
                      selectedOptions={selectedOptions}
                      onOptionChange={handleOptionChange}
                      width={typeof width === 'number' ? width : undefined}
                      height={typeof height === 'number' ? height : undefined}
                    />
                    <PriceCalculator 
                      basePrice={product.price}
                      width={isAccessoryProduct ? 0 : (typeof width === 'number' ? width : 0)}
                      height={isAccessoryProduct ? 0 : (typeof height === 'number' ? height : 0)}
                      additionalCosts={additionalCosts}
                      onCheckout={handleCheckout}
                      isAccessory={isAccessoryProduct}
                    />
                  </>
                )}
              </div>
              
              {/* Additional product information */}
              <div className={`bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden modern-card ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '500ms' }}>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Product Features</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '550ms' }}>Smart home integration</li>
                      <li className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '575ms' }}>Remote control operation</li>
                      <li className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '600ms' }}>Silent motor technology</li>
                      <li className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '625ms' }}>Energy efficient design</li>
                      <li className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '650ms' }}>UV protection fabric</li>
                    </ul>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Specifications</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500 dark:text-gray-400">Material</div>
                      <div className={`text-gray-900 dark:text-white ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '675ms' }}>Premium Polyester</div>
                      
                      <div className="text-gray-500 dark:text-gray-400">Control</div>
                      <div className={`text-gray-900 dark:text-white ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '700ms' }}>App / Remote / Voice</div>
                      
                      <div className="text-gray-500 dark:text-gray-400">Power Source</div>
                      <div className={`text-gray-900 dark:text-white ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '725ms' }}>Electric (AC)</div>
                      
                      <div className="text-gray-500 dark:text-gray-400">Warranty</div>
                      <div className={`text-gray-900 dark:text-white ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} style={{ animationDelay: '750ms' }}>5 Years</div>
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

      {/* Image Zoom Modal */}
      {isZoomModalOpen && product && (
        <ImageZoomModal
          imageUrl={allImages[selectedImageIndex]}
          altText={product.name}
          onClose={() => setIsZoomModalOpen(false)}
          allImages={allImages}
          currentIndex={selectedImageIndex}
          onPrevImage={handlePrevImage}
          onNextImage={handleNextImage}
        />
      )}
    </div>
  );
};

export default ProductConfigurationPage;