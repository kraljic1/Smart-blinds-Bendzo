import { Product } from '../../types/product';
import comfortSandBrownMain from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/Comfort Sand brown.webp';
import comfortSandBrown1 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/Comfort Sand brown1.webp';
import comfortSandBrown2 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/Comfort Sand brown2.webp';
import comfortSandBrown3 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/Comfort Sand brown3.webp';
import comfortSandBrown4 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/Comfort Sand brown4.webp';

// Comfort Collection
export const comfortCollection: Product[] = [
  {
    id: "comfort-sand-brown",
    name: "Comfort - sand brown",
    price: 259.99,
    originalPrice: 289.99,
    image: comfortSandBrownMain,
    images: [
      comfortSandBrownMain,
      comfortSandBrown1,
      comfortSandBrown2,
      comfortSandBrown3,
      comfortSandBrown4
    ],
    features: ["Blackout"],
    colors: 3,
    fabricColor: "#8B6942",
    collection: "Comfort"
  }
]; 