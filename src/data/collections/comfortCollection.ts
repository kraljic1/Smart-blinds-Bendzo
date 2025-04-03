import { Product } from '../../types/product';
import essentialSandMain from '../../img/rollerblinds/ESSENTIAL - sand/Essential - sand.webp';
import essentialSand1 from '../../img/rollerblinds/ESSENTIAL - sand/Essential - sand1.webp';
import essentialSand2 from '../../img/rollerblinds/ESSENTIAL - sand/Essential - sand2.webp';
import essentialSand3 from '../../img/rollerblinds/ESSENTIAL - sand/Essential - sand3.webp';

// Comfort Collection
export const comfortCollection: Product[] = [
  {
    id: "comfort-sand-brown",
    name: "Comfort - sand brown",
    price: 259.99,
    originalPrice: 289.99,
    image: essentialSandMain,
    images: [
      essentialSandMain,
      essentialSand1,
      essentialSand2,
      essentialSand3
    ],
    features: ["Blackout"],
    colors: 3,
    fabricColor: "#8B6942",
    collection: "Comfort"
  }
]; 