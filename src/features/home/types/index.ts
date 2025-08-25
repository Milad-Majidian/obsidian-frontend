export type ProductHotspot = {
  id: number;
  name: string;
  price: string;
  x: number;
  y: number;
  link?: string;
  image?: string;
};

export type SliderImage = {
  id: number;
  imageSrc: string;
  alt: string;
  productHotspot: ProductHotspot[];
};

export type ActiveProduct = {
  id: number;
  name: string;
  price: string;
  x: number;
  y: number;
  link?: string;
  image?: string;
  slideId: number;
};