import { ListProductsProps, listProducts } from "../components"
import { localStorageProductsKey } from "../config/localStorageKey"
import { getItemLocalStorage } from "../utils"
import { generateCart } from "./generateCart"

export function handleCart() {
  const buttonCartElement = document.getElementById("button-cart")
  const productsInCart: ListProductsProps = getItemLocalStorage(localStorageProductsKey)

  if (productsInCart.length > 0) {

    const contentQuantityProductsInCartElement = document.createElement("div")
    contentQuantityProductsInCartElement.id = "indicator-cart"
    contentQuantityProductsInCartElement.innerText = productsInCart.length.toString()

    buttonCartElement.appendChild(contentQuantityProductsInCartElement)
  }

  buttonCartElement.addEventListener("click", () => generateCart())

}