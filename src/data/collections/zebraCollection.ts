import { Product } from '../../types/product';
import { pureCollection } from './zebra/pureCollection';
import { balanceCollection } from './zebra/balanceCollection';
import { accentCollection } from './zebra/accentCollection';

/**
 * Combined collection of all zebra blind products
 */
export const zebraCollection: Product[] = [
  ...pureCollection,
  ...balanceCollection,
  ...accentCollection
]; 