import { modal } from "../modal/modal"

interface ModalResultMessageProps {
  title: string
  description: string
}

export function modalResultMessage({ description, title }: ModalResultMessageProps) {

  const contentModal = document.createElement("div")
  const descriptionElement = document.createElement("p")
  descriptionElement.innerText = description

  contentModal.appendChild(descriptionElement)

  modal({
    title,
    children: contentModal
  })
}