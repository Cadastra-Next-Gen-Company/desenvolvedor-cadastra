export interface ProductProps {
  id: string;
  name: string;
  price: number;
  parcelamento: Array<number>;
  color: string;
  image: string;
  size: Array<string>;
  date: string;
  quantity?: number
}

export type ListProductsProps = Array<ProductProps>