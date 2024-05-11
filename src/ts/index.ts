import {
  changeFilters,
  generateCardProducts,
  generateFilterColors,
  generateFilterPrice,
  generateFilterSize,
  getProducts
} from "../utils";

async function main() {
  const products = await getProducts()

  generateFilterColors({ products })
  generateFilterSize({ products })
  generateFilterPrice()
  generateCardProducts({ products })
  changeFilters({ products })
}

document.addEventListener("DOMContentLoaded", main);
