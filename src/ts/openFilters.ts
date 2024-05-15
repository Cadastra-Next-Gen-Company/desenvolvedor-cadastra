import { toogleVisibleFilters } from "../utils";

export function openFilters() {
  toogleVisibleFilters({
    action: "open",
    buttonId: "button-open-filter",
    title: "Filtrar"
  })
}