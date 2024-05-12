import { indicatorQuantity } from "../../components"
import { localStorageProductsKey } from "../../config/localStorageKeys"
import { ListProduct } from "../../ts/Product"
import { getItemLocalStorage } from "../localStorage"

export function quantityProductInCart(quantity?: number) {
  const buttonCart = document.getElementById("button-cart")

  if (quantity) {
    indicatorQuantity({
      parent: buttonCart,
      quantity: quantity
    })
  } else {
    const products: ListProduct = getItemLocalStorage(localStorageProductsKey)

    if (products) {
      indicatorQuantity({
        parent: buttonCart,
        quantity: products.length
      })
    }
  }

}