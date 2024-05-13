export function changeQuantityCartProducts(quantity: number) {
  
  const quantityElement = document.getElementById("quantity-cart-products")
  quantityElement.innerText = quantity.toString()

}