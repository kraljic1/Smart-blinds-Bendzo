import { Product } from '../../types/product';
import screenBlack0 from '../../img/rollerblinds/SCREEN/SCREEN BLACK/0.webp';
import screenBlack1 from '../../img/rollerblinds/SCREEN/SCREEN BLACK/1.webp';
import screenBlack2 from '../../img/rollerblinds/SCREEN/SCREEN BLACK/2.webp';
import screenBlack3 from '../../img/rollerblinds/SCREEN/SCREEN BLACK/3.webp';
import screenBlack4 from '../../img/rollerblinds/SCREEN/SCREEN BLACK/4.webp';
import screenLightGrey0 from '../../img/rollerblinds/SCREEN/SCREEN LIGHT GREY/0.webp';
import screenLightGrey1 from '../../img/rollerblinds/SCREEN/SCREEN LIGHT GREY/1.webp';
import screenLightGrey2 from '../../img/rollerblinds/SCREEN/SCREEN LIGHT GREY/2.webp';
import screenLightGrey3 from '../../img/rollerblinds/SCREEN/SCREEN LIGHT GREY/3.webp';
import screenLightGrey4 from '../../img/rollerblinds/SCREEN/SCREEN LIGHT GREY/4.webp';
import screenSand0 from '../../img/rollerblinds/SCREEN/SCREEN SAND/0.webp';
import screenSand1 from '../../img/rollerblinds/SCREEN/SCREEN SAND/1.webp';
import screenSand2 from '../../img/rollerblinds/SCREEN/SCREEN SAND/2.webp';
import screenSand3 from '../../img/rollerblinds/SCREEN/SCREEN SAND/3.webp';
import screenSand4 from '../../img/rollerblinds/SCREEN/SCREEN SAND/4.webp';

// Screen Collection
export const screenCollection: Product[] = [
 {
 id:"screen-black-light-filtering",
 name:"SCREEN - BLACK",
 price: 249.99,
 originalPrice: 279.99,
 image: screenBlack0,
 images: [
 screenBlack0,
 screenBlack1,
 screenBlack2,
 screenBlack3,
 screenBlack4
 ],
 features: ["Light filtering"],
 colors: 1,
 fabricColor:"#000000",
 collection:"Screen"
 },
 {
 id:"screen-light-grey-light-filtering",
 name:"SCREEN - LIGHT GREY",
 price: 249.99,
 originalPrice: 279.99,
 image: screenLightGrey0,
 images: [
 screenLightGrey0,
 screenLightGrey1,
 screenLightGrey2,
 screenLightGrey3,
 screenLightGrey4
 ],
 features: ["Light filtering"],
 colors: 1,
 fabricColor:"#D3D3D3",
 collection:"Screen"
 },
 {
 id:"screen-sand-light-filtering",
 name:"SCREEN - SAND",
 price: 249.99,
 originalPrice: 279.99,
 image: screenSand0,
 images: [
 screenSand0,
 screenSand1,
 screenSand2,
 screenSand3,
 screenSand4
 ],
 features: ["Light filtering"],
 colors: 1,
 fabricColor:"#E8D6B3",
 collection:"Screen"
 }
]; 