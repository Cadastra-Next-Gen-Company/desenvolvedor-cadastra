export function getItemLocalStorage(key: string) {
  const response = localStorage.getItem(key)

  if (response) {
    return JSON.parse(response)
  }

  return false
}