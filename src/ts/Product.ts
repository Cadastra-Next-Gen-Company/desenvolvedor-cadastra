export interface Product {
  id: string;
  name: string;
  price: number;
  parcelamento: Array<number>;
  color: string;
  image: string;
  size: Array<string>;
  date: string;
}

export interface PriceRange {
  label: string;
  min: number;
  max: number;
}


