export function setItemLocalStorage({ key, value }: { key: string, value: any }) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return "success"

  } catch (error) {
    return "error"
  }
}