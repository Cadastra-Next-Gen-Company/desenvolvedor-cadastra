import { classButtonSizeActive } from "../../config"
import { ListProduct } from "../../ts/Product"
import { generateCardProducts } from "../product"

export function filterProducts({ products }: { products: ListProduct }): ListProduct {
  const containerProducts = document.getElementById("products")
  const colorCheckboxes = document.querySelectorAll(".color-checkbox")
  const priceCheckbox = document.querySelectorAll(".price-checkbox")
  const sizesButton = document.querySelectorAll(`.${classButtonSizeActive}`)

  const colors: Array<string> = []
  const sizes: Array<string> = []
  let fromPrice: number | null;
  let toPrice: number | null;

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

  priceCheckbox.forEach((checkbox: HTMLInputElement) => {
    if (checkbox.checked) {
      const value = checkbox.value
      const regex = /R\$\s*(\d+)\s*até\s*R\$\s*(\d+)/;
      const match = value.match(regex);

      if (match) {
        const [_, fromPriceString, toPriceString] = match

        if (fromPriceString && toPriceString) {
          fromPrice = parseInt(fromPriceString)
          toPrice = parseInt(toPriceString)
        }
      } else {
        if (value === "apartir de R$ 500") {
          fromPrice = 500
          toPrice = Infinity
        } else {
          fromPrice = null
          toPrice = null
        }
      }
    }
  })

  const filterColor = products.filter(product => {
    if (colors.length > 0) {
      return colors.includes(product.color)
    } else {
      return true
    }
  })

  const filterSize = filterColor.filter(product => {
    if (sizes.length > 0) {
      return product.size.some(size => sizes.includes(size))
    } else {
      return true
    }
  })

  const filterPrice = filterSize.filter(product => {
    if (fromPrice > -1 && toPrice > fromPrice) {
      return product.price >= fromPrice && product.price <= toPrice
    } else {
      return true
    }
  })

  containerProducts.innerHTML = ""
  generateCardProducts({ products: filterPrice })
  return filterSize
}