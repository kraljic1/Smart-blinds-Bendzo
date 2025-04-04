import { Product } from '../../types/product';
import essentialOffWhiteMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - OFF-WHITE/Essential - off white.webp';
import essentialOffWhite1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - OFF-WHITE/Essential - off white1.webp';
import essentialOffWhite2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - OFF-WHITE/Essential - off white2.webp';
import essentialOffWhite3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - OFF-WHITE/Essential - off white3.webp';
import essentialLightGreyMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - LIGHT GREY/Essential - light grey.webp';
import essentialLightGrey1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - LIGHT GREY/Essential - light grey1.webp';
import essentialLightGrey2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - LIGHT GREY/Essential - light grey2.webp';
import essentialLightGrey3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - LIGHT GREY/Essential - light grey3.webp';
import essentialLightGrey4 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - LIGHT GREY/Essential - light grey4.webp';
import essentialBeigeMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - BEIGE/Essential beige.webp';
import essentialBeige1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - BEIGE/Essential beige1.webp';
import essentialBeige2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - BEIGE/Essential beige2.webp';
import essentialBeige3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - BEIGE/Essential beige3.webp';
import essentialBeige4 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - BEIGE/Essential beige4.webp';
import essentialDarkGreyMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - DARK GREY/Essential dark grey.webp';
import essentialDarkGrey1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - DARK GREY/Essential dark grey1.webp';
import essentialDarkGrey2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - DARK GREY/Essential dark grey2.webp';
import essentialDarkGrey3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - DARK GREY/Essential dark grey3.webp';
import essentialDarkGrey4 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - DARK GREY/Essential dark grey4.webp';
import essentialBlueGreyMain from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - BLUE GREY/Essential - grey blue.webp';
import essentialBlueGrey1 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - BLUE GREY/Essential - grey blue1.webp';
import essentialBlueGrey2 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - BLUE GREY/Essential - grey blue2.webp';
import essentialBlueGrey3 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - BLUE GREY/Essential - grey blue3.webp';
import essentialBlueGrey4 from '../../img/rollerblinds/ESSENTIAL/ESSENTIAL - BLUE GREY/Essential - grey blue4.webp';

// Essential Collection Part 2
export const essentialCollectionPart2: Product[] = [
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
    id: "essential-blue-grey",
    name: "Essential - blue grey",
    price: 239.57,
    originalPrice: 266.19,
    image: essentialBlueGreyMain,
    images: [
      essentialBlueGreyMain,
      essentialBlueGrey1,
      essentialBlueGrey2,
      essentialBlueGrey3,
      essentialBlueGrey4
    ],
    features: ["Light filtering"],
    colors: 5,
    fabricColor: "#6699CC",
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
  }
]; 