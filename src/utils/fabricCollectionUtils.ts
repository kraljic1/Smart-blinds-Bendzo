import { Product } from '../types/product';
import { allProducts } from '../data/collections';

/**
 * Identifies the collection and transparency type of a product
 * @param productId The ID of the selected product
 * @returns Object containing collection and transparencyType information
 */
export const identifyProductDetails = (productId: string): { 
  collection: string | null; 
  transparencyType: string | null;
} => {
  const product = allProducts.find(p => p.id === productId);
  
  if (!product) {
    return { collection: null, transparencyType: null };
  }
  
  // For Zebra blinds - they have empty features arrays but should all be treated as Light filtering
  if (product.collection && ['Pure', 'Balance', 'Accent'].includes(product.collection)) {
    return {
      collection: product.collection,
      transparencyType: 'Light filtering'
    };
  }
  
  // Get transparency type from features (usually "Light filtering" or "Blackout")
  const transparencyType = product.features.find(f => 
    f.toLowerCase().includes('light filtering') || 
    f.toLowerCase().includes('blackout') ||
    f.toLowerCase().includes('sheer')
  ) || null;
  
  return {
    collection: product.collection || null,
    transparencyType
  };
};

/**
 * Gets all products from the same collection and with the same transparency type
 * @param collection The collection name
 * @param transparencyType The transparency type (Light filtering, Blackout, etc.)
 * @returns Array of filtered products
 */
export const getRelatedProducts = (
  collection: string | null, 
  transparencyType: string | null
): Product[] => {
  if (!collection || !transparencyType) {
    return [];
  }
  
  // Special case for Zebra blind collections (Pure, Balance, Accent)
  if (['Pure', 'Balance', 'Accent'].includes(collection)) {
    return allProducts.filter(p => p.collection === collection);
  }
  
  return allProducts.filter(p => 
    p.collection === collection && 
    p.features.some(f => f === transparencyType)
  );
};

/**
 * Gets the last image from a product's images array (typically the one showing fabric details)
 * @param product The product object
 * @returns The URL of the last image or null if no images
 */
export const getProductFabricImage = (product: Product): string | null => {
  if (!product.images || product.images.length === 0) {
    return null;
  }
  
  // Return the last image (usually the fabric detail image)
  return product.images[product.images.length - 1];
}; 