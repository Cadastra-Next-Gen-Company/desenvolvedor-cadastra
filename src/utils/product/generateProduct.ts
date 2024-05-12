import { ListProduct } from "../../ts/Product"
import { formatedPrice } from "../formatted"
import { addProductInCart } from "./addProductInCart"

export function generateCardProducts({ products }: { products: ListProduct }) {
  const containerProducts = document.getElementById("products")
  containerProducts.classList.add("product-grid")

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
      button.addEventListener("click", () => addProductInCart({ product }))

      cardProduct.appendChild(imageProduct)
      cardProduct.appendChild(titleProduct)
      cardProduct.appendChild(priceProduct)
      cardProduct.appendChild(descripitionProduct)
      cardProduct.appendChild(button)

      containerProducts.appendChild(cardProduct)

    })
  }
}