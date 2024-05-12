
import { resultAction } from "../../components";
import { localStorageProductsKey } from "../../config/localStorageKeys";
import { Product } from "../../ts/Product";
import { getItemLocalStorage, setItemLocalStorage } from "../localStorage";

interface ProductCart extends Product {
  quantity: number
}

type ListProductCart = Array<ProductCart>

export async function addProductInCart({ product }: { product: Product }) {

  try {
    const response = getItemLocalStorage(localStorageProductsKey)
    const productsLocalStorage: ListProductCart = []

    if (response) {
      productsLocalStorage.push(response)
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