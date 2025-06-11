import { ACCESSORY_PRODUCT_IDS, SPECIAL_PRODUCT_IDS, PRODUCT_COLLECTIONS } from '../constants/productTypes';
import { allProducts } from '../../collections';

/**
 * Checks if a product is an accessory product
 */
export const isAccessoryProduct = (productId: string): boolean => {
 return (ACCESSORY_PRODUCT_IDS as readonly string[]).includes(productId);
};

/**
 * Checks if a product is a curtain track
 */
export const isCurtainTrackProduct = (productId: string): boolean => {
 return productId === SPECIAL_PRODUCT_IDS.CURTAIN_TRACK;
};

/**
 * Checks if a product is a roller blind or zebra blind (not curtain)
 */
export const isRollerOrZebraBlind = (productId: string): boolean => {
 const product = allProducts.find(p => p.id === productId);
 return product ? (product.collection || '').toLowerCase() !== PRODUCT_COLLECTIONS.CURTAIN : false;
};

/**
 * Finds a product by its ID
 */
export const findProductById = (productId: string) => {
 return allProducts.find(p => p.id === productId);
}; 