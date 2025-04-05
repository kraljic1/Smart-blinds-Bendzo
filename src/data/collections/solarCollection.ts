import { Product } from '../../types/product';
import solarBlackMain from '../../img/rollerblinds/SOLAR/SOLAR - BLACK/Solar black.webp';
import solarBlack1 from '../../img/rollerblinds/SOLAR/SOLAR - BLACK/Solar black1.webp';
import solarBlack2 from '../../img/rollerblinds/SOLAR/SOLAR - BLACK/Solar black2.webp';
import solarBlack3 from '../../img/rollerblinds/SOLAR/SOLAR - BLACK/Solar black3.webp';

// Solar Collection
export const solarCollection: Product[] = [
  {
    id: "solar-black",
    name: "Solar - black",
    price: 299.99,
    originalPrice: 329.99,
    image: solarBlackMain,
    images: [
      solarBlackMain,
      solarBlack1,
      solarBlack2,
      solarBlack3
    ],
    features: ["Blackout"],
    colors: 2,
    fabricColor: "#000000",
    collection: "Solar"
  }
]; 