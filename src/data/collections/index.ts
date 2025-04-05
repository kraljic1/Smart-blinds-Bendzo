import { essentialCollection } from './essentialCollection';
import { comfortCollection } from './comfortCollection';
import { comfortCollectionPart2 } from './comfortCollectionPart2';
import { classicCollection } from './classicCollection';
import { solarCollection } from './solarCollection';
import { screenCollection } from './screenCollection';
import { textureCollection } from './textureCollection';
import { zebraCollection } from './zebraCollection';
import { curtainCollection } from './curtainCollection';
import { accessoriesCollection } from './accessoriesCollection';
import { Product } from '../../types/product';

// Export all collections
export {
  essentialCollection,
  comfortCollection,
  comfortCollectionPart2,
  classicCollection,
  solarCollection,
  screenCollection,
  textureCollection,
  zebraCollection,
  curtainCollection,
  accessoriesCollection
};

// Roller Blinds - combined collections for roller blinds
export const rollerBlinds: Product[] = [
  ...essentialCollection,
  ...comfortCollection,
  ...comfortCollectionPart2,
  ...classicCollection,
  ...solarCollection,
  ...screenCollection,
  ...textureCollection
];

// Re-export individual collections with their original names for backwards compatibility
export const zebraBlinds = zebraCollection;
export const curtainBlinds = curtainCollection;
export const accessories = accessoriesCollection;

// All Products (for search functionality)
export const allProducts: Product[] = [
  ...rollerBlinds,
  ...zebraBlinds,
  ...curtainBlinds,
  ...accessories
]; 