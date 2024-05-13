import { contentFilters } from "../../components"
import { ListProduct } from "../../ts/Product"

interface GenerateFilterColors {
  parent: HTMLElement
  isMobile: boolean
  title: string
}

export function generateFilterColors({ parent, isMobile, title }: GenerateFilterColors) {
  const colors: Array<string> = [
    "Amarelo",
    "Azul",
    "Branco",
    "Cinza",
    "Laranja",
    "Verde",
    "Vermelho",
    "Preto",
    "Rosa",
    "Vinho"
  ]

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