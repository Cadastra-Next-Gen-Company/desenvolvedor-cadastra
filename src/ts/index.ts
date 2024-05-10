import { Product, ListProduct } from "./Product";


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

async function generateCardProducts() {
  const products = await getProducts()
  const containerProducts = document.getElementById("products")

  if (products) {
    products.forEach(product => {
      const cardProduct = document.createElement("div")
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

async function main() {
  await generateCardProducts()
}

document.addEventListener("DOMContentLoaded", main);
