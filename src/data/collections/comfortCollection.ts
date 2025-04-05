import { Product } from '../../types/product';
import comfortSandBrownMain from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/0.jpg';
import comfortSandBrown1 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/1.jpg';
import comfortSandBrown2 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/2.jpg';
import comfortSandBrown3 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/3.jpg';
import comfortSandBrown4 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/4.jpg';
import comfortSandBrownLF0 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/0.jpg';
import comfortSandBrownLF1 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/1.jpg';
import comfortSandBrownLF2 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/2.jpg';
import comfortSandBrownLF3 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/3.jpg';
import comfortSandBrownLF4 from '../../img/rollerblinds/COMFORT/COMFORT - SAND BROWN/4.jpg';
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
import comfortBrownGreyMain from '../../img/rollerblinds/COMFORT/COMFORT - BROWN GREY/0.jpg';
import comfortBrownGrey1 from '../../img/rollerblinds/COMFORT/COMFORT - BROWN GREY/1.jpg';
import comfortBrownGrey2 from '../../img/rollerblinds/COMFORT/COMFORT - BROWN GREY/2.jpg';
import comfortBrownGrey3 from '../../img/rollerblinds/COMFORT/COMFORT - BROWN GREY/3.jpg';
import comfortBrownGrey4 from '../../img/rollerblinds/COMFORT/COMFORT - BROWN GREY/4.jpg';
import comfortBrownGreyBLMain from '../../img/rollerblinds/COMFORT/COMFORT - BROWN GREYbl/0.webp';
import comfortBrownGreyBL1 from '../../img/rollerblinds/COMFORT/COMFORT - BROWN GREYbl/1.webp';
import comfortBrownGreyBL2 from '../../img/rollerblinds/COMFORT/COMFORT - BROWN GREYbl/2.webp';
import comfortBrownGreyBL3 from '../../img/rollerblinds/COMFORT/COMFORT - BROWN GREYbl/3.webp';
import comfortBrownGreyBL4 from '../../img/rollerblinds/COMFORT/COMFORT - BROWN GREYbl/4.webp';
import comfortWhiteMain from '../../img/rollerblinds/COMFORT/COMFORT - WHITE/0.jpg';
import comfortWhite1 from '../../img/rollerblinds/COMFORT/COMFORT - WHITE/1.jpg';
import comfortWhite2 from '../../img/rollerblinds/COMFORT/COMFORT - WHITE/2.jpg';
import comfortWhite3 from '../../img/rollerblinds/COMFORT/COMFORT - WHITE/3.jpg';
import comfortWhite4 from '../../img/rollerblinds/COMFORT/COMFORT - WHITE/4.jpg';

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
    id: "comfort-sand-brown-light-filtering",
    name: "Comfort - sand brown",
    price: 239.99,
    originalPrice: 269.99,
    image: comfortSandBrownLF0,
    images: [
      comfortSandBrownLF0,
      comfortSandBrownLF1,
      comfortSandBrownLF2,
      comfortSandBrownLF3,
      comfortSandBrownLF4
    ],
    features: ["Light filtering"],
    colors: 3,
    fabricColor: "#A87D4D",
    collection: "Comfort"
  },
  {
    id: "comfort-brown-grey",
    name: "Comfort - Brown grey",
    price: 239.99,
    originalPrice: 269.99,
    image: comfortBrownGreyMain,
    images: [
      comfortBrownGreyMain,
      comfortBrownGrey1,
      comfortBrownGrey2,
      comfortBrownGrey3,
      comfortBrownGrey4
    ],
    features: ["Light filtering"],
    colors: 3,
    fabricColor: "#6B6359",
    collection: "Comfort"
  },
  {
    id: "comfort-white",
    name: "Comfort - White",
    price: 239.99,
    originalPrice: 269.99,
    image: comfortWhiteMain,
    images: [
      comfortWhiteMain,
      comfortWhite1,
      comfortWhite2,
      comfortWhite3,
      comfortWhite4
    ],
    features: ["Light filtering"],
    colors: 3,
    fabricColor: "#F9F9F9",
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
  },
  {
    id: "comfort-brown-grey-blackout",
    name: "Comfort - Brown grey",
    price: 259.99,
    originalPrice: 289.99,
    image: comfortBrownGreyBLMain,
    images: [
      comfortBrownGreyBLMain,
      comfortBrownGreyBL1,
      comfortBrownGreyBL2,
      comfortBrownGreyBL3,
      comfortBrownGreyBL4
    ],
    features: ["Blackout"],
    colors: 3,
    fabricColor: "#6E6259",
    collection: "Comfort"
  }
]; 