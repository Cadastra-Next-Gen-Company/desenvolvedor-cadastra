import { cardProduct } from "../../components"
import { localStorageProductsKey } from "../../config/localStorageKeys"
import { ListProduct, Product } from "../../ts/Product"
import { getItemLocalStorage, setItemLocalStorage } from "../localStorage"
import { changeQuantityCartProducts } from "./changeQuantityCartProducts"

interface ChangeProductInCart {
  action: "remove" | "add"
  product: Product
}
export function changeProductInCart({ action, product }: ChangeProductInCart) {
  const response = getItemLocalStorage(localStorageProductsKey)
  const productsLocalStorage: ListProduct = []

  if (response) {
    productsLocalStorage.push(...response)
  }
  const indexProduct = productsLocalStorage.findIndex(item => item.id === product.id)

  if (action === "remove") {
    productsLocalStorage[indexProduct].quantity--

    if (productsLocalStorage[indexProduct].quantity < 1) {
      productsLocalStorage.splice(indexProduct, 1)
    }
  } else if (action === "add") {
    productsLocalStorage[indexProduct].quantity++
  }

  setItemLocalStorage({ key: localStorageProductsKey, value: productsLocalStorage })

  const containerProductsInCartElement = document.getElementById("products-in-cart")
  containerProductsInCartElement.innerHTML = ""

  const products = getItemLocalStorage(localStorageProductsKey)

  if (products.length > 0) {
    products.map((product: Product) => {
      cardProduct({
        parent: containerProductsInCartElement,
        cart: true,
        product: product
      })
    })

    changeQuantityCartProducts(products.length)
  } else {
    const messageNotExisteProductInCartElement = document.createElement("p")
    messageNotExisteProductInCartElement.innerText = "Todos os produtos foram removidos do carrinho"

    containerProductsInCartElement.classList.remove("product-grid")
    containerProductsInCartElement.appendChild(messageNotExisteProductInCartElement)
  }

}