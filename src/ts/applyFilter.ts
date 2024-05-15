import { toogleVisibleFilters } from "../utils"

export function applyFilter() {
  toogleVisibleFilters({
    action: "close",
    buttonId: "apply-filter"
  })
}