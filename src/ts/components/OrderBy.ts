// DESKTOP
export function toggleOrderBy(){
  const btnOrderBy = document.querySelector('#btnOrderBy')
  const optionsOrderBy = document.querySelector('#optionsOrderBy')

  btnOrderBy.addEventListener("click", () => {
    optionsOrderBy.classList.toggle("open")
  })
}

// MOBILE
export function handleOpenAndCloseOrderBy(){
  const btnModalOrderBy = document.querySelector('#btnModalOrderBy')
  const btnOrderByClose = document.querySelector('#btnOrderByClose')

  btnModalOrderBy.addEventListener('click', handleModalorderBy)
  btnOrderByClose.addEventListener('click', handleModalorderBy)
}

function handleModalorderBy(){
  const modalOrderBy = document.querySelector('#modalOrderBy')
  const containerModalOrderBy = document.querySelector('#containerModalOrderBy')

  modalOrderBy.classList.toggle('active')

  modalOrderBy.addEventListener("click", () => {
    modalOrderBy.classList.remove('active')
  })

  containerModalOrderBy.classList.toggle('active')
  containerModalOrderBy.addEventListener('click', (e) => {
    e.stopPropagation()
  })
}