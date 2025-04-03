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
    id: "essential-anthracite",
    name: "Essential Anthracite",
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
    fabricColor: "#2C3539"
  },
  {
    id: "essential-sand",
    name: "Essential Sand",
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
    fabricColor: "#C2B280"
  },
  {
    id: "essential-ocean",
    name: "Essential Ocean",
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
    fabricColor: "#1CA3EC"
  },
  {
    id: "essential-light-grey",
    name: "Essential Light Grey",
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
    fabricColor: "#D3D3D3"
  },
  {
    id: "essential-off-white",
    name: "Essential Off-White",
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
    fabricColor: "#FAF9F6"
  },
  {
    id: "essential-white",
    name: "Essential White",
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
    fabricColor: "#FFFFFF"
  }
];

// Zebra blinds (formerly Day & Night Blinds)
export const zebraBlinds: Product[] = [
  {
    id: "luxe-white",
    name: "Luxe White",
    price: 289.99,
    originalPrice: 319.99,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Zebra"],
    colors: 3,
    fabricColor: "#FFFFFF"
  },
  {
    id: "premium-silver",
    name: "Premium Silver",
    price: 299.99,
    originalPrice: 329.99,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    features: ["Zebra"],
    colors: 2,
    fabricColor: "#C0C0C0"
  },
  {
    id: "deluxe-graphite",
    name: "Deluxe Graphite",
    price: 319.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    features: ["Zebra"],
    colors: 1,
    fabricColor: "#383838"
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