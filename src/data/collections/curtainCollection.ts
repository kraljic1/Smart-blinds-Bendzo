import { Product } from '../../types/product';

// Import images using URL constructor for proper path resolution
const curtainTrackImg = new URL('../../img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/curtain_track.webp', import.meta.url).href;
const detailshotImg = new URL('../../img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/medium_web-sb_gordijnrails_detailshot.webp', import.meta.url).href;
const kleurenImg = new URL('../../img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/gordijnrail_kleuren.webp', import.meta.url).href;
const renderImg = new URL('../../img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/gordijnrail_render.webp', import.meta.url).href;
const afmetingenImg = new URL('../../img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/smartblinds_elektrische_gordijnrail_afmetingen.webp', import.meta.url).href;
const afmetingen2Img = new URL('../../img/CURTAIN TRACKS/ELECTRIC CURTAIN TRACKS/smartblinds_elektrische_gordijnrail_afmetingen_2.webp', import.meta.url).href;

// Curtain blinds
export const curtainCollection: Product[] = [
 {
 id:"elegant-curtain-blind",
 name:"Elegant Curtain Blind",
 price: 355.88,
 originalPrice: 395.40,
 image:"https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
 features: ["Light filtering"],
 colors: 3,
 fabricColor:"#FFFFFF"
 },
 {
 id:"premium-curtain-system",
 name:"Premium Curtain System",
 price: 399.99,
 originalPrice: 449.99,
 image:"https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
 features: ["Blackout"],
 colors: 2,
 fabricColor:"#C0C0C0"
 },
 {
 id:"glider-track",
 name:"Electric curtain tracks",
 price: 349.99,
 originalPrice: 389.99,
 image: curtainTrackImg,
 images: [
 curtainTrackImg,
 detailshotImg,
 kleurenImg,
 renderImg,
 afmetingenImg,
 afmetingen2Img
 ],
 features: ["Light filtering"],
 colors: 2,
 fabricColor:"#888888"
 }
]; 