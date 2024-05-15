import { addProductInCart, formattedPrice } from "../../utils";
import { changeQuantityProductInCart } from "../../utils/cart";
import { button } from "../button/button";
import { ProductProps } from "../types";

interface CardProductsProps {
  product: ProductProps
  parent: HTMLElement
  inCart?: boolean
}

export function cardProduct({ product, parent, inCart }: CardProductsProps) {
  const cardProductElement = document.createElement("div")
  cardProductElement.classList.add("product-card")
  cardProductElement.id = inCart ? `cart-product-${product.id}` : product.id
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

  const areaButtonElement = document.createElement("div")
  areaButtonElement.classList.add("product-area-buttons")

  if (inCart && product.quantity) {

    button({
      className: "product-button-remove",
      parent: areaButtonElement,
      text: "-",
      onClick: () => changeQuantityProductInCart({ product, action: "remove" })
    })

    const quantityProduct = document.createElement("p")
    quantityProduct.innerText = product.quantity.toString()
    quantityProduct.id = "card-product-quantity"
    areaButtonElement.appendChild(quantityProduct)

    button({
      className: "product-button-add",
      parent: areaButtonElement,
      text: "+",
      onClick: () => changeQuantityProductInCart({ product, action: "add" })
    })

  } else {

    button({
      className: "product-button-sale",
      parent: areaButtonElement,
      text: "Comprar",
      onClick: () => addProductInCart({ product })
    })

  }

  cardProductElement.appendChild(imageProductElement)
  cardProductElement.appendChild(nameProductElement)
  cardProductElement.appendChild(priceProductElement)
  cardProductElement.appendChild(installmentProductElement)
  cardProductElement.appendChild(areaButtonElement)

  parent.appendChild(cardProductElement)

}