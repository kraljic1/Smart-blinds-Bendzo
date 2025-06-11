import { Product } from '../../types/product';
import solarBlackMain from '../../img/rollerblinds/SOLAR/SOLAR - BLACK/Solar black.webp';
import solarBlack1 from '../../img/rollerblinds/SOLAR/SOLAR - BLACK/Solar black1.webp';
import solarBlack2 from '../../img/rollerblinds/SOLAR/SOLAR - BLACK/Solar black2.webp';
import solarBlack3 from '../../img/rollerblinds/SOLAR/SOLAR - BLACK/Solar black3.webp';
import solarBeige0 from '../../img/rollerblinds/SOLAR/SOLAR BEIGE/0.webp';
import solarBeige1 from '../../img/rollerblinds/SOLAR/SOLAR BEIGE/1.webp';
import solarBeige2 from '../../img/rollerblinds/SOLAR/SOLAR BEIGE/2.webp';
import solarBeige3 from '../../img/rollerblinds/SOLAR/SOLAR BEIGE/3.webp';
import solarBeige4 from '../../img/rollerblinds/SOLAR/SOLAR BEIGE/4.webp';
import solarDarkGrey0 from '../../img/rollerblinds/SOLAR/SOLAR DARK GREY/0.webp';
import solarDarkGrey1 from '../../img/rollerblinds/SOLAR/SOLAR DARK GREY/1.webp';
import solarDarkGrey2 from '../../img/rollerblinds/SOLAR/SOLAR DARK GREY/2.webp';
import solarDarkGrey3 from '../../img/rollerblinds/SOLAR/SOLAR DARK GREY/3.webp';
import solarGrey0 from '../../img/rollerblinds/SOLAR/SOLAR GREY/0.webp';
import solarGrey1 from '../../img/rollerblinds/SOLAR/SOLAR GREY/1.webp';
import solarGrey2 from '../../img/rollerblinds/SOLAR/SOLAR GREY/2.webp';
import solarGrey3 from '../../img/rollerblinds/SOLAR/SOLAR GREY/3.webp';
import solarWhite0 from '../../img/rollerblinds/SOLAR/SOLAR WHITE/0.webp';
import solarWhite1 from '../../img/rollerblinds/SOLAR/SOLAR WHITE/1.webp';
import solarWhite2 from '../../img/rollerblinds/SOLAR/SOLAR WHITE/2.webp';
import solarWhite3 from '../../img/rollerblinds/SOLAR/SOLAR WHITE/3.webp';
import solarWhite4 from '../../img/rollerblinds/SOLAR/SOLAR WHITE/4.webp';
import solarWhiteOff0 from '../../img/rollerblinds/SOLAR/SOLAR WHITE-OFF/0.webp';
import solarWhiteOff1 from '../../img/rollerblinds/SOLAR/SOLAR WHITE-OFF/1.webp';
import solarWhiteOff2 from '../../img/rollerblinds/SOLAR/SOLAR WHITE-OFF/2.webp';
import solarWhiteOff3 from '../../img/rollerblinds/SOLAR/SOLAR WHITE-OFF/3.webp';

// Solar Collection
export const solarCollection: Product[] = [
 {
 id:"solar-white-blackout",
 name:"SOLAR - WHITE",
 price: 299.99,
 originalPrice: 329.99,
 image: solarWhite0,
 images: [
 solarWhite0,
 solarWhite1,
 solarWhite2,
 solarWhite3,
 solarWhite4
 ],
 features: ["Blackout"],
 colors: 1,
 fabricColor:"#FFFFFF",
 collection:"Solar"
 },
 {
 id:"solar-white-off-blackout",
 name:"SOLAR - DARK WHITE-OFF",
 price: 299.99,
 originalPrice: 329.99,
 image: solarWhiteOff0,
 images: [
 solarWhiteOff0,
 solarWhiteOff1,
 solarWhiteOff2,
 solarWhiteOff3
 ],
 features: ["Blackout"],
 colors: 1,
 fabricColor:"#F5F5F5",
 collection:"Solar"
 },
 {
 id:"solar-black",
 name:"Solar - black",
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
 fabricColor:"#000000",
 collection:"Solar"
 },
 {
 id:"solar-beige-blackout",
 name:"SOLAR - BEIGE",
 price: 299.99,
 originalPrice: 329.99,
 image: solarBeige0,
 images: [
 solarBeige0,
 solarBeige1,
 solarBeige2,
 solarBeige3,
 solarBeige4
 ],
 features: ["Blackout"],
 colors: 1,
 fabricColor:"#E2C9A6",
 collection:"Solar"
 },
 {
 id:"solar-grey-blackout",
 name:"SOLAR - GREY",
 price: 299.99,
 originalPrice: 329.99,
 image: solarGrey0,
 images: [
 solarGrey0,
 solarGrey1,
 solarGrey2,
 solarGrey3
 ],
 features: ["Blackout"],
 colors: 1,
 fabricColor:"#A9A9A9",
 collection:"Solar"
 },
 {
 id:"solar-dark-grey-blackout",
 name:"SOLAR - DARK GREY",
 price: 299.99,
 originalPrice: 329.99,
 image: solarDarkGrey0,
 images: [
 solarDarkGrey0,
 solarDarkGrey1,
 solarDarkGrey2,
 solarDarkGrey3
 ],
 features: ["Blackout"],
 colors: 1,
 fabricColor:"#4A4A4A",
 collection:"Solar"
 }
]; 