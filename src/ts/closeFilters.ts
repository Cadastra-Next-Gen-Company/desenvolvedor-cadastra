import { toogleVisibleFilters } from "../utils";

export function closeFilters() {

  toogleVisibleFilters({
    action: "close",
    buttonId: "button-close-filter"
  })

}