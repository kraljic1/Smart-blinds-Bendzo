// Essential Collection - Part 2 (Modular Export)
import { greyProducts } from './products/greyProducts';
import { offWhiteProducts } from './products/offWhiteProducts';
import { coloredProducts } from './products/coloredProducts';

// Combine all Essential Collection Part 2 products
export const essentialCollectionPart2 = [
 ...greyProducts,
 ...offWhiteProducts,
 ...coloredProducts
];

// Export individual product groups for flexibility
export { greyProducts, offWhiteProducts, coloredProducts };

// Export image collections for reuse
export { greyImages } from './images/greyImages';
export { offWhiteImages } from './images/offWhiteImages';
export { coloredImages } from './images/coloredImages'; 