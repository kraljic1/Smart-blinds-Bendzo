import { Product } from '../../types/product';
import essentialAntracitMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - ANTRACIT/Essential antracit.webp';
import essentialAntracit1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - ANTRACIT/Essential antracit1.webp';
import essentialAntracit2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - ANTRACIT/Essential antracit2.webp';
import essentialAntracit3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - ANTRACIT/Essential antracit3.webp';
import essentialOffWhiteMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - OFF-WHITE/Essential - off white.webp';
import essentialOffWhite1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - OFF-WHITE/Essential - off white1.webp';
import essentialOffWhite2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - OFF-WHITE/Essential - off white2.webp';
import essentialOffWhite3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - OFF-WHITE/Essential - off white3.webp';
import essentialLightGreyMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - LIGHT GREY/Essential - light grey.webp';
import essentialLightGrey1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - LIGHT GREY/Essential - light grey1.webp';
import essentialLightGrey2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - LIGHT GREY/Essential - light grey2.webp';
import essentialLightGrey3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - LIGHT GREY/Essential - light grey3.webp';
import essentialSandMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - sand/Essential - sand.webp';
import essentialSand1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - sand/Essential - sand1.webp';
import essentialSand2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - sand/Essential - sand2.webp';
import essentialSand3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - sand/Essential - sand3.webp';
import essentialOceanMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - Ocean/Essential ocean.webp';
import essentialOcean1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - Ocean/Essential ocean1.webp';
import essentialOcean2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - Ocean/Essential ocean2.webp';
import essentialOcean3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - Ocean/Essential ocean3.webp';
import essentialWhiteMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - WHITE/Essential - white.webp';
import essentialWhite1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - WHITE/Essential - white1.webp';
import essentialWhite2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - WHITE/Essential - white2.webp';
import essentialWhite3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - WHITE/Essential - white3.webp';

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
  }
]; 