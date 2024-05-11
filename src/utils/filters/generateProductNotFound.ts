import { ListProduct } from "../../ts/Product"
import { clearFilters } from "./clearFilters"

export function generateProductNotFound({ products }: { products: ListProduct }) {
  const containerProducts = document.getElementById("products")
  containerProducts.classList.remove("product-grid")

  const cardMessage = document.createElement("div")
  cardMessage.classList.add("card-message-not-found-product")

  const titleCardMessage = document.createElement('p')
  titleCardMessage.innerText = "Nenhum produto corresponde ao filtro!"

  const buttonClearFilter = document.createElement('button')
  buttonClearFilter.innerText = "Limpar Filtro"
  buttonClearFilter.addEventListener("click", () => {
    console.log("BUTON", products)
    clearFilters({ products })
  })

  cardMessage.appendChild(titleCardMessage)
  cardMessage.appendChild(buttonClearFilter)

  containerProducts.appendChild(cardMessage)

}