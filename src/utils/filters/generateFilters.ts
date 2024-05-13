import { ListProduct } from "../../ts/Product";
import { clearFilters } from "./clearFilters";
import { generateFilterColors } from "./generateFilterColors";
import { generateFilterPrice } from "./generateFilterPrice";
import { generateFilterSize } from "./generateFilterSize";

export function generateFilters({ products }: { products: ListProduct }) {
  const containerFilterElement = document.getElementById("aside-filters")

  const bodyWidth = document.body.clientWidth

  let isMobile = bodyWidth < 768

  generateFilterColors({ products, title: "Cores", parent: containerFilterElement, isMobile })
  generateFilterSize({ products, title: "Tamanhos", parent: containerFilterElement, isMobile })
  generateFilterPrice({ title: "Faixa de preço", parent: containerFilterElement, isMobile })

  if (isMobile) {

    const areaButtonsFilterElement = document.createElement("div")
    areaButtonsFilterElement.classList.add("filter-area-button-mobile")

    const buttonApplyFilterElement = document.createElement("button")
    buttonApplyFilterElement.addEventListener("click", () => {
      const containerFilterElement = document.getElementById("aside-filters")
      containerFilterElement.style.display = "none"
    })
    buttonApplyFilterElement.classList.add("filter-button-apply")
    buttonApplyFilterElement.innerText = "Aplicar"


    const buttonClearFilterElement = document.createElement("button")
    buttonClearFilterElement.addEventListener("click", () => {
      clearFilters({ products })
    })
    buttonClearFilterElement.classList.add("filter-button-clear")
    buttonClearFilterElement.innerText = "Limpar"

    areaButtonsFilterElement.appendChild(buttonApplyFilterElement)
    areaButtonsFilterElement.appendChild(buttonClearFilterElement)

    containerFilterElement.appendChild(areaButtonsFilterElement)


  }

}