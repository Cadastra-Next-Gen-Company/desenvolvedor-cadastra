import { clearFilters } from "../utils/filters"

export function clearFiltersInActionsAside() {
  const buttonClearElement = document.getElementById("clear-filter")
  buttonClearElement.addEventListener("click", () => clearFilters())
}