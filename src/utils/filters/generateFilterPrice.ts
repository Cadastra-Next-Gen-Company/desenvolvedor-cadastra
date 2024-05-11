import { generateFiltersCheckbox } from "./generateFiltersCheckbox"

export function generateFilterPrice() {

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

  const containerFilter = document.getElementById("aside-filters")

  generateFiltersCheckbox({
    listFilter: prices.map(price => ({
      title: price.toPrice === Infinity ?
        `apartir de R$ ${price.fromPrice}`
        :
        `de R$ ${price.fromPrice} até R$ ${price.toPrice}`
    })),
    name: "prices",
    className: "price-checkbox",
    ref: containerFilter,
    title: "Faixa de preço"
  })
}