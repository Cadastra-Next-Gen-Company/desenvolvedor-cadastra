import {
  addEventInCartButton,
  changeFilters,
  generateCardProducts,
  generateFilterColors,
  generateFilterPrice,
  generateFilterSize,
  getProducts,
  quantityProductInCart
} from "../utils";

async function main() {
  const products = await getProducts()

  generateFilterColors({ products })
  generateFilterSize({ products })
  generateFilterPrice()
  generateCardProducts({ products })
  changeFilters({ products })
  quantityProductInCart()
  addEventInCartButton()
}

document.addEventListener("DOMContentLoaded", main);
