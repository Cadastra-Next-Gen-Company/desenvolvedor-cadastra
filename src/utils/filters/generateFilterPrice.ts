import { contentFilters } from "../../components"
import { ListProduct } from "../../ts/Product"


interface GenerateFilterPrice {
  parent: HTMLElement
  isMobile: boolean
  title: string
}

export function generateFilterPrice({ parent, isMobile, title }: GenerateFilterPrice) {

  const prices = [
    {
      fromPrice: 0,
      toPrice: 50
    },
    {
      fromPrice: 51,
      toPrice: 150
    },
    {
      fromPrice: 151,
      toPrice: 300
    },
    {
      fromPrice: 301,
      toPrice: 500
    },
    {
      fromPrice: 500,
      toPrice: Infinity
    },
  ]

  const details = document.createElement("details")
  const summary = document.createElement("summary")
  const iconSummary = document.createElement("p")
  
  iconSummary.innerText = "↓"
  summary.innerText = title
  summary.appendChild(iconSummary)

  contentFilters({
    className: "price-checkbox",
    nameCheckbox: "prices",
    options: prices.map(price => ({
      title: price.toPrice === Infinity ?
        `apartir de R$ ${price.fromPrice}`
        :
        `de R$ ${price.fromPrice} até R$ ${price.toPrice}`
    })),
    type: "checkbox",
    parent: isMobile ? details : parent,
    title: !isMobile && title,
  })

  if (isMobile) {
    details.appendChild(summary)
    parent.appendChild(details)
  }
}