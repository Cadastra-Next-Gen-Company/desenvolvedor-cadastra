import { Product } from "./Product";

const serverUrl = "http://localhost:5000/products";

let products: Product[] = []
let cartItemCount = 0;

const priceRanges = [
  { label: "de R$0 até R$50", min: 0, max: 50 },
  { label: "de R$51 até R$150", min: 51, max: 150 },
  { label: "de R$151 até R$300", min: 151, max: 300 },
  { label: "de R$301 até R$500", min: 301, max: 500 },
  { label: "a partir de R$500", min: 501, max: Infinity }
];

let selectedColors: Set<string> = new Set();
let selectedPriceRanges: { min: number; max: number }[] = [];
let selectedSizes: Set<string> = new Set();

let filtersToApply = {
  colors: new Set<string>(),
  sizes: new Set<string>(),
  priceRanges: [] as { min: number; max: number }[],
};

type FilterType = 'color' | 'size' | 'price';

let currentProductIndex = 0;
const productsPerPage = 4;

//main
async function main() {
  try {
    products = await fetchProducts(serverUrl);
    console.log("Produtos carregados:", products);
    renderProducts(products.slice(0, productsPerPage)); // Renderiza os primeiros 4 produtos
    currentProductIndex = productsPerPage;
    setupLoadMoreButton();
    navbarAsideTrigger();
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
}
//fetch dos produtos
export async function fetchProducts(url: string): Promise<Product[]> {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
      }
      const data: Product[] = await response.json();
      products = data
      console.log("Dados recebidos do servidor:", data); 
      return data;
  } catch (error) {
      console.error("Erro ao buscar produtos:", error); 
      throw error;
  }
}

// Função para adicionar itens ao carrinho e atualizar o contador
function addToCart(product: Product) {
  cartItemCount++;
  updateCartCount();
  console.log(`Produto ${product.name} adicionado ao carrinho. Total de itens: ${cartItemCount}`);
}

function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartItemCount.toString();
  }
}

function setupLoadMoreButton() {
  const loadMoreButton = document.getElementById('load-more');
  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', () => {
      const nextProducts = products.slice(currentProductIndex, currentProductIndex + productsPerPage);
      renderProducts(nextProducts, true);
      currentProductIndex += productsPerPage;

      // Esconder o botão se não houver mais produtos
      if (currentProductIndex >= products.length) {
        loadMoreButton.style.display = 'none';
      }
    });
  }
}

//renderização dos produtos
function renderProducts(products: Product[], append: boolean = false) {
  const productsContainer = document.getElementById('products-container');
  if (!productsContainer) {
      console.error("Elemento 'products-container' não encontrado");
      return;
  }

  if (!append) {
    productsContainer.innerHTML = ''; 
  }

  console.log("Renderizando produtos..."); 

  products.forEach(product => {
      console.log("Renderizando produto:", product); 

      const productDiv = document.createElement('div');
      productDiv.classList.add('product-item');

      const productImage = document.createElement('img')
      productImage.src = product.image
      productDiv.appendChild(productImage)

      const productSubDiv = document.createElement('div')
      productDiv.appendChild(productSubDiv)

      const productName = document.createElement('h2');
      productName.textContent = product.name;
      productSubDiv.appendChild(productName);

      const productPrice = document.createElement('p');
      productPrice.textContent = product.price.toString();
      productSubDiv.appendChild(productPrice);

      const productParcelamento = document.createElement('p');
      productParcelamento.textContent = `Até ${product.parcelamento}`;
      productSubDiv.appendChild(productParcelamento)

      const buyButton = document.createElement('button');
      buyButton.textContent = `COMPRAR`;
      buyButton.addEventListener('click', () => addToCart(product)); // Adiciona o event listener aqui
      productDiv.appendChild(buyButton);
  
      productsContainer.appendChild(productDiv);
    });

  console.log("Produtos renderizados:", productsContainer.innerHTML);
}

//filtro do aside
function navbarAsideTrigger() {
    const buttonFilter: HTMLButtonElement = document.querySelector('#filterTrigger')
    const asideElement = document.querySelector('aside')

    buttonFilter.addEventListener('click', () => {
      const classListAside = asideElement.classList
      
      if (classListAside.contains('active')) {
        classListAside.remove('active')
      } else {
        classListAside.add('active')
      }
    })
}

// Função para configurar o menu "Ordenar"
function setupOrderMenu() {
  const orderTrigger = document.getElementById('orderTrigger');
  const formOrder = document.querySelector('.form-order') as HTMLElement;
  const closeOrder = document.getElementById('closeOrder');

  orderTrigger.addEventListener('click', () => {
    formOrder.classList.toggle('active');
    document.querySelector('aside').classList.toggle('active'); // Adiciona classe 'active' ao aside
    document.querySelector('main').classList.toggle('hidden'); // Esconde o main
  });

  closeOrder.addEventListener('click', () => {
    formOrder.classList.remove('active');
    document.querySelector('aside').classList.remove('active'); // Remove classe 'active' do aside
    document.querySelector('main').classList.remove('hidden'); // Mostra o main
  });

  const orderButtons = document.querySelectorAll('.orderTrigger');
  orderButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target as HTMLButtonElement;
      sortProducts(target.id);
      formOrder.classList.remove('active');
      document.querySelector('aside').classList.remove('active'); // Remove classe 'active' do aside
      document.querySelector('main').classList.remove('hidden'); // Mostra o main
    });
  });
}

function sortProducts(criteria: string) {
  let sortedProducts = [...products];

  if (criteria === 'orderTriggerRecent') {
    sortedProducts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (criteria === 'orderTriggerHighPrice') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (criteria === 'orderTriggerLowPrice') {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  renderProducts(sortedProducts, false);
}

document.addEventListener('DOMContentLoaded', () => {
  const buttonFilterColor = document.getElementById('filterTriggerColor') as HTMLButtonElement;
  const buttonFilterSize = document.getElementById('filterTriggerSize') as HTMLButtonElement;
  const buttonFilterPrice = document.getElementById('filterTriggerPrice') as HTMLButtonElement;
  const buttonCloseFilter = document.getElementById('closeFilter') as HTMLParagraphElement;
  const buttonCloseOrder = document.getElementById('closeOrder') as HTMLParagraphElement;
  const asideElement = document.querySelector('aside') as HTMLElement;
  const mainContent = document.querySelector('main') as HTMLElement;

  buttonFilterColor.addEventListener('click', (event) => {
    event.preventDefault();
    renderFilterOptions('color');
  });

  buttonFilterSize.addEventListener('click', (event) => {
    event.preventDefault();
    renderFilterOptions('size');
  });

  buttonFilterPrice.addEventListener('click', (event) => {
    event.preventDefault();
    renderFilterOptions('price');
  });

  buttonCloseFilter.addEventListener('click', (event) => {
    event.preventDefault();
    asideElement.classList.remove('active');
    mainContent.classList.remove('hidden');
  });

  buttonCloseOrder.addEventListener('click', (event) => {
    event.preventDefault();
    asideElement.classList.remove('active');
    mainContent.classList.remove('hidden');
  });

  function showFilterMenu() {
    asideElement.classList.add('active');
    mainContent.classList.add('hidden');
  }

  const openFilterButton = document.getElementById('filterTriggerColor') as HTMLButtonElement; // ou qualquer botão que abra o filtro
  openFilterButton.addEventListener('click', (event) => {
    event.preventDefault();
    showFilterMenu();
  });

  const applyFiltersButton = document.getElementById('apply-filters') as HTMLButtonElement;
  applyFiltersButton.addEventListener('click', (event) => {
    event.preventDefault();
    applyFilters();
  });

  const clearFiltersButton = document.getElementById('clear-filters') as HTMLButtonElement;
  clearFiltersButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearFilters();
  });

  // Chamar setupOrderMenu aqui
  setupOrderMenu();
});



//filtro dos produtos
function filterProducts() {
  const filteredProducts = products.filter(product => {
    const productPrice = product.price;

    let isColorMatch = selectedColors.size === 0 || selectedColors.has(product.color);
    let isSizeMatch = selectedSizes.size === 0 || (Array.isArray(product.size) ? product.size.some(size => selectedSizes.has(size)) : selectedSizes.has(product.size));
    let isPriceMatch = selectedPriceRanges.length === 0 || selectedPriceRanges.some(range => {
      return productPrice >= range.min && productPrice <= range.max;
    });

    console.log(`Produto: ${product.name}, Preço: ${productPrice}, Cor: ${product.color}, Tamanho: ${product.size}, isColorMatch: ${isColorMatch}, isSizeMatch: ${isSizeMatch}, isPriceMatch: ${isPriceMatch}`);

    return isColorMatch && isSizeMatch && isPriceMatch;
  });

  renderProducts(filteredProducts);
}

//aplicar filtros
function applyFilters() {
  filtersToApply.colors = new Set(selectedColors);
  filtersToApply.sizes = new Set(selectedSizes);
  filtersToApply.priceRanges = [...selectedPriceRanges];

  filterProducts();
}

//limpar filtros
function clearFilters() {
  selectedColors.clear();
  selectedSizes.clear();
  selectedPriceRanges = [];
  filtersToApply.colors.clear();
  filtersToApply.sizes.clear();
  filtersToApply.priceRanges = [];

  document.querySelectorAll('#color-container input').forEach(input => (input as HTMLInputElement).checked = false);
  document.querySelectorAll('#size-container button').forEach(button => button.classList.remove('selected'));
  document.querySelectorAll('#price-container input').forEach(input => (input as HTMLInputElement).checked = false);

  renderProducts(products);
}
//renderização das opções de filtro

function renderFilterOptions(filterType: FilterType) {
  let containerId: string;

  if (filterType === 'color') {
    containerId = 'color-container';
  } else if (filterType === 'size') {
    containerId = 'size-container';
  } else if (filterType === 'price') {
    containerId = 'price-container';
  } else {
    throw new Error('Tipo de filtro inválido');
  }

  const productsContainer = document.getElementById(containerId);
  if (!productsContainer) return;

  productsContainer.innerHTML = '';

  if (filterType === 'price') {
    priceRanges.forEach(priceRange => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('price-item');

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.value = priceRange.label;
      itemDiv.appendChild(input);

      const label = document.createElement('label');
      label.textContent = priceRange.label;
      itemDiv.appendChild(label);

      input.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        if (target.checked) {
          selectedPriceRanges.push({ min: priceRange.min, max: priceRange.max });
        } else {
          selectedPriceRanges = selectedPriceRanges.filter(range => range.min !== priceRange.min || range.max !== priceRange.max);
        }
        console.log('Selected price ranges:', selectedPriceRanges);
      });

      productsContainer.appendChild(itemDiv);
    });
  } else if (filterType === 'size') {
    // Renderizar tamanhos como botões
    const sizes = new Set<string>();

    products.forEach(product => {
      if (Array.isArray(product.size)) {
        product.size.forEach(size => sizes.add(size));
      } else {
        sizes.add(product.size);
      }
    });

    sizes.forEach(size => {
      const button = document.createElement('button');
      button.type = 'button';
      button.classList.add('size-button');
      button.textContent = size;

      button.addEventListener('click', () => {
        if (selectedSizes.has(size)) {
          selectedSizes.delete(size);
          button.classList.remove('selected');
        } else {
          selectedSizes.add(size);
          button.classList.add('selected');
        }
        console.log('Selected sizes:', Array.from(selectedSizes));
      });

      productsContainer.appendChild(button);
    });
  } else {
    products.forEach(product => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add(`${filterType}-item`);

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.value = product[filterType].toString();
      itemDiv.appendChild(input);

      const label = document.createElement('label');
      label.textContent = product[filterType].toString();
      itemDiv.appendChild(label);

      input.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        if (target.checked) {
          selectedColors.add(target.value);
        } else {
          selectedColors.delete(target.value);
        }
        console.log('Selected colors:', Array.from(selectedColors));
      });

      productsContainer.appendChild(itemDiv);
    });
  }
}
document.addEventListener("DOMContentLoaded", main);