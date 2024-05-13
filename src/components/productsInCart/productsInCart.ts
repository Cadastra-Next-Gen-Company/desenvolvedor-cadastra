import { ListProduct, Product } from "../../ts/Product";
import { cardProduct } from "../cardProduct/cardProduct";
import { modal } from "../modal/modal";

export function productsInCart({ products }: { products: ListProduct }) {
  const productsElement = document.createElement("ul")
  productsElement.classList.add("products-in-cart", "products", "product-grid")

  products.map((product: Product) => {
    cardProduct({
      parent: productsElement,
      cart: true,
      product: product
    })
  })

  modal({
    children: productsElement,
    title: "Produtos no carrinho"
  })
}