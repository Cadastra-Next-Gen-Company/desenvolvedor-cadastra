interface IndicatorQuantity {
  parent: HTMLElement
  quantity: number
}

export function indicatorQuantity({ parent, quantity }: IndicatorQuantity) {
  const quantityElement = document.createElement("div")
  quantityElement.classList.add("cart-quantity-products")

  const textQuantityElement = document.createElement("p")
  textQuantityElement.id = "quantity-cart-products"
  textQuantityElement.innerText = quantity.toString()

  quantityElement.appendChild(textQuantityElement)
  parent.appendChild(quantityElement)

}