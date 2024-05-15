import { generateFilters } from "./generateFilters";
import { generateProducts } from "./generateProducts";
import { openFilters } from "./openFilters";

async function main() {
  await generateProducts()
  generateFilters()
  openFilters()
}

document.addEventListener("DOMContentLoaded", main);
