import { button } from "../button/button"

interface NotFoundProductsProps {
  parent: HTMLElement
  id?: string
  description: string
  button?: {
    title: string
    onClick: () => void
  }
}

export function notFoundProducts({ parent, description, button: buttonProp, id }: NotFoundProductsProps) {

  const containerElement = document.createElement("div")
  containerElement.id = id
  containerElement.classList.add("not-found-product")
  const messageElement = document.createElement("p")
  messageElement.innerText = description

  containerElement.appendChild(messageElement)
  button({
    onClick: buttonProp.onClick,
    parent: containerElement,
    text: buttonProp.title
  })

  parent.appendChild(containerElement)

}