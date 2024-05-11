import { classButtonSizeActive } from "../../config"
import { ListProduct } from "../../ts/Product"
import { filterProducts } from "./filterProducts"

export function clearFilters({ products }: { products: ListProduct }) {
  const containerProducts = document.getElementById("products")
  const colorCheckboxes = document.querySelectorAll(".color-checkbox")
  const priceCheckbox = document.querySelectorAll(".price-checkbox")
  const sizesButton = document.querySelectorAll(`.${classButtonSizeActive}`)

  colorCheckboxes.forEach((checkbox: HTMLInputElement) => {
    if (checkbox.checked) {
      checkbox.checked = false
    }
  })

  sizesButton.forEach((button: HTMLButtonElement) => {
    if (button.classList.contains(classButtonSizeActive)) {
      button.classList.remove(classButtonSizeActive)
    }
  })

  priceCheckbox.forEach((checkbox: HTMLInputElement) => {
    if (checkbox.checked) {
      checkbox.checked = false
    }
  })
  containerProducts.innerHTML = ""
  console.log("LIMPANDO TUDO", products)
  filterProducts({ products })

}