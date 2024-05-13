import { contentFilters } from "../../components";

interface GenerateFilterSize {
  parent: HTMLElement
  isMobile: boolean
  title: string
}

export function generateFilterSize({ parent, isMobile, title }: GenerateFilterSize) {

  const sizes: Array<string> = [
    "P", "M", "G", "GG", "U",
    "36", "38", "40", "44", "46"
  ]

  const details = document.createElement("details")
  const summary = document.createElement("summary")
  const iconSummary = document.createElement("p")

  iconSummary.innerText = "↓"
  summary.innerText = title
  summary.appendChild(iconSummary)

  contentFilters({
    className: "button-size",
    options: sizes.map(size => ({ title: size })),
    parent: isMobile ? details : parent,
    title: !isMobile && title,
    type: "button"
  })

  if (isMobile) {
    details.appendChild(summary)
    parent.appendChild(details)
  }


}