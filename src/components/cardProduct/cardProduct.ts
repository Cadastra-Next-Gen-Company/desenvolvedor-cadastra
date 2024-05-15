import { formattedPrice } from "../../utils";
import { button } from "../button/button";
import { ProductProps } from "../types";

interface CardProductsProps {
  product: ProductProps
  parent: HTMLElement
}

export function cardProduct({ product, parent }: CardProductsProps) {
  const cardProductElement = document.createElement("div")
  cardProductElement.classList.add("product-card")
  cardProductElement.id = product.id
  cardProductElement.dataset.product = JSON.stringify(product);

  const imageProductElement = document.createElement("img")
  imageProductElement.src = product.image
  imageProductElement.alt = `Foto do protudo ${product.name} na cor ${product.color}`
  imageProductElement.classList.add("product-image")

  const nameProductElement = document.createElement("h1")
  nameProductElement.innerText = product.name
  nameProductElement.classList.add("product-name")

  const priceProductElement = document.createElement("strong")
  priceProductElement.innerText = formattedPrice(product.price)

  const installmentProductElement = document.createElement("p")
  installmentProductElement.innerText = `até ${product.parcelamento[0]}x de ${formattedPrice(product.parcelamento[1])}`

  cardProductElement.appendChild(imageProductElement)
  cardProductElement.appendChild(nameProductElement)
  cardProductElement.appendChild(priceProductElement)
  cardProductElement.appendChild(installmentProductElement)

  button({
    className: "product-button-sale",
    parent: cardProductElement,
    text: "Comprar",
    onClick: () => console.log(product)
  })

  parent.appendChild(cardProductElement)

}