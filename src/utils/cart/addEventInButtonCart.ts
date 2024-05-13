import { viewProductsInCart } from "./viewProductsInCart"

export function addEventInCartButton() {
  const button = document.getElementById("button-cart")

  button.addEventListener("click", () => viewProductsInCart())
}