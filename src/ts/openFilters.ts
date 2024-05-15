export function openFilters() {
  const buttonOpenFiltersElement = document.getElementById("button-open-filter")
  const containerFiltersElement = document.getElementById("aside")

  buttonOpenFiltersElement.addEventListener("click", () => {
    containerFiltersElement.style.display = "flex"
  })
}