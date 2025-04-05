import { Product } from '../../types/product';
import comfortSandBrownMain from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/0.jpg';
import comfortSandBrown1 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/1.jpg';
import comfortSandBrown2 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/2.jpg';
import comfortSandBrown3 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/3.jpg';
import comfortSandBrown4 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/4.jpg';
import comfortAnthraciteMain from '../../img/rollerblinds/COMFORT/COMFORT - ANTHRACITE/0.jpg';
import comfortAnthracite1 from '../../img/rollerblinds/COMFORT/COMFORT - ANTHRACITE/1.jpg';
import comfortAnthracite2 from '../../img/rollerblinds/COMFORT/COMFORT - ANTHRACITE/2.jpg';
import comfortAnthracite3 from '../../img/rollerblinds/COMFORT/COMFORT - ANTHRACITE/3.jpg';
import comfortAnthracite4 from '../../img/rollerblinds/COMFORT/COMFORT - ANTHRACITE/4.jpg';
import comfortAnthraciteBLMain from '../../img/rollerblinds/COMFORT/COMFORT - ANTHRACITEbl/0.webp';
import comfortAnthraciteBL1 from '../../img/rollerblinds/COMFORT/COMFORT - ANTHRACITEbl/1.webp';
import comfortAnthraciteBL2 from '../../img/rollerblinds/COMFORT/COMFORT - ANTHRACITEbl/2.webp';
import comfortAnthraciteBL3 from '../../img/rollerblinds/COMFORT/COMFORT - ANTHRACITEbl/3.webp';
import comfortAnthraciteBL4 from '../../img/rollerblinds/COMFORT/COMFORT - ANTHRACITEbl/4.webp';

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
  },
  {
    id: "comfort-anthracite",
    name: "Comfort - Anthracite",
    price: 259.99,
    originalPrice: 289.99,
    image: comfortAnthraciteMain,
    images: [
      comfortAnthraciteMain,
      comfortAnthracite1,
      comfortAnthracite2,
      comfortAnthracite3,
      comfortAnthracite4
    ],
    features: ["Light filtering"],
    colors: 3,
    fabricColor: "#2C3539",
    collection: "Comfort"
  },
  {
    id: "comfort-anthracite-blackout",
    name: "Comfort - Anthracite",
    price: 259.99,
    originalPrice: 289.99,
    image: comfortAnthraciteBLMain,
    images: [
      comfortAnthraciteBLMain,
      comfortAnthraciteBL1,
      comfortAnthraciteBL2,
      comfortAnthraciteBL3,
      comfortAnthraciteBL4
    ],
    features: ["Blackout"],
    colors: 3,
    fabricColor: "#2C3539",
    collection: "Comfort"
  }
]; 