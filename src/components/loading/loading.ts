export function loading(active: boolean) {
  const existLoadingElement = document.getElementById("loading")
  if (active) {

    if (existLoadingElement) {
      existLoadingElement.style.display = "flex"
    } else {

      const loadingElement = document.createElement("div")
      loadingElement.id = "loading"
      const messageLoading = document.createElement("p")
      messageLoading.innerText = "Carregando..."
      loadingElement.style.display = "flex"

      loadingElement.appendChild(messageLoading)
      document.body.appendChild(loadingElement)
    }

  } else {
    existLoadingElement.style.display = "none"
  }

}