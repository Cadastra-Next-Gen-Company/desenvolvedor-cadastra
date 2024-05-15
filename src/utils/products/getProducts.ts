import { ListProductsProps } from "../../components"
import { baseUrl } from "../../services/api"

export async function getProducts(startProduct?: number): Promise<ListProductsProps> {
  try {
    const response = await fetch(`${baseUrl}/products?_start=${startProduct ? startProduct : 0}&_limit=6`)
    const products = await response.json()
    return products

  } catch (error) {
    return []
  }
}