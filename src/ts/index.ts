import {
  addEventInCartButton,
  changeFilters,
  generateCardProducts,
  getMoreProduct,
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

  getMoreProduct()
}

document.addEventListener("DOMContentLoaded", main);
