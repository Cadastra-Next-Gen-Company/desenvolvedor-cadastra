import { listProducts } from "../components";
import { getProducts } from "../utils";

export async function getMoreProducts() {

  const productsElement = document.querySelectorAll(".product-card")
  const response = await getProducts(productsElement.length)

  const { products, hasMore } = response

  if (products.length > 0) {
    const productsContainerElement = document.getElementById("list-products")
    listProducts({ products, parent: productsContainerElement })
  }

  if (!hasMore) {
    const buttonProductElement = document.getElementById("more-products")
    buttonProductElement.style.display = "none"
  }
}