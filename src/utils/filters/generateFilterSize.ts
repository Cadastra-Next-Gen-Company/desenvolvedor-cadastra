import { ListProduct } from "../../ts/Product";
import { generateFilterButtons } from "./generateFilterButtons";

export function generateFilterSize({ products }: { products: ListProduct }) {
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
    const containerFilter = document.getElementById("aside-filters");
    generateFilterButtons({
      listFilter: sortedSizes.map(size => ({ title: size })),
      ref: containerFilter,
      title: "Tamanhos"
    })
  }
}