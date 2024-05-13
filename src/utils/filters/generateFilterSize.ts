import { contentFilters } from "../../components";
import { ListProduct } from "../../ts/Product";

interface GenerateFilterSize {
  products: ListProduct
  parent: HTMLElement
  isMobile: boolean
  title: string
}

export function generateFilterSize({ products, parent, isMobile, title }: GenerateFilterSize) {
  const letterSizes: Array<string> = [];
  const numberSizes: Array<number> = [];

  products.forEach(product => {
    product.size.forEach(size => {
      if (isNaN(parseInt(size))) {
        if (!letterSizes.includes(size)) {
          letterSizes.push(size);
        }
      } else {
        const number = parseInt(size)
        if (!numberSizes.includes(number)) {
          numberSizes.push(number);
        }
      }
    });
  });

  const letterOrder = ["P", "M", "G", "GG", "U"];
  letterSizes.sort((a, b) => {
    return letterOrder.indexOf(a) - letterOrder.indexOf(b);
  });

  numberSizes.sort((a, b) => a - b);

  const sortedSizes = [...letterSizes, ...numberSizes.map(String)];

  if (sortedSizes.length > 0) {

    const details = document.createElement("details")
    const summary = document.createElement("summary")
    const iconSummary = document.createElement("p")

    iconSummary.innerText = "↓"
    summary.innerText = title
    summary.appendChild(iconSummary)
    
    contentFilters({
      className: "button-size",
      options: sortedSizes.map(size => ({ title: size })),
      parent: isMobile ? details : parent,
      title: !isMobile && title,
      type: "button"
    })

    if (isMobile) {
      details.appendChild(summary)
      parent.appendChild(details)
    }
  }

}