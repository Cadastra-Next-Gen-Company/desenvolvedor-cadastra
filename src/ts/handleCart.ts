import { generateCart } from "./generateCart"

export function handleCart() {
  const buttonCartElement = document.getElementById("button-cart")

  buttonCartElement.addEventListener("click", () => generateCart())

}