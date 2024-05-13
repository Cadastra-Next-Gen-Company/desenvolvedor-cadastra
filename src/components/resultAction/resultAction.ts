import { modal } from "../modal/modal"

interface ResultAction {
  message: string
  type: "success" | "error"
}

export function resultAction({ message, type }: ResultAction) {

  const contentElement = document.createElement("div")
  contentElement.classList.add("content-message")

  const messageElement = document.createElement("p")
  messageElement.innerText = message
  messageElement.classList.add(`content-message-${type}`)

  contentElement.appendChild(messageElement)

  modal({
    children: contentElement,
    title: ""
  })

}