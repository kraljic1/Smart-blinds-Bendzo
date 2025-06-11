import { Product } from '../../../../types/product';
import { offWhiteImages } from '../images/offWhiteImages';

export const offWhiteProducts: Product[] = [
 {
 id:"essential-off-white",
 name:"Essential - off white",
 price: 239.57,
 originalPrice: 266.18,
 image: offWhiteImages.lightFiltering.main,
 images: offWhiteImages.lightFiltering.gallery,
 features: ["Light filtering"],
 colors: 5,
 fabricColor:"#FAF9F6",
 collection:"Essential"
 },
 {
 id:"essential-off-white-blackout",
 name:"Essential - off-white",
 price: 249.99,
 originalPrice: 279.99,
 image: offWhiteImages.blackout.main,
 images: offWhiteImages.blackout.gallery,
 features: ["Blackout"],
 colors: 5,
 fabricColor:"#F5F5F5",
 collection:"Essential"
 }
]; 