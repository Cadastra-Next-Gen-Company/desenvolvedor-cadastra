import { applyFilter } from "./applyFilter";
import { changeFilters } from "./changeFilters";
import { clearFiltersInActionsAside } from "./clearFiltersInActionsAside";
import { closeFilters } from "./closeFilters";
import { generateFilters } from "./generateFilters";
import { generateProducts } from "./generateProducts";
import { handleCart } from "./handleCart";
import { openFilters } from "./openFilters";

async function main() {
  await generateProducts()
  generateFilters()
  openFilters()
  closeFilters()
  changeFilters()
  clearFiltersInActionsAside()
  applyFilter()
  handleCart()
}

document.addEventListener("DOMContentLoaded", main);
