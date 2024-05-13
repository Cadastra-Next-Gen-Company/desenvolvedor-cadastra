import { productsInCart, resultAction } from "../../components"
import { localStorageProductsKey } from "../../config/localStorageKeys"
import { ListProduct } from "../../ts/Product"
import { getItemLocalStorage } from "../localStorage"

export function viewProductsInCart() {

  const response: ListProduct = getItemLocalStorage(localStorageProductsKey)

  if (response.length > 0) {
    productsInCart({ products: response })
  } else {
    resultAction({
      message: "Ainda não adicionou produtos no carrinho!",
      type: "success"
    })
  }
}