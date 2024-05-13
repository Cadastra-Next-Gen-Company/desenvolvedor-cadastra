import { Product } from "../../ts/Product";
import { addProductInCart, changeProductInCart, formatedPrice } from "../../utils";

interface CardProduct {
  product: Product
  parent: HTMLElement
  cart?: boolean
}

export function cardProduct({ product, parent, cart }: CardProduct) {

  const cardProductElement = document.createElement("li")
  cardProductElement.classList.add("card-product")

  const imageProductElement = document.createElement("img")
  imageProductElement.classList.add("product-image")
  imageProductElement.src = product.image;
  imageProductElement.alt = product.name;

  const titleProductElement = document.createElement("h2")
  titleProductElement.innerText = product.name
  titleProductElement.classList.add("product-title")

  const priceProductElement = document.createElement("strong")
  priceProductElement.innerText = formatedPrice({ price: product.price })
  priceProductElement.classList.add("product-price")

  const descripitionProductElement = document.createElement("p")
  descripitionProductElement.innerText = `até ${product.parcelamento[0]} de ${formatedPrice({ price: product.parcelamento[1] })}`
  descripitionProductElement.classList.add("product-description")

  const buttonElement = document.createElement("button")
  const areaButtonsProductElement = document.createElement("div")

  if (cart && product.quantity) {
    areaButtonsProductElement.classList.add("product-in-cart-area-button")

    const buttonRemoveProductElement = document.createElement("button")
    buttonRemoveProductElement.classList.add(
      "product-in-cart-button", "product-in-cart-button-remove"
    )
    buttonRemoveProductElement.innerText = "-"
    buttonRemoveProductElement.addEventListener("click", () => changeProductInCart({ action: "remove", product }))

    const quantityProduct = document.createElement("p")
    quantityProduct.innerText = product.quantity.toString()

    const buttonAddProductElement = document.createElement("button")
    buttonAddProductElement.classList.add(
      "product-in-cart-button", "product-in-cart-button-add"
    )
    buttonAddProductElement.innerText = "+"
    buttonAddProductElement.addEventListener("click", () => changeProductInCart({ action: "add", product }))

    areaButtonsProductElement.appendChild(buttonRemoveProductElement)
    areaButtonsProductElement.appendChild(quantityProduct)
    areaButtonsProductElement.appendChild(buttonAddProductElement)
  } else {

    buttonElement.innerText = "comprar"
    buttonElement.classList.add("card-button-sale")
    buttonElement.addEventListener("click", () => addProductInCart({ product }))
  }

  cardProductElement.appendChild(imageProductElement)
  cardProductElement.appendChild(titleProductElement)
  cardProductElement.appendChild(priceProductElement)
  cardProductElement.appendChild(descripitionProductElement)
  if (!cart) {
    cardProductElement.appendChild(buttonElement)
  } else {
    cardProductElement.appendChild(areaButtonsProductElement)
  }

  parent.appendChild(cardProductElement)
}

