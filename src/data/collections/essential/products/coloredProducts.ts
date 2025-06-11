import { Product } from '../../../../types/product';
import { coloredImages } from '../images/coloredImages';

export const coloredProducts: Product[] = [
 {
 id:"essential-ocean-blackout",
 name:"Essential - Ocean",
 price: 249.99,
 originalPrice: 279.99,
 image: coloredImages.oceanBlackout.main,
 images: coloredImages.oceanBlackout.gallery,
 features: ["Blackout"],
 colors: 5,
 fabricColor:"#1E7B9A",
 collection:"Essential"
 },
 {
 id:"essential-beige-blackout",
 name:"Essential - Beige",
 price: 249.99,
 originalPrice: 279.99,
 image: coloredImages.beigeBlackout.main,
 images: coloredImages.beigeBlackout.gallery,
 features: ["Blackout"],
 colors: 5,
 fabricColor:"#E2C9A6",
 collection:"Essential"
 },
 {
 id:"essential-anthracite-blackout",
 name:"Essential - Anthracite",
 price: 249.99,
 originalPrice: 279.99,
 image: coloredImages.anthraciteBlackout.main,
 images: coloredImages.anthraciteBlackout.gallery,
 features: ["Blackout"],
 colors: 5,
 fabricColor:"#2A2A2A",
 collection:"Essential"
 }
]; 