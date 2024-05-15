
interface ToogleVisibleFiltersProps {
  action: "close" | "open"
  buttonId: string
}

export function toogleVisibleFilters({ action, buttonId }: ToogleVisibleFiltersProps) {
  const buttonOpenFiltersElement = document.getElementById(buttonId)
  const containerFiltersElement = document.getElementById("aside")

  buttonOpenFiltersElement.addEventListener("click", () => {
    if (action === "close") {
      containerFiltersElement.style.display = "none"
    } else {
      containerFiltersElement.style.display = "flex"
    }
  })
}