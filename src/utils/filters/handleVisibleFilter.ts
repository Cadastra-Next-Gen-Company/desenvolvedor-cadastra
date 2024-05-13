export function handleVisibleFilter() {

  const buttonOpenElement = document.getElementById("filter-button")
  const buttonCloseElement = document.getElementById("filter-close")
  const containerFilterElement = document.getElementById("aside-filters")
  const titleAsideElement = document.getElementById("title-aside")

  console.log(buttonCloseElement)

  buttonCloseElement.addEventListener("click", () => {
    containerFilterElement.style.display = "none"
    titleAsideElement.innerHTML = "Blusas"
  })
  buttonOpenElement.addEventListener("click", () => {
    containerFilterElement.style.display = "flex"
    titleAsideElement.innerHTML = "Filtrar"
  })

}