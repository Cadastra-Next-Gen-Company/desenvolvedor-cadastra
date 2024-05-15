import { ListProductsProps } from "../../components"
import { baseUrl } from "../../services/api"

interface GetProductsResponse {
  products: ListProductsProps;
  hasMore: boolean;
}

export async function getProducts(startProduct: number = 0): Promise<GetProductsResponse> {
  const limit = 6
  try {
    const response = await fetch(`${baseUrl}/products?_start=${startProduct ? startProduct : 0}&_limit=${limit}`)
    const products = await response.json()

    const hasMore = products.length === limit;

    return {
      products,
      hasMore
    }


  } catch (error) {
    return {
      hasMore: false,
      products: []
    }
  }
}