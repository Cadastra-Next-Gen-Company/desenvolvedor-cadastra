import { contentFilters } from "../../components"
import { ListProduct } from "../../ts/Product"

interface GenerateFilterColors {
  products: ListProduct
  parent: HTMLElement
  isMobile: boolean
  title: string
}

export function generateFilterColors({ products, parent, isMobile, title }: GenerateFilterColors) {
  const colors: Array<string> = []

  products.forEach(product => {
    const color = product.color
    if (!colors.includes(color)) {
      colors.push(color)
    }
  })

  const details = document.createElement("details")
  const summary = document.createElement("summary")
  const iconSummary = document.createElement("p")
  
  iconSummary.innerText = "↓"
  summary.innerText = title
  summary.appendChild(iconSummary)

  if (colors.length > 0) {
    contentFilters({
      className: "color-checkbox",
      parent: isMobile ? details : parent,
      options: colors.map(color => ({ title: color })),
      type: "checkbox",
      nameCheckbox: "colors",
      title: !isMobile && title
    })
  }

  if (isMobile) {
    details.appendChild(summary)
    parent.appendChild(details)
  }
}