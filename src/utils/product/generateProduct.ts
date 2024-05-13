import { cardProduct } from "../../components"
import { ListProduct } from "../../ts/Product"

export function generateCardProducts({ products }: { products: ListProduct }) {
  const containerProducts = document.getElementById("products")
  containerProducts.classList.add("product-grid")

  if (products) {
    products.forEach(product => {
      cardProduct({ product, parent: containerProducts })
    })
  }
}