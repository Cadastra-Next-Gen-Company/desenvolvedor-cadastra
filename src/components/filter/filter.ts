interface OptionsFilterProps {
  title: string
}

interface FilterProps {
  parent: HTMLElement
  containerParent: HTMLElement
  title: string
  type: "button" | "checkbox"
  options: Array<OptionsFilterProps>
  className: string
}

export function filter({ title, type, options, className, parent, containerParent }: FilterProps) {
  const detailsElement = document.createElement("details")
  detailsElement.classList.add("details-filter")
  const summaryElement = document.createElement("summary")
  const iconSummaryElement = document.createElement("p")

  iconSummaryElement.innerText = "↓"
  summaryElement.innerText = title

  const containerFilterElement = document.createElement("div")
  containerFilterElement.classList.add("filter-container")

  const listOptionsFilterElement = document.createElement("ul")
  if (type === "checkbox") {
    listOptionsFilterElement.classList.add("filter-checkbox-list")
  } else if (type === "button") {
    listOptionsFilterElement.classList.add("filter-button-list")
  }

  options.forEach(option => {
    const optionFilterElement = document.createElement("li")
    optionFilterElement.classList.add("filter-option")

    if (type === "checkbox") {
      const labelCheckboxElement = document.createElement("label")
      labelCheckboxElement.classList.add("checkbox-label")

      const inputElement = document.createElement("input")
      inputElement.value = option.title
      inputElement.classList.add(className)
      inputElement.type = "checkbox"

      const titleCheckboxElement = document.createElement("p")
      titleCheckboxElement.innerText = option.title

      labelCheckboxElement.appendChild(inputElement)
      labelCheckboxElement.appendChild(titleCheckboxElement)

      optionFilterElement.appendChild(labelCheckboxElement)

      listOptionsFilterElement.appendChild(optionFilterElement)

    } else if (type === "button") {

      const buttonElement = document.createElement("button")
      buttonElement.classList.add(className)
      buttonElement.innerText = option.title

      optionFilterElement.appendChild(buttonElement)
      listOptionsFilterElement.appendChild(optionFilterElement)
    }

    containerFilterElement.appendChild(listOptionsFilterElement)
  })

  summaryElement.appendChild(iconSummaryElement)
  detailsElement.appendChild(summaryElement)
  detailsElement.appendChild(listOptionsFilterElement)

  parent.appendChild(detailsElement)

  if (window.innerWidth >= 768) {
    detailsElement.open = true
    containerParent.style.display = "flex"
  } else {
    detailsElement.open = false
    containerParent.style.display = "none"
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      detailsElement.open = true
      containerParent.style.display = "flex"
    } else {
      detailsElement.open = false
      containerParent.style.display = "none"
    }
  })
}