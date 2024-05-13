interface Options {
  title: string
}

interface ContentFilters {
  parent: HTMLElement
  type: "button" | "checkbox"
  title?: string
  options: Array<Options>
  nameCheckbox?: string
  className: string
}

export function contentFilters({ parent, type, title, options, nameCheckbox, className }: ContentFilters) {

  const containerFilterElement = document.createElement("div")
  containerFilterElement.classList.add("filter-content")

  const titleFilterElement = document.createElement("h2")
  if (title) {
    titleFilterElement.classList.add("filter-title")
    titleFilterElement.innerText = title
  }

  const listOptionsFilterElement = document.createElement("ul")
  if (type === "checkbox") {
    listOptionsFilterElement.classList.add("filter-checkbox-list")
  } else if (type === "button") {
    listOptionsFilterElement.classList.add("filter-button-list")
  }

  options.forEach(option => {
    const filterOptionElement = document.createElement("li")
    filterOptionElement.classList.add("filter-option")

    if (type === "checkbox") {
      const labelCheckboxElement = document.createElement("label")
      labelCheckboxElement.classList.add("checkbox-label")

      const inputElement = document.createElement("input")
      inputElement.name = nameCheckbox
      inputElement.value = option.title
      inputElement.classList.add(className)
      inputElement.type = "checkbox"

      const titleCheckboxElement = document.createElement("p")
      titleCheckboxElement.innerText = option.title

      labelCheckboxElement.appendChild(inputElement)
      labelCheckboxElement.appendChild(titleCheckboxElement)

      filterOptionElement.appendChild(labelCheckboxElement)

      listOptionsFilterElement.appendChild(filterOptionElement)

    } else if (type === "button") {

      const buttonElement = document.createElement("button")
      buttonElement.classList.add(className)
      buttonElement.innerText = option.title

      filterOptionElement.appendChild(buttonElement)
      listOptionsFilterElement.appendChild(filterOptionElement)
    }

    containerFilterElement.appendChild(titleFilterElement)
    containerFilterElement.appendChild(listOptionsFilterElement)
  })

  parent.appendChild(containerFilterElement)
}

