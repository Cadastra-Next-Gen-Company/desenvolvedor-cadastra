import { ListProductsProps, listProducts, modal, modalResultMessage } from "../components";
import { localStorageProductsKey } from "../config/localStorageKey";
import { getItemLocalStorage } from "../utils";

export function generateCart() {
  const products: ListProductsProps = getItemLocalStorage(localStorageProductsKey)

  if (products.length > 0) {

    const listProductsElements = document.createElement("div")
    listProductsElements.classList.add("list-products-grid")
    listProducts({
      parent: listProductsElements,
      products: products
    })

    modal({
      children: listProductsElements,
      title: "Produtos no carrinho"
    })
  } else {
    modalResultMessage({
      description: "Nenhum produto foi adicionado ao carrinho",
      title: "Produtos no carrinho"
    })
  }

}