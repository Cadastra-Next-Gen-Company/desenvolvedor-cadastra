interface Modal {
  title: string
  children: any
}

export function modal({ title, children }: Modal) {
  const bodyElement = document.body

  const containerModal = document.createElement("div")
  containerModal.classList.add("modal", "modal-selected-size-product")

  const contentModal = document.createElement("div")
  contentModal.classList.add("modal-content")

  const headerModal = document.createElement("div")
  headerModal.classList.add("modal-header")

  const titleHeaderModal = document.createElement("h1")
  titleHeaderModal.innerText = title

  const buttonCloseModal = document.createElement("button")
  buttonCloseModal.innerText = "x"
  buttonCloseModal.classList.add("modal-button-close")
  buttonCloseModal.addEventListener("click", () => {
    containerModal.remove()
  })

  const childrenElement = document.createElement("div")
  childrenElement.classList.add("modal-children")

  childrenElement.appendChild(children)

  headerModal.appendChild(titleHeaderModal)
  headerModal.appendChild(buttonCloseModal)

  contentModal.appendChild(headerModal)

  contentModal.appendChild(childrenElement)

  containerModal.appendChild(contentModal)
  bodyElement.appendChild(containerModal)
}