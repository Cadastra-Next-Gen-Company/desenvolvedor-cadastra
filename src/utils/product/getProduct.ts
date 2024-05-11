import { baseUrl } from "../../services/api"
import { ListProduct } from "../../ts/Product"

export async function getProducts(): Promise<ListProduct> {
  try {
    const response = await fetch(`${baseUrl}/products`)
    const products = await response.json()
    return products

  } catch (error) {
    return []
  }
}