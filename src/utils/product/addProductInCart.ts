
import { resultAction } from "../../components";
import { localStorageProductsKey } from "../../config/localStorageKeys";
import { ListProduct, Product } from "../../ts/Product";
import { changeQuantityCartProducts, quantityProductInCart } from "../cart";
import { getItemLocalStorage, setItemLocalStorage } from "../localStorage";

export async function addProductInCart({ product }: { product: Product }) {

  try {
    const response = getItemLocalStorage(localStorageProductsKey)
    const productsLocalStorage: ListProduct = []

    if (response) {
      productsLocalStorage.push(...response)
    }
    const indexExistProduct = productsLocalStorage.findIndex(item => item.id === product.id)

    if (indexExistProduct !== -1) {
      productsLocalStorage[indexExistProduct].quantity++

    } else {

      if (productsLocalStorage.length === 0) {
        quantityProductInCart(1)
      }
      productsLocalStorage.push({
        ...product,
        quantity: 1
      })
    }

    setItemLocalStorage({ key: localStorageProductsKey, value: productsLocalStorage })

    changeQuantityCartProducts(productsLocalStorage.length)

    resultAction({
      message: "Produto adicionado ao carrinho com sucesso!",
      type: "success"
    })

  } catch (error) {
    resultAction({
      message: "Erro ao adicionar produto ao carrinho!",
      type: "error"
    })
  }
}