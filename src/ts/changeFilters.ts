import { filterProducts } from "./filterProducts"

export function changeFilters() {
  const buttons = document.querySelectorAll(".filter-size")
  const colorCheckboxes = document.querySelectorAll(".filter-colors")
  const priceCheckboxes = document.querySelectorAll(".filter-price")

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const active = button.classList.contains("active")

      if (active) {
        button.classList.remove("active")
      } else {
        button.classList.add("active")
      }

      buttons.forEach(disabledButtons => {
        if (button !== disabledButtons) {
          disabledButtons.classList.remove("active")
        }
      })
      filterProducts()
    })
  })

  colorCheckboxes.forEach((checkbox: HTMLInputElement) => {
    checkbox.addEventListener("change", () => {
      colorCheckboxes.forEach((disabledCheckbox: HTMLInputElement) => {
        if (disabledCheckbox !== checkbox) {
          disabledCheckbox.checked = false
        }
      })
      filterProducts()
    })
  })

  priceCheckboxes.forEach((checkbox: HTMLInputElement) => {
    checkbox.addEventListener("change", () => {
      priceCheckboxes.forEach((disabledCheckbox: HTMLInputElement) => {
        if (disabledCheckbox !== checkbox) {
          disabledCheckbox.checked = false
        }
      })
      filterProducts()
    })
  })

}