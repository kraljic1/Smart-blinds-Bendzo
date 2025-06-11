import { Product } from '../../../types/product';
import { createZebraProduct } from '../../../utils/imageImport';

/**
 * Collection of Pure series zebra blind products
 */
export const pureCollection: Product[] = [
 createZebraProduct(
"pure-white",
"Pure - White",
 307.55,
 339.99,
"#FFFFFF",
"Pure",
"WHITE"
 ),
 createZebraProduct(
"pure-dark-grey",
"Pure - dark grey",
 307.55,
 339.99,
"#444444",
"Pure",
"DARK GREY"
 )
]; 