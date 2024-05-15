import { listProducts } from "../components";
import { getProducts } from "../utils/products/getProducts";

export async function generateProducts() {
  const products = await getProducts()

  if (products.length > 0) {
    const productsContainerElement = document.getElementById("list-products")

    listProducts({ products, parent: productsContainerElement })
  }

}