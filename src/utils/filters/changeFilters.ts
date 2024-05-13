import { classButtonSizeActive } from "../../config"
import { ListProduct } from "../../ts/Product"
import { filterProducts } from "./filterProducts"

export function changeFilters({ products }: { products: ListProduct }) {
  const buttons = document.querySelectorAll(".button-size")
  const colorCheckboxes = document.querySelectorAll(".color-checkbox")
  const priceCheckboxes = document.querySelectorAll(".price-checkbox")

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const active = button.classList.contains(classButtonSizeActive)

      if (active) {
        button.classList.remove(classButtonSizeActive)
      } else {
        button.classList.add(classButtonSizeActive)
      }
      filterProducts({ products })
    })
  })

  colorCheckboxes.forEach((checkbox: HTMLInputElement) => {
    checkbox.addEventListener("change", () => {
      filterProducts({ products })
    })
  })

  priceCheckboxes.forEach((checkbox: HTMLInputElement) => {
    checkbox.addEventListener("change", () => {
      priceCheckboxes.forEach((otherCheckbox: HTMLInputElement) => {
        if (otherCheckbox !== checkbox) {
          otherCheckbox.checked = false
        }
      })
      filterProducts({ products })
    })
  })

}