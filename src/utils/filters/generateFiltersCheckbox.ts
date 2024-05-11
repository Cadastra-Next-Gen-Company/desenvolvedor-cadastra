import { GenerateFilters } from "../../ts/GenerateFilters"

export function generateFiltersCheckbox({ ref, title, className, listFilter, name }: GenerateFilters) {
  const containerFilter = document.createElement("div")
  containerFilter.classList.add("filter-checkbox")

  const titleFilter = document.createElement("h2")
  titleFilter.classList.add("filter-title")
  titleFilter.innerText = title

  const listOptionsFilter = document.createElement("ul")
  listOptionsFilter.classList.add("filter-checkbox-list")

  listFilter.forEach(filter => {

    const filterOption = document.createElement("li")
    filterOption.classList.add("filter-option")

    const labelCheckbox = document.createElement("label")
    labelCheckbox.classList.add("checkbox-label")

    const input = document.createElement("input")
    input.name = name
    input.value = filter.title
    input.classList.add(className)
    input.type = "checkbox"

    const titleCheckbox = document.createElement("p")
    titleCheckbox.innerText = filter.title

    labelCheckbox.appendChild(input)
    labelCheckbox.appendChild(titleCheckbox)

    filterOption.appendChild(labelCheckbox)

    listOptionsFilter.appendChild(filterOption)

    containerFilter.appendChild(titleFilter)
    containerFilter.appendChild(listOptionsFilter)

    ref.appendChild(containerFilter)

  })

}