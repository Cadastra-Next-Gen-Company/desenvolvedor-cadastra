import { ListProductsProps } from "../../components"
import { loading } from "../../components/loading/loading";
import { baseUrl } from "../../services/api"

interface GetProductsResponse {
  products: ListProductsProps;
  hasMore: boolean;
}

export async function getProducts(startProduct: number = 0): Promise<GetProductsResponse> {
  const limit = 6
  try {
    loading(true)
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
  } finally {
    loading(false)
  }

}