import { Product } from '../../types/product';

/**
 * Generates an ordered array of images for a product
 */
export const getOrderedProductImages = (product: Product): string[] => {
  if (!product.images || product.images.length === 0) {
    return [product.image];
  }

  const hasNumberedImages = product.images.some(img => 
    img.includes("/0.webp") || img.includes("/1.webp") || img.includes("/2.webp") || 
    img.includes("/3.webp") || img.includes("/4.webp")
  );
  
  if (hasNumberedImages) {
    // Create ordered array of numbered images
    const orderedImages: string[] = [];
    
    // Find the cover image (0.webp)
    const coverImage = product.images.find(img => img.includes("/0.webp"));
    if (coverImage) {
      orderedImages.push(coverImage);
    } else {
      // Fallback to main image if 0.webp not found
      orderedImages.push(product.image);
    }
    
    // Add remaining images in numerical order
    for (let i = 1; i <= 4; i++) {
      const img = product.images.find(img => img.includes(`/${i}.webp`));
      if (img) {
        orderedImages.push(img);
      }
    }
    
    return orderedImages;
  } else {
    // For legacy image naming conventions
    const images: string[] = [];
    
    // Add main image
    images.push(product.image);
    
    // Add additional images, skipping any that match the main image
    product.images.forEach(img => {
      if (img !== product.image) {
        images.push(img);
      }
    });
    
    return images;
  }
}; 