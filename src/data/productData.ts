import { Product } from '../types/product';
import essentialAntracitMain from '../img/rollerblinds/ESSENTIAL - ANTRACIT/Essential antracit.webp';
import essentialAntracit1 from '../img/rollerblinds/ESSENTIAL - ANTRACIT/Essential antracit1.webp';
import essentialAntracit2 from '../img/rollerblinds/ESSENTIAL - ANTRACIT/Essential antracit2.webp';
import essentialAntracit3 from '../img/rollerblinds/ESSENTIAL - ANTRACIT/Essential antracit3.webp';
import essentialOffWhiteMain from '../img/rollerblinds/ESSENTIAL - OFF-WHITE/Essential - off white.webp';
import essentialOffWhite1 from '../img/rollerblinds/ESSENTIAL - OFF-WHITE/Essential - off white1.webp';
import essentialOffWhite2 from '../img/rollerblinds/ESSENTIAL - OFF-WHITE/Essential - off white2.webp';
import essentialOffWhite3 from '../img/rollerblinds/ESSENTIAL - OFF-WHITE/Essential - off white3.webp';
import essentialLightGreyMain from '../img/rollerblinds/ESSENTIAL - LIGHT GREY/Essential - light grey.webp';
import essentialLightGrey1 from '../img/rollerblinds/ESSENTIAL - LIGHT GREY/Essential - light grey1.webp';
import essentialLightGrey2 from '../img/rollerblinds/ESSENTIAL - LIGHT GREY/Essential - light grey2.webp';
import essentialLightGrey3 from '../img/rollerblinds/ESSENTIAL - LIGHT GREY/Essential - light grey3.webp';
import essentialSandMain from '../img/rollerblinds/ESSENTIAL - sand/Essential - sand.webp';
import essentialSand1 from '../img/rollerblinds/ESSENTIAL - sand/Essential - sand1.webp';
import essentialSand2 from '../img/rollerblinds/ESSENTIAL - sand/Essential - sand2.webp';
import essentialSand3 from '../img/rollerblinds/ESSENTIAL - sand/Essential - sand3.webp';
import essentialOceanMain from '../img/rollerblinds/ESSENTIAL - Ocean/Essential ocean.webp';
import essentialOcean1 from '../img/rollerblinds/ESSENTIAL - Ocean/Essential ocean1.webp';
import essentialOcean2 from '../img/rollerblinds/ESSENTIAL - Ocean/Essential ocean2.webp';
import essentialOcean3 from '../img/rollerblinds/ESSENTIAL - Ocean/Essential ocean3.webp';
import essentialWhiteMain from '../img/rollerblinds/ESSENTIAL - WHITE/Essential - white.webp';
import essentialWhite1 from '../img/rollerblinds/ESSENTIAL - WHITE/Essential - white1.webp';
import essentialWhite2 from '../img/rollerblinds/ESSENTIAL - WHITE/Essential - white2.webp';
import essentialWhite3 from '../img/rollerblinds/ESSENTIAL - WHITE/Essential - white3.webp';

// Roller Blinds
export const rollerBlinds: Product[] = [
  {
    id: "essential-antracit",
    name: "Essential antracit",
    price: 239.57,
    originalPrice: 266.19,
    image: essentialAntracitMain,
    images: [
      essentialAntracitMain,
      essentialAntracit1,
      essentialAntracit2,
      essentialAntracit3
    ],
    features: ["Light filtering"],
    colors: 5,
    fabricColor: "#2C3539",
    collection: "Essential"
  },
  {
    id: "essential-sand",
    name: "Essential - sand",
    price: 239.57,
    originalPrice: 266.18,
    image: essentialSandMain,
    images: [
      essentialSandMain,
      essentialSand1,
      essentialSand2,
      essentialSand3
    ],
    features: ["Light filtering"],
    colors: 5,
    fabricColor: "#C2B280",
    collection: "Essential"
  },
  {
    id: "essential-ocean",
    name: "Essential ocean",
    price: 239.57,
    originalPrice: 266.18,
    image: essentialOceanMain,
    images: [
      essentialOceanMain,
      essentialOcean1,
      essentialOcean2,
      essentialOcean3
    ],
    features: ["Light filtering"],
    colors: 5,
    fabricColor: "#1CA3EC",
    collection: "Essential"
  },
  {
    id: "essential-light-grey",
    name: "Essential - light grey",
    price: 239.57,
    originalPrice: 266.18,
    image: essentialLightGreyMain,
    images: [
      essentialLightGreyMain,
      essentialLightGrey1,
      essentialLightGrey2,
      essentialLightGrey3
    ],
    features: ["Light filtering"],
    colors: 5,
    fabricColor: "#D3D3D3",
    collection: "Essential"
  },
  {
    id: "essential-off-white",
    name: "Essential - off white",
    price: 239.57,
    originalPrice: 266.18,
    image: essentialOffWhiteMain,
    images: [
      essentialOffWhiteMain,
      essentialOffWhite1,
      essentialOffWhite2,
      essentialOffWhite3
    ],
    features: ["Light filtering"],
    colors: 5,
    fabricColor: "#FAF9F6",
    collection: "Essential"
  },
  {
    id: "essential-white",
    name: "Essential - white",
    price: 239.57,
    originalPrice: 266.18,
    image: essentialWhiteMain,
    images: [
      essentialWhiteMain,
      essentialWhite1,
      essentialWhite2,
      essentialWhite3
    ],
    features: ["Light filtering"],
    colors: 5,
    fabricColor: "#FFFFFF",
    collection: "Essential"
  },
  // Comfort Collection
  {
    id: "comfort-beige",
    name: "Comfort Beige",
    price: 259.99,
    originalPrice: 289.99,
    image: essentialSandMain, // Reusing image for demo
    images: [essentialSandMain, essentialSand1],
    features: ["Blackout"],
    colors: 3,
    fabricColor: "#E8E4C9",
    collection: "Comfort"
  },
  {
    id: "comfort-grey",
    name: "Comfort Grey",
    price: 259.99,
    originalPrice: 289.99,
    image: essentialLightGreyMain, // Reusing image for demo
    images: [essentialLightGreyMain, essentialLightGrey1],
    features: ["Blackout"],
    colors: 3,
    fabricColor: "#808080",
    collection: "Comfort"
  },
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
  },
  // Classic Collection
  {
    id: "classic-white",
    name: "Classic White",
    price: 279.99,
    originalPrice: 309.99,
    image: essentialWhiteMain, // Reusing image for demo
    images: [essentialWhiteMain, essentialWhite1],
    features: ["Light filtering"],
    colors: 4,
    fabricColor: "#FFFFFF",
    collection: "Classic"
  },
  {
    id: "classic-black",
    name: "Classic Black",
    price: 279.99,
    originalPrice: 309.99,
    image: essentialAntracitMain, // Reusing image for demo
    images: [essentialAntracitMain, essentialAntracit1],
    features: ["Light filtering"],
    colors: 4,
    fabricColor: "#000000",
    collection: "Classic"
  },
  // Solar Collection
  {
    id: "solar-protection-white",
    name: "Solar Protection White",
    price: 299.99,
    originalPrice: 329.99,
    image: essentialWhiteMain, // Reusing image for demo
    images: [essentialWhiteMain, essentialWhite1],
    features: ["Screen"],
    colors: 2,
    fabricColor: "#FFFFFF",
    collection: "Solar"
  },
  {
    id: "solar-black",
    name: "Solar - black",
    price: 299.99,
    originalPrice: 329.99,
    image: essentialAntracitMain,
    images: [
      essentialAntracitMain,
      essentialAntracit1,
      essentialAntracit2,
      essentialAntracit3
    ],
    features: ["Screen"],
    colors: 2,
    fabricColor: "#000000",
    collection: "Solar"
  },
  // Screen Collection
  {
    id: "screen-grey",
    name: "Screen Grey",
    price: 289.99,
    originalPrice: 319.99,
    image: essentialLightGreyMain, // Reusing image for demo
    images: [essentialLightGreyMain, essentialLightGrey1],
    features: ["Screen"],
    colors: 3,
    fabricColor: "#A9A9A9",
    collection: "Screen"
  },
  // Texture Collection
  {
    id: "texture-linen",
    name: "Texture Linen",
    price: 309.99,
    originalPrice: 339.99,
    image: essentialSandMain, // Reusing image for demo
    images: [essentialSandMain, essentialSand1],
    features: ["Transparent"],
    colors: 2,
    fabricColor: "#F5F5DC",
    collection: "Texture"
  }
];

// Zebra blinds
export const zebraBlinds: Product[] = [
  {
    id: "pure-white",
    name: "Pure White",
    price: 307.55,
    originalPrice: 339.99,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Zebra"],
    colors: 1,
    fabricColor: "#FFFFFF",
    collection: "Pure"
  },
  {
    id: "pure-dark-grey",
    name: "Pure Dark Grey",
    price: 307.55,
    originalPrice: 339.99,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    features: ["Zebra"],
    colors: 1,
    fabricColor: "#444444",
    collection: "Pure"
  },
  {
    id: "balance-white-sand",
    name: "Balance White Sand",
    price: 309.20,
    originalPrice: 345.99,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    features: ["Zebra"],
    colors: 2,
    fabricColor: "#F5F5DC",
    collection: "Balance"
  },
  {
    id: "accent-brown",
    name: "Accent Brown",
    price: 319.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    features: ["Zebra"],
    colors: 1,
    fabricColor: "#8B4513",
    collection: "Accent"
  },
  {
    id: "accent-black",
    name: "Accent Black",
    price: 319.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    features: ["Zebra"],
    colors: 1,
    fabricColor: "#000000",
    collection: "Accent"
  }
];

// Curtain blinds
export const curtainBlinds: Product[] = [
  {
    id: "elegant-curtain-blind",
    name: "Elegant Curtain Blind",
    price: 355.88,
    originalPrice: 395.40,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    features: ["Light filtering"],
    colors: 3,
    fabricColor: "#FFFFFF"
  },
  {
    id: "premium-curtain-system",
    name: "Premium Curtain System",
    price: 399.99,
    originalPrice: 449.99,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    features: ["Blackout"],
    colors: 2,
    fabricColor: "#C0C0C0"
  }
];

// Accessories
export const accessories: Product[] = [
  {
    id: "wifi-bridge",
    name: "Motionblinds Wi-Fi Bridge",
    price: 157.00,
    originalPrice: 174.99,
    image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    features: ["Wi-Fi"],
    colors: 1,
    fabricColor: "#000000"
  },
  {
    id: "5-channel-remote",
    name: "5-Channel Remote Control",
    price: 33.95,
    originalPrice: 39.95,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    features: ["Remote"],
    colors: 1,
    fabricColor: "#000000"
  },
  {
    id: "15-channel-remote",
    name: "15-Channel Remote",
    price: 53.95,
    originalPrice: 59.95,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    features: ["Remote"],
    colors: 1,
    fabricColor: "#000000"
  },
  {
    id: "smart-hub",
    name: "Smart Hub Controller",
    price: 129.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    features: ["Smart"],
    colors: 1,
    fabricColor: "#000000"
  },
  {
    id: "usb-c-cable",
    name: "USB-C Charging Cable",
    price: 14.99,
    originalPrice: 19.99,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    features: ["Charging"],
    colors: 1,
    fabricColor: "#FFFFFF"
  }
];

// Combine all products for when we need the full list
export const allProducts: Product[] = [
  ...rollerBlinds,
  ...zebraBlinds,
  ...curtainBlinds,
  ...accessories
]; 