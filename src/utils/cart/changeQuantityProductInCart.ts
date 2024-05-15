import { ListProductsProps, ProductProps } from "../../components";
import { localStorageProductsKey } from "../../config/localStorageKey";
import { getItemLocalStorage, setItemLocalStorage } from "../localStorage";

interface ChangeQuantityProductInCart {
  product: ProductProps
  action: "remove" | "add"
}

export function changeQuantityProductInCart({ product, action }: ChangeQuantityProductInCart) {

  const containerProductsInCartElement = document.getElementById("products-in-cart")

  const productInCartElement = containerProductsInCartElement.querySelector(`#cart-product-${product.id}`)

  const quantityElement = productInCartElement.querySelector("#card-product-quantity")

  const listProductsInLocalStorage: ListProductsProps = getItemLocalStorage(localStorageProductsKey)

  const indexProduct = listProductsInLocalStorage.findIndex(productLocalStorage => productLocalStorage.id === product.id)

  if (action === "remove") {
    if (product.quantity > 1) {
      product.quantity--;
      quantityElement.textContent = product.quantity.toString();
      listProductsInLocalStorage[indexProduct].quantity = product.quantity

    } else {
      product.quantity = 0;
      containerProductsInCartElement.removeChild(productInCartElement);

      listProductsInLocalStorage.splice(indexProduct, 1)
    }
  } else if (action === "add") {
    product.quantity++;
    quantityElement.textContent = product.quantity.toString();
    listProductsInLocalStorage[indexProduct].quantity = product.quantity
  }

  setItemLocalStorage({ key: localStorageProductsKey, value: listProductsInLocalStorage })

}