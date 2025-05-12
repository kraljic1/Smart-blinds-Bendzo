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
  // Create image paths
  const mainImage = `/src/img/zebra/${collection.toUpperCase()}/${collection.toUpperCase()} - ${colorName}/0.webp`;
  const images = Array.from({ length: 5 }, (_, i) => 
    `/src/img/zebra/${collection.toUpperCase()}/${collection.toUpperCase()} - ${colorName}/${i}.webp`
  );
  
  return {
    id,
    name,
    price,
    originalPrice,
    image: mainImage,
    images,
    features: [],
    colors: 1,
    fabricColor,
    collection
  };
}; 