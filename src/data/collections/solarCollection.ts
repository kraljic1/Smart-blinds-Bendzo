import { Product } from '../../types/product';
import essentialAntracitMain from '../../img/rollerblinds/ESSENTIAL - ANTRACIT/Essential antracit.webp';
import essentialAntracit1 from '../../img/rollerblinds/ESSENTIAL - ANTRACIT/Essential antracit1.webp';
import essentialAntracit2 from '../../img/rollerblinds/ESSENTIAL - ANTRACIT/Essential antracit2.webp';
import essentialAntracit3 from '../../img/rollerblinds/ESSENTIAL - ANTRACIT/Essential antracit3.webp';

// Solar Collection
export const solarCollection: Product[] = [
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
  }
]; 