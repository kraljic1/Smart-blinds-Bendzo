import { Product } from '../types/product';
import { getProductsByCategory } from '../hooks/useProductFilter';

type ProductMissingImagesResult = Record<string, { name: string; count: number; id: string }[]>;

// Check for products with missing images - exported to global for devs
export const checkMissingProductImages = () => {
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
export const generateMissingImagesTemplate = (productId: string) => {
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

// Export a function to register these in the global scope for development
export const registerProductDebugTools = () => {
  if (typeof window !== 'undefined') {
    // Use more specific type for window augmentation
    const win = window as unknown as {
      checkMissingProductImages?: typeof checkMissingProductImages;
      generateMissingImagesTemplate?: typeof generateMissingImagesTemplate;
    };
    
    win.checkMissingProductImages = checkMissingProductImages;
    win.generateMissingImagesTemplate = generateMissingImagesTemplate;
    
    return () => {
      // Clean up by removing the functions from window
      if (win.checkMissingProductImages) {
        win.checkMissingProductImages = undefined;
      }
      if (win.generateMissingImagesTemplate) {
        win.generateMissingImagesTemplate = undefined;
      }
    };
  }
  
  return () => {}; // No-op if not in browser
}; 