import { button, listProducts } from "../components";
import { getProducts } from "../utils/products/getProducts";
import { getMoreProducts } from "./getMoreProducts";

export async function generateProducts() {
  const response = await getProducts()
  const { products } = response

  if (products.length > 0) {
    const productsContainerElement = document.getElementById("list-products")
    const containerPageElement = document.getElementById("content-page")

    listProducts({ products, parent: productsContainerElement })

    button({
      className: "button-more-products",
      id: "more-products",
      onClick: () => getMoreProducts(),
      parent: containerPageElement,
      text: "Carregar mais"
    })
  }

}