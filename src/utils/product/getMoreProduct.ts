import { cardProduct } from "../../components";
import { getProducts } from "./getProduct";

export function getMoreProduct() {

  const containerElement = document.getElementById("products-container")
  const buttonMoreProductElement = document.createElement("button")
  buttonMoreProductElement.classList.add("button-more-product")
  buttonMoreProductElement.innerText = "Carregar mais"

  buttonMoreProductElement.addEventListener("click", async () => {

    const currentProductsElement = document.querySelectorAll(".card-product")

    const products = await getProducts(currentProductsElement.length)
    const containerProducts = document.getElementById("products")

    if (products) {
      products.forEach(product => {
        cardProduct({ product, parent: containerProducts })
      })
    }
  })

  containerElement.appendChild(buttonMoreProductElement)

}