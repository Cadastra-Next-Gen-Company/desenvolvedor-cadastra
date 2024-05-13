import { baseUrl } from "../../services/api"
import { ListProduct } from "../../ts/Product"

export async function getProducts(startProduct?: number): Promise<ListProduct> {
  try {
    const response = await fetch(`${baseUrl}/products?_start=${startProduct ? startProduct : 0}&_limit=6`)
    const products = await response.json()
    return products

  } catch (error) {
    return []
  }
}