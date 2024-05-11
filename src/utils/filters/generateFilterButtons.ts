import { GenerateFilters } from "../../ts/GenerateFilters"

export function generateFilterButtons({ ref, title, listFilter }: GenerateFilters) {

  const containerFilter = document.createElement("div")
  const titleFilter = document.createElement("h2")
  titleFilter.classList.add("filter-title")
  titleFilter.innerText = title

  const listOptionsFilter = document.createElement("ul")
  listOptionsFilter.classList.add("filter-sizes-list")

  listFilter.forEach(option => {
    const filterOption = document.createElement("li")
    filterOption.classList.add("filter-option")

    const button = document.createElement("button")
    button.classList.add("button-size")
    button.innerText = option.title

    filterOption.appendChild(button)
    listOptionsFilter.appendChild(filterOption)
  })

  containerFilter.appendChild(titleFilter)
  containerFilter.appendChild(listOptionsFilter)

  ref.appendChild(containerFilter)

}