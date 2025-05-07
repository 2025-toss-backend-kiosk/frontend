// src/main/data/products.ts
import americano     from "../images/mega_ice.png";
import cookiefrappe  from "../images/mega_icecookie.png";
import honeyblack    from "../images/mega_iceblack.png";
import hamncheese    from "../images/mega_sand.png";
import macadamia     from "../images/mega_cookie.png";
import smorecookie   from "../images/mega_choco.png";

export type ProductItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  soldout?: boolean;
};

export type ProductData = {
  [key: string]: ProductItem[];
};

export const productData: ProductData = {
  coffee: [
    { id: "americano",    name: "아메리카노",       price: 1500, image: americano },
  ],
  noncoffee: [
    { id: "cookiefrappe", name: "쿠키 프라페",       price: 2200, image: cookiefrappe },
    { id: "honeyblack",   name: "허니자몽블랙티",    price: 3700, image: honeyblack, soldout: true },
  ],
  dessert: [
    { id: "hamncheese",   name: "햄앤치즈샌드",      price: 2000, image: hamncheese },
    { id: "macadamia",    name: "마카다미아 쿠키",   price: 2000, image: macadamia, soldout: true },
    { id: "smorecookie",  name: "초코스모어쿠키",    price: 2900, image: smorecookie },
  ],
  md: [],
};