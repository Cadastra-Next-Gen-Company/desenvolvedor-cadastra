import { classButtonSizeActive } from "../../config"
import { ListProduct } from "../../ts/Product"
import { generateCardProducts } from "../product"

export function filterProducts({ products }: { products: ListProduct }): ListProduct {
  const containerProducts = document.getElementById("products")
  const colorCheckboxes = document.querySelectorAll(".color-checkbox")
  const sizesButton = document.querySelectorAll(`.${classButtonSizeActive}`)

  const colors: Array<string> = []
  const sizes: Array<string> = []

  colorCheckboxes.forEach((checkbox: HTMLInputElement) => {
    if (checkbox.checked) {
      colors.push(checkbox.value)
    }
  })

  sizesButton.forEach((button: HTMLButtonElement) => {
    if (button.classList.contains(classButtonSizeActive)) {
      sizes.push(button.innerText)
    }
  })

  const filterColor = products.filter(product => colors.includes(product.color))
  const filterProductColors = filterColor.length > 0 ? filterColor : products

  const filterSize = filterProductColors.filter(product => {
    if (sizes.length > 0) {
      return product.size.some(size => sizes.includes(size))
    } else {
      return true
    }
  }
  )
  containerProducts.innerHTML = ""
  generateCardProducts({ products: filterSize })
  return filterSize
}