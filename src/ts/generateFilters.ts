import { filter } from "../components"

export function generateFilters() {

  const contentFiltersElement = document.getElementById("filters")
  const containerFiltersElement = document.getElementById("aside")

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
    "Vinho",
  ]

  const sizes: Array<string> = [
    "P", "M", "G", "GG", "U",
    "36", "38", "40", "44", "46"
  ]

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

  filter({
    className: "filter-colors",
    options: colors.map(color => ({
      title: color
    })),
    type: "checkbox",
    title: "Cores",
    parent: contentFiltersElement,
    containerParent: containerFiltersElement
  })

  filter({
    className: "filter-size",
    options: sizes.map(size => ({
      title: size
    })),
    type: "button",
    title: "Tamanho",
    parent: contentFiltersElement,
    containerParent: containerFiltersElement
  })

  filter({
    className: "filter-price",
    options: prices.map(price => ({
      title: price.toPrice === Infinity ?
        `apartir de R$ ${price.fromPrice}`
        :
        `de R$ ${price.fromPrice} até R$ ${price.toPrice}`
    })),
    type: "checkbox",
    title: "Faixa de preço",
    parent: contentFiltersElement,
    containerParent: containerFiltersElement
  })


}