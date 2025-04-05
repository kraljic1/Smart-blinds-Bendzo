import { Product } from '../../types/product';
import essentialAntracitMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - ANTRACIT/Essential antracit.webp';
import essentialAntracit1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - ANTRACIT/Essential antracit1.webp';
import essentialAntracit2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - ANTRACIT/Essential antracit2.webp';
import essentialAntracit3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - ANTRACIT/Essential antracit3.webp';
import essentialAntracit4 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - ANTRACIT/Essential antracit4.webp';
import essentialSandMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - sand/Essential - sand.webp';
import essentialSand1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - sand/Essential - sand1.webp';
import essentialSand2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - sand/Essential - sand2.webp';
import essentialSand3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - sand/Essential - sand3.webp';
import essentialSand4 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - sand/Essential sand4.webp';
import essentialOceanMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - Ocean/Essential ocean.webp';
import essentialOcean1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - Ocean/Essential ocean1.webp';
import essentialOcean2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - Ocean/Essential ocean2.webp';
import essentialOcean3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - Ocean/Essential ocean3.webp';
import essentialOcean4 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - Ocean/Essential ocean4.webp';
import essentialWhiteMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - WHITE/Essential - white.webp';
import essentialWhite1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - WHITE/Essential - white1.webp';
import essentialWhite2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - WHITE/Essential - white2.webp';
import essentialWhite3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - WHITE/Essential - white3.webp';
import essentialWhite4 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - WHITE/Essential white4.webp';
import essentialSandBLMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - sandBL/Essential sandBL.webp';
import essentialSandBL1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - sandBL/Essential sandBL1.webp';
import essentialSandBL2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - sandBL/Essential sandBL2.webp';
import essentialSandBL3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - sandBL/Essential sandBL3.webp';
import essentialSandBL4 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - sandBL/Essential sandBL4.webp';
import essentialWhiteBLMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - WHITEBL/Essential - whiteBl.webp';
import essentialWhiteBL1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - WHITEBL/Essential - whiteBl1.webp';
import essentialWhiteBL2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - WHITEBL/Essential - whiteBl2.webp';
import essentialWhiteBL3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - WHITEBL/Essential - whiteBl3.webp';
import essentialWhiteBL4 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - WHITEBL/Essential - whiteBl4.webp';

// Essential Collection Part 1
export const essentialCollectionPart1: Product[] = [
  {
    id: "essential-anthracite",
    name: "Essential - anthracite",
    price: 239.57,
    originalPrice: 266.19,
    image: essentialAntracitMain,
    images: [
      essentialAntracitMain,
      essentialAntracit1,
      essentialAntracit2,
      essentialAntracit3,
      essentialAntracit4
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
      essentialSand3,
      essentialSand4
    ],
    features: ["Light filtering"],
    colors: 5,
    fabricColor: "#C2B280",
    collection: "Essential"
  },
  {
    id: "essential-sand-blackout",
    name: "Essential - Sand",
    price: 249.99,
    originalPrice: 279.99,
    image: essentialSandBLMain,
    images: [
      essentialSandBLMain,
      essentialSandBL1,
      essentialSandBL2,
      essentialSandBL3,
      essentialSandBL4
    ],
    features: ["Blackout"],
    colors: 5,
    fabricColor: "#D2B48C",
    collection: "Essential"
  },
  {
    id: "essential-ocean",
    name: "Essential - ocean",
    price: 239.57,
    originalPrice: 266.18,
    image: essentialOceanMain,
    images: [
      essentialOceanMain,
      essentialOcean1,
      essentialOcean2,
      essentialOcean3,
      essentialOcean4
    ],
    features: ["Light filtering"],
    colors: 5,
    fabricColor: "#1CA3EC",
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
      essentialWhite3,
      essentialWhite4
    ],
    features: ["Light filtering"],
    colors: 5,
    fabricColor: "#FFFFFF",
    collection: "Essential"
  },
  {
    id: "essential-white-blackout",
    name: "Essential - White",
    price: 249.99,
    originalPrice: 279.99,
    image: essentialWhiteBLMain,
    images: [
      essentialWhiteBLMain,
      essentialWhiteBL1,
      essentialWhiteBL2,
      essentialWhiteBL3,
      essentialWhiteBL4
    ],
    features: ["Blackout"],
    colors: 5,
    fabricColor: "#FFFFFF",
    collection: "Essential"
  }
]; 