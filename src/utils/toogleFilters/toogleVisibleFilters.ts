import { clearFilters } from "../filters"

interface ToogleVisibleFiltersProps {
  action: "close" | "open"
  buttonId: string
  title?: string
  clearFilter?: boolean
}

export function toogleVisibleFilters({ action, buttonId, title, clearFilter }: ToogleVisibleFiltersProps) {
  const buttonOpenFiltersElement = document.getElementById(buttonId)
  const containerFiltersElement = document.getElementById("aside")
  const titleContainerFiltersElement = document.getElementById("aside-title")

  if (title) {
    titleContainerFiltersElement.innerText = title
  }

  buttonOpenFiltersElement.addEventListener("click", () => {
    if (action === "close") {
      containerFiltersElement.style.display = "none"
    } else {
      containerFiltersElement.style.display = "flex"
    }
    if (clearFilter) {
      clearFilters()
    }
  })
}