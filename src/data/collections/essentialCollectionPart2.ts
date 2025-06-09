// Essential Collection Part 2 - Refactored for modularity
// This file maintains backward compatibility while using the new modular structure

export { essentialCollectionPart2 } from './essential/index';

// Re-export individual product groups for flexibility
export { 
  greyProducts, 
  offWhiteProducts, 
  coloredProducts 
} from './essential/index';

// Re-export image collections for advanced usage
export { 
  greyImages, 
  offWhiteImages, 
  coloredImages 
} from './essential/index'; 