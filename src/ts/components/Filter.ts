import { Product } from "../types/Product"
import { normalizePrice } from "../utils/normalizePrice"
import { Filters } from "../types/Filter"
import { orderByPattern } from "../utils/orderByPattern"

export function handleAllViewFilterColors(){
  const btnAllViewFilter = Array.from(document.querySelectorAll('.btn-all-view-filter'))
  const colorsFilter = Array.from(document.querySelectorAll(".option-filter.color.hidden"))

  btnAllViewFilter.forEach(button => {
    button.addEventListener("click", () => {
      console.log(button)
      colorsFilter.forEach(item => {
        item.classList.remove("hidden")
      })
  
      button.classList.add("hidden")
    })
  })
}

export function getFilters(products: Product[]){
  const filters: Filters = {
    prices: ['0-50', '51-150', '151-300', '301-500', '500-+'],
    colors: [],
    sizes: []
  }

  products.forEach(product => {
    filters.sizes = [...filters.sizes, ...product.size]
    filters.colors = [...filters.colors, product.color]
  })

  const sizesUnique = new Set(filters.sizes.map((size: string) => size));
  const newSizes = Array.from(sizesUnique).map(sizeU => filters.sizes.find((size: string) => size === sizeU));

  filters.sizes = orderByPattern([...newSizes])

  const colorsUnique = new Set(filters.colors.map((color: string) => color));
  const newColors = Array.from(colorsUnique).map(colorU => filters.colors.find((colors: string) => colors === colorU));

  filters.colors = [...newColors].sort()

  return filters
}

export function renderFilters(filters: Filters){
  let sizesHtml = ''
  let colorsHtml = ''
  let pricesHtml = ''

  filters.sizes.forEach(size => {
    const newSizeHtml = `
      <button class="option-filter-size">${size}</button>
    `

    sizesHtml += newSizeHtml
  })

  const filtersSizeWrapper = Array.from(document.querySelectorAll('.list-options-filter-size'))

  filtersSizeWrapper.forEach(wrapper => {
    wrapper.innerHTML = sizesHtml
    const filtersButtonSize = Array.from(wrapper.querySelectorAll('.option-filter-size'))
    filtersButtonSize.forEach(button => {
      const key = "tamanho"
      const value = button.textContent
      const isSelected = checkUrlQueryString(key, value)
      if(isSelected){
        button.classList.add("selected")
      }
      button.addEventListener("click", () => {
        setUrlQueryString(key, value)
      })
    })
  })

  filters.colors.forEach((color, index) => {
    const newColorHtml = `
    <div class="option-filter color ${index > 4 ? "hidden" : ""}">
      <input
        type="checkbox"
        id="${color}"
        value="${color}" 
      />
      <label for="${color}" class="label-option-filter">${color}</label>
    </div>
    `

    colorsHtml += newColorHtml
  })

  const filtersColorWrapper = Array.from(document.querySelectorAll('.list-options-filter.color'))
  
  filtersColorWrapper.forEach(wrapper => {
    wrapper.innerHTML = colorsHtml + wrapper.innerHTML
    
    const filtersButtonColor = Array.from(wrapper.querySelectorAll('.option-filter.color'))
    filtersButtonColor.forEach(container => {
      const input = container.querySelector('input')
      const key = "cor"
      const value = input.value
      const isSelected = checkUrlQueryString(key, value)
      if(isSelected){
        input.setAttribute("checked", "true")
      }
      container.addEventListener("click", () => {
        setUrlQueryString(key, value)
      })
    })
  })
  handleAllViewFilterColors()
  
  filters.prices.forEach(price => {
    const prices = price.split('-')
    const minPrice = normalizePrice(Number(prices[0]))
    const maxPrice = isNaN(Number(prices[1])) ? undefined : normalizePrice(Number(prices[1]))
    const text = maxPrice ? `de ${minPrice} até ${maxPrice}` : `a partir de ${minPrice}`
    const newPriceHtml = `
    <div class="option-filter price">
      <input
        type="checkbox"
        id="${price}"
        value="${price}" 
      />
      <label for="${price}" class="label-option-filter">${text}</label>
    </div>
    `

    pricesHtml += newPriceHtml
  })

  const filtersPricesWrapper = Array.from(document.querySelectorAll('.list-options-filter.price'))

  filtersPricesWrapper.forEach(wrapper => {
    wrapper.innerHTML = pricesHtml
    const filtersButtonPrices = Array.from(wrapper.querySelectorAll('.option-filter.price'))
    filtersButtonPrices.forEach(container => {
      const input = container.querySelector('input')
      const key = "preco"
      const value = input.value
      const isSelected = checkUrlQueryString(key, value)
      if(isSelected){
        input.setAttribute("checked", "true")
      }
      container.addEventListener("click", () => {
        setUrlQueryString(key, value)
      })
    })
  })
}

function setUrlQueryString(key: string, value: string) {
  const url = decodeURIComponent(window.location.href);
  const queryParams = url.split('?')[1];
  const params = new URLSearchParams(queryParams);

  if (params.has(key)) {
    const valuesParams = params.getAll(key);
    const values = valuesParams[0].split(',')

    if (values.includes(value)) {
      const updatedValues = values.filter(v => v !== value);

      if (updatedValues.length === 0) {
        params.delete(key);
      } else {
        params.set(key, updatedValues.join(','));
      }
    } else {
      params.set(key, values.join(',') + ',' + value);
    }
  } else {
    params.set(key, value);
  }

  const newUrl = url.split('?')[0] + '?' + params.toString();

  window.location.href = newUrl;
}

function checkUrlQueryString(key: string, value: string): boolean {
  const url = decodeURIComponent(window.location.href);
  const queryParams = url.split('?')[1];
  const params = new URLSearchParams(queryParams);

  if (params.has(key)) {
    const valuesString = params.get(key) || '';

    const values = valuesString.split(',');

    return values.includes(value);
  } else {
    return false;
  }
}

// MOBILE
export function handleOpenAndCloseFilter(){
  const btnModalFilter = document.querySelector('#btnModalFilter')
  const btnFilterClose = document.querySelector('#btnFilterClose')

  btnModalFilter.addEventListener('click', handleModalFilter)
  btnFilterClose.addEventListener('click', handleModalFilter)
}

function handleModalFilter(){
  const modalFilter = document.querySelector('#modalFilter')
  const containerModalFilter = document.querySelector('#containerModalFilter')

  modalFilter.classList.toggle('active')

  modalFilter.addEventListener("click", () => {
    modalFilter.classList.remove('active')
  })

  containerModalFilter.classList.toggle('active')
  containerModalFilter.addEventListener('click', (e) => {
    e.stopPropagation()
  })
}