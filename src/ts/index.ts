import { generateFilters } from "./generateFilters";
import { generateProducts } from "./generateProducts";

async function main() {
  await generateProducts()
  generateFilters()
}

document.addEventListener("DOMContentLoaded", main);
