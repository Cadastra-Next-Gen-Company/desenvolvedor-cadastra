import { GenerateFilters } from "./GenerateFilters";
import { ListProduct } from "./Product";

const serverUrl = "http://localhost:5000";

async function getProducts(): Promise<ListProduct> {
  try {
    const response = await fetch(`${serverUrl}/products`)
    const products = await response.json()
    return products

  } catch (error) {
    return []
  }
}

function formatedPrice({ price }: { price: number }): string {
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function generateCardProducts({ products }: { products: ListProduct }) {
  const containerProducts = document.getElementById("products")

  if (products) {
    products.forEach(product => {
      const cardProduct = document.createElement("li")
      cardProduct.classList.add("card-product")

      const imageProduct = document.createElement("img")
      imageProduct.classList.add("product-image")
      imageProduct.src = product.image;
      imageProduct.alt = product.name;

      const titleProduct = document.createElement("h2")
      titleProduct.innerText = product.name
      titleProduct.classList.add("product-title")

      const priceProduct = document.createElement("strong")
      priceProduct.innerText = formatedPrice({ price: product.price })

      priceProduct.classList.add("product-price")

      const descripitionProduct = document.createElement("p")
      descripitionProduct.innerText = `até ${product.parcelamento[0]} de ${formatedPrice({ price: product.parcelamento[1] })}`
      descripitionProduct.classList.add("product-description")

      const button = document.createElement("button")
      button.innerText = "comprar"
      button.classList.add("card-button-sale")

      cardProduct.appendChild(imageProduct)
      cardProduct.appendChild(titleProduct)
      cardProduct.appendChild(priceProduct)
      cardProduct.appendChild(descripitionProduct)
      cardProduct.appendChild(button)

      containerProducts.appendChild(cardProduct)

    })
  }
}

function generateFiltersCheckbox({ ref, title, listFilter }: GenerateFilters) {
  const containerFilter = document.createElement("div")
  containerFilter.classList.add("filter-checkbox")

  const titleFilter = document.createElement("h2")
  titleFilter.classList.add("filter-title")
  titleFilter.innerText = title

  const listOptionsFilter = document.createElement("ul")
  listOptionsFilter.classList.add("filter-checkbox-list")

  listFilter.forEach(filter => {

    const filterOption = document.createElement("li")
    filterOption.classList.add("filter-option")

    const labelCheckbox = document.createElement("label")
    labelCheckbox.classList.add("checkbox-label")

    const input = document.createElement("input")
    input.type = "checkbox"

    const titleCheckbox = document.createElement("p")
    titleCheckbox.innerText = filter.title

    labelCheckbox.appendChild(input)
    labelCheckbox.appendChild(titleCheckbox)

    filterOption.appendChild(labelCheckbox)

    listOptionsFilter.appendChild(filterOption)

    containerFilter.appendChild(titleFilter)
    containerFilter.appendChild(listOptionsFilter)

    ref.appendChild(containerFilter)

  })

}

function generateFilterColors({ products }: { products: ListProduct }) {
  const colors: Array<string> = []

  products.forEach(product => {
    const color = product.color
    if (!colors.includes(color)) {
      colors.push(color)
    }
  })

  if (colors.length > 0) {
    const containerFilter = document.getElementById("aside-filters")

    generateFiltersCheckbox({
      listFilter: colors.map(color => ({ title: color })),
      ref: containerFilter,
      title: "Cores"
    })
  }

}

function generateFilterPrice() {

  const prices = [
    {
      fromPrice: 0,
      toPrice: 50
    },
    {
      fromPrice: 51,
      toPrice: 150
    },
    {
      fromPrice: 151,
      toPrice: 300
    },
    {
      fromPrice: 301,
      toPrice: 500
    },
    {
      fromPrice: 500,
      toPrice: Infinity
    },

  ]

  const containerFilter = document.getElementById("aside-filters")

  generateFiltersCheckbox({
    listFilter: prices.map(price => ({
      title: price.toPrice === Infinity ?
        `apartir de R$ ${price.fromPrice}`
        :
        `de R$ ${price.fromPrice} até R$ ${price.toPrice}`
    })),
    ref: containerFilter,
    title: "Faixa de preço"
  })
}

function generateFilterButtons({ ref, title, listFilter }: GenerateFilters) {

  const containerFilter = document.createElement("div")
  const titleFilter = document.createElement("h2")
  titleFilter.classList.add("filter-title")
  titleFilter.innerText = title

  const listOptionsFilter = document.createElement("ul")
  listOptionsFilter.classList.add("filter-sizes-list")

  listFilter.forEach(option => {
    const filterOption = document.createElement("li")
    filterOption.classList.add("filter-option")

    const button = document.createElement("button")
    button.innerText = option.title

    filterOption.appendChild(button)
    listOptionsFilter.appendChild(filterOption)
  })

  containerFilter.appendChild(titleFilter)
  containerFilter.appendChild(listOptionsFilter)

  ref.appendChild(containerFilter)

}

function generateFilterSize({ products }: { products: ListProduct }) {
  const letterSizes: Array<string> = [];
  const numberSizes: Array<number> = [];

  products.forEach(product => {
    product.size.forEach(size => {
      if (isNaN(parseInt(size))) {
        if (!letterSizes.includes(size)) {
          letterSizes.push(size);
        }
      } else {
        const number = parseInt(size)
        if (!numberSizes.includes(number)) {
          numberSizes.push(number);
        }
      }
    });
  });

  const letterOrder = ["P", "M", "G", "GG", "U"];
  letterSizes.sort((a, b) => {
    return letterOrder.indexOf(a) - letterOrder.indexOf(b);
  });

  numberSizes.sort((a, b) => a - b);

  const sortedSizes = [...letterSizes, ...numberSizes.map(String)];

  if (sortedSizes.length > 0) {
    const containerFilter = document.getElementById("aside-filters");
    console.log(sortedSizes);
    generateFilterButtons({ listFilter: sortedSizes.map(size => ({ title: size })), ref: containerFilter, title: "Tamanhos" })
  }
}

async function main() {
  const products = await getProducts()

  generateCardProducts({ products })
  generateFilterColors({ products })
  generateFilterSize({ products })
  generateFilterPrice()
}

document.addEventListener("DOMContentLoaded", main);
