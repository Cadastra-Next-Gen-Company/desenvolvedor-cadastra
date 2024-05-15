import { filterProducts } from "../../ts/filterProducts"

export function clearFilters() {

  const buttons = document.querySelectorAll(".filter-size")
  const colorCheckboxes = document.querySelectorAll(".filter-colors")
  const priceCheckboxes = document.querySelectorAll(".filter-price")

  buttons.forEach(button => {
    const active = button.classList.contains("active")
    if (active) {
      button.classList.remove("active")
    }
  })

  colorCheckboxes.forEach((checkbox: HTMLInputElement) => {
    if (checkbox) {
      checkbox.checked = false
    }
  })

  priceCheckboxes.forEach((checkbox: HTMLInputElement) => {
    if (checkbox) {
      checkbox.checked = false
    }
  })

  filterProducts()
}