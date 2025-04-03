import { Product } from '../../types/product';
import essentialAntracitMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - ANTRACIT/Essential antracit.webp';
import essentialAntracit1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - ANTRACIT/Essential antracit1.webp';
import essentialAntracit2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - ANTRACIT/Essential antracit2.webp';
import essentialAntracit3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - ANTRACIT/Essential antracit3.webp';
import essentialAntracit4 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - ANTRACIT/Essential antracit4.webp';
import essentialOffWhiteMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - OFF-WHITE/Essential - off white.webp';
import essentialOffWhite1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - OFF-WHITE/Essential - off white1.webp';
import essentialOffWhite2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - OFF-WHITE/Essential - off white2.webp';
import essentialOffWhite3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - OFF-WHITE/Essential - off white3.webp';
import essentialLightGreyMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - LIGHT GREY/Essential - light grey.webp';
import essentialLightGrey1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - LIGHT GREY/Essential - light grey1.webp';
import essentialLightGrey2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - LIGHT GREY/Essential - light grey2.webp';
import essentialLightGrey3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - LIGHT GREY/Essential - light grey3.webp';
import essentialLightGrey4 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - LIGHT GREY/Essential - light grey4.webp';
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
import essentialBeigeMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - BEIGE/Essential beige.webp';
import essentialBeige1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - BEIGE/Essential beige1.webp';
import essentialBeige2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - BEIGE/Essential beige2.webp';
import essentialBeige3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - BEIGE/Essential beige3.webp';
import essentialBeige4 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - BEIGE/Essential beige4.webp';
import essentialDarkGreyMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - DARK GREY/archive/Essential dark grey.webp';
import essentialDarkGrey1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - DARK GREY/archive/Essential dark grey1.webp';
import essentialDarkGrey2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - DARK GREY/archive/Essential dark grey2.webp';
import essentialDarkGrey3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - DARK GREY/archive/Essential dark grey3.webp';
import essentialDarkGrey4 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - DARK GREY/archive/Essential dark grey4.webp';

// Essential Collection
export const essentialCollection: Product[] = [
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
      essentialAntracit3,
      essentialAntracit4
    ],
    features: ["Light filtering"],
    colors: 5,
    fabricColor: "#2C3539",
    collection: "Essential"
  },
  {
    id: "essential-beige",
    name: "Essential Beige",
    price: 239.57,
    originalPrice: 266.19,
    image: essentialBeigeMain,
    images: [
      essentialBeigeMain,
      essentialBeige1,
      essentialBeige2,
      essentialBeige3,
      essentialBeige4
    ],
    features: ["Light filtering"],
    colors: 5,
    fabricColor: "#E8D6B3",
    collection: "Essential"
  },
  {
    id: "essential-dark-grey",
    name: "Essential Dark Grey",
    price: 239.57,
    originalPrice: 266.19,
    image: essentialDarkGreyMain,
    images: [
      essentialDarkGreyMain,
      essentialDarkGrey1,
      essentialDarkGrey2,
      essentialDarkGrey3,
      essentialDarkGrey4
    ],
    features: ["Light filtering"],
    colors: 5,
    fabricColor: "#4A4A4A",
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
    name: "Essential Sand",
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
    name: "Essential ocean",
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
    id: "essential-light-grey",
    name: "Essential - light grey",
    price: 239.57,
    originalPrice: 266.18,
    image: essentialLightGreyMain,
    images: [
      essentialLightGreyMain,
      essentialLightGrey1,
      essentialLightGrey2,
      essentialLightGrey3,
      essentialLightGrey4
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
      essentialWhite3,
      essentialWhite4
    ],
    features: ["Light filtering"],
    colors: 5,
    fabricColor: "#FFFFFF",
    collection: "Essential"
  }
]; 