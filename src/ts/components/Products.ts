import { Product } from "../types/Product"
import { normalizePrice } from "../utils/normalizePrice"
import { handleAddToCart } from "./Minicart"

export async function getProducts(){
  const apiUrl = 'http://localhost:5000/products'
  const products = await fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const idsUnique = new Set(data.map((product: Product) => product.id));
    return Array.from(idsUnique).map(id => data.find((product: Product) => product.id === id));
  })
  
  return products
}

export function renderProducts(products: Product[]){
  let productsHtml = ''

  products.forEach(product => {
    const newProductHtml = `        
    <div data-productId="${product.id}" title="${product.name}" class="card-product">
      <div class="img-product">
        <img src=${product.image} alt="Imagem do produto"/>
      </div>
      <h3 class="name-product">${product.name}</h3>
      <div class="container-price">
        <p class="selling-price">${normalizePrice(product.price)}</p>
        <p class="installment-price">até ${product.parcelamento[0]}x de ${normalizePrice(product.parcelamento[1])}</p>
      </div>
      <button class="btn-buy-product" data-productId="${product.id}">comprar</button>
    </div>`

    productsHtml += newProductHtml
  })

  const containerProducts = document.querySelector('.container-products')
  containerProducts.innerHTML = productsHtml

  const productsAddToCartButton = Array.from(containerProducts.querySelectorAll('.btn-buy-product'))

  productsAddToCartButton.forEach(button => {
    const productsId = button.getAttribute("data-productId")

    button.addEventListener("click", () => {
      handleAddToCart(productsId)
    })
  })
}

export function filterProducts(products: Product[]): Product[] {
  const decodedUrl = decodeURIComponent(window.location.href);
  const urlParams = new URLSearchParams(decodedUrl.split('?')[1]);

  if (!urlParams.has('tamanho') && !urlParams.has('cor') && !urlParams.has('preco')) {
    return products;
  }

  const filteredProducts = products.filter(product => {
    return Array.from(urlParams.keys()).every(key => {
      const value = urlParams.get(key);
      if (key === 'tamanho') {
        const sizes = value?.split(',') || [];
        return sizes.some((size: string) => product.size.includes(size));
      } else if (key === 'cor') {
        return product.color === value;
      } else if (key === 'preco') {
        const [minPrice, maxPrice] = value?.split('-').map(parseFloat) || [0, Infinity];
        return product.price >= minPrice && product.price <= maxPrice;
      }

      return true;
    });
  });

  return filteredProducts;
}

export function handleViewAllProducts(product: Product[]){
  const isMobile = window.innerWidth <= 768
  const btnViewAllProducts = document.querySelector('#btnViewAllProducts')
  const containerProducts = document.querySelector('#containerProducts')

  btnViewAllProducts.addEventListener("click", () => {
    containerProducts.classList.add('visible')
    btnViewAllProducts.classList.add('hidden')
  })

  if(!isMobile && product.length < 9){
    btnViewAllProducts.classList.add('hidden')
    return
  }

  if(isMobile && product.length < 4){
    btnViewAllProducts.classList.add('hidden')
    return
  }
}