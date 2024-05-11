import { ListProduct } from "../../ts/Product"
import { generateFiltersCheckbox } from "./generateFiltersCheckbox"

export function generateFilterColors({ products }: { products: ListProduct }) {
  const colors: Array<string> = []

  products.forEach(product => {
    const color = product.color
    if (!colors.includes(color)) {
      colors.push(color)
    }
  })

  if (colors.length > 0) {
    const containerFilter = document.getElementById("aside-filters")

    generateFiltersCheckbox({
      listFilter: colors.map(color => ({ title: color })),
      className: "color-checkbox",
      name: "colors",
      ref: containerFilter,
      title: "Cores"
    })
  }

}