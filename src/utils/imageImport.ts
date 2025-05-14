import { Product } from '../types/product';

// Helper function to dynamically import images
export const importZebraImage = (collection: string, colorName: string, index: number) => {
  return new URL(`../img/zebra/${collection}/${collection} - ${colorName}/${index}.webp`, import.meta.url).href;
};

/**
 * Creates a zebra product object with consistent structure
 * @param id Unique product identifier
 * @param name Product display name
 * @param price Current price
 * @param originalPrice Original price before discount
 * @param fabricColor Hex color code for fabric
 * @param collection Collection name (Pure, Balance, Accent)
 * @param colorName Color name as it appears in the folder structure
 */
export const createZebraProduct = (
  id: string,
  name: string,
  price: number,
  originalPrice: number,
  fabricColor: string,
  collection: string,
  colorName: string
): Product => {
  // Create image paths using import.meta.url for proper Vite asset handling
  const basePath = collection.toUpperCase();
  const folderName = `${basePath} - ${colorName}`;
  
  try {
    // Import main image using dynamic import
    const mainImage = new URL(`../img/zebra/${basePath}/${folderName}/0.webp`, import.meta.url).href;
    
    // Create array of image URLs
    const images = Array.from({ length: 5 }, (_, i) => {
      return new URL(`../img/zebra/${basePath}/${folderName}/${i}.webp`, import.meta.url).href;
    });
    
    return {
      id,
      name,
      price,
      originalPrice,
      image: mainImage,
      images,
      features: ["Light filtering", "Privacy"],
      colors: 1,
      fabricColor,
      collection
    };
  } catch (error) {
    console.error(`Error creating product ${name}:`, error);
    
    // Fallback with placeholders if image loading fails
    return {
      id,
      name,
      price,
      originalPrice,
      image: '',
      images: [],
      features: ["Light filtering", "Privacy"],
      colors: 1,
      fabricColor,
      collection
    };
  }
}; 