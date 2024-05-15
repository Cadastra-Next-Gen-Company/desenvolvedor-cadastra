interface ButtonProps {
  className: string
  text: string
  parent: HTMLElement
  onClick: () => void
}

export function button({ text, parent, className, onClick }: ButtonProps) {
  const buttonElement = document.createElement("button")
  buttonElement.innerText = text
  buttonElement.classList.add(className)

  buttonElement.addEventListener("click", () => onClick())

  parent.appendChild(buttonElement)
}