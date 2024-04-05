export function handleOpenAndCloseMinicart(){
  const btnModalMinicart = document.querySelector('#btnModalMinicart')
  const btnMinicartClose = document.querySelector('#btnMinicartClose')

  btnModalMinicart.addEventListener('click', handleModalMinicart)
  btnMinicartClose.addEventListener('click', handleModalMinicart)
}

function handleModalMinicart(){
  const modalMinicart = document.querySelector('#modalMinicart')
  const containerModalMinicart = document.querySelector('#containerModalMinicart')

  modalMinicart.classList.toggle('active')

  modalMinicart.addEventListener("click", () => {
    modalMinicart.classList.remove('active')
  })

  containerModalMinicart.classList.toggle('active')
  containerModalMinicart.addEventListener('click', (e) => {
    e.stopPropagation()
  })
}

const productsOnStore = getLocalStorage('productList')

let productList: any[] = productsOnStore ? productsOnStore : [] 
renderModalList()

export function handleAddToCart(productId: string){
  const productElement = document.querySelector(`.card-product[data-productId='${productId}']`)
  
  const product = { 
    imgSrc: productElement.querySelector('.card-product .img-product > img').getAttribute('src'),
    name: productElement.querySelector(".card-product .name-product").textContent,
    price: productElement.querySelector('.card-product .selling-price').textContent
  }
  
  const newSavedProductList = [...productList, product];
  productList = newSavedProductList;
  setLocalStorage('productList', newSavedProductList);
  renderModalList()
  handleModalMinicart()
  quantityProductsMinicart()
}

function renderModalList(){
  const modalEmpityState = document.querySelector('#empityState')
  const productListModal = document.querySelector('#productListModal')

  if(productList.length !== 0){
    modalEmpityState.classList.add('disabled')
  } else {
    modalEmpityState.classList.remove('disabled')
  }
  
  let newHtmlStructure = ''

  productList.forEach((product, index) => {
    const htmlStructure = `
    <div class="card-product-minicart" item-id="${index}">
      <div class="container-product-minicart">
        <div class="container-img-product-minicart">
          <img src="${product.imgSrc}" alt="Imagem da temperatura atual" />
        </div>
        <div class="info-product-minicart">
          <h3 class="name-product-minicart">${product.name}</h3>
          <p class="selling-price-minicart">${product.price}</p>
        </div>
      </div>
      <button class="btn-delete-product-minicart" item-id="${index}">
        <img src="img/icon-btn-delete.png" alt="Icone da lixeira" />
      </button>
    </div>
    `
    
    newHtmlStructure += htmlStructure 
  })

  productListModal.innerHTML = newHtmlStructure 

  const cardBtnDeleteList = document.querySelectorAll('.btn-delete-product-minicart')
  cardBtnDeleteList.forEach(btnDelete => {
    btnDelete.addEventListener('click', (e) => {
      handleRemoveCardModal(e)
    })
  })
}

function handleRemoveCardModal(e: any){
  const productCardIndex = e.currentTarget.getAttribute('item-id')
  const productCard = productList[productCardIndex]

  const newSavedProductList = productList.filter((card) => {
    return card !== productCard 
  })

  productList = newSavedProductList
  setLocalStorage('productList', newSavedProductList)
  renderModalList()
  quantityProductsMinicart()
}

function setLocalStorage(key: string, value: object){
  localStorage.setItem(key, JSON.stringify(value))
}

function getLocalStorage(key: string){
  const data = localStorage.getItem(key)

  if(!data) return

  return JSON.parse(data)
}

export function quantityProductsMinicart(){
  const quantityProducts = document.querySelector('.number-quantity-minicart')
  quantityProducts.textContent = String(productList?.length)
}

