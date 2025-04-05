import { Product } from '../../types/product';
import comfortGreyBL0 from '../../img/rollerblinds/COMFORT/COMFORT - GREYbl/0.webp';
import comfortGreyBL1 from '../../img/rollerblinds/COMFORT/COMFORT - GREYbl/1.webp';
import comfortGreyBL2 from '../../img/rollerblinds/COMFORT/COMFORT - GREYbl/2.webp';
import comfortGreyBL3 from '../../img/rollerblinds/COMFORT/COMFORT - GREYbl/3.webp';
import comfortGreyBL4 from '../../img/rollerblinds/COMFORT/COMFORT - GREYbl/4.webp';
import comfortGrey0 from '../../img/rollerblinds/COMFORT/COMFORT - GREY/0.jpg';
import comfortGrey1 from '../../img/rollerblinds/COMFORT/COMFORT - GREY/1.jpg';
import comfortGrey2 from '../../img/rollerblinds/COMFORT/COMFORT - GREY/2.jpg';
import comfortGrey3 from '../../img/rollerblinds/COMFORT/COMFORT - GREY/3.jpg';
import comfortGrey4 from '../../img/rollerblinds/COMFORT/COMFORT - GREY/4.jpg';

// Comfort Collection Part 2
// New comfort products can be added here when comfortCollection.ts reaches its 200-line limit
export const comfortCollectionPart2: Product[] = [
  {
    id: "comfort-grey-blackout",
    name: "Comfort - grey",
    price: 259.99,
    originalPrice: 289.99,
    image: comfortGreyBL0,
    images: [
      comfortGreyBL0,
      comfortGreyBL1,
      comfortGreyBL2,
      comfortGreyBL3,
      comfortGreyBL4
    ],
    features: ["Blackout"],
    colors: 3,
    fabricColor: "#5A5A5A",
    collection: "Comfort"
  },
  {
    id: "comfort-grey-light-filtering",
    name: "Comfort - grey",
    price: 239.99,
    originalPrice: 269.99,
    image: comfortGrey0,
    images: [
      comfortGrey0,
      comfortGrey1,
      comfortGrey2,
      comfortGrey3,
      comfortGrey4
    ],
    features: ["Light filtering"],
    colors: 3,
    fabricColor: "#6E6E6E",
    collection: "Comfort"
  }
]; 