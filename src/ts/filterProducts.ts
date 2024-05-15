import { ProductProps, notFoundProducts } from "../components";
import { clearFilters } from "../utils/filters";

export function filterProducts() {
  const products = document.querySelectorAll(".product-card");
  const filterColors = document.querySelectorAll(".filter-colors");
  const filterSizes = document.querySelectorAll(".filter-size");
  const filterPrices = document.querySelectorAll(".filter-price");

  let colorSelected: string | null = null;
  let sizeSelected: string | null = null;
  let priceSelected: string | null = null;
  let fromPrice: number | null = null
  let toPrice: number | null = null

  filterColors.forEach((colorElement: HTMLInputElement) => {
    if (colorElement.checked) {
      colorSelected = colorElement.value;
    }
  });

  filterSizes.forEach((sizeElement: HTMLButtonElement) => {
    if (sizeElement.classList.contains("active")) {
      sizeSelected = sizeElement.innerText;
    }
  });

  filterPrices.forEach((priceElement: HTMLInputElement) => {
    if (priceElement.checked) {
      priceSelected = priceElement.value;
    }
  });

  let productNotFound;
  products.forEach(productElement => {
    if (productElement instanceof HTMLElement) {
      const productData = JSON.parse(productElement.dataset.product as string) as ProductProps;

      let isColorMatch = !colorSelected || productData.color === colorSelected;
      let isSizeMatch = !sizeSelected || productData.size.includes(sizeSelected);
      let isPriceMatch = true;

      if (priceSelected) {

        const regex = /R\$\s*(\d+)\s*até\s*R\$\s*(\d+)/;
        const match = priceSelected.match(regex);

        if (match) {
          const [_, fromPriceString, toPriceString] = match

          if (fromPriceString && toPriceString) {
            fromPrice = parseInt(fromPriceString)
            toPrice = parseInt(toPriceString)
          }
        } else {
          if (priceSelected === "apartir de R$ 500") {
            fromPrice = 500
            toPrice = Infinity
          } else {
            fromPrice = null
            toPrice = null
          }
        }

        isPriceMatch = productData.price >= fromPrice && productData.price <= toPrice;
      }

      if (isColorMatch && isSizeMatch && isPriceMatch) {
        productElement.style.display = "flex";
        productNotFound = true
      } else {
        productElement.style.display = "none";
      }
    }
  });

  const buttonMoreProducts = document.getElementById("more-products")
  const listProductscontainerElement = document.getElementById("list-products")

  if (!productNotFound) {
    const productsContainerElement = document.getElementById("content-page")

    notFoundProducts({
      id: "filter-not-found",
      parent: productsContainerElement,
      description: "Nenhum produto corresponde ao filtro",
      button: {
        onClick: clearFilters,
        title: "Limpar Filtro"
      }
    })
    buttonMoreProducts.style.display = "none"
    listProductscontainerElement.style.display = "none"
  } else {
    const notFoundProduct = document.getElementById("filter-not-found")
    notFoundProduct.remove()
    listProductscontainerElement.style.display = "grid"
    buttonMoreProducts.style.display = "block"
  }

}
