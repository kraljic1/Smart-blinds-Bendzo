import { Product } from '../../types/product';
import textureGrey0 from '../../img/rollerblinds/TEXTURE/TEXTURE - GREY/0.webp';
import textureGrey1 from '../../img/rollerblinds/TEXTURE/TEXTURE - GREY/1.webp';
import textureGrey2 from '../../img/rollerblinds/TEXTURE/TEXTURE - GREY/2.webp';
import textureGrey3 from '../../img/rollerblinds/TEXTURE/TEXTURE - GREY/3.webp';
import textureGrey4 from '../../img/rollerblinds/TEXTURE/TEXTURE - GREY/4.webp';
import textureOffWhite0 from '../../img/rollerblinds/TEXTURE/TEXTURE - OFF-WHITE/0.webp';
import textureOffWhite1 from '../../img/rollerblinds/TEXTURE/TEXTURE - OFF-WHITE/1.webp';
import textureOffWhite2 from '../../img/rollerblinds/TEXTURE/TEXTURE - OFF-WHITE/2.webp';
import textureOffWhite3 from '../../img/rollerblinds/TEXTURE/TEXTURE - OFF-WHITE/3.webp';
import textureOffWhite4 from '../../img/rollerblinds/TEXTURE/TEXTURE - OFF-WHITE/4.webp';
import textureWhite0 from '../../img/rollerblinds/TEXTURE/TEXTURE - WHITE/0.webp';
import textureWhite1 from '../../img/rollerblinds/TEXTURE/TEXTURE - WHITE/1.webp';
import textureWhite2 from '../../img/rollerblinds/TEXTURE/TEXTURE - WHITE/2.webp';
import textureWhite3 from '../../img/rollerblinds/TEXTURE/TEXTURE - WHITE/3.webp';
import textureWhite4 from '../../img/rollerblinds/TEXTURE/TEXTURE - WHITE/4.webp';
import textureAnthracite0 from '../../img/rollerblinds/TEXTURE/TEXTURE - ANTHRACITE/0.webp';
import textureAnthracite1 from '../../img/rollerblinds/TEXTURE/TEXTURE - ANTHRACITE/1.webp';
import textureAnthracite2 from '../../img/rollerblinds/TEXTURE/TEXTURE - ANTHRACITE/2.webp';
import textureAnthracite3 from '../../img/rollerblinds/TEXTURE/TEXTURE - ANTHRACITE/3.webp';
import textureAnthracite4 from '../../img/rollerblinds/TEXTURE/TEXTURE - ANTHRACITE/4.webp';
import textureBrownGrey0 from '../../img/rollerblinds/TEXTURE/TEXTURE - BROWN GREY/0.webp';
import textureBrownGrey1 from '../../img/rollerblinds/TEXTURE/TEXTURE - BROWN GREY/1.webp';
import textureBrownGrey2 from '../../img/rollerblinds/TEXTURE/TEXTURE - BROWN GREY/2.webp';
import textureBrownGrey3 from '../../img/rollerblinds/TEXTURE/TEXTURE - BROWN GREY/3.webp';
import textureBrownGrey4 from '../../img/rollerblinds/TEXTURE/TEXTURE - BROWN GREY/4.webp';

// Texture Collection
export const textureCollection: Product[] = [
  {
    id: "texture-grey-sheer",
    name: "Texture - grey",
    price: 229.99,
    originalPrice: 259.99,
    image: textureGrey0,
    images: [
      textureGrey0,
      textureGrey1,
      textureGrey2,
      textureGrey3,
      textureGrey4
    ],
    features: ["Sheer"],
    colors: 1,
    fabricColor: "#808080",
    collection: "Texture"
  },
  {
    id: "texture-off-white-sheer",
    name: "Texture - off-white",
    price: 229.99,
    originalPrice: 259.99,
    image: textureOffWhite0,
    images: [
      textureOffWhite0,
      textureOffWhite1,
      textureOffWhite2,
      textureOffWhite3,
      textureOffWhite4
    ],
    features: ["Sheer"],
    colors: 1,
    fabricColor: "#F8F8F0",
    collection: "Texture"
  },
  {
    id: "texture-white-sheer",
    name: "Texture - white",
    price: 229.99,
    originalPrice: 259.99,
    image: textureWhite0,
    images: [
      textureWhite0,
      textureWhite1,
      textureWhite2,
      textureWhite3,
      textureWhite4
    ],
    features: ["Sheer"],
    colors: 1,
    fabricColor: "#FFFFFF",
    collection: "Texture"
  },
  {
    id: "texture-anthracite-sheer",
    name: "Texture - anthracite",
    price: 229.99,
    originalPrice: 259.99,
    image: textureAnthracite0,
    images: [
      textureAnthracite0,
      textureAnthracite1,
      textureAnthracite2,
      textureAnthracite3,
      textureAnthracite4
    ],
    features: ["Sheer"],
    colors: 1,
    fabricColor: "#2C3539",
    collection: "Texture"
  },
  {
    id: "texture-brown-grey-sheer",
    name: "Texture - brown grey",
    price: 229.99,
    originalPrice: 259.99,
    image: textureBrownGrey0,
    images: [
      textureBrownGrey0,
      textureBrownGrey1,
      textureBrownGrey2,
      textureBrownGrey3,
      textureBrownGrey4
    ],
    features: ["Sheer"],
    colors: 1,
    fabricColor: "#6B6359",
    collection: "Texture"
  }
]; 