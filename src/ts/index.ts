import { changeFilters } from "./changeFilters";
import { generateFilters } from "./generateFilters";
import { generateProducts } from "./generateProducts";
import { openFilters } from "./openFilters";

async function main() {
  await generateProducts()
  generateFilters()
  openFilters()
  changeFilters()
}

document.addEventListener("DOMContentLoaded", main);
