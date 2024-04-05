import { getFilters, renderFilters, handleOpenAndCloseFilter } from "./components/Filter";
import { toggleOrderBy, handleOpenAndCloseOrderBy } from "./components/OrderBy";
import { handleOpenAndCloseMinicart, quantityProductsMinicart } from "./components/Minicart";
import { getProducts, filterProducts, renderProducts, handleViewAllProducts } from "./components/Products";

function main() {
  async function init(){
    const products = await getProducts()
    const filteredProducts = filterProducts(products)
    renderProducts(filteredProducts)

    const filters = getFilters(products)
    renderFilters(filters)

    handleViewAllProducts(filteredProducts)
  }
  
  init()
  toggleOrderBy()
  handleOpenAndCloseMinicart()
  handleOpenAndCloseFilter()
  handleOpenAndCloseOrderBy()
  quantityProductsMinicart()
}

document.addEventListener("DOMContentLoaded", main);
