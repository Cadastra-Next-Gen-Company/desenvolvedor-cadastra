import { ListProductsProps, ProductProps } from "../../components"
import { localStorageProductsKey } from "../../config/localStorageKey"
import { getItemLocalStorage, setItemLocalStorage } from "../localStorage"

export function addProductInCart({ product }: { product: ProductProps }) {
  try {
    const response = getItemLocalStorage(localStorageProductsKey)
    const productsLocalStorage: ListProductsProps = []

    if (response) {
      productsLocalStorage.push(...response)
    }
    const indexExistProduct = productsLocalStorage.findIndex(item => item.id === product.id)

    if (indexExistProduct !== -1) {
      productsLocalStorage[indexExistProduct].quantity++

    } else {
      productsLocalStorage.push({
        ...product,
        quantity: 1
      })
    }

    setItemLocalStorage({ key: localStorageProductsKey, value: productsLocalStorage })

  } catch (error) {
  }
}