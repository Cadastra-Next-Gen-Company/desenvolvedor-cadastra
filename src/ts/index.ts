import {
  addEventInCartButton,
  changeFilters,
  generateCardProducts,
  getProducts,
  handleVisibleFilter,
  quantityProductInCart
} from "../utils";
import { generateFilters } from "../utils/filters/generateFilters";

async function main() {
  const products = await getProducts()
  
  generateFilters({ products })
  generateCardProducts({ products })
  changeFilters({ products })
  quantityProductInCart()
  addEventInCartButton()
  handleVisibleFilter()
}

document.addEventListener("DOMContentLoaded", main);
