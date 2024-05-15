import { changeFilters } from "./changeFilters";
import { closeFilters } from "./closeFilters";
import { generateFilters } from "./generateFilters";
import { generateProducts } from "./generateProducts";
import { openFilters } from "./openFilters";

async function main() {
  await generateProducts()
  generateFilters()
  openFilters()
  closeFilters()
  changeFilters()
}

document.addEventListener("DOMContentLoaded", main);
