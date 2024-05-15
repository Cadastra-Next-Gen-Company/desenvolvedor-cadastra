
import { cardProduct } from "../cardProduct/cardProduct";
import { ListProductsProps } from "../types";

interface ListProductsComponentProps {
  products: ListProductsProps
  parent: HTMLElement
  inCart?: boolean
}

export function listProducts({ products, parent, inCart }: ListProductsComponentProps) {

  products.forEach(product => {
    cardProduct({ product, parent, inCart })
  })
}