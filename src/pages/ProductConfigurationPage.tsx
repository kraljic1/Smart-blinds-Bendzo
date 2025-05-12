import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import SEO from '../components/SEO';
import { getProductsByCategory } from '../hooks/useProductFilter';
import { CustomizationOption } from '../components/ProductCustomization';
import { getCustomizationOptions } from '../data/customizationOptionsByProduct';
import { useBasketContext } from '../hooks/useBasketContext';
import ProductConfigurationWrapper from '../components/ProductConfiguration/ProductConfigurationWrapper';

// Global type definitions
type ProductMissingImagesResult = Record<string, { name: string; count: number; id: string }[]>;

const ProductConfigurationPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addItem } = useBasketContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allImages, setAllImages] = useState<string[]>([]);
  const [customizationOptions, setCustomizationOptions] = useState<CustomizationOption[]>([]);

  // Helper for browser console - logs products with fewer than 5 images
  useEffect(() => {
    // Make the checkMissingProductImages function available in the console
    if (typeof window !== 'undefined') {
      // Use more specific type for window augmentation
      const win = window as unknown as {
        checkMissingProductImages?: typeof checkMissingProductImages;
        generateMissingImagesTemplate?: typeof generateMissingImagesTemplate;
      };
      
      win.checkMissingProductImages = checkMissingProductImages;
      win.generateMissingImagesTemplate = generateMissingImagesTemplate;
    }
    
    return () => {
      // Clean up by removing the functions from window
      if (typeof window !== 'undefined') {
        const win = window as unknown as {
          checkMissingProductImages?: typeof checkMissingProductImages;
          generateMissingImagesTemplate?: typeof generateMissingImagesTemplate;
        };
        
        if (win.checkMissingProductImages) {
          win.checkMissingProductImages = undefined;
        }
        if (win.generateMissingImagesTemplate) {
          win.generateMissingImagesTemplate = undefined;
        }
      }
    };
  }, []);

  // Check for products with missing images - exported to global for devs
  const checkMissingProductImages = () => {
    const categories = ['roller', 'zebra', 'curtain'];
    const productsByCategory: Record<string, Product[]> = {};
    
    // Get all products by category
    categories.forEach(category => {
      productsByCategory[category] = getProductsByCategory(category);
    });
    
    // Check each product for missing images
    const productsWithMissingImages: ProductMissingImagesResult = {
      roller: [],
      zebra: [],
      curtain: []
    };
    
    categories.forEach(category => {
      productsByCategory[category].forEach(product => {
        // Count the images for the product
        let imageCount = 0;
        
        // Check if we're using the numbered image system
        if (product.images && product.images.length > 0) {
          const hasNumberedImages = product.images.some(img => 
            img.includes("/0.webp") || img.includes("/1.webp") || img.includes("/2.webp") || 
            img.includes("/3.webp") || img.includes("/4.webp")
          );
          
          if (hasNumberedImages) {
            // Count numbered images (0.webp through 4.webp)
            for (let i = 0; i <= 4; i++) {
              const hasImage = product.images.some(img => img.includes(`/${i}.webp`));
              if (hasImage) {
                imageCount++;
              }
            }
          } else {
            // For legacy image naming, count all available images
            imageCount = 1; // Main image
            product.images.forEach(img => {
              if (img !== product.image) {
                imageCount++;
              }
            });
          }
        } else {
          // Just the main image
          imageCount = 1;
        }
        
        // Log if fewer than 5 images
        if (imageCount < 5) {
          productsWithMissingImages[category].push({
            name: product.name,
            count: imageCount,
            id: product.id
          });
        }
      });
    });
    
    // Output results to console
    console.log('======= PRODUCTS WITH FEWER THAN 5 IMAGES =======');
    categories.forEach(category => {
      console.log(`\n${category.toUpperCase()} CATEGORY:`);
      
      if (productsWithMissingImages[category].length === 0) {
        console.log(`✅ All ${category} products have 5 images`);
      } else {
        console.log(`❌ Found ${productsWithMissingImages[category].length} products with fewer than 5 images:`);
        
        productsWithMissingImages[category].forEach(product => {
          console.log(`  - ${product.name} (${product.id}): ${product.count} image${product.count !== 1 ? 's' : ''}`);
        });
      }
    });
    
    console.log('\n=================================================');
    
    return productsWithMissingImages;
  };

  // Generate template for missing images
  const generateMissingImagesTemplate = (productId: string) => {
    const allProducts = [
      ...getProductsByCategory('roller'),
      ...getProductsByCategory('zebra'),
      ...getProductsByCategory('curtain'),
      ...getProductsByCategory('accessories')
    ];
    
    const product = allProducts.find(p => p.id === productId);
    
    if (!product) {
      console.error(`Product with ID ${productId} not found`);
      return;
    }
    
    // Check which numbered images are missing
    const missingImages = [];
    for (let i = 0; i <= 4; i++) {
      const hasImage = product.images?.some(img => img.includes(`/${i}.webp`));
      if (!hasImage) {
        missingImages.push(i);
      }
    }
    
    console.log(`===== MISSING IMAGES FOR ${product.name} (${productId}) =====`);
    if (missingImages.length === 0) {
      console.log('✅ All images are present');
    } else {
      console.log(`❌ Missing images: ${missingImages.map(num => `${num}.webp`).join(', ')}`);
      console.log('\nTo add missing images, use this template:');
      
      let categoryFolder = '';
      // Get category from product ID prefix
      if (productId.startsWith('roller-')) {
        categoryFolder = 'rollerblinds';
      } else if (productId.startsWith('zebra-')) {
        categoryFolder = 'zebra';
      } else if (productId.startsWith('curtain-')) {
        categoryFolder = 'CURTAIN TRACKS';
      }
      
      missingImages.forEach(imageNum => {
        console.log(`- Image ${imageNum}.webp should be placed in: /img/${categoryFolder}/<product-subfolder>/${imageNum}.webp`);
      });
    }
    console.log('=============================================');
  };

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // Fetch product data based on productId
  useEffect(() => {
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
      updateProductImages(foundProduct);
    }
    
    setIsLoading(false);
  }, [productId]);

  // Function to update product images
  const updateProductImages = (foundProduct: Product) => {
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
  };

  // Set default customization options
  useEffect(() => {
    if (product) {
      const productOptions = getCustomizationOptions(product.id);
      setCustomizationOptions(productOptions);
    }
  }, [product]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCheckout = (quantity: number = 1, options: Record<string, string | number | boolean> = {}) => {
    if (product) {
      // Add item to basket with selected options
      addItem(product, quantity, options);
      
      // Show a confirmation toast
      alert(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} ${quantity > 1 ? 'have' : 'has'} been added to your basket!`);
    }
  };

  // Handle product change from color selection
  const handleProductChange = (newProduct: Product) => {
    setProduct(newProduct);
    updateProductImages(newProduct);
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
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24 sm:pt-24 sm:pb-32">
      {product && (
        <SEO
          title={`${product.name} - Configure Your Smart Blind | Smartblinds Croatia`}
          description={`Customize and order your ${product.name}. Choose colors, dimensions, and features. Free shipping on all orders.`}
          ogImage={product.image}
          ogType="product"
          keywords={`smart blinds, ${product.name.toLowerCase()}, window automation, smart home`}
        />
      )}
      
      <ProductConfigurationWrapper
        product={product}
        isAccessoryProduct={isAccessoryProduct}
        customizationOptions={customizationOptions}
        allImages={allImages}
        onGoBack={handleGoBack}
        onCheckout={handleCheckout}
        onProductChange={handleProductChange}
      />
    </div>
  );
};

export default ProductConfigurationPage;