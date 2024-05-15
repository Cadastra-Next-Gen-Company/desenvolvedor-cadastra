interface ButtonProps {
  className?: string
  id?: string
  text: string
  parent: HTMLElement
  onClick: () => void | Promise<void>
}

export function button({ text, parent, className, id, onClick }: ButtonProps) {
  const buttonElement = document.createElement("button")
  buttonElement.innerText = text
  buttonElement.classList.add(className)
  buttonElement.id = id

  buttonElement.addEventListener("click", async () => onClick())

  parent.appendChild(buttonElement)
}