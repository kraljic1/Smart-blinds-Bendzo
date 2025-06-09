import { Product } from '../../../../types/product';
import { greyImages } from '../images/greyImages';

export const greyProducts: Product[] = [
  {
    id: "essential-dark-grey-blackout",
    name: "Essential - Dark Grey",
    price: 249.99,
    originalPrice: 279.99,
    image: greyImages.darkGreyBlackout.main,
    images: greyImages.darkGreyBlackout.gallery,
    features: ["Blackout"],
    colors: 5,
    fabricColor: "#333333",
    collection: "Essential"
  },
  {
    id: "essential-light-grey",
    name: "Essential - light grey",
    price: 239.57,
    originalPrice: 266.18,
    image: greyImages.lightGrey.main,
    images: greyImages.lightGrey.gallery,
    features: ["Light filtering"],
    colors: 5,
    fabricColor: "#D3D3D3",
    collection: "Essential"
  },
  {
    id: "essential-light-grey-blackout",
    name: "Essential - Light Grey",
    price: 249.99,
    originalPrice: 279.99,
    image: greyImages.lightGreyBlackout.main,
    images: greyImages.lightGreyBlackout.gallery,
    features: ["Blackout"],
    colors: 5,
    fabricColor: "#C8C8C8",
    collection: "Essential"
  },
  {
    id: "essential-blue-grey-blackout",
    name: "Essential - Blue grey",
    price: 249.99,
    originalPrice: 279.99,
    image: greyImages.blueGreyBlackout.main,
    images: greyImages.blueGreyBlackout.gallery,
    features: ["Blackout"],
    colors: 5,
    fabricColor: "#5D8AA8",
    collection: "Essential"
  }
]; 