import { getProductsByCategory } from '../hooks/useProductFilter';
import { Product } from '../types/product';

/**
 * Utility function to check which products have fewer than 5 images
 * Can be called from browser console with: window.checkMissingProductImages()
 */
export const checkMissingProductImages = (): void => {
  const categories = ['roller', 'zebra', 'curtain'];
  const productsByCategory: Record<string, Product[]> = {};
  
  // Get all products by category
  categories.forEach(category => {
    productsByCategory[category] = getProductsByCategory(category);
  });
  
  // Check each product for missing images
  const productsWithMissingImages: Record<string, { name: string; count: number; id: string }[]> = {
    roller: [],
    zebra: [],
    curtain: []
  };
  
  // Create a report object for the final summary
  const report = {
    totalProducts: 0,
    totalWithMissingImages: 0,
    percentageMissing: 0,
    categories: {} as Record<string, {
      total: number;
      missing: number;
      percentage: number;
    }>
  };
  
  categories.forEach(category => {
    const products = productsByCategory[category];
    report.totalProducts += products.length;
    report.categories[category] = {
      total: products.length,
      missing: 0,
      percentage: 0
    };
    
    products.forEach(product => {
      // Count the images for the product
      let imageCount = 0;
      
      // Check if we're using the numbered image system
      if (product.images && product.images.length > 0) {
        const hasNumberedImages = product.images.some((img: string) => 
          img.includes("/0.webp") || img.includes("/1.webp") || img.includes("/2.webp") || 
          img.includes("/3.webp") || img.includes("/4.webp")
        );
        
        if (hasNumberedImages) {
          // Count numbered images (0.webp through 4.webp)
          for (let i = 0; i <= 4; i++) {
            const hasImage = product.images.some((img: string) => img.includes(`/${i}.webp`));
            if (hasImage) {
              imageCount++;
            }
          }
        } else {
          // For legacy image naming, count all available images
          imageCount = 1; // Main image
          product.images.forEach((img: string) => {
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
        
        report.categories[category].missing++;
        report.totalWithMissingImages++;
      }
    });
    
    // Calculate percentages
    report.categories[category].percentage = Math.round((report.categories[category].missing / report.categories[category].total) * 100);
  });
  
  // Calculate overall percentage
  report.percentageMissing = Math.round((report.totalWithMissingImages / report.totalProducts) * 100);
  
  // Output results to console with formatting
  console.log('%c======= PRODUCTS WITH FEWER THAN 5 IMAGES =======', 'font-size: 16px; font-weight: bold; color: #0366d6;');
  
  console.log(`\n%cSUMMARY:`, 'font-weight: bold; color: #24292e;');
  console.log(`Total products checked: ${report.totalProducts}`);
  console.log(`Products missing images: ${report.totalWithMissingImages} (${report.percentageMissing}%)`);
  
  categories.forEach(category => {
    console.log(`\n%c${category.toUpperCase()} CATEGORY:`, 'font-weight: bold; color: #24292e;');
    console.log(`Total: ${report.categories[category].total} products`);
    
    if (productsWithMissingImages[category].length === 0) {
      console.log(`%c✅ All ${category} products have 5 images`, 'color: green;');
    } else {
      console.log(`%c❌ Found ${productsWithMissingImages[category].length} products with fewer than 5 images (${report.categories[category].percentage}%):`, 'color: red;');
      
      console.table(productsWithMissingImages[category]);
    }
  });
  
  console.log('\n%c=================================================', 'font-size: 16px; font-weight: bold; color: #0366d6;');
};

/**
 * Utility function to generate a template for fixing products with missing images
 * Can be called from browser console with: window.generateMissingImagesTemplate()
 */
export const generateMissingImagesTemplate = (): void => {
  const categories = ['roller', 'zebra', 'curtain'];
  const productsByCategory: Record<string, Product[]> = {};
  
  // Get all products by category
  categories.forEach(category => {
    productsByCategory[category] = getProductsByCategory(category);
  });
  
  // Template data to collect
  const templateData: Record<string, { id: string; name: string; basePath: string; missingIndices: number[] }[]> = {
    roller: [],
    zebra: [],
    curtain: []
  };
  
  categories.forEach(category => {
    productsByCategory[category].forEach(product => {
      // Check if we're using the numbered image system
      if (product.images && product.images.length > 0) {
        const hasNumberedImages = product.images.some((img: string) => 
          img.includes("/0.webp") || img.includes("/1.webp") || img.includes("/2.webp") || 
          img.includes("/3.webp") || img.includes("/4.webp")
        );
        
        if (hasNumberedImages) {
          // Find which numbered images are missing (0.webp through 4.webp)
          const missingIndices: number[] = [];
          let basePath = '';
          
          // Extract the base path from an existing image
          for (let i = 0; i <= 4; i++) {
            const existingImage = product.images.find((img: string) => img.includes(`/${i}.webp`));
            if (existingImage) {
              basePath = existingImage.replace(`/${i}.webp`, '');
              break;
            }
          }
          
          for (let i = 0; i <= 4; i++) {
            const hasImage = product.images.some((img: string) => img.includes(`/${i}.webp`));
            if (!hasImage) {
              missingIndices.push(i);
            }
          }
          
          if (missingIndices.length > 0 && basePath) {
            templateData[category].push({
              id: product.id,
              name: product.name,
              basePath,
              missingIndices
            });
          }
        }
      }
    });
  });
  
  // Output template data
  console.log('%c======= MISSING IMAGES TEMPLATE =======', 'font-size: 16px; font-weight: bold; color: #0366d6;');
  
  categories.forEach(category => {
    if (templateData[category].length > 0) {
      console.log(`\n%c${category.toUpperCase()} MISSING IMAGES:`, 'font-weight: bold; color: #24292e;');
      
      templateData[category].forEach(item => {
        console.log(`\n%c${item.name} (${item.id}):`, 'font-weight: bold;');
        console.log('Add the following images:');
        
        item.missingIndices.forEach(index => {
          console.log(`${item.basePath}/${index}.webp`);
        });
      });
    }
  });
  
  console.log('\n%c=================================================', 'font-size: 16px; font-weight: bold; color: #0366d6;');
};

// Make the functions available in the window object for easy console access
declare global {
  interface Window {
    checkMissingProductImages: () => void;
    generateMissingImagesTemplate: () => void;
  }
}

window.checkMissingProductImages = checkMissingProductImages;
window.generateMissingImagesTemplate = generateMissingImagesTemplate; 