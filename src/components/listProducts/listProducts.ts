
import { cardProduct } from "../cardProduct/cardProduct";
import { ListProductsProps } from "../types";

interface ListProductsComponentProps {
  products: ListProductsProps
  parent: HTMLElement
}

export function listProducts({ products, parent }: ListProductsComponentProps) {

  products.forEach(product => {
    cardProduct({ product, parent })
  })
}