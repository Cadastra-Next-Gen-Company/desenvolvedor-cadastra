export function changeIndicatorCart(quantity: number) {
  const indicatorQuantityProductsInCart = document.getElementById("indicator-cart")
  indicatorQuantityProductsInCart.innerText = quantity.toString()
}